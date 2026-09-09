import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../components/Notification";
import {
    createBook,
    getBook,
    updateBook
} from "./bookApi";
import "./BookForm.css";

function BookForm() {
    const [book, setBook] = useState({
        title: "",
        authors: "",
        isbn: "",
        price: "",
        publisher: "",
        salePrice: "",
        thumbnail: ""
    });

    const [notification, setNotification] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getBook(id)
                .then((response) => {
                    setBook(response.data);
                })
                .catch(() => {
                    setNotification({
                        type: "error",
                        message: "도서 정보를 불러오지 못했습니다."
                    });
                });
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setBook({
            ...book,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const request = id
            ? updateBook(id, book)
            : createBook(book);

        request
            .then(() => {
                navigate("/books", {
                    state: {
                        message: id
                            ? "도서가 수정되었습니다."
                            : "도서가 등록되었습니다."
                    }
                });
            })
            .catch(() => {
                setNotification({
                    type: "error",
                    message: id
                        ? "도서 수정에 실패했습니다."
                        : "도서 등록에 실패했습니다."
                });
            });
    };

    return (
        <div className="book-form">

            <Notification
                type={notification?.type}
                message={notification?.message}
            />

            <div className="form-header">
                <h1>
                    {id ? "도서 수정" : "도서 등록"}
                </h1>

                <p>
                    {id
                        ? "도서 정보를 수정합니다."
                        : "새로운 도서 정보를 입력해주세요."
                    }
                </p>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="form-content">

                    <div className="form-fields">

                        <div className="form-group">
                            <label>제목</label>
                            <input
                                type="text"
                                name="title"
                                value={book.title}
                                onChange={handleChange}
                                placeholder="예: 데미안"
                            />
                        </div>

                        <div className="form-group">
                            <label>저자</label>
                            <input
                                type="text"
                                name="authors"
                                value={book.authors}
                                onChange={handleChange}
                                placeholder="예: 헤르만 헤세"
                            />
                        </div>

                        <div className="form-group">
                            <label>ISBN</label>
                            <input
                                type="text"
                                name="isbn"
                                value={book.isbn}
                                onChange={handleChange}
                                placeholder="예: 9788937460449"
                            />
                        </div>

                        <div className="form-group">
                            <label>출판사</label>
                            <input
                                type="text"
                                name="publisher"
                                value={book.publisher}
                                onChange={handleChange}
                                placeholder="예: 민음사"
                            />
                        </div>

                        <div className="price-group">

                            <div className="form-group">
                                <label>정가</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={book.price}
                                    onChange={handleChange}
                                    placeholder="예: 15000"
                                />
                            </div>

                            <div className="form-group">
                                <label>판매가</label>
                                <input
                                    type="number"
                                    name="salePrice"
                                    value={book.salePrice}
                                    onChange={handleChange}
                                    placeholder="예: 13500"
                                />
                            </div>

                        </div>

                        <div className="form-group">
                            <label>썸네일 URL</label>

                            <input
                                type="text"
                                name="thumbnail"
                                value={book.thumbnail}
                                onChange={handleChange}
                                placeholder="이미지 URL을 입력하세요."
                            />

                            <button
                                type="button"
                                className="preview-button"
                                onClick={() => setShowPreview(!showPreview)}
                            >
                                {showPreview ? "미리보기 닫기" : "미리보기"}
                            </button>
                        </div>

                    </div>

                    <div className="thumbnail-area">
                        <div className="thumbnail-preview">
                            {showPreview && book.thumbnail ? (
                                <img
                                    src={book.thumbnail}
                                    alt="썸네일 미리보기"
                                />
                            ) : (
                                <span>미리보기</span>
                            )}
                        </div>
                    </div>

                </div>

                <div className="form-actions">

                    <button
                        type="button"
                        onClick={() => navigate("/books")}
                        className="cancel-button"
                    >
                        취소
                    </button>

                    <button
                        type="submit"
                        className="submit-button"
                    >
                        {id ? "수정" : "등록"}
                    </button>

                </div>

            </form>
        </div>
    );
}

export default BookForm;