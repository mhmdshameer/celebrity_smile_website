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

  // TODO: Replace with your Google Maps API key from https://console.cloud.google.com/google/maps-apis
  const googleMapsApiKey = "YOUR_GOOGLE_MAPS_API_KEY_HERE";

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
              ? 'عيادة سيليبريتي سمايل لطب الأسنان' 
              : 'Celebrity Smile Dental Clinic'}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
