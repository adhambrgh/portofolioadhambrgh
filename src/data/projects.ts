import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "jurnal-jatim-carnival",
    name: "Jurnal Jatim Carnival",
    description: "Aplikasi informasi event dan budaya Jawa Timur yang menyediakan jadwal, lokasi, dan detail acara budaya serta festival di seluruh Jawa Timur.",
    category: "mobile",
    techStack: ["Flutter", "Dart", "Firebase", "Firestore", "Firebase Auth"],
    thumbnail: "/images/projects/jurnal-jatim.svg",
    thumbnailAlt: "Jurnal Jatim Carnival project placeholder showing app interface wireframe",
    repoUrl: "https://github.com/adhambrgh/jurnal-jatim-carnival",
    liveUrl: undefined,
    featured: true,
    order: 1,
  },
  {
    id: "ungkepan-sn",
    name: "Ungkepan SN Online Shop",
    description: "Website toko online untuk produk ungkepan dengan sistem manajemen produk, keranjang belanja, checkout, dan integrasi pembayaran.",
    category: "web",
    techStack: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind CSS", "Midtrans"],
    thumbnail: "/images/projects/ungkepan-sn.svg",
    thumbnailAlt: "Ungkepan SN project placeholder showing e-commerce interface wireframe",
    repoUrl: "https://github.com/adhambrgh/ungkepan-sn",
    liveUrl: undefined,
    featured: true,
    order: 2,
  },
  {
    id: "sanjaya",
    name: "SANJAYA",
    description: "Aplikasi inventaris dan manajemen penjualan dengan fitur pelacakan stok, laporan penjualan, manajemen pelanggan, dan dashboard analitik.",
    category: "fullstack",
    techStack: ["React Native", "TypeScript", "Expo", "Supabase", "PostgreSQL", "React Query"],
    thumbnail: "/images/projects/sanjaya.svg",
    thumbnailAlt: "SANJAYA project placeholder showing inventory dashboard wireframe",
    repoUrl: "https://github.com/adhambrgh/sanjaya",
    liveUrl: undefined,
    featured: true,
    order: 3,
  },
];

export const featuredProjects = projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);