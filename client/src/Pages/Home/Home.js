import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SetLoader } from '../../Redux/lodersSlice';
import { GetProducts } from '../../apicalls/products';
import { message } from 'antd';
import img from '../../Temporary/temporary.jpg';
import Divider from '../../Components/Divider';
import Filters from './Filters';

function Home() {
  const [showFilters, setShowFilters] = useState(true);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    status: 'Approved',
    category: [],
    age: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <div className="flex gap-5">
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}

      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 items-center">
          {!showFilters && (
            <i
              className="ri-equalizer-line text-2xl cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            ></i>
          )}
          <input
            type="text"
            // id="product-search"
            placeholder="Search Products here...."
            className="border border-gray-300 rounded border-solid px-2 py-1 h-14 w-full"
          />
        </div>
        <div
          className={`
        grid gap-5 ${showFilters ? 'grid-cols-4' : 'grid-cols-5'}
      `}
        >
          {products?.map((product) => {
            return (
              <div
                key={product._id}
                className=" border border-gray-400 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img
                  src={img}
                  alt={product.name}
                  className="w-full h-52 p-5 rounded-md object-cover"
                />
                {/* product.images[0] */}
                <div className="px-5 flex flex-col">
                  <h1 className="text-lg font-semibold">{product.name}</h1>
                  <p className="text-sm">{product.description}</p>
                  <Divider />
                  <span className="text-xl font-semibold text-rose-600">
                    &#8377; {product.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Home;
