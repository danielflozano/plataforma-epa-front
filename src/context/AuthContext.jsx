import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '@/modules/auth/services/authService';
import { apiClient, setupInterceptors } from '@/api';
import { ROLES } from '@/routes/roles';

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
  const [accessErrorMessages, setAccessErrorMessages] = useState(null);
  const [auth, setAuth] = useState(null); // { user, accessToken }
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setupInterceptors(logout, setAuth);
    checkSession();
  }, []);

  // const addUserAndToken = (accessToken, user) => {

  // }

  const checkSession = async () => {
    console.log('checkSession: Iniciando revisión de sesión...');
    const accessToken = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
    console.log('checkSession: accessToken de localStorage:', accessToken ? 'Presente' : 'Ausente');
    console.log('checkSession: user de localStorage:', user);

    try {
      if (accessToken && user) {
        setAuth({
          accessToken,
          user,
        });
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        console.log('checkSession: Sesión restaurada desde localStorage.');
        return;
      }

      console.log('checkSession: No hay sesión en localStorage, intentando renovar token...');
      const { token: newAccessToken, user: newUser } = await authService.renewToken();
      setAuth({
        accessToken: newAccessToken,
        user: newUser,
      });
      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      console.log('checkSession: Token renovado y sesión establecida.');
    } catch (error) {
      console.log('Error checkSession', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      delete apiClient.defaults.headers.common['Authorization'];
      setAuth(null);
      console.log('checkSession: Sesión eliminada debido a error.');
    } finally {
      setLoading(false);
      console.log('checkSession: Finalizado.');
    }
  };

  const login = (accessToken, user) => {
    console.log('login: Intentando iniciar sesión...');
    try {
      setAuth({
        accessToken,
        user,
      });
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      console.log('login: Sesión iniciada y token establecido para:', user.rol);
      return user.rol; // Return the user's role
    } catch (error) {
      console.error('login: No se pudo iniciar la sesión correctamente', error);
      return null;
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
      // Properties
      accessErrorMessages,
      auth,
      email,
      loading,

      // Methods
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
