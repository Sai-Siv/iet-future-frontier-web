import express from 'express';
import { db } from '../utils/firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import crypto from 'crypto';

const router = express.Router();

router.post('/register', async (req, res) => {
    console.log('=== StartupSphere Registration ===');
    try {
        const formData = req.body;
        let screenshotUrl = null;

        // Validate required fields
        const requiredFields = ['teamName', 'institutionName', 'cityState', 'feeType', 'transactionId'];
        const missingFields = requiredFields.filter(f => !formData[f]);
        if (missingFields.length > 0) {
            return res.status(400).json({ success: false, message: `Missing required fields: ${missingFields.join(', ')}` });
        }

        // Process Base64 screenshot → upload to Cloudinary
        if (formData.transactionScreenshot && formData.transactionScreenshot.startsWith('data:image')) {
            console.log('Uploading StartupSphere payment screenshot to Cloudinary...');
            const base64Data = formData.transactionScreenshot.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');
            const mimeMatch = formData.transactionScreenshot.match(/^data:(image\/\w+);base64,/);
            const mimetype = mimeMatch ? mimeMatch[1] : 'image/png';
            screenshotUrl = await uploadToCloudinary(buffer, 'innoverse/startupsphere/payments', mimetype);
        }

        // Save to Firestore
        const registrationId = `SS-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
        // Format data for Firestore in the exact order of form steps
        const registrationData = {
            registrationId,
            registrationType: 'startupsphere',

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

            // Step 3: Startup Details
            startupDetails: {
                track: formData.track || '',
                startupTitle: formData.startupTitle || '',
                problemStatement: formData.problemStatement || '',
                proposedSolution: formData.proposedSolution || '',
                businessModel: formData.businessModel || '',
                marketOpportunity: formData.marketOpportunity || '',
                goToMarketStrategy: formData.goToMarketStrategy || '',
                expectedImpact: formData.expectedImpact || ''
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

        await setDoc(doc(db, 'startupsphere-registrations', registrationId), registrationData);
        console.log('StartupSphere registration saved to Firestore:', registrationId);

        res.status(200).json({
            success: true,
            message: 'Registration successful',
            data: { 
                teamName: registrationData.teamDetails.teamName, 
                submittedAt: registrationData.submittedAt 
            }
        });

    } catch (error) {
        console.error('StartupSphere error:', error);
        res.status(500).json({ success: false, message: 'Registration failed: ' + error.message });
    }
});

export default router;
