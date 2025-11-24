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

  getAllContracts: async ({ page = 1, limit = 15, filtros = {} } = {}) => {
    try {
      const cleanFiltros = Object.entries(filtros).reduce((acc, [key, value]) => {
        if (value) {
          acc[key] = value;
        }
        return acc;
      }, {});

      const params = new URLSearchParams({
        page,
        limit,
        ...cleanFiltros
      });

      const response = await apiClient.get(`/contrato/filtro?${params.toString()}`);
      console.log('Respuesta del backend a getAllContracts (frontend):', response.data);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error listando contratos ❌'));
    }
  },

  updateContracts: async (id, data) => {
    try {
        const response = await apiClient.put(`/contrato/update/${id}`, data);
        console.log(response.data.message);
        return response.data
    }catch (error){
      console.log(error);
      
      throw new Error(handleAxiosError(error, 'Error actualizando contrato ❌'))
    }
  },

  overrideContracts: async (id) => {
    try {
      const response = await apiClient.post(`/contrato/anular/${id}`);
      console.log(response.data.message);
      return response.data
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error anulando contrato ❌'))
    }
  },


  getAllProcess: async () => {
    try {
      const response = await apiClient.get('/procesos/');
      return response.data
    } catch (error) {
      throw new Error(error, "Error listando los procesos ❌");
      
    }
  },

  getContractSummaries: async () => {
    try {
      const response = await apiClient.get('/contrato/resumen')
      return response.data
    } catch (error) {
      throw new Error(error, "Error listando el resumen ❌");
    }
  }
}