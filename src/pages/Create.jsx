import React, { useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import Swal from 'sweetalert2';
import "../css/Create.css";

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function Create() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [attributes, setAttributes] = useState([{ name: 'Phân loại', tags: [] }]);
    const [images, setImages] = useState([]);
    const [productDescription, setProductDescription] = useState('');

    const handleDelete = (i, attrIndex) => {
        const newAttributes = [...attributes];
        newAttributes[attrIndex].tags = newAttributes[attrIndex].tags.filter((tag, index) => index !== i);
        setAttributes(newAttributes);
    };

    const handleAddition = (tag, attrIndex) => {
        const newAttributes = [...attributes];
        newAttributes[attrIndex].tags = [...newAttributes[attrIndex].tags, tag];
        setAttributes(newAttributes);
    };

    const addAttribute = () => {
        Swal.fire({
            title: 'Nhập tên đặc tính',
            input: 'text',
            inputPlaceholder: 'Ví dụ: Kích cỡ, Màu sắc',
            showCancelButton: true,
            confirmButtonText: 'Thêm',
            cancelButtonText: 'Hủy',
            preConfirm: (attributeName) => {
                if (!attributeName) {
                    Swal.showValidationMessage('Tên đặc tính không được bỏ trống');
                } else {
                    return attributeName;
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setAttributes([...attributes, { name: result.value, tags: [] }]);
            }
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setImages([...images, ...newImages]);
    };

    const handleImageRemove = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProductData = {
            productName,
            productPrice,
            attributes,
            images,
            productDescription,
        };
        console.log(newProductData);
        Swal.fire({
            title: 'Sản phẩm đã được tạo!',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        setProductName('');
        setProductPrice('');
        setAttributes([{ name: 'Phân loại', tags: [] }]);
        setImages([]);
        setProductDescription('');
    };

    return (
        <div className="create-container content-container">
            <h1>Thêm sản phẩm</h1>
            <form onSubmit={handleSubmit} className="create-content">
                <div className="product-info">
                    <label htmlFor="product-name">Tên sản phẩm</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                        id="product-name"
                        className="product-name"
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
                {attributes.map((attribute, index) => (
                    <div key={index} className="product-info">
                        <label>{attribute.name}</label>
                        <ReactTags
                            tags={attribute.tags}
                            handleDelete={(i) => handleDelete(i, index)}
                            handleAddition={(tag) => handleAddition(tag, index)}
                            delimiters={delimiters}
                            className="tag-input"
                        />
                    </div>
                ))}
                <button type="button" onClick={addAttribute} className="add-attribute-btn">
                    Thêm đặc tính
                </button>
                <div className="product-info image-upload-section">
                    <label htmlFor="product-images">Ảnh sản phẩm</label>
                    <input
                        type="file"
                        id="product-images"
                        multiple
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                    <label htmlFor="product-images" className="image-upload-label">
                        Chọn ảnh
                    </label>
                    <div className="image-previews">
                        {images.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image} alt={`Product Preview ${index + 1}`} />
                                <div className="image-item__btn-wrapper">
                                    <button type="button" onClick={() => handleImageRemove(index)}>
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="product-info">
                    <label>Mô tả sản phẩm</label>
                    <textarea
                        cols={50} rows={4}
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                        className="product-desc product-info"
                    />
                </div>
                <div className="create-submit">
                    <button type="submit" className="submit-btn">Tạo sản phẩm</button>
                </div>
            </form>
        </div>
    );
}

export default Create;
