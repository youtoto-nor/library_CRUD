package com.example.library.service;

import com.example.library.dto.BookRequest;
import com.example.library.entity.Book;
import com.example.library.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository){
    this.bookRepository = bookRepository;
    }

    public Book createBook(BookRequest request) {
    Book book = new Book();

      book.setTitle(request.getTitle());
      book.setAuthor(request.getAuthor());
      book.setIsbn(request.getIsbn());

        return bookRepository.save(book);
    }

    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    public Book getBook(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("error 404 책을 찾지 못했습니다"));
    }

    public Book updateBook(Long id, BookRequest request) {

        Book book = bookRepository.findById(id)
                .orElseThrow();

        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setIsbn(request.getIsbn());

        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}