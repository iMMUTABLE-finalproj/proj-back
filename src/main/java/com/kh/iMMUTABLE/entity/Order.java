package com.kh.iMMUTABLE.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kh.iMMUTABLE.constant.OrderStatus;
import com.kh.iMMUTABLE.constant.SizeStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "orders")
@Getter @Setter @ToString
public class Order {
    @Id
    @Column(name = "order_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private long orderId;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private Users user;
    @Column(nullable = false)
    private String orderAddress;
    private LocalDate orderDate;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id")
    private Cart cart;
    private String productName;
    private String productColor;
    @Enumerated(EnumType.STRING)
    private SizeStatus sizeStatus;
    @Column(nullable = false)
    private int totalPrice;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus=OrderStatus.CHECK;
    private String shipCompany;
    private int shipCode;
    private int count;
    private int productPrice;
    private String orderName;
    private String orderPhone;
    private String orderEmail;
    private boolean reviewed = false;
}
