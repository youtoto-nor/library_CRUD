import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from './authApi';
import Notification from "../components/Notification";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await login({
                email,
                password
            });

            const token = response.data;

            localStorage.setItem("token", token);

            window.dispatchEvent(new Event("auth-change"));

            navigate("/books", {
                state: {
                    message: "로그인되었습니다."
                }
            });
        } catch (error) {
            setNotification({
                type: "error",
                message:
                    error.response?.data?.message ||
                    "로그인에 실패했습니다."
            });
        }
    };

    return (
        <div className="login">

            <h1>로그인</h1>
            <Notification
                type={notification?.type}
                message={notification?.message}
            />
            <p className="login-description">
                이메일과 비밀번호로 로그인해주세요.
            </p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                    aria-label="이메일"
                />
            </div>

        
            <div className="form-group">
                <div className="password-input">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호"
                        aria-label="비밀번호"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "숨기기" : "보기"}
                    </button>
                </div>
            </div>
                <button type="submit">
                    로그인
                </button>
            </form>
            <p className="login-signup">
                아직 계정이 없으신가요?
                <Link to="/signup">회원가입</Link>
            </p>
        </div>
    );
}

export default Login;