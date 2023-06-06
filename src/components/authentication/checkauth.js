import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';

const CheckAuthentication = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect(); // Redirect the user to Auth0 login page
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator if authentication state is still loading
  }

  return <>{children}</>;
};

export default CheckAuthentication;
