import express from 'express';
import { db } from '../utils/firebase.js';
import { collection, query, where, getDocs, doc, setDoc, orderBy } from 'firebase/firestore';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    console.log('Received PATN registration data:', req.body);

    // Validate required fields
    const requiredFields = [
      'title',
      'fullName',
      'category',
      'department',
      'institutionName',
      'isIETMember',
      'mobileNumber',
      'emailAddress',
      'zoneVenue',
      'youtubeLink'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Connect to Firestore collection
    const patnCollection = collection(db, 'patn-registrations');

    // Check for existing email
    const q = query(patnCollection, where('emailAddress', '==', req.body.emailAddress));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return res.status(400).json({
        success: false,
        message: 'This email address is already registered'
      });
    }

    // Prepare registration data in step-by-step structure
    const registrationId = `PATN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const registrationData = {
      registrationId,
      registrationType: 'patn',

      // Step 1: Participant Details
      participantDetails: {
        title: req.body.title,
        fullName: req.body.fullName,
        category: req.body.category,
        department: req.body.department,
        institutionName: req.body.institutionName,
        isIETMember: req.body.isIETMember,
        mobileNumber: req.body.mobileNumber,
        emailAddress: req.body.emailAddress
      },

      // Step 2: Presentation Details
      presentationDetails: {
        zoneVenue: req.body.zoneVenue,
        youtubeLink: req.body.youtubeLink
      },

      // Metadata
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    // Save to Firestore doc
    const docRef = doc(db, 'patn-registrations', registrationId);
    await setDoc(docRef, registrationData);
    
    console.log('PATN Registration saved successfully in Firestore:', {
      registrationId: registrationData.registrationId
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        registrationId: registrationData.registrationId,
        email: registrationData.emailAddress
      }
    });
  } catch (error) {
    console.error('PATN Registration error:', {
      message: error.message,
      stack: error.stack,
      time: new Date().toISOString()
    });

    res.status(500).json({
      success: false,
      message: 'Failed to process registration. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all PATN registrations (for admin purposes)
router.get('/registrations', async (req, res) => {
  try {
    const patnCollection = collection(db, 'patn-registrations');
    const q = query(patnCollection, orderBy('submittedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const registrations = [];
    querySnapshot.forEach(docSnapshot => {
      registrations.push(docSnapshot.data());
    });

    res.json({
      success: true,
      data: registrations
    });
  } catch (error) {
    console.error('Error fetching PATN registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registrations',
      error: error.message
    });
  }
});

export default router;