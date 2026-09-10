import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./features/auth/Signup";
import Header from "./features/components/Header";
import BookList from "./features/books/BookList";
import BookForm from "./features/books/BookForm";
import Login from "./features/auth/Login";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Header/>

            <main>
                <Routes>
                    <Route path="/" element={<Navigate to="/books" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/books" element={<BookList />} />
                    <Route path="/books/new" element={<BookForm />} />
                    <Route path="/books/:id/edit" element={<BookForm />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;