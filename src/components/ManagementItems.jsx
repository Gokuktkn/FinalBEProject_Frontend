import React from 'react';
import { useNavigate } from 'react-router-dom';

function ManagementItems({ product, onDelete }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/admin/update`, { state: { product } });
    };

    return (
        <tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td><img src={product.image} alt={product.name} width="50" /></td>
            <td>{product.price}</td>
            <td>
                <button onClick={() => onDelete(product.id)}>Xóa</button>
                <button onClick={handleEdit}>Chỉnh sửa</button>
            </td>
        </tr>
    );
}

export default ManagementItems;
