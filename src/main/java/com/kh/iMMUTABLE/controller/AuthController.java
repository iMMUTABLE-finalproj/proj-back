package com.kh.iMMUTABLE.controller;


import com.kh.iMMUTABLE.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    @PostMapping("/login")
    public ResponseEntity<Boolean>  userList(@RequestBody Map<String, String> loginData) {
        String userEmail = loginData.get("email"); // userEmail?
        String userPwd = loginData.get("pwd");
        System.out.println("user Email :  " + userEmail);
        System.out.println("user Password :  " + userPwd);
        boolean result = userService.getUserList(userEmail,userPwd);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<Boolean>  signupList(@RequestBody Map<String, String> loginData) {
        String userName = loginData.get("userName");
        String userEmail = loginData.get("userEmail");
        String userPwd = loginData.get("userPwd");
        String userAddr = loginData.get("userAddr");
        String userPhone = loginData.get("userPhone");
        System.out.println("user Email :  " + userEmail);
        System.out.println("user Password :  " + userPwd);
        boolean result = userService.signUpUser(userName,userEmail,userPwd,userAddr,userPhone);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
