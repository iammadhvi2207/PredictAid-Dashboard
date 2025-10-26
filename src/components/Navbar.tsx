import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';
import { LocationSearch } from './LocationSearch';

export const Navbar = () => {
  const [currentLocation, setCurrentLocation] = useState<string>('');

  return (
    <header className="h-16 bg-gradient-glass backdrop-blur-glass border-b border-glass-border shadow-card">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left side - Dashboard title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-nature flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold text-foreground">
            Disaster Response Dashboard - India
          </h1>
        </div>

        {/* Center - Location Search */}
        <div className="flex-1 max-w-md mx-8">
          <LocationSearch 
            onLocationSelect={(location) => setCurrentLocation(location.name)}
            currentLocation={currentLocation}
          />
        </div>

        {/* Right side - Status indicator */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Live Data</span>
        </div>
      </div>
    </header>
  );
};