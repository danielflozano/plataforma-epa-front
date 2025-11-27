import { DashboardCards } from '@/components';
import { useAseoDashboard } from '../hooks';

export const AseoDashboardPage = () => {
  const { totalRecords, workers } = useAseoDashboard();

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-epaColor1 text-center text-4xl font-extrabold mt-15">
        Pagina de Inicio Aseo
      </h2>
      <div className="flex flex-col gap-20 justify-center items-center h-full">
        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col bg-white w-96 h-64 p-8 rounded-2xl shadow-2xl shadow-epaColor2">
            <h4 className="text-xl text-epaColor1 font-semibold">
              Funcionarios Registrados
            </h4>
            <div className="flex flex-col justify-center h-full">
              <p className="text-5xl text-epaColor1 text-center font-extrabold">
                {workers.length}
              </p>
            </div>
          </div>
          <DashboardCards title="Registro Total de Horas">
            <p className="text-5xl text-epaColor1 text-center font-extrabold">
              {totalRecords}
            </p>
          </DashboardCards>
        </div>
      </div>
    </div>
  );
};
