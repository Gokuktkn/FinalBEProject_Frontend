import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../css/ProfileUpdate.css';

const mockUser = {
  name: 'Little John',
  email: 'user@example.com',
  avatar: null // Placeholder, initially no avatar
};

const ProfileUpdate = () => {
  const [user, setUser] = useState(mockUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulating an API update call
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        title: 'Thành công!',
        text: 'Thông tin cá nhân đã được cập nhật!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }, 1000); // Giả lập độ trễ khi cập nhật
  };

  return (
    <div className="profile-update-container content-container">
      <h2>Cập Nhật Thông Tin Cá Nhân</h2>
      <form onSubmit={handleUpdate}>
        <div className="input-group">
          <label htmlFor="name">Họ và tên</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="avatar">Avatar</label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>
        {user.avatar && (
          <div className="avatar-preview">
            <img src={user.avatar} alt="Avatar Preview" />
          </div>
        )}
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Đang cập nhật...' : 'Cập nhật'}
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
