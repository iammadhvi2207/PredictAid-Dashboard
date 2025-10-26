import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'weather' | 'disaster' | 'ai';
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  variant = 'default',
  hover = true 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'weather':
        return 'bg-gradient-weather border-sky-blue/20';
      case 'disaster':
        return 'bg-gradient-disaster border-warning/20';
      case 'ai':
        return 'bg-gradient-ai border-primary-glow/20';
      default:
        return 'bg-gradient-glass border-glass-border';
    }
  };

  return (
    <div
      className={cn(
        "backdrop-blur-glass border rounded-2xl shadow-card transition-all duration-300",
        getVariantClasses(),
        hover && "hover:shadow-hover hover:scale-[1.02]",
        className
      )}
    >
      {children}
    </div>
  );
};