import { GlobalButton } from '@/components';
import { useBackNavigation } from '@/hooks';
import { OvertimesRecordsSection, TimesAndDatesRecorded } from '../components';
import { useGetOvertimes } from '../hooks';

export const GetOvertimesPage = () => {
  const {
    // Properties
    currentPage,
    errors,
    filterValue,
    loading,
    openUpdateModal,
    overtimesFilter,
    selectedId,
    showPagination,
    totalPages,
    totalRecords,

    // Methods
    handleKeyDown,
    handlePageChange,
    handleSearch,
    handleSubmit,
    onClickCloseEditModal,
    onClickOpenUpdateModal,
    onSubmitUpdate,
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
          onClickOpenUpdateModal={onClickOpenUpdateModal}
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
