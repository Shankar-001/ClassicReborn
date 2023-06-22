import { Button, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import ProductsForm from './ProductsForm';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../../Redux/lodersSlice';
import { GetProducts } from '../../../apicalls/products';

function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts();
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.products);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'How old is the product?',
      dataIndex: 'age',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <div className="flex gap-5">
            <i
              className="ri-file-edit-line"
              style={{ fontSize: '20px' }}
              onClick={() => {
                setSelectedProduct(record);
                setShowProductForm(true);
              }}
            ></i>
            <i
              className="ri-delete-bin-2-line"
              style={{ fontSize: '20px' }}
            ></i>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-5">
        <Button type="default" onClick={() => setShowProductForm(true)}>
          Add Product
        </Button>
      </div>

      <Table columns={columns} dataSource={products} />

      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
          getData={getData}
        />
      )}
    </div>
  );
}
export default Products;
