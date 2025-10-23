import { GlobalButton, GlobalInput } from '@/components';
import { useCreateOvertimes } from '../hooks/useCreateOvertimes';

export const CreateOvertimesPage = () => {
  const {
    registerHoras,
    handleSubmitHoras,
    resetHoras,
    errorsHoras,
    onClickBack,
  } = useCreateOvertimes();

  return (
    <>
      <GlobalButton variant="back" className="p-1.5 w-30" onClick={onClickBack}>
        Regresar
      </GlobalButton>
      <div className="flex flex-col items-center">
        <h2 className="text-epaColor1 text-4xl font-extrabold pt-2 pb-4">
          Registro de Horas Extra
        </h2>
        <form
          onSubmit={handleSubmitHoras()}
          className="flex flex-col gap-5 bg-white p-5 w-1/2 rounded-xl shadow-2xl"
        >
          <div>
            <GlobalInput
              as="select"
              label="Funcionario"
              data="FuncionarioAsignado"
              register={registerHoras}
              errors={errorsHoras}
              rules={{
                required: 'Debe Seleccionar un Funcionario',
              }}
            >
              <option value="">Seleccione un funcionario</option>
              {/* {funcionarios.map((f) => (
                <option key={f._id} value={f_id}>
                  {f.nombre_completo}
                </option>
              ))} */}
            </GlobalInput>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex justify-between items-center">
              <GlobalInput
                type="date"
                label="Fecha Inicio Trabajo"
                data="fecha_inicio_trabajo"
                classNameLabel="flex flex-col w-3/4"
                register={registerHoras}
                errors={errorsHoras}
                rules={{
                  required: 'Campo Obligatorio',
                }}
              />
              <GlobalInput
                type="checkbox"
                label="Festivo"
                data="es_festivo_Inicio"
                register={registerHoras}
                errors={errorsHoras}
              />
            </div>
            <GlobalInput
              type="time"
              label="Hora Inicio Trabajo"
              data="hora_inicio_trabajo"
              register={registerHoras}
              errors={errorsHoras}
              rules={{
                required: 'Campo Obligatorio',
              }}
            />
            <div className="flex justify-between items-center">
              <GlobalInput
                type="date"
                label="Fecha Fin Trabajo"
                data="fecha_fin_trabajo"
                classNameLabel="flex flex-col w-3/4"
                register={registerHoras}
                errors={errorsHoras}
                rules={{
                  required: 'Campo Obligatorio',
                }}
              />
              <GlobalInput
                type="checkbox"
                label="Festivo"
                data="es_festivo_Fin"
                register={registerHoras}
                errors={errorsHoras}
              />
            </div>
            <GlobalInput
              type="time"
              label="Hora Fin Trabajo"
              data="hora_fin_trabajo"
              register={registerHoras}
              errors={errorsHoras}
              rules={{
                required: 'Campo Obligatorio',
              }}
            />
            <GlobalInput
              type="date"
              label="Fecha Inicio Descanso"
              data="fecha_inicio_descanso"
              register={registerHoras}
              errors={errorsHoras}
              rules={{
                required: 'Campo Obligatorio',
              }}
            />
            <GlobalInput
              type="time"
              label="Hora Inicio Descanso"
              data="hora_inicio_descanso"
              register={registerHoras}
              errors={errorsHoras}
              rules={{
                required: 'Campo Obligatorio',
              }}
            />
            <GlobalInput
              type="date"
              label="Fecha Fin Descanso"
              data="fecha_fin_descanso"
              register={registerHoras}
              errors={errorsHoras}
              rules={{
                required: 'Campo Obligatorio',
              }}
            />
            <GlobalInput
              type="time"
              label="Hora Fin Descanso"
              data="hora_fin_descanso"
              register={registerHoras}
              errors={errorsHoras}
              rules={{
                required: 'Campo Obligatorio',
              }}
            />
          </div>
          <GlobalInput
            as="textarea"
            type="text"
            label="Observaciones"
            data="observaciones"
            classNameComponent="border border-gray-500 rounded-md p-1 resize-none"
            register={registerHoras}
            errors={errorsHoras}
          />
          <GlobalButton type="submit" className="p-1.5 w-1/2 block mx-auto">
            Registrar
          </GlobalButton>
        </form>
      </div>
    </>
  );
};
