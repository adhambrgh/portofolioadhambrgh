import type { Metadata } from "next";
import { ProjectsArchive } from "@/components/sections/ProjectsArchive";

export const metadata: Metadata = {
  title: "All Projects",
  description: "Complete archive of projects by Adham Baarigh — web, mobile, full stack, and technical experiments.",
};

export default function ProjectsPage() {
  return <ProjectsArchive />;
}
