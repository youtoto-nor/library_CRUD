import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getBooks, deleteBook } from "./bookApi";
import "./BookList.css";

function BookList() {
    const [books, setBooks] = useState([]);
    const [status, setStatus] = useState("idle");
    const handleDelete = (id) => {
    deleteBook(id)
        .then(() => {
            alert('도서가 삭제되었습니다.');

            setBooks(books.filter(book => book.id !== id));
        })
        .catch(() => {
            alert('도서 삭제에 실패했습니다.');
        });
    };
    useEffect(() => {
        setStatus("loading");

        getBooks()
            .then((response) => {
                setBooks(response.data);
                setStatus("success");
            })
            .catch(() => {
                setStatus("error");
            });
    }, []);

    if (status === "loading") {
        return <p>도서 목록을 불러오는 중...</p>;
    }

    if (status === "error") {
        return <p>도서 목록을 불러오지 못했습니다.</p>;
    }

        return (
            <div className="book-list">
            
            <h1>도서 목록</h1>

            {books.map((book) => (
            <div className="book-item" key={book.id}>
                <p>제목: {book.title}</p>
                <p>저자: {book.author}</p>
                <p>ISBN: {book.isbn}</p>


                <Link to={`/books/${book.id}/edit`}>
                    수정
                </Link>

                <button onClick={() => handleDelete(book.id)}>
                    삭제
                </button>
            </div>
            ))}
        </div>
    );
}
export default BookList;
