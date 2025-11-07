import { AlertModal, ConfirmModal, GlobalButton } from '@/components';
import { useBackNavigation } from '@/hooks';
import { OvertimesRecordsSection, TimesAndDatesRecorded } from '../components';
import { useGetOvertimes } from '../hooks';

export const GetOvertimesPage = () => {
  const {
    // Properties
    alertModalMessage,
    currentPage,
    errors,
    filterValue,
    loading, // TODO: Hacer algo con esto!
    openAlertModal,
    openConfirmModal,
    overtimesFilter,
    showPagination,
    state,
    totalPages,
    totalRecords,
    updateModal,

    // Methods
    closeAlertModal,
    CloseModals,
    handleDelete,
    handleKeyDown,
    handlePageChange,
    handleSearch,
    handleSubmit,
    onOpenConfirmModal,
    onSubmitUpdate,
    OpenUpdateModal,
    register,
    setFilterValue,
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
          filterValue={filterValue}
          overtimesFilter={overtimesFilter}
          handleKeyDown={handleKeyDown}
          handleSearch={handleSearch}
          OpenUpdateModal={OpenUpdateModal}
          onOpenConfirmModal={onOpenConfirmModal}
          setFilterValue={setFilterValue}
        />
        <div className="flex justify-between items-center px-4">
          <span>
            Mostrando {overtimesFilter.length} de {totalRecords} registros.
          </span>
          {showPagination && (
            <div className="flex items-center gap-2">
              <GlobalButton
                variant="modalTwo"
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 disabled:bg-gray-400"
                disabled={currentPage === 1}
              >
                Anterior
              </GlobalButton>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <GlobalButton
                variant="modalTwo"
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 disabled:bg-gray-400"
                disabled={currentPage === totalPages}
              >
                Siguiente
              </GlobalButton>
            </div>
          )}
        </div>
      </div>
      {updateModal && (
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
                onClick={CloseModals}
                className="p-1.5"
              >
                Cancelar
              </GlobalButton>
              <GlobalButton variant="modalTwo" className="p-1.5" type="submit">
                Guardar
              </GlobalButton>
            </div>
          </form>
        </div>
      )}
      <AlertModal
        openAlertModal={openAlertModal}
        closeAlertModal={closeAlertModal}
        modalTitle={state}
        modalDescription={alertModalMessage}
      />
      {openConfirmModal && (
        <ConfirmModal
          title="Confirmar Eliminación"
          content="¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer."
          onClickCancel={CloseModals}
          onClickConfirm={() => handleDelete()}
          buttonConfirmContent="Eliminar"
          variant="modalThree"
        />
      )}

    </>
  );
};
