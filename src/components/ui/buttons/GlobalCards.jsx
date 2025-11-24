export const GlobalCards = ({
  title,
  Icon, // Prop para el ícono
  onClick,
  className = 'bg-white border-1 border-epaColor1 text-center text-epaColor1 font-bold text-2xl h-40 content-center rounded-2xl cursor-pointer flex flex-col justify-center items-center gap-2',
}) => {
  return (
    <div className={className} onClick={onClick}>
      {Icon && <Icon size={40} />} {/* Muestra el ícono si existe */}
      <h3>{title}</h3>
    </div>
  );
};
