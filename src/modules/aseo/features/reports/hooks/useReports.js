import { useForm } from "react-hook-form"

export const useReports = () => {

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm();

  return {
    // Properties
    errors,

    // Methods
    handleSubmit,
    register,
  }
}