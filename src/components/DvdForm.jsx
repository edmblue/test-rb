import React from 'react';

const DvdForm = ({ handleChange }) => {
  return (
    <>
      <div className="flex justify-between gap-4">
        <label htmlFor="size" className="font-bold">
          Size (MB)
        </label>
        <input
          type="number"
          id="size"
          name="size"
          onChange={handleChange}
          className="border-black border-2 rounded  px-2"
        />
      </div>
      <p className="font-bold mt-4">Please provide disk space on MB</p>
    </>
  );
};

export default DvdForm;
