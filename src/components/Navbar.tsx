import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';
import { LocationSearch } from './LocationSearch';

export const Navbar = () => {
  const [currentLocation, setCurrentLocation] = useState<string>('');

  const handleLocationSelect = (location: { name: string; lat: number; lng: number }) => {
    setCurrentLocation(location.name);
  };

  return (
    <header className="h-16 bg-background/10 backdrop-blur-md border-b border-border/20 shadow-card">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 backdrop-blur-sm">
            <Leaf className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-foreground">PredictAid</h1>
            <p className="text-xs text-muted-foreground">Emergency Dashboard</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md">
          <LocationSearch 
            onLocationSelect={handleLocationSelect}
            currentLocation={currentLocation}
          />
        </div>
      </div>
    </header>
  );
};