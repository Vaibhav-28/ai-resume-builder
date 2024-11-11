export interface ExperienceType {
  id?: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  currentlyWorking?: boolean;
  workSummary: string;
}

export interface ProjectsType {
  id?: number;
  title: string;
  startDate: string;
  endDate?: string;
  currentlyWorking?: boolean;
  description: string;
}

export interface EducationType {
  id?: number;
  university: string;
  startDate: string;
  endDate: string;
  degree: string;
  major: string;
  description: string;
}

export interface Skill {
  id?: number;
  name: string;
  rating: number;
}

export interface ResumeInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  themeColor: string;
  summary: string;
  experience: ExperienceType[];
  education: EducationType[];
  projects: ProjectsType[];
  skills: Skill[];
  additionalInformation: string;
}
