import { ArrowLeft } from 'lucide-react';
import { FilterInput, GlobalButton } from '@/components';
import { useBackNavigation } from '@/hooks';
import { useGetWorkers } from '../hooks';

export const GetWorkersPage = () => {
  const {
        // Properties
    filterValue,

    // Methods
    handleKeyDown,
    handleSearch,
    setFilterValue,
  } = useGetWorkers();
  const { onClickBack } = useBackNavigation();
  return (
    <>
      <GlobalButton
        variant="back"
        className="flex w-30 p-1.5"
        onClick={onClickBack}
      >
        <ArrowLeft className="ml-0.5 mr-2 -left-0.5" />
        Regresar
      </GlobalButton>
      <div className='flex flex-col gap-4'>
        <h2 className="text-epaColor1 text-center text-4xl font-extrabold">
          Funcionarios
        </h2>
        <FilterInput
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          handleKeyDown={handleKeyDown}
          handleSearch={handleSearch}
        />

      </div>
    </>
  );
};
