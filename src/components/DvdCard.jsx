import React from 'react';

const DvdCard = ({ size }) => {
  return (
    <>
      <p>
        <span className="font-bold">Size: </span>
        {size} MB
      </p>
    </>
  );
};

export default DvdCard;
