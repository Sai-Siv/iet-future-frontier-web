import React, { useState, useRef, FormEvent } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Users, UserPlus, Smartphone, CreditCard, CheckCircle, Copy } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  yearBranch: string;
  isIETMember: boolean;
  ietMembershipId: string;
}

interface FormData {
  teamName: string;
  institutionName: string;
  cityState: string;
  member1: TeamMember;
  member2: TeamMember;
  member3: TeamMember;
  track: string;
  startupTitle: string;
  problemStatement: string;
  proposedSolution: string;
  businessModel: string;
  marketOpportunity: string;
  goToMarketStrategy: string;
  expectedImpact: string;
  feeType: string;
  transactionId: string;
  transactionScreenshot: string;
  termsAccepted: boolean;
}

const StartupSphere = () => {
  const [currentStep, setCurrentStep] = useState('team-details');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const goToStep = (step: string) => {
    setIsTransitioning(true); // Start fading out

    // Wait for the 300ms fade-out transition to complete
    setTimeout(() => {
      setCurrentStep(step); // Swap content while invisible
      
      // Instantly jump to the top of the tabs while invisible
      if (tabsRef.current) {
        const headerOffset = 120;
        const elementPosition = tabsRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
        window.scrollTo({
          top: offsetPosition,
          behavior: 'auto'
        });
      }

      // Fade the new content back in
      setIsTransitioning(false);
    }, 300);
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({
    status: 'idle',
    message: ''
  });

  // File upload state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    institutionName: '',
    cityState: '',
    member1: {
      name: '',
      email: '',
      phone: '',
      yearBranch: '',
      isIETMember: false,
      ietMembershipId: ''
    },
    member2: {
      name: '',
      email: '',
      phone: '',
      yearBranch: '',
      isIETMember: false,
      ietMembershipId: ''
    },
    member3: {
      name: '',
      email: '',
      phone: '',
      yearBranch: '',
      isIETMember: false,
      ietMembershipId: ''
    },
    track: '',
    startupTitle: '',
    problemStatement: '',
    proposedSolution: '',
    businessModel: '',
    marketOpportunity: '',
    goToMarketStrategy: '',
    expectedImpact: '',
    feeType: '',
    transactionId: '',
    transactionScreenshot: '',
    termsAccepted: false
  });

  const isMobile = useIsMobile();

  const tracks = [
    'AI & ML-Driven Solutions',
    'IoT & Smart Systems',
    'Blockchain & FinTech',
    'HealthTech & BioTech',
    'SpaceTech & Robotics',
    'EdTech & Digital Learning',
    'GreenTech & Sustainability'
  ];

  const handleInputChange = (section: string, field: string, value: string | boolean) => {
    setFormData(prev => {
      if (field === '') {
        return {
          ...prev,
          [section]: value
        };
      } else if (section.startsWith('member')) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value
          }
        };
      } else {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value
          }
        };
      }
    });
  };

  // File upload handlers
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (PNG, JPG, JPEG)');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const missingFields: string[] = [];

    // Team Details validation
    if (!formData.teamName) missingFields.push('Team Name');
    if (!formData.institutionName) missingFields.push('Institution Name');
    if (!formData.cityState) missingFields.push('City & State');

    // Member 1 (Team Leader) validation
    if (!formData.member1.name) missingFields.push('Team Leader - Full Name');
    if (!formData.member1.email) missingFields.push('Team Leader - Email');
    if (!formData.member1.phone) missingFields.push('Team Leader - Phone Number');
    if (!formData.member1.yearBranch) missingFields.push('Team Leader - Year & Branch');
    if (formData.member1.isIETMember && !formData.member1.ietMembershipId) {
      missingFields.push('Team Leader - IET Membership ID');
    }

    // Member 2 validation
    if (!formData.member2.name) missingFields.push('Member 2 - Full Name');
    if (!formData.member2.email) missingFields.push('Member 2 - Email');
    if (!formData.member2.phone) missingFields.push('Member 2 - Phone Number');
    if (!formData.member2.yearBranch) missingFields.push('Member 2 - Year & Branch');
    if (formData.member2.isIETMember && !formData.member2.ietMembershipId) {
      missingFields.push('Member 2 - IET Membership ID');
    }

    // Member 3 validation (optional - only validate if a Name is provided)
    if (formData.member3.name && formData.member3.name.trim() !== '') {
      if (!formData.member3.email) missingFields.push('Member 3 - Email');
      if (!formData.member3.phone) missingFields.push('Member 3 - Phone Number');
      if (!formData.member3.yearBranch) missingFields.push('Member 3 - Year & Branch');
      if (formData.member3.isIETMember && !formData.member3.ietMembershipId) {
        missingFields.push('Member 3 - IET Membership ID');
      }
    }

    // Startup details validation
    if (!formData.track) missingFields.push('Startup Track');
    if (!formData.startupTitle) missingFields.push('Startup Title');
    if (!formData.problemStatement) missingFields.push('Problem Statement');
    if (!formData.proposedSolution) missingFields.push('Proposed Solution');
    if (!formData.businessModel) missingFields.push('Business Model');
    if (!formData.marketOpportunity) missingFields.push('Market Opportunity');
    if (!formData.goToMarketStrategy) missingFields.push('Go-to-Market Strategy');
    if (!formData.expectedImpact) missingFields.push('Expected Impact');

    // Payment details validation
    if (!formData.feeType) missingFields.push('Fee Type');
    if (!formData.transactionId) missingFields.push('Transaction Reference Number');
    if (!uploadedImage) missingFields.push('Transaction Screenshot');
    if (!formData.termsAccepted) missingFields.push('Terms and Conditions Acceptance');

    if (missingFields.length > 0) {
      const sections: { [key: string]: string[] } = {
        'Team Details': missingFields.filter(f => !f.includes('-') && !f.includes('Startup') && !f.includes('Problem') && !f.includes('Proposed') && !f.includes('Business') && !f.includes('Market') && !f.includes('Go-to-Market') && !f.includes('Expected') && !f.includes('Fee') && !f.includes('Transaction') && !f.includes('Terms')),
        'Team Members': missingFields.filter(f => f.includes('-')),
        'Startup Details': missingFields.filter(f => f.includes('Startup') || f.includes('Problem') || f.includes('Proposed') || f.includes('Business') || f.includes('Market') || f.includes('Go-to-Market') || f.includes('Expected')),
        'Payment & Declaration': missingFields.filter(f => f.includes('Fee') || f.includes('Transaction') || f.includes('Terms'))
      };

      let message = 'Please fill in the following required fields:\n\n';
      
      for (const [section, fields] of Object.entries(sections)) {
        if (fields.length > 0) {
          message += `${section}:\n${fields.map(f => `• ${f}`).join('\n')}\n\n`;
        }
      }

      alert(message);

      // Set the current step to the first section that has missing fields
      if (sections['Team Details'].length > 0) {
        goToStep('team-details');
      } else if (sections['Team Members'].length > 0) {
        goToStep('team-members');
      } else if (sections['Startup Details'].length > 0) {
        goToStep('startup-details');
      } else if (sections['Payment & Declaration'].length > 0) {
        goToStep('payment');
      }

      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmissionStatus({
        status: 'submitting',
        message: 'Submitting registration...'
      });

      const response = await fetch('https://iet-future-frontier-web.onrender.com/api/startupsphere/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          transactionScreenshot: uploadedImage
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const result = await response.json();
      console.log('Server response:', result);

      setSubmissionStatus({
        status: 'success',
        message: 'Registration successful! We will contact you shortly.'
      });

      // Reset form
      setFormData({
        teamName: '',
        institutionName: '',
        cityState: '',
        member1: {
          name: '',
          email: '',
          phone: '',
          yearBranch: '',
          isIETMember: false,
          ietMembershipId: ''
        },
        member2: {
          name: '',
          email: '',
          phone: '',
          yearBranch: '',
          isIETMember: false,
          ietMembershipId: ''
        },
        member3: {
          name: '',
          email: '',
          phone: '',
          yearBranch: '',
          isIETMember: false,
          ietMembershipId: ''
        },
        track: '',
        startupTitle: '',
        problemStatement: '',
        proposedSolution: '',
        businessModel: '',
        marketOpportunity: '',
        goToMarketStrategy: '',
        expectedImpact: '',
        feeType: '',
        transactionId: '',
        transactionScreenshot: '',
        termsAccepted: false
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep('team-details');

      alert('Registration successful! We will contact you shortly.');
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionStatus({
        status: 'error',
        message: 'Error: ' + (error as Error).message
      });
      alert('Error submitting form: ' + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStatusMessage = () => {
    if (submissionStatus.status === 'idle') return null;

    const statusColors = {
      submitting: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800'
    };

    return (
      <div className={`p-4 rounded-lg mb-4 ${statusColors[submissionStatus.status]}`}>
        <p className="font-medium">{submissionStatus.message}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black w-full overflow-clip">


      <Navigation />

      {/* Background with subtle star-like dots */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <div className="stars-small"></div>
          <div className="stars-medium"></div>
          <div className="stars-large"></div>
        </div>
        {/* Floating orbs with subtle glow */}
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full blur-sm animate-pulse" style={{ backgroundColor: '#EE7520', boxShadow: '0 0 15px rgba(238,117,32,0.4)' }}></div>
        <div className="absolute bottom-20 right-10 w-1.5 h-1.5 rounded-full blur-sm animate-pulse" style={{ backgroundColor: '#EE7520', boxShadow: '0 0 15px rgba(238,117,32,0.4)', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-20 w-3 h-3 rounded-full blur-sm animate-pulse" style={{ backgroundColor: '#EE7520', boxShadow: '0 0 15px rgba(238,117,32,0.4)', animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-24 w-2 h-2 rounded-full blur-sm animate-pulse" style={{ backgroundColor: '#EE7520', boxShadow: '0 0 15px rgba(238,117,32,0.4)', animationDelay: '3s' }}></div>
      </div>

      <main className="pt-2 pb-16 relative z-10">
        <div className="container mx-auto px-2 sm:px-4 w-full max-w-6xl md:w-auto md:max-w-6xl">
          {/* Add status message at the top of the form */}
          {renderStatusMessage()}

          <div className="text-center mb-16 pt-8">

            
            <div className="mb-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-4">
                <span className="text-white">Startup</span>
                <span style={{ color: '#EE7520' }}>Sphere</span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-300 mb-4">
                Startup Innovation & Entrepreneurship Challenge 2025
              </h2>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 text-white">
                <span className="text-xl">💡</span>
                Innovate. Build. Scale.
              </span>
            </div>

            <div className="inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-6 py-3" style={{ background: '#671F20', borderColor: '#EE7520', borderWidth: 1 }}>
              <span className="text-white font-medium">Registration Deadline: 15 August 2025</span>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div ref={tabsRef} className="flex items-center justify-center gap-2 mb-8 w-full">
            <button
              onClick={() => goToStep('team-details')}
              className={`flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors ${
                currentStep === 'team-details'
                  ? 'text-white'
                  : 'bg-black/40 text-gray-400 hover:text-white'
              }`}
              style={currentStep === 'team-details' ? { backgroundColor: '#EE7520' } : {}}
            >
              <Users className="w-6 h-6 md:w-5 md:h-5" />
              {!isMobile && <span>Team Details</span>}
            </button>
            {/* Gradient Separator */}
            <div
              className="hidden md:block w-8 h-1 mx-1 rounded-full"
              style={{ background: 'linear-gradient(to right, #EE7520, #000)' }}
            ></div>
            <div
              className="block md:hidden w-8 h-1 my-1 rounded-full"
              style={{ background: 'linear-gradient(to right, #EE7520, #000)' }}
            ></div>
            <button
              onClick={() => goToStep('team-members')}
              className={`flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors ${
                currentStep === 'team-members'
                  ? 'text-white'
                  : 'bg-black/40 text-gray-400 hover:text-white'
              }`}
              style={currentStep === 'team-members' ? { backgroundColor: '#EE7520' } : {}}
            >
              <UserPlus className="w-6 h-6 md:w-5 md:h-5" />
              {!isMobile && <span>Team Members</span>}
            </button>
            {/* Gradient Separator */}
            <div
              className="hidden md:block w-8 h-1 mx-1 rounded-full"
              style={{ background: 'linear-gradient(to right, #EE7520, #000)' }}
            ></div>
            <div
              className="block md:hidden w-8 h-1 my-1 rounded-full"
              style={{ background: 'linear-gradient(to right, #EE7520, #000)' }}
            ></div>
            <button
              onClick={() => goToStep('startup-details')}
              className={`flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors ${
                currentStep === 'startup-details'
                  ? 'text-white'
                  : 'bg-black/40 text-gray-400 hover:text-white'
              }`}
              style={currentStep === 'startup-details' ? { backgroundColor: '#EE7520' } : {}}
            >
              <Smartphone className="w-6 h-6 md:w-5 md:h-5" />
              {!isMobile && <span>Startup Details</span>}
            </button>
            {/* Gradient Separator */}
            <div
              className="hidden md:block w-8 h-1 mx-1 rounded-full"
              style={{ background: 'linear-gradient(to right, #EE7520, #000)' }}
            ></div>
            <div
              className="block md:hidden w-8 h-1 my-1 rounded-full"
              style={{ background: 'linear-gradient(to right, #EE7520, #000)' }}
            ></div>
            <button
              onClick={() => goToStep('payment')}
              className={`flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors ${
                currentStep === 'payment'
                  ? 'text-white'
                  : 'bg-black/40 text-gray-400 hover:text-white'
              }`}
              style={currentStep === 'payment' ? { backgroundColor: '#EE7520' } : {}}
            >
              <CreditCard className="w-6 h-6 md:w-5 md:h-5" />
              {!isMobile && <span>Payment</span>}
            </button>
          </div>

          {/* Form Section */}
          <div className={`bg-[#000] backdrop-blur-sm rounded-2xl p-4 sm:p-8 md:p-12 
            shadow-[0_19px_38px_#EE7520,0_15px_12px_#EE7520] w-full max-w-4xl mx-auto overflow-x-auto min-h-[650px] transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <form className="space-y-8">
              {currentStep === 'team-details' ? (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Team Details</h2>
                  </div>
                  <p className="text-gray-300 mb-4 text-sm">
                    Basic information about your team and institution
                  </p>

                  <div className="space-y-3 max-w-3xl mx-auto">
                    <div>
                      <label className="block text-white font-medium mb-1" htmlFor="teamName">
                        Team Name <span style={{ color: '#EE7520' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="teamName"
                        placeholder="Enter team name"
                        value={formData.teamName}
                        onChange={(e) => handleInputChange('teamName', '', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                      />
                      <p className="text-gray-400 text-xs mt-1">
                        Choose a short and unique name for your team
                      </p>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-1" htmlFor="institutionName">
                        Institution Name <span style={{ color: '#EE7520' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="institutionName"
                        placeholder="College/University name"
                        value={formData.institutionName}
                        onChange={(e) => handleInputChange('institutionName', '', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-1" htmlFor="cityState">
                        City & State <span style={{ color: '#EE7520' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="cityState"
                        placeholder="e.g., Hyderabad, Telangana"
                        value={formData.cityState}
                        onChange={(e) => handleInputChange('cityState', '', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                      />
                    </div>
                  </div>
                </>
              ) : currentStep === 'team-members' ? (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <UserPlus className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Team Members</h2>
                  </div>
                  <p className="text-gray-300 mb-4 text-sm">
                    Enter the details of your team members
                  </p>
                  <div className="space-y-6 max-w-3xl mx-auto">
                    {/* Team Leader Section */}
                    <div className="space-y-2 bg-white/5 rounded-xl p-4" style={{ border: '1.5px solid #EE7520' }}>
                      <h3 className="text-lg font-semibold text-white">Team Leader (Member 1) <span style={{ color: '#EE7520' }}>*</span></h3>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Full Name <span style={{ color: '#EE7520' }}>*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter full name"
                          value={formData.member1.name}
                          onChange={(e) => handleInputChange('member1', 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Email ID <span style={{ color: '#EE7520' }}>*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="email@example.com"
                          value={formData.member1.email}
                          onChange={(e) => handleInputChange('member1', 'email', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Phone Number <span style={{ color: '#EE7520' }}>*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 12345 67890"
                          value={formData.member1.phone}
                          onChange={(e) => handleInputChange('member1', 'phone', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Year & Branch <span style={{ color: '#EE7520' }}>*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 3rd Year CSE"
                          value={formData.member1.yearBranch}
                          onChange={(e) => handleInputChange('member1', 'yearBranch', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="leader-iet-member"
                            checked={formData.member1.isIETMember}
                            onChange={(e) => handleInputChange('member1', 'isIETMember', e.target.checked)}
                            className="w-4 h-4 rounded border-[#EE7520]/20 text-[#EE7520] focus:ring-[#EE7520] bg-white/10"
                          />
                          <label htmlFor="leader-iet-member" className="ml-2 text-white">
                            IET Student Member
                          </label>
                        </div>
                        {formData.member1.isIETMember && (
                          <div>
                            <label className="block text-white font-medium mb-1">
                              IET Membership ID <span style={{ color: '#EE7520' }}>*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter IET Membership ID"
                              value={formData.member1.ietMembershipId}
                              onChange={(e) => handleInputChange('member1', 'ietMembershipId', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Member 2 Section */}
                    <div className="space-y-2 bg-white/5 rounded-xl p-4" style={{ border: '1.5px solid #EE7520' }}>
                      <h3 className="text-lg font-semibold text-white">Member 2 <span style={{ color: '#EE7520' }}>*</span></h3>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Full Name <span style={{ color: '#EE7520' }}>*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter full name"
                          value={formData.member2.name}
                          onChange={(e) => handleInputChange('member2', 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Email ID <span style={{ color: '#EE7520' }}>*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="email@example.com"
                          value={formData.member2.email}
                          onChange={(e) => handleInputChange('member2', 'email', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Phone Number <span style={{ color: '#EE7520' }}>*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 12345 67890"
                          value={formData.member2.phone}
                          onChange={(e) => handleInputChange('member2', 'phone', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Year & Branch <span style={{ color: '#EE7520' }}>*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 2nd Year ECE"
                          value={formData.member2.yearBranch}
                          onChange={(e) => handleInputChange('member2', 'yearBranch', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="member2-iet-member"
                            checked={formData.member2.isIETMember}
                            onChange={(e) => handleInputChange('member2', 'isIETMember', e.target.checked)}
                            className="w-4 h-4 rounded border-[#EE7520]/20 text-[#EE7520] focus:ring-[#EE7520] bg-white/10"
                          />
                          <label htmlFor="member2-iet-member" className="ml-2 text-white">
                            IET Student Member
                          </label>
                        </div>
                        {formData.member2.isIETMember && (
                          <div>
                            <label className="block text-white font-medium mb-1">
                              IET Membership ID <span style={{ color: '#EE7520' }}>*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter IET Membership ID"
                              value={formData.member2.ietMembershipId}
                              onChange={(e) => handleInputChange('member2', 'ietMembershipId', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Member 3 Section (Optional) */}
                    <div className="space-y-2 bg-white/5 rounded-xl p-4" style={{ border: '1.5px solid #EE7520' }}>
                      <h3 className="text-lg font-semibold text-white">Member 3 (Optional)</h3>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter full name"
                          value={formData.member3.name}
                          onChange={(e) => handleInputChange('member3', 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Email ID
                        </label>
                        <input
                          type="email"
                          placeholder="email@example.com"
                          value={formData.member3.email}
                          onChange={(e) => handleInputChange('member3', 'email', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 12345 67890"
                          value={formData.member3.phone}
                          onChange={(e) => handleInputChange('member3', 'phone', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Year & Branch
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 1st Year IT"
                          value={formData.member3.yearBranch}
                          onChange={(e) => handleInputChange('member3', 'yearBranch', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="member3-iet-member"
                            checked={formData.member3.isIETMember}
                            onChange={(e) => handleInputChange('member3', 'isIETMember', e.target.checked)}
                            className="w-4 h-4 rounded border-[#EE7520]/20 text-[#EE7520] focus:ring-[#EE7520] bg-white/10"
                          />
                          <label htmlFor="member3-iet-member" className="ml-2 text-white">
                            IET Student Member
                          </label>
                        </div>
                        {formData.member3.isIETMember && (
                          <div>
                            <label className="block text-white font-medium mb-1">
                              IET Membership ID
                            </label>
                            <input
                              type="text"
                              placeholder="Enter IET Membership ID"
                              value={formData.member3.ietMembershipId}
                              onChange={(e) => handleInputChange('member3', 'ietMembershipId', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : currentStep === 'startup-details' ? (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Startup Details</h2>
                  </div>
                  <p className="text-gray-300 mb-4 text-sm">
                    Describe your startup idea and business plan
                  </p>

                  <div className="space-y-4 max-w-3xl mx-auto">
                    <div>
                      <label className="block text-white font-medium mb-1">
                        Startup Track <span style={{ color: '#EE7520' }}>*</span>
                      </label>
                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={() => handleInputChange('track', '', 'AI & ML-Driven Solutions')}
                          className={`w-full px-3 py-2 flex items-center gap-2 bg-white/10 border ${
                            formData.track === 'AI & ML-Driven Solutions' 
                              ? 'border-[#EE7520] ring-1 ring-[#EE7520]' 
                              : 'border-[#EE7520]/20'
                          } rounded-lg text-white hover:bg-white/20 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520] transition-colors text-left`}
                        >
                          <span className="text-sm">🤖</span>
                          AI & ML-Driven Solutions
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange('track', '', 'IoT & Smart Systems')}
                          className={`w-full px-3 py-2 flex items-center gap-2 bg-white/10 border ${
                            formData.track === 'IoT & Smart Systems'
                              ? 'border-[#EE7520] ring-1 ring-[#EE7520]'
                              : 'border-[#EE7520]/20'
                          } rounded-lg text-white hover:bg-white/20 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520] transition-colors text-left`}
                        >
                          <span className="text-sm">🌐</span>
                          IoT & Smart Systems
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange('track', '', 'Blockchain & FinTech')}
                          className={`w-full px-3 py-2 flex items-center gap-2 bg-white/10 border ${
                            formData.track === 'Blockchain & FinTech'
                              ? 'border-[#EE7520] ring-1 ring-[#EE7520]'
                              : 'border-[#EE7520]/20'
                          } rounded-lg text-white hover:bg-white/20 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520] transition-colors text-left`}
                        >
                          <span className="text-sm">🔗</span>
                          Blockchain & FinTech
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange('track', '', 'HealthTech & BioTech')}
                          className={`w-full px-3 py-2 flex items-center gap-2 bg-white/10 border ${
                            formData.track === 'HealthTech & BioTech'
                              ? 'border-[#EE7520] ring-1 ring-[#EE7520]'
                              : 'border-[#EE7520]/20'
                          } rounded-lg text-white hover:bg-white/20 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520] transition-colors text-left`}
                        >
                          <span className="text-sm">🏥</span>
                          HealthTech & BioTech
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange('track', '', 'SpaceTech & Robotics')}
                          className={`w-full px-3 py-2 flex items-center gap-2 bg-white/10 border ${
                            formData.track === 'SpaceTech & Robotics'
                              ? 'border-[#EE7520] ring-1 ring-[#EE7520]'
                              : 'border-[#EE7520]/20'
                          } rounded-lg text-white hover:bg-white/20 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520] transition-colors text-left`}
                        >
                          <span className="text-sm">🚀</span>
                          SpaceTech & Robotics
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange('track', '', 'EdTech & Digital Learning')}
                          className={`w-full px-3 py-2 flex items-center gap-2 bg-white/10 border ${
                            formData.track === 'EdTech & Digital Learning'
                              ? 'border-[#EE7520] ring-1 ring-[#EE7520]'
                              : 'border-[#EE7520]/20'
                          } rounded-lg text-white hover:bg-white/20 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520] transition-colors text-left`}
                        >
                          <span className="text-sm">📚</span>
                          EdTech & Digital Learning
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange('track', '', 'GreenTech & Sustainability')}
                          className={`w-full px-3 py-2 flex items-center gap-2 bg-white/10 border ${
                            formData.track === 'GreenTech & Sustainability'
                              ? 'border-[#EE7520] ring-1 ring-[#EE7520]'
                              : 'border-[#EE7520]/20'
                          } rounded-lg text-white hover:bg-white/20 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520] transition-colors text-left`}
                        >
                          <span className="text-sm">🌱</span>
                          GreenTech & Sustainability
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-1">
                        Startup Title <span style={{ color: '#EE7520' }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your startup name"
                        value={formData.startupTitle}
                        onChange={(e) => handleInputChange('startupTitle', '', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-1">
                        Problem Statement <span style={{ color: '#EE7520' }}>*</span>
                      </label>
                      <textarea
                        placeholder="Describe the problem your startup aims to solve"
                        value={formData.problemStatement}
                        onChange={(e) => handleInputChange('problemStatement', '', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-1">
                        Proposed Solution <span style={{ color: '#EE7520' }}>*</span>
                      </label>
                      <textarea
                        placeholder="Explain your innovative solution"
                        value={formData.proposedSolution}
                        onChange={(e) => handleInputChange('proposedSolution', '', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-1">
                        Business Model <span style={{ color: '#EE7520' }}>*</span>
                      </label>
                      <textarea
                        placeholder="Describe your revenue model and business strategy"
                        value={formData.businessModel}
                        onChange={(e) => handleInputChange('businessModel', '', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-1">
                        Market Opportunity <span style={{ color: '#EE7520' }}>*</span>
                      </label>
                      <textarea
                        placeholder="Describe the market size and opportunity"
                        value={formData.marketOpportunity}
                        onChange={(e) => handleInputChange('marketOpportunity', '', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-1">
                        Go-to-Market Strategy <span style={{ color: '#EE7520' }}>*</span>
                      </label>
                      <textarea
                        placeholder="Explain how you plan to reach your customers"
                        value={formData.goToMarketStrategy}
                        onChange={(e) => handleInputChange('goToMarketStrategy', '', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-1">
                        Expected Impact <span style={{ color: '#EE7520' }}>*</span>
                      </label>
                      <textarea
                        placeholder="Describe the social and economic impact of your startup"
                        value={formData.expectedImpact}
                        onChange={(e) => handleInputChange('expectedImpact', '', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520] resize-none"
                      />
                    </div>
                  </div>
                </>
              ) : currentStep === 'payment' ? (
                <>
                  <div className="space-y-6 max-w-3xl mx-auto">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Registration Fee</h2>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-white font-medium mb-1">
                          Fee Type <span style={{ color: '#EE7520' }}>*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => handleInputChange('feeType', '', 'IET Member Team')}
                          className={`w-full px-3 py-2 flex items-center gap-2 bg-white/10 border ${
                            formData.feeType === 'IET Member Team' 
                              ? 'border-[#671F20] ring-1 ring-[#671F20]' 
                              : 'border-[#671F20]/20'
                          } rounded-lg text-white hover:bg-white/20 focus:outline-none focus:border-[#671F20] focus:ring-1 focus:ring-[#671F20] transition-colors text-left`}
                        >
                          <input 
                            type="radio" 
                            name="feeType" 
                            value="IET Member Team" 
                            checked={formData.feeType === 'IET Member Team'}
                            onChange={() => handleInputChange('feeType', '', 'IET Member Team')}
                            className="w-4 h-4 border-[#671F20]/20 text-[#671F20] focus:ring-[#671F20] bg-white/10" 
                          />
                          <div>
                            <div className="font-medium text-white">IET Member Team - ₹500</div>
                            <div className="text-sm text-gray-300">At least one member must be an IET Student Member</div>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange('feeType', '', 'Non-Member Team')}
                          className={`w-full px-3 py-2 flex items-center gap-2 bg-white/10 border ${
                            formData.feeType === 'Non-Member Team'
                              ? 'border-[#671F20] ring-1 ring-[#671F20]'
                              : 'border-[#671F20]/20'
                          } rounded-lg text-white hover:bg-white/20 focus:outline-none focus:border-[#671F20] focus:ring-1 focus:ring-[#671F20] transition-colors text-left`}
                        >
                          <input 
                            type="radio" 
                            name="feeType" 
                            value="Non-Member Team" 
                            checked={formData.feeType === 'Non-Member Team'}
                            onChange={() => handleInputChange('feeType', '', 'Non-Member Team')}
                            className="w-4 h-4 border-[#671F20]/20 text-[#671F20] focus:ring-[#671F20] bg-white/10" 
                          />
                          <div>
                            <div className="font-medium text-white">Non-Member Team - ₹750</div>
                            <div className="text-sm text-gray-300">For teams without IET membership</div>
                          </div>
                        </button>
                      </div>
                    </div>
                    {/* Bank Details Section - visually distinct */}
                    <div className="my-4 p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 shadow-md">
                          <span className="text-2xl">🏦</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Bank Details for Payment</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white text-sm">
                        <div>
                          <div className="text-gray-300 font-medium">Bank Name</div>
                          <div className="font-semibold text-white">Axis Bank</div>
                        </div>
                        <div>
                          <div className="text-gray-300 font-medium">Account Name</div>
                          <div className="font-semibold text-white">INSTITUTION OF ENGINEERING AND TECHNOLOGY-LOCAL NETWORK ACCOUNT HYDERABAD</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="text-gray-300 font-medium">Account Number</div>
                            <div className="font-semibold text-white select-all">924020040374045</div>
                          </div>
                          <button type="button" onClick={() => navigator.clipboard.writeText('924020040374045')} aria-label="Copy Account Number"><Copy className="w-4 h-4" /></button>
                        </div>
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="text-gray-300 font-medium">IFSC Code</div>
                            <div className="font-semibold text-white select-all">UTIB0000009</div>
                          </div>
                          <button type="button" onClick={() => navigator.clipboard.writeText('UTIB0000009')} aria-label="Copy IFSC Code"><Copy className="w-4 h-4" /></button>
                        </div>
                        <div>
                          <div className="text-gray-300 font-medium">Branch Name</div>
                          <div className="font-semibold text-white">Bangalore Main Branch</div>
                        </div>
                      </div>
                    </div>
                    {/* Transaction Details Section */}
                    <div className="space-y-2">
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Transaction Reference Number <span style={{ color: '#EE7520' }}>*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter transaction ID after payment"
                          value={formData.transactionId}
                          onChange={(e) => handleInputChange('transactionId', '', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-[#EE7520]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#EE7520] focus:ring-1 focus:ring-[#EE7520]"
                        />
                        <p className="text-gray-300 text-xs mt-1">Enter the transaction ID received after payment</p>
                      </div>
                    </div>

                    {/* Transaction Screenshot Upload Section */}
                    <div>
                      <label className="block text-white font-medium mb-1">
                        Upload Transaction Screenshot <span style={{ color: '#EE7520' }}>*</span>
                      </label>
                      <div 
                        onClick={handleUploadClick}
                        className="border-2 border-dashed border-[#EE7520]/20 rounded-lg p-8 hover:border-[#EE7520] transition-colors cursor-pointer bg-white/5"
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          accept="image/png,image/jpeg,image/jpg"
                          className="hidden"
                        />
                        <div className="flex flex-col items-center justify-center text-center">
                          {uploadedImage ? (
                            <div className="w-full">
                              <img 
                                src={uploadedImage} 
                                alt="Transaction Screenshot" 
                                className="max-h-48 mx-auto mb-2"
                              />
                              <p className="text-sm text-gray-300">Click to change image</p>
                            </div>
                          ) : (
                            <>
                              <span className="text-2xl mb-2">⬆️</span>
                              <div className="text-white font-medium">Click to upload screenshot</div>
                              <div className="text-gray-300 text-xs">PNG, JPG up to 10MB</div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Declaration Section - normal design */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">📝</span>
                        </div>
                        <h2 className="text-xl font-bold text-white">Declarations & Consent</h2>
                      </div>
                      <div className="space-y-2">
                        <p className="text-white">By submitting this form, we confirm that:</p>
                        <ul className="list-disc text-gray-300 space-y-1 ml-5">
                          <li>We confirm all participants are undergrad engineering students.</li>
                          <li>We acknowledge team participation is required (2-3 members).</li>
                          <li>We agree to pay the registration fee (₹500 for IET members / ₹750 for non-members).</li>
                        </ul>
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="checkbox"
                            id="terms"
                            checked={formData.termsAccepted}
                            onChange={(e) => handleInputChange('termsAccepted', '', e.target.checked)}
                            className="w-4 h-4 rounded border-[#671F20]/20 text-[#671F20] focus:ring-[#671F20] bg-white/10"
                          />
                          <label htmlFor="terms" className="text-white">
                            I/We agree to the above terms and conditions <span style={{ color: '#EE7520' }}>*</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </form>
          </div>

          {/* Navigation Buttons OUTSIDE the form */}
          <div className="flex justify-between items-center max-w-3xl mx-auto mt-16 gap-2">
            {currentStep !== 'team-details' && (
              <button
                type="button"
                onClick={() => {
                  if (currentStep === 'team-members') goToStep('team-details');
                  else if (currentStep === 'startup-details') goToStep('team-members');
                  else if (currentStep === 'payment') goToStep('startup-details');
                }}
                className="outline-btn px-6 py-2 rounded-lg font-medium flex items-center gap-2"
                onMouseUp={e => e.currentTarget.blur()}
              >
                <span className="arrow-left">←</span> Previous
              </button>
            )}
            <div className="flex-1"></div>
            {currentStep !== 'payment' ? (
              <button
                type="button"
                onClick={() => {
                  if (currentStep === 'team-details') goToStep('team-members');
                  else if (currentStep === 'team-members') goToStep('startup-details');
                  else if (currentStep === 'startup-details') goToStep('payment');
                }}
                className="gradient-btn px-6 py-2 rounded-lg font-medium flex items-center gap-2"
                onMouseUp={e => e.currentTarget.blur()}
              >
                Next <span className="arrow-right">→</span>
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="gradient-btn px-6 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onMouseUp={e => e.currentTarget.blur()}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {submissionStatus.message}
                  </>
                ) : (
                  <>Submit Registration <span className="arrow-right">📨</span></>
                )}
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* AppAstral style CSS */}
      <style>{`
        .stars-small {
          background-image: radial-gradient(2px 2px at 20px 30px, #eee, transparent),
                            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
                            radial-gradient(1px 1px at 90px 40px, #fff, transparent),
                            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
                            radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
          animation: sparkle 4s linear infinite;
          opacity: 0.3;
        }
        
        .stars-medium {
          background-image: radial-gradient(2px 2px at 40px 60px, #eee, transparent),
                            radial-gradient(2px 2px at 80px 140px, rgba(255,255,255,0.8), transparent),
                            radial-gradient(2px 2px at 180px 80px, #fff, transparent),
                            radial-gradient(2px 2px at 260px 160px, rgba(255,255,255,0.6), transparent);
          background-repeat: repeat;
          background-size: 400px 200px;
          animation: sparkle 6s linear infinite;
          opacity: 0.2;
        }
        
        .stars-large {
          background-image: radial-gradient(3px 3px at 80px 120px, #eee, transparent),
                            radial-gradient(3px 3px at 160px 280px, rgba(255,255,255,0.8), transparent),
                            radial-gradient(3px 3px at 360px 160px, #fff, transparent);
          background-repeat: repeat;
          background-size: 800px 400px;
          animation: sparkle 8s linear infinite;
          opacity: 0.1;
        }
        
        @keyframes sparkle {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-100px); }
        }
        
        .gradient-btn {
          background: linear-gradient(135deg, #EE7520 0%, #671F20 100%);
          color: white;
          border: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(238, 117, 32, 0.3);
        }
        
        .gradient-btn:hover {

         background: linear-gradient(135deg, #671F20 0%, #EE7520 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(238, 117, 32, 0.4);
        }
        
        .outline-btn {
          background: transparent;
          color: #EE7520;
          border: 2px solid #EE7520;
          transition: all 0.3s ease;
        }
        
        .outline-btn:hover {
          background: #EE7520;
          color: white;
          transform: translateY(-2px);
        }
        
        .arrow-left, .arrow-right {
          transition: transform 0.3s ease;
        }
        
        .outline-btn:hover .arrow-left {
          transform: translateX(-3px);
        }
        
        .gradient-btn:hover .arrow-right {
          transform: translateX(3px);
        }
      `}</style>
    </div>
  );
};

export default StartupSphere;