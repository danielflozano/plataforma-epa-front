import { GlobalInput } from '@/components';

export const ModificationsContractModal = ({ register, errors }) => {
  return (
    <div>
      <div className="text-epaColor1 font-bold pt-4 text-2xl">
        <h4>Modificaciones</h4>
      </div>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            // checked={mostrar}
            // onChange={() => setMostrar(!mostrar)}
          />
          <span>Prorroga</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            // checked={mostrar}
            // onChange={() => setMostrar(!mostrar)}
          />
          <span>Adicion</span>
        </label>
      </div>
      <GlobalInput
        type="text"
        label="Identidad O Nit"
        data="identificacionOnit"
        register={register}
        errors={errors}
        rules={{
          required: 'Este campo es obligatorio',
        }}
      />
    </div>
  );
};
