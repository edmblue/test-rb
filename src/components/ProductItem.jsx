import BookCard from './BookCard';
import DvdCard from './DvdCard';
import FrntrCard from './FrntrCard';

const ProductItem = ({ product, setDeleteList }) => {
  const { sku, name, price, type, size, height, width, length, weight } =
    product;

  const ENUM_TYPE = {
    dvd: <DvdCard size={size} />,
    furniture: <FrntrCard height={height} width={width} length={length} />,
    book: <BookCard weight={weight} />,
  };

  const handleChecked = (e) => {
    const status = e.target.checked;
    const itemSku = e.target.dataset.sku;

    if (status) {
      setDeleteList((deleteList) => [...deleteList, itemSku]);
    } else {
      setDeleteList((deleteList) =>
        deleteList.filter((item) => item != itemSku)
      );
    }
  };

  return (
    <div className="border-black border-2 text-center py-12 relative">
      <div>
        <p>{sku}</p>
        <p>{name}</p>
        <p>{price}$</p>
        {ENUM_TYPE[type]}
      </div>
      <div className="absolute top-2 left-4">
        <input
          onClick={handleChecked}
          className="delete-checkbox"
          type="checkbox"
          data-sku={sku}
        />
      </div>
    </div>
  );
};

export default ProductItem;
