import { useAseo } from "@/modules/aseo/context"

export const useAseoDashboard = () => {
  const { totalRecords, workers,  } = useAseo();

  return {
    totalRecords,
    workers,
  }
}