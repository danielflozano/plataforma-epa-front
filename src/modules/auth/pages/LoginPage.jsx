import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { GlobalButton, GlobalInput } from '@/components';
import { AuthLayout } from '../components';
import { Profiler } from 'react';
import { onRenderCallback } from '@/profiler';
import { authRoutesList } from '@/routes';

export const LoginPage = () => {
  const { register, handleSubmit, errors, loading, apiError, onSubmit } = useLogin();

  if(loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-editColor-3"></div>
      </div>
    );
  }

  return (
    <AuthLayout title="Iniciar Sesión">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        {/* -> 8. Muestra el error de la API si existe */}
        {apiError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{apiError}</span>
          </div>
        )}

        <Profiler id="MiComponente" onRender={onRenderCallback}> {/* Se utiliza para medir el rendimiento de cada componente */}
          <GlobalInput
            label='Correo Electrónico'
            data='email'
            classNameSpan='text-epaColor1 font-medium'
            classNameComponent='w-full p-1 border border-epaColor1 rounded-md'
            register={register}
            errors={errors} 
            rules={{
              required: 'El correo electronico es obligatorio',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Correo electrónico no válido",
              }
            }}
          />
        </Profiler>

        <GlobalInput
          type='password'
          label='Contraseña'
          data='password'
          classNameSpan='text-epaColor1 font-medium'
          classNameComponent='w-full p-1 border border-epaColor1 rounded-md'
          register={register}
          errors={errors} 
          rules={{
            required: 'La contraseña es obligatoria',
            minLength: { value: 8, message: 'Minimo 8 caracteres' },
          }}
        />
        <GlobalButton type="submit" className="w-full p-1.5 mb-4">
          Iniciar Sesión
        </GlobalButton>
      </form>
      <div className="text-center">
        <p>
          ¿No recuerda su contraseña? haga click{' '}
          <Link to={ authRoutesList.initiate } className="text-blue-500 font-bold">
            Aqui
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};
