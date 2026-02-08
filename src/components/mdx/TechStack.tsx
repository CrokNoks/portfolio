

interface Technology {
  name: string;
  color?: string;
}

interface TechStackProps {
  technologies: Technology[];
  className?: string;
}

const TechStack = ({ technologies, className = '' }: TechStackProps) => {
  return (
    <div className={`flex flex-wrap gap-2 my-4 ${className}`}>
      {technologies.map((tech, index) => (
        <span
          key={index}
          className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full hover:bg-accent transition-colors"
          style={tech.color ? { backgroundColor: tech.color + '20', color: tech.color } : {}}
        >
          {tech.name}
        </span>
      ))}
    </div>
  );
};

export default TechStack;