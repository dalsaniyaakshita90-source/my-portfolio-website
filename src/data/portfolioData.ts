import {
  BrandFoundationItem,
  ManifestoBelief,
  Chapter,
  ResearchInterest,
  ProjectL3Stage,
  ProjectL3Belief,
  CreativeItem,
  RecognitionItem
} from '../types';

export const PERSONAL_INFO = {
  name: 'Akshita Dalsaniya',
  tagline: 'Exploring. Learning. Becoming.',
  supportingText: 'Exploring life—not just my own, but the countless people, places, and perspectives that make our world extraordinary. Different people. Different places. Different experiences. Each one expanding how I see the world.',
  northStar: 'I believe the world becomes better when every human being is given the opportunity to discover, develop, and share their unique potential.',
  brandPromise: 'Everyone deserves to be heard. I may not always have the answer, but I promise to listen, to learn, and to keep searching for better solutions.',
  email: 'dalsaniyaakshita90@gmail.com',
  phone: '+91 9725433903',
  location: 'Rajkot, Gujarat, India',
  linkedin: 'https://linkedin.com/in/Akshita-dalsaniya',
  linkedinDisplay: 'linkedin.com/in/Akshita-dalsaniya',
  aboutWhoIAm: [
    "I've never wanted to master just one thing.",
    "I've always been fascinated by the world in all its forms—its people, places, cultures, ideas, and stories. Every new experience changes the way I think, and every conversation has the potential to teach me something I didn't know before.",
    "I learn because I'm curious, not because I have to.",
    "Whether it's research, languages, art, writing, sustainability, business, psychology, or something completely unfamiliar, I find joy in exploring what I don't yet understand.",
    "I don't believe life is about finding one purpose and staying there forever. I believe it's about continuing to grow, collecting perspectives, and allowing every experience to shape who we become.",
    "That's how I choose to live."
  ],
  education: {
    degree: 'Bachelor of Business Administration (BBA)',
    university: 'RK University',
    location: 'Rajkot, Gujarat, India',
    graduationYear: 'Expected 2027',
    cgpa: '8.0 / 10.0'
  },
  roles: [
    'Founder, Project L³ (Love. Laughter. Life.)',
    'Disability Inclusion & Accessibility Researcher',
    'CFA Level I Candidate (CFA Institute)',
    'International Research Scholar (HUMG Vietnam)',
    'Author & Storyteller'
  ]
};

export const BRAND_FOUNDATIONS: BrandFoundationItem[] = [
  {
    number: '01',
    title: 'Brand Purpose',
    statement: 'Potential Over Limitations',
    description: 'To use research, empathy, and innovation to build a world where every person is seen for their potential rather than their limitations.',
    icon: 'Heart',
    color: 'from-rose-500/20 to-amber-500/10'
  },
  {
    number: '02',
    title: 'Brand Mission',
    statement: 'Advance Disability Inclusion',
    description: 'To advance disability inclusion through research, innovation, and collaboration, creating opportunities where every person can participate, contribute, and thrive with dignity.',
    icon: 'Compass',
    color: 'from-amber-500/20 to-orange-500/10'
  },
  {
    number: '03',
    title: 'Brand Vision',
    statement: 'Inclusion as Foundation',
    description: 'I envision a future where inclusion is no longer an afterthought. Every policy, product, program, event, and innovation is designed with accessibility and participation in mind from the very beginning.',
    icon: 'Sparkles',
    color: 'from-blue-500/20 to-indigo-500/10'
  },
  {
    number: '04',
    title: 'Brand Values',
    statement: 'Curiosity • Empathy • Evidence • Inclusion • Integrity',
    description: 'Guiding every research inquiry, enterprise blueprint, conversation, and creative expression with authentic rigor and compassion.',
    icon: 'ShieldCheck',
    color: 'from-emerald-500/20 to-teal-500/10'
  },
  {
    number: '05',
    title: 'Brand Personality',
    statement: 'Curious • Thoughtful • Compassionate • Analytical • Creative',
    description: 'Blending analytical economic and financial frameworks with profound human empathy and unbounded artistic curiosity.',
    icon: 'Brain',
    color: 'from-purple-500/20 to-pink-500/10'
  },
  {
    number: '06',
    title: 'Brand Positioning',
    statement: 'Interdisciplinary Researcher & Social Innovator',
    description: 'Akshita Dalsaniya is an emerging interdisciplinary researcher exploring disability inclusion, sustainability, and social innovation through curiosity, evidence, and human-centered thinking. I believe knowledge is an endless universe. Every conversation, every question, and every experience offers another opportunity to understand the world a little better.',
    icon: 'Globe',
    color: 'from-cyan-500/20 to-blue-500/10'
  },
  {
    number: '07',
    title: 'Brand Promise',
    statement: 'Everyone Deserves to Be Heard',
    description: 'Everyone deserves to be heard. I may not always have the answer, but I promise to listen, to learn, and to keep searching for better solutions.',
    icon: 'Users',
    color: 'from-amber-400/20 to-yellow-500/10'
  }
];

