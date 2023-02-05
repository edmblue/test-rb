import React from 'react';

const FrntrCard = ({ height, width, length }) => {
  return (
    <>
      <p>
        <span className="font-bold">HxWxL: </span>
        {`${Number(height).toFixed(0)}x${Number(width).toFixed(0)}x${Number(
          length
        ).toFixed(0)}`}
      </p>
    </>
  );
};

export default FrntrCard;
