import React, { useEffect, useState } from 'react';
import '../css/SignForm.scss';
import '../css/Auth.css';
import NavForm from '../components/NavForm';
import { useNavigate } from 'react-router-dom';
import { fetchAPI, fetchIMG } from '../../fetchApi.js';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('')
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      navigate('/')
    }
  }, [])

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Lấy tệp đầu tiên từ mảng tệp
    setAvatar(e.target.files[0])
    console.log(file)
    if (file && file.type.startsWith('image/')) {
      const avatarURL = URL.createObjectURL(file); // Tạo URL cho tệp được chọn
      setAvatarUrl(avatarURL); // Lưu URL vào state
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    let formData = new FormData();
    if (avatar) {
      formData.append('avatar', avatar, avatar.name)
    }
    formData.append('email', email)
    formData.append('username', username)
    formData.append('password', password)

    try {
      const response = await fetchIMG('/user/register', 'POST', formData);
      if (response.status === 201) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        localStorage.removeItem('cart');
        setLoading(false)
        navigate(0)
      } else {
        setError('Đăng ký không thành công');
      }
    } catch (err) {
      setError('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <div className="log-form-container">
      <div className="log-form">
        <div className="nav-top">
          <NavForm />
        </div>
        <div className="auth-container">
          <h2>Đăng ký</h2>
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label htmlFor="name">Họ và tên</label>
              <input
                type="text"
                id="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="avatar">Avatar</label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="image-previews">
              {avatar && (
                <div className="image-item avatar-preview">
                  <img src={avatarUrl} alt='Avatar Preview' />
                </div>
              )}
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
