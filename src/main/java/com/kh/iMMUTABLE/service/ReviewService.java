package com.kh.iMMUTABLE.service;

import com.kh.iMMUTABLE.dto.ProductDto;
import com.kh.iMMUTABLE.dto.ReviewDto;
import com.kh.iMMUTABLE.entity.Order;
import com.kh.iMMUTABLE.entity.Product;
import com.kh.iMMUTABLE.entity.Review;
import com.kh.iMMUTABLE.entity.Users;
import com.kh.iMMUTABLE.repository.OrderRepository;
import com.kh.iMMUTABLE.repository.ProductRepository;
import com.kh.iMMUTABLE.repository.ReviewRepository;
import com.kh.iMMUTABLE.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    // 리뷰 관련 제품 정보 가져오기
    public ProductDto reviewProduct(long productId) {
        Product product = productRepository.findByProductId(productId);
        ProductDto productDto = new ProductDto();
        productDto.setProductName(product.getProductName());
        productDto.setProductImgFst(product.getProductImgFst());
        return productDto;
    }

    // 리뷰 작성하기
    public boolean writeReview(int rate, long productId, String title, String content, String userEmail, LocalDate reviewDate, long orderId) {
        Users users = userRepository.findByUserEmail(userEmail);
        Product product = productRepository.findByProductId(productId);
        Order order = orderRepository.findByOrderId(orderId);

        Review review = new Review();
        review.setReview_rate(rate);
        review.setReview_title(title);
        review.setReview_content(content);
        review.setUser(users);
        review.setProduct(product);
        review.setReview_date(reviewDate);
        review.setOrder(order);
        order.setReviewed(true);
        reviewRepository.save(review);
        return true;
    }

    // 제품 별 리뷰 불러오기
    public List<ReviewDto> viewReview(String productName) {
        List<Product> productList = productRepository.findByProductName(productName);
        List<ReviewDto> reviewDtoList = new ArrayList<>();

        for(Product product : productList) {
            long productId = product.getProductId();
            List<Review> reviews = reviewRepository.findByProductProductId(productId);
            for(Review review : reviews) {
                ReviewDto reviewDto = new ReviewDto();
                reviewDto.setOrderId(review.getOrder().getOrderId());
                reviewDto.setReviewTitle(review.getReview_title());
                reviewDto.setReviewContent(review.getReview_content());
                reviewDto.setReviewRate(review.getReview_rate());
                reviewDto.setUserName(review.getUser().getUserName());
                reviewDto.setReviewDate(review.getReview_date());
                reviewDtoList.add(reviewDto);
            }
        }
        return reviewDtoList;
    }

    // 내가 쓴 리뷰 불러오기
    public List<ReviewDto> myReview(String id) {
        Users users = userRepository.findByUserEmail(id);
        long userId = users.getUserId();
        List<Review> reviewList = reviewRepository.findByUserUserId(userId);
        List<ReviewDto> reviewDtoList = new ArrayList<>();

        for(Review review : reviewList) {
            ReviewDto reviewDto = new ReviewDto();
            reviewDto.setReviewId(review.getReview_id());
            reviewDto.setReviewTitle(review.getReview_title());
            reviewDto.setReviewContent(review.getReview_content());
            reviewDto.setReviewRate(review.getReview_rate());
            reviewDto.setUserName(review.getUser().getUserName());
            reviewDto.setReviewDate(review.getReview_date());
            reviewDto.setProductName(review.getProduct().getProductName());
            reviewDto.setProductImgFst(review.getProduct().getProductImgFst());
            reviewDto.setProductSize(review.getProduct().getSizeStatus().toString());
            reviewDtoList.add(reviewDto);
        }
        return reviewDtoList;
    }

    // 내가 쓴 리뷰 삭제하기
    public boolean deleteReview (String reviewId) {
        long id = Long.parseLong(reviewId);
        reviewRepository.deleteById(id);
        return true;
    }
}
