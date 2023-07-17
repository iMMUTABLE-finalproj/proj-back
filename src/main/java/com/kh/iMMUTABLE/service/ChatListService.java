package com.kh.iMMUTABLE.service;

import com.kh.iMMUTABLE.dto.ChatListDto;
import com.kh.iMMUTABLE.entity.ChatList;
import com.kh.iMMUTABLE.repository.ChatListRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ChatListService {

    private final ChatListRepository chatListRepository;

    public List<ChatListDto> getChatListAll() {
        List<ChatList> chatList = chatListRepository.findAll();
        List<ChatListDto> chatListDtos = new ArrayList<>();
        for(ChatList chatListList : chatList){
            ChatListDto chatListDto = new ChatListDto();
            chatListDto.setRoomName(chatListList.getRoomName());
            chatListDto.setUserId(chatListList.getUserId());
            chatListDtos.add(chatListDto);
        }
    return chatListDtos;
    }

}
