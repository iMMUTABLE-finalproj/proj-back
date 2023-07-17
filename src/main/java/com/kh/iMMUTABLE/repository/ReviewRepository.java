package com.kh.iMMUTABLE.repository;

import com.kh.iMMUTABLE.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProductProductId(long productId);

    List<Review> findByUserUserId(long userId);


}
