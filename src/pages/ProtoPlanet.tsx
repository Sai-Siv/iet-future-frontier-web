import React, { useState, useRef, FormEvent } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Users, UserPlus, Lightbulb, CreditCard, Copy } from 'lucide-react';
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
  // Team Details
  teamName: string;
  institutionName: string;
  cityState: string;
  // Team Members
  member1: TeamMember;
  member2: TeamMember;
  member3: TeamMember;
  // Project Details
  projectTitle: string;
  projectAbstract: string;
  projectTrack: string;
  problemStatement: string;
  proposedSolution: string;
  systemArchitecture: string;
  technologicalImpact: string;
  // Payment Details
  feeType: string;
  transactionId: string;
  termsAccepted: boolean;
}

const ProtoPlanet = () => {
  const [currentStep, setCurrentStep] = useState('team-details');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const goToStep = (step: string) => {
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentStep(step);
      
      if (tabsRef.current) {
        const headerOffset = 120;
        const elementPosition = tabsRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
        window.scrollTo({
          top: offsetPosition,
          behavior: 'auto'
        });
      }

      setIsTransitioning(false);
    }, 300);
  };
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({
    status: 'idle',
    message: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    // Team Details
    teamName: '',
    institutionName: '',
    cityState: '',
    // Team Members
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
    // Project Details
    projectTitle: '',
    projectAbstract: '',
    projectTrack: '',
    problemStatement: '',
    proposedSolution: '',
    systemArchitecture: '',
    technologicalImpact: '',
    // Payment Details
    feeType: '',
    transactionId: '',
    termsAccepted: false
  });

  const isMobile = useIsMobile();

  const handleInputChange = (section: string, field: string, value: string | boolean) => {
    setFormData(prev => {
      if (field === '') {
        // Direct field update (like teamName, projectTitle, etc.)
        return {
          ...prev,
          [section]: value
        };
      } else if (section.startsWith('member')) {
        // Team member update
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value
          }
        };
      } else {
        // Other nested fields
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.match('image/(png|jpeg|jpg)')) {
        alert('Please upload a PNG or JPG image');
        return;
      }
      
      // Check file size (10MB = 10 * 1024 * 1024 bytes)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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

    // Project details validation
    if (!formData.projectTrack) missingFields.push('Project Track');
    if (!formData.projectTitle) missingFields.push('Project Title');
    if (!formData.problemStatement) missingFields.push('Problem Statement');
    if (!formData.proposedSolution) missingFields.push('Proposed Solution');
    if (!formData.systemArchitecture) missingFields.push('Basic System Architecture');
    if (!formData.technologicalImpact) missingFields.push('Expected Technological and Social Impact');

    // Payment details validation
    if (!formData.feeType) missingFields.push('Fee Type');
    if (!formData.transactionId) missingFields.push('Transaction Reference Number');
    if (!uploadedImage) missingFields.push('Transaction Screenshot');
    if (!formData.termsAccepted) missingFields.push('Terms and Conditions Acceptance');

    if (missingFields.length > 0) {
      // Group missing fields by section
      const sections: { [key: string]: string[] } = {
        'Team Details': missingFields.filter(f => !f.includes('-') && !f.includes('Project') && !f.includes('Fee')),
        'Team Members': missingFields.filter(f => f.includes('-')),
        'Project Details': missingFields.filter(f => f.includes('Project') || f.includes('Problem') || f.includes('Solution') || f.includes('Architecture') || f.includes('Impact')),
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
      } else if (sections['Project Details'].length > 0) {
        goToStep('project-abstract');
      } else if (sections['Payment & Declaration'].length > 0) {
        goToStep('payment');
      }

      return false;
    }

    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions');
      goToStep('payment');
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
        message: 'Preparing form data...'
      });

      // Create form data for submission
      const submitData = new FormData();
      
      // Append team details
      submitData.append('teamName', formData.teamName);
      submitData.append('institutionName', formData.institutionName);
      submitData.append('cityState', formData.cityState);
      submitData.append('projectTitle', formData.projectTitle);
      
      // Combine all project details into projectAbstract
      const projectAbstract = {
        track: formData.projectTrack,
        problemStatement: formData.problemStatement,
        proposedSolution: formData.proposedSolution,
        systemArchitecture: formData.systemArchitecture,
        technologicalImpact: formData.technologicalImpact
      };
      submitData.append('projectAbstract', JSON.stringify(projectAbstract));
      
      submitData.append('feeType', formData.feeType);
      submitData.append('transactionId', formData.transactionId);
      submitData.append('termsAccepted', formData.termsAccepted.toString());

      // Format team members data
      const member1Data = {
        ...formData.member1,
        title: 'Mr',
      };
      const member2Data = {
        ...formData.member2,
        title: 'Mr',
      };
      const member3Data = formData.member3.name ? {
        ...formData.member3,
        title: 'Mr',
      } : null;

      // Append team members data
      submitData.append('member1', JSON.stringify(member1Data));
      submitData.append('member2', JSON.stringify(member2Data));
      if (member3Data) {
        submitData.append('member3', JSON.stringify(member3Data));
      }

      // Append the screenshot file
      if (fileInputRef.current?.files?.[0]) {
        setSubmissionStatus({
          status: 'submitting',
          message: 'Processing payment screenshot...'
        });
        const file = fileInputRef.current.files[0];
        submitData.append('screenshot', file, file.name);
        console.log('Appending file:', file.name, file.type, file.size);
      } else {
        console.error('No screenshot file found');
        throw new Error('Please upload the payment screenshot');
      }

      // Log form data before submission
      console.log('Form data entries:');
      for (const [key, value] of submitData.entries()) {
        console.log(key, ':', typeof value === 'string' ? value : 'File/Blob data');
      }

      setSubmissionStatus({
        status: 'submitting',
        message: 'Uploading registration data...'
      });
      
      const response = await fetch('https://iet-future-frontier-web.onrender.com/api/protoplan/register', {
        method: 'POST',
        body: submitData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const result = await response.json();
      console.log('Server response:', result);

      if (result.success) {
        setSubmissionStatus({
          status: 'success',
          message: 'Registration successful! We will contact you shortly.'
        });

        // Reset form
        setFormData({
          teamName: '',
          institutionName: '',
          cityState: '',
          member1: { name: '', email: '', phone: '', yearBranch: '', isIETMember: false, ietMembershipId: '' },
          member2: { name: '', email: '', phone: '', yearBranch: '', isIETMember: false, ietMembershipId: '' },
          member3: { name: '', email: '', phone: '', yearBranch: '', isIETMember: false, ietMembershipId: '' },
          projectTitle: '',
          projectAbstract: '',
          projectTrack: '',
          problemStatement: '',
          proposedSolution: '',
          systemArchitecture: '',
          technologicalImpact: '',
          feeType: '',
          transactionId: '',
          termsAccepted: false
        });
        setUploadedImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentStep('team-details');

        // Show success message
        alert('Registration successful! We will contact you shortly.');
      } else {
        throw new Error(result.message || 'Registration failed');
      }
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

  // Add status message display
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
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full blur-sm animate-pulse" style={{ backgroundColor: '#a046b4', boxShadow: '0 0 15px rgba(160,70,180,0.4)' }}></div>
        <div className="absolute bottom-20 right-10 w-1.5 h-1.5 rounded-full blur-sm animate-pulse" style={{ backgroundColor: '#a046b4', boxShadow: '0 0 15px rgba(160,70,180,0.4)', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-20 w-3 h-3 rounded-full blur-sm animate-pulse" style={{ backgroundColor: '#a046b4', boxShadow: '0 0 15px rgba(160,70,180,0.4)', animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-24 w-2 h-2 rounded-full blur-sm animate-pulse" style={{ backgroundColor: '#a046b4', boxShadow: '0 0 15px rgba(160,70,180,0.4)', animationDelay: '3s' }}></div>
      </div>

      <main className="pt-2 pb-16 relative z-10">
        <div className="container mx-auto px-2 sm:px-4 w-full max-w-6xl md:w-auto md:max-w-6xl">
          {/* Add status message at the top of the form */}
          {renderStatusMessage()}

          <div className="text-center mb-16 pt-8">

            
            <div className="mb-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-4">
                <span className="text-white">Proto</span>
                <span style={{ color: '#a046b4' }}>Planet</span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-300 mb-4">
                Hardware Innovation Sprint
              </h2>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 text-white">
                <span className="text-xl">🚀</span>
                Challenge the Future. Build What Matters.
              </span>
            </div>

            <div className="inline-flex items-center gap-2 bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-full px-6 py-3">
              <span className="text-white font-medium">Registration Deadline: 9 August 2025</span>
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
              style={currentStep === 'team-details' ? { backgroundColor: '#a046b4' } : {}}
            >
              <Users className="w-6 h-6 md:w-5 md:h-5" />
              {!isMobile && <span>Team Details</span>}
            </button>
            {/* Gradient Separator */}
            <div
              className="hidden md:block w-8 h-1 mx-1 rounded-full"
              style={{ background: 'linear-gradient(to right, #a046b4, #000)' }}
            ></div>
            <div
              className="block md:hidden w-8 h-1 my-1 rounded-full"
              style={{ background: 'linear-gradient(to right, #a046b4, #000)' }}
            ></div>
            <button
              onClick={() => goToStep('team-members')}
              className={`flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors ${
                currentStep === 'team-members'
                  ? 'text-white'
                  : 'bg-black/40 text-gray-400 hover:text-white'
              }`}
              style={currentStep === 'team-members' ? { backgroundColor: '#a046b4' } : {}}
            >
              <UserPlus className="w-6 h-6 md:w-5 md:h-5" />
              {!isMobile && <span>Team Members</span>}
            </button>
            {/* Gradient Separator */}
            <div
              className="hidden md:block w-8 h-1 mx-1 rounded-full"
              style={{ background: 'linear-gradient(to right, #a046b4, #000)' }}
            ></div>
            <div
              className="block md:hidden w-8 h-1 my-1 rounded-full"
              style={{ background: 'linear-gradient(to right, #a046b4, #000)' }}
            ></div>
            <button
              onClick={() => goToStep('project-abstract')}
              className={`flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors ${
                currentStep === 'project-abstract'
                  ? 'text-white'
                  : 'bg-black/40 text-gray-400 hover:text-white'
              }`}
              style={currentStep === 'project-abstract' ? { backgroundColor: '#a046b4' } : {}}
            >
              <Lightbulb className="w-6 h-6 md:w-5 md:h-5" />
              {!isMobile && <span>Project Abstract</span>}
            </button>
            {/* Gradient Separator */}
            <div
              className="hidden md:block w-8 h-1 mx-1 rounded-full"
              style={{ background: 'linear-gradient(to right, #a046b4, #000)' }}
            ></div>
            <div
              className="block md:hidden w-8 h-1 my-1 rounded-full"
              style={{ background: 'linear-gradient(to right, #a046b4, #000)' }}
            ></div>
            <button
              onClick={() => goToStep('payment')}
              className={`flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors ${
                currentStep === 'payment'
                  ? 'text-white'
                  : 'bg-black/40 text-gray-400 hover:text-white'
              }`}
              style={currentStep === 'payment' ? { backgroundColor: '#a046b4' } : {}}
            >
              <CreditCard className="w-6 h-6 md:w-5 md:h-5" />
              {!isMobile && <span>Payment & Declaration</span>}
            </button>
          </div>

          {/* Form Section */}
          <div className={`bg-[#000] backdrop-blur-sm rounded-2xl p-4 sm:p-8 md:p-12 
  shadow-[rgba(160,70,180,0.3)_0px_19px_38px,rgba(160,70,180,0.22)_0px_15px_12px] w-full max-w-4xl mx-auto overflow-x-auto min-h-[650px] transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>                      <form className="space-y-8">
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
                        Team Name <span className="text-purple-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="teamName"
                        placeholder="Enter team name"
                        value={formData.teamName}
                        onChange={(e) => handleInputChange('teamName', '', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      />
                      <p className="text-gray-400 text-xs mt-1">
                        Choose a short and unique name for your team
                      </p>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-1" htmlFor="institutionName">
                        Institution Name <span className="text-purple-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="institutionName"
                        placeholder="College/University name"
                        value={formData.institutionName}
                        onChange={(e) => handleInputChange('institutionName', '', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-1" htmlFor="cityState">
                        City & State <span className="text-purple-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="cityState"
                        placeholder="e.g., Hyderabad, Telangana"
                        value={formData.cityState}
                        onChange={(e) => handleInputChange('cityState', '', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
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
                    <div className="space-y-2 bg-white/5 border border-purple-500/30 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-white">Team Leader (Member 1) <span className="text-purple-500">*</span></h3>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Full Name <span className="text-purple-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter full name"
                          value={formData.member1.name}
                          onChange={(e) => handleInputChange('member1', 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Email ID <span className="text-purple-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="email@example.com"
                          value={formData.member1.email}
                          onChange={(e) => handleInputChange('member1', 'email', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Phone Number <span className="text-purple-500">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 12345 67890"
                          value={formData.member1.phone}
                          onChange={(e) => handleInputChange('member1', 'phone', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Year & Branch <span className="text-purple-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 3rd Year CSE"
                          value={formData.member1.yearBranch}
                          onChange={(e) => handleInputChange('member1', 'yearBranch', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="leader-iet-member"
                            checked={formData.member1.isIETMember}
                            onChange={(e) => handleInputChange('member1', 'isIETMember', e.target.checked)}
                            className="w-4 h-4 rounded border-purple-500/20 text-purple-500 focus:ring-purple-500 bg-white/10"
                          />
                          <label htmlFor="leader-iet-member" className="ml-2 text-white">
                            IET Student Member
                          </label>
                        </div>
                        {formData.member1.isIETMember && (
                          <div>
                            <label className="block text-white font-medium mb-1">
                              IET Membership ID <span className="text-purple-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter IET Membership ID"
                              value={formData.member1.ietMembershipId}
                              onChange={(e) => handleInputChange('member1', 'ietMembershipId', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Member 2 Section */}
                    <div className="space-y-2 bg-white/5 border border-purple-500/30 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-white">Member 2 <span className="text-purple-500">*</span></h3>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Full Name <span className="text-purple-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter full name"
                          value={formData.member2.name}
                          onChange={(e) => handleInputChange('member2', 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Email ID <span className="text-purple-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="email@example.com"
                          value={formData.member2.email}
                          onChange={(e) => handleInputChange('member2', 'email', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Phone Number <span className="text-purple-500">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 12345 67890"
                          value={formData.member2.phone}
                          onChange={(e) => handleInputChange('member2', 'phone', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Year & Branch <span className="text-purple-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 2nd Year ECE"
                          value={formData.member2.yearBranch}
                          onChange={(e) => handleInputChange('member2', 'yearBranch', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="member2-iet-member"
                            checked={formData.member2.isIETMember}
                            onChange={(e) => handleInputChange('member2', 'isIETMember', e.target.checked)}
                            className="w-4 h-4 rounded border-purple-500/20 text-purple-500 focus:ring-purple-500 bg-white/10"
                          />
                          <label htmlFor="member2-iet-member" className="ml-2 text-white">
                            IET Student Member
                          </label>
                        </div>
                        {formData.member2.isIETMember && (
                          <div>
                            <label className="block text-white font-medium mb-1">
                              IET Membership ID <span className="text-purple-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter IET Membership ID"
                              value={formData.member2.ietMembershipId}
                              onChange={(e) => handleInputChange('member2', 'ietMembershipId', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Member 3 Section (Optional) */}
                    <div className="space-y-2 bg-white/5 border border-purple-500/30 rounded-xl p-4">
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
                          className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
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
                          className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
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
                          className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Year & Branch
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 1st Year ME"
                          value={formData.member3.yearBranch}
                          onChange={(e) => handleInputChange('member3', 'yearBranch', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="member3-iet-member"
                            checked={formData.member3.isIETMember}
                            onChange={(e) => handleInputChange('member3', 'isIETMember', e.target.checked)}
                            className="w-4 h-4 rounded border-purple-500/20 text-purple-500 focus:ring-purple-500 bg-white/10"
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
                              className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : currentStep === 'project-abstract' ? (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Project Abstract Submission - Level 1</h2>
                  </div>
                  <p className="text-gray-300 mb-4 text-sm">
                    Describe your innovative hardware solution
                  </p>
                  <div className="space-y-3 max-w-3xl mx-auto">
                    <div>
                      <label className="block text-white font-medium mb-1">
                        Select Your Track <span className="text-purple-500">*</span>
                      </label>
                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={() => handleInputChange('projectTrack', '', 'IoT & Smart Environments')}
                          className={`w-full px-3 py-2 flex items-center gap-2 bg-white/10 border ${
                            formData.projectTrack === 'IoT & Smart Environments' 
                              ? 'border-purple-500 ring-1 ring-purple-500' 
                              : 'border-purple-500/20'
                          } rounded-lg text-white hover:bg-white/20 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors text-left`}
                        >
                          <span className="text-sm">🌐</span>
                          IoT & Smart Environments
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange('projectTrack', '', 'Robotics & Intelligent Machines')}
                          className={`w-full px-3 py-2 flex items-center gap-2 bg-white/10 border ${
                            formData.projectTrack === 'Robotics & Intelligent Machines'
                              ? 'border-purple-500 ring-1 ring-purple-500'
                              : 'border-purple-500/20'
                          } rounded-lg text-white hover:bg-white/20 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors text-left`}
                        >
                          <span className="text-sm">🤖</span>
                          Robotics & Intelligent Machines
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange('projectTrack', '', 'HealthTech & Human Augmentation')}
                          className={`w-full px-3 py-2 flex items-center gap-2 bg-white/10 border ${
                            formData.projectTrack === 'HealthTech & Human Augmentation'
                              ? 'border-purple-500 ring-1 ring-purple-500'
                              : 'border-purple-500/20'
                          } rounded-lg text-white hover:bg-white/20 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors text-left`}
                        >
                          <span className="text-sm">🏥</span>
                          HealthTech & Human Augmentation
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange('projectTrack', '', 'Sustainable & Clean Tech')}
                          className={`w-full px-3 py-2 flex items-center gap-2 bg-white/10 border ${
                            formData.projectTrack === 'Sustainable & Clean Tech'
                              ? 'border-purple-500 ring-1 ring-purple-500'
                              : 'border-purple-500/20'
                          } rounded-lg text-white hover:bg-white/20 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors text-left`}
                        >
                          <span className="text-sm">🌱</span>
                          Sustainable & Clean Tech
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-1">
                        Project Title <span className="text-purple-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Concise and descriptive title"
                        value={formData.projectTitle}
                        onChange={(e) => handleInputChange('projectTitle', '', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-1">
                        Problem Statement <span className="text-purple-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Brief description of the problem you're solving..."
                        value={formData.problemStatement}
                        onChange={(e) => handleInputChange('problemStatement', '', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-1">
                        Proposed Solution <span className="text-purple-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        placeholder="How your project addresses the problem..."
                        value={formData.proposedSolution}
                        onChange={(e) => handleInputChange('proposedSolution', '', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-1">
                        Basic System Architecture <span className="text-purple-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Overview of hardware/system components..."
                        value={formData.systemArchitecture}
                        onChange={(e) => handleInputChange('systemArchitecture', '', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-1">
                        Expected Technological and Social Impact <span className="text-purple-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Who benefits, and how?..."
                        value={formData.technologicalImpact}
                        onChange={(e) => handleInputChange('technologicalImpact', '', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                      ></textarea>
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
                          Fee Type <span className="text-purple-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => handleInputChange('feeType', '', 'IET Member Team')}
                          className={`w-full px-3 py-2 flex items-center gap-2 bg-white/10 border ${
                            formData.feeType === 'IET Member Team' 
                              ? 'border-purple-500 ring-1 ring-purple-500' 
                              : 'border-purple-500/20'
                          } rounded-lg text-white hover:bg-white/20 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors text-left`}
                        >
                          <input 
                            type="radio" 
                            name="feeType" 
                            value="IET Member Team" 
                            checked={formData.feeType === 'IET Member Team'}
                            onChange={() => handleInputChange('feeType', '', 'IET Member Team')}
                            className="w-4 h-4 border-purple-500/20 text-purple-500 focus:ring-purple-500 bg-white/10" 
                          />
                          <div>
                            <div className="font-medium text-white">IET Member Team - ₹300</div>
                            <div className="text-sm text-gray-300">At least one member must be an IET Student Member</div>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange('feeType', '', 'Non-Member Team')}
                          className={`w-full px-3 py-2 flex items-center gap-2 bg-white/10 border ${
                            formData.feeType === 'Non-Member Team'
                              ? 'border-purple-500 ring-1 ring-purple-500'
                              : 'border-purple-500/20'
                          } rounded-lg text-white hover:bg-white/20 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors text-left`}
                        >
                          <input 
                            type="radio" 
                            name="feeType" 
                            value="Non-Member Team" 
                            checked={formData.feeType === 'Non-Member Team'}
                            onChange={() => handleInputChange('feeType', '', 'Non-Member Team')}
                            className="w-4 h-4 border-purple-500/20 text-purple-500 focus:ring-purple-500 bg-white/10" 
                          />
                          <div>
                            <div className="font-medium text-white">Non-Member Team - ₹600</div>
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
                          <button type="button" onClick={() => navigator.clipboard.writeText('92402004037404S')} aria-label="Copy Account Number"><Copy className="w-4 h-4" /></button>
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
                          Transaction Reference Number <span className="text-purple-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter transaction ID after payment"
                          value={formData.transactionId}
                          onChange={(e) => handleInputChange('transactionId', '', e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                        <p className="text-gray-300 text-xs mt-1">Enter the transaction ID received after payment</p>
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-1">
                          Upload Transaction Screenshot <span className="text-purple-500">*</span>
                        </label>
                        <div 
                          onClick={handleUploadClick}
                          className="border-2 border-dashed border-purple-500/20 rounded-lg p-8 hover:border-purple-500 transition-colors cursor-pointer bg-white/5"
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
                    {/* Declaration Section - normal design */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">📝</span>
                        </div>
                        <h2 className="text-xl font-bold text-white">Declaration</h2>
                      </div>
                      <div className="space-y-2">
                        <p className="text-white">By submitting this form, we confirm that:</p>
                        <ul className="list-disc text-gray-300 space-y-1 ml-5">
                          <li>All project work is original and developed by the team</li>
                          <li>Our institution is located in Telangana, Andhra Pradesh, or Chhattisgarh</li>
                          <li>We agree to participate in both offline rounds if shortlisted</li>
                          <li>We understand and accept all rules and eligibility criteria</li>
                        </ul>
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="checkbox"
                            id="terms"
                            checked={formData.termsAccepted}
                            onChange={(e) => handleInputChange('termsAccepted', '', e.target.checked)}
                            className="w-4 h-4 rounded border-purple-500/20 text-purple-500 focus:ring-purple-500 bg-white/10"
                          />
                          <label htmlFor="terms" className="text-white">
                            I/We agree to the above terms and conditions <span className="text-purple-500">*</span>
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
                  else if (currentStep === 'project-abstract') goToStep('team-members');
                  else if (currentStep === 'payment') goToStep('project-abstract');
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
                  else if (currentStep === 'team-members') goToStep('project-abstract');
                  else if (currentStep === 'project-abstract') goToStep('payment');
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

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.7; }
        }
        
        .stars-small, .stars-medium, .stars-large {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(2px 2px at var(--star-x, 50%) var(--star-y, 50%), rgba(160, 70, 180, 0.3), transparent);
          background-size: 200px 200px;
          animation: twinkle 4s infinite;
        }
        
        .stars-medium {
          background-image: radial-gradient(3px 3px at var(--star-x, 30%) var(--star-y, 70%), rgba(160, 70, 180, 0.3), transparent);
          background-size: 300px 300px;
          animation-delay: 2s;
        }
        
        .stars-large {
          background-image: radial-gradient(4px 4px at var(--star-x, 70%) var(--star-y, 30%), rgba(160, 70, 180, 0.3), transparent);
          background-size: 400px 400px;
          animation-delay: 3s;
        }

        @media (max-width: 768px) {
          .container, .max-w-6xl, .md\:max-w-6xl {
            max-width: 100vw !important;
            width: 100vw !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }

        .gradient-btn {
          background: linear-gradient(135deg, #a046b4 0%, #53274E 100%);
          color: #fff;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08);
          transition: background 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s cubic-bezier(.4,0,.2,1), transform 0.3s cubic-bezier(.4,0,.2,1);
          position: relative;
          overflow: hidden;
        }
        .gradient-btn:hover {
          background: linear-gradient(135deg, #53274E 0%, #a046b4 100%);
          box-shadow: 0 10px 15px rgba(160,70,180,0.2), 0 4px 6px rgba(160,70,180,0.1);
          transform: translateY(-4px);
          outline: none;
        }
        .gradient-btn:focus {
          outline: none;
        }
        .gradient-btn:active {
          transform: translateY(-2px);
        }
        .gradient-btn:disabled, .gradient-btn[disabled] {
          opacity: 0.5;
          cursor: not-allowed;
          background: linear-gradient(135deg, #a046b4 0%, #53274E 100%);
          box-shadow: none;
          transform: none;
        }
        .gradient-btn .arrow-right {
          display: inline-block;
          transition: transform 0.2s cubic-bezier(.4,0,.2,1);
        }
        .gradient-btn:hover .arrow-right {
          transform: translateX(3px);
        }
        .outline-btn {
          border: 2px solid #a046b4;
          color: #a046b4;
          background: transparent;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          transition: background 0.3s cubic-bezier(.4,0,.2,1), border-color 0.3s cubic-bezier(.4,0,.2,1), color 0.3s cubic-bezier(.4,0,.2,1), transform 0.3s cubic-bezier(.4,0,.2,1);
          position: relative;
          overflow: hidden;
        }
        .outline-btn:hover {
          background: transparent;
          border-color: #53274E;
          color: #53274E;
          transform: translateY(-4px);
          outline: none;
        }
        .outline-btn:focus {
          outline: none;
        }
        .outline-btn:active {
          transform: translateY(-2px);
        }
        .outline-btn .arrow-left {
          display: inline-block;
          transition: transform 0.2s cubic-bezier(.4,0,.2,1);
        }
        .outline-btn:hover .arrow-left {
          transform: translateX(-3px);
        }
        .error-message {
          color: #ef4444;
          font-size: 0.95em;
          margin-top: 0.25rem;
          margin-bottom: 0.25rem;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default ProtoPlanet;