import express from 'express';
import multer from 'multer';
import { db } from '../utils/firebase.js';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import crypto from 'crypto';
import { sendConfirmationEmail } from '../utils/emailHelper.js';

const router = express.Router();

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Test endpoint
router.get('/test', (req, res) => {
    res.json({ message: 'ProtoPlanet API is working!' });
});

router.post('/register', upload.single('screenshot'), async (req, res) => {
    console.log('=== ProtoPlanet Registration ===');
    try {
        const formData = req.body;
        let screenshotUrl = null;

        // Parse JSON strings back to objects
        try {
            if (formData.projectAbstract) formData.projectAbstract = JSON.parse(formData.projectAbstract);
            ['member1', 'member2', 'member3'].forEach(m => {
                if (formData[m]) formData[m] = JSON.parse(formData[m]);
            });
        } catch (e) {
            return res.status(400).json({ success: false, message: 'Invalid JSON data in form submission' });
        }

        // Validate required fields
        const requiredFields = ['teamName', 'institutionName', 'cityState', 'projectTitle', 'projectAbstract', 'feeType', 'transactionId'];
        const missingFields = requiredFields.filter(f => !formData[f]);
        if (missingFields.length > 0) {
            return res.status(400).json({ success: false, message: `Missing required fields: ${missingFields.join(', ')}` });
        }

        // Upload screenshot to Cloudinary
        if (req.file) {
            console.log('Uploading payment screenshot to Cloudinary...');
            screenshotUrl = await uploadToCloudinary(req.file.buffer, 'innoverse/protoplanet/payments', req.file.mimetype);
        } else {
            return res.status(400).json({ success: false, message: 'Payment screenshot is required' });
        }

        // Save to Firestore
        const registrationId = `PP-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
        // Format data for Firestore in the exact order of form steps
        const registrationData = {
            registrationId,
            registrationType: 'protoplanet',

            // Step 1: Team Details
            teamDetails: {
                teamName: formData.teamName,
                institutionName: formData.institutionName,
                cityState: formData.cityState
            },

            // Step 2: Team Members
            teamMembers: {
                leader: {
                    name: formData.member1?.name || '',
                    email: formData.member1?.email || '',
                    phone: formData.member1?.phone || '',
                    yearBranch: formData.member1?.yearBranch || '',
                    isIETMember: formData.member1?.isIETMember ? 'yes' : 'no',
                    ietMembershipId: formData.member1?.ietMembershipId || ''
                },
                member2: formData.member2 || {},
                member3: formData.member3 || {}
            },

            // Step 3: Project / Proposal Details
            projectDetails: {
                projectTitle: formData.projectTitle,
                ...(formData.projectAbstract || {})
            },

            // Step 4: Payment Details
            paymentDetails: {
                feeType: formData.feeType,
                transactionId: formData.transactionId,
                screenshotUrl
            },

            // Metadata
            submittedAt: new Date().toISOString(),
            status: 'submitted',
            lastUpdated: new Date().toISOString()
        };

        await setDoc(doc(db, 'protoplanet-registrations', registrationId), registrationData);
        console.log('ProtoPlanet registration saved to Firestore:', registrationId);

        // Send confirmation email to team leader in background
        if (registrationData.teamMembers?.leader?.email) {
            sendConfirmationEmail({
                toEmail: registrationData.teamMembers.leader.email,
                leaderName: registrationData.teamMembers.leader.name,
                eventName: 'ProtoPlanet (Hardware Innovation Sprint)',
                registrationId: registrationId,
                details: [
                    { label: 'Team Name', value: registrationData.teamDetails.teamName },
                    { label: 'Institution Name', value: registrationData.teamDetails.institutionName },
                    { label: 'Project Title', value: registrationData.projectDetails.projectTitle },
                    { label: 'Transaction ID', value: registrationData.paymentDetails.transactionId }
                ]
            }).catch(err => console.error('Error sending confirmation email:', err));
        }

        res.status(200).json({
            success: true,
            message: 'Registration successful',
            data: { 
                teamName: registrationData.teamDetails.teamName, 
                submittedAt: registrationData.submittedAt 
            }
        });

    } catch (error) {
        console.error('ProtoPlanet error:', error);
        res.status(500).json({ success: false, message: 'Registration failed: ' + error.message });
    }
});

// Check registration status
router.get('/status/:registrationId', async (req, res) => {
    try {
        const docSnap = await getDoc(doc(db, 'protoplanet-registrations', req.params.registrationId));
        if (!docSnap.exists()) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }
        const data = docSnap.data();
        res.json({ success: true, data: { registrationId: data.registrationId, teamName: data.teamDetails?.teamName || data.teamName, status: data.status, submittedAt: data.submittedAt } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to check status', error: error.message });
    }
});

export default router;