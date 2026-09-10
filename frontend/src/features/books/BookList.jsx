import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getBooks, deleteBook } from "./bookApi";
import Notification from "../components/Notification";
import { getMe } from "../auth/authApi";
import "./BookList.css";

function BookList() {
    const [books, setBooks] = useState([]);
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("idle");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);
    const [successMessage, setSuccessMessage] = useState(
        location.state?.message || ""
    );
useEffect(() => {
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

    loadUser();

    window.addEventListener("auth-change", loadUser);

    return () => {
        window.removeEventListener("auth-change", loadUser);
    };
}, []);
    useEffect(() => {
        if (!successMessage) {
            return;
        }

        const timer = setTimeout(() => {
            setSuccessMessage("");
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [successMessage]);

    const handleDelete = (id) => {
        if (!window.confirm("정말 이 도서를 삭제하시겠습니까?")) {
            return;
        }
        deleteBook(id)
            .then(() => {
                setNotification({
                    type: "success",
                    message: "도서가 삭제되었습니다."
                });

                // 현재 페이지를 다시 조회
                getBooks(page, 20, searchKeyword)
                    .then((response) => {
                        setBooks(response.data.content);
                        setTotalPages(response.data.totalPages);

                        // 현재 페이지가 사라진 경우 첫 페이지로 이동
                        if (
                            response.data.totalPages > 0 &&
                            page >= response.data.totalPages
                        ) {
                            setPage(response.data.totalPages - 1);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        setStatus("error");
                        setNotification({
                            type: "error",
                            message: "도서 목록을 불러오지 못했습니다."
                        });
                    });
            })
            .catch((error) => {
            console.error(error);
            setStatus("error");
            setNotification({
                type: "error",
                message: "도서를 삭제하지 못했습니다."
            });
        });
    };

    useEffect(() => {
        setStatus("loading");

        getBooks(page, 20, searchKeyword)
            .then((response) => {
                setBooks(response.data.content);
                setTotalPages(response.data.totalPages);
                setStatus("success");
            })
            .catch((error) => {
                console.error(error);
                setStatus("error");
            });
    }, [page, searchKeyword]);

    const currentPage = page + 1;
    const startPage = Math.floor(page / 5) * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPages);

    return (
        <div className="book-list">
            <h1>도서 목록</h1>
            <Notification
                type={notification?.type}
                message={notification?.message}
            />
            {successMessage && (
                <div className="success-message">
                    <div className="success-content">
                        <span className="success-icon">✓</span>

                        <div>
                            <strong>{successMessage}</strong>
                            <p>
                                작업이 정상적으로 완료되었습니다.
                            </p>
                        </div>
                    </div>

                    <div className="success-progress">
                        <div className="success-progress-bar"></div>
                    </div>
                </div>
            )}
            <div className="search-box">
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setSearchKeyword(keyword);
                            setPage(0);
                        }
                    }}
                    placeholder="도서 제목 또는 저자 검색"
                />

                <button
                    onClick={() => {
                        setSearchKeyword(keyword);
                        setPage(0);
                    }}
                >
                    검색
                </button>
            </div>

            {books.length === 0 ? (
                <p className="empty-message">검색 결과가 없습니다.</p>
            ) : (
                <div className="book-grid">
                    {books.map((book) => (
                        <div className="book-item" key={book.id}>

                            {book.thumbnail && (
                                <div className="book-thumbnail">
                                    <img
                                        src={book.thumbnail}
                                        alt={book.title}
                                    />
                                </div>
                            )}

                            <div className="book-info">

                                <h2 className="book-title">
                                    {book.title}
                                </h2>

                                <p className="book-author">
                                    {book.authors}
                                </p>

                                <p className="book-publisher">
                                    {book.publisher}
                                </p>

                                <div className="book-price">
                                    <div>
                                        <span className="price-label">정가</span>
                                        <span className="original-price">
                                            {book.price?.toLocaleString()}원
                                        </span>
                                    </div>

                                    <div>
                                        <span className="price-label">판매가</span>
                                        <strong>
                                            {book.salePrice?.toLocaleString()}원
                                        </strong>
                                    </div>
                                </div>

                                <p className="book-isbn">
                                    ISBN {book.isbn}
                                </p>

                            {user && (
                                <div className="book-actions">
                                    <Link to={`/books/${book.id}/edit`}>
                                        수정
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(book.id)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="pagination">
                <button
                    onClick={() => setPage(startPage - 2)}
                    disabled={startPage === 1}
                >
                    이전
                </button>

                {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, index) => {
                        const pageNumber = startPage + index;

                        return (
                            <button
                                key={pageNumber}
                                onClick={() => setPage(pageNumber - 1)}
                                className={
                                    pageNumber === currentPage
                                        ? "active"
                                        : ""
                                }
                            >
                                {pageNumber}
                            </button>
                        );
                    }
                )}

                <button
                    onClick={() => setPage(endPage)}
                    disabled={endPage === totalPages}
                >
                    다음
                </button>
            </div>
        </div>
    );
}

export default BookList;