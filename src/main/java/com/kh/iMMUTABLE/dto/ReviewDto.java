package com.kh.iMMUTABLE.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class ReviewDto {
    private long reviewId;
    private String reviewTitle;
    private String reviewContent;
    private int reviewRate;
    private LocalDate reviewDate;
    private long productId;
    private long userId;
    private long orderId;
    private String userName;
    private String productImgFst;
    private String productName;
    private String productSize;
}
