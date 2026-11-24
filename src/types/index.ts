export interface TechTag {
  name: string;
  category: "frontend" | "backend" | "mobile" | "database" | "tools";
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  category: "web" | "mobile" | "fullstack" | "experiment";
  techStack: string[];
  repoUrl: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}
