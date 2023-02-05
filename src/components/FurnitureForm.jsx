import React from 'react';

const FurnitureForm = ({ handleChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between gap-4">
        <label htmlFor="height" className="font-bold">
          Height (CM)
        </label>
        <input
          type="number"
          id="height"
          name="height"
          onChange={handleChange}
          className="border-black border-2 rounded px-2"
        />
      </div>
      <div className="flex justify-between gap-4">
        <label htmlFor="width" className="font-bold">
          Width (CM)
        </label>
        <input
          type="number"
          id="width"
          name="width"
          onChange={handleChange}
          className="border-black border-2 rounded px-2"
        />
      </div>
      <div className="flex justify-between gap-4">
        <label htmlFor="length" className="font-bold">
          Length (CM)
        </label>
        <input
          type="number"
          id="length"
          name="length"
          onChange={handleChange}
          className="border-black border-2 rounded  px-2"
        />
      </div>
      <p className="font-bold mt-4">
        Please provide dimensions in HxWxL format on CM
      </p>
    </div>
  );
};

export default FurnitureForm;
