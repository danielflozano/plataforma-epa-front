import { apiClient } from "@/api"
import { handleAxiosError } from "@/utils";

export const workersService = {

  createWorker: async (workerData) => {
    try {
      const response = await apiClient.post('/funcionario/crearfuncionario', workerData);
      console.log('Registro de funcionario exitoso');
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error creando funcionario ❌'));
      
    }
  },
  getAllWorkers: async () => {
    try {
      const response = await apiClient.get('/funcionario');
      console.log(response.data.message || 'Lista de funcionarios exitosa');
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error listando los funcionarios ❌'));
    }
  },

  updateWorker: async (id, workerData) => {
    try {
      const response = await apiClient.put(`./funcionario/actualizar/${id}`, workerData);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error actualizando funcionario ❌'));
    }
  },

  getWorkerById: async (id) => {
    try {
      const response = await apiClient.get(`/funcionario/obtener/${id}`)
      console.log(response.data);
      return response.data;      
    } catch (error) {
      throw new Error(handleAxiosError(error, `Error obteniendo el funcionario con id:${id} ❌`));
    }
  },

  getAllActiveWorkers: async () => {
    try {
      const response = await apiClient.get('funcionario/activos');
      console.log(response.data);    
      return response.data;      
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error obteniendo todos los funcionarios activos. ❌'));      
    }
  },  
}