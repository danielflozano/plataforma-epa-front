import { apiClient } from '@/api/axios';
import { handleAxiosError } from '@/utils';

export const overtimesService = {
  crearExtras: async (extrasData) => {
    try {
      const response = await apiClient.post('/extras/crear', extrasData);
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error creando horas extra ❌'));
    }
  },

  listarExtras: async () => {
    try {
      const response = await apiClient.get('/extras/listar');
      console.log(response.data.success);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error listando horas extra ❌'));
    }
  },

  listarExtrasPorFuncionarios: async (identificacion) => {
    try {
      const response = await apiClient.get(`/extras/funcionario/${identificacion}`);
      console.log(response.data.success);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, `Error listando horas extra del funcionario con identificacion ${identificacion}`));      
    }
  },

  listarExtrasPorFechas: async (fechaInicio, fechaFin) => {
    try {
      const response = await apiClient.get(`/extras/fechas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
      console.log(response.data.success);
      return response.data;      
    } catch (error) {
      throw new Error(handleAxiosError(error, `Error listando horas extra de ${fechaInicio} hasta ${fechaFin}`));      
    }
  },

  actualizarExtras: async () => {
    try {
      const response = await apiClient.put(`/extras/update/${id}`, data);
      console.log(response.data.message);
      return response.data
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error actualizando horas extra ❌'));
    }
  },

  eliminarExtras: async (id) => {
    try {
      const response = await apiClient.delete(`/extras/delete/${id}`);
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      throw new Error(
        handleAxiosError(error, 'Error eliminando horas extra ❌')
      );
    }
  },

  importarExtras: async (formData) => {
    try {
      const response = await apiClient.post('/extras/importar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response.data.message);
      return response.data      
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error importando horas extra ❌'));      
    }
  },

  obtenerNombreHorasExtra: async (formData) => {
    try {
      const response = await apiClient.post('/extras/sheets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response.data.success);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error obteniendo hojas de excel ❌'));
    }
  },
};