export const PERSONAL_MANIFESTO: ManifestoBelief[] = [
  {
    id: 'people',
    topic: 'What I Believe About People',
    subtitle: 'Seeing the Unique Within Everyone',
    content: 'I believe every person carries something unique within them. Some qualities are immediately visible, while others simply need someone who believes in them enough to help them grow. Every human being deserves the opportunity to discover and develop that potential.',
    icon: 'Users',
    accent: 'border-amber-400/30'
  },
  {
    id: 'knowledge',
    topic: 'What I Believe About Knowledge',
    subtitle: 'An Endless Universe of Learning',
    content: 'Knowledge is an endless universe. Every possibility, every consequence, every success, and every failure teaches us something. Failure is not the opposite of learning—it is one of its greatest teachers. Whether we succeed or fail, both paths ultimately expand our understanding of the world. Learning never truly ends because knowledge itself has no end.',
    icon: 'Sparkles',
    accent: 'border-blue-400/30'
  },
  {
    id: 'research',
    topic: 'What I Believe About Research',
    subtitle: 'Going Deep Beneath the Ocean Surface',
    content: 'Research is like an ocean. The deeper you are willing to go, the more valuable discoveries you make. Shallow exploration often leaves us with assumptions and opinions, while deeper inquiry uncovers evidence, understanding, and truth. Every meaningful solution begins with the courage to keep exploring beyond the surface.',
    icon: 'Compass',
    accent: 'border-cyan-400/30'
  },
  {
    id: 'inclusion',
    topic: 'What I Believe About Inclusion',
    subtitle: 'Belonging in the Same World',
    content: 'Inclusion begins when we stop categorizing people before recognizing their humanity. If something is designed for human beings, then every human being should be able to participate in it, experience it, and belong within it. Inclusion is not about creating separate worlds—it is about ensuring that everyone has a place in the same one.',
    icon: 'Heart',
    accent: 'border-rose-400/30'
  },
  {
    id: 'innovation',
    topic: 'What I Believe About Innovation',
    subtitle: 'Improving Lives, Not Novelty Alone',
    content: 'Innovation is meaningful only when it improves lives. It is not about creating something new for its own sake, but about solving real problems for people, communities, and every form of life that depends on thoughtful design and compassionate action.',
    icon: 'Lightbulb',
    accent: 'border-emerald-400/30'
  },
  {
    id: 'leadership',
    topic: 'What I Believe About Leadership',
    subtitle: 'Responsibility Over Authority',
    content: 'Leadership is not about authority. It is about responsibility. A true leader cares for people as if they were their own, listens before making decisions, and works to create meaningful change rather than unnecessary challenges. Leadership is measured by the lives we improve, not the power we hold.',
    icon: 'ShieldCheck',
    accent: 'border-purple-400/30'
  },
  {
    id: 'work',
    topic: 'What I Believe About My Work',
    subtitle: 'Asking Better Questions',
    content: 'I do not aspire to have all the answers. I aspire to keep asking better questions, to keep learning, and to use what I discover to build a more inclusive world. If my work helps even one person feel seen, supported, and inspired to believe in themselves again, then I will consider that meaningful success.',
    quote: 'I want every person with a disability to feel that they are never alone—that there will always be people, systems, and communities that believe in them, stand beside them, and continue working to remove the barriers they face. Project L³ exists to help build that future.',
    icon: 'HeartHandshake',
    accent: 'border-amber-400/40'
  }
];

