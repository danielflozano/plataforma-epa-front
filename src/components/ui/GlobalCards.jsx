export const GlobalCards = ({ title, onClick }) => {
  return (
    <div
      className="bg-white border-1 border-epaColor1 text-center text-epaColor1 font-bold text-2xl py-20 rounded-2xl cursor-pointer"
      onClick={onClick}
    >
      <h3>{title}</h3>
    </div>
  );
};
