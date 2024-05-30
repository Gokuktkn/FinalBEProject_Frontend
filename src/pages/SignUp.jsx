import React, { useState } from 'react';
import '../css/SignForm.scss';
import '../css/Auth.css';
import NavForm from '../components/NavForm';
import { useNavigate } from 'react-router-dom';

const mockUsers = [
  { email: 'user1@example.com', password: 'password1' },
  { email: 'user2@example.com', password: 'password2' }
];

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Commented out API call
    // try {
    //     const formData = new FormData();
    //     formData.append('name', name);
    //     formData.append('email', email);
    //     formData.append('password', password);
    //     formData.append('avatar', avatar);

    //     const response = await axios.post('https://api.example.com/register', formData);
    //     if (response.data.success) {
    //         alert('Đăng ký thành công');
    //         navigate('/login');
    //     } else {
    //         setError('Email đã tồn tại');
    //     }
    // } catch (err) {
    //     setError('Có lỗi xảy ra, vui lòng thử lại');
    // } finally {
    //     setLoading(false);
    // }

    setTimeout(() => {
      const existingUser = mockUsers.find(user => user.email === email);
      if (existingUser) {
        setError('Email đã tồn tại');
      } else {
        // api create new user here
        mockUsers.push({ email, password });
        localStorage.setItem('user', JSON.stringify(
          {
            username: "Little John",
            role: "user"
          }
        ));
        // api get new user here

        // api create token from new user here
        localStorage.setItem('token', "somethinghere");
        localStorage.setItem('refreshToken', "somewherehere");
        localStorage.removeItem('cart');
        navigate('/');
      }
      setLoading(false);
    }, 1000); // Giả lập độ trễ khi đăng ký
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
