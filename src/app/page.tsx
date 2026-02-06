import Hero from '@/components/sections/Hero';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import SkillsShowcase from '@/components/sections/SkillsShowcase';
import HobbiesCarousel from '@/components/sections/HobbiesCarousel';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProjects />
      <SkillsShowcase />
      <HobbiesCarousel />
    </div>
  );
}
