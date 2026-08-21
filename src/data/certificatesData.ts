import commonwealthImg from '../../commonwealth.jpeg';
import cybersecurityImg from '../../cybersecurity.jpeg';
import islImg from '../../isl.jpeg';
import learningDifficultiesImg from '../../learning-difficulties.jpeg';
import importExportImg from '../../import-export.jpeg';
import bizvistaImg from '../../bizvista.jpeg';
import musicImg from '../../music.jpeg';
import nismImg from '../../nism.jpeg';
import researchInternshipImg from '../../research-internship.jpeg';
import rbiImg from '../../rbi.jpeg';
import wallPaintingImg from '../../wall-painting.jpeg';
export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  recipient: string;
  date: string;
  category: 'Research' | 'Disability & Inclusion' | 'Finance' | 'Creative & Arts' | 'Academic & Leadership';
  description: string;
  credentialCode?: string;
  duration?: string;
  location?: string;
  imageUrl?: string;
  externalLink?: string;
  badge?: string;
}

export const CERTIFICATES_LIST: CertificateItem[] = [
  {
    id: 'queens-silver',
    title: "Silver Award — Queen's Commonwealth Essay Competition 2025",
    issuer: 'The Royal Commonwealth Society (UK / International)',
    recipient: 'Akshita Dalsaniya',
    date: '2025',
    category: 'Creative & Arts',
    description: 'Awarded on the recommendation of international judges Sir Ben Okri OBE, Imtiaz Dharker, and Janet Cooper OBE in the world\'s oldest international schools writing competition.',
    badge: 'ROYAL SILVER CREST',
    imageUrl: commonwealthImg,
    externalLink: 'https://www.royalcwsociety.org/essay-competition'
  },
  {
    id: 'humg-vietnam',
    title: 'Certificate of Completion — International Research Internship',
    issuer: 'Hanoi University of Mining and Geology (HUMG), Vietnam',
    recipient: 'Dalsaniya Akshita Dineshbhai',
    date: 'August 30 – September 29, 2025',
    category: 'Research',
    description: 'Completed international research internship exchange in sustainable industrial development with a final grade of 3.7 / 4.0 under Rector Prof. Dr. Tran Thanh Hai.',
    badge: 'HUMG RECTOR SEAL • 3.7/4.0 GPA',
    imageUrl: researchInternshipImg,
    externalLink: 'http://humg.edu.vn/en/'
  },
  {
    id: 'isl-inclusion',
    title: 'Basic Course in Indian Sign Language (ISL) — 40 Hours',
    issuer: 'ISLRTC (Delhi) & Sri Aurobindo Society (Project Inclusion)',
    recipient: 'Ms. Akshita Dineshbhai Dalsaniya',
    date: 'August 16, 2026',
    category: 'Disability & Inclusion',
    description: 'Equipped with foundational knowledge of Indian Sign Language (ISL), promoting inclusion and effective communication for people with hearing disabilities.',
    duration: '40 Hours Course',
    badge: '40-HR ISLRTC GOVT CERTIFIED',
    imageUrl: islImg,
    externalLink: 'http://islrtc.nic.in/'
  },
  {
    id: 'rupantar-learning',
    title: 'Learning Difficulties - Understanding and Management Level: 1',
    issuer: 'Sri Aurobindo Society (Rupantar - Transforming Education)',
    recipient: 'Ms. Akshita Dineshbhai Dalsaniya',
    date: 'August 14, 2026',
    category: 'Disability & Inclusion',
    description: '7-hour intensive course on understanding neurodiversity, learning differences, and creating inclusive learning environments.',
    duration: '7 Hours Course',
    badge: 'NEURODIVERSITY & INCLUSION',
    imageUrl: learningDifficultiesImg,
    externalLink: 'https://aurosociety.org/'
  },
  {
    id: 'rbi90-quiz',
    title: 'State Level Round Certificate of Participation — RBI90 Quiz 2024',
    issuer: 'Reserve Bank of India (RBI)',
    recipient: 'Akshita Dineshbhai Dalsaniya',
    date: 'November 19, 2024',
    category: 'Finance',
    description: 'Represented School of Management, RK University, Rajkot at the prestigious State Level Round in the nationwide RBI milestone quiz.',
    badge: 'RESERVE BANK OF INDIA STATE ROUND',
    imageUrl: rbiImg,
    externalLink: 'https://www.rbi.org.in/'
  },
  {
    id: 'nism-sebi',
    title: 'Financial Literacy Course for Bharat — Certificate of Completion',
    issuer: 'National Institute of Securities Markets (NISM - SEBI)',
    recipient: 'Akshita Dalsaniya',
    date: 'November 10, 2025',
    category: 'Finance',
    description: 'Comprehensive financial literacy and securities markets capacity building initiative by SEBI.',
    badge: 'NISM SEBI FINANCIAL BHARAT',
    imageUrl: nismImg,
    externalLink: 'https://www.nism.ac.in/'
  },
  {
    id: 'cyber-security',
    title: 'Introduction to Cyber Security — Certificate of Completion',
    issuer: 'Simplilearn SkillUp',
    recipient: 'Akshita Dineshbhai Dalsaniya',
    date: 'May 29, 2025',
    category: 'Academic & Leadership',
    description: 'Demonstrated initiative and technical expertise in cyber defense and digital security frameworks.',
    credentialCode: '8403654',
    badge: 'SKILLUP ID #8403654',
    imageUrl: cybersecurityImg,
    externalLink: 'https://www.simplilearn.com/'
  },
  {
    id: 'chitranagari-art',
    title: 'Street Wall Painting Project — "CHITRANAGARI"',
    issuer: 'Rajkot Municipal Corporation & Mission Smart City Trust',
    recipient: 'Akshita Dalsaniya',
    date: 'May 7, 2017',
    category: 'Creative & Arts',
    description: 'Participated in public street wall painting at Mahila Garden Master Society to revitalize urban public spaces with community mural art.',
    badge: 'URBAN PUBLIC MURAL RECOGNITION',
    imageUrl: wallPaintingImg,
    externalLink: 'https://www.rmc.gov.in/'
  },
  {
    id: 'bizvista-rku',
    title: 'Certificate of Appreciation — BizVista 2025 Annual Management Fest',
    issuer: 'School of Management, RK University',
    recipient: 'Akshita',
    date: 'January 25, 2025',
    category: 'Academic & Leadership',
    description: 'Outstanding contribution as a volunteer coordinator in the annual university management fest.',
    badge: 'UNIVERSITY FEST LEADERSHIP',
    imageUrl: bizvistaImg,
    externalLink: 'https://rku.ac.in/'
  },
  {
    id: 'music-guitar',
    title: 'Sangeet Praveshika Pratham (Guitar Vadan) — Musical Distinction',
    issuer: 'Gandharv Mahavidyalaya Mandal (Ahmedabad) & Gujarat Sangeet Samiti',
    recipient: 'Akshita Dineshbhai Dalsaniya',
    date: 'May 2020',
    category: 'Creative & Arts',
    description: 'Passed classical instrument certification in acoustic guitar performance and classical raagas.',
    badge: 'CLASSICAL GUITAR CERTIFIED',
    imageUrl: musicImg,
    externalLink: 'https://abgmvm.org/'
  },
  {
    id: 'exim-export',
    title: 'Export-Import Vocational Training Program (30 Sessions)',
    issuer: 'Global Exim Services Vocational Training Institute',
    recipient: 'Akshita Dineshbhai Dalsaniya',
    date: 'July 5, 2026',
    category: 'Finance',
    description: 'Completed 30 comprehensive sessions covering international trade, documentation, customs tariffs, and foreign trade logistics.',
    badge: '30-SESSION INTERNATIONAL TRADE',
    imageUrl: importExportImg,
    externalLink: 'https://globalexim.in/'
  }
];