export const CHAPTERS_LIST: Chapter[] = [
  {
    id: 'ch-1',
    number: '01',
    badge: '🌱 The Curious Child',
    title: 'Curiosity Found Its First Playground',
    subtitle: 'School & Foundational Exploration',
    story: [
      'Long before research papers and projects, my journey began with an endless curiosity. School became a place where I explored everything I could—academics, art, competitions, public speaking, creative projects, and community initiatives.',
      'Whether it was securing top academic ranks, receiving recognition for excellence in Grade 10 & 12 board exams, participating in government-led wall painting initiatives, or representing my school through various competitions, every opportunity became another way to learn something new.',
      'Looking back, I don\'t remember these achievements as awards. I remember them as the first signs that I loved learning far beyond the classroom.'
    ],
    takeaway: 'I loved learning far beyond the classroom—every opportunity became another way to understand the world.',
    tags: ['Curiosity', 'Top Board Ranks', 'Public Wall Murals', 'Public Speaking'],
    icon: 'Sparkles'
  },
  {
    id: 'ch-2',
    number: '02',
    badge: '💡 The First Venture',
    title: 'My First Lesson in Entrepreneurship',
    subtitle: 'Co-leading The Joy Toy at Business Fair',
    story: [
      'During my higher secondary education, I co-led a business stall, The Joy Toy, at our school\'s Business Fair. Our team earned the second-highest revenue among all participating ventures and received appreciation for the creativity behind both the concept and branding.',
      'It was my first experience turning an idea into something people genuinely valued.',
      'More importantly, it taught me that creativity and business are not separate worlds—they become far more powerful when they work together.'
    ],
    takeaway: 'Creativity and business become far more powerful when they work together.',
    tags: ['The Joy Toy', '2nd Highest Revenue', 'Branding Strategy', 'Entrepreneurship'],
    icon: 'Store'
  },
  {
    id: 'ch-3',
    number: '03',
    badge: '🌏 Beyond Borders',
    title: 'Research Beyond Borders',
    subtitle: 'Sustainable Development Research in Vietnam (HUMG)',
    story: [
      'My research internship in Vietnam became much more than an academic experience. It introduced me to new cultures, perspectives, and ways of thinking. Alongside contributing to research on sustainable industrial development, I coordinated activities, immersed myself in the local culture, learned basic Vietnamese, and embraced every opportunity to understand the community beyond the classroom.',
      'The experience also opened doors to volunteer with local NGOs and institutions. Although time and travel constraints prevented me from participating, those conversations reinforced my belief that meaningful research begins by understanding people before attempting to solve problems.'
    ],
    takeaway: 'Meaningful research begins by understanding people before attempting to solve problems.',
    tags: ['HUMG Vietnam', 'Score 3.7/4.0', 'Industrial Sustainability', 'Cross-Cultural'],
    icon: 'Globe'
  },
  {
    id: 'ch-4',
    number: '04',
    badge: '❓ The Question Worth Chasing',
    title: 'When Curiosity Became a Mission',
    subtitle: 'Founding Project L³ (Love. Laughter. Life.)',
    story: [
      'Every journey has a turning point. Mine became Project L³ (Love. Laughter. Life.)',
      'It began with a simple question: Why do we still build systems that unintentionally leave some people behind?',
      'That question grew into a vision of creating a world where inclusion is considered from the very beginning rather than added later. Project L³ is my long-term social innovation initiative dedicated to exploring solutions that help build more inclusive communities through research, empathy, collaboration, and thoughtful design.',
      'This is not the destination of my journey. It is one of its most meaningful chapters.'
    ],
    takeaway: 'Why do we still build systems that unintentionally leave some people behind?',
    tags: ['Project L³', 'Disability Inclusion', 'Universal Architecture', 'Turning Point'],
    icon: 'HeartHandshake'
  },
  {
    id: 'ch-5',
    number: '05',
    badge: '✍️ Stories Yet Untold',
    title: 'Stories Beyond Research',
    subtitle: 'Authoring My Debut Fiction Novel',
    story: [
      'While research helps me understand the world, writing helps me imagine what it could become.',
      'I am currently writing my debut novel—a story that explores human emotions, relationships, growth, and the experiences that shape us. For me, storytelling is another form of exploration.',
      'It allows me to ask questions that data alone cannot answer and to connect with people through emotion as much as through evidence.'
    ],
    takeaway: 'Storytelling allows me to ask questions that data alone cannot answer.',
    tags: ['Debut Novel', 'Manuscript in Progress', 'Human Emotion', 'Storytelling'],
    icon: 'Feather'
  },
  {
    id: 'ch-6',
    number: '06',
    badge: '🚀 Becoming',
    title: 'The Chapter I\'m Living Today',
    subtitle: 'Interdisciplinary Growth, BBA & CFA Level I',
    story: [
      'Today, I continue to seek opportunities that challenge my thinking and expand my perspective. Whether through internships, research collaborations, creative projects, fellowships, or interdisciplinary learning, I actively pursue experiences that push me beyond familiar boundaries.',
      'For me, growth comes from stepping into places where there is always something new to learn.'
    ],
    takeaway: 'Growth comes from stepping into places where there is always something new to learn.',
    tags: ['BBA (CGPA 8.0/10)', 'CFA Level I Candidate', 'Leadership', 'Continuous Learning'],
    icon: 'TrendingUp'
  },
  {
    id: 'ch-7',
    number: '07',
    badge: '❤️ To Be Continued...',
    title: 'The Chapters Yet to Be Written',
    subtitle: 'The Horizon of Social Enterprise & Global Impact',
    story: [
      'The next chapters of my journey are already taking shape.',
      'I hope to publish my debut novel, bring Project L³ to life as a social enterprise, collaborate with researchers and organizations across the world, participate in international fellowships and conferences, and continue exploring cultures, ideas, and communities that challenge my perspective.',
      'I don\'t measure the future by destinations or titles. I measure it by the number of lives I understand, the perspectives I gain, and the meaningful impact I leave behind.'
    ],
    takeaway: 'I measure the future by the lives I understand, the perspectives I gain, and the impact I leave behind.',
    tags: ['Social Enterprise', 'Global Fellowships', 'Published Works', 'Lifelong Mission'],
    icon: 'Infinity'
  }
];

