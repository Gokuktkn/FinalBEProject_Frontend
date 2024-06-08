import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { IoClose } from "react-icons/io5";
import "../css/UpdateProductForm.css";

const UpdateProductForm = ({ product, onUpdate, onClose }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const handleUpdate = async () => {
        setLoading(true);
        setTimeout(() => {
            // Giả lập cập nhật sản phẩm
            onUpdate(updatedProduct);
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Cập nhật sản phẩm thành công!',
            });
            setLoading(false);
        }, 500); // Giả lập độ trễ khi cập nhật
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="update-container content-container">
            <h1>Cập Nhật Sản Phẩm</h1>
            <div className="product-details">
                <div className="input-group">
                    <label htmlFor="name">Tên sản phẩm</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={updatedProduct.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="price">Giá sản phẩm</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={updatedProduct.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="description">Mô tả sản phẩm</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={5}
                        value={updatedProduct.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="update-btn-div">
                    <button onClick={handleUpdate} disabled={loading}>
                        {loading ? 'Đang cập nhật...' : 'Cập nhật sản phẩm'}
                    </button>
                </div>
            </div>
            <div className="form-close-btn-div">
                <button className='form-close-btn' onClick={handleClose}><IoClose /></button>
            </div>
        </div>
    );
};

export default UpdateProductForm;
