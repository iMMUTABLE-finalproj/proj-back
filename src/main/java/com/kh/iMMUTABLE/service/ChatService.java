package com.kh.iMMUTABLE.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.iMMUTABLE.entity.ChatList;
import com.kh.iMMUTABLE.entity.ChatRoom;
import com.kh.iMMUTABLE.repository.ChatListRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {
    private final ObjectMapper objectMapper;
    private final ChatListRepository chatListRepository;
    private Map<String, ChatRoom> chatRooms;
    @PostConstruct // 의존성 주입 이후 초기화를 수행하는 메소드
    private void init() {
        chatRooms = new LinkedHashMap<>();
    }
    public List<ChatRoom> findAllRoom() {
        return new ArrayList<>(chatRooms.values());
    }
    public ChatRoom findRoomById(String roomId) {
        return chatRooms.get(roomId);
    }
    // 방 개설하기
    public ChatRoom createRoom(String name) {
        String randomId = UUID.randomUUID().toString();
        log.info("UUID : " + randomId);
        ChatRoom chatRoom = ChatRoom.builder()
                .roomId(randomId)
                .name(name)
                .build();
        chatRooms.put(randomId, chatRoom);
        return chatRoom;
    }
    public <T> void sendMessage(WebSocketSession session, T message) {
        try {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        } catch(IOException e) {
            log.error(e.getMessage(), e);
        }
    }
    //방 데이터 저장
    public boolean saveRoom(String roomName, String userId){
        ChatList chatList = new ChatList();
        chatList.setRoomName(roomName);
        chatList.setUserId(userId);
        chatListRepository.save(chatList);
        return true;
    }
    //방 데이터 삭제
    @Transactional
    public boolean removeRoom(String roomName){
        System.out.println("차트서비스 roomId : " + roomName);
        int result = chatListRepository.deleteByRoomName(roomName);
        return true;
    }
}
