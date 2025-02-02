export default ProductCard = ({ image, title }) => {
  return (
    <div className="productcard">
      <img className="productimage" src={image} alt={title} />
      <span className="productcard-text">{title}</span>
    </div>
  );
};
