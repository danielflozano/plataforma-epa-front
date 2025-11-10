import { GlobalButton } from ".";

export const ConfirmModal = ({
  title,
  content,
  onClickCancel,
  onClickConfirm,
  buttonConfirmContent,
  variant,
}) => {
  return (
    <div className="fixed inset-0 bg-epaColor1/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{content}</p>
        <div className="flex justify-end gap-2">
          <GlobalButton
            variant="modalFour"
            onClick={onClickCancel}
            className="p-1.5 w-26"
          >
            Cancelar
          </GlobalButton>
          <GlobalButton
            variant={variant}
            onClick={onClickConfirm}
            className="p-1.5 w-26"
          >
            {buttonConfirmContent}
          </GlobalButton>
        </div>
      </div>
    </div>
  );
};
