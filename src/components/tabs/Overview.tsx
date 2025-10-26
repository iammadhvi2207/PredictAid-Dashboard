import React, { useState, useEffect } from 'react';
import { GlassCard } from '../GlassCard';
import { RealInteractiveMap } from '../RealInteractiveMap';
import { DisasterGraphs } from '../charts/DisasterGraphs';
import { WeatherGraphs } from '../charts/WeatherGraphs';
import { EmergencyShelter } from '../EmergencyShelter';
import { TrendingUp } from 'lucide-react';

export const Overview = () => {
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'Cyclone Alert',
      location: 'Bay of Bengal - Tamil Nadu Coast',
      time: '5 minutes ago',
      severity: 'high',
      source: 'https://imd.gov.in'
    },
    {
      id: 2,
      type: 'Heat Wave Warning',
      location: 'North India - IMD Alert',
      time: '12 minutes ago',
      severity: 'medium',
      source: 'https://imd.gov.in'
    },
    {
      id: 3,
      type: 'Monsoon Update',
      location: 'Kerala - Heavy rainfall predicted',
      time: '25 minutes ago',
      severity: 'low',
      source: 'https://imd.gov.in'
    }
  ]);

  useEffect(() => {
    // Fetch real-time activity updates
    const interval = setInterval(() => {
      // In production, this would fetch from NDMA/IMD APIs
      fetchLatestActivity();
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const fetchLatestActivity = async () => {
    // Simulate fetching latest disaster activity
    // In production, integrate with government APIs
    console.log('Fetching latest disaster activity...');
  };

  const handleActivityClick = (activity: any) => {
    window.open(activity.source, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">Emergency Dashboard</h2>
        <p className="text-muted-foreground">
          Real-time disaster monitoring and emergency response coordination
        </p>
      </div>

      {/* Main Layout: Map + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Primary Interactive Map - Full Width Priority */}
        <div className="lg:col-span-3">
          <GlassCard className="p-4 h-[600px]">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-foreground mb-1">
                Live Disaster & Emergency Map
              </h3>
              <p className="text-sm text-muted-foreground">
                Real-time disasters, user location, and verified emergency shelters
              </p>
            </div>
            <div className="h-[520px]">
              <RealInteractiveMap />
            </div>
          </GlassCard>
        </div>

        {/* Sidebar - Emergency Operations */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Emergency Shelters Widget */}
            <div className="h-[350px] overflow-y-auto">
              <EmergencyShelter />
            </div>
            
            {/* Live Alerts Compact */}
            <GlassCard className="p-4 h-[230px]">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h4 className="text-sm font-semibold text-foreground">Live Alerts</h4>
              </div>
              <div className="space-y-2 overflow-y-auto max-h-[180px]">
                {recentActivity.slice(0, 3).map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex items-start gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors"
                    onClick={() => handleActivityClick(activity)}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                      activity.severity === 'high' ? 'bg-destructive animate-pulse' : 
                      activity.severity === 'medium' ? 'bg-warning' : 'bg-primary'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{activity.type}</p>
                      <p className="text-xs text-muted-foreground truncate">{activity.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Supporting Analytics - Below Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disaster Analytics */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Disaster Analytics</h3>
          <DisasterGraphs />
        </div>

        {/* Weather Analytics */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Weather & Predictions</h3>
          <WeatherGraphs />
        </div>
      </div>
    </div>
  );
};