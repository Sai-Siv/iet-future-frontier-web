export type QuestionType = 'Short Answer' | 'Paragraph' | 'Multiple Choice' | 'Dropdown' | 'Checkboxes' | 'File Upload';

export interface Option {
  value: string;
}

export interface Question {
  id: number | string;
  title: string;
  type: QuestionType;
  required: boolean;
  options?: Option[];
}

export interface AwardCategory {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export const generalInformation: Question[] = [
  { id: 1508358313, title: "Name", type: 'Short Answer', required: false },
  { id: 6064807, title: "Email Address", type: 'Short Answer', required: false },
  { id: 62587424, title: "State", type: 'Short Answer', required: false },
  { id: 952420036, title: "Mobile Number(WhatsApp)", type: 'Short Answer', required: false },
  { id: 384312110, title: "University/College/Organization Name", type: 'Short Answer', required: false },
  { id: 1622581677, title: "Are you Currently Member of IET ?", type: 'Multiple Choice', required: false, options: [{ value: "Yes" }, { value: "No" }] },
  { id: 1608733035, title: "If Yes, Provide Your IET Membership Number If No, NA", type: 'Short Answer', required: false },
  { id: 1063768476, title: "Category", type: 'Dropdown', required: false, options: [{ value: "Student" }, { value: "Professional" }] },
];

export const studentAwards: AwardCategory[] = [
  {
    id: 'OutstandingAcademicPerformance',
    title: "Outstanding Academic Performance",
    description: "This award recognizes students who have demonstrated exceptional academic excellence through consistently high grades, achievements in competitive exams, and contributions to research or scholarly activities. Candidates should have a strong academic record, evidence of intellectual curiosity, and a commitment to continuous learning.  \nKindly upload all the documents required or else the response is not validated.",
    questions: [
      { id: 73441768, title: "What is your current CGPA?", type: 'Short Answer', required: false },
      { id: 1137808243, title: "Kindly Provide Documentary Proof", type: 'File Upload', required: false },
      { id: 1288122037, title: "List any scholarships, academic honors, or competitive exams you have received/excelled in.", type: 'Paragraph', required: false },
      { id: 2119154875, title: "Kindly Provide Documentary Proof", type: 'File Upload', required: false },
      { id: 963333536, title: "Have you published any research papers, patents, or technical reports?", type: 'Multiple Choice', required: false, options: [{ value: "Yes" }, { value: "No" }] },
      { id: 75216796, title: "If Yes Provide Details.", type: 'Paragraph', required: false },
      { id: 33858741, title: "If Yes, Kindly Provide Documentary Proof", type: 'File Upload', required: false },
      { id: 2124093635, title: "How do you plan to apply your academic excellence to create a positive impact in your field?", type: 'Paragraph', required: false },
    ]
  },
  {
    id: 'NextGenInnovatorAward',
    title: "NextGen Innovator Award",
    description: "This award honors students who have showcased outstanding creativity and innovation in technology, engineering, or science. Whether through groundbreaking research, startups, patents, or unique solutions to real-world problems, recipients of this award are the future pioneers of their industries.\nKindly upload all the documents required or else the response is not validated.",
    questions: [
      { id: 208609693, title: "Describe your most innovative project or research work and its impact.", type: 'Paragraph', required: false },
      { id: 314542377, title: "Kindly Provide Documentary Proof", type: 'File Upload', required: false },
      { id: 648108795, title: "What inspired you to work on this innovation?", type: 'Paragraph', required: false },
      { id: 669067997, title: "Have you participated in hackathons, startup competitions, or filed patents?", type: 'Multiple Choice', required: false, options: [{ value: "Yes" }, { value: "No" }] },
      { id: 1965485975, title: "If Yes, Provide details.", type: 'Paragraph', required: false },
      { id: 269701494, title: "If Yes, Kindly Provide Documentary Proof", type: 'File Upload', required: false },
      { id: 1724886471, title: "How does your innovation contribute to solving real-world problems?", type: 'Paragraph', required: false },
    ]
  },
  {
    id: 'EcoExcellenceAward',
    title: "Eco Excellence Award",
    description: "This award is dedicated to students who have made significant contributions to environmental sustainability. Whether through projects focused on clean energy, waste management, conservation efforts, or spreading awareness about climate change, this award recognizes those taking proactive steps toward a greener future. \nKindly upload all the documents required or else the response is not validated.",
    questions: [
      { id: 890941962, title: "Describe an eco-friendly project or sustainability initiative you have worked on.", type: 'Paragraph', required: false },
      { id: 707174403, title: "Kindly Provide Documentary Proof", type: 'File Upload', required: false },
      { id: 548653631, title: "How has your work contributed to environmental conservation or awareness?", type: 'Paragraph', required: false },
      { id: 1325267510, title: "Have you implemented any green practices in your school, college, or community?", type: 'Multiple Choice', required: false, options: [{ value: "Yes" }, { value: "No" }] },
      { id: 515156987, title: "If Yes, Provide Details.", type: 'Paragraph', required: false },
      { id: 1299169826, title: "If Yes, Kindly Provide Documentary Proof", type: 'File Upload', required: false },
      { id: 1156266551, title: "What are the biggest challenges in promoting sustainability, and how did you overcome them?", type: 'Paragraph', required: false },
    ]
  },
  {
    id: 'CommunityImpactAward',
    title: "Community Impact Award",
    description: "This award celebrates students who have made a meaningful difference in their communities through social initiatives, volunteering, and leadership in impactful causes. Candidates should demonstrate a strong commitment to social change, inclusivity, and empowering others through their work.\nKindly upload all the documents required or else the response is not validated",
    questions: [
      { id: 541325189, title: "Describe a community service project or initiative you have led or participated in.", type: 'Paragraph', required: false },
      { id: 173981884, title: "Kindly Provide Documentary Proof", type: 'File Upload', required: false },
      { id: 701863666, title: "What was the biggest challenge you faced in your community project, and how did you overcome it?", type: 'Paragraph', required: false },
      { id: 1862866592, title: "How has your work made a difference in people’s lives?", type: 'Paragraph', required: false },
      { id: 1767901583, title: "How has your work made a difference in people’s lives?", type: 'Paragraph', required: false },
      { id: 1366618577, title: "Have you collaborated with any NGOs, social organizations, or student groups for a cause?", type: 'Multiple Choice', required: false, options: [{ value: "Yes" }, { value: "No" }] },
      { id: 28195408, title: "If Yes, Provide Details.", type: 'Paragraph', required: false },
      { id: 46190289, title: "If Yes, Kindly Provide Documentary Proof", type: 'File Upload', required: false },
    ]
  },
  {
    id: 'WomeninTechStudentAward',
    title: "Women in Tech Student Award",
    description: "The Women in Tech Student Award recognizes outstanding female students who demonstrate excellence, innovation, and leadership in the field of technology. This award celebrates students who have contributed to the advancement of technology through academic achievements, projects, research, community engagement, or entrepreneurial initiatives. The goal is to empower and inspire the next generation of women in technology.",
    questions: [
      { id: 75015718, title: "Describe your most significant contribution, project, or achievement in the field of technology.", type: 'Paragraph', required: false },
      { id: 145423628, title: "How have you inspired, supported, or contributed to empowering women in technology or STEM?", type: 'Paragraph', required: false },
      { id: 730182611, title: "What are your future goals in technology, and how do you plan to create an impact in your community or industry?", type: 'Paragraph', required: false },
      { id: 1271286378, title: "Please upload documentary proof of your achievements (e.g., certificates, project links, GitHub, publications).", type: 'File Upload', required: false },
    ]
  },
  {
    id: 'OnCampusLeadershipAward',
    title: "On-Campus Leadership Award",
    description: "The On-Campus Leadership Award recognizes students who have demonstrated exceptional leadership within their college/university community. This award celebrates individuals who have positively influenced their peers, initiated impactful activities, and shown resilience in overcoming challenges while fostering collaboration and growth on campus.",
    questions: [
      { id: 281604449, title: "Describe a leadership role you have taken on campus and the impact you created through it.", type: 'Paragraph', required: false },
      { id: 579123950, title: "How have you inspired, motivated, or supported fellow students through your leadership?", type: 'Paragraph', required: false },
      { id: 1994225382, title: "What challenges did you face as a student leader, and how did you overcome them?", type: 'Paragraph', required: false },
      { id: 94292933, title: "Please upload documentary proof of your leadership achievements (e.g., certificates, event photos, appreciation letters)", type: 'File Upload', required: false },
    ]
  },
  {
    id: 'YoungResearcherAward',
    title: "Young Researcher Award",
    description: "The Young Researcher Award recognizes students who have demonstrated excellence in research through innovative projects, publications, or significant contributions in their field of study. This award honors curiosity, critical thinking, and a commitment to advancing knowledge while inspiring peers and the academic community.",
    questions: [
      { id: 2007791282, title: "Describe your most significant research project or contribution and its impact.", type: 'Paragraph', required: false },
      { id: 1966296737, title: "What motivated you to pursue this research, and what challenges did you overcome in the process?", type: 'Paragraph', required: false },
      { id: 1566857152, title: "How do you see your research contributing to your field or benefiting society in the future?", type: 'Paragraph', required: false },
      { id: 2001614304, title: "Please upload documentary proof of your research achievements (e.g., published papers, project reports, patents, conference presentations, awards).", type: 'File Upload', required: false },
    ]
  },
];

export const professionalAwards: AwardCategory[] = [
  {
    id: 'WomanEngineeroftheYear',
    title: "Woman Engineer of the Year",
    description: "This award honors an outstanding woman engineer who has demonstrated excellence in her field, made significant contributions to engineering and technology, and served as a role model for aspiring female professionals. The recipient should exhibit technical expertise, leadership, and dedication to advancing women in STEM.\nKindly upload all the documents required or else the response is not validated",
    questions: [
      { id: 95028577, title: "Describe a major engineering project you contributed to and its impact.", type: 'Paragraph', required: false },
      { id: 2130418524, title: "Kindly Provide Documentary Proof", type: 'File Upload', required: false },
      { id: 367988032, title: "How have you inspired or mentored the next generation of engineers?", type: 'Paragraph', required: false },
      { id: 72697810, title: "Have you received any awards, patents, or industry recognitions?", type: 'Multiple Choice', required: false, options: [{ value: "Yes" }, { value: "No" }] },
      { id: 1481904679, title: "If Yes, Provide details.", type: 'Paragraph', required: false },
      { id: 1997487958, title: "If Yes, Kindly Provide Documentary Proof", type: 'File Upload', required: false },
      { id: 2068637400, title: "How do you plan to continue driving innovation and leadership in your field?", type: 'Paragraph', required: false },
    ]
  },
  {
    id: 'MenEngineeroftheYear',
    title: "Men Engineer of the Year",
    description: "This award recognizes a male engineer who has made remarkable contributions to the field of engineering. The recipient should be an innovator, leader, or technical expert who has driven impactful projects, mentored young engineers, and played a key role in advancing engineering excellence.  \nKindly upload all the documents required or else the response is not validated",
    questions: [
      { id: 810746546, title: "Describe a major engineering project you contributed to and its impact.", type: 'Paragraph', required: false },
      { id: 618030797, title: "Kindly Provide Documentary Proof", type: 'File Upload', required: false },
      { id: 1912886278, title: "How have you inspired or mentored the next generation of engineers?", type: 'Paragraph', required: false },
      { id: 1552596311, title: "Have you received any awards, patents, or industry recognitions?", type: 'Multiple Choice', required: false, options: [{ value: "Yes" }, { value: "No" }] },
      { id: 1458866693, title: "If Yes, Provide details.", type: 'Paragraph', required: false },
      { id: 60824256, title: "If Yes, Kindly Provide Documentary Proof", type: 'File Upload', required: false },
      { id: 312929785, title: "How do you plan to continue driving innovation and leadership in your field?", type: 'Paragraph', required: false },
    ]
  },
  {
    id: 'YoungProfessionalExcellenceAward',
    title: "Young Professional Excellence Award",
    description: "This award celebrates early-career professionals who have demonstrated outstanding achievements, leadership potential, and significant contributions to their industry. Whether through technical innovations, impactful projects, or mentorship, this award highlights the rising stars of engineering and technology.  \nKindly upload all the documents required or else the response is not validated",
    questions: [
      { id: 702753243, title: "What are your notable achievements in your career so far?", type: 'Paragraph', required: false },
      { id: 454915217, title: "Kindly Provide Documentary Proof", type: 'File Upload', required: false },
      { id: 575456696, title: "How have you contributed to the advancement of your field or industry?", type: 'Paragraph', required: false },
      { id: 1839850221, title: "How do you balance technical expertise and leadership in your career?", type: 'Paragraph', required: false },
      { id: 829513505, title: "What is one groundbreaking idea or solution you have implemented at work?", type: 'Paragraph', required: false },
    ]
  },
  {
    id: 'ResearchExcellenceAward',
    title: "Research Excellence Award",
    description: "The Research Excellence Award honors professionals who have demonstrated outstanding achievements in research, contributing significantly to their field, advancing knowledge, and creating meaningful impact through innovation, publications, patents, or applied solutions. This award recognizes dedication, originality, and excellence in professional research practice.",
    questions: [
      { id: 1145795885, title: "Describe your most impactful research contribution and its significance in your field or industry.", type: 'Paragraph', required: false },
      { id: 315781368, title: "How has your research created value or impact (academic, industrial, or societal)?", type: 'Paragraph', required: false },
      { id: 1857779575, title: "What innovative methods, approaches, or solutions have you introduced in your research?", type: 'Paragraph', required: false },
      { id: 885379897, title: "Please upload documentary proof of your research excellence (e.g., published papers, patents, citations, awards).", type: 'File Upload', required: false },
    ]
  },
  {
    id: 'ExcellenceinEngineeringEducationAward',
    title: "Excellence in Engineering Education Award",
    description: "The Excellence in Engineering Education Award recognizes educators who have demonstrated outstanding commitment to teaching, innovation in pedagogy, and mentorship in the field of engineering. This award celebrates individuals who have inspired students, advanced engineering education, and contributed significantly to the academic community through impactful teaching and leadership.",
    questions: [
      { id: 1220241753, title: "Describe your most impactful contribution to engineering education (e.g., teaching innovation, curriculum development, or student mentorship).", type: 'Paragraph', required: false },
      { id: 273174456, title: "Kindly Provide Documentary Proof", type: 'File Upload', required: false },
      { id: 1737075198, title: "How have you inspired and motivated students to pursue excellence in engineering and research?", type: 'Paragraph', required: false },
      { id: 969580402, title: "Please upload documentary proof of your contributions", type: 'File Upload', required: false },
      { id: 2056115466, title: "What challenges have you faced in engineering education, and how did you overcome them to ensure student success?", type: 'Paragraph', required: false },
    ]
  },
  {
    id: 'OutstandingAcademicLeadershipAward',
    title: "Outstanding Academic Leadership Award",
    description: "The Outstanding Academic Leadership Award recognizes individuals who have demonstrated exceptional leadership in academia through vision, innovation, and impactful contributions to their institution or the academic community. This award honors leaders who have inspired excellence, driven positive change, and created opportunities for growth in education and research.",
    questions: [
      { id: 1610507684, title: "Describe your most significant leadership role in academia and the positive changes you brought through it.", type: 'Paragraph', required: false },
      { id: 668907860, title: "How have you inspired faculty, staff, or students to achieve excellence under your leadership?", type: 'Paragraph', required: false },
      { id: 493083001, title: "What innovative initiatives, policies, or programs have you introduced that strengthened your institution or academic community?", type: 'Paragraph', required: false },
      { id: 1829202066, title: "Please upload documentary proof of your leadership achievements", type: 'File Upload', required: false },
    ]
  },
  {
    id: 'ProfessionalExcellenceinAcademiaAward',
    title: "Professional Excellence in Academia Award",
    description: "The Professional Excellence in Academia Award honors faculty members who have demonstrated outstanding contributions in teaching, research, mentorship, and institutional service. This award recognizes individuals who exemplify academic professionalism, inspire students and colleagues, and advance the mission of higher education through dedication and impact.",
    questions: [
      { id: 393507030, title: "Describe your most significant contribution to academia (in teaching, research, or institutional development)", type: 'Paragraph', required: false },
      { id: 947554772, title: "Kindly Provide Documentary Proof", type: 'File Upload', required: false },
      { id: 1362765951, title: "How have you inspired and mentored students or colleagues in their academic and professional growth?", type: 'Paragraph', required: false },
      { id: 1585803810, title: "Please upload documentary proof of your academic excellence", type: 'File Upload', required: false },
      { id: 1747960408, title: "What innovative practices, research, or initiatives have you implemented to enhance academic excellence?", type: 'Paragraph', required: false },
    ]
  },
];