export const RESEARCH_INTERESTS: ResearchInterest[] = [
  {
    id: 'disability-inclusion',
    title: 'Disability Inclusion',
    description: 'Designing systems where accessibility and inclusion are considered from the very beginning rather than treated as an afterthought.',
    icon: 'Accessibility',
    color: 'from-amber-500/20 to-rose-500/10'
  },
  {
    id: 'social-innovation',
    title: 'Social Innovation',
    description: 'Exploring practical, research-driven approaches that create meaningful and lasting social impact.',
    icon: 'Zap',
    color: 'from-blue-500/20 to-indigo-500/10'
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    description: 'Understanding how environmental, social, and economic systems can work together to build resilient communities.',
    icon: 'Leaf',
    color: 'from-emerald-500/20 to-teal-500/10'
  },
  {
    id: 'human-behaviour',
    title: 'Human Behaviour',
    description: 'Exploring how people think, interact, adapt, and make decisions across different social and cultural contexts.',
    icon: 'Brain',
    color: 'from-purple-500/20 to-violet-500/10'
  },
  {
    id: 'cross-cultural',
    title: 'Cross-Cultural Studies',
    description: 'Learning from different cultures, communities, and lived experiences to broaden perspectives and encourage inclusive thinking.',
    icon: 'Globe',
    color: 'from-cyan-500/20 to-blue-500/10'
  },
  {
    id: 'creativity-storytelling',
    title: 'Creativity & Storytelling',
    description: 'Understanding how stories, art, and creativity influence emotions, behaviour, communication, and social change.',
    icon: 'BookOpen',
    color: 'from-rose-500/20 to-pink-500/10'
  }
];

