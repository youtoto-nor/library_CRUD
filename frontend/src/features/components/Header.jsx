import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMe } from "../auth/authApi";
import Notification from "../components/Notification";
import "./Header.css";

function Header() {
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);
    const loadUser = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setUser(null);
            return;
        }

        getMe()
            .then((response) => {
                setUser(response.data);
            })
            .catch(() => {
                localStorage.removeItem("token");
                setUser(null);
            });
    };

    useEffect(() => {
        loadUser();

        const handleAuthExpired = () => {
            setNotification({
                type: "error",
                message: "로그인이 만료되었습니다."
            });
        };

        window.addEventListener("auth-change", loadUser);
        window.addEventListener("auth-expired", handleAuthExpired);

        return () => {
            window.removeEventListener("auth-change", loadUser);
            window.removeEventListener("auth-expired", handleAuthExpired);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);

        window.dispatchEvent(new Event("auth-change"));
    };

    return (
    <>
        <Notification
            type={notification?.type}
            message={notification?.message}
            persistent={true}
            onClose={() => setNotification(null)}
        />
        <header className="app-header">
            <div className="header-inner">

                <Link to="/books" className="logo">
                    <strong>BMS</strong>
                    <span>도서 관리 시스템</span>
                </Link>

                <nav className="main-nav">
                    <Link to="/books">도서 목록</Link>
                    {user && (
                    <Link to="/books/new">도서 등록</Link>
                    )}
                    {user ? (
                        <>
                            <span className="user-name">
                                {user.name}님
                            </span>
                            <button
                                type="button"
                                className="logout-button"
                                onClick={handleLogout}
                            >
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">로그인</Link>
                            <Link to="/signup">회원가입</Link>
                        </>
                    )}
                </nav>

            </div>
        </header>
    </>
    );
}

export default Header;