import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import axios from 'axios';

const PATNRegistration = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    fullName: '',
    department: '',
    instituteName: '',
    isIETMember: 'no',
    ietMembershipId: '',
    mobileNumber: '',
    emailAddress: '',
    youtubeLink: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = '#e0e0e0';
    document.body.style.fontFamily = "'Times New Roman', Times, serif";
    document.body.style.minHeight = '100vh';
    document.body.style.display = 'flex';
    document.body.style.flexDirection = 'column';
    document.body.style.alignItems = 'center';
    document.body.style.padding = '2rem 1rem';
    document.body.style.margin = '0';
    document.body.style.animation = 'fadeIn 0.5s ease-out forwards';

    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.fontFamily = '';
      document.body.style.minHeight = '';
      document.body.style.display = '';
      document.body.style.flexDirection = '';
      document.body.style.alignItems = '';
      document.body.style.padding = '';
      document.body.style.margin = '';
      document.body.style.animation = '';
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, isIETMember: e.target.value }));

    if (errors.isIETMember) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.isIETMember;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title) newErrors.title = 'Please select a title';
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!formData.department.trim()) newErrors.department = 'Please enter your department';
    if (!formData.instituteName.trim()) newErrors.instituteName = 'Please enter your institute name';
    if (!formData.isIETMember) newErrors.isIETMember = 'Please select an option';
    if (formData.isIETMember === 'yes' && !formData.ietMembershipId.trim()) {
      newErrors.ietMembershipId = 'Please enter your IET membership ID';
    }

    const mobileRegex = /^[0-9]{10,15}$/;
    const cleanedMobile = formData.mobileNumber.replace(/\D/g, '');
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Please enter your mobile number';
    } else if (!mobileRegex.test(cleanedMobile)) {
      newErrors.mobileNumber = 'Please enter a valid mobile number (10-15 digits)';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Please enter your email address';
    } else if (!emailRegex.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Please enter a valid email address';
    }

    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (!formData.youtubeLink.trim()) {
      newErrors.youtubeLink = 'Please enter the YouTube link';
    } else if (!youtubeRegex.test(formData.youtubeLink)) {
      newErrors.youtubeLink = 'Please enter a valid YouTube URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Make API call to backend
      const response = await axios.post('https://iet-future-frontier-web.onrender.com/api/patn/register', formData);
      if (response.data.success) {
        setShowSuccess(true);
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <>
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              20%, 60% { transform: translateX(-5px); }
              40%, 80% { transform: translateX(5px); }
            }
          `}
        </style>
        <div style={{
          textAlign: 'center',
          marginTop: '50px',
          animation: 'slideUp 0.6s ease-out'
        }}>
          <h2>Registration Complete!</h2>
          <p>Thank you for registering.</p>
          <button
            onClick={() => navigate('/')}
            style={{
              backgroundColor: '#22bbe0',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.875rem',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease, transform 0.2s ease',
              marginTop: '1rem'
            }}
          >
            Return to Home
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
          }
        `}
      </style>
      <div style={{
        maxWidth: '720px',
        width: '100%',
        animation: 'slideUp 0.6s ease-out 0.4s both'
      }}>
        <header style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '1rem',
          maxWidth: '720px',
          width: '100%',
          textAlign: 'center',
          animation: 'slideUp 0.6s ease-out 0.2s both'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div style={{
              backgroundColor: '#22bbe0',
              borderRadius: '50%',
              padding: '0.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaUsers style={{ color: 'white', fontSize: '1.125rem' }} />
            </div>
            <h1 style={{
              fontWeight: '600',
              color: '#22bbe0',
              fontSize: '1.5rem',
              marginLeft: '0.5rem',
              margin: '0'
            }}>
              PATN Event Registration
            </h1>
          </div>
          <p style={{
            color: '#b0b0b0',
            fontSize: '0.875rem',
            maxWidth: '580px'
          }}>
            Join us for an exciting technical event. Please fill out the form below to complete your registration.
          </p>
        </header>
        <form onSubmit={handleSubmit} style={{
          backgroundColor: '#1e1e1e',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          maxWidth: '720px',
          width: '100%',
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'linear-gradient(to right, #22bbe0, #1a9fc4)',
            padding: '1rem',
            color: 'white'
          }}>
            <h2 style={{
              fontWeight: '600',
              fontSize: '1.125rem',
              margin: '0'
            }}>
              Registration Details
            </h2>
            <p style={{
              fontSize: '0.75rem',
              marginTop: '0.25rem',
              marginBottom: '0'
            }}>
              Please provide your information to complete the registration process
            </p>
          </div>
          <section style={{ padding: '1.5rem' }}>
            {/* Personal Information */}
            <div style={{ marginBottom: '1rem', animation: 'slideUp 0.5s ease-out 0.5s both' }}>
              <h3 style={{
                fontWeight: '600',
                color: '#e0e0e0',
                fontSize: '0.875rem',
                marginBottom: '0.4rem'
              }}>
                Personal Information
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '0.4rem'
              }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{
                    display: 'block',
                    fontWeight: '600',
                    color: '#b0b0b0',
                    fontSize: '0.75rem',
                    marginBottom: '0.25rem'
                  }}>
                    Full Name *
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      style={{
                        width: '80px',
                        borderRadius: '0.375rem',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.75rem',
                        backgroundColor: '#2d2d2d',
                        border: errors.title ? '1px solid #ff4444' : '1px solid #3d3d3d',
                        color: '#e0e0e0',
                        outline: 'none',
                        transition: 'all 0.3s ease, transform 0.2s ease'
                      }}
                      required
                    >
                      <option value="">Title</option>
                      <option value="Mr">Mr</option>
                      <option value="Ms">Ms</option>
                    </select>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      style={{
                        flex: '1',
                        borderRadius: '0.375rem',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.75rem',
                        backgroundColor: '#2d2d2d',
                        border: errors.fullName ? '1px solid #ff4444' : '1px solid #3d3d3d',
                        color: '#e0e0e0',
                        outline: 'none',
                        transition: 'all 0.3s ease, transform 0.2s ease'
                      }}
                      required
                    />
                  </div>
                  {(errors.title || errors.fullName) && (
                    <div style={{
                      color: '#ff4444',
                      fontSize: '0.7rem',
                      marginTop: '0.25rem'
                    }}>
                      {errors.title || errors.fullName}
                    </div>
                  )}
                </div>

              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '0.4rem'
              }}>
                <div style={{ gridColumn: 'span 1' }}>
                  <label style={{
                    display: 'block',
                    fontWeight: '600',
                    color: '#b0b0b0',
                    fontSize: '0.75rem',
                    marginBottom: '0.25rem'
                  }}>
                    Department *
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science, ECE"
                    style={{
                      width: '100%',
                      borderRadius: '0.375rem',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.75rem',
                      backgroundColor: '#2d2d2d',
                      border: errors.department ? '1px solid #ff4444' : '1px solid #3d3d3d',
                      color: '#e0e0e0',
                      outline: 'none',
                      transition: 'all 0.3s ease, transform 0.2s ease'
                    }}
                    required
                  />
                  {errors.department && (
                    <div style={{
                      color: '#ff4444',
                      fontSize: '0.7rem',
                      marginTop: '0.25rem'
                    }}>
                      {errors.department}
                    </div>
                  )}
                </div>
                <div style={{ gridColumn: 'span 1' }}>
                  <label style={{
                    display: 'block',
                    fontWeight: '600',
                    color: '#b0b0b0',
                    fontSize: '0.75rem',
                    marginBottom: '0.25rem'
                  }}>
                    Institute Name *
                  </label>
                  <input
                    type="text"
                    name="instituteName"
                    value={formData.instituteName}
                    onChange={handleChange}
                    placeholder="Enter your institute/organization"
                    style={{
                      width: '100%',
                      borderRadius: '0.375rem',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.75rem',
                      backgroundColor: '#2d2d2d',
                      border: errors.instituteName ? '1px solid #ff4444' : '1px solid #3d3d3d',
                      color: '#e0e0e0',
                      outline: 'none',
                      transition: 'all 0.3s ease, transform 0.2s ease'
                    }}
                    required
                  />
                  {errors.instituteName && (
                    <div style={{
                      color: '#ff4444',
                      fontSize: '0.7rem',
                      marginTop: '0.25rem'
                    }}>
                      {errors.instituteName}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div style={{ marginBottom: '1rem', animation: 'slideUp 0.5s ease-out 0.6s both' }}>
              <h3 style={{
                fontWeight: '600',
                color: '#e0e0e0',
                fontSize: '0.875rem',
                marginBottom: '0.4rem'
              }}>
                IET Membership
              </h3>
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#b0b0b0',
                  fontSize: '0.75rem',
                  marginBottom: '0.25rem'
                }}>
                  Are you an IET Member? *
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  fontSize: '0.75rem',
                  color: '#b0b0b0',
                  marginTop: '0.5rem'
                }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="radio"
                      name="isIETMember"
                      value="yes"
                      checked={formData.isIETMember === 'yes'}
                      onChange={handleRadioChange}
                      style={{ width: 'auto' }}
                      required
                    />
                    <span>Yes</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="radio"
                      name="isIETMember"
                      value="no"
                      checked={formData.isIETMember === 'no'}
                      onChange={handleRadioChange}
                      style={{ width: 'auto' }}
                      required
                    />
                    <span>No</span>
                  </label>
                </div>
                {errors.isIETMember && (
                  <div style={{
                    color: '#ff4444',
                    fontSize: '0.7rem',
                    marginTop: '0.25rem'
                  }}>
                    {errors.isIETMember}
                  </div>
                )}
              </div>
              {formData.isIETMember === 'yes' && (
                <div style={{ marginTop: '15px', animation: 'slideUp 0.4s ease-out' }}>
                  <label style={{
                    display: 'block',
                    fontWeight: '600',
                    color: '#b0b0b0',
                    fontSize: '0.75rem',
                    marginBottom: '0.25rem'
                  }}>
                    IET Membership ID *
                  </label>
                  <input
                    type="text"
                    name="ietMembershipId"
                    value={formData.ietMembershipId}
                    onChange={handleChange}
                    placeholder="Enter your IET membership ID"
                    style={{
                      width: '100%',
                      borderRadius: '0.375rem',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.75rem',
                      backgroundColor: '#2d2d2d',
                      border: errors.ietMembershipId ? '1px solid #ff4444' : '1px solid #3d3d3d',
                      color: '#e0e0e0',
                      outline: 'none',
                      transition: 'all 0.3s ease, transform 0.2s ease'
                    }}
                    required={formData.isIETMember === 'yes'}
                  />
                  {errors.ietMembershipId && (
                    <div style={{
                      color: '#ff4444',
                      fontSize: '0.7rem',
                      marginTop: '0.25rem'
                    }}>
                      {errors.ietMembershipId}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div style={{ marginBottom: '1rem', animation: 'slideUp 0.5s ease-out 0.7s both' }}>
              <h3 style={{
                fontWeight: '600',
                color: '#e0e0e0',
                fontSize: '0.875rem',
                marginBottom: '0.4rem'
              }}>
                Contact Information
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: '600',
                    color: '#b0b0b0',
                    fontSize: '0.75rem',
                    marginBottom: '0.25rem'
                  }}>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    style={{
                      width: '100%',
                      borderRadius: '0.375rem',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.75rem',
                      backgroundColor: '#2d2d2d',
                      border: errors.mobileNumber ? '1px solid #ff4444' : '1px solid #3d3d3d',
                      color: '#e0e0e0',
                      outline: 'none',
                      transition: 'all 0.3s ease, transform 0.2s ease'
                    }}
                    required
                  />
                  {errors.mobileNumber && (
                    <div style={{
                      color: '#ff4444',
                      fontSize: '0.7rem',
                      marginTop: '0.25rem'
                    }}>
                      {errors.mobileNumber}
                    </div>
                  )}
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: '600',
                    color: '#b0b0b0',
                    fontSize: '0.75rem',
                    marginBottom: '0.25rem'
                  }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    style={{
                      width: '100%',
                      borderRadius: '0.375rem',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.75rem',
                      backgroundColor: '#2d2d2d',
                      border: errors.emailAddress ? '1px solid #ff4444' : '1px solid #3d3d3d',
                      color: '#e0e0e0',
                      outline: 'none',
                      transition: 'all 0.3s ease, transform 0.2s ease'
                    }}
                    required
                  />
                  {errors.emailAddress && (
                    <div style={{
                      color: '#ff4444',
                      fontSize: '0.7rem',
                      marginTop: '0.25rem'
                    }}>
                      {errors.emailAddress}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div style={{ animation: 'slideUp 0.5s ease-out 0.8s both' }}>
              <h3 style={{
                fontWeight: '600',
                color: '#e0e0e0',
                fontSize: '0.875rem',
                marginBottom: '0.4rem'
              }}>
                Event Details
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1rem'
              }}>

                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: '600',
                    color: '#b0b0b0',
                    fontSize: '0.75rem',
                    marginBottom: '0.25rem'
                  }}>
                    YouTube Link *
                  </label>
                  <input
                    type="url"
                    name="youtubeLink"
                    value={formData.youtubeLink}
                    onChange={handleChange}
                    placeholder="https://youtube.com/..."
                    style={{
                      width: '100%',
                      borderRadius: '0.375rem',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.75rem',
                      backgroundColor: '#2d2d2d',
                      border: errors.youtubeLink ? '1px solid #ff4444' : '1px solid #3d3d3d',
                      color: '#e0e0e0',
                      outline: 'none',
                      transition: 'all 0.3s ease, transform 0.2s ease'
                    }}
                    required
                  />
                  {errors.youtubeLink && (
                    <div style={{
                      color: '#ff4444',
                      fontSize: '0.7rem',
                      marginTop: '0.25rem'
                    }}>
                      {errors.youtubeLink}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#22bbe0',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.875rem',
              padding: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease, transform 0.2s ease'
            }}
          >
            {loading ? 'Submitting...' : 'Complete Registration'}
          </button>
        </form>
        {error && (
          <div style={{ color: '#ff4444', textAlign: 'center', margin: '1rem 0', fontSize: '0.9rem' }}>{error}</div>
        )}
      </div>
    </>
  );
};

export default PATNRegistration;
