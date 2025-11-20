import { GlobalButton, GlobalInput } from '@/components';
import { useReports } from '../hooks';

export const ReportsPage = () => {
  const {
    // Properties
    errors,

    // Methods
    handleSubmit,
    register,
  } = useReports();

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <GlobalInput
            type="date"
            label="Fecha Inicio"
            data="fechaInicio"
            classNameLabel="flex flex-col w-[30%] max-w-150"
            classNameComponent="bg-white p-1 border-2 border-epaColor1 rounded-md text-epaColor1 focus:outline-none focus:ring focus:ring-epaColor3"
            register={register}
            errors={errors}
            rules={{
              required: 'Campo Obligatorio',
            }}
          />
          <GlobalInput
            type="date"
            label="Fecha Fin"
            data="fechaFin"
            classNameLabel="flex flex-col w-[30%] max-w-150"
            classNameComponent="bg-white p-1 border-2 border-epaColor1 rounded-md text-epaColor1 focus:outline-none focus:ring focus:ring-epaColor3"
            register={register}
            errors={errors}
            rules={{
              required: 'Campo Obligatorio',
            }}
          />
          <GlobalInput
            as="select"
            label="Tipo Operario"
            data="tipoOperario"
            classNameLabel="flex flex-col w-[30%] max-w-150"
            classNameComponent="bg-white p-1 border-2 border-epaColor1 rounded-md text-epaColor1 focus:outline-none focus:ring focus:ring-epaColor3"
            register={register}
            errors={errors}
            rules={{
              required: 'Campo Obligatorio',
            }}
          >
            <option value="">Seleccione el cargo</option>
          </GlobalInput>
        </div>
        <div className="flex justify-center gap-4">
          <GlobalButton className="w-[30%] max-w-150 p-1.5" type="submit">
            Generar Reporte
          </GlobalButton>
          <GlobalButton className="w-[30%] max-w-150 p-1.5" type="submit">
            Generar Reporte Excel
          </GlobalButton>
        </div>
      </form>
    </>
  );
};
