import express from 'express';
import { db } from '../utils/firebase.js';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import crypto from 'crypto';
import { sendConfirmationEmail } from '../utils/emailHelper.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    console.log('=== Innothon Registration ===');
    try {
        const formData = req.body;
        let screenshotUrl = null;

        // Validate required fields
        const requiredFields = [
            'teamName', 
            'institutionName', 
            'cityState', 
            'problemStatement', 
            'leaderName', 
            'leaderEmail', 
            'leaderPhone',
            'motivationStatement',
            'feeType', 
            'transactionId'
        ];
        
        const missingFields = requiredFields.filter(f => !formData[f]);
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                success: false, 
                message: `Missing required fields: ${missingFields.join(', ')}` 
            });
        }

        // Process Base64 screenshot → upload to Cloudinary
        if (formData.transactionScreenshot && formData.transactionScreenshot.startsWith('data:image')) {
            console.log('Uploading Innothon payment screenshot to Cloudinary...');
            try {
                const base64Data = formData.transactionScreenshot.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                const mimeMatch = formData.transactionScreenshot.match(/^data:(image\/\w+);base64,/);
                const mimetype = mimeMatch ? mimeMatch[1] : 'image/png';
                screenshotUrl = await uploadToCloudinary(buffer, 'innoverse/innothon/payments', mimetype);
            } catch (err) {
                console.error('Base64 upload failed:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to save payment receipt'
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'Payment screenshot is required'
            });
        }

        // Generate Confirmation / Registration ID
        const registrationId = `INN-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

        // Format data for Firestore in the exact order of form steps
        const registrationData = {
            registrationId,
            registrationType: 'innothon',

            // Step 1: Team Details
            teamDetails: {
                teamName: formData.teamName,
                institutionName: formData.institutionName,
                cityState: formData.cityState,
                problemStatement: formData.problemStatement
            },

            // Step 2: Team Members
            teamMembers: {
                leader: {
                    name: formData.leaderName,
                    email: formData.leaderEmail,
                    phone: formData.leaderPhone,
                    altEmail: formData.leaderAltEmail || '',
                    isIETMember: formData.leaderIsIETMember ? 'yes' : 'no',
                    ietMembershipId: formData.leaderIetMembershipId || ''
                },
                member2: formData.member2 || {},
                member3: formData.member3 || {},
                member4: formData.member4 || {}
            },

            // Step 3: Additional Information
            additionalInfo: {
                motivationStatement: formData.motivationStatement
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

        console.log('Saving Innothon registration to Firestore collection...');
        await setDoc(doc(db, 'innothon-registrations', registrationId), registrationData);
        console.log('Innothon registration saved successfully:', registrationId);

        // Send confirmation email to team leader in background
        if (registrationData.teamMembers?.leader?.email) {
            sendConfirmationEmail({
                toEmail: registrationData.teamMembers.leader.email,
                leaderName: registrationData.teamMembers.leader.name,
                eventName: 'InnoThon (24-Hour Prototype Hackathon)',
                registrationId: registrationId,
                details: [
                    { label: 'Team Name', value: registrationData.teamDetails.teamName },
                    { label: 'Institution Name', value: registrationData.teamDetails.institutionName },
                    { label: 'Problem Statement', value: registrationData.teamDetails.problemStatement },
                    { label: 'Transaction ID', value: registrationData.paymentDetails.transactionId }
                ]
            }).catch(err => console.error('Error sending confirmation email:', err));
        }

        res.status(200).json({
            success: true,
            message: 'Registration successful',
            data: {
                registrationId,
                teamName: registrationData.teamDetails.teamName,
                leaderName: registrationData.teamMembers.leader.name,
                email: registrationData.teamMembers.leader.email,
                submittedAt: registrationData.submittedAt
            }
        });

    } catch (error) {
        console.error('Innothon registration error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Registration failed: ' + error.message 
        });
    }
});

// Check registration details/status
router.get('/status/:registrationId', async (req, res) => {
    try {
        const docSnap = await getDoc(doc(db, 'innothon-registrations', req.params.registrationId));
        if (!docSnap.exists()) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }
        res.status(200).json({ success: true, data: docSnap.data() });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve details', error: error.message });
    }
});

export default router;
