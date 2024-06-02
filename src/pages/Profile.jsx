import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../css/ProfileUpdate.css';
import { useNavigate } from 'react-router-dom';

const ProfileUpdate = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [username, setUsername] = useState(user.username)
  const [avatarUrl, setAvatarUrl] = useState(user.profile_picture)
  const [avatar, setAvatar] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setUsername(e.target.value)
  };

  useEffect(() => {
    if(!localStorage.getItem('user') || !localStorage.getItem('token')) {
      navigate('/')
    }
  })

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file)
    if (file && file.type.startsWith('image/')) {
      const avatarURL = URL.createObjectURL(file);
      setAvatarUrl(avatarURL);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token')

      const formData = new FormData();
      if (file) {
        formData.append('avatar', avatar, avatar.name)
      }
      formData.append('email', user.email)
      formData.append('username', username)


      const response = await fetchIMG('/user/update/profile', 'PUT', formData, token);


      if (response.status === 201) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
        setLoading(false)
        navigate(0)
      } else {
        setError('Thay đổi không thành công');
        setLoading(false)
      }
    } catch (err) {
      setError('Có lỗi xảy ra, vui lòng thử lại');
      setLoading(false)
    }
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
          <label htmlFor="avatar">Avatar</label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>
        {avatar && (
          <div className="avatar-preview">
            <img src={avatarUrl} alt="Avatar Preview" />
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
