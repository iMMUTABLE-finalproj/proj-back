package com.kh.iMMUTABLE.controller;

import com.kh.iMMUTABLE.dto.ProductDto;
import com.kh.iMMUTABLE.dto.ReviewDto;
import com.kh.iMMUTABLE.service.ReviewService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/review")
@RequiredArgsConstructor

public class ReviewController {
    private final ReviewService reviewService;

    // 리뷰 관련 제품 정보 가져오기
    @GetMapping("/reviewProduct")
    public ResponseEntity<ProductDto> reviewProduct (@RequestParam String productId) {
       ProductDto result = reviewService.reviewProduct(Long.parseLong(productId));
       return new ResponseEntity<>(result, HttpStatus.OK);
   }

    // 리뷰 작성하기
    @PostMapping("/writeReview")
    public ResponseEntity<Boolean> writeReview (@RequestBody Map<String, String> reviewData) {
        int rate = Integer.parseInt(reviewData.get("rate"));
        long productId = Long.parseLong(reviewData.get("productId"));
        String title = reviewData.get("title");
        String content = reviewData.get("content");
        String userEmail = reviewData.get("userEmail");
        LocalDate nowDate = LocalDate.now();
        String reviewDateString = nowDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDate reviewDate = LocalDate.parse(reviewDateString);
        long orderId = Long.parseLong(reviewData.get("orderId"));

        boolean result = reviewService.writeReview(rate, productId, title, content, userEmail, reviewDate, orderId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 제품 별 리뷰 불러오기
    @GetMapping("/viewReview")
    public ResponseEntity<List<ReviewDto>> viewReview (@RequestParam String productName) {
        List<ReviewDto> result = reviewService.viewReview(productName);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 내가 쓴 리뷰 불러오기
    @GetMapping("/myReview")
    public ResponseEntity<List<ReviewDto>> myReview (@RequestParam String id) {
        List<ReviewDto> result = reviewService.myReview(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 내가 쓴 리뷰 삭제
    @PostMapping("/deleteReview")
    public ResponseEntity<Boolean> deleteReview (@RequestBody Map<String, String> deleteReview) {
        String reviewId = deleteReview.get("reviewId");
        boolean result = reviewService.deleteReview(reviewId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
