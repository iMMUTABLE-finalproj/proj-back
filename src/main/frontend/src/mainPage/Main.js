import React ,{useState, useEffect}from "react";
import styled, {css} from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import bckimg from "../img/fog.jpg"
import side from "../img/side.png"
import chat from "../img/chat.png"
import ChatAxios from "../api/ChatAxios.js";
import ChatSocket from "../chatPage/ChatSocket.js"
import AxiosFinal from "../api/AxiosFinal";


const Sidemenu = [
    //버튼을 카테고리로 분류하여 값을 쉽게 가져오기 위해 name으로 설정한다.
    { name : "SHOP"},
    { name : "CONTENTS"},
    { name : "BRAND"},
    { name : "LOOKBOOK"},
    { name : "NOTICE"}
  ]

  const IsLoginFalse = [
    { name : "login"}
  ]
  const IsLoginTrue = [
    { name : "logout"},
    { name : "mypage"},    
    { name : "cart"},    
    { name : "FAQ"}
  ]

const SideButton = styled.button`
    display:flex;
    align-items: center;
    justify-content: center;
    width:400px;
    height: 90px;
    min-height: 40px;
    background-color:rgba(255,255,255,0);
    border: none;
    font-size: 17px;
    &:hover{
        background-color: rgba(190,190,190,0.5);
    }
    ${props => props.active && css`   // *&* props가 active이면 css를 재정의 한다.
        background-color: rgba(190,190,190,0.5);        
     `}
`
const TopButton = styled.button`
    border: none;
    background-color: white;
    &:hover{
        color: rgba(0,0,0,0.5);
    }
`

const Container =styled.div`
    width: 100%;
    height: 100vh;
    display: flex;   
    a{
        text-decoration: none;
        color: black;
        &:hover{
            color: rgba(0,0,0,0.5);
        }
    } 

`


const Side=styled.div`
    width: 400px;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: rgba(255,255,255,0.9);
    z-index: 1;
    position: fixed;
    transition: transform 0.4s ease-in-out;
    left: -400px;
`



const MainBody=styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow:scroll;
    ::-webkit-scrollbar {
	display:none
    } 
`
const Head = styled.div`
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
    .top{
        padding: 0 20px 0 10px;
        display: flex;
        justify-content: space-between;
    }
    .top1{
        height: 70px;
        font-weight: bolder;
        font-size: 50px;
    }
    .top2{
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(100,100,100);
        font-size: 13px;
    }
    .bottom{
        color: rgb(100,100,100);
    }
`

const ToggleButton = styled.button`
    background: none;
    border: none;
    font-size: 17px;
    img{
        padding: 0 0 0 5px;
        width: 25px;
    }
    &:hover{
        color: rgb(120,120,120);
    }
