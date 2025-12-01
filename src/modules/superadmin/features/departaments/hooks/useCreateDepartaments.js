import { useEffect, useState } from "react";
import { departamentsService } from "../services";

export const useCreateDepartaments = () => {
  const [departaments, setDepartaments] = useState();

  useEffect(() => {
    getDepartaments();
  }, [])

  const getDepartaments = async () => {
    try {
      const response = await departamentsService.getAllDepartaments();
      setDepartaments(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return {
    // Properties
    departaments,
  }
}