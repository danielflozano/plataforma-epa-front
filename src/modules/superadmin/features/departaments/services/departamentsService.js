import { apiClient } from '@/api';
import { handleAxiosError } from '@/utils';

export const departamentsService = {
  createDepartaments: async (data) => {
    try {
      const response = await apiClient.post('/procesos/crearProceso', data);
      return response.data;
    } catch (error) {
      throw new Error(
        handleAxiosError(error, 'Error creando proceso ❌')
      );
    }
  },
  getAllDepartaments: async () => {
    try {
      const response = await apiClient.get('/procesos');
      return response.data;
    } catch (error) {
      throw new Error(
        handleAxiosError(error, 'Error obteniendo todos los procesos ❌')
      );
    }
  },
  createLocations: async (data) => {
    try {
      const response = await apiClient.post('/sede/crearsede', data);
      console.log('Sede creada con exito', response.data);
    } catch (error) {
      throw new Error(
        handleAxiosError(error, 'Error creando sede ❌')
      );
    }
  },
  getAllLocations: async () => {
    try {
      const response = await apiClient.get('/sede/listar');
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(
        handleAxiosError(error, 'Error obteniendo todas las sedes ❌')
      );
    }
  },
};
