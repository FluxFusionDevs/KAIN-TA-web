import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { UserPayload } from '../models/userModel';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Decode the token to get the user information
      const user = jwtDecode<UserPayload>(token);

      // Store the token in session storage or local storage
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('authToken', token);

      if (user.user.type === 'OWNER') {
        navigate('/admin');
      } else if (user.user.type === 'ADMIN') {
        navigate('/superadmin');
      }
    } else {
      // Handle error
      console.error('No token found in URL');
    }
  }, [navigate]);

  return <div>Authenticating...</div>;
};

export default AuthCallback;
