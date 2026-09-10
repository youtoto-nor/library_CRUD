import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./features/auth/Signup";
import Header from "./features/components/Header";
import BookList from "./features/books/BookList";
import BookForm from "./features/books/BookForm";
import Login from "./features/auth/Login";
import { useEffect } from "react";

import "./App.css";

function App() {

useEffect(() => {
    let timer;

    const scheduleTokenExpiration = () => {
        console.log("auth-change 감지");
        if (timer) {
            clearTimeout(timer);
        }

        const token = localStorage.getItem("token");

        console.log("현재 token:", token);

        if (!token) {
            return;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));
        const expiration = payload.exp * 1000;
        const remainingTime = expiration - Date.now();

        console.log("JWT 남은 시간:", remainingTime);

        if (remainingTime <= 0) {
            localStorage.removeItem("token");

            window.dispatchEvent(new Event("auth-change"));
            window.dispatchEvent(new Event("auth-expired"));

            return;
        }

        timer = setTimeout(() => {
            console.log("JWT 만료 타이머 실행");
            localStorage.removeItem("token");

            window.dispatchEvent(new Event("auth-change"));
            window.dispatchEvent(new Event("auth-expired"));
        }, remainingTime);
    };

    scheduleTokenExpiration();

    window.addEventListener("auth-change", scheduleTokenExpiration);

    return () => {
        clearTimeout(timer);
        window.removeEventListener("auth-change", scheduleTokenExpiration);
    };
}, []);

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