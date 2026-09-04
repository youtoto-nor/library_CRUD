package com.example.library.controller;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.library.dto.BookRequest;
import com.example.library.entity.Book;
import com.example.library.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }
    @GetMapping("/books")
    public Page<Book> getBooks(Pageable pageable) {
        return bookService.getBooks(pageable);
    }

    @GetMapping("/books/{id}")
    public Book getBook(@PathVariable Long id) {
        return bookService.getBook(id);
    }

    @PostMapping("/books")
        public Book createBook(@RequestBody BookRequest request) {
            return bookService.createBook(request);
    }

    @PutMapping("/books/{id}")
    public Book updateBook(
            @PathVariable Long id,
            @RequestBody BookRequest request) {

        return bookService.updateBook(id, request);
    }

    @DeleteMapping("/books/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
    }
}
