import React from 'react';
import { cn } from '@/lib/utils';
import { TabType } from './Dashboard';
import { BarChart3, CloudSun, AlertTriangle, Brain, Leaf, Shield } from 'lucide-react';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const navigation = [
  { id: 'overview' as const, label: 'Overview', icon: BarChart3 },
  { id: 'weather' as const, label: 'Weather', icon: CloudSun },
  { id: 'disasters' as const, label: 'Disasters', icon: AlertTriangle },
  { id: 'ai' as const, label: 'AI Insights', icon: Brain },
  { id: 'guidelines' as const, label: 'Guidelines', icon: Shield },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-64 bg-gradient-glass backdrop-blur-glass border-r border-glass-border shadow-glass">
      {/* Header */}
      <div className="p-6 border-b border-glass-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-nature flex items-center justify-center shadow-card">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">PredictAid</h1>
            <p className="text-sm text-muted-foreground">Disaster Watch</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-hover"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-transform duration-300",
                isActive ? "scale-110" : "group-hover:scale-105"
              )} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-glass-border">
        <p className="text-xs text-muted-foreground text-center">
          © 2024 Predict Aid
        </p>
        <p className="text-xs text-muted-foreground text-center mt-1">
          Protecting nature together
        </p>
      </div>
    </div>
  );
};