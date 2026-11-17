const ButtonGamified = ({ texto, onClick }) => {
  return (
    <button className="btn-gamificado" onClick={onClick}>
      {texto}
    </button>
  );
};

export default ButtonGamified;