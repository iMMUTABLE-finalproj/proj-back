package com.kh.iMMUTABLE.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kh.iMMUTABLE.constant.QnaStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "qna")
@Getter @Setter
@ToString
public class Qna {
    @Id
    @Column(name = "qna_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private long qnaId;
    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users user;
    @Column(nullable = false)
    private String qnaTitle;
    @Column(nullable = false)
    private String qnaContent;
    private String qnaPwd;
    private LocalDate qnaDate;
    @Enumerated(EnumType.STRING)
    private QnaStatus qnaStatus;
    private String reply;

}