`;

const Body = styled.div`
    width: 100%;
    height: 100%;
    //이미지를 사용 하려면  ${0}양식 사용
    background-image:url(${bckimg});
    background-size: contain;
    background-repeat: none;
    animation: transX 15s linear; 
    //애니메이션 무한반복
    animation-iteration-count: infinite;
    @keyframes transX {
        0% {
          transform: translateX(800px); // 이 top 기준으로 400px 내려간 곳에서 시작
        }
        100% {
          transform: translateX(-800px);   // 그리고 도착지는 원래 지점
        }
      } 
    overflow:scroll;
    ::-webkit-scrollbar {
	display:none /* Chrome , Safari , Opera */
}
`

const Foot = styled.div`
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    color: rgb(100,100,100);
    .topFoot{
        width: 50%;    
        display:flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .bottomFoot{
        width: 50%;    
        display:flex;
        justify-content: center;
        align-items: center;
    }
    //홈페이지 하단 이메일 입력
    .footInput{
        outline: none;
        width: 170px;
        border-top: none;
        border-left: none;
        border-right:none;
        border-bottom: 1px solid;
        font-size:5px;
        ::placeholder{
            font-size: 5px;
            opacity: 0.5;
        }
    }
`
//채팅
const Chat =styled.div`
    width: 300px;
    position: absolute;
    bottom: 6rem;
    right: 2rem;
    background-color: rgba(255,255,255,0.8);
    border-left: 2px solid #CCC;
    //그래야 안에 들어간 컨텐츠들이 사라진다.
    overflow: hidden;
    transition: height 0.35s ease;
    display: flex;
    flex-direction: column;
    //채팅 send기능 버튼
    .sendButton{
        width: 100%;
        height: 100%;
        border: none;
        background-color: #CCC;
        &:hover{
        background-color:black;
        color:white;
        }
    }

`
//채팅 on/off버튼
const ChatButton=styled.button`
    position: absolute;
    width: 50px;
    height: 50px;
    right: 2rem;
    bottom: 3rem;
    background-image: url(${chat});
    background-size: 85%;
    background-repeat: no-repeat;
    background-position: 40%;
    border: none;
    background-color: white;
`

//카트 영역
const CartToggle=styled.div`
    margin-top: 30px;
    width: 260px;
    display: flex;
    flex-direction: column;
    border: 1px solid #CCC;
    background-color: white;
    position: absolute;
    right: 2.8rem;
    top:3rem;
     z-index: 100;

    a{
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    text-decoration: none;
    background-color: black;
    color: white;
    &:hover{
        background-color: #CCC;
        color: black;
    }
  }


  .cartToggleItem{
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #CCC;
    display: flex;
    img{
        height: 100px;
    }
  }
  .itemInfo{
    width: 200px;
    font-size: 11px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items:center
  }
  .itemName{
    height: 20px;
    font-weight: bolder;

  }
  .deleteItem{
    border: none;
    background-color: white;
    cursor: pointer;
    color: #CCC;
    &:hover{
        color: black;
    }
  }
  .count{
    display: flex;
  }
  .plus,.minus{
    height: 13px;
    width: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: white;
    cursor: pointer;
    &:hover{
        color: white;
        background-color: black;
    }
  }
  .countbutton{
    display: flex;
    flex-direction: column;
  }
  input{
    width: 20px;
    height: 20px;
  }
  .itemPrice{
  }

`

  const CartList=styled.div`
    border-bottom: 1px solid #ccc;
    width: 100%;
    height: 100px;
    // overflow-y: scroll;
    ::-webkit-scrollbar {
    display: none;
    }
  `

const Main= () =>{
    const [count, setCount] = useState([]);
    const[cartList, setCartList] = useState([]);
    //카트 토글 여는 컴포넌트
    const [openCart, setOpenCart] = useState(false);

    const [isOpen, setIsOpen] = useState(0);
    const [openChat, setOpenChat] = useState(0);

    const isLogin = window.localStorage.getItem("isLoginSuv");
    const id = window.localStorage.getItem("userIdSuv");
    console.log(id);

    //채팅 on/off 컴포넌트
    const onChat=()=>{
        if(openChat===0){
            setOpenChat(650);
        } else if(openChat===650){
            setOpenChat(0);
        }
    }
    //상단 메뉴 및 사이드메뉴 클릭시 이동할 페이지와 함수들
    const navigate = useNavigate();
    const onChangePage=(e)=>{
        console.log(e);
        if(e==="cart"){
            //카트 창 열리기
            setOpenCart(!openCart);
        }
        else if (e==="FAQ") {
            navigate("/FAQ")
        }
        else if(e==="logout"){
            window.localStorage.setItem("isLoginSuv", "FALSE");
            window.localStorage.setItem("userIdSuv", "");
            window.location.reload();
        }
        else if(e==="SHOP"){
            navigate("/Shop");
            console.log(e);
        }
        else if(e==="mypage"){
            navigate("/Mypage")
        }
        else if(e==="NOTICE"){
            navigate("/FAQ")
        }

    }
    
    //해당 값만큼(300) 너비를 주어 사이드 바가 올라올 수 있게 한다.
    const toggleSidebar = () => {
        if(isOpen===400){
            setIsOpen(0);
        }else if(isOpen=== 0){
            setIsOpen(400);
        }
        console.log(isOpen) ; 
      };

    //채팅방 입력시 채팅방
    const chatTest = async() => {
        try {
            const res = await ChatAxios.chatRoomOpen("테스트 채팅방");
            console.log(res);
            console.log(res.data);
            window.localStorage.setItem("chatRoomId", res.data);
//            window.open("/ChatSocket");
        } catch(error) {
            console.log(error);
        }
    }

    const [onChatOpen,setOnChatOpen] = useState("false");
    useEffect(()=>{
        setOnChatOpen("true")
    },[onChatOpen])

    useEffect(() => {
            const getCartList = async()=>{
                if(!id) {
                    return;
                }
                const rsp = await AxiosFinal.cartItemList(id);
                if(rsp.status === 200) {
                    const copyCnt = rsp.data.map(e => e.count);
                    setCartList(rsp.data);
                    console.log(rsp.data);
                    setCount(copyCnt);
                }
            };
            getCartList();
        }, []);

        const updateCount = async (count, cartList, idx) => {
            const response = await AxiosFinal.updateCount( count, cartList, idx);
            const result = response.data;
            console.log(result)
        };
        console.log(cartList)



        // 수량 증가
        const countPlus = (idx) => {
            console.log(idx);
            setCount(prevCount => {
                const newCount = [...prevCount];
                newCount[idx] += 1;
                updateCount(newCount[idx], cartList, idx);
                return newCount;
            });
        };


        // 수량 감소
        const countMinus = (idx) => {
            setCount(prevCount => {
                const newCount = [...prevCount];
                if (newCount[idx] > 1) {
                    newCount[idx] -= 1;
                    updateCount(newCount[idx], cartList, idx);
                }
                return newCount;
            });
        };



        // 카트 아이템 삭제
        const deleteCartItem = async(id, index) => {
            console.log(index);
            console.log("삭제");
            const cartItemId =  cartList[index].cartItemId;
            const rsp = await AxiosFinal.deleteCartItem(id, cartItemId);
            setCartList(rsp.data);
        }

     
    return(
        <Container>
            <Side style={{transform: `translateX(${isOpen}px)`}}> 
                <div className="sideMenu">
                    {Sidemenu.map(s=>(
                        <SideButton key={s.name} onClick={()=>onChangePage(s.name)}>
                            {s.name}
                        </SideButton>
                    ))}
                </div>
                
                <div className="closeButton">
                    <ToggleButton ToggleButton onClick={toggleSidebar}>close</ToggleButton> 
                </div>
                
            </Side>
            {openCart &&<CartToggle >
                            {cartList && cartList.map((e, index)=>(
                                    <CartList  key={e.cartItemId}>
                                       <div className="cartToggleItem">
                                           <div className="itemImg">
                                               <img src={e.productImgFst} />
                                           </div>
                                           <div className="itemInfo">
                                               <div className="itemName">
                                                   {e.productName}
                                               </div>
                                               <div  className="count">
                                                  <input type="text" Value={count[index]}/>
                                                  <div className="countbutton">
                                                    <button className="plus" onClick={()=>countPlus(index)}>∧</button>
                                                    <button className="minus" onClick={()=>countMinus(index)}>∨</button>
                                                  </div>
                                               </div>
                                               <div className="itemPrice">
                                                  {(e.setOriginProductPrice * count[index]).toLocaleString()} won
                                               </div>
                                           </div>
                                           <button className="deleteItem"  onClick={() => deleteCartItem(id, index)}>x</button>
                                       </div>
                                    </CartList>))}
                                    <Link to="/Cart">장바구니</Link>
                          </CartToggle>}
            <MainBody>
                <Head>
                    <div className="top">
                        <div className="top1">
                            iMMUTABLE
                        </div>
                        <div className="top2">

                          {isLogin==="FALSE" && IsLoginFalse.map(s=> (
                                        <TopButton key={s.name}>
                                            <Link to="/Login">{s.name}</Link>
                                        </TopButton>
                                    ))}
                          {isLogin==="TRUE" && IsLoginTrue.map(s=> (
                                        <TopButton key={s.name} onClick={()=>onChangePage(s.name)}>
                                            {s.name}
                                        </TopButton>
                                    ))}
                            
                        </div>
                    </div>
                    <div className="bottom" >
                        <ToggleButton onClick={toggleSidebar}><img src={side}/> </ToggleButton> 
                    </div>
                     
                </Head>
               
                <Body>
                            
                </Body>
                <ChatButton onClick={onChat}/>                
                    <Chat style={{height: `${openChat}px`}}>
                            <ChatSocket/>
                            <button className="sendButton" onClick={()=>chatTest()}>채팅 시작하기</button>
                    </Chat>
                <Foot>
                    <div className="topFoot">
                        join the Conversation
                        <input type="text"className="footInput" placeholder="email address"></input>
                    </div>
                    <div className="bottomFoot">copyrightsⓒ iMMUTABLE allrights reserved</div>
                </Foot>
            </MainBody>
        </Container>

    );
};

export default Main;