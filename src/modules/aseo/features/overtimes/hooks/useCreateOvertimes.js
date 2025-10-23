import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export const useCreateOvertimes = () => {
  const navigate = useNavigate();

  const {
    register: registerHoras,
    handleSubmit: handleSubmitHoras,
    reset: resetHoras,
    formState: { errors: errorsHoras },
  } = useForm();

  const onClickBack = () => {
    navigate(-1);
  };

  return {
    registerHoras,
    handleSubmitHoras,
    resetHoras,
    errorsHoras,
    onClickBack,
  };
};
