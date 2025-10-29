import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

declare global {
  interface Window {
    authToken?: string;
  }
}

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading, token } = useAuth();

  // Add token to all authenticated requests
  useEffect(() => {
    if (token) {
      // Store token in a global variable that can be used by API functions
      window.authToken = token;
    } else {
      delete window.authToken;
    }
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
