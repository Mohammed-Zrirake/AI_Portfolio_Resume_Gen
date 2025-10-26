export interface User {
  id: string; // Using email as ID for simplicity in this mock
  email: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string; // User can use newlines for bullet points
}

export interface Project {
  id:string;
  name: string;
  description: string;
  url: string;
  subtitle: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string;
}

export interface Language {
    id: string;
    name: string;
    proficiency: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  about: string;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  languages: Language[];
  interests: string[];
  extracurricular: string[];
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    location: string;
  };
  domain: string;
}