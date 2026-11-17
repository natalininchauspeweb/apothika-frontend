import ButtonGamified from './ButtonGamified';

const ProductCard = ({ titulo, categoria, puntos, imagenUrl, onCanjear }) => {
  return (
    <div className="tarjeta-producto">
      {/* 1. Imagen */}
      <img src={imagenUrl} alt={titulo} className="tarjeta-imagen" />
      
      {/* 2. Textos */}
      <div className="tarjeta-contenido">
        <p className="tarjeta-categoria">{categoria}</p>
        <h3 className="tarjeta-titulo">{titulo}</h3>
      </div>

      {/* 3. Footer con precio y botón */}
      <div className="tarjeta-footer">
        <span className="badge-puntos">🪙 {puntos} pts</span>
        <ButtonGamified texto="Canjear" onClick={onCanjear} />
      </div>
    </div>
  );
};

export default ProductCard;