import Hero from '@/components/sections/Hero';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import TechnicalSkillsShowcase from '@/components/sections/TechnicalSkillsShowcase';
import SoftSkillsShowcase from '@/components/sections/SoftSkillsShowcase';
import HobbiesCarousel from '@/components/sections/HobbiesCarousel';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProjects />
      <TechnicalSkillsShowcase />
      <SoftSkillsShowcase />
      <HobbiesCarousel />
    </div>
  );
}
