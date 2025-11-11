import { apiClient } from "@/api"
import { handleAxiosError } from "@/utils"

export const contractsServices =  {
  createContracts: async (contractsData) => {
    try {
        const response = await apiClient.post('/contrato/crearContrato', contractsData);
        console.log(response.data.message);
        return response.data;
    }catch (error) {
        throw new Error(handleAxiosError(error, 'Error creando contrato ❌'));
    }
  },

  getAllContracts: async () => {
    try {
        const response = await apiClient.get('/contrato/filtro');
        return response;
    }catch (error) {
        throw new Error(handleAxiosError(error, 'Error listando contratos ❌'));
    }
  },

  updateContracts: async (id, data) => {
    try {
        const response = await apiClient.put(`/contrato/${id}`, data);
        console.log(response.data.message);
        return response.data
    }catch (error){
        throw new Error(handleAxiosError(error, 'Error actualizando contrato ❌'))
    }
  },


  getAllProcess: async () => {
    try {
      const response = await apiClient.get('/procesos/');
      return response.data
    } catch (error) {
      throw new Error(error, "Error listando los procesos ❌");
      
    }
  }
}