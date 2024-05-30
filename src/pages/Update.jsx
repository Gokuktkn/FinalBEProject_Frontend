import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../css/Update.css";
import { IoSearch } from "react-icons/io5";

const productsList = [
    { id: '1', name: 'Sản phẩm 1', price: '100000', description: 'Mô tả sản phẩm 1', feature: "Đặc điểm nổi bật của sản phẩm 1" },
    { id: '2', name: 'Sản phẩm 2', price: '200000', description: 'Mô tả sản phẩm 2', feature: "Đặc điểm nổi bật của sản phẩm 2" },
    { id: '3', name: 'Sản phẩm 3', price: '300000', description: 'Mô tả sản phẩm 3', feature: "Đặc điểm nổi bật của sản phẩm 3" },
];

function Update() {
    const { id } = useParams();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [product, setProduct] = useState(location.state?.product || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!product && id) {
            handleSearchById(id);
        }
    }, [id, product]);

    const handleSearchById = async (productId) => {
        setLoading(true);
        setError('');
        setTimeout(() => {
            const foundProduct = productsList.find((prod) => prod.id === productId);
            if (foundProduct) {
                setProduct(foundProduct);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Sản phẩm không tồn tại!',
                });
                setProduct(null);
            }
            setLoading(false);
        }, 1000); // Simulate search delay
    };

    const handleSearchByName = async () => {
        setLoading(true);
        setError('');
        setTimeout(() => {
            const foundProduct = productsList.find((prod) => prod.name === searchTerm);
            if (foundProduct) {
                setProduct(foundProduct);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Sản phẩm không tồn tại!',
                });
                setProduct(null);
            }
            setLoading(false);
        }, 1000); // Simulate search delay
    };

    const handleUpdate = async () => {
        setLoading(true);
        setTimeout(() => {
            const updatedProductIndex = productsList.findIndex((prod) => prod.id === product.id);
            if (updatedProductIndex !== -1) {
                productsList[updatedProductIndex] = { ...product };
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Cập nhật sản phẩm thành công!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Có lỗi xảy ra khi cập nhật sản phẩm!',
                });
            }
            setLoading(false);
        }, 500); // Simulate update delay
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    return (
        <div className="update-container content-container">
            <h1>Cập Nhật Sản Phẩm</h1>
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Nhập tên sản phẩm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearchByName} disabled={loading}>
                    {loading ? 'Đang tìm...' : <IoSearch />}
                </button>
            </div>
            {product && (
                <div className="product-details">
                    <div className="input-group">
                        <label htmlFor="name">Tên sản phẩm</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="price">Giá sản phẩm</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="description">Mô tả sản phẩm</label>
                        <textarea
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="feature">Đặc điểm nổi bật của sản phẩm</label>
                        <textarea
                            id="feature"
                            name="feature"
                            value={product.feature}
                            onChange={handleChange}
                        />
                    </div>
                    <button onClick={handleUpdate} disabled={loading}>
                        {loading ? 'Đang cập nhật...' : 'Cập nhật sản phẩm'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Update;
