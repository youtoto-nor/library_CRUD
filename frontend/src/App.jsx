import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BookList from "./features/books/BookList";
import BookForm from "./features/books/BookForm";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/books">도서 목록</Link>
                <Link to="/books/new">도서 등록</Link>
            </nav>

            <Routes>
                <Route path="/books" element={<BookList />} />
                <Route path="/books/new" element={<BookForm />} />
            </Routes>
        </BrowserRouter>
    );
}
    export default App;
