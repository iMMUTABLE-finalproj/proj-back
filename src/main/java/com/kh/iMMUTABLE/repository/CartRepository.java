package com.kh.iMMUTABLE.repository;

import com.kh.iMMUTABLE.entity.Cart;
import com.kh.iMMUTABLE.entity.Order;
import com.kh.iMMUTABLE.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUserUserId(long userId);

}