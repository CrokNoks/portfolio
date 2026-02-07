import { Project, Experience, Skill, Hobby } from "@/types";
import { Github, Linkedin, Mail, User, Award, Target, ExternalLink, Calendar, Gamepad2, Package, Film } from "lucide-react";

export const name = "Lucas GUERRIER";

export const introduction =
  "Développeur full stack senior avec plus de 15 ans d'expérience, expert en conception et développement d'applications web complexes. Spécialisé dans l'architecture logicielle, la refonte d'applications legacy et le leadership technique.";

export const address = "76190 Yvetot, France";
export const addressLocator = "https://www.google.fr/maps/place/76190+Yvetot";

export const email = "guerrier.lucas@gmail.com";

export const phone = '+33 7 60 57 20 13'

export const socialLinks = [
  { icon: Github, href: "https://github.com/CrokNoks", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/guerrierlucas",
    label: "LinkedIn",
  },
  { icon: Mail, href: `mailto:${email}`, label: "Email" },
  { icon: ExternalLink, href: "https://jobs.omdev.tech/candidate/dev_1770104732605_s01fbqdvi", label: "GetYourJob" },
];

export const values = [
  {
    title: "Qualité",
    description:
      "Code propre, maintenable et testé pour des applications robustes.",
  },
  {
    title: "Innovation",
    description:
      "Veille constante des dernières technologies pour des solutions modernes.",
  },
  {
    title: "Collaboration",
    description:
      "Travail d'équipe et communication transparente pour le succès des projets.",
  },
];

export const aboutStats = [
  {
    icon: User,
    value: "15+",
    label: "Années d'expérience",
  },
  {
    icon: Target,
    value: "100%",
    label: "Satisfaction client",
  },
  { icon: Calendar, value: "2004", label: "Apprentissage du développement web" },
  {
    icon: Award,
    value: "2018 - 2026",
    label: "Détenteur du prix de la blague la plus nulle",
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Mobilio.mobi",
    description:
      "Application SaaS pour déménageurs avec élaboration de devis et calcule de volume",
    image: "/projects/mobilio.jpg",
    technologies: ["NestJS", "ExpressJS", "React", "React-Admin", "Node.js"],
    githubUrl: "https://github.com/CrokNoks",
    liveUrl: "https://mobilio.mobi",
    featured: true,
    category: "web",
  },
  {
    id: "2",
    title: "Bibliothèque Lego Manager",
    description:
      "Application de gestion complète de sets Lego avec base de données des collections personnelles.",
    image: "/projects/lego-manager.jpg",
    technologies: ["Node.js", "React", "MongoDB"],
    featured: false,
    category: "web",
  },
  {
    id: "4",
    title: "Budget Tracker",
    description:
      "Application de suivi de budget bancaire avec visualisation des dépenses et gestion des catégories.",
    image: "/projects/budget-tracker.jpg",
    technologies: ["React", "Node.js", "NestJS", "Supabase"],
    githubUrl: "https://github.com/CrokNoks/account",
    liveUrl: "https://account.lucas-guerrier.fr",
    featured: true,
    category: "web",
  },
  {
    id: "5",
    title: "Portfolio Personnel",
    description:
      "Portfolio web moderne présentant mes projets et compétences avec interface responsive.",
    image: "/projects/portfolio.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/CrokNoks/portfolio",
    liveUrl: "https://www.lucas-guerrier.fr",
    featured: true,
    category: "web",
  },
];

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Lead Développeur Back-End",
    company: "MovingLab devenu Kutta (Groupe Immopad)",
    period: "Juin 2018 - Février 2026",
    description:
      " - Développement de Mobilio.mobi, application SaaS pour déménageurs (NestJS, ExpressJS, React) avec élaboration de devis et proposition de tarif en quelques minutes.\n \
      - Refonte de l'interface React vers React-Admin: gain de temps au déploiement de 65% et amélioration de 46% du temps de création d'écrans.\n \
      - Mise en place d'une gestion centralisée des traductions via API Rest: gain de temps de 80%.\n \
      - Création d'un algorithme d'optimisation de trajets permettant une marge allant jusqu'à 70% du prix du déménagement.",
    technologies: ["NestJS", "ExpressJS", "React", "React-Admin", "Node.js"],
  },
  {
    id: "2",
    title: "Développeur Web",
    company: "Yes We Hack",
    period: "Mars 2018 – Mai 2018",
    description:
      " - Documentation détaillée de la plateforme Bug Bounty avec Swagger.\n \
      - Création et maintenance d'API Rest pour intégration de services tiers.\n \
      - Collaboration avec les équipes de développement pour assurer la conformité aux normes de sécurité.\n \
      - Rédaction de guides d'utilisation pour les développeurs externes.",
    technologies: ["Swagger", "OpenAPI"],
  },
  {
    id: "3",
    title: "Ingénieur Développement Logiciel",
    company: "Attineos",
    period: "Déc. 2017 – Fév. 2018",
    description:
      "- Développement d'un outil de partage de documents en PHP.\n \
      - Rédaction de documentation pour projets Node.js.\n \
      - Collaboration avec les équipes pour améliorer les processus de développement.",
    technologies: ["PHP", "Node.js"],
  },
  {
    id: "4",
    title: "Ingénieur Développement Logiciel",
    company: "Aubay (missions Groupama, MACIF)",
    period: "2015 – 2017",
    description:
      " - Développement de diverses applications métier en PHP/Symfony.\n \
      - Maintenance et rédaction technique de projets.\n \
      - Collaboration avec les équipes pour améliorer les processus de développement.",
    technologies: ["PHP", "Symfony"],
  },
  {
    id: "5",
    title: "Technicien Internet / Analyste Programmeur",
    company: "Mutavie & Groupe FB",
    period: "2010 – 2014",
    description:
      " - Développement d'outils métiers en PHP, Java et Coldfusion.\n \
      - Maintenance et administration de serveurs.\n \
      - Support technique aux utilisateurs internes et externes.",
    technologies: ["PHP", "Java", "Coldfusion"],
  },
];

