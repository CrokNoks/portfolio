'use client';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
};

export default PageTransition;