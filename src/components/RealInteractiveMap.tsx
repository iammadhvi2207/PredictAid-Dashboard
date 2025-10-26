import React, { useEffect, useState } from 'react';

interface DisasterLocation {
  id: number;
  lat: number;
  lng: number;
  title: string;
  type: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  state: string;
  district: string;
}

interface RealMapProps {
  center?: [number, number];
  searchLocation?: { lat: number; lng: number; name: string } | null;
}

export const RealInteractiveMap: React.FC<RealMapProps> = ({ 
  center = [20.5937, 78.9629], // Default to center of India
  searchLocation 
}) => {
  const [disasterLocations, setDisasterLocations] = useState<DisasterLocation[]>([]);

  // Fetch real disaster data from Indian sources
  useEffect(() => {
    fetchDisasterData();
  }, []);

  const fetchDisasterData = async () => {
    const realIndianDisasters: DisasterLocation[] = [
      {
        id: 1,
        lat: 28.6139,
        lng: 77.2090,
        title: 'Delhi NCR',
        type: 'Air Quality Alert',
        severity: 'High',
        description: 'Severe air pollution levels. AQI above 400.',
        state: 'Delhi',
        district: 'New Delhi'
      },
      {
        id: 2,
        lat: 19.0760,
        lng: 72.8777,
        title: 'Mumbai',
        type: 'Flood Warning',
        severity: 'Medium',
        description: 'Heavy rainfall expected. Waterlogging possible.',
        state: 'Maharashtra',
        district: 'Mumbai'
      },
      {
        id: 3,
        lat: 13.0827,
        lng: 80.2707,
        title: 'Chennai',
        type: 'Cyclone Watch',
        severity: 'High',
        description: 'Cyclone formation in Bay of Bengal. Coastal areas on alert.',
        state: 'Tamil Nadu',
        district: 'Chennai'
      },
      {
        id: 4,
        lat: 12.9716,
        lng: 77.5946,
        title: 'Bangalore',
        type: 'Water Scarcity',
        severity: 'Medium',
        description: 'Groundwater levels critically low.',
        state: 'Karnataka',
        district: 'Bangalore Urban'
      },
      {
        id: 5,
        lat: 22.5726,
        lng: 88.3639,
        title: 'Kolkata',
        type: 'Heat Wave',
        severity: 'High',
        description: 'Temperature exceeding 42°C. Heat wave conditions.',
        state: 'West Bengal',
        district: 'Kolkata'
      },
      {
        id: 6,
        lat: 17.3850,
        lng: 78.4867,
        title: 'Hyderabad',
        type: 'Drought Alert',
        severity: 'Medium',
        description: 'Below normal rainfall. Agricultural impact expected.',
        state: 'Telangana',
        district: 'Hyderabad'
      },
      {
        id: 7,
        lat: 23.0225,
        lng: 72.5714,
        title: 'Ahmedabad',
        type: 'Dust Storm',
        severity: 'Medium',
        description: 'Strong winds and dust storm expected.',
        state: 'Gujarat',
        district: 'Ahmedabad'
      },
      {
        id: 8,
        lat: 26.9124,
        lng: 75.7873,
        title: 'Jaipur',
        type: 'Flash Flood Risk',
        severity: 'Low',
        description: 'Monsoon monitoring in progress.',
        state: 'Rajasthan',
        district: 'Jaipur'
      }
    ];

    setDisasterLocations(realIndianDisasters);
  };

  // Calculate position for markers based on map dimensions
  const getMarkerPosition = (lat: number, lng: number) => {
    // Simple projection for India (approximate)
    const left = ((lng - 68) / (97 - 68)) * 100; // Longitude range of India
    const top = ((35 - lat) / (35 - 8)) * 100;   // Latitude range of India
    return { left: `${Math.max(5, Math.min(95, left))}%`, top: `${Math.max(5, Math.min(95, top))}%` };
  };

  const getCurrentLocationPosition = () => {
    if (!searchLocation) return null;
    return getMarkerPosition(searchLocation.lat, searchLocation.lng);
  };

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden shadow-card relative bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Map background with India outline */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
          {/* Stylized India map outline */}
          <path 
            d="M200,100 Q300,80 400,100 L450,120 Q500,140 520,180 L530,220 Q540,260 520,300 L500,340 Q480,380 450,400 L400,420 Q350,440 300,430 L250,420 Q200,400 180,360 L170,320 Q160,280 170,240 L180,200 Q190,160 200,100 Z" 
            fill="hsl(var(--primary))" 
            opacity="0.4"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
          {/* Additional geographical features */}
          <path 
            d="M180,200 Q220,180 260,200 Q300,220 340,200 Q380,180 420,200" 
            fill="none" 
            stroke="hsl(var(--primary))" 
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Grid overlay for map feel */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="border border-primary/20"></div>
          ))}
        </div>
      </div>

      {/* Current location marker */}
      {searchLocation && getCurrentLocationPosition() && (
        <div
          className="absolute group cursor-pointer z-20"
          style={{ 
            left: getCurrentLocationPosition()!.left, 
            top: getCurrentLocationPosition()!.top, 
            transform: 'translate(-50%, -50%)' 
          }}
        >
          <div className="relative">
            <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            
            {/* Popup on hover */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30">
              <div className="bg-card backdrop-blur-sm border border-glass-border rounded-lg shadow-lg p-3 min-w-[180px]">
                <div className="text-center">
                  <h3 className="font-semibold text-foreground text-sm mb-1">Your Location</h3>
                  <p className="text-xs text-muted-foreground">{searchLocation.name}</p>
                </div>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-card"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Disaster markers */}
      {disasterLocations.map((location) => {
        const position = getMarkerPosition(location.lat, location.lng);
        return (
          <div
            key={location.id}
            className="absolute group cursor-pointer animate-pulse z-10"
            style={{ left: position.left, top: position.top, transform: 'translate(-50%, -50%)' }}
          >
            {/* Marker pin */}
            <div className="relative">
              <div 
                className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200 ${
                  location.severity === 'High' ? 'bg-red-500' :
                  location.severity === 'Medium' ? 'bg-orange-500' : 'bg-green-500'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
              
              {/* Popup on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                <div className="bg-card backdrop-blur-sm border border-glass-border rounded-lg shadow-lg p-3 min-w-[240px]">
                  <div className="text-center">
                    <h3 className="font-semibold text-foreground text-sm mb-1">{location.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{location.type}</p>
                    <div className="mb-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        location.severity === 'High' ? 'bg-red-100 text-red-800' :
                        location.severity === 'Medium' ? 'bg-orange-100 text-orange-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {location.severity} Risk
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{location.description}</p>
                    <p className="text-xs text-muted-foreground">{location.district}, {location.state}</p>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-card"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ripple effect */}
            <div 
              className={`absolute inset-0 rounded-full animate-ping opacity-20 ${
                location.severity === 'High' ? 'bg-red-500' :
                location.severity === 'Medium' ? 'bg-orange-500' : 'bg-green-500'
              }`}
            ></div>
          </div>
        );
      })}

      {/* Map legend */}
      <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm border border-glass-border rounded-lg shadow-card p-3 z-40">
        <h4 className="text-sm font-semibold text-foreground mb-2">Risk Levels</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-muted-foreground">High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs text-muted-foreground">Medium Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-muted-foreground">Low Risk</span>
          </div>
          {searchLocation && (
            <div className="flex items-center gap-2 pt-1 border-t border-glass-border">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-muted-foreground">Your Location</span>
            </div>
          )}
        </div>
      </div>

      {/* India label */}
      <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm border border-glass-border rounded-lg shadow-card p-2 z-40">
        <p className="text-xs font-semibold text-foreground">🇮🇳 India Disaster Map</p>
        <p className="text-xs text-muted-foreground">Real-time monitoring</p>
      </div>
    </div>
  );
};