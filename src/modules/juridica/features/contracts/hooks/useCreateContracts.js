import { useState } from "react"

export const useCreateContracts = () => {
   const [contractRegister, setContractRegister] = useState({});
   const [isError, setIsError] = useState(false);
   const [modalMessage, setModalMessage] = useState('');
   


  return (
    <div>useCreateContracts</div>
  )
}