import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { LatLngExpression, Icon, DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Dynamically import leaflet to avoid SSR issues
let L: any;
if (typeof window !== 'undefined') {
  L = require('leaflet');
  
  // Fix default marker icon issue with Leaflet in React
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

// Custom icons for different disaster types
const createCustomIcon = (severity: string): DivIcon | undefined => {
  if (typeof window === 'undefined' || !L) return undefined;
  
  const color = severity === 'high' ? '#ef4444' : severity === 'medium' ? '#f59e0b' : '#3b82f6';
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: ${color};
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      animation: pulse 2s infinite;
    "></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });
};

interface DisasterLocation {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  type: string;
  severity: string;
  description: string;
  state: string;
  district: string;
}

interface LeafletDisasterMapProps {
  center?: [number, number];
  searchLocation?: { lat: number; lng: number; display_name: string } | null;
}

// Component to update map center when search location changes
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export const LeafletDisasterMap = ({ 
  center = [20.5937, 78.9629], // Center of India
  searchLocation 
}: LeafletDisasterMapProps) => {
  const [disasterLocations, setDisasterLocations] = useState<DisasterLocation[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>(center);

  useEffect(() => {
    if (searchLocation) {
      setMapCenter([searchLocation.lat, searchLocation.lng]);
    }
  }, [searchLocation]);

  useEffect(() => {
    // Fetch real disaster data (mock for now, but structured for real API integration)
    const fetchDisasterData = async () => {
      // In production, integrate with NDMA, IMD, or other disaster APIs
      const mockData: DisasterLocation[] = [
        {
          id: 1,
          latitude: 13.0827,
          longitude: 80.2707,
          title: 'Cyclone Warning',
          type: 'Cyclone',
          severity: 'high',
          description: 'Severe cyclone approaching Tamil Nadu coast',
          state: 'Tamil Nadu',
          district: 'Chennai'
        },
        {
          id: 2,
          latitude: 28.7041,
          longitude: 77.1025,
          title: 'Heat Wave',
          type: 'Heat Wave',
          severity: 'medium',
          description: 'Extreme heat conditions predicted',
          state: 'Delhi',
          district: 'New Delhi'
        },
        {
          id: 3,
          latitude: 10.8505,
          longitude: 76.2711,
          title: 'Heavy Rainfall',
          type: 'Flood',
          severity: 'medium',
          description: 'Monsoon heavy rainfall warning',
          state: 'Kerala',
          district: 'Thrissur'
        },
        {
          id: 4,
          latitude: 19.0760,
          longitude: 72.8777,
          title: 'Flood Alert',
          type: 'Flood',
          severity: 'high',
          description: 'Urban flooding expected due to heavy rains',
          state: 'Maharashtra',
          district: 'Mumbai'
        },
        {
          id: 5,
          latitude: 23.0225,
          longitude: 72.5714,
          title: 'Earthquake Risk',
          type: 'Earthquake',
          severity: 'low',
          description: 'Minor seismic activity recorded',
          state: 'Gujarat',
          district: 'Ahmedabad'
        }
      ];
      setDisasterLocations(mockData);
    };

    fetchDisasterData();
  }, []);

  return (
    <div className="h-full w-full rounded-lg overflow-hidden relative">
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        .leaflet-container {
          height: 100%;
          width: 100%;
          border-radius: 0.5rem;
        }
      `}</style>
      
      <MapContainer
        center={mapCenter as LatLngExpression}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <MapUpdater center={mapCenter} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {/* Disaster markers */}
        {disasterLocations.map((location) => {
          const markerIcon = createCustomIcon(location.severity);
          return (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude] as LatLngExpression}
              icon={markerIcon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg mb-1">{location.title}</h3>
                  <p className="text-sm mb-1"><strong>Type:</strong> {location.type}</p>
                  <p className="text-sm mb-1"><strong>Location:</strong> {location.district}, {location.state}</p>
                  <p className="text-sm mb-1">
                    <strong>Severity:</strong> 
                    <span className={`ml-1 px-2 py-0.5 rounded text-xs font-medium ${
                      location.severity === 'high' ? 'bg-red-100 text-red-800' :
                      location.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {location.severity.toUpperCase()}
                    </span>
                  </p>
                  <p className="text-sm">{location.description}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Current location marker if available */}
        {searchLocation && (
          <Marker position={[searchLocation.lat, searchLocation.lng] as LatLngExpression}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-1">Your Location</h3>
                <p className="text-sm">{searchLocation.display_name}</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 z-[1000]">
        <h4 className="text-sm font-semibold mb-2">Disaster Severity</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs">High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs">Medium Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs">Low Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
};
