import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../css/ChangePassword.css";

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate passwords
        if (newPassword !== confirmPassword) {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mật khẩu xác nhận không khớp!',
            });
            return;
        }

        // Simulate API call to change password
        setTimeout(() => {
            // Check old password (mock check)
            if (oldPassword === 'currentPassword') { // Replace with actual current password check
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Thay đổi mật khẩu thành công!',
                }).then(() => {
                    navigate('/');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Mật khẩu cũ không đúng!',
                });
            }
            setLoading(false);
        }, 1000); // Simulate delay for updating
    };

    return (
        <div className="change-password-container content-container">
            <h2>Thay Đổi Mật Khẩu</h2>
            <form onSubmit={handleChangePassword}>
                <div className="input-group">
                    <label htmlFor="oldPassword">Mật khẩu cũ</label>
                    <input
                        type="password"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="newPassword">Mật khẩu mới</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Đang thay đổi...' : 'Thay đổi mật khẩu'}
                </button>
            </form>
        </div>
    );
}

export default ChangePassword;