export const levelSkillsOrders: Record<string, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
};

export const technicalSkills: Skill[] = [
  // Languages & Frameworks - Expert
  { id: "1", name: "JavaScript", level: "expert", category: "Frontend", skillType: "technical" },
  { id: "2", name: "PHP", level: "expert", category: "Backend", skillType: "technical" },

  // Languages & Frameworks - Senior
  { id: "3", name: "Node.js", level: "expert", category: "Backend", skillType: "technical" },
  { id: "4", name: "NestJS", level: "advanced", category: "Backend", skillType: "technical" },
  { id: "5", name: "ExpressJS", level: "advanced", category: "Backend", skillType: "technical" },
  { id: "6", name: "TypeScript", level: "advanced", category: "Frontend", skillType: "technical" },
  { id: "7", name: "ReactJS", level: "advanced", category: "Frontend", skillType: "technical" },
  { id: "8", name: "React-Admin", level: "advanced", category: "Frontend", skillType: "technical" },
  { id: "9", name: "Jest", level: "advanced", category: "Tools", skillType: "technical" },
  { id: "10", name: "Cypress", level: "advanced", category: "Tools", skillType: "technical" },
  { id: "11", name: "Swagger/OpenAPI", level: "advanced", category: "Tools", skillType: "technical" },

  // Languages & Frameworks - Confirmé
  { id: "12", name: "C# .NET", level: "beginner", category: "Backend", skillType: "technical" },
  { id: "13", name: "Python", level: "beginner", category: "Backend", skillType: "technical" },
  { id: "14", name: "Symfony", level: "intermediate", category: "Backend", skillType: "technical" },

  // Databases
  { id: "15", name: "PostgreSQL", level: "advanced", category: "Database", skillType: "technical" },
  { id: "16", name: "MySQL", level: "advanced", category: "Database", skillType: "technical" },
  { id: "17", name: "MongoDB", level: "advanced", category: "Database", skillType: "technical" },
  { id: "18", name: "ElasticSearch", level: "intermediate", category: "Database", skillType: "technical" },

  // Tools & Deployment
  { id: "19", name: "Docker", level: "intermediate", category: "DevOps", skillType: "technical" },
  { id: "20", name: "GitLab CI/CD", level: "advanced", category: "DevOps", skillType: "technical" },
  { id: "21", name: "PM2", level: "advanced", category: "DevOps", skillType: "technical" },
  { id: "22", name: "Nginx", level: "advanced", category: "DevOps", skillType: "technical" },
  { id: "23", name: "Infisical", level: "intermediate", category: "DevOps", skillType: "technical" },
  { id: "24", name: "Firebase", level: "advanced", category: "DevOps", skillType: "technical" },
  { id: "25", name: "GitHub Copilot", level: "advanced", category: "Tools", skillType: "technical" },

  // Technical Tools
  { id: "29", name: "GitFlow", level: "expert", category: "Tools", skillType: "technical" },
  { id: "30", name: "Java", level: "beginner", category: "Backend", skillType: "technical" },
  { id: "31", name: "Coldfusion", level: "intermediate", category: "Backend", skillType: "technical" },
  { id: "32", name: "Tailwind CSS", level: "intermediate", category: "Frontend", skillType: "technical" },
  { id: "33", name: "Next.js", level: "intermediate", category: "Frontend", skillType: "technical" },
  { id: "34", name: "Supabase", level: "intermediate", category: "Database", skillType: "technical" },
  { id: "36", name: "Linux baremetal", level: "intermediate", category: "DevOps", skillType: "technical" },
  { id: "41", name: "OpenCode", level: "intermediate", category: "Tools", skillType: "technical" },
];

