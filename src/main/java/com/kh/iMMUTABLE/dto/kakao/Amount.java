package com.kh.iMMUTABLE.dto.kakao;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Amount {
    private int total; // 총 결제 금액
    private int tax_free; // 비과세 금액
    private int tax; // 부과세 금액
}
