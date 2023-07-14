package com.kh.iMMUTABLE.controller;

import com.kh.iMMUTABLE.entity.ChatRoom;
import com.kh.iMMUTABLE.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;
    @PostMapping("/room")
    public ResponseEntity<String> createRoom(@RequestBody String name) {
        log.info(name);
        ChatRoom room = chatService.createRoom(name);
        System.out.println(room.getRoomId());
        return new ResponseEntity<>(room.getRoomId(), HttpStatus.OK);
    }
    @GetMapping
    public List<ChatRoom> findAllRoom() {
        return chatService.findAllRoom();
    }
    @PostMapping("/saveChatData")
    public ResponseEntity<Boolean> saveRoom(@RequestBody Map<String, String> saveChatData) {
        String roomName = saveChatData.get("roomName");
        String userId = saveChatData.get("userId");
        boolean result = chatService.saveRoom(roomName,userId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PostMapping("/removeChatData")
    public ResponseEntity<Boolean> removeRoom(@RequestBody Map<String, String> saveChatData) {
        String roomName = saveChatData.get("roomName");
        System.out.println("컨트롤러 : " + roomName);
        boolean result = chatService.removeRoom(roomName);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }



}
