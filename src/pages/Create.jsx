import React, { useState } from 'react';
import "../css/Create.css"

function Create() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productTypes, setProductTypes] = useState(['']);
    const [productImage, setProductImage] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productFeatures, setProductFeatures] = useState('');

    const handleTypeChange = (index, value) => {
        const newProductTypes = [...productTypes];
        newProductTypes[index] = value;
        setProductTypes(newProductTypes);
    };

    const addProductType = () => {
        setProductTypes([...productTypes, '']);
    };

    const removeProductType = (index) => {
        const newProductTypes = productTypes.filter((_, i) => i !== index);
        setProductTypes(newProductTypes);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý gửi dữ liệu
        const newProductData = {
            productName,
            productPrice,
            productTypes,
            productImage,
            productDescription,
            productFeatures,
        };
        console.log(newProductData);
        // Đặt lại các trường
        setProductName('');
        setProductPrice('');
        setProductTypes(['']);
        setProductImage('');
        setProductDescription('');
        setProductFeatures('');
    };

    return (
        <div className='create-container content-container'>
            <h2>Create New Product</h2>
            <form onSubmit={handleSubmit} className='create-content'>
                <div className="product-info">
                    <label htmlFor='product-name'>Tên sản phẩm</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                        id='product-name'
                        className='product-name'
                    />
                </div>
                <div className="product-info">
                    <label htmlFor="price">Giá sản phẩm</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="product-info">
                    <label>Phân loại</label>
                    {productTypes.map((type, index) => (
                        <div key={index} className="product-type">
                            <input
                                type="text"
                                value={type}
                                onChange={(e) => handleTypeChange(index, e.target.value)}
                                required
                                placeholder="Nhập loại sản phẩm"
                            />
                            {index > 0 && (
                                <button type="button" onClick={() => removeProductType(index)}>
                                    Bỏ
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addProductType} className="add-type-btn">
                        Thêm loại
                    </button>
                </div>
                <div className="product-info">
                    <label>Ảnh sản phẩm</label>
                    <input
                        type="file"
                        onChange={(e) => setProductImage(e.target.files[0])}
                        accept="image/*"
                        className='product-img'
                    />
                </div>
                <div className="product-info">
                    <label>Mô tả sản phẩm</label>
                    <textarea
                        cols={50} rows={4}
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                        className='product-desc product-info'
                    />
                </div>
                <div className="product-info">
                    <label>Đặc điểm nổi bật của sản phẩm</label>
                    <textarea
                        cols={50} rows={10}
                        value={productFeatures}
                        onChange={(e) => setProductFeatures(e.target.value)}
                        required
                        className='product-feature product-info'
                    />
                </div>
                <div className="create-submit">
                    <button type="submit" className='submit-btn'>Tạo sản phẩm</button>
                </div>
            </form>
        </div>
    );
}

export default Create;
