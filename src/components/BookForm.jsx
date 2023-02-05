import React from 'react';

const BookForm = ({ handleChange }) => {
  return (
    <>
      <div className="flex justify-between gap-4">
        <label htmlFor="weight" className="font-bold">
          Weight (KG)
        </label>
        <input
          type="number"
          id="weight"
          name="weight"
          onChange={handleChange}
          className="border-black border-2 rounded  px-2"
        />
      </div>
      <p className="font-bold mt-4">Please provide weight on KG</p>
    </>
  );
};

export default BookForm;
