import React, { useState, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { User, Layers, FileText, CheckCircle } from 'lucide-react';
import { FormField } from '@/components/awards/FormFields';
import { generalInformation, studentAwards, professionalAwards, AwardCategory } from '@/data/awardsData';
import { useIsMobile } from '@/hooks/use-mobile';
import { API_BASE_URL } from '@/config/api';

const Awards = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const isMobile = useIsMobile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({
    status: 'idle',
    message: ''
  });

  const goToStep = (step: number) => {
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentStep(step);

      if (tabsRef.current) {
        const headerOffset = 120;
        const elementPosition = tabsRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }

      setIsTransitioning(false);
    }, 300);
  };

  const handleInputChange = (questionId: string | number, value: any) => {
    setFormData((prev) => ({ ...prev, [questionId]: value }));
  };

  // Determine current path
  const categoryValue = formData['1063768476']; // Category dropdown question ID
  const isStudent = categoryValue === 'Student';
  const isProfessional = categoryValue === 'Professional';
  
  let specificAwardCategory: AwardCategory | undefined;
  if (isStudent && formData['student-award-category']) {
    specificAwardCategory = studentAwards.find(a => a.title === formData['student-award-category']);
  } else if (isProfessional && formData['prof-award-category']) {
    specificAwardCategory = professionalAwards.find(a => a.title === formData['prof-award-category']);
  }

  const nextStep = () => {
    if (currentStep === 1 && !categoryValue) {
      alert('Please select a Category (Student or Professional) before proceeding.');
      return;
    }
    
    if (currentStep === 2) {
      if (isStudent && !formData['student-award-category']) {
        alert('Please select a Student Award Category.');
        return;
      }
      if (isProfessional && !formData['prof-award-category']) {
        alert('Please select a Professional Award Category.');
        return;
      }
    }
    
    goToStep(currentStep + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus({
      status: 'submitting',
      message: 'Submitting your application...'
    });

    try {
      const submitData = new FormData();
      
      // Append all form data
      Object.keys(formData).forEach(key => {
        const value = formData[key];
        if (value instanceof File) {
          submitData.append(key, value, value.name);
        } else if (Array.isArray(value)) {
          submitData.append(key, JSON.stringify(value));
        } else {
          submitData.append(key, value);
        }
      });

      // Include metadata about which category and award was selected
      submitData.append('isStudent', String(isStudent));
      submitData.append('isProfessional', String(isProfessional));
      if (specificAwardCategory) {
        submitData.append('awardCategoryTitle', specificAwardCategory.title);
      }

      const response = await fetch(`${API_BASE_URL}/api/awards/register`, {
        method: 'POST',
        body: submitData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Application submission failed');
      }

      const result = await response.json();
      console.log('Server response:', result);

      if (result.success || response.ok) {
        setSubmissionStatus({
          status: 'success',
          message: 'Application successful! We will contact you shortly.'
        });
        
        // Reset form data and go to success step
        setFormData({});
        setIsSubmitting(false);
        goToStep(4);
      } else {
        throw new Error(result.message || 'Application failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionStatus({
        status: 'error',
        message: 'Error: ' + (error as Error).message
      });
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

  const tabItems = [
    { step: 1, label: 'General', icon: User },
    { step: 2, label: 'Category', icon: Layers },
    { step: 3, label: 'Details', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-black w-full overflow-clip relative">
      <Navigation />

      {/* Background with subtle star-like dots */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 pointer-events-none">
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

      <main className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 w-full max-w-6xl md:w-auto md:max-w-6xl">
          
          <div className="text-center mb-16 pt-8">
            <div className="mb-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4">
                <span className="text-white">IET 360°</span> <span style={{ color: '#a046b4' }}>Awards</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-300 mb-4">
                Student &amp; Professional Awards &bull; Recognising Excellence, Leadership &amp; Contributions
              </h2>
            </div>
          </div>

          {currentStep < 4 && (
            <div ref={tabsRef} className="flex items-center justify-center gap-2 mb-8 w-full">
              {tabItems.map((tab, idx) => (
                <React.Fragment key={tab.step}>
                  <button
                    onClick={() => tab.step < currentStep ? goToStep(tab.step) : null}
                    disabled={tab.step > currentStep}
                    className={`flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors ${
                      currentStep === tab.step
                        ? 'text-white'
                        : tab.step < currentStep 
                          ? 'bg-black/40 text-purple-400 hover:text-white cursor-pointer'
                          : 'bg-black/40 text-gray-600 cursor-not-allowed'
                    }`}
                    style={currentStep === tab.step ? { backgroundColor: '#a046b4' } : {}}
                  >
                    <tab.icon className="w-5 h-5 md:w-5 md:h-5" />
                    {!isMobile && <span>{tab.label}</span>}
                  </button>
                  
                  {idx < tabItems.length - 1 && (
                    <>
                      <div
                        className="hidden md:block w-8 h-1 mx-1 rounded-full"
                        style={{ background: 'linear-gradient(to right, #a046b4, #000)' }}
                      ></div>
                      <div
                        className="block md:hidden w-8 h-1 my-1 rounded-full"
                        style={{ background: 'linear-gradient(to right, #a046b4, #000)' }}
                      ></div>
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {renderStatusMessage()}

          <div className={`bg-[#000] backdrop-blur-sm rounded-2xl p-4 sm:p-8 md:p-12 shadow-[rgba(160,70,180,0.3)_0px_19px_38px,rgba(160,70,180,0.22)_0px_15px_12px] w-full max-w-4xl mx-auto overflow-x-auto min-h-[450px] transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">General Information</h2>
                </div>
                
                <div className="space-y-6 max-w-3xl mx-auto">
                  {generalInformation.map(q => {
                    // Conditional rendering logic for IET Membership Number
                    if (q.id === 1608733035 && formData['1622581677'] !== 'Yes') {
                      return null;
                    }
                    
                    return (
                      <FormField 
                        key={q.id} 
                        question={q} 
                        value={formData[q.id]} 
                        onChange={(val) => handleInputChange(q.id, val)} 
                      />
                    );
                  })}
                  
                  <div className="flex justify-end pt-6">
                    <button 
                      onClick={nextStep}
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Select Award Category</h2>
                </div>
                
                <div className="space-y-6 max-w-3xl mx-auto">
                  {isStudent && (
                    <FormField 
                      question={{
                        id: 'student-award-category',
                        title: 'Student Awards Category',
                        type: 'Multiple Choice',
                        required: true,
                        options: studentAwards.map(a => ({ value: a.title }))
                      }}
                      value={formData['student-award-category']}
                      onChange={(val) => handleInputChange('student-award-category', val)}
                    />
                  )}

                  {isProfessional && (
                    <FormField 
                      question={{
                        id: 'prof-award-category',
                        title: 'Professional Awards Category',
                        type: 'Multiple Choice',
                        required: true,
                        options: professionalAwards.map(a => ({ value: a.title }))
                      }}
                      value={formData['prof-award-category']}
                      onChange={(val) => handleInputChange('prof-award-category', val)}
                    />
                  )}

                  {!isStudent && !isProfessional && (
                    <p className="text-gray-400">Please go back and select a Category (Student or Professional).</p>
                  )}

                  <div className="flex justify-between pt-6">
                    <button 
                      onClick={() => goToStep(1)}
                      className="px-6 py-3 bg-transparent border border-gray-600 hover:border-gray-400 text-white rounded-lg font-medium transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      onClick={nextStep}
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && specificAwardCategory && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{specificAwardCategory.title}</h2>
                </div>
                <p className="text-gray-300 mb-8 text-sm max-w-3xl mx-auto">
                  {specificAwardCategory.description}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
                  {specificAwardCategory.questions.map(q => (
                    <FormField 
                      key={q.id} 
                      question={q} 
                      value={formData[q.id]} 
                      onChange={(val) => handleInputChange(q.id, val)} 
                    />
                  ))}
                  
                  <div className="flex justify-between pt-6">
                    <button 
                      type="button" 
                      onClick={() => goToStep(2)}
                      className="px-6 py-3 bg-transparent border border-gray-600 hover:border-gray-400 text-white rounded-lg font-medium transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-[#a046b4] hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-bold transition-all disabled:opacity-50 flex items-center justify-center"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {currentStep === 4 && (
              <div className="text-center py-16 space-y-6">
                <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-bold text-white">Application Submitted!</h2>
                <p className="text-lg text-gray-400 max-w-md mx-auto">
                  Thank you for applying to the FTC Awards 2025. We have received your application and will review it shortly.
                </p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors border border-white/20"
                >
                  Submit Another Application
                </button>
              </div>
            )}
            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Awards;
