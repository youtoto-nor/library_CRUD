import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getBooks, deleteBook } from "./bookApi";
import "./BookList.css";

function BookList() {
    const [books, setBooks] = useState([]);
    const [status, setStatus] = useState("idle");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const handleDelete = (id) => {
    deleteBook(id)
        .then(() => {
            alert('도서가 삭제되었습니다.');

            // 현재 페이지를 다시 조회
            getBooks(page, 20)
                .then((response) => {
                    setBooks(response.data.content);
                    setTotalPages(response.data.totalPages);

                    // 현재 페이지가 사라진 경우 마지막 페이지로 이동
                    if (page >= response.data.totalPages) {
                        setPage(response.data.totalPages - 1);
                    }
                })
                .catch(() => {
                    setStatus("error");
                });
        })
        .catch(() => {
            alert('도서 삭제에 실패했습니다.');
        });
};
    useEffect(() => {
        setStatus("loading");

        getBooks(page, 20)
            .then((response) => {
                setBooks(response.data.content);
                setTotalPages(response.data.totalPages);
                setStatus("success");
            })
            .catch(() => {
                console.error(error);
                setStatus("error");
            });
    }, [page]);

    if (status === "loading") {
        return <p>도서 목록을 불러오는 중...</p>;
    }

    if (status === "error") {
        return <p>도서 목록을 불러오지 못했습니다.</p>;
    }
    const currentPage = page + 1;
    const startPage = Math.floor(page / 5) * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPages);

        return (
            <div className="book-list">
            
            <h1>도서 목록</h1>

            {books.map((book) => (
            <div className="book-item" key={book.id}>
                <p>제목: {book.title}</p>
                <p>저자: {book.authors}</p>
                <p>출판사: {book.publisher}</p>
                <p>정가: {book.price}</p>
                <p>판매가: {book.salePrice}</p>
                <p>ISBN: {book.isbn}</p>


                <Link to={`/books/${book.id}/edit`}>
                    수정
                </Link>

                <button onClick={() => handleDelete(book.id)}>
                    삭제
                </button>
            </div>
            ))}
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
                                        ? 'active'
                                        : ''
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
