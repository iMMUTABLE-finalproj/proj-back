package com.kh.iMMUTABLE.repository;

import com.kh.iMMUTABLE.entity.ChatList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatListRepository extends JpaRepository<ChatList, Long> {
    int deleteByRoomName(String roomName);

}
