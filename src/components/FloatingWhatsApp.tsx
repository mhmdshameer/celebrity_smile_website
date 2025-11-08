
import { Link, useLocation } from 'react-router-dom';

// Add floating animation styles
const floatingAnimation = {
  animation: 'float 3s ease-in-out infinite',
  '@keyframes float': {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
    '100%': { transform: 'translateY(0px)' },
  },
};

const FloatingWhatsApp = () => {
  const location = useLocation();
  
  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  if (isAdminRoute) {
    return null; // Don't show on admin pages
  }

  return (
    <div 
      className="fixed bottom-6 right-6 z-50"
      style={{
        animation: 'float 3s ease-in-out infinite',
      }}
    >
      <Link 
        to="https://wa.me/message/5GVMII7DXT37H1" 
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center w-14 h-14"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-white"
        >
          <path d="M20.52 3.48A11.87 11.87 0 0 0 12 0C5.37 0 0 5.37 0 12a11.86 11.86 0 0 0 1.62 5.96L0 24l6.24-1.63A11.87 11.87 0 0 0 12 24c6.63 0 12-5.37 12-12a11.87 11.87 0 0 0-3.48-8.52ZM12 22a9.87 9.87 0 0 1-5.08-1.39l-.36-.21-3.7.97.99-3.61-.23-.37A9.88 9.88 0 0 1 2 12C2 6.49 6.49 2 12 2a9.9 9.9 0 0 1 7.06 2.94A9.9 9.9 0 0 1 22 12c0 5.51-4.49 10-10 10Zm5.05-7.36c-.27-.14-1.61-.79-1.86-.88-.25-.09-.43-.14-.62.14-.18.27-.71.88-.87 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.33-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.05-.22-.53-.44-.46-.62-.47h-.53c-.18 0-.48.07-.73.34s-.96.94-.96 2.28.99 2.64 1.13 2.82c.14.18 1.94 2.96 4.7 4.05 2.77 1.09 2.77.73 3.27.69.5-.04 1.61-.65 1.84-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32Z" />
        </svg>
      </Link>
    </div>
  );
};

export default FloatingWhatsApp;
