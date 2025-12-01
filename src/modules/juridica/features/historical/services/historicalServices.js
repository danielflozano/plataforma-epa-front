import { apiClient } from '@/api';
import { handleAxiosError } from '@/utils';

export const historicalServices = {
  getCleanContracts: async (page = 1, limit = 15) => {
    try {
      const response = await apiClient.get('/datos/contratosLimpios', {
        params: {
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        handleAxiosError(error, 'Error listando los contratos ❌')
      );
    }
  },

  getContractsByType: async (type) => {
    try {
      const response = await apiClient.get(`/datos/filtroCon/${type}`);
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error filtrando contratos por tipo de contrato ❌'));
    }
  },

  getContractsByContractorName : async (name) => {
    try {
      const response = await apiClient.get(`/datos/contratista/${name}`);
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error filtrando contratos por nombre del contratista ❌'));
    }
  },

  getContractsByAnio: async (anio) => {
    try {
      const response = await apiClient.get(`/datos/fecha/${anio}`);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error filtrando contratos por año ❌'));
    }
  },


  getAnios:async () => {
    try {
      const response = await apiClient.get(`/datos/anios`);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error listando los años ❌'));
    }
  }
};
