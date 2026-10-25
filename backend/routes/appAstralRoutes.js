import express from 'express';
import multer from 'multer';
import { db } from '../utils/firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import crypto from 'crypto';
import { sendConfirmationEmail } from '../utils/emailHelper.js';

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 15 * 1024 * 1024 } // 15MB
});

const cpUpload = upload.fields([
    { name: 'member1Payment', maxCount: 1 },
    { name: 'member2Payment', maxCount: 1 },
    { name: 'member3Payment', maxCount: 1 },
    { name: 'prototypeScreens', maxCount: 1 },
    { name: 'paymentScreenshot', maxCount: 1 }
]);

router.post('/register', cpUpload, async (req, res) => {
    console.log('=== AppAstral Registration ===');
    try {
        const formData = req.body;
        let screensUrl = null;
        let paymentUrl = null;

        // Parse JSON strings
        try {
            ['member1', 'member2', 'member3'].forEach(m => {
                if (formData[m]) formData[m] = JSON.parse(formData[m]);
            });
        } catch (e) {
            return res.status(400).json({ success: false, message: 'Invalid JSON data in form submission' });
        }

        // Validate required fields
        const requiredFields = ['teamName', 'institutionName', 'cityState'];
        const missingFields = requiredFields.filter(f => !formData[f]);
        if (missingFields.length > 0) {
            return res.status(400).json({ success: false, message: `Missing required fields: ${missingFields.join(', ')}` });
        }

        if (!formData.member1?.name || !formData.member2?.name) {
            return res.status(400).json({ success: false, message: 'Team Leader and Member 2 details are required' });
        }

        // Upload prototype screens if provided
        const screensFile = req.files?.['prototypeScreens']?.[0];
        if (screensFile) {
            console.log('Uploading AppAstral prototype screens to Cloudinary...');
            screensUrl = await uploadToCloudinary(screensFile.buffer, 'innoverse/appastral/designs', screensFile.mimetype);
        }

        // Upload member payment screenshots
        let member1PaymentUrl = null;
        let member2PaymentUrl = null;
        let member3PaymentUrl = null;

        const m1File = req.files?.['member1Payment']?.[0];
        if (m1File) {
            member1PaymentUrl = await uploadToCloudinary(m1File.buffer, 'innoverse/appastral/payments', m1File.mimetype);
        }
        const m2File = req.files?.['member2Payment']?.[0];
        if (m2File) {
            member2PaymentUrl = await uploadToCloudinary(m2File.buffer, 'innoverse/appastral/payments', m2File.mimetype);
        }
        const m3File = req.files?.['member3Payment']?.[0];
        if (m3File) {
            member3PaymentUrl = await uploadToCloudinary(m3File.buffer, 'innoverse/appastral/payments', m3File.mimetype);
        }

        const paymentFile = req.files?.['paymentScreenshot']?.[0];
        if (paymentFile) {
            paymentUrl = await uploadToCloudinary(paymentFile.buffer, 'innoverse/appastral/payments', paymentFile.mimetype);
        }

        // Save to Firestore
        const registrationId = `AA-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
        // Format data for Firestore in the exact order of form steps
        const registrationData = {
            registrationId,
            registrationType: 'appastral',

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

            // Step 3: Prototype / Project Details
            prototypeDetails: {
                prototypeTool: formData.prototypeTool,
                otherTool: formData.otherTool || '',
                prototypeLink: formData.prototypeLink || '',
                appSyncDescription: formData.appSyncDescription,
                additionalNotes: formData.additionalNotes || '',
                screensUrl
            },

            // Step 4: Payment Details
            paymentDetails: {
                feeType: formData.feeType,
                transactionId: formData.transactionId,
                screenshotUrl: paymentUrl
            },

            // Metadata
            submittedAt: new Date().toISOString(),
            status: 'submitted',
            lastUpdated: new Date().toISOString()
        };

        await setDoc(doc(db, 'appastral-registrations', registrationId), registrationData);
        console.log('AppAstral registration saved to Firestore:', registrationId);

        // Send confirmation email to team leader in background
        if (registrationData.teamMembers?.leader?.email) {
            sendConfirmationEmail({
                toEmail: registrationData.teamMembers.leader.email,
                leaderName: registrationData.teamMembers.leader.name,
                eventName: 'AppAstral (UI/UX Design Sprint)',
                registrationId: registrationId,
                details: [
                    { label: 'Team Name', value: registrationData.teamDetails.teamName },
                    { label: 'Institution Name', value: registrationData.teamDetails.institutionName },
                    { label: 'Prototype Tool', value: registrationData.prototypeDetails.prototypeTool },
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
        console.error('AppAstral error:', error);
        res.status(500).json({ success: false, message: 'Registration failed: ' + error.message });
    }
});

export default router;
