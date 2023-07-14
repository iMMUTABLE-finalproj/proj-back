package com.kh.iMMUTABLE.entity;

import com.kh.iMMUTABLE.constant.ProductSellStatus;
import com.kh.iMMUTABLE.constant.SizeStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product")
@Getter @Setter
@ToString
public class Product {
    @Id
    @Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private long productId;
    @Column(nullable = false)
    private String productName;     // 상품명
    @Column(nullable = false)
    private int productPrice;       // 상품 가격
    @Column(nullable = false)
    private String productColor;      // 상품 컬러
    @Column(nullable = false)
    private String productCategory;      // 상품 카테고리
    @Lob
    private String productImgFst;      // 상품 메인 이미지
    @Lob
    private String productImgSnd;      // 상품 서브 이미지
    @Lob
    private String productDetail;    // 상품 상세설명
    @Lob
    @Column(nullable = false)
    private String productImgDetail;    // 상품 상세설명
    private long productStock;       // 상품 재고
    @Enumerated(EnumType.STRING)
    private ProductSellStatus productSellStatus;    // 상품 판매 상태
    @Enumerated(EnumType.STRING)
    private SizeStatus sizeStatus;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Qna> qnaList = new ArrayList<>();






//    public Product(){}
}
