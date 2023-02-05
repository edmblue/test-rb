const BookCard = ({ weight }) => {
  return (
    <>
      <p>
        <span className="font-bold">Weight: </span>
        {weight} KG
      </p>
    </>
  );
};

export default BookCard;
