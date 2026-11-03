// The award application questions, used to save each answer with its question.
// Keep in step with src/data/awardsData.ts on the website; backend/tests/api.test.js fails if they differ.

export const GENERAL_QUESTIONS = [
  {
    "id": "1508358313",
    "title": "Name",
    "type": "Short Answer"
  },
  {
    "id": "6064807",
    "title": "Email Address",
    "type": "Short Answer"
  },
  {
    "id": "62587424",
    "title": "State",
    "type": "Short Answer"
  },
  {
    "id": "952420036",
    "title": "Mobile Number(WhatsApp)",
    "type": "Short Answer"
  },
  {
    "id": "384312110",
    "title": "University/College/Organization Name",
    "type": "Short Answer"
  },
  {
    "id": "1622581677",
    "title": "Are you Currently Member of IET ?",
    "type": "Multiple Choice"
  },
  {
    "id": "1608733035",
    "title": "If Yes, Provide Your IET Membership Number If No, NA",
    "type": "Short Answer"
  },
  {
    "id": "1063768476",
    "title": "Category",
    "type": "Dropdown"
  }
];

export const STUDENT_AWARDS = [
  {
    "title": "Outstanding Academic Performance",
    "questions": [
      {
        "id": "73441768",
        "title": "What is your current CGPA?",
        "type": "Short Answer"
      },
      {
        "id": "1137808243",
        "title": "Kindly Provide Documentary Proof",
        "type": "File Upload"
      },
      {
        "id": "1288122037",
        "title": "List any scholarships, academic honors, or competitive exams you have received/excelled in.",
        "type": "Paragraph"
      },
      {
        "id": "2119154875",
        "title": "Kindly Provide Documentary Proof",
        "type": "File Upload"
      },
      {
        "id": "963333536",
        "title": "Have you published any research papers, patents, or technical reports?",
        "type": "Multiple Choice"
      },
      {
        "id": "75216796",
        "title": "If Yes Provide Details.",
        "type": "Paragraph"
      },
      {
        "id": "33858741",
        "title": "If Yes, Kindly Provide Documentary Proof",
        "type": "File Upload"
      },
      {
        "id": "2124093635",
        "title": "How do you plan to apply your academic excellence to create a positive impact in your field?",
        "type": "Paragraph"
      }
    ]
  },
  {
    "title": "NextGen Innovator Award",
    "questions": [
      {
        "id": "208609693",
        "title": "Describe your most innovative project or research work and its impact.",
        "type": "Paragraph"
      },
      {
        "id": "314542377",
        "title": "Kindly Provide Documentary Proof",
        "type": "File Upload"
      },
      {
        "id": "648108795",
        "title": "What inspired you to work on this innovation?",
        "type": "Paragraph"
      },
      {
        "id": "669067997",
        "title": "Have you participated in hackathons, startup competitions, or filed patents?",
        "type": "Multiple Choice"
      },
      {
        "id": "1965485975",
        "title": "If Yes, Provide details.",
        "type": "Paragraph"
      },
      {
        "id": "269701494",
        "title": "If Yes, Kindly Provide Documentary Proof",
        "type": "File Upload"
      },
      {
        "id": "1724886471",
        "title": "How does your innovation contribute to solving real-world problems?",
        "type": "Paragraph"
      }
    ]
  },
  {
    "title": "Eco Excellence Award",
    "questions": [
      {
        "id": "890941962",
        "title": "Describe an eco-friendly project or sustainability initiative you have worked on.",
        "type": "Paragraph"
      },
      {
        "id": "707174403",
        "title": "Kindly Provide Documentary Proof",
        "type": "File Upload"
      },
      {
        "id": "548653631",
        "title": "How has your work contributed to environmental conservation or awareness?",
        "type": "Paragraph"
      },
      {
        "id": "1325267510",
        "title": "Have you implemented any green practices in your school, college, or community?",
        "type": "Multiple Choice"
      },
      {
        "id": "515156987",
        "title": "If Yes, Provide Details.",
        "type": "Paragraph"
      },
      {
        "id": "1299169826",
        "title": "If Yes, Kindly Provide Documentary Proof",
        "type": "File Upload"
      },
      {
        "id": "1156266551",
        "title": "What are the biggest challenges in promoting sustainability, and how did you overcome them?",
        "type": "Paragraph"
      }
    ]
  },
  {
    "title": "Community Impact Award",
    "questions": [
      {
        "id": "541325189",
        "title": "Describe a community service project or initiative you have led or participated in.",
        "type": "Paragraph"
      },
      {
        "id": "173981884",
        "title": "Kindly Provide Documentary Proof",
        "type": "File Upload"
      },
      {
        "id": "701863666",
        "title": "What was the biggest challenge you faced in your community project, and how did you overcome it?",
        "type": "Paragraph"
      },
      {
        "id": "1862866592",
        "title": "How has your work made a difference in people’s lives?",
        "type": "Paragraph"
      },
      {
        "id": "1767901583",
        "title": "How has your work made a difference in people’s lives?",
        "type": "Paragraph"
      },
      {
        "id": "1366618577",
        "title": "Have you collaborated with any NGOs, social organizations, or student groups for a cause?",
        "type": "Multiple Choice"
      },
      {
        "id": "28195408",
        "title": "If Yes, Provide Details.",
        "type": "Paragraph"
      },
      {
        "id": "46190289",
        "title": "If Yes, Kindly Provide Documentary Proof",
        "type": "File Upload"
      }
    ]
  },
  {
    "title": "Women in Tech Student Award",
    "questions": [
      {
        "id": "75015718",
        "title": "Describe your most significant contribution, project, or achievement in the field of technology.",
        "type": "Paragraph"
      },
      {
        "id": "145423628",
        "title": "How have you inspired, supported, or contributed to empowering women in technology or STEM?",
        "type": "Paragraph"
      },
      {
        "id": "730182611",
        "title": "What are your future goals in technology, and how do you plan to create an impact in your community or industry?",
        "type": "Paragraph"
      },
      {
        "id": "1271286378",
        "title": "Please upload documentary proof of your achievements (e.g., certificates, project links, GitHub, publications).",
        "type": "File Upload"
      }
    ]
  },
  {
    "title": "On-Campus Leadership Award",
    "questions": [
      {
        "id": "281604449",
        "title": "Describe a leadership role you have taken on campus and the impact you created through it.",
        "type": "Paragraph"
      },
      {
        "id": "579123950",
        "title": "How have you inspired, motivated, or supported fellow students through your leadership?",
        "type": "Paragraph"
      },
      {
        "id": "1994225382",
        "title": "What challenges did you face as a student leader, and how did you overcome them?",
        "type": "Paragraph"
      },
      {
        "id": "94292933",
        "title": "Please upload documentary proof of your leadership achievements (e.g., certificates, event photos, appreciation letters)",
        "type": "File Upload"
      }
    ]
  },
  {
    "title": "Young Researcher Award",
    "questions": [
      {
        "id": "2007791282",
        "title": "Describe your most significant research project or contribution and its impact.",
        "type": "Paragraph"
      },
      {
        "id": "1966296737",
        "title": "What motivated you to pursue this research, and what challenges did you overcome in the process?",
        "type": "Paragraph"
      },
      {
        "id": "1566857152",
        "title": "How do you see your research contributing to your field or benefiting society in the future?",
        "type": "Paragraph"
      },
      {
        "id": "2001614304",
        "title": "Please upload documentary proof of your research achievements (e.g., published papers, project reports, patents, conference presentations, awards).",
        "type": "File Upload"
      }
    ]
  }
];

