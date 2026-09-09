import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMe } from "../auth/authApi";
import "./Header.css";

function Header() {
    const [user, setUser] = useState(null);

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

        window.addEventListener("auth-change", loadUser);

        return () => {
            window.removeEventListener("auth-change", loadUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);

        window.dispatchEvent(new Event("auth-change"));
    };

    return (
        <header className="app-header">
            <div className="header-inner">

                <Link to="/books" className="logo">
                    📚 미니 사서
                </Link>

                <nav className="main-nav">
                    <Link to="/books">도서 목록</Link>
                    <Link to="/books/new">도서 등록</Link>

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
    );
}

export default Header;