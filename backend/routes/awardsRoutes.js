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
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit per file
});

// Test endpoint
router.get('/test', (req, res) => {
    res.json({ message: 'Awards API is working!' });
});

// Use .any() to accept dynamic file field names
router.post('/register', upload.any(), async (req, res) => {
    console.log('=== Awards Application Registration ===');
    try {
        const formData = req.body;
        const files = req.files || [];

        // Parse any JSON strings back to objects (arrays sent as JSON strings)
        for (const key in formData) {
            try {
                if (typeof formData[key] === 'string' && (formData[key].startsWith('[') || formData[key].startsWith('{'))) {
                    formData[key] = JSON.parse(formData[key]);
                }
            } catch (e) {
                // Ignore parse errors, it just means it's a regular string
            }
        }

        // Upload all files to Cloudinary concurrently
        const uploadedFilesMap = {}; // Maps fieldname -> Cloudinary URL
        const uploadPromises = files.map(async (file) => {
            console.log(`Uploading file ${file.fieldname} (${file.originalname}) to Cloudinary...`);
            const url = await uploadToCloudinary(file.buffer, 'innoverse/awards/documents', file.mimetype);
            uploadedFilesMap[file.fieldname] = url;
            return url;
        });
        
        await Promise.all(uploadPromises);

        // Combine text fields and file URLs
        const combinedData = { ...formData, ...uploadedFilesMap };

        // Save to Firestore
        const registrationId = `AWD-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
        
        const registrationData = {
            registrationId,
            registrationType: 'awards',
            isStudent: formData.isStudent === 'true',
            isProfessional: formData.isProfessional === 'true',
            awardCategoryTitle: formData.awardCategoryTitle || 'Unknown',
            responses: combinedData,
            
            // Extract standard fields for easier searching if they exist in standard IDs
            name: formData['1508358313'] || 'Unknown',
            email: formData['6064807'] || '',
            phone: formData['952420036'] || '',
            institution: formData['384312110'] || '',
            
            submittedAt: new Date().toISOString(),
            status: 'submitted',
            lastUpdated: new Date().toISOString()
        };

        // Remove the metadata fields from the generic responses object to avoid duplication
        delete registrationData.responses.isStudent;
        delete registrationData.responses.isProfessional;
        delete registrationData.responses.awardCategoryTitle;

        await setDoc(doc(db, 'awards', registrationId), registrationData);
        console.log('Awards registration saved to Firestore:', registrationId);

        // Send confirmation email (optional)
        if (registrationData.email) {
            try {
                // Determine template based on category
                let emailTemplate = 'awards_registration';
                
                await sendConfirmationEmail(
                    registrationData.email,
                    registrationData.name,
                    registrationId,
                    emailTemplate
                );
                console.log('Confirmation email sent successfully');
            } catch (emailError) {
                console.error('Failed to send confirmation email:', emailError);
                // We don't fail the registration if email fails
            }
        }

        res.status(200).json({ 
            success: true, 
            message: 'Application submitted successfully',
            registrationId 
        });

    } catch (error) {
        console.error('Awards Registration Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to submit application',
            error: error.message 
        });
    }
});

export default router;
