import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../css/Management.css";
import ManagementItems from '../components/ManagementItems';
import { IoSearch } from "react-icons/io5";
import UpdateProductForm from '../components/UpdateProductForm';

const dummyProducts = [
    { id: 1, name: 'Sản phẩm 1', image: 'https://via.placeholder.com/150', price: 100000 },
    { id: 2, name: 'Sản phẩm 2', image: 'https://via.placeholder.com/150', price: 150000 },
    { id: 3, name: 'Sản phẩm 3', image: 'https://via.placeholder.com/150', price: 200000 },
    { id: 4, name: 'Sản phẩm 4', image: 'https://via.placeholder.com/150', price: 250000 },
    { id: 5, name: 'Sản phẩm 5', image: 'https://via.placeholder.com/150', price: 300000 },
];

function Management() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            // Fetch data from API
            try {
                // const response = await axios.get('/api/products');
                // setProducts(response.data);
                // setFilteredProducts(response.data);

                // Using dummy data for now
                setProducts(dummyProducts);
                setFilteredProducts(dummyProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            setFilteredProducts(products); // Nếu không có từ khóa tìm kiếm, hiển thị tất cả sản phẩm
        } else {
            const results = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredProducts(results.length > 0 ? results : []); // Nếu có kết quả, hiển thị kết quả, nếu không, hiển thị mảng rỗng
        }
    };

    const handleDelete = (productId) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa sản phẩm này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có, xóa nó!',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                // Call API to delete product
                // axios.delete(`/api/products/${productId}`)
                //     .then(() => {
                //         setProducts(products.filter(product => product.id !== productId));
                //         setFilteredProducts(filteredProducts.filter(product => product.id !== productId));
                //     })
                //     .catch(error => console.error('Error deleting product:', error));

                // Using dummy delete for now
                setProducts(products.filter(product => product.id !== productId));
                setFilteredProducts(filteredProducts.filter(product => product.id !== productId));

                Swal.fire(
                    'Đã xóa!',
                    'Sản phẩm đã được xóa.',
                    'success'
                );
            }
        });
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
    };

    const handleUpdateProduct = (updatedProduct) => {
        setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
        setFilteredProducts(filteredProducts.map(product => product.id === updatedProduct.id ? updatedProduct : product));
    };

    const handleCloseFrame = () => {
        setSelectedProduct(null);
    }

    return (
        <div className="product-management content-container">
            <h1>Quản lý sản phẩm</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Nhập tên sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}><IoSearch /></button>
            </div>
            <div className="product-list">
                {filteredProducts.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên sản phẩm</th>
                                <th>Ảnh sản phẩm</th>
                                <th>Giá sản phẩm</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map(product => (
                                <ManagementItems key={product.id} product={product} onDelete={handleDelete} onEdit={handleEdit} />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Không tìm thấy sản phẩm</p>
                )}
            </div>
            {selectedProduct && (
                <div className='update-frame'>
                    <UpdateProductForm product={selectedProduct} onUpdate={handleUpdateProduct} onClose={handleCloseFrame} />
                </div>
            )}
        </div>
    );
}

export default Management;