export const PROFESSIONAL_AWARDS = [
  {
    "title": "Woman Engineer of the Year",
    "questions": [
      {
        "id": "95028577",
        "title": "Describe a major engineering project you contributed to and its impact.",
        "type": "Paragraph"
      },
      {
        "id": "2130418524",
        "title": "Kindly Provide Documentary Proof",
        "type": "File Upload"
      },
      {
        "id": "367988032",
        "title": "How have you inspired or mentored the next generation of engineers?",
        "type": "Paragraph"
      },
      {
        "id": "72697810",
        "title": "Have you received any awards, patents, or industry recognitions?",
        "type": "Multiple Choice"
      },
      {
        "id": "1481904679",
        "title": "If Yes, Provide details.",
        "type": "Paragraph"
      },
      {
        "id": "1997487958",
        "title": "If Yes, Kindly Provide Documentary Proof",
        "type": "File Upload"
      },
      {
        "id": "2068637400",
        "title": "How do you plan to continue driving innovation and leadership in your field?",
        "type": "Paragraph"
      }
    ]
  },
  {
    "title": "Men Engineer of the Year",
    "questions": [
      {
        "id": "810746546",
        "title": "Describe a major engineering project you contributed to and its impact.",
        "type": "Paragraph"
      },
      {
        "id": "618030797",
        "title": "Kindly Provide Documentary Proof",
        "type": "File Upload"
      },
      {
        "id": "1912886278",
        "title": "How have you inspired or mentored the next generation of engineers?",
        "type": "Paragraph"
      },
      {
        "id": "1552596311",
        "title": "Have you received any awards, patents, or industry recognitions?",
        "type": "Multiple Choice"
      },
      {
        "id": "1458866693",
        "title": "If Yes, Provide details.",
        "type": "Paragraph"
      },
      {
        "id": "60824256",
        "title": "If Yes, Kindly Provide Documentary Proof",
        "type": "File Upload"
      },
      {
        "id": "312929785",
        "title": "How do you plan to continue driving innovation and leadership in your field?",
        "type": "Paragraph"
      }
    ]
  },
  {
    "title": "Young Professional Excellence Award",
    "questions": [
      {
        "id": "702753243",
        "title": "What are your notable achievements in your career so far?",
        "type": "Paragraph"
      },
      {
        "id": "454915217",
        "title": "Kindly Provide Documentary Proof",
        "type": "File Upload"
      },
      {
        "id": "575456696",
        "title": "How have you contributed to the advancement of your field or industry?",
        "type": "Paragraph"
      },
      {
        "id": "1839850221",
        "title": "How do you balance technical expertise and leadership in your career?",
        "type": "Paragraph"
      },
      {
        "id": "829513505",
        "title": "What is one groundbreaking idea or solution you have implemented at work?",
        "type": "Paragraph"
      }
    ]
  },
  {
    "title": "Research Excellence Award",
    "questions": [
      {
        "id": "1145795885",
        "title": "Describe your most impactful research contribution and its significance in your field or industry.",
        "type": "Paragraph"
      },
      {
        "id": "315781368",
        "title": "How has your research created value or impact (academic, industrial, or societal)?",
        "type": "Paragraph"
      },
      {
        "id": "1857779575",
        "title": "What innovative methods, approaches, or solutions have you introduced in your research?",
        "type": "Paragraph"
      },
      {
        "id": "885379897",
        "title": "Please upload documentary proof of your research excellence (e.g., published papers, patents, citations, awards).",
        "type": "File Upload"
      }
    ]
  },
  {
    "title": "Excellence in Engineering Education Award",
    "questions": [
      {
        "id": "1220241753",
        "title": "Describe your most impactful contribution to engineering education (e.g., teaching innovation, curriculum development, or student mentorship).",
        "type": "Paragraph"
      },
      {
        "id": "273174456",
        "title": "Kindly Provide Documentary Proof",
        "type": "File Upload"
      },
      {
        "id": "1737075198",
        "title": "How have you inspired and motivated students to pursue excellence in engineering and research?",
        "type": "Paragraph"
      },
      {
        "id": "969580402",
        "title": "Please upload documentary proof of your contributions",
        "type": "File Upload"
      },
      {
        "id": "2056115466",
        "title": "What challenges have you faced in engineering education, and how did you overcome them to ensure student success?",
        "type": "Paragraph"
      }
    ]
  },
  {
    "title": "Outstanding Academic Leadership Award",
    "questions": [
      {
        "id": "1610507684",
        "title": "Describe your most significant leadership role in academia and the positive changes you brought through it.",
        "type": "Paragraph"
      },
      {
        "id": "668907860",
        "title": "How have you inspired faculty, staff, or students to achieve excellence under your leadership?",
        "type": "Paragraph"
      },
      {
        "id": "493083001",
        "title": "What innovative initiatives, policies, or programs have you introduced that strengthened your institution or academic community?",
        "type": "Paragraph"
      },
      {
        "id": "1829202066",
        "title": "Please upload documentary proof of your leadership achievements",
        "type": "File Upload"
      }
    ]
  },
  {
    "title": "Professional Excellence in Academia Award",
    "questions": [
      {
        "id": "393507030",
        "title": "Describe your most significant contribution to academia (in teaching, research, or institutional development)",
        "type": "Paragraph"
      },
      {
        "id": "947554772",
        "title": "Kindly Provide Documentary Proof",
        "type": "File Upload"
      },
      {
        "id": "1362765951",
        "title": "How have you inspired and mentored students or colleagues in their academic and professional growth?",
        "type": "Paragraph"
      },
      {
        "id": "1585803810",
        "title": "Please upload documentary proof of your academic excellence",
        "type": "File Upload"
      },
      {
        "id": "1747960408",
        "title": "What innovative practices, research, or initiatives have you implemented to enhance academic excellence?",
        "type": "Paragraph"
      }
    ]
  }
];
