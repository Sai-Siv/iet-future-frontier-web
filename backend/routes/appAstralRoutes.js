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

router.post('/register', upload.any(), async (req, res) => {
    console.log('=== AppAstral Registration ===');
    try {
        if (Array.isArray(req.files)) {
            const filesMap = {};
            req.files.forEach(file => {
                if (!filesMap[file.fieldname]) {
                    filesMap[file.fieldname] = [];
                }
                filesMap[file.fieldname].push(file);
            });
            req.files = filesMap;
        }
        const formData = req.body;

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

        // Upload member accommodation payment screenshots
        let member1AccommodationPaymentUrl = null;
        let member2AccommodationPaymentUrl = null;
        let member3AccommodationPaymentUrl = null;

        const m1AccFile = req.files?.['member1AccommodationPayment']?.[0];
        if (m1AccFile) {
            member1AccommodationPaymentUrl = await uploadToCloudinary(m1AccFile.buffer, 'innoverse/appastral/accommodation', m1AccFile.mimetype);
        }
        const m2AccFile = req.files?.['member2AccommodationPayment']?.[0];
        if (m2AccFile) {
            member2AccommodationPaymentUrl = await uploadToCloudinary(m2AccFile.buffer, 'innoverse/appastral/accommodation', m2AccFile.mimetype);
        }
        const m3AccFile = req.files?.['member3AccommodationPayment']?.[0];
        if (m3AccFile) {
            member3AccommodationPaymentUrl = await uploadToCloudinary(m3AccFile.buffer, 'innoverse/appastral/accommodation', m3AccFile.mimetype);
        }

        const paymentFile = req.files?.['paymentScreenshot']?.[0];
        if (paymentFile && !member1PaymentUrl) {
            member1PaymentUrl = await uploadToCloudinary(paymentFile.buffer, 'innoverse/appastral/payments', paymentFile.mimetype);
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
                    ietMembershipId: formData.member1?.ietMembershipId || '',
                    transactionId: formData.member1?.transactionId || '',
                    paymentUrl: member1PaymentUrl || '',
                    accommodation: formData.member1?.accommodation || 'no',
                    accommodationTransactionId: formData.member1?.accommodationTransactionId || '',
                    accommodationPaymentUrl: member1AccommodationPaymentUrl || ''
                },
                member2: {
                    name: formData.member2?.name || '',
                    email: formData.member2?.email || '',
                    phone: formData.member2?.phone || '',
                    yearBranch: formData.member2?.yearBranch || '',
                    isIETMember: formData.member2?.isIETMember ? 'yes' : 'no',
                    ietMembershipId: formData.member2?.ietMembershipId || '',
                    transactionId: formData.member2?.transactionId || '',
                    paymentUrl: member2PaymentUrl || '',
                    accommodation: formData.member2?.accommodation || 'no',
                    accommodationTransactionId: formData.member2?.accommodationTransactionId || '',
                    accommodationPaymentUrl: member2AccommodationPaymentUrl || ''
                },
                member3: formData.member3?.name ? {
                    name: formData.member3.name,
                    email: formData.member3.email || '',
                    phone: formData.member3.phone || '',
                    yearBranch: formData.member3.yearBranch || '',
                    isIETMember: formData.member3.isIETMember ? 'yes' : 'no',
                    ietMembershipId: formData.member3.ietMembershipId || '',
                    transactionId: formData.member3.transactionId || '',
                    paymentUrl: member3PaymentUrl || '',
                    accommodation: formData.member3.accommodation || 'no',
                    accommodationTransactionId: formData.member3.accommodationTransactionId || '',
                    accommodationPaymentUrl: member3AccommodationPaymentUrl || ''
                } : null
            },

            // Metadata
            termsAccepted: formData.termsAccepted === 'true' || formData.termsAccepted === true,
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
                    { label: 'Accommodation (Leader)', value: registrationData.teamMembers.leader.accommodation === 'yes' ? 'Yes' : 'No' }
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
