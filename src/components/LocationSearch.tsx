import React, { useState, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
interface LocationSearchProps {
  onLocationSelect: (location: {
    lat: number;
    lng: number;
    name: string;
  }) => void;
  currentLocation?: string;
}
export const LocationSearch: React.FC<LocationSearchProps> = ({
  onLocationSelect,
  currentLocation
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const {
    toast
  } = useToast();

  // Auto-fetch location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);
  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support geolocation",
        variant: "destructive"
      });
      setIsGettingLocation(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(async position => {
      const {
        latitude,
        longitude
      } = position.coords;
      try {
        // Reverse geocoding using OpenStreetMap Nominatim API
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`);
        const data = await response.json();
        const locationName = data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        onLocationSelect({
          lat: latitude,
          lng: longitude,
          name: locationName
        });
        toast({
          title: "Location found",
          description: `Current location: ${locationName}`
        });
      } catch (error) {
        toast({
          title: "Location error",
          description: "Could not get location details",
          variant: "destructive"
        });
      }
      setIsGettingLocation(false);
    }, error => {
      let message = "Could not get your location";
      if (error.code === error.PERMISSION_DENIED) {
        message = "Location access denied. Please enable location permissions.";
      }
      toast({
        title: "Location error",
        description: message,
        variant: "destructive"
      });
      setIsGettingLocation(false);
    }, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000
    });
  };
  const searchLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      // Using OpenStreetMap Nominatim API for geocoding
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1&addressdetails=1`);
      const data = await response.json();
      if (data.length > 0) {
        const result = data[0];
        onLocationSelect({
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          name: result.display_name
        });
        toast({
          title: "Location found",
          description: `Found: ${result.display_name}`
        });
        setSearchQuery('');
      } else {
        toast({
          title: "Location not found",
          description: "Try a different search term",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Search error",
        description: "Could not search for location",
        variant: "destructive"
      });
    }
    setIsSearching(false);
  };
  return <div className="space-y-4">
      {/* Current Location Display */}
      {currentLocation && <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>Current: {currentLocation}</span>
        </div>}
      
      {/* Search Form */}
      <form onSubmit={searchLocation} className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input type="text" placeholder="Search for a location..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" disabled={isSearching} />
        </div>
        <Button type="submit" disabled={isSearching || !searchQuery.trim()} className="px-4">
          {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </Button>
      </form>
      
      {/* Get Current Location Button */}
      
    </div>;
};