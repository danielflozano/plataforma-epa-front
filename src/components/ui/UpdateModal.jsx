import { GlobalButton } from ".";

export const UpdateModal = ({ children, title, handleSubmit, onSubmit, closeModal  }) => {
  return (
    <div className="fixed inset-0 bg-epaColor1/50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[1000px]"
      >
        <h3 className="text-epaColor1 text-3xl text-center font-extrabold">
          {title}
        </h3>
        {children}
        <div className="flex justify-end gap-2">
          <GlobalButton
            variant="modalFour"
            onClick={closeModal}
            className="p-1.5 w-30"
            type=""
          >
            Cancelar
          </GlobalButton>
          <GlobalButton
            variant="modalTwo"
            className="p-1.5 w-30"
            type="submit"
          >
            Guardar
          </GlobalButton>
        </div>
      </form>
    </div>
  );
};
