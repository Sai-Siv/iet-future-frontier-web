import React, { useState, useRef, FormEvent } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Users, UserPlus, CheckCircle, ExternalLink } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  yearBranch: string;
  isIETMember: boolean;
  ietMembershipId: string;
  accommodation: 'yes' | 'no' | '';
  transactionId: string;
  paymentScreenshot: File | null;
  paymentScreenshotPreview: string | null;
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
  // Terms
  termsAccepted: boolean;
}

type MemberKey = 'member1' | 'member2' | 'member3';

const AppAstral = () => {
  const [currentStep, setCurrentStep] = useState<'team-details' | 'team-members'>('team-details');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const goToStep = (step: 'team-details' | 'team-members') => {
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

  const member1PaymentRef = useRef<HTMLInputElement>(null);
  const member2PaymentRef = useRef<HTMLInputElement>(null);
  const member3PaymentRef = useRef<HTMLInputElement>(null);

  const memberRefs: Record<MemberKey, React.RefObject<HTMLInputElement>> = {
    member1: member1PaymentRef,
    member2: member2PaymentRef,
    member3: member3PaymentRef
  };

  const createInitialMember = (): TeamMember => ({
    name: '',
    email: '',
    phone: '',
    yearBranch: '',
    isIETMember: false,
    ietMembershipId: '',
    accommodation: '',
    transactionId: '',
    paymentScreenshot: null,
    paymentScreenshotPreview: null
  });

  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    institutionName: '',
    cityState: '',
    member1: createInitialMember(),
    member2: createInitialMember(),
    member3: createInitialMember(),
    termsAccepted: false
  });

  const isMobile = useIsMobile();

  const handleTeamChange = (field: 'teamName' | 'institutionName' | 'cityState', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMemberChange = (
    memberKey: MemberKey,
    field: keyof TeamMember,
    value: string | boolean | File | null
  ) => {
    setFormData(prev => ({
      ...prev,
      [memberKey]: {
        ...prev[memberKey],
        [field]: value
      }
    }));
  };

  const handleMemberUploadClick = (memberKey: MemberKey) => {
    memberRefs[memberKey].current?.click();
  };

  const handleMemberFileUpload = (memberKey: MemberKey, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a PNG or JPG image for the transaction screenshot');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          [memberKey]: {
            ...prev[memberKey],
            paymentScreenshot: file,
            paymentScreenshotPreview: e.target?.result as string
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const missingFields: string[] = [];

    // Team Details validation
    if (!formData.teamName.trim()) missingFields.push('Team Name');
    if (!formData.institutionName.trim()) missingFields.push('Institution Name');
    if (!formData.cityState.trim()) missingFields.push('City & State');

    // Member 1 (Team Leader) validation
    if (!formData.member1.name.trim()) missingFields.push('Team Leader - Full Name');
    if (!formData.member1.email.trim()) missingFields.push('Team Leader - Email');
    if (!formData.member1.phone.trim()) missingFields.push('Team Leader - Phone Number');
    if (!formData.member1.yearBranch.trim()) missingFields.push('Team Leader - Year & Branch');
    if (formData.member1.accommodation === '') missingFields.push('Team Leader - Accommodation Selection');
    if (formData.member1.isIETMember) {
      if (!formData.member1.ietMembershipId.trim()) {
        missingFields.push('Team Leader - IET Membership ID');
      }
    } else {
      if (!formData.member1.transactionId.trim()) {
        missingFields.push('Team Leader - Transaction Reference Number');
      }
      if (!formData.member1.paymentScreenshot) {
        missingFields.push('Team Leader - Transaction Screenshot');
      }
    }

    // Member 2 validation
    if (!formData.member2.name.trim()) missingFields.push('Member 2 - Full Name');
    if (!formData.member2.email.trim()) missingFields.push('Member 2 - Email');
    if (!formData.member2.phone.trim()) missingFields.push('Member 2 - Phone Number');
    if (!formData.member2.yearBranch.trim()) missingFields.push('Member 2 - Year & Branch');
    if (formData.member2.accommodation === '') missingFields.push('Member 2 - Accommodation Selection');
    if (formData.member2.isIETMember) {
      if (!formData.member2.ietMembershipId.trim()) {
        missingFields.push('Member 2 - IET Membership ID');
      }
    } else {
      if (!formData.member2.transactionId.trim()) {
        missingFields.push('Member 2 - Transaction Reference Number');
      }
      if (!formData.member2.paymentScreenshot) {
        missingFields.push('Member 2 - Transaction Screenshot');
      }
    }

    // Member 3 validation (optional - only validate if a Name is provided)
    if (formData.member3.name && formData.member3.name.trim() !== '') {
      if (!formData.member3.email.trim()) missingFields.push('Member 3 - Email');
      if (!formData.member3.phone.trim()) missingFields.push('Member 3 - Phone Number');
      if (!formData.member3.yearBranch.trim()) missingFields.push('Member 3 - Year & Branch');
      if (formData.member3.accommodation === '') missingFields.push('Member 3 - Accommodation Selection');
      if (formData.member3.isIETMember) {
        if (!formData.member3.ietMembershipId.trim()) {
          missingFields.push('Member 3 - IET Membership ID');
        }
      } else {
        if (!formData.member3.transactionId.trim()) {
          missingFields.push('Member 3 - Transaction Reference Number');
        }
        if (!formData.member3.paymentScreenshot) {
          missingFields.push('Member 3 - Transaction Screenshot');
        }
      }
    }

    // Declaration acceptance
    if (!formData.termsAccepted) {
      missingFields.push('Declarations & Terms Acceptance');
    }

    if (missingFields.length > 0) {
      const sections: { [key: string]: string[] } = {
        'Team Details': missingFields.filter(f => !f.includes('-') && !f.includes('Terms')),
        'Team Members': missingFields.filter(f => f.includes('-') || f.includes('Terms'))
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
        message: 'Preparing registration data...'
      });

      const submitData = new FormData();
      
      // Append team details
      submitData.append('teamName', formData.teamName);
      submitData.append('institutionName', formData.institutionName);
      submitData.append('cityState', formData.cityState);
      
      // Prepare member JSON objects (excluding file objects)
      const m1Data = {
        name: formData.member1.name,
        email: formData.member1.email,
        phone: formData.member1.phone,
        yearBranch: formData.member1.yearBranch,
        isIETMember: formData.member1.isIETMember,
        ietMembershipId: formData.member1.ietMembershipId,
        accommodation: formData.member1.accommodation,
        transactionId: formData.member1.transactionId
      };
      submitData.append('member1', JSON.stringify(m1Data));

      const m2Data = {
        name: formData.member2.name,
        email: formData.member2.email,
        phone: formData.member2.phone,
        yearBranch: formData.member2.yearBranch,
        isIETMember: formData.member2.isIETMember,
        ietMembershipId: formData.member2.ietMembershipId,
        accommodation: formData.member2.accommodation,
        transactionId: formData.member2.transactionId
      };
      submitData.append('member2', JSON.stringify(m2Data));

      if (formData.member3.name && formData.member3.name.trim() !== '') {
        const m3Data = {
          name: formData.member3.name,
          email: formData.member3.email,
          phone: formData.member3.phone,
          yearBranch: formData.member3.yearBranch,
          isIETMember: formData.member3.isIETMember,
          ietMembershipId: formData.member3.ietMembershipId,
          accommodation: formData.member3.accommodation,
          transactionId: formData.member3.transactionId
        };
        submitData.append('member3', JSON.stringify(m3Data));
      }

      submitData.append('termsAccepted', formData.termsAccepted.toString());

      // Append file attachments for each member who uploaded a payment screenshot
      if (formData.member1.paymentScreenshot) {
        submitData.append('member1Payment', formData.member1.paymentScreenshot);
      }
      if (formData.member2.paymentScreenshot) {
        submitData.append('member2Payment', formData.member2.paymentScreenshot);
      }
      if (formData.member3.paymentScreenshot) {
        submitData.append('member3Payment', formData.member3.paymentScreenshot);
      }

      setSubmissionStatus({
        status: 'submitting',
        message: 'Uploading registration data...'
      });
      
      // Try local gateway or fallback to render deployment
      let response: Response;
      try {
        response = await fetch('/api/appastral/register', {
          method: 'POST',
          body: submitData
        });
        if (!response.ok && response.status === 404) {
          throw new Error('Local route 404');
        }
      } catch (err) {
        response = await fetch('https://iet-future-frontier-web.onrender.com/api/appastral/register', {
          method: 'POST',
          body: submitData
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Registration failed');
      }

      const result = await response.json();
      console.log('Server response:', result);

      if (result.success) {
        setSubmissionStatus({
          status: 'success',
          message: 'Registration successful! Confirmation has been sent to your email.'
        });

        // Reset form
        setFormData({
          teamName: '',
          institutionName: '',
          cityState: '',
          member1: createInitialMember(),
          member2: createInitialMember(),
          member3: createInitialMember(),
          termsAccepted: false
        });

        if (member1PaymentRef.current) member1PaymentRef.current.value = '';
        if (member2PaymentRef.current) member2PaymentRef.current.value = '';
        if (member3PaymentRef.current) member3PaymentRef.current.value = '';

        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentStep('team-details');

        alert('Registration successful! Confirmation has been sent to your email.');
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

  const renderMemberSection = (memberKey: MemberKey, title: string, isRequired: boolean) => {
    const member = formData[memberKey];

    return (
      <div className="space-y-4 bg-white/5 rounded-xl p-4 sm:p-6" style={{ border: '1.5px solid #22bbe0' }}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            {title} {isRequired && <span style={{ color: '#22bbe0' }}>*</span>}
          </h3>
          {!isRequired && (
            <span className="text-xs text-gray-400 bg-white/10 px-2.5 py-1 rounded-full">
              Optional
            </span>
          )}
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-white font-medium mb-1">
            Full Name {isRequired && <span style={{ color: '#22bbe0' }}>*</span>}
          </label>
          <input
            type="text"
            placeholder="Enter full name"
            value={member.name}
            onChange={(e) => handleMemberChange(memberKey, 'name', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Email ID */}
        <div>
          <label className="block text-white font-medium mb-1">
            Email ID {isRequired && <span style={{ color: '#22bbe0' }}>*</span>}
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            value={member.email}
            onChange={(e) => handleMemberChange(memberKey, 'email', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-white font-medium mb-1">
            Phone Number {isRequired && <span style={{ color: '#22bbe0' }}>*</span>}
          </label>
          <input
            type="tel"
            placeholder="+91 12345 67890"
            value={member.phone}
            onChange={(e) => handleMemberChange(memberKey, 'phone', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Year & Branch */}
        <div>
          <label className="block text-white font-medium mb-1">
            Year & Branch {isRequired && <span style={{ color: '#22bbe0' }}>*</span>}
          </label>
          <input
            type="text"
            placeholder="e.g., 3rd Year CSE"
            value={member.yearBranch}
            onChange={(e) => handleMemberChange(memberKey, 'yearBranch', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* IET Member Option (Yes / No) */}
        <div className="pt-2 border-t border-white/10">
          <label className="block text-white font-medium mb-2">
            Are you an IET Member? {isRequired && <span style={{ color: '#22bbe0' }}>*</span>}
          </label>
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            <button
              type="button"
              onClick={() => handleMemberChange(memberKey, 'isIETMember', true)}
              className={`px-4 py-2 rounded-lg border font-medium flex items-center justify-center gap-2 transition-all ${
                member.isIETMember
                  ? 'bg-[#22bbe0] text-white border-[#22bbe0] shadow-[0_0_12px_rgba(34,187,224,0.4)]'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              <span>Yes</span>
            </button>
            <button
              type="button"
              onClick={() => handleMemberChange(memberKey, 'isIETMember', false)}
              className={`px-4 py-2 rounded-lg border font-medium flex items-center justify-center gap-2 transition-all ${
                !member.isIETMember
                  ? 'bg-[#22bbe0] text-white border-[#22bbe0] shadow-[0_0_12px_rgba(34,187,224,0.4)]'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              <span>No</span>
            </button>
          </div>
        </div>

        {/* If Yes: IET Membership ID */}
        {member.isIETMember && (
          <div className="space-y-1">
            <label className="block text-white font-medium mb-1">
              IET Membership ID <span style={{ color: '#22bbe0' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter IET Membership ID (e.g. IET-12345678)"
              value={member.ietMembershipId}
              onChange={(e) => handleMemberChange(memberKey, 'ietMembershipId', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <p className="text-gray-400 text-xs">IET members are eligible for membership benefits</p>
          </div>
        )}

        {/* If No: Fee Payment with random link + Transaction ID + Screenshot upload */}
        {!member.isIETMember && (
          <div className="space-y-4 p-4 rounded-xl bg-white/[0.04] border border-[#22bbe0]/30">
            {/* Payment Link Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg bg-[#003A66]/40 border border-[#22bbe0]/30">
              <div>
                <div className="font-semibold text-white flex items-center gap-2">
                  <span>Registration Fee: ₹300</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#22bbe0]/20 text-[#22bbe0] font-medium">Non-Member</span>
                </div>
                <p className="text-xs text-gray-300 mt-0.5">Please pay the registration fee using the online payment link</p>
              </div>
              <a
                href="https://payment.iet360.org/pay-appastral"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#22bbe0] to-[#003A66] hover:brightness-110 shadow-md transition-all flex-shrink-0"
              >
                <span>Pay Fee Online</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Transaction Reference Number */}
            <div>
              <label className="block text-white font-medium mb-1">
                Transaction Reference Number <span style={{ color: '#22bbe0' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter UTR / Transaction ID after payment"
                value={member.transactionId}
                onChange={(e) => handleMemberChange(memberKey, 'transactionId', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <p className="text-gray-400 text-xs mt-1">Enter the transaction ID received after completing your payment</p>
            </div>

            {/* Upload Transaction Screenshot */}
            <div>
              <label className="block text-white font-medium mb-1">
                Upload Transaction Screenshot <span style={{ color: '#22bbe0' }}>*</span>
              </label>
              <div 
                onClick={() => handleMemberUploadClick(memberKey)}
                className="border-2 border-dashed border-[#22BBE0]/30 rounded-lg p-5 hover:border-[#22BBE0] transition-colors cursor-pointer bg-white/5"
              >
                <input
                  type="file"
                  ref={memberRefs[memberKey]}
                  onChange={(e) => handleMemberFileUpload(memberKey, e)}
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center text-center">
                  {member.paymentScreenshotPreview ? (
                    <div className="w-full">
                      <img 
                        src={member.paymentScreenshotPreview} 
                        alt="Transaction Screenshot" 
                        className="max-h-40 mx-auto mb-2 rounded-lg border border-white/10"
                      />
                      <div className="flex items-center justify-center gap-1.5 text-green-400 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        <span>Screenshot uploaded (Click to change)</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="text-2xl mb-1">⬆️</span>
                      <div className="text-white font-medium text-sm">Click to upload transaction screenshot</div>
                      <div className="text-gray-400 text-xs mt-0.5">PNG, JPG up to 10MB</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Accommodation Option (Yes / No) */}
        <div className="pt-2 border-t border-white/10">
          <label className="block text-white font-medium mb-2">
            Accommodation Required? {isRequired && <span style={{ color: '#22bbe0' }}>*</span>}
          </label>
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            <button
              type="button"
              onClick={() => handleMemberChange(memberKey, 'accommodation', 'yes')}
              className={`px-4 py-2 rounded-lg border font-medium flex items-center justify-center gap-2 transition-all ${
                member.accommodation === 'yes'
                  ? 'bg-[#22bbe0] text-white border-[#22bbe0] shadow-[0_0_12px_rgba(34,187,224,0.4)]'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              <span>Yes</span>
            </button>
            <button
              type="button"
              onClick={() => handleMemberChange(memberKey, 'accommodation', 'no')}
              className={`px-4 py-2 rounded-lg border font-medium flex items-center justify-center gap-2 transition-all ${
                member.accommodation === 'no'
                  ? 'bg-[#22bbe0] text-white border-[#22bbe0] shadow-[0_0_12px_rgba(34,187,224,0.4)]'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              <span>No</span>
            </button>
          </div>
          {member.accommodation === 'yes' && (
            <p className="text-xs text-blue-300/80 mt-1.5">
              ℹ️ Accommodation details and check-in instructions will be shared via email prior to the event.
            </p>
          )}
        </div>
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
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full blur-sm animate-pulse" style={{ backgroundColor: '#22bbe0', boxShadow: '0 0 15px rgba(34,187,224,0.4)' }}></div>
        <div className="absolute bottom-20 right-10 w-1.5 h-1.5 rounded-full blur-sm animate-pulse" style={{ backgroundColor: '#22bbe0', boxShadow: '0 0 15px rgba(34,187,224,0.4)', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-20 w-3 h-3 rounded-full blur-sm animate-pulse" style={{ backgroundColor: '#22bbe0', boxShadow: '0 0 15px rgba(34,187,224,0.4)', animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-24 w-2 h-2 rounded-full blur-sm animate-pulse" style={{ backgroundColor: '#22bbe0', boxShadow: '0 0 15px rgba(34,187,224,0.4)', animationDelay: '3s' }}></div>
      </div>

      <main className="pt-2 pb-16 relative z-10">
        <div className="container mx-auto px-2 sm:px-4 w-full max-w-6xl md:w-auto md:max-w-6xl">
          {renderStatusMessage()}

          <div className="text-center mb-12 pt-8">
            <div className="mb-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-3">
                <span className="text-white">App</span>
                <span style={{ color: '#22bbe0' }}>Astral</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-300 mb-4">
                Mobile App Design & Innovation Sprint 2025
              </h2>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 text-white">
                <span className="text-xl">📱</span>
                Design. Prototype. Innovate.
              </span>
            </div>

            <div className="inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-6 py-3" style={{ background: '#003A66', borderColor: '#22bbe0', borderWidth: 1 }}>
              <span className="text-white font-medium">Registration Deadline: 15 August 2025</span>
            </div>
          </div>

          {/* Tabs Navigation - EXACTLY 2 Steps: Team Details and Team Members */}
          <div ref={tabsRef} className="flex items-center justify-center gap-2 mb-8 w-full">
            <button
              type="button"
              onClick={() => goToStep('team-details')}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
                currentStep === 'team-details'
                  ? 'text-white font-semibold'
                  : 'bg-black/40 text-gray-400 hover:text-white'
              }`}
              style={currentStep === 'team-details' ? { backgroundColor: '#22bbe0' } : {}}
            >
              <Users className="w-5 h-5" />
              <span>Team Details</span>
            </button>

            {/* Gradient Separator */}
            <div
              className="w-8 md:w-16 h-1 mx-2 rounded-full"
              style={{ background: 'linear-gradient(to right, #22bbe0, #003A66)' }}
            ></div>

            <button
              type="button"
              onClick={() => goToStep('team-members')}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
                currentStep === 'team-members'
                  ? 'text-white font-semibold'
                  : 'bg-black/40 text-gray-400 hover:text-white'
              }`}
              style={currentStep === 'team-members' ? { backgroundColor: '#22bbe0' } : {}}
            >
              <UserPlus className="w-5 h-5" />
              <span>Team Members</span>
            </button>
          </div>

          {/* Form Section */}
          <div className={`bg-[#000] backdrop-blur-sm rounded-2xl p-4 sm:p-8 md:p-12 
            shadow-[0_19px_38px_#22bbe0,0_15px_12px_#22bbe0] w-full max-w-4xl mx-auto overflow-x-auto min-h-[550px] transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
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

                  <div className="space-y-4 max-w-3xl mx-auto">
                    <div>
                      <label className="block text-white font-medium mb-1" htmlFor="teamName">
                        Team Name <span style={{ color: '#22bbe0' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="teamName"
                        placeholder="Enter team name"
                        value={formData.teamName}
                        onChange={(e) => handleTeamChange('teamName', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                      <p className="text-gray-400 text-xs mt-1">
                        Choose a unique name for your team
                      </p>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-1" htmlFor="institutionName">
                        Institution Name <span style={{ color: '#22bbe0' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="institutionName"
                        placeholder="College/University name"
                        value={formData.institutionName}
                        onChange={(e) => handleTeamChange('institutionName', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-1" htmlFor="cityState">
                        City & State <span style={{ color: '#22bbe0' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="cityState"
                        placeholder="e.g., Hyderabad, Telangana"
                        value={formData.cityState}
                        onChange={(e) => handleTeamChange('cityState', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                    <h2 className="text-xl font-bold text-white">Team Members & Payment Details</h2>
                  </div>
                  <p className="text-gray-300 mb-4 text-sm">
                    Enter member details, IET membership, accommodation preferences, and individual payment details
                  </p>

                  <div className="space-y-6 max-w-3xl mx-auto">
                    {/* Member 1 (Team Leader) */}
                    {renderMemberSection('member1', 'Team Leader (Member 1)', true)}

                    {/* Member 2 */}
                    {renderMemberSection('member2', 'Member 2', true)}

                    {/* Member 3 (Optional) */}
                    {renderMemberSection('member3', 'Member 3', false)}

                    {/* Declarations & Consent */}
                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-base">📝</span>
                        </div>
                        <h3 className="text-lg font-bold text-white">Declarations & Consent</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-300">By submitting this registration, we confirm that:</p>
                        <ul className="list-disc text-gray-400 space-y-1 ml-5 text-xs sm:text-sm">
                          <li>All participants are undergrad students from Telangana, Andhra Pradesh, or neighbouring states.</li>
                          <li>Each team member has accurately provided their IET membership status or completed their fee payment.</li>
                          <li>We agree to abide by the official rules and code of conduct of AppAstral / IET 360°.</li>
                        </ul>
                        <div className="flex items-center gap-2 pt-2">
                          <input
                            type="checkbox"
                            id="terms"
                            checked={formData.termsAccepted}
                            onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                            className="w-4 h-4 rounded border-blue-500/20 text-[#22bbe0] focus:ring-[#22bbe0] bg-white/10 cursor-pointer"
                          />
                          <label htmlFor="terms" className="text-white text-sm cursor-pointer select-none">
                            I/We agree to the above terms and declarations <span style={{ color: '#22bbe0' }}>*</span>
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
          <div className="flex justify-between items-center max-w-4xl mx-auto mt-10 gap-4 px-2">
            {currentStep === 'team-members' && (
              <button
                type="button"
                onClick={() => goToStep('team-details')}
                className="outline-btn px-6 py-2.5 rounded-lg font-medium flex items-center gap-2"
                onMouseUp={e => e.currentTarget.blur()}
              >
                <span className="arrow-left">←</span> Previous
              </button>
            )}
            <div className="flex-1"></div>
            {currentStep === 'team-details' ? (
              <button
                type="button"
                onClick={() => goToStep('team-members')}
                className="gradient-btn px-8 py-2.5 rounded-lg font-medium flex items-center gap-2"
                onMouseUp={e => e.currentTarget.blur()}
              >
                Next <span className="arrow-right">→</span>
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="gradient-btn px-8 py-2.5 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
          .container, .max-w-6xl, .md\\:max-w-6xl {
            max-width: 100vw !important;
            width: 100vw !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }

        .gradient-btn {
          background: linear-gradient(135deg, #22bbe0 0%, #003a66 100%);
          color: #fff;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08);
          transition: background 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s cubic-bezier(.4,0,.2,1), transform 0.3s cubic-bezier(.4,0,.2,1);
          position: relative;
          overflow: hidden;
        }
        .gradient-btn:hover {
          background: linear-gradient(135deg, #003A66 0%, #22bbe0 100%);
          box-shadow: 0 10px 15px rgba(34,187,224,0.2), 0 4px 6px rgba(34,187,224,0.1);
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
          background: linear-gradient(135deg, #22bbe0 0%, #003a66 100%);
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
          border: 2px solid #22bbe0;
          color: #22bbe0;
          background: transparent;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          transition: background 0.3s cubic-bezier(.4,0,.2,1), border-color 0.3s cubic-bezier(.4,0,.2,1), color 0.3s cubic-bezier(.4,0,.2,1), transform 0.3s cubic-bezier(.4,0,.2,1);
          position: relative;
          overflow: hidden;
        }
        .outline-btn:hover {
          background: transparent;
          border-color: #003A66;
          color: #003A66;
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
      `}</style>
    </div>
  );
};

export default AppAstral;