// Google Analytics tracking utilities

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Track page views
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
  }
};

// Track button clicks
export const trackButtonClick = (buttonName: string, category: string, additionalParams?: Record<string, string>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'button_click', {
      button_name: buttonName,
      category: category,
      ...additionalParams,
    });
  }
};

// Track Call Now button clicks
export const trackCallNow = (page: string, phoneNumber?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'call_now_click', {
      page: page,
      phone_number: phoneNumber,
    });
  }
};

// Track Book Appointment button clicks
export const trackBookAppointment = (page: string, doctorName?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'book_appointment_click', {
      page: page,
      doctor_name: doctorName,
    });
    // Also fire the conversion event for Google Ads
    window.gtag('event', 'conversion_event_book_appointment', {
      page: page,
      doctor_name: doctorName,
    });
  }
};

// Track WhatsApp clicks
export const trackWhatsAppClick = (page: string, context?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'whatsapp_click', {
      page: page,
      context: context,
    });
  }
};

// Track form submissions
export const trackFormSubmit = (formName: string, additionalParams?: Record<string, string>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', {
      form_name: formName,
      ...additionalParams,
    });
  }
};
