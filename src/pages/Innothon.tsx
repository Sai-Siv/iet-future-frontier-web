import React, { useState, useRef, FormEvent } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Users, UserPlus, Smartphone, CreditCard, CheckCircle, Copy, Linkedin, Mail, Phone, User, Book, Briefcase, MessageSquare, Shield } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  year: string;
  linkedin: string;
  isIETMember?: boolean;
  ietMembershipId?: string;
}

interface FormData {
  teamName: string;
  institutionName: string;
  cityState: string;
  problemStatement: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  leaderAltEmail: string;
  leaderIsIETMember?: boolean;
  leaderIetMembershipId?: string;
  member2: TeamMember;
  member3: TeamMember;
  member4: TeamMember;
  motivationStatement: string;
  termsAccepted: boolean;
  consentAccepted: boolean;
  feeType: string;
  transactionId: string;
  transactionScreenshot: string;
}

const InnothonRegistration = () => {
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
          behavior: 'auto' // 'auto' means instant, no smooth scroll animation
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
  const [confirmationId, setConfirmationId] = useState<string | null>(null);

  // File upload state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const roles = ['Leader', 'Developer', 'Designer', 'Presenter', 'Other'];
  const problemStatements = [
    {
      name: 'AI for Social Good',
      description: 'Leveraging AI/ML to solve critical societal, environmental, and public welfare challenges.',
      icon: '🧠',
      bgGlow: 'from-[#AAC81E]/10 to-transparent'
    },
    {
      name: 'Sustainable Technology Solutions',
      description: 'Developing eco-friendly tech to combat climate change, promote clean energy, and reduce waste.',
      icon: '🌿',
      bgGlow: 'from-green-500/10 to-transparent'
    },
    {
      name: 'Healthcare Innovation',
      description: 'Improving patient care, medical diagnostics, accessibility, and mental health through tech.',
      icon: '🏥',
      bgGlow: 'from-red-500/10 to-transparent'
    },
    {
      name: 'Education Technology',
      description: 'Modernizing classroom learning, remote education, skill building, and academic inclusion.',
      icon: '📚',
      bgGlow: 'from-blue-500/10 to-transparent'
    },
    {
      name: 'Smart City Solutions',
      description: 'Optimizing urban traffic, waste management, municipal services, and public safety infrastructure.',
      icon: '🏙️',
      bgGlow: 'from-purple-500/10 to-transparent'
    },
    {
      name: 'Financial Inclusion',
      description: 'Empowering underbanked communities with secure, simplified mobile banking and payment tools.',
      icon: '💳',
      bgGlow: 'from-yellow-500/10 to-transparent'
    },
    {
      name: 'Agriculture Technology',
      description: 'Enhancing crop yield, automating farming systems, smart irrigation, and supply chain logistics.',
      icon: '🌾',
      bgGlow: 'from-emerald-500/10 to-transparent'
    }
  ];

  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    institutionName: '',
    cityState: '',
    problemStatement: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    leaderAltEmail: '',
    leaderIsIETMember: false,
    leaderIetMembershipId: '',
    member2: {
      name: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      year: '',
      linkedin: '',
      isIETMember: false,
      ietMembershipId: ''
    },
    member3: {
      name: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      year: '',
      linkedin: '',
      isIETMember: false,
      ietMembershipId: ''
    },
    member4: {
      name: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      year: '',
      linkedin: '',
      isIETMember: false,
      ietMembershipId: ''
    },
    motivationStatement: '',
    termsAccepted: false,
    consentAccepted: false,
    feeType: '',
    transactionId: '',
    transactionScreenshot: ''
  });

  const isMobile = useIsMobile();

  const handleInputChange = (section: string, field: string, value: string | boolean) => {
    setFormData(prev => {
      if (field === '') {
        return {
          ...prev,
          [section]: value
        };
      } else if (["member2", "member3", "member4"].includes(section)) {
        return {
          ...prev,
          [section]: {
            ...(prev[section as keyof FormData] as TeamMember),
            [field]: value
          }
        };
      } else {
        return {
          ...prev,
          [section]: value
        };
      }
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

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
    if (!formData.institutionName) missingFields.push('Institution/Organization Name');
    if (!formData.cityState) missingFields.push('City & State');
    if (!formData.problemStatement) missingFields.push('Preferred Problem Statement');

    // Leader validation
    if (!formData.leaderName) missingFields.push('Team Leader - Full Name');
    if (!formData.leaderEmail) missingFields.push('Team Leader - Email');
    if (!formData.leaderPhone) missingFields.push('Team Leader - Phone Number');

    // Member 2 validation
    if (!formData.member2.name) missingFields.push('Member 2 - Full Name');
    if (!formData.member2.email) missingFields.push('Member 2 - Email');
    if (!formData.member2.phone) missingFields.push('Member 2 - Phone Number');
    if (!formData.member2.role) missingFields.push('Member 2 - Role');
    if (!formData.member2.department) missingFields.push('Member 2 - Department/Branch');
    if (!formData.member2.year) missingFields.push('Member 2 - Year of Study');

    // Member 3 validation (optional - only validate if a Name is provided)
    if (formData.member3.name && formData.member3.name.trim() !== '') {
      if (!formData.member3.email) missingFields.push('Member 3 - Email');
      if (!formData.member3.phone) missingFields.push('Member 3 - Phone Number');
      if (!formData.member3.role) missingFields.push('Member 3 - Role');
      if (!formData.member3.department) missingFields.push('Member 3 - Department/Branch');
      if (!formData.member3.year) missingFields.push('Member 3 - Year of Study');
    }

    // Member 4 validation (optional - only validate if a Name is provided)
    if (formData.member4.name && formData.member4.name.trim() !== '') {
      if (!formData.member4.email) missingFields.push('Member 4 - Email');
      if (!formData.member4.phone) missingFields.push('Member 4 - Phone Number');
      if (!formData.member4.role) missingFields.push('Member 4 - Role');
      if (!formData.member4.department) missingFields.push('Member 4 - Department/Branch');
      if (!formData.member4.year) missingFields.push('Member 4 - Year of Study');
    }

    // Other fields validation
    if (!formData.motivationStatement) missingFields.push('Motivation Statement');
    if (!formData.termsAccepted) missingFields.push('Terms and Conditions Acceptance');

    // Payment details validation
    if (!formData.feeType) missingFields.push('Fee Type');
    if (!formData.transactionId) missingFields.push('Transaction Reference Number');
    if (!uploadedImage) missingFields.push('Transaction Screenshot');

    if (missingFields.length > 0) {
      const sections: { [key: string]: string[] } = {
        'Team Details': missingFields.filter(f => !f.includes('-') && !f.includes('Motivation') && !f.includes('Terms') && !f.includes('Fee') && !f.includes('Transaction')),
        'Team Members': missingFields.filter(f => f.includes('-')),
        'Additional Information': missingFields.filter(f => f.includes('Motivation') || f.includes('Terms')),
        'Payment & Declaration': missingFields.filter(f => f.includes('Fee') || f.includes('Transaction'))
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
      } else if (sections['Additional Information'].length > 0) {
        goToStep('additional-info');
      } else if (sections['Payment & Declaration'].length > 0) {
        goToStep('payment');
      }

      return false;
    }

    return true;
  };

  const generateConfirmationId = () => {
    return 'INN-' + Math.random().toString(36).substr(2, 8).toUpperCase();
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

      // Make real API call to backend
      const response = await fetch('http://localhost:5000/api/innothon/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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

      const resData = await response.json();
      const confId = resData.data.registrationId;
      setConfirmationId(confId);

      setSubmissionStatus({
        status: 'success',
        message: 'Registration successful!'
      });

      goToStep('confirmation');
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

      {/* Background with subtle elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <div className="pattern-dots-md text-[#AAC81E] opacity-10"></div>
        </div>
        {/* Floating elements with subtle glow */}
        <div className="absolute top-20 left-10 w-3 h-3 rounded-full blur-sm animate-pulse" style={{ backgroundColor: '#AAC81E', boxShadow: '0 0 15px rgba(170, 200, 30, 0.3)' }}></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 rounded-full blur-sm animate-pulse" style={{ backgroundColor: '#AAC81E', boxShadow: '0 0 15px rgba(170, 200, 30, 0.3)', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-20 w-4 h-4 rounded-full blur-sm animate-pulse" style={{ backgroundColor: '#AAC81E', boxShadow: '0 0 15px rgba(170, 200, 30, 0.3)', animationDelay: '2s' }}></div>
      </div>

      <main className="pb-16 relative z-10">
        <div className="container mx-auto px-2 sm:px-4 w-full max-w-6xl md:w-auto md:max-w-6xl">
          {renderStatusMessage()}

          <div className="text-center mb-16 pt-8">
            <div className="inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-4 py-2 mb-6" style={{ background: '#AAC81E', borderColor: '#AAC81E' }}>
              <span className="text-sm text-black font-semibold">🚀 Innovation Challenge 2025</span>
            </div>

            <div className="mb-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-4">
                <span className="text-white">Inno</span>
                <span style={{ color: '#AAC81E' }}>thon</span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-300 mb-4">
                Innovation & Entrepreneurship Challenge
              </h2>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 text-white">
                <span className="text-xl">💡</span>
                Innovate. Collaborate. Create.
              </span>
            </div>

            <div className="inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-6 py-3" style={{ background: '#AAC81E', borderColor: '#AAC81E' }}>
              <span className="text-black font-medium">Registration Deadline: 15 August 2025</span>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div ref={tabsRef} className="flex items-center justify-center gap-2 mb-8 w-full">
            <button
              onClick={() => goToStep('team-details')}
              className={`flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors ${currentStep === 'team-details'
                ? 'text-black font-semibold'
                : 'bg-black/40 text-gray-300 hover:text-white'
                }`}
              style={currentStep === 'team-details' ? { backgroundColor: '#AAC81E' } : {}}
            >
              <Users className="w-6 h-6 md:w-5 md:h-5" />
              {!isMobile && <span>Team Details</span>}
            </button>
            <div
              className="hidden md:block w-8 h-1 mx-1 rounded-full"
              style={{ background: 'linear-gradient(to right, #AAC81E, #000)' }}
            ></div>
            <div
              className="block md:hidden w-8 h-1 my-1 rounded-full"
              style={{ background: 'linear-gradient(to right, #AAC81E, #000)' }}
            ></div>
            <button
              onClick={() => goToStep('team-members')}
              className={`flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors ${currentStep === 'team-members'
                ? 'text-black font-semibold'
                : 'bg-black/40 text-gray-300 hover:text-white'
                }`}
              style={currentStep === 'team-members' ? { backgroundColor: '#AAC81E' } : {}}
            >
              <UserPlus className="w-6 h-6 md:w-5 md:h-5" />
              {!isMobile && <span>Team Members</span>}
            </button>
            <div
              className="hidden md:block w-8 h-1 mx-1 rounded-full"
              style={{ background: 'linear-gradient(to right, #AAC81E, #000)' }}
            ></div>
            <div
              className="block md:hidden w-8 h-1 my-1 rounded-full"
              style={{ background: 'linear-gradient(to right, #AAC81E, #000)' }}
            ></div>
            <button
              onClick={() => goToStep('additional-info')}
              className={`flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors ${currentStep === 'additional-info'
                ? 'text-black font-semibold'
                : 'bg-black/40 text-gray-300 hover:text-white'
                }`}
              style={currentStep === 'additional-info' ? { backgroundColor: '#AAC81E' } : {}}
            >
              <MessageSquare className="w-6 h-6 md:w-5 md:h-5" />
              {!isMobile && <span>Additional Info</span>}
            </button>
            <div
              className="hidden md:block w-8 h-1 mx-1 rounded-full"
              style={{ background: 'linear-gradient(to right, #AAC81E, #000)' }}
            ></div>
            <div
              className="block md:hidden w-8 h-1 my-1 rounded-full"
              style={{ background: 'linear-gradient(to right, #AAC81E, #000)' }}
            ></div>
            <button
              onClick={() => goToStep('payment')}
              className={`flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors ${currentStep === 'payment'
                ? 'text-black font-semibold'
                : 'bg-black/40 text-gray-300 hover:text-white'
                }`}
              style={currentStep === 'payment' ? { backgroundColor: '#AAC81E' } : {}}
            >
              <CreditCard className="w-6 h-6 md:w-5 md:h-5" />
              {!isMobile && <span>Payment</span>}
            </button>
          </div>

          {/* Form Section */}
          <div className={`bg-[#000] backdrop-blur-sm rounded-2xl p-4 sm:p-8 md:p-12 shadow-[0_19px_38px_#AAC81E,0_15px_12px_#AAC81E] w-full max-w-4xl mx-auto overflow-x-auto min-h-[650px] transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {currentStep !== 'confirmation' && (
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
                          Team Name <span style={{ color: '#AAC81E' }}>*</span>
                        </label>
                        <input
                          type="text"
                          id="teamName"
                          placeholder="Enter team name"
                          value={formData.teamName}
                          onChange={(e) => handleInputChange('teamName', '', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-1" htmlFor="institutionName">
                          Institution/Organization Name <span style={{ color: '#AAC81E' }}>*</span>
                        </label>
                        <input
                          type="text"
                          id="institutionName"
                          placeholder="College/University/Organization name"
                          value={formData.institutionName}
                          onChange={(e) => handleInputChange('institutionName', '', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-1" htmlFor="cityState">
                          City & State <span style={{ color: '#AAC81E' }}>*</span>
                        </label>
                        <input
                          type="text"
                          id="cityState"
                          placeholder="e.g., Hyderabad, Telangana"
                          value={formData.cityState}
                          onChange={(e) => handleInputChange('cityState', '', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">
                          Preferred Problem Statement <span style={{ color: '#AAC81E' }}>*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                          {problemStatements.map((statement) => {
                            const isSelected = formData.problemStatement === statement.name;
                            return (
                              <button
                                type="button"
                                key={statement.name}
                                onClick={() => handleInputChange('problemStatement', '', statement.name)}
                                className={`text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                                  isSelected
                                    ? 'border-[#AAC81E] bg-[#AAC81E]/10 ring-1 ring-[#AAC81E] shadow-[0_0_15px_rgba(170,200,30,0.15)]'
                                    : 'border-[#AAC81E]/20 bg-white/5 hover:border-[#AAC81E]/40 hover:bg-white/10'
                                }`}
                              >
                                {/* Subtle Track Color Glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${statement.bgGlow} opacity-30 transition-opacity duration-300 pointer-events-none`} />
                                
                                <div className="flex items-start gap-3 relative z-10">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-white/10 group-hover:scale-110 transition-transform ${
                                    isSelected ? 'bg-[#AAC81E]/20 text-[#AAC81E]' : 'text-gray-300'
                                  }`}>
                                    {statement.icon}
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                                      {statement.name}
                                      {isSelected && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#AAC81E] animate-ping" />
                                      )}
                                    </h3>
                                    <p className="text-gray-400 text-[11px] mt-1 leading-relaxed font-light">
                                      {statement.description}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        <input 
                          type="hidden" 
                          name="problemStatement" 
                          value={formData.problemStatement} 
                          required 
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
                      <div className="space-y-2 bg-white/5 rounded-xl p-4 border border-[#AAC81E]/20">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-5 h-5 text-[#AAC81E]" />
                          <h3 className="text-lg font-semibold text-white">Team Leader (POC) <span style={{ color: '#AAC81E' }}>*</span></h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <User className="w-4 h-4" /> Full Name <span style={{ color: '#AAC81E' }}>*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter full name"
                              value={formData.leaderName}
                              onChange={(e) => handleInputChange('leaderName', '', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Mail className="w-4 h-4" /> Email <span style={{ color: '#AAC81E' }}>*</span>
                            </label>
                            <input
                              type="email"
                              placeholder="email@example.com"
                              value={formData.leaderEmail}
                              onChange={(e) => handleInputChange('leaderEmail', '', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Phone className="w-4 h-4" /> Phone Number (WhatsApp) <span style={{ color: '#AAC81E' }}>*</span>
                            </label>
                            <input
                              type="tel"
                              placeholder="+91 12345 67890"
                              value={formData.leaderPhone}
                              onChange={(e) => handleInputChange('leaderPhone', '', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Mail className="w-4 h-4" /> Alternate Email
                            </label>
                            <input
                              type="email"
                              placeholder="alternate@example.com"
                              value={formData.leaderAltEmail}
                              onChange={(e) => handleInputChange('leaderAltEmail', '', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>
                        </div>
                        <div className="space-y-1 mt-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="leader-iet-member"
                              checked={formData.leaderIsIETMember}
                              onChange={(e) => handleInputChange('leaderIsIETMember', '', e.target.checked)}
                              className="w-4 h-4 rounded border-[#AAC81E]/30 text-[#AAC81E] focus:ring-[#AAC81E] bg-white/10"
                            />
                            <label htmlFor="leader-iet-member" className="ml-2 text-white">
                              IET Student Member
                            </label>
                          </div>
                          {formData.leaderIsIETMember && (
                            <div>
                              <label className="block text-white font-medium mb-1">
                                IET Membership ID <span style={{ color: '#AAC81E' }}>*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Enter IET Membership ID"
                                value={formData.leaderIetMembershipId}
                                onChange={(e) => handleInputChange('leaderIetMembershipId', '', e.target.value)}
                                className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Member 2 Section */}
                      <div className="space-y-2 bg-white/5 rounded-xl p-4 border border-[#AAC81E]/20">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-5 h-5 text-[#AAC81E]" />
                          <h3 className="text-lg font-semibold text-white">Member 2 <span style={{ color: '#AAC81E' }}>*</span></h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <User className="w-4 h-4" /> Full Name <span style={{ color: '#AAC81E' }}>*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter full name"
                              value={formData.member2.name}
                              onChange={(e) => handleInputChange('member2', 'name', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Mail className="w-4 h-4" /> Email <span style={{ color: '#AAC81E' }}>*</span>
                            </label>
                            <input
                              type="email"
                              placeholder="email@example.com"
                              value={formData.member2.email}
                              onChange={(e) => handleInputChange('member2', 'email', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Phone className="w-4 h-4" /> Phone Number <span style={{ color: '#AAC81E' }}>*</span>
                            </label>
                            <input
                              type="tel"
                              placeholder="+91 12345 67890"
                              value={formData.member2.phone}
                              onChange={(e) => handleInputChange('member2', 'phone', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Briefcase className="w-4 h-4" /> Role in Team <span style={{ color: '#AAC81E' }}>*</span>
                            </label>
                            <select
                              value={formData.member2.role}
                              onChange={(e) => handleInputChange('member2', 'role', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            >
                              <option value="">Select role</option>
                              {roles.map((role) => (
                                <option key={role} value={role}>{role}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Book className="w-4 h-4" /> Department/Branch <span style={{ color: '#AAC81E' }}>*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Computer Science"
                              value={formData.member2.department}
                              onChange={(e) => handleInputChange('member2', 'department', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Book className="w-4 h-4" /> Year of Study <span style={{ color: '#AAC81E' }}>*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., 3rd Year"
                              value={formData.member2.year}
                              onChange={(e) => handleInputChange('member2', 'year', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Linkedin className="w-4 h-4" /> LinkedIn Profile
                            </label>
                            <input
                              type="url"
                              placeholder="https://linkedin.com/in/username"
                              value={formData.member2.linkedin}
                              onChange={(e) => handleInputChange('member2', 'linkedin', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>
                        </div>
                        <div className="space-y-1 mt-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="member2-iet-member"
                              checked={formData.member2.isIETMember}
                              onChange={(e) => handleInputChange('member2', 'isIETMember', e.target.checked)}
                              className="w-4 h-4 rounded border-[#AAC81E]/30 text-[#AAC81E] focus:ring-[#AAC81E] bg-white/10"
                            />
                            <label htmlFor="member2-iet-member" className="ml-2 text-white">
                              IET Student Member
                            </label>
                          </div>
                          {formData.member2.isIETMember && (
                            <div>
                              <label className="block text-white font-medium mb-1">
                                IET Membership ID <span style={{ color: '#AAC81E' }}>*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Enter IET Membership ID"
                                value={formData.member2.ietMembershipId}
                                onChange={(e) => handleInputChange('member2', 'ietMembershipId', e.target.value)}
                                className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Member 3 Section (Optional) */}
                      <div className="space-y-2 bg-white/5 rounded-xl p-4 border border-[#AAC81E]/20">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-5 h-5 text-[#AAC81E]" />
                          <h3 className="text-lg font-semibold text-white">Member 3 (Optional)</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <User className="w-4 h-4" /> Full Name
                            </label>
                            <input
                              type="text"
                              placeholder="Enter full name"
                              value={formData.member3.name}
                              onChange={(e) => handleInputChange('member3', 'name', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Mail className="w-4 h-4" /> Email
                            </label>
                            <input
                              type="email"
                              placeholder="email@example.com"
                              value={formData.member3.email}
                              onChange={(e) => handleInputChange('member3', 'email', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Phone className="w-4 h-4" /> Phone Number
                            </label>
                            <input
                              type="tel"
                              placeholder="+91 12345 67890"
                              value={formData.member3.phone}
                              onChange={(e) => handleInputChange('member3', 'phone', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Briefcase className="w-4 h-4" /> Role in Team
                            </label>
                            <select
                              value={formData.member3.role}
                              onChange={(e) => handleInputChange('member3', 'role', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            >
                              <option value="">Select role</option>
                              {roles.map((role) => (
                                <option key={role} value={role}>{role}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Book className="w-4 h-4" /> Department/Branch
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Electrical Engineering"
                              value={formData.member3.department}
                              onChange={(e) => handleInputChange('member3', 'department', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Book className="w-4 h-4" /> Year of Study
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., 2nd Year"
                              value={formData.member3.year}
                              onChange={(e) => handleInputChange('member3', 'year', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Linkedin className="w-4 h-4" /> LinkedIn Profile
                            </label>
                            <input
                              type="url"
                              placeholder="https://linkedin.com/in/username"
                              value={formData.member3.linkedin}
                              onChange={(e) => handleInputChange('member3', 'linkedin', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>
                        </div>
                        <div className="space-y-1 mt-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="member3-iet-member"
                              checked={formData.member3.isIETMember}
                              onChange={(e) => handleInputChange('member3', 'isIETMember', e.target.checked)}
                              className="w-4 h-4 rounded border-[#AAC81E]/30 text-[#AAC81E] focus:ring-[#AAC81E] bg-white/10"
                            />
                            <label htmlFor="member3-iet-member" className="ml-2 text-white">
                              IET Student Member
                            </label>
                          </div>
                          {formData.member3.isIETMember && (
                            <div>
                              <label className="block text-white font-medium mb-1">
                                IET Membership ID <span style={{ color: '#AAC81E' }}>*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Enter IET Membership ID"
                                value={formData.member3.ietMembershipId}
                                onChange={(e) => handleInputChange('member3', 'ietMembershipId', e.target.value)}
                                className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Member 4 Section (Optional) */}
                      <div className="space-y-2 bg-white/5 rounded-xl p-4 border border-[#AAC81E]/20">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-5 h-5 text-[#AAC81E]" />
                          <h3 className="text-lg font-semibold text-white">Member 4 (Optional)</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <User className="w-4 h-4" /> Full Name
                            </label>
                            <input
                              type="text"
                              placeholder="Enter full name"
                              value={formData.member4.name}
                              onChange={(e) => handleInputChange('member4', 'name', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Mail className="w-4 h-4" /> Email
                            </label>
                            <input
                              type="email"
                              placeholder="email@example.com"
                              value={formData.member4.email}
                              onChange={(e) => handleInputChange('member4', 'email', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Phone className="w-4 h-4" /> Phone Number
                            </label>
                            <input
                              type="tel"
                              placeholder="+91 12345 67890"
                              value={formData.member4.phone}
                              onChange={(e) => handleInputChange('member4', 'phone', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Briefcase className="w-4 h-4" /> Role in Team
                            </label>
                            <select
                              value={formData.member4.role}
                              onChange={(e) => handleInputChange('member4', 'role', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            >
                              <option value="">Select role</option>
                              {roles.map((role) => (
                                <option key={role} value={role}>{role}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Book className="w-4 h-4" /> Department/Branch
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Mechanical Engineering"
                              value={formData.member4.department}
                              onChange={(e) => handleInputChange('member4', 'department', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Book className="w-4 h-4" /> Year of Study
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., 4th Year"
                              value={formData.member4.year}
                              onChange={(e) => handleInputChange('member4', 'year', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-white font-medium mb-1 flex items-center gap-1">
                              <Linkedin className="w-4 h-4" /> LinkedIn Profile
                            </label>
                            <input
                              type="url"
                              placeholder="https://linkedin.com/in/username"
                              value={formData.member4.linkedin}
                              onChange={(e) => handleInputChange('member4', 'linkedin', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                            />
                          </div>
                        </div>
                        <div className="space-y-1 mt-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="member4-iet-member"
                              checked={formData.member4.isIETMember}
                              onChange={(e) => handleInputChange('member4', 'isIETMember', e.target.checked)}
                              className="w-4 h-4 rounded border-[#AAC81E]/30 text-[#AAC81E] focus:ring-[#AAC81E] bg-white/10"
                            />
                            <label htmlFor="member4-iet-member" className="ml-2 text-white">
                              IET Student Member
                            </label>
                          </div>
                          {formData.member4.isIETMember && (
                            <div>
                              <label className="block text-white font-medium mb-1">
                                IET Membership ID <span style={{ color: '#AAC81E' }}>*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Enter IET Membership ID"
                                value={formData.member4.ietMembershipId}
                                onChange={(e) => handleInputChange('member4', 'ietMembershipId', e.target.value)}
                                className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : currentStep === 'additional-info' ? (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-white">Additional Information</h2>
                    </div>
                    <p className="text-gray-300 mb-4 text-sm">
                      Provide some additional information about your team
                    </p>

                    <div className="space-y-4 max-w-3xl mx-auto">
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Short Motivation Statement <span style={{ color: '#AAC81E' }}>*</span>
                        </label>
                        <textarea
                          placeholder="Tell us why your team is excited to participate in this Innothon and what you hope to achieve (150-200 words)"
                          value={formData.motivationStatement}
                          onChange={(e) => handleInputChange('motivationStatement', '', e.target.value)}
                          rows={5}
                          className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E] resize-none"
                        />
                        <p className="text-gray-400 text-xs mt-1">
                          {formData.motivationStatement.length}/200 characters
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="terms"
                            checked={formData.termsAccepted}
                            onChange={(e) => handleInputChange('termsAccepted', '', e.target.checked)}
                            className="w-4 h-4 mt-1 rounded border-[#AAC81E]/30 text-[#AAC81E] focus:ring-[#AAC81E] bg-white/10"
                          />
                          <label htmlFor="terms" className="ml-2 text-white">
                            <span className="font-medium">I agree to the rules and terms & conditions</span> <span style={{ color: '#AAC81E' }}>*</span>
                            <p className="text-gray-300 text-sm mt-1">
                              By checking this box, you agree to abide by all competition rules, guidelines, and terms of participation.
                            </p>
                          </label>
                        </div>

                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="consent"
                            checked={formData.consentAccepted}
                            onChange={(e) => handleInputChange('consentAccepted', '', e.target.checked)}
                            className="w-4 h-4 mt-1 rounded border-[#AAC81E]/30 text-[#AAC81E] focus:ring-[#AAC81E] bg-white/10"
                          />
                          <label htmlFor="consent" className="ml-2 text-white">
                            <span className="font-medium">I consent to photos/videos for publicity</span>
                            <p className="text-gray-300 text-sm mt-1">
                              By checking this box, you consent to the use of photographs and videos taken during the event for promotional purposes.
                            </p>
                          </label>
                        </div>
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
                            Fee Type <span style={{ color: '#AAC81E' }}>*</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => handleInputChange('feeType', '', 'Student Team')}
                            className={`w-full px-3 py-2 flex items-center gap-2 bg-white/10 border ${formData.feeType === 'Student Team'
                              ? 'border-[#AAC81E] ring-1 ring-[#AAC81E]'
                              : 'border-[#AAC81E]/30'
                              } rounded-lg text-white hover:bg-white/20 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E] transition-colors text-left`}
                          >
                            <input
                              type="radio"
                              name="feeType"
                              value="Student Team"
                              checked={formData.feeType === 'Student Team'}
                              onChange={() => handleInputChange('feeType', '', 'Student Team')}
                              className="w-4 h-4 border-[#AAC81E]/30 text-[#AAC81E] focus:ring-[#AAC81E] bg-white/10"
                            />
                            <div>
                              <div className="font-medium text-white">Student Team - ₹500</div>
                              <div className="text-sm text-gray-300">For teams with all student members</div>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleInputChange('feeType', '', 'Professional Team')}
                            className={`w-full px-3 py-2 flex items-center gap-2 bg-white/10 border ${formData.feeType === 'Professional Team'
                              ? 'border-[#AAC81E] ring-1 ring-[#AAC81E]'
                              : 'border-[#AAC81E]/30'
                              } rounded-lg text-white hover:bg-white/20 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E] transition-colors text-left`}
                          >
                            <input
                              type="radio"
                              name="feeType"
                              value="Professional Team"
                              checked={formData.feeType === 'Professional Team'}
                              onChange={() => handleInputChange('feeType', '', 'Professional Team')}
                              className="w-4 h-4 border-[#AAC81E]/30 text-[#AAC81E] focus:ring-[#AAC81E] bg-white/10"
                            />
                            <div>
                              <div className="font-medium text-white">Professional Team - ₹1000</div>
                              <div className="text-sm text-gray-300">For teams with professional members</div>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Bank Details Section */}
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
                            <div className="font-semibold text-white">State Bank of India</div>
                          </div>
                          <div>
                            <div className="text-gray-300 font-medium">Account Name</div>
                            <div className="font-semibold text-white">INNOTHON ORGANIZING COMMITTEE</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="text-gray-300 font-medium">Account Number</div>
                              <div className="font-semibold text-white select-all">38012547896</div>
                            </div>
                            <button type="button" onClick={() => navigator.clipboard.writeText('38012547896')} aria-label="Copy Account Number"><Copy className="w-4 h-4" /></button>
                          </div>
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="text-gray-300 font-medium">IFSC Code</div>
                              <div className="font-semibold text-white select-all">SBIN0001245</div>
                            </div>
                            <button type="button" onClick={() => navigator.clipboard.writeText('SBIN0001245')} aria-label="Copy IFSC Code"><Copy className="w-4 h-4" /></button>
                          </div>
                          <div>
                            <div className="text-gray-300 font-medium">Branch Name</div>
                            <div className="font-semibold text-white">Hyderabad Main Branch</div>
                          </div>
                        </div>
                      </div>

                      {/* Transaction Details Section */}
                      <div className="space-y-2">
                        <div>
                          <label className="block text-white font-medium mb-1">
                            Transaction Reference Number <span style={{ color: '#AAC81E' }}>*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter transaction ID after payment"
                            value={formData.transactionId}
                            onChange={(e) => handleInputChange('transactionId', '', e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 border border-[#AAC81E]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AAC81E] focus:ring-1 focus:ring-[#AAC81E]"
                          />
                          <p className="text-gray-300 text-xs mt-1">Enter the transaction ID received after payment</p>
                        </div>
                      </div>

                      {/* Transaction Screenshot Upload Section */}
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Upload Transaction Screenshot <span style={{ color: '#AAC81E' }}>*</span>
                        </label>
                        <div
                          onClick={handleUploadClick}
                          className="border-2 border-dashed border-[#AAC81E]/30 rounded-lg p-8 hover:border-[#AAC81E] transition-colors cursor-pointer bg-white/5"
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
                    </div>
                  </>
                ) : null}
              </form>
            )}

            {currentStep === 'confirmation' && (
              <div className="text-center py-12 px-4">
                <div className="mb-8">
                  <div className="w-24 h-24 rounded-full bg-[#AAC81E]/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-16 h-16 text-[#AAC81E]" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Registration Successful!</h2>
                  <p className="text-gray-300 mb-6">Thank you for registering for Innothon 2025</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 mb-8 border border-[#AAC81E]/30">
                  <h3 className="text-xl font-semibold text-white mb-4">Your Confirmation Details</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">Confirmation ID:</span>
                      <span className="font-medium text-[#AAC81E]">{confirmationId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">Team Name:</span>
                      <span className="font-medium text-white">{formData.teamName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">Team Leader:</span>
                      <span className="font-medium text-white">{formData.leaderName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">Email:</span>
                      <span className="font-medium text-white">{formData.leaderEmail}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-[#AAC81E]/30">
                  <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
                  <ul className="text-gray-300 space-y-2 text-left max-w-md mx-auto">
                    <li className="flex gap-2 items-start">
                      <span className="text-[#AAC81E] mt-1">•</span>
                      <span>An confirmation email has been sent to {formData.leaderEmail}</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="text-[#AAC81E] mt-1">•</span>
                      <span>Save your Confirmation ID for future reference</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="text-[#AAC81E] mt-1">•</span>
                      <span>Further details will be communicated via email</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="text-[#AAC81E] mt-1">•</span>
                      <span>Join our WhatsApp group for updates (link in your email)</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-12">
                  <button
                    onClick={() => {
                      // Reset form and go back to first step
                      setFormData({
                        teamName: '',
                        institutionName: '',
                        cityState: '',
                        problemStatement: '',
                        leaderName: '',
                        leaderEmail: '',
                        leaderPhone: '',
                        leaderAltEmail: '',
                        leaderIsIETMember: false,
                        leaderIetMembershipId: '',
                        member2: {
                          name: '',
                          email: '',
                          phone: '',
                          role: '',
                          department: '',
                          year: '',
                          linkedin: '',
                          isIETMember: false,
                          ietMembershipId: ''
                        },
                        member3: {
                          name: '',
                          email: '',
                          phone: '',
                          role: '',
                          department: '',
                          year: '',
                          linkedin: '',
                          isIETMember: false,
                          ietMembershipId: ''
                        },
                        member4: {
                          name: '',
                          email: '',
                          phone: '',
                          role: '',
                          department: '',
                          year: '',
                          linkedin: '',
                          isIETMember: false,
                          ietMembershipId: ''
                        },
                        motivationStatement: '',
                        termsAccepted: false,
                        consentAccepted: false,
                        feeType: '',
                        transactionId: '',
                        transactionScreenshot: ''
                      });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setCurrentStep('team-details');
                      setConfirmationId(null);
                    }}
                    className="px-6 py-2 rounded-lg font-medium flex items-center gap-2 mx-auto"
                    style={{ backgroundColor: '#AAC81E', color: 'black' }}
                  >
                    Register Another Team
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons OUTSIDE the form */}
          {currentStep !== 'confirmation' && (
            <div className="flex justify-between items-center max-w-3xl mx-auto mt-16 gap-2">
              {currentStep !== 'team-details' && (
                <button
                  type="button"
                  onClick={() => {
                    if (currentStep === 'team-members') goToStep('team-details');
                    else if (currentStep === 'additional-info') goToStep('team-members');
                    else if (currentStep === 'payment') goToStep('additional-info');
                  }}
                  className="outline-btn px-6 py-2 rounded-lg font-medium flex items-center gap-2"
                  style={{ borderColor: '#AAC81E', color: '#AAC81E' }}
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
                    else if (currentStep === 'team-members') goToStep('additional-info');
                    else if (currentStep === 'additional-info') goToStep('payment');
                  }}
                  className="gradient-btn px-6 py-2 rounded-lg font-medium flex items-center gap-2"
                  style={{ backgroundColor: '#AAC81E', color: 'black' }}
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
                  style={{ backgroundColor: '#AAC81E', color: 'black' }}
                  onMouseUp={e => e.currentTarget.blur()}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
          )}
        </div>
      </main>

      <Footer />

      {/* AppAstral style CSS */}
      <style>{`
        .pattern-dots-md {
          background-image: radial-gradient(#AAC81E 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .gradient-btn {
          background: linear-gradient(135deg, #AAC81E 0%, #8aa81e 100%);
          color: black;
          border: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(170, 200, 30, 0.3);
        }

        .gradient-btn:hover {
          background: linear-gradient(135deg, #8aa81e 0%, #AAC81E 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(170, 200, 30, 0.4);
        }

        .outline-btn {
          background: transparent;
          border: 2px solid #AAC81E;
          transition: all 0.3s ease;
        }

        .outline-btn:hover {
         
          color: black;
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

        @keyframes pulse {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default InnothonRegistration;
