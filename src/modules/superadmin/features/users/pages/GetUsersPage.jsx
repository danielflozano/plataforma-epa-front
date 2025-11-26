import { FilterInput, GlobalButton } from '@/components';
import { useBackNavigation } from '@/hooks';
import { ArrowLeft } from 'lucide-react';
import { useGetUsers } from '../hooks/useGetUsers';
import { UsersTable } from '../components';

export const GetUsersPage = () => {
  const { onClickBack } = useBackNavigation();
  const {
    // Properties
    filterValue,

    // Methods
    handleKeyDown,
    handleSearch,
    setFilterValue,
  } = useGetUsers();

  return (
    <>
      <GlobalButton
        variant="back"
        className="flex w-30 p-1.5 mb-3"
        onClick={onClickBack}
      >
        <ArrowLeft className="ml-0.5 mr-2 -left-0.5" />
        Regresar
      </GlobalButton>
      <div className="flex flex-col gap-4">
        <h2 className="text-epaColor1 text-center text-4xl font-extrabold">
          Usuarios
        </h2>
        <FilterInput
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          handleKeyDown={handleKeyDown}
          handleSearch={handleSearch}
          placeholder="Buscar por identificación"
        />
        <UsersTable/>
      </div>
    </>
  );
};
