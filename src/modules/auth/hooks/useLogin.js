import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { authService } from '../services/authService';
import { aseoRoutesList } from '@/routes';

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

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
      login(response.token, response.user);
      navigate(aseoRoutesList.aseoDashboard);
    } catch (error) {
      console.error(error);
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    loading,
    apiError,
    onSubmit,
  };
};