export const softSkills: Skill[] = [
  // Leadership & Management
  { id: "26", name: "Gestion d'équipe", level: "advanced", category: "Leadership & Management", skillType: "soft" },
  { id: "27", name: "Mentoring", level: "expert", category: "Leadership & Management", skillType: "soft" },
  { id: "39", name: "Leadership", level: "advanced", category: "Leadership & Management", skillType: "soft" },

  // Communication & Collaboration
  { id: "38", name: "Communication", level: "expert", category: "Communication & Collaboration", skillType: "soft" },
  { id: "37", name: "Agile/Scrum", level: "intermediate", category: "Communication & Collaboration", skillType: "soft" },
  { id: "28", name: "Code review", level: "advanced", category: "Communication & Collaboration", skillType: "soft" },

  // Méthodologie & Process
  { id: "44", name: "Gestion de projet", level: "advanced", category: "Méthodologie & Process", skillType: "soft" },
  { id: "46", name: "Architecture logicielle", level: "advanced", category: "Méthodologie & Process", skillType: "soft" },
  { id: "47", name: "Conception d'API Rest", level: "expert", category: "Méthodologie & Process", skillType: "soft" },

  // Adaptabilité & Innovation
  { id: "42", name: "Travail en SaaS", level: "advanced", category: "Adaptabilité & Innovation", skillType: "soft" },
  { id: "43", name: "Travail en startup", level: "advanced", category: "Adaptabilité & Innovation", skillType: "soft" },
  { id: "45", name: "Refonte d'applications legacy", level: "advanced", category: "Adaptabilité & Innovation", skillType: "soft" },
];

// Maintenir l'ancien array pour compatibilité (optionnel)
export const skills = [...technicalSkills, ...softSkills];

export const hobbies: Hobby[] = [
  { 
    id: "1", 
    label: "Jeux Vidéos", 
    description: "Passionné de jeux vidéo depuis l'enfance, j'apprécie particulièrement les RPG, les jeux de stratégie et les sandbox.",
    icon: Gamepad2,
    skills: ["Gestion des ressources et optimisation", "Prise de décision et responsabilité","Créativité opérationnelle", "Persévérance"]
  },
  { 
    id: "2", 
    label: "Lego", 
    description: "Collectionneur de sets Lego, j'aime construire des modèles complexes et créatifs.",
    icon: Package,
    skills: ["Rigueur et suivi de processus", "Créativité", "Patience"]
  },
  { 
    id: "3", 
    label: "Films & Séries", 
    description: "Grand amateur de cinéma et de séries, j'apprécie la science fiction et le fantastique.",
    icon: Film,
    skills: ["Ouverture d'esprit et adaptabilité", "Capacité d'abstraction","Curiosité intellectuelle"]
  }
];
