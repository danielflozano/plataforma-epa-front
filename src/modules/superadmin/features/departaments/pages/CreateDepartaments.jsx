import { GlobalButton } from "@/components"
import { useBackNavigation } from "@/hooks"
import { ArrowLeft, FilePlus } from "lucide-react"
import { DepartamentsTable } from "../components";
import { useCreateDepartaments } from "../hooks";

export const CreateDepartaments = () => {
  const { departaments } = useCreateDepartaments();
  const { onClickBack } = useBackNavigation();
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
      <GlobalButton
        variant="third"
        className="flex p-1.5 w-65"
        onClick={'openUpdateModal'}
      >
        <FilePlus className="w-1/3" />
        Crear Proceso
      </GlobalButton>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-epaColor1 text-4xl font-extrabold">
          Procesos
        </h2>
        <DepartamentsTable departaments={departaments} />
      </div>
    </>
  )
}