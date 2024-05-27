import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import "../css/Update.css";

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
        // try {
        //     const response = await axios.get(`https://api/products/${productId}`);
        //     setProduct(response.data);
        // } catch (err) {
        //     setError('Sản phẩm không tồn tại');
        //     setProduct(null);
        // } finally {
        //     setLoading(false);
        // }
        setTimeout(() => {
            const foundProduct = productsList.find((prod) => prod.id === productId);
            if (foundProduct) {
                setProduct(foundProduct);
            } else {
                setError('Sản phẩm không tồn tại');
                setProduct(null);
            }
            setLoading(false);
        }, 1000); // Giả lập độ trễ khi tìm kiếm
    };

    const handleSearchByName = async () => {
        setLoading(true);
        setError('');
        // try {
        //     const response = await axios.get(`https://api/products?name=${searchTerm}`);
        //     setProduct(response.data);
        // } catch (err) {
        //     setError('Sản phẩm không tồn tại');
        //     setProduct(null);
        // } finally {
        //     setLoading(false);
        // }
        setTimeout(() => {
            const foundProduct = productsList.find((prod) => prod.name === searchTerm);
            if (foundProduct) {
                setProduct(foundProduct);
            } else {
                setError('Sản phẩm không tồn tại');
                setProduct(null);
            }
            setLoading(false);
        }, 1000); // Giả lập độ trễ khi tìm kiếm
    };

    const handleUpdate = async () => {
        setLoading(true);
        // try {
        //     await axios.put(`https://api/products/${product.id}`, product);
        //     alert('Cập nhật sản phẩm thành công');
        // } catch (err) {
        //     setError('Có lỗi xảy ra khi cập nhật sản phẩm');
        // } finally {
        //     setLoading(false);
        // }
        setTimeout(() => {
            const updatedProductIndex = productsList.findIndex((prod) => prod.id === product.id);
            if (updatedProductIndex !== -1) {
                productsList[updatedProductIndex] = { ...product };
                alert('Cập nhật sản phẩm thành công');
            } else {
                setError('Có lỗi xảy ra khi cập nhật sản phẩm');
            }
            setLoading(false);
        }, 500); // Giả lập độ trễ khi cập nhật
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    return (
        <div className="update-container content-container">
            <h2>Cập Nhật Sản Phẩm</h2>
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Nhập tên sản phẩm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearchByName} disabled={loading}>
                    {loading ? 'Đang tìm...' : 'Tìm kiếm'}
                </button>
            </div>
            {error && <p className="error">{error}</p>}
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
