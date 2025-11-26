import { apiClient } from '@/api';
import { handleAxiosError } from '@/utils';

export const usersService = {
  createUsers: async (data) => {
    try {
      const response = await apiClient.post('/auth/newUser', data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error, 'Error creando usuario ❌'));
    }
  },
};