export const CURRENTLY_EXPLORING_TAGS = [
  'Disability Inclusion & Accessibility',
  'Social Entrepreneurship',
  'Sustainable Development',
  'Human-Centered Design',
  'Behaviour & Psychology',
  'Creative Storytelling',
  'Community-Based Research'
];

export const PROJECT_L3_BELIEFS: ProjectL3Belief[] = [
  {
    title: 'Every Human Has Potential',
    desc: 'Every individual possesses unique strengths, perspectives, and abilities that deserve recognition and opportunity.'
  },
  {
    title: 'Research Before Assumptions',
    desc: 'The best solutions begin by listening, observing, and understanding before attempting to solve a problem.'
  },
  {
    title: 'Inclusion by Design',
    desc: 'Accessibility should never be added later. It should be considered from the very beginning.'
  },
  {
    title: 'Empathy Drives Innovation',
    desc: 'Understanding people\'s lived experiences leads to more meaningful and lasting solutions.'
  },
  {
    title: 'Collaboration Creates Change',
    desc: 'Researchers, educators, therapists, families, policymakers, businesses, and communities all play an essential role in building a more inclusive society.'
  },
  {
    title: 'Learning Never Ends',
    desc: 'Every conversation, every challenge, and every experience teaches us something new. Continuous learning is the foundation of meaningful change.'
  }
];

export const PROJECT_L3_STAGES: ProjectL3Stage[] = [
  {
    phaseNumber: '01',
    title: 'Research & Understanding',
    desc: 'Building a strong evidence-based foundation through research, conversations, and observation.'
  },
  {
    phaseNumber: '02',
    title: 'Community & Collaboration',
    desc: 'Working alongside individuals, professionals, organizations, and communities to understand real-world needs.'
  },
  {
    phaseNumber: '03',
    title: 'Solutions & Innovation',
    desc: 'Designing, testing, and improving practical solutions that promote accessibility and inclusion.'
  },
  {
    phaseNumber: '04',
    title: 'Implementation',
    desc: 'Launching initiatives, partnerships, and programs that create measurable social impact.'
  },
  {
    phaseNumber: '05',
    title: 'A More Inclusive Future',
    desc: 'Contributing towards a world where inclusion becomes a natural part of everyday life.'
  }
];

export const RECOGNITIONS_LIST: RecognitionItem[] = [
  {
    id: 'silver-queens',
    level: 'International Recognition',
    badge: '🥈 Silver Award',
    title: 'Queen\'s Commonwealth Essay Competition',
    subtitle: 'The Royal Commonwealth Society',
    story: 'Receiving the Silver Award in the internationally recognized Queen\'s Commonwealth Essay Competition was more than an achievement—it was a reminder that thoughtful ideas and meaningful storytelling can connect people across cultures and borders. It strengthened my belief that words have the power to inspire conversations, challenge perspectives, and create lasting impact.',
    icon: 'Award'
  },
  {
    id: 'rbi-quiz',
    level: 'National Recognition',
    badge: '🏦 RBI90 Quiz',
    title: 'State-Level Representative',
    subtitle: 'Reserve Bank of India (RBI)',
    story: 'Representing my city in the RBI90 Quiz, organized by the Reserve Bank of India, was an opportunity to deepen my understanding of economics, finance, and analytical thinking while competing alongside talented students from across the state. The experience reinforced my love for learning beyond the classroom.',
    icon: 'Building2'
  },
  {
    id: 'vietnam-fellowship',
    level: 'International Experience',
    badge: '🌏 Grade 3.7 / 4.0',
    title: 'Vietnam Research Internship',
    subtitle: 'Hanoi University of Mining & Geology (HUMG)',
    story: 'My international research internship in Vietnam became one of the defining milestones of my academic journey. Beyond research, it taught me the value of cultural understanding, adaptability, collaboration, and approaching global challenges with empathy and curiosity.',
    icon: 'GraduationCap'
  },
  {
    id: 'academic-excellence',
    level: 'Academic & Creative Excellence',
    badge: '🎓 Consistent Top Ranker',
    title: 'Academic Honors & Public Art Initiative',
    subtitle: 'Board Exams & Community Murals',
    story: 'Throughout my school years, I consistently ranked among the top-performing students and was recognized through numerous academic awards and merit certificates. Alongside academics, I actively participated in creative competitions, community initiatives, and public projects—including contributing to a government-supported wall painting initiative that celebrated creativity through public art. These experiences taught me that learning extends far beyond textbooks and classrooms.',
    icon: 'Trophy'
  },
  {
    id: 'lifelong-learning',
    level: 'Lifelong Learning',
    badge: '🌱 11+ Certifications',
    title: 'Continuous Multi-Disciplinary Growth',
    subtitle: 'Finance, Sign Language, Cyber Security, Inclusion',
    story: 'Curiosity has always encouraged me to explore disciplines beyond my formal education. Over the years, I have completed courses and certifications across finance, cybersecurity, Indian Sign Language (ISL), neurodiversity/learning difficulties management, data visualization, research, digital productivity, and creative tools—not simply to collect certificates, but to continuously expand my perspective. For me, learning is not an achievement. It is a lifelong habit.',
    icon: 'BookOpen'
  }
];

export const CREATIVE_EXPRESSION_DATA = {
  whyICreate: {
    title: 'Why I Create',
    desc: 'I\'ve never believed creativity belongs to a single art form. For me, creativity is simply another language. Sometimes it becomes a research idea. Sometimes it becomes a story. Sometimes it becomes a poem. Sometimes it appears as a sketch, a painting, or even the voice of a cartoon character. Every creative pursuit teaches me to observe more carefully, imagine more freely, and connect more deeply with people.',
    quote: 'Research helps me understand the world. Creativity helps me experience it.'
  },
  debutNovel: {
    title: 'My Debut Novel',
    status: 'Currently in Progress',
    desc: 'I am currently writing my first novel—a story inspired by human emotions, unexpected connections, personal growth, and the invisible moments that quietly shape our lives. Rather than simply creating characters, I hope to create people readers genuinely care about. I want every chapter to make someone laugh, reflect, question, and perhaps recognize a part of themselves they had forgotten. For me, storytelling is another way of exploring life—one emotion, one conversation, and one perspective at a time.'
  },
  poetry: {
    title: 'Poetry',
    desc: 'Poetry allows me to express emotions that often exist between words. Some poems begin with a single observation. Others emerge from memories, questions, or fleeting moments that refuse to leave my mind. For me, poetry is where thoughts become feelings, and feelings become something others can connect with.'
  },
  beyondWords: [
    'Drawing & Sketching',
    'Painting (multiple styles)',
    'Arts & Crafts',
    'Creative Design',
    'Cartoon Voice Mimicry',
    'Music & Musical Instruments',
    'Dance & Theater',
    'Creative Storytelling'
  ],
  playfulSide: {
    title: 'A Playful Side',
    desc: 'One of my favorite creative skills is cartoon voice mimicry. Whether it\'s recreating familiar animated voices or experimenting with character expressions, I enjoy exploring how voice alone can bring personality, humour, and emotion to life. It\'s a reminder that creativity doesn\'t always have to be serious—it can simply make people smile.'
  },
  creatorBecoming: {
    title: 'The Creator I\'m Becoming',
    desc: 'I don\'t aspire to master only one form of creativity. I hope to spend my life exploring many. Whether through research, books, poetry, paintings, performances, or entirely new forms I haven\'t discovered yet, I want to keep creating work that encourages people to think differently, feel deeply, and see the world with a little more curiosity.'
  },
  closingArtQuote: 'A world without art is just a mere piece of land.'
};

export const CONTACT_EXPLORING_ITEMS = [
  'Research Collaborations',
  'Disability Inclusion & Accessibility',
  'Social Innovation',
  'Sustainability',
  'International Fellowships & Conferences',
  'Speaking Opportunities',
  'Creative Collaborations',
  'Writing & Storytelling',
  'Cross-Cultural Learning',
  'Projects That Make the World a Little Better'
];

export const MANIFESTO_ITEMS = PERSONAL_MANIFESTO.map(item => ({
  id: item.id,
  topic: item.topic,
  subtitle: item.subtitle,
  content: item.content,
  quote: item.quote,
  iconName: item.icon,
  accentGlow: item.accent
}));


