import type { SkillCategory, TechTag } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend Development",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    category: "Backend Development",
    skills: [
      "PHP",
      "Laravel",
      "Node.js",
      "Express.js",
      "RESTful API",
      "GraphQL",
      "Authentication & Authorization",
    ],
  },
  {
    category: "Mobile Development",
    skills: [
      "Flutter",
      "Dart",
      "React Native",
      "Expo",
      "Firebase",
      "Supabase",
      "Platform Channels",
    ],
  },
  {
    category: "Database & Tools",
    skills: [
      "PostgreSQL",
      "MySQL",
      "Firebase Firestore",
      "Supabase",
      "Git",
      "GitHub",
      "Docker",
      "CI/CD",
      "Vercel",
      "Linux",
    ],
  },
];

export const techTags: TechTag[] = [  { name: "HTML5", category: "frontend" },
  { name: "CSS3", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "PHP", category: "backend" },
  { name: "Laravel", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "Express.js", category: "backend" },
  { name: "Flutter", category: "mobile" },
  { name: "Dart", category: "mobile" },
  { name: "React Native", category: "mobile" },
  { name: "Expo", category: "mobile" },
  { name: "PostgreSQL", category: "database" },
  { name: "MySQL", category: "database" },
  { name: "Firebase", category: "database" },
  { name: "Supabase", category: "database" },
  { name: "Git", category: "tools" },
  { name: "GitHub", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "Vercel", category: "tools" },
];

export const getTechTagCategory = (name: string): TechTag["category"] | undefined => {
  const tag = techTags.find((t) => t.name.toLowerCase() === name.toLowerCase());
  return tag?.category;
};

/** Bar About. Nilai = jumlah teknologi per kategori, diskalakan ke 100 atas kategori terbanyak. */
const maxSkillCount = Math.max(...skillCategories.map((c) => c.skills.length));
/** Empat nada muted blue: satu keluarga warna, dari gelap ke terang. */
const SKILL_BAR_COLORS = ["#5E6D8E", "#7886A8", "#9AA5BE", "#C3CAD9"];
export const skillBars = skillCategories.map((c, i) => ({
  label: c.category,
  value: Math.round((c.skills.length / maxSkillCount) * 100),
  color: SKILL_BAR_COLORS[i % SKILL_BAR_COLORS.length],
}));
