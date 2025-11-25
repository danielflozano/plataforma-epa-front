import { useEffect, useState } from "react"
import { historicalServices } from "../services";

export const useHistorical = () => {
    const [cleanContracts, setCleanContracts] = useState([]);
    const [objetoExpandido, setObjetoExpandido] = useState(null);
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false);

    const closeModal = () => setModal(false);

    useEffect(() => {
        getCleanContracts()
    }, [])

    const getCleanContracts = async () => {
        setLoading(true);
        try {
            const response = await historicalServices.getCleanContracts();
            setCleanContracts(response)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return{
        //Properties
        cleanContracts,
        loading,
        modal,
        objetoExpandido,

        //Methods
        closeModal,
        setObjetoExpandido,
    };
}