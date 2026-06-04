export const profile = {
  name: 'Rachel Dsouza',
  title: 'Full-Stack Web Developer',
  tagline: 'Building beautiful web experiences',
  summary:
    "5+ years crafting responsive, accessible web applications across healthcare, enterprise, and education with a passion for performance and clean code.",
  email: 'dsouzarachel64@gmail.com',
  phone: '848-391-8742',
  linkedin: 'https://www.linkedin.com/in/dsouzarachel64',   
  github: 'https://github.com/Racheldsouza3995',       
  portfolio: 'https://rachel-dsouza.vercel.app', // 
}

export const about = {
  bio: [
    "I'm <strong>Rachel Dsouza</strong>, a results-driven front-end and web developer with 5+ years of experience building responsive, accessible web applications using <strong>React.js, Next.js, TypeScript,</strong> and <strong>CSS3</strong>.",
    "I've worked across healthcare, enterprise, and education platforms — most recently as a Junior Developer at <strong>Verizon</strong>, where I maintain a Drupal CMS serving 300+ internal users.",
    "I hold a <strong>Master of Science in Information Technology</strong> from Montclair State University and am passionate about marrying great design with rock-solid performance.",
  ],
  highlights: [
    { label: 'Education',   value: 'M.S. Information Technology — Montclair State University (2022–2024)' },
    { label: 'Currently',   value: 'Junior Developer, Communications @ Verizon — NJ (Sept 2024–Present)' },
    { label: 'Strengths',   value: 'Accessibility (WCAG/ADA), CMS Administration, SEO Optimization, Agile/Scrum' },
  ],
}

export const skillGroups = [
  {
    label: 'Languages',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'C#', 'Python', 'SQL'],
  },
  {
    label: 'Frontend',
    tags: ['React.js', 'Next.js', 'Bootstrap', 'SASS/SCSS', 'jQuery', 'Responsive Design'],
  },
  {
    label: 'Backend & APIs',
    tags: ['Node.js', 'REST APIs', 'ASP.NET MVC'],
  },
  {
    label: 'CMS',
    tags: ['Drupal', 'WordPress', 'Umbraco', 'Payload CMS', 'Elementor', 'Wix'],
  },
  {
    label: 'Cloud & DevOps',
    tags: ['Azure', 'Google Cloud Platform', 'CI/CD', 'Git', 'GitHub'],
  },
  {
    label: 'Design & Tools',
    tags: ['Figma', 'Adobe Photoshop', 'Illustrator', 'Jira', 'Agile/Scrum'],
  },
]

export const experience = [
  {
    period: 'Sept 2024 — Present',
    company: 'Verizon',
    location: 'NJ',
    role: 'Junior Developer, Communications',
    bullets: [
      'Maintained 99% uptime for an enterprise Drupal CMS serving 300+ internal users.',
      'Managed content across Drupal UAT and Production environments with SEO-optimized copy and accessibility compliance.',
      'Published weekly updates for News and About Us pages, sustaining a 15% boost in returning visitors.',
      'Integrated modern UI/UX practices using Figma and AI-powered design tools.',
    ],
  },
  {
    period: 'Sept 2024 — May 2025',
    company: 'Montclair State University',
    location: 'Montclair, NJ',
    role: 'Professional Tutor',
    bullets: [
      'Tutored Data Mining, Computer Security, and Introduction to Data Science.',
      'Evaluated 150+ student assignments, driving a 25% improvement in average performance.',
    ],
  },
  {
    period: 'July 2024 — Sept 2024',
    company: 'Rebecca Everlene Trust Company',
    location: 'Chicago, IL (Volunteer)',
    role: 'Web Developer',
    bullets: [
      'Developed the MEDKids educational app using WordPress for 500+ children and educators.',
      'Achieved 100% mobile compatibility using HTML, CSS, JavaScript, and Bootstrap.',
      'Maintained 99% uptime with regular ADA/WCAG compliance audits.',
    ],
  },
  {
    period: 'Sept 2022 — May 2024',
    company: 'Montclair State University',
    location: 'Montclair, NJ',
    role: 'Web Developer (Graduate Intern)',
    bullets: [
      'Managed the CS Education Hub website with consistent updates and security patches for 100+ educators.',
      'Improved resource discoverability by 30% by reorganizing a digital teaching repository.',
    ],
  },
  {
    period: 'June 2021 — Aug 2022',
    company: 'Impelsys',
    location: 'Bengaluru, India',
    role: 'Software Engineer',
    bullets: [
      'Built a modular design system in HTML, CSS, Bootstrap, and React.js — achieving 30% faster load times.',
      'Implemented SEO strategies boosting organic traffic by 15% and improving rankings by 10%.',
      'Integrated CDN-based image optimization and lazy loading, reducing image load times by 28%.',
    ],
  },
  {
    period: 'Sept 2020 — Mar 2021',
    company: 'HumanX',
    location: 'Mumbai, India',
    role: 'Web Developer',
    bullets: [
      'Developed responsive web and mobile apps, contributing to the redesign of 30% of client websites.',
      'Designed fully responsive CSS3/SASS layouts with 100% mobile responsiveness and 20% less styling redundancy.',
    ],
  },
]


export const projects = [
  {
  title: 'Accessibility Checker',
  description: 'A WCAG 2.0/2.1 AA compliance tool that analyses any URL or HTML snippet for accessibility violations using axe-core. Shows issues grouped by severity with detailed fix suggestions.',
  tech: ['React', 'axe-core', 'Vite', 'CSS Modules'],
  github: 'https://github.com/Racheldsouza3995/Accessibility-checker',
  live: 'https://rachel-dsouza.vercel.app/#accessibility-checker',
},
{
  title: 'Weather Forecast Dashboard',
  description: 'Real-time weather dashboard with city search and geolocation. Shows current conditions, 24-hour temperature trend chart, and 5-day forecast powered by OpenWeatherMap API.',
  tech: ['React', 'Recharts', 'OpenWeatherMap API', 'Vite'],
  github: 'https://github.com/Racheldsouza3995/Weather-dashboard',
  live: '/#weather-dashboard',
},
]