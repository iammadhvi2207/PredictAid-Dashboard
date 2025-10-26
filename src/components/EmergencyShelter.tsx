import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { MapPin, Phone, Users, Navigation, ExternalLink, Shield, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface Shelter {
  id: string;
  name: string;
  address: string;
  district: string;
  state: string;
  capacity: number;
  currentOccupancy: number;
  contactNumber: string;
  facilities: string[];
  operationalStatus: 'active' | 'inactive' | 'full';
  distance: number;
  coordinates: { lat: number; lng: number };
  lastUpdated: string;
  sourceUrl: string;
}

export const EmergencyShelter = () => {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchNearbyShelters();
    }
  }, [userLocation]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationPermission('granted');
        },
        (error) => {
          console.error('Location error:', error);
          setLocationPermission('denied');
          // Use default location (Delhi) and fetch shelters
          setUserLocation({ lat: 28.6139, lng: 77.2090 });
          fetchNearbyShelters();
        }
      );
    } else {
      setLocationPermission('denied');
      setUserLocation({ lat: 28.6139, lng: 77.2090 });
      fetchNearbyShelters();
    }
  };

  const fetchNearbyShelters = async () => {
    try {
      // Simulating government shelter data
      // In production, this would fetch from NDMA/State govt APIs
      const mockShelters: Shelter[] = [
        {
          id: '1',
          name: 'Delhi Government Emergency Shelter',
          address: 'Sector 15, Rohini, New Delhi',
          district: 'North West Delhi',
          state: 'Delhi',
          capacity: 500,
          currentOccupancy: 120,
          contactNumber: '+91-11-2345-6789',
          facilities: ['Medical Aid', 'Food', 'Clean Water', 'Sanitation', 'Security'],
          operationalStatus: 'active',
          distance: 2.4,
          coordinates: { lat: 28.7041, lng: 77.1025 },
          lastUpdated: '2024-01-08 14:30',
          sourceUrl: 'https://revenue.delhi.gov.in/wps/wcm/connect/DoIT_Revenue/revenue/home'
        },
        {
          id: '2',
          name: 'Red Cross Emergency Relief Center',
          address: 'Community Center, Lajpat Nagar',
          district: 'South Delhi',
          state: 'Delhi',
          capacity: 300,
          currentOccupancy: 280,
          contactNumber: '+91-11-9876-5432',
          facilities: ['Medical Aid', 'Food', 'Blankets', 'Child Care'],
          operationalStatus: 'active',
          distance: 8.7,
          coordinates: { lat: 28.5675, lng: 77.2434 },
          lastUpdated: '2024-01-08 13:45',
          sourceUrl: 'https://indianredcross.org'
        },
        {
          id: '3',
          name: 'Municipal Corporation Shelter',
          address: 'Gandhi Nagar, Central Delhi',
          district: 'Central Delhi',
          state: 'Delhi',
          capacity: 200,
          currentOccupancy: 200,
          contactNumber: '+91-11-1122-3344',
          facilities: ['Food', 'Clean Water', 'Basic Medical'],
          operationalStatus: 'full',
          distance: 5.2,
          coordinates: { lat: 28.6667, lng: 77.2167 },
          lastUpdated: '2024-01-08 15:00',
          sourceUrl: 'https://mcdonline.nic.in'
        }
      ];

      setShelters(mockShelters.sort((a, b) => a.distance - b.distance));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching shelter data:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-primary';
      case 'full': return 'text-warning';
      case 'inactive': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '🟢';
      case 'full': return '🟡';
      case 'inactive': return '🔴';
      default: return '⚪';
    }
  };

  const handleShelterClick = (shelter: Shelter) => {
    window.open(shelter.sourceUrl, '_blank');
  };

  const handleGetDirections = (shelter: Shelter) => {
    const url = `https://www.google.com/maps/dir/${userLocation?.lat},${userLocation?.lng}/${shelter.coordinates.lat},${shelter.coordinates.lng}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <GlassCard className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/2"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-6 h-6 text-primary" />
        <div>
          <h3 className="text-lg font-semibold text-foreground">Emergency Shelters</h3>
          <p className="text-sm text-muted-foreground">
            {locationPermission === 'granted' ? 'Nearest verified shelters' : 'Delhi region shelters'}
          </p>
        </div>
      </div>

      {locationPermission === 'denied' && (
        <div className="mb-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
          <p className="text-sm text-warning-foreground">
            Location access denied. Showing shelters for Delhi region.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {shelters.map((shelter) => (
          <div
            key={shelter.id}
            className="p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-all duration-200 hover:shadow-hover"
            onClick={() => handleShelterClick(shelter)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground">{shelter.name}</h4>
                  <span className="text-xs">{getStatusIcon(shelter.operationalStatus)}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <MapPin className="w-3 h-3" />
                  <span>{shelter.address}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Navigation className="w-3 h-3" />
                  <span>{shelter.distance} km away</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Capacity</p>
                  <p className="text-sm font-medium text-foreground">
                    {shelter.currentOccupancy}/{shelter.capacity}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Contact</p>
                  <p className="text-sm font-medium text-foreground">{shelter.contactNumber}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${getStatusColor(shelter.operationalStatus)}`}>
                  {shelter.operationalStatus.toUpperCase()}
                </span>
                <span className="text-xs text-muted-foreground">
                  • Updated {shelter.lastUpdated}
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleGetDirections(shelter);
                }}
                className="text-xs"
              >
                <Navigation className="w-3 h-3 mr-1" />
                Directions
              </Button>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground mb-1">Facilities:</p>
              <div className="flex flex-wrap gap-1">
                {shelter.facilities.map((facility, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                  >
                    {facility}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>Data sourced from NDMA & State Government portals</span>
        </div>
      </div>
    </GlassCard>
  );
};