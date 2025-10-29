import { toast } from "@/components/ui/use-toast";

// Helper function to get auth headers
export function getAuthHeaders(token?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Use provided token or get from window
  const authToken = token || window.authToken;
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  return headers;
}

// Wrapper for authenticated fetch requests
export async function authFetch(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  const headers = {
    ...getAuthHeaders(),
    ...(options.headers || {})
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Include cookies if needed
  });

  // Handle 401 Unauthorized
  if (response.status === 401) {
    // You might want to redirect to login or refresh token here
    toast({
      title: 'Session expired',
      description: 'Please log in again',
      variant: 'destructive',
    });
    window.location.href = '/signin';
    throw new Error('Unauthorized');
  }

  return response;
}
