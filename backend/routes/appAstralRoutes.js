import express from 'express';
import multer from 'multer';
import { db } from '../utils/firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import crypto from 'crypto';

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 15 * 1024 * 1024 } // 15MB
});

const cpUpload = upload.fields([
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
        const requiredFields = ['teamName', 'institutionName', 'cityState', 'prototypeTool', 'appSyncDescription', 'feeType', 'transactionId'];
        const missingFields = requiredFields.filter(f => !formData[f]);
        if (missingFields.length > 0) {
            return res.status(400).json({ success: false, message: `Missing required fields: ${missingFields.join(', ')}` });
        }

        // Upload prototype screens to Cloudinary
        const screensFile = req.files?.['prototypeScreens']?.[0];
        if (screensFile) {
            console.log('Uploading AppAstral prototype screens to Cloudinary...');
            screensUrl = await uploadToCloudinary(screensFile.buffer, 'innoverse/appastral/designs', screensFile.mimetype);
        } else {
            return res.status(400).json({ success: false, message: 'Prototype screens/PDF upload is required' });
        }

        // Upload payment screenshot to Cloudinary
        const paymentFile = req.files?.['paymentScreenshot']?.[0];
        if (paymentFile) {
            console.log('Uploading AppAstral payment screenshot to Cloudinary...');
            paymentUrl = await uploadToCloudinary(paymentFile.buffer, 'innoverse/appastral/payments', paymentFile.mimetype);
        } else {
            return res.status(400).json({ success: false, message: 'Payment screenshot is required' });
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
