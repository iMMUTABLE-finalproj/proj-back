package com.kh.iMMUTABLE.controller;

import com.kh.iMMUTABLE.dto.*;
import com.kh.iMMUTABLE.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    private final UserService userService;
    private final QnaService qnaService;
    private final OrderService orderService;
    private final ChatListService chatListService;

    private final ProductService productService;
    //admin page 유저리스트 가져오기
    @GetMapping("/check")
    public ResponseEntity<List<UserDto>> idCheck(){
        List<UserDto> list = adminService.getUserListAll();
        System.out.println("adminController :" + list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    //admin page에서 유저 삭제
    @PostMapping("/deleteUser")
    public ResponseEntity<Boolean>  signupList(@RequestBody Map<String, String> loginData) {
        String userId = loginData.get("userId");
        System.out.println(userId);
        boolean result = userService.userDelete(userId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    //qna가져오기
    @GetMapping("/qnaLoad")
    public ResponseEntity<List<QnaDto>> qnaLoad(){
        List<QnaDto> list = qnaService.getQnaListAll();
        System.out.println("adminController :" + list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    //qna 업로드
    @PostMapping("/qnaUpload")
    public ResponseEntity<Boolean> qnaupload(@RequestBody Map<String, String> qnaData) {
        int qnaId = Integer.parseInt(qnaData.get("qnaId"));
        String qnaStatue= qnaData.get("qnaStatue");
        String qnaReplay = qnaData.get("qnaReplay");
        System.out.println(qnaId);
        System.out.println("컨트롤러 : " + qnaReplay);
        boolean result = qnaService.upLoadReply(qnaId,qnaStatue,qnaReplay);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    //order 전체 가져오기
    @GetMapping("/orderLoad")
    public ResponseEntity<List<OrderDto>> orderLoad(){
        List<OrderDto> list = orderService.getOrderListAll();
        System.out.println("adminController :" + list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    //order 수정
    @PostMapping("/orderUpLoad")
    public ResponseEntity<Boolean> orderUpload(@RequestBody Map<String, String> qnaData) {
        int orderId = Integer.parseInt(qnaData.get("orderId"));
        String orderStatue = qnaData.get("orderStatue");
        int shipCode = Integer.parseInt(qnaData.get("orderShipCode"));
        String shipCompany = qnaData.get("orderShipCompany");
        System.out.println(orderId);
        System.out.println("컨트롤러 : " + shipCode);
        System.out.println("컨트롤러 : " + shipCode);
        boolean result = orderService.upLoadData(orderId, orderStatue, shipCode, shipCompany);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    //7일치 주문건 각각 일자별로 가져오기
    @PostMapping("/findOrderDay")
    public ResponseEntity<List<Integer>> orderCheck(@RequestBody Map<String, String> orderData) {
        String orderDate = orderData.get("orderDate");
        System.out.println("컨트롤러 : " + orderDate);
        List<Integer> result = orderService.getDateOrderList(orderDate);
        System.out.println("adminController :" + result);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    //채팅 리스트 가져오기
    @GetMapping("/chatList")
    public ResponseEntity<List<ChatListDto>> chatListLoad(){
        List<ChatListDto> list = chatListService.getChatListAll();
        System.out.println("adminController :" + list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    @PostMapping("/upload")
    public ResponseEntity<Boolean> uploadItem (@RequestBody Map<String, String> loginData){
        String productName = loginData.get("productName");
        String productPrice = loginData.get("productPrice");
        String productColor = loginData.get("productColor");
        String productSize = loginData.get("productSize");
        String productCategory = loginData.get("productCategory");
        String productImgFst = loginData.get("productImgFst");
        String productImgSnd = loginData.get("productImgSnd");
        String productImgDetail = loginData.get("productImgDetail");
        System.out.println("컨트롤러 : " + productImgDetail);
        boolean result = productService.itemUpLoad(productName,productPrice,productColor,productSize,productCategory,productImgFst,productImgSnd,productImgDetail);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/items")
    public ResponseEntity<List<ProductDto>> itemsList() {
        List<ProductDto> productDtos = productService.getProduct();
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

}
