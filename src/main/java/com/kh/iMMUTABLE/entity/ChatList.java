package com.kh.iMMUTABLE.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "chatlist")
@Getter
@Setter
@ToString
public class ChatList {
    @Id
    @Column(name = "chat_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long chatRoomId;

    @Column(name = "room_Name", length = 600)
    private String roomName;
    @Column(name = "user_id")
    private String userId;
}
