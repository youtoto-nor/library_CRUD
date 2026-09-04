package com.example.library.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookRequest {
    private String title;
    private String authors;
    private String isbn;
    private Integer price;
    private String publisher;
    private Integer salePrice;
    private String thumbnail;
}
