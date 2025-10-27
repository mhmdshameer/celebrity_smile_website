import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useLanguage } from '@/contexts/LanguageContext';

const Map = () => {
  const { language } = useLanguage();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // TODO: Replace with your Mapbox public token from https://account.mapbox.com/access-tokens/
    mapboxgl.accessToken = 'YOUR_MAPBOX_PUBLIC_TOKEN_HERE';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [39.233263, 21.5917608], // 3247 Al Ajawad St, Al Rabi', Jeddah 23462, Saudi Arabia
      zoom: 15,
    });

    // Add marker for Celebrity Smile Dental Clinic
    new mapboxgl.Marker({ color: '#0EA5E9' })
      .setLngLat([39.233263, 21.5917608])
      .setPopup(
        new mapboxgl.Popup().setHTML(
          `<div style="padding: 8px;">
            <h3 style="font-weight: bold; margin-bottom: 4px;">Celebrity Smile Dental Clinic</h3>
            <p style="font-size: 14px;">3247 Al Ajawad St, Al Rabi'<br/>Jeddah 23462, Saudi Arabia</p>
          </div>`
        )
      )
      .addTo(map.current);

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, [language]);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;
