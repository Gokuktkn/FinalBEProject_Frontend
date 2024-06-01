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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('user') !== null) {
      navigate('/')
    }
  }, [])

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    let formData = new FormData();
    if(avatar) {
      formData.append('avatar', avatar, avatar.name)
    }
    formData.append('email', email)
    formData.append('username', username)
    formData.append('password', password)
    formData.append('confirmPassword', password)

    try {
      const newUser = await fetchIMG('/user/register', 'POST', formData);
      if(newUser.status === 201) {
        localStorage.setItem('user', JSON.stringify(newUser.data.user))
        navigate(0)
      } else {
        setError('Đăng ký không thành công');
      }
    } catch (err) {
      setError('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      // TODO: TẠO TOKEN VÀ RT
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('token')
      localStorage.removeItem('cart');
      setLoading(false)
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
                onChange={(e) => setAvatar(e.target.files[0])}
              />
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
