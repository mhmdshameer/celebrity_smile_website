import React from 'react';

const Map = () => {
  return (
    <div className="w-full rounded-lg overflow-hidden border shadow-lg">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14838.933518312344!2d39.22715795!3d21.596328000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d1edc58292d3%3A0xbdd2ea90d09d7e7f!2sCelebrity%20Smile%20Dental%20Clinic!5e0!3m2!1sen!2ssa!4v1762187665942!5m2!1sen!2ssa" 
        width="100%" 
        height="450" 
        style={{ border: 0 }} 
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Celebrity Smile Dental Clinic Location"
      />
    </div>
  );
};

export default Map;
