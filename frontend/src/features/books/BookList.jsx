import { useEffect, useState } from "react";
import { getBooks } from "./bookApi";
import "./BookList.css";

function BookList() {
    const [books, setBooks] = useState([]);
    const [status, setStatus] = useState("idle");

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
            </div>
            ))}
        </div>
    );
}
export default BookList;
