import salonImage from '../assets/salon.png';

export const portfolioData = {
  profile: {
    name: 'Muhammad Talha',
    title: 'MERN Stack Developer',
    role: 'Developer',
    availability: 'Available for projects',
    location: 'Remote / Global',
    email: 'mtalha3632@gmail.com',
    socials: {
      github: 'https://github.com/M-talha-mumtaz',
      linkedin: 'https://linkedin.com/in/m-talha-mumtaz',
      twitter: '#',
      instagram: '#'
    },
    formspreeEndpoint: 'https://formspree.io/f/xzdyykog'
  },
  projects: [
    {
      id: 'mentairo',
      title: 'MENTAIRO',
      description: 'Mental health platform with secure real-time video consultations.',
      tech: ['Flutter', 'Agora SDK', 'Dart'],
      image: '/projects/mentairo.png',
      featured: true,
      status: 'Web version coming soon'
    },
    {
      id: 'salon',
      title: 'Salon Web App',
      description: 'A modern web application for a salon, featuring service booking, secure admin dashboard, and responsive design.',
      tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      image: salonImage,
      featured: true,
      link: 'https://apex-grooming-salon.vercel.app'
    }
  ],
  roles: [
    {
      id: 'fullstack',
      title: 'FULL STACK ENGINEERING',
      description: 'Architecting robust web applications using React, Node.js, and MongoDB.',
      icon: 'Globe'
    },
    {
      id: 'flutter',
      title: 'MOBILE APP DEVELOPMENT',
      description: 'Building high-performance user interfaces and applications with Dart and Flutter.',
      icon: 'Smartphone'
    },
    {
      id: 'backend',
      title: 'BACKEND DEVELOPMENT',
      description: 'Developing secure and scalable RESTful APIs with Express, Node.js and FastAPI',
      icon: 'Database'
    }
  ],
  skillCategories: [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', icon: 'SiReact', color: '#61DAFB' },
        { name: 'JavaScript', icon: 'SiJavascript', color: '#F7DF1E' },
        { name: 'Tailwind CSS', icon: 'SiTailwindcss', color: '#06B6D4' },
        { name: 'HTML5', icon: 'SiHtml5', color: '#E34F26' },
        { name: 'CSS3', icon: 'DiCss3', color: '#1572B6' },
        { name: 'Flutter', icon: 'SiFlutter', color: '#02569B' }
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', icon: 'SiNodedotjs', color: '#339933' },
        { name: 'Express.js', icon: 'SiExpress', color: '#ffffff' },
        { name: 'FastAPI', icon: 'SiFastapi', color: '#009688' },
        { name: 'Python', icon: 'SiPython', color: '#3776AB' }
      ]
    },
    {
      title: 'Databases',
      skills: [
        { name: 'MongoDB', icon: 'SiMongodb', color: '#47A248' },
        { name: 'PostgreSQL', icon: 'DiPostgresql', color: '#4169E1' },
        { name: 'Firebase', icon: 'SiFirebase', color: '#FFCA28' }
      ]
    }
  ]
};
