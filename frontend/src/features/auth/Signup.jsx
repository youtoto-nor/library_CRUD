import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "./authApi";
import Notification from "../components/Notification";
import "./Signup.css";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [notification, setNotification] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        signup({
            email,
            password,
            name
        })
            .then(() => {
                navigate("/login", {
                    state: {
                        message: "회원가입이 완료되었습니다."
                    }
                });
            })
            .catch((error) => {
                setNotification({
                    type: "error",
                    message: error.response?.data?.message ||
                    "회원가입에 실패했습니다."
                });
            });
    };

    return (
        <div className="signup">
            <Notification
                type={notification?.type}
                message={notification?.message}
            />

            <div className="form-header">
                <h1>회원가입</h1>
                <p>미니 사서 서비스를 시작해보세요.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="이름"
                        aria-label="이름"
                    />
                </div>

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

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="cancel-button"
                    >
                        취소
                    </button>

                    <button
                        type="submit"
                        className="submit-button"
                    >
                        회원가입
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Signup;