import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/ProductPage.scss';

const ProductPage = () => {
  const { category } = useParams();
  let categoryName = "";
  const [products, setProducts] = useState([]);

  const allProducts = [
    { id: 1, name: 'Táo', category: 'fruits', description: 'Táo đỏ sạch', price: '50,000 VND' },
    { id: 2, name: 'Cam', category: 'fruits', description: 'Cam tươi ngon', price: '30,000 VND' },
    { id: 3, name: 'Cải bó xôi', category: 'vegetables', description: 'Rau cải bó xôi', price: '20,000 VND' },
    { id: 4, name: 'Thịt bò', category: 'meats', description: 'Thịt bò sạch', price: '150,000 VND' },
    { id: 5, name: 'Tôm', category: 'seafood', description: 'Tôm sạch', price: '200,000 VND' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      // Uncomment and replace with actual API call
      // const response = await fetch(`https://api.example.com/products?category=${category}`);
      // const data = await response.json();

      let filteredProducts = allProducts; // Use mock data for now
      if (category && category !== 'all') {
        filteredProducts = allProducts.filter(product => product.category === category);
      }
      setProducts(filteredProducts);
    };
    fetchProducts();
  }, [category]);

  switch (category) {
    case "fruits":
      categoryName = "Hoa quả sạch";
      break;
    case "vegetables":
      categoryName = "Rau sạch";
      break;
    case "meats":
      categoryName = "Thịt sạch";
      break;
    case "seafood":
      categoryName = "Hải sản sạch";
      break;
    default:
      categoryName = "Tất cả";
      break;
  }

  return (
    <div className="product-page">
      <h1>{categoryName === 'all' ? 'Tất cả sản phẩm' : `Sản phẩm: ${categoryName}`}</h1>
      <div className="products-container">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-link">
            <div className="product-card">
              <img src={"/qua/bo.png"} alt={product.name} className="product-image" />
              <div className="product-details">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
