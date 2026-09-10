import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "./authApi";
import Notification from "../components/Notification";
import "./Signup.css";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [notification, setNotification] = useState(null);

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
            .catch(() => {
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
                    <label>이메일</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="이메일을 입력하세요."
                        required
                    />
                </div>

                <div className="form-group">
                    <label>비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="비밀번호를 입력하세요."
                        required
                    />
                </div>

                <div className="form-group">
                    <label>이름</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="이름을 입력하세요."
                        required
                    />
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