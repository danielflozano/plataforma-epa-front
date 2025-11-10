import { useEffect, useState } from 'react';
import { contractsServices } from '../services';

export const useGetContracts = () => {
  const [loading, setLoading] = useState(false);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    getAllContracts();
  }, []);

  const getAllContracts = async () => {
    setLoading(true);
    try {
      const response = await contractsServices.getAllContracts();
      setContracts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    contracts,
    loading,
  };
};
