import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SetLoader } from '../../Redux/lodersSlice';
import { GetProducts } from '../../apicalls/products';
import { message } from 'antd';
import img from '../../Temporary/temporary.jpg';
import Divider from '../../Components/Divider';

function Home() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ status: 'Approved' });
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
  }, []);

  return (
    <div>
      <div className="grid grid-cols-5 gap-5">
        {products?.map((product) => {
          return (
            <div
              key={product._id}
              className=" border border-gray-400 rounded border-solid flex flex-col gap-5 pb-2 cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={img}
                alt={product.name}
                className="w-full h-40 object-cover"
              />{' '}
              {/* product.images[0] */}
              <div className="px-2 flex flex-col gap-1">
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
  );
}
export default Home;
