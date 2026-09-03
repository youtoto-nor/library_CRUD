    import { useEffect, useState } from "react";
    import { useNavigate, useParams } from 'react-router-dom';
    import { createBook, getBook, updateBook } from "./bookApi";
    import "./BookForm.css";
    function BookForm() {

    const [book, setBook] = useState({
        title: '',
        author: '',
        isbn: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
    if (id) {
        getBook(id)
            .then(response => {
                setBook(response.data);
            })
            .catch(() => {
                alert('도서 정보를 불러오지 못했습니다.');
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
            alert(id ? '도서가 수정되었습니다.' : '도서가 등록되었습니다.');

            navigate('/books');
        })

        .catch(() => {
            alert(id ? '도서 수정에 실패했습니다.' : '도서 등록에 실패했습니다.');
        });
    };
    return (
        <div className="book-form">
        
        <h1>도서 등록</h1>
        <form onSubmit={handleSubmit}>
            
            <div>
            
            <label>제목</label>
            <input
                type="text"
                name="title"
                value={book.title}
                onChange={handleChange}
            />
            </div>
            <div>
            
            <label>저자</label>
            <input
                type="text"
                name="author"
                value={book.author}
                onChange={handleChange}
            />
            </div>
            <div>
            
            <label>ISBN</label>
            <input
                type="text"
                name="isbn"
                value={book.isbn}
                onChange={handleChange}
            />
            </div>
            <button type="submit"> 등록 </button>
        </form>
        </div>
    );
    }
    export default BookForm;
