import { GlobalButton } from "@/components";
import { useBackNavigation } from "@/hooks";
import { OvertimesRecordsSection, TimesAndDatesRecorded } from "../components";
import { useGetOvertimes } from "../hooks";

export const GetOvertimesPage = () => {
  const {
    overtimes,
    loading,
    register,
    handleSubmit,
    errors,
    openUpdateModal,
    onSubmitUpdate,
    onClickOpenUpdateModal,
    onClickCloseEditModal,
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
        <OvertimesRecordsSection overtimes={overtimes} onClickOpenUpdateModal={onClickOpenUpdateModal}  />
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
                // variant=""
                onClick={onClickCloseEditModal}
                className="p-1.5"
              >
                Cancelar
              </GlobalButton>
              <GlobalButton
                // variant=""
                className="p-1.5"
              >
                Guardar
              </GlobalButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
};