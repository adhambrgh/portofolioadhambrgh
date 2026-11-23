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
  category: "web" | "mobile" | "fullstack";
  techStack: string[];
  thumbnail: string;
  thumbnailAlt: string;
  repoUrl: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}
