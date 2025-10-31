import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  GlobalButton,
  GlobalInput,
  LoadSpinner,
} from '@/components';
import { useCreateOvertimes } from '../hooks';
import { ExcelImportForm, RegisteredOvertimeTable } from '../components';
import { useBackNavigation } from '@/hooks';

export const CreateOvertimesPage = () => {
  const { onClickBack } = useBackNavigation();
  const {
    controlExcel,
    errorsExcel,
    errorsHoras,
    fileInputRef,
    isError,
    loading,
    modalMessage,
    openModal,
    overtimeRegister,
    sheetNames,
    workers,
    getExcelSheetNames,
    handleSubmitExcel,
    handleSubmitHoras,
    onCloseModal,
    onDeleteOvertimeRegister,
    onSubmit,
    onSubmitExcel,
    registerHoras,
  } = useCreateOvertimes();

  return (
    <>
      {loading && ( <LoadSpinner styles='fixed bg-gray-200/95' name='Importando Excel' /> )}
      <GlobalButton variant="back" className="p-1.5 w-30" onClick={onClickBack}>
        Regresar
      </GlobalButton>
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-epaColor1 text-4xl font-extrabold">
          Registro de Horas Extra
        </h2>
        <form
          onSubmit={handleSubmitHoras(onSubmit)}
          className="flex flex-col gap-4 bg-white p-4 w-1/2 rounded-xl shadow-2xl"
        >
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
            {workers.map((w) => (
              <option key={w._id} value={w._id}>
                {w.nombre_completo}
              </option>
            ))}
          </GlobalInput>
          <div className="grid grid-cols-2 gap-4">
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
            />
            <GlobalInput
              type="time"
              label="Hora Inicio Descanso"
              data="hora_inicio_descanso"
              register={registerHoras}
              errors={errorsHoras}
            />
            <GlobalInput
              type="date"
              label="Fecha Fin Descanso"
              data="fecha_fin_descanso"
              register={registerHoras}
              errors={errorsHoras}
            />
            <GlobalInput
              type="time"
              label="Hora Fin Descanso"
              data="hora_fin_descanso"
              register={registerHoras}
              errors={errorsHoras}
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
        <h3 className="text-epaColor1 text-center text-2xl font-extrabold">
          Importar Excel de Horas Extra
        </h3>
        <ExcelImportForm
          onSubmit={handleSubmitExcel(onSubmitExcel)}
          control={controlExcel}
          errors={errorsExcel}
          ref={fileInputRef}
          sheetNamesProp={sheetNames}
          getExcelSheetNamesProp={getExcelSheetNames}
        />
        <RegisteredOvertimeTable data={overtimeRegister} onDeleteSuccess={onDeleteOvertimeRegister} />
      </div>
      <Dialog open={openModal} onOpenChange={onCloseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-epaColor1 text-3xl text-center font-bold mb-2">
              {isError ? 'Error' : 'Registro Exitoso'}
            </DialogTitle>
            <DialogDescription className="text-xl text-center font-semibold mb-2">
              {modalMessage}
            </DialogDescription>
          </DialogHeader>
          <GlobalButton
            onClick={onCloseModal}
            variant="modal"
            className="p-1.5 w-1/2 block mx-auto"
          >
            Cerrar
          </GlobalButton>
        </DialogContent>
      </Dialog>
    </>
  );
};
