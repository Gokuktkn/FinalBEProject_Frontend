import React, { useState } from 'react'
import '../css/SignForm.scss'
import "../css/Auth.css"
import NavForm from '../components/NavForm'
import { useNavigate } from 'react-router-dom';

const mockUsers = [
    { email: 'user1@example.com', password: 'password1' },
    { email: 'user2@example.com', password: 'password2' }
];

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        setTimeout(() => {
            const user = mockUsers.find(user => user.email === email && user.password === password);
            if (user) {
                localStorage.setItem('user', JSON.stringify(
                    {
                        username: "Little John",
                        role: "user"
                    }
                ))
                // api call create token here
                localStorage.setItem('token', "somethinghere")
                localStorage.setItem('refreshToken', "somewherehere")
                localStorage.removeItem('cart')
                navigate('/');
            } else {
                setError('Email hoặc mật khẩu không đúng');
            }
            setLoading(false);
        }, 1000); // Giả lập độ trễ khi đăng nhập
    };
    return (
        <div className="log-form-container">
            <div className="log-form">
                <div className="nav-top">
                    <NavForm />
                </div>
                <div className="auth-container">
                    <h2>Đăng nhập</h2>
                    <form onSubmit={handleLogin}>
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
                        {error && <p className="error">{error}</p>}
                        <button type="submit" disabled={loading}>
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn