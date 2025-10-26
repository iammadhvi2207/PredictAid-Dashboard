import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Overview } from './tabs/Overview';
import { Weather } from './tabs/Weather';
import { Disasters } from './tabs/Disasters';
import { AIInsights } from './tabs/AIInsights';
import { Guidelines } from './tabs/Guidelines';
import backgroundImage from '@/assets/nature-background.jpg';

export type TabType = 'overview' | 'weather' | 'disasters' | 'ai' | 'guidelines';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'weather':
        return <Weather />;
      case 'disasters':
        return <Disasters />;
      case 'ai':
        return <AIInsights />;
      case 'guidelines':
        return <Guidelines />;
      default:
        return <Overview />;
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Background overlay for better glassmorphism effect */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      
      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Navbar />
          
          {/* Content area */}
          <main className="flex-1 overflow-auto p-6">
            <div className="w-full max-w-7xl mx-auto">
              {renderTabContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};