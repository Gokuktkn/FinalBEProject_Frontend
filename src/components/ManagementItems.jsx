import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

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
            <td className="action-buttons">
                <button className="icon-button del-button" onClick={() => onDelete(product.id)}><MdDelete className='management-icon'/></button>
                <button className="icon-button edit-button" onClick={handleEdit}><FaEdit className='management-icon'/></button>
            </td>
        </tr>
    );
}

export default ManagementItems;
