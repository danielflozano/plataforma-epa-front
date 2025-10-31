import { GlobalButton } from '@/components';
import { useBackNavigation } from '@/hooks';
import { OvertimesRecordsSection, TimesAndDatesRecorded } from '../components';
import { useGetOvertimes } from '../hooks';

export const GetOvertimesPage = () => {
  const {
    // Properties
    errors,
    errorsFilter,
    loading,
    openUpdateModal,
    overtimes,
    selectedId,

    // Methods
    handleSubmit,
    handleSubmitFilter,
    onClickCloseEditModal,
    onClickOpenUpdateModal,
    onSubmitUpdate,
    register,
    registerFilter,
  } = useGetOvertimes();
  const { onClickBack } = useBackNavigation();

  return (
    <>
      <GlobalButton variant="back" className="p-1.5 w-30" onClick={onClickBack}>
        Regresar
      </GlobalButton>
      <div className="flex flex-col gap-4">
        <h2 className="text-epaColor1 text-center text-4xl font-extrabold">
          Registro Individual de Horas Extra
        </h2>
        <OvertimesRecordsSection
          errors={errorsFilter}
          overtimes={overtimes}
          handleSubmit={handleSubmitFilter}
          onClickOpenUpdateModal={onClickOpenUpdateModal}
          register={registerFilter}
        />
      </div>
      {openUpdateModal && (
        <div className="fixed inset-0 bg-epaColor1/50 flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmitUpdate)}
            className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-lg w-[1000px]"
          >
            <h3 className="text-epaColor1 text-2xl font-extrabold">
              Editar Horas Extra
            </h3>
            <TimesAndDatesRecorded register={register} errors={errors} />
            <div className="flex justify-end gap-2">
              <GlobalButton
                variant="modalFour"
                onClick={onClickCloseEditModal}
                className="p-1.5"
              >
                Cancelar
              </GlobalButton>
              <GlobalButton variant="modalTwo" className="p-1.5">
                Guardar
              </GlobalButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
