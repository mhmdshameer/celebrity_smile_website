import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useLanguage } from '@/contexts/LanguageContext';

const Map = () => {
  const { language } = useLanguage();

  const center = {
    lat: 21.5917608,
    lng: 39.233263
  };

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  // Get Google Maps API key from environment variables
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY_HERE";

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border shadow-lg">
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          center={center}
        >
          <Marker
            position={center}
            title={language === 'ar'
              ? 'عيادة ابتسامة المشاهير للأسنان'
              : 'Celebrity Smile Dental Clinic'}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
