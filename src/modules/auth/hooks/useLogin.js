import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { authService } from '../services/authService';
import { aseoRoutesList } from '@/routes';
import { ROLES } from '@/routes/roles';
import juridicaRoutesList from '@/routes/list/juridicaRoutesList';

export const useLogin = () => {
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await authService.login(data);
      console.log(response);
      const userRole = login(response.token, response.user);
      console.log('User Role:', userRole); // Add this line for debugging

      switch (userRole) {
        case ROLES.SUPER_ADMIN:
          navigate('/superadmin-dashboard'); // Redirect SuperAdmin to the new hub dashboard
          break;
        case ROLES.ADMIN_JURIDICO:
        case ROLES.USER_JURIDICO:
          navigate(juridicaRoutesList.juridicaDashboard);
          break;
        case ROLES.ADMIN_ASEO:
        case ROLES.USER_ASEO:
          navigate(aseoRoutesList.aseoDashboard);
          break;
        default:
          console.warn('Unrecognized user role:', userRole);
          navigate(authRoutesList.login);
          break;
      }
    } catch (error) {
      console.error(error);
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    // Properties
    apiError,
    errors,
    loading,

    // Methods
    handleSubmit,
    onSubmit,
    register,
  };
};
