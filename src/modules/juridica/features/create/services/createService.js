import { apiClient } from '@/api';
import { handleAxiosError } from '@/utils';

export const createService = {
  createContracts: async (contractData) => {
    try {
        const response = await apiClient.post('/contrato/crearContrato', contractData);
        console.log(response.data.message);
        return response.data;
    }catch (error) {
        throw new Error(handleAxiosError(error,'Error creando contrato ❌'));
    }
  }
}