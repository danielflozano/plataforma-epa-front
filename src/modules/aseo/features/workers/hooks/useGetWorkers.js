import { useAseo } from "@/modules/aseo/context";
import { useState } from "react"

export const useGetWorkers = () => {
  const { workers, getAllWorkers } = useAseo();
  const [filterValue, setFilterValue] = useState('');
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [UpdateModal, setUpdateModal] = useState(false);
  const [alertModal, setAlertModal] = useState({
    open: false,
    message: '',
    status: '',
  });
  const [selectedWorker, setSelectedWorker] = useState(null);


  const handleKeyDown = () => {

  };

  const handleSearch = () => {

  };

  return {
    // Properties
    filterValue,

    // Methods
    handleKeyDown,
    handleSearch,
    setFilterValue,
  };
}