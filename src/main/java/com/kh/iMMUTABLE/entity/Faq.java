package com.kh.iMMUTABLE.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "faq")
@Getter @Setter @ToString
public class Faq {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "faq_id")
    private long faqId;
    private String faqTitle;
    @Lob
    private String faqContent;
    private LocalDateTime faqDate;
}
