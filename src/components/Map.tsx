import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Map = () => {
  const { language } = useLanguage();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !isTokenSet || !token) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [39.233263, 21.5917608],
      zoom: 15,
    });

    // Add marker for Celebrity Smile Dental Clinic
    new mapboxgl.Marker({ color: '#0EA5E9' })
      .setLngLat([39.233263, 21.5917608])
      .setPopup(
        new mapboxgl.Popup().setHTML(
          `<div style="padding: 8px;">
            <h3 style="font-weight: bold; margin-bottom: 4px;">Celebrity Smile Dental Clinic</h3>
            <p style="font-size: 14px;">${language === 'ar' ? 'جدة، المملكة العربية السعودية' : 'Jeddah, Saudi Arabia'}</p>
          </div>`
        )
      )
      .addTo(map.current);

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, [isTokenSet, token, language]);

  if (!isTokenSet) {
    return (
      <div className="w-full p-6 bg-card rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">
          {language === 'ar' ? 'إعداد الخريطة' : 'Map Setup'}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {language === 'ar' 
            ? 'الرجاء إدخال رمز Mapbox العام الخاص بك لعرض الخريطة'
            : 'Please enter your Mapbox public token to display the map'}
        </p>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="pk.eyJ1..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="flex-1"
          />
          <Button onClick={() => setIsTokenSet(true)} disabled={!token}>
            {language === 'ar' ? 'عرض الخريطة' : 'Show Map'}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {language === 'ar' 
            ? 'احصل على رمز من'
            : 'Get your token from'}{' '}
          <a 
            href="https://account.mapbox.com/access-tokens/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            mapbox.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;
