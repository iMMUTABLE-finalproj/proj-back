import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ChatAxios from "../api/ChatAxios.js";

const Container=styled.div`
.bodyArea{
    width:300px;
    height:650px;
    display:flex;
    flex-direction: column;
}
.chatHeadArea{
    display: flex;
    flex-direction: column;
    background-color: #CCC;
}
.chatContentArea{
    height:100%;
    overflow-y: scroll;
       .otherUser{
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
        }
        .ownUser{
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
            align-items: end;
        }
        .userName{
            font-size: 12px;
            margin:0 3px 3px 5px;
        }
        .messageInfo{
            display: flex;
        }
        .otherUserMessage{
            margin-left: 10px;
            margin-right: 5px;
            padding: 6px 10px 6px 10px;
            width: fit-content;
            background-color: black;
            color: white;
            font-size: 13px;
            border-radius: 10px;
        }
        .userTime{
            font-size:10px;
            height: 100%;
            display: flex;
            align-items: end;
        }
        .ownUserMessage{
            margin-right: 10px;
            margin-left: 5px;
            padding: 6px 10px 6px 10px;
            width: fit-content;
            border: 1px solid black;
            font-size: 13px;
            border-radius: 10px;
        }

}
.sendArea{
    width: 100%;
    height: 25px;
    display: flex;

}
.msg_input {
     width: 100%;
     font-size:11px;
     line-height : normal;
     padding: .8em .5em;
     border: 1px solid #999;
     outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
     -webkit-appearance: none; /* 브라우저별 기본 스타일링 제거 */
     -moz-appearance: none; appearance: none;

}
.msg_send {
     width: 100px;
     height: 25px;
     font-size: 11px;
     color: white;
     border:none;
     background-color: black;
     &:hover{
        color:#CCC;
     }
}
.msg_ready{
     width: 100px;
     height: 25px;
     font-size: 11px;
     color: white;
     border:none;
     background-color: #CCC;
}
.chatClose {
     width: 100%;
     height: 40px;
     font-size: 11px;
     background-color: white;
     border: none;
     &:hover{
     background-color:black;
     color:white;
     }
}
`
const ChatSocket = () => {
    const [socketConnected, setSocketConnected] = useState(false);
    const [inputMsg, setInputMsg] = useState("");
    const [rcvMsg, setRcvMsg] = useState("");
    const webSocketUrl = `ws://localhost:8111/ws/chat`;
    const roomId = window.localStorage.getItem("chatRoomId");
    const sender = window.localStorage.getItem("userIdSuv");
    let ws = useRef(null);
    const [items, setItems] = useState([]);

    const onChangMsg = (e) => {
        setInputMsg(e.target.value)
    }

    const onEnterKey = (e) => {
        if(e.key === 'Enter') onClickMsgSend(e);
    }

    const onClickMsgSend = (e) => {
        if(inputMsg===""){
        alert("empty contents!!!");
        }else{
            e.preventDefault();
            ws.current.send(
                JSON.stringify({
                "type":"TALK",
                "roomId": roomId,
                "sender": sender,
                "message":inputMsg}));
                setInputMsg("");
        }
    }
    const onClickMsgClose = () => {
        ws.current.send(
            JSON.stringify({
            "type":"CLOSE",
            "roomId": roomId,
            "sender":sender,
            "message":"종료 합니다."}));
        ws.current.close();
        alert("채팅을 종료합니다.")
    }
    const onMsgClose =async()=>{
        window.localStorage.removeItem("chatRoomId");
        const response = await ChatAxios.removeChatData(roomId);
    }

    useEffect(() => {
        console.log("방번호 : " + roomId);
        if (!ws.current) {
            ws.current = new WebSocket(webSocketUrl);
            ws.current.onopen = () => {
                console.log("connected to " + webSocketUrl);
            setSocketConnected(true);
            };
        }
        if (socketConnected) {
            ws.current.send(
                JSON.stringify({
                "type": "ENTER",
                "roomId": roomId,
                "sender": sender,
                "message": "처음으로 접속 합니다."}));
        }
        ws.current.onmessage = (evt) => {
            const data = JSON.parse(evt.data);
            console.log(data.message);
            setRcvMsg(data.message);
            setItems((prevItems) => [...prevItems, data]);
      };
    }, [socketConnected]);

    // console.log(items);
    //메시지창 실행 시 항상 맨 아래로 오게한다!
    const messageEndRef = useRef(null);
    useEffect(() => {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [items]);

    return (
        <Container>
            <div className="bodyArea">
                <div className="chatHeadArea">
                    <button className="chatClose" onClick={()=>{onClickMsgClose();onMsgClose();}}>chat close</button>
                    <div>Chatting Connected : {`${socketConnected}`}</div>
                </div>
                <div className="chatContentArea">
                    {items.map((item) => {
                       return<div className={item.sender === sender ? "ownUser" : "otherUser"}>
                                <div className="userName">
                                   {item.sender}
                                </div>
                                <div className="messageInfo">
                                   <div className={item.sender === sender ? "ownUserMessage" : "otherUserMessage"}>
                                      {item.message}
                                   </div>
                                </div>
                              </div>
                    })}
                     <div ref={messageEndRef}></div>

                </div>
                <div className="sendArea">
                    <input className="msg_input" placeholder="내용을 입력하세요" value ={inputMsg} onChange={onChangMsg} onKeyUp={onEnterKey}/>
                    {inputMsg != "" && <button className="msg_send" onClick={onClickMsgSend}>전송</button>}
                    {inputMsg === "" && <button className="msg_ready" disabled='disabled'>전송</button>}
                </div>
            </div>
        </Container>
      );
    };

    export default ChatSocket;