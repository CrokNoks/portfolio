import Hero from '@/components/sections/Hero';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import TechnicalSkillsShowcase from '@/components/sections/TechnicalSkillsShowcase';
import SoftSkillsShowcase from '@/components/sections/SoftSkillsShowcase';
import BlogCarousel from '@/components/sections/BlogCarousel';
import HobbiesCarousel from '@/components/sections/HobbiesCarousel';
import { getLatestPosts } from '@/lib/blog';

export default function Home() {
  // Obtenir les 3 derniers articles pour le carrousel
  const latestPosts = getLatestPosts(3);

  return (
    <div>
      <Hero />
      <FeaturedProjects />
      <TechnicalSkillsShowcase />
      <SoftSkillsShowcase />
      <BlogCarousel posts={latestPosts} />
      <HobbiesCarousel />
    </div>
  );
}
