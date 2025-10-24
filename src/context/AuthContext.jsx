import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '@/modules/auth/services/authService';
import { apiClient, setupInterceptors } from '@/api';

const AuthContext = createContext({
  auth: null,
  loading: true,
  accessErrorMessages: null,
  email: '',
  login: () => {},
  logout: () => {},
  setAccessErrorMessages: () => {},
  setEmail: () => {},
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // { user, accessToken }
  const [loading, setLoading] = useState(true);
  const [accessErrorMessages, setAccessErrorMessages] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setupInterceptors(logout, setAuth);
    checkSession();
  }, []);

  // const addUserAndToken = (accessToken, user) => {

  // }

  const checkSession = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;

    try {
      if (accessToken && user) {
        setAuth({
          accessToken,
          user,
        });
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return;
      }

      const { token: newAccessToken, user: newUser } = await authService.renewToken();
      setAuth({
        accessToken: newAccessToken,
        user: newUser,
      });
      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
    } catch (error) {
      console.log('Error checkSession', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      delete apiClient.defaults.headers.common['Authorization'];
      setAuth(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (accessToken, user) => {
    try {
      setAuth({
        accessToken,
        user,
      });
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } catch (error) {
      console.error('No se pudo iniciar la sesión correctamente', error);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const response = await authService.logout();
      console.log(response.msg);
    } catch (error) {
      console.log(error.message);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      delete apiClient.defaults.headers.common['Authorization'];
      setAuth(null);
      setLoading(false);
    }
  };

  const contextValue = useMemo(
    () => ({
      auth,
      loading,
      accessErrorMessages,
      email,
      login,
      logout,
      setAccessErrorMessages,
      setEmail,
    }),
    [auth, loading, accessErrorMessages, email]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
