import React, { useEffect, useState } from 'react';
import TablaHistorial from '../components/TablaHistorial';
import { apiClient } from '@/api/axios/apiClient';

const HistoricalPage = () => { 
  const [contratos, setContratos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContratos = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/datos/contratosLimpios');
        setContratos(response.data);
      } catch (err) {
        setError('Error al cargar los contratos: ' + err.message);
        console.error('Error fetching contratos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContratos();
  }, []);

  if (loading) {
    return <p>Cargando historial de contratos...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Historial de Contratos</h1>
      <TablaHistorial contratos={contratos} />
    </div>
  );
};

export default HistoricalPage; 