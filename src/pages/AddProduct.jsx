import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import BookForm from '../components/BookForm';
import DvdForm from '../components/DvdForm';
import FurnitureForm from '../components/FurnitureForm';
import Error from '../components/Error';
import { useEffect } from 'react';

const AddProduct = () => {
  const [productType, setProductType] = useState('');
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState();
  const navigation = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const ENUM_STATES = {
    dvd: <DvdForm handleChange={handleChange} />,
    furniture: <FurnitureForm handleChange={handleChange} />,
    book: <BookForm handleChange={handleChange} />,
  };

  const handleProduct = (e) => {
    e.preventDefault();

    inputs['type'] = { productType };

    const url = 'http://localhost/ejercicios/react_api/handleProducts.php';

    axios
      .post(url, inputs)
      .then(function (response) {
        if (response.data === 'success') {
          navigation('/');
          return;
        }
        setErrors(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <header className="flex flex-col md:flex-row justify-between px-5 border-b-black border-b-2 items-center">
        <h1 className="font-black text-4xl">Product Add</h1>
        <nav className="mb-2 flex gap-4 mt-4 md:mt-0">
          <a
            href=""
            className="border-2 rounded-xl px-6 py-2 uppercase font-bold border-black hover:bg-blue-300 hover:text-white"
            onClick={handleProduct}
          >
            Save
          </a>
          <Link
            id=""
            to="/"
            className="border-2 rounded-xl px-6 py-2 uppercase font-bold border-black hover:bg-red-300 hover:text-white"
          >
            Cancel
          </Link>
        </nav>
      </header>
      <main className="mt-10">
        {errors && <Error>{errors}</Error>}
        <form
          id="product_form"
          action=""
          className=" w-full px-5 md:px-3 md:w-1/2 lg:w-1/4 space-y-6"
        >
          <div className="flex justify-between gap-4">
            <label htmlFor="sku" className="font-bold">
              SKU
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              onChange={handleChange}
              className="border-black border-2 rounded px-2"
            />
          </div>
          <div className="flex justify-between gap-4">
            <label htmlFor="name" className="font-bold">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              className="border-black border-2 rounded px-2"
            />
          </div>
          <div className="flex justify-between gap-4">
            <label htmlFor="price" className="font-bold">
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              onChange={handleChange}
              className="border-black border-2 rounded px-2"
            />
          </div>
          <div className="flex gap-4 justify-between">
            <label htmlFor="productType" className="font-bold">
              Type Switcher
            </label>
            <select
              name="productType"
              id="productType"
              className="border-2 border-black px-6 rounded"
              onChange={(e) => {
                setProductType(e.target.value);
              }}
              defaultValue={productType}
            >
              <option value="">--- SELECT ---</option>
              <option id="dvd" value="dvd">
                DVD
              </option>
              <option id="furniture" value="furniture">
                Furniture
              </option>
              <option id="book" value="book">
                Book
              </option>
            </select>
          </div>
          <div>{ENUM_STATES[productType]}</div>
        </form>
      </main>
    </div>
  );
};

export default AddProduct;
