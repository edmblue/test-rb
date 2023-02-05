import ProductItem from '../components/ProductItem';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [cleanProducts, setCleanProducts] = useState([]);
  const [deleteList, setDeleteList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    cleanData();
  }, [productos]);

  const getData = async () => {
    const url = 'http://localhost/ejercicios/react_api/handleProducts.php';

    try {
      const response = await fetch(url);
      const result = await response.json();
      setProductos(result);
    } catch (error) {
      console.log(error);
    }
  };

  const cleanData = () => {
    setCleanProducts(() => {
      return productos.map((obj) =>
        Object.keys(obj)
          .filter((e) => obj[e] !== null)
          .reduce((o, e) => {
            o[e] = obj[e];
            return o;
          }, {})
      );
    });
  };

  const handleMassDelete = (e) => {
    e.preventDefault();

    const url = 'http://localhost/ejercicios/react_api/delete.php';

    axios
      .post(url, deleteList)
      .then(function (response) {
        if (response.data == 'success') {
          getData();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <header className="flex justify-between px-5 border-b-black border-b-2 items-center flex-col md:flex-row">
        <h1 className="font-black text-4xl">Product List</h1>
        <nav className="mb-2 flex gap-4 mt-3 md:mt-0">
          <Link
            to="/add-product"
            className="border-2 rounded-xl px-6 py-2 uppercase font-bold border-black hover:bg-blue-300 hover:text-white"
          >
            Add
          </Link>
          <a
            id="delete-product-btn"
            href=""
            onClick={handleMassDelete}
            className="border-2 rounded-xl px-6 py-2 uppercase font-bold border-black hover:bg-red-300 hover:text-white"
          >
            Mass Delete
          </a>
        </nav>
      </header>
      <main className="grid sm:grid-cols-2 md:grid-cols-4 gap-x-14 gap-y-7 mt-8 px-8 py-2">
        {cleanProducts.length > 0 ? (
          cleanProducts.map((product) => {
            return (
              <ProductItem
                key={product.id}
                product={product}
                setDeleteList={setDeleteList}
              />
            );
          })
        ) : (
          <p className="text-center text-3xl font-black text-red-300">
            Please add some products!
          </p>
        )}
      </main>
    </div>
  );
};

export default ProductList;
