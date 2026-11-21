export interface SocialLink {
  label: string;
  href: string;
  icon: string;
  ariaLabel: string;
}

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

export interface NavItem {
  label: string;
  href: string;
}

export interface AvailabilityStatus {
  text: string;
  isAvailable: boolean;
}