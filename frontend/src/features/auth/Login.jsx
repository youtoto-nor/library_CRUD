import { useState } from 'react';
import { login } from './authApi';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await login({
                email,
                password
            });

            localStorage.setItem('token', response.data);

            alert('로그인 성공');
        } catch (error) {
            alert('로그인에 실패했습니다.');
        }
    };

    return (
        <div>
            <h1>로그인</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>이메일</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div>
                    <label>비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <button type="submit">로그인</button>
            </form>
        </div>
    );
}

export default Login;