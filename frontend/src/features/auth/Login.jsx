import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './authApi';
import Notification from "../components/Notification";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await login({
                email,
                password
            });

            localStorage.setItem('token', response.data);

            window.dispatchEvent(new Event("auth-change"));

            navigate("/books", {
                state: {
                    message: "로그인되었습니다."
                }
            });
        } catch (error) {
            setNotification({
                type: "error",
                message: "로그인에 실패했습니다."
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
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>이메일</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="이메일을 입력하세요."
                    />
                </div>

                <div className="form-group">
                    <label>비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="비밀번호를 입력하세요."
                    />
                </div>

                <button type="submit">
                    로그인
                </button>
            </form>
        </div>
    );
}

export default Login;