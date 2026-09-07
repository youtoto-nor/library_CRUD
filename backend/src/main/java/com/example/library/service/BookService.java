package com.example.library.service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.example.library.dto.BookRequest;
import com.example.library.entity.Book;
import com.example.library.repository.BookRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book createBook(BookRequest request) {
        Book book = new Book();

        book.setTitle(request.getTitle());
        book.setAuthors(request.getAuthors());
        book.setIsbn(request.getIsbn());
        book.setPrice(request.getPrice());
        book.setPublisher(request.getPublisher());
        book.setSalePrice(request.getSalePrice());
        book.setThumbnail(request.getThumbnail());

        return bookRepository.save(book);
    }

    public Page<Book> getBooks(String keyword, Pageable pageable) {

        // 정렬 조건이 없으면 id 오름차순을 기본값으로 사용
        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(
                    pageable.getPageNumber(),
                    pageable.getPageSize(),
                    Sort.by(Sort.Direction.ASC, "id")
            );
        }

        // 검색어가 없으면 전체 조회
        if (keyword == null || keyword.isBlank()) {
            return bookRepository.findAll(pageable);
        }

        // 검색어가 있으면 제목 또는 저자 검색
        return bookRepository.findByTitleContainingOrAuthorsContaining(
                keyword,
                keyword,
                pageable
        );
    }

    public Book getBook(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("error 404 책을 찾지 못했습니다"));
    }

    public Book updateBook(Long id, BookRequest request) {

        Book book = bookRepository.findById(id)
                .orElseThrow();

        book.setTitle(request.getTitle());
        book.setAuthors(request.getAuthors());
        book.setIsbn(request.getIsbn());
        book.setPrice(request.getPrice());
        book.setPublisher(request.getPublisher());
        book.setSalePrice(request.getSalePrice());
        book.setThumbnail(request.getThumbnail());

        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}