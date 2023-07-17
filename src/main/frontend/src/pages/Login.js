import React ,{useContext, useState}from "react";
import styled from "styled-components";
import { useNavigate,Link } from "react-router-dom";
import AxiosFinal from "../api/AxiosFinal";
import { UserContext } from "../context/UserInfo";
import LoginFailModal from "./LoginFailModal";

const Container =styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Body = styled.div`
    font-size: 12px;
    width: 500px;
    height: 380px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media only screen and ( max-width: 390px){
        width: 350px;
    }
    .blur {
        filter: blur(5px);
        width: 100%;
        display: flex;
        flex-direction: column;  
    }
    .login{        
        width: 100%;
        display: flex;
        flex-direction: column;        
    }
    input{
        border: 1px solid #CCC;
        margin: 20px 0 0 0;
        height: 40px;
        &::placeholder{
            padding: 5px;
            font-size: 10px;
        }
    }
    button{
        width: 500px;
        margin: 20px 0 0 0;
        height: 40px;
        font-size: 10px;
        border: 1px solid #CCC;
        background-color: white;
        &:hover{
            background-color: black;
            color: white;
        }
        @media only screen and ( max-width: 390px){
                width: 350px;
        }
    }
    a{  
        height: 15px;
        font-size: 10px;
        cursor: pointer;
        text-decoration: none;
        color: black;
    }
    .otherOption{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
`

const Login =()=>{
     //네비게이트를 설정하여 다시 home화면으로 돌아갈 수 있게 한다.
    const navigate = useNavigate();
    //id와 pw를 입력받는다.
    const [inputId,setInputId] = useState("");    
    const [inputPw,setInputPw] = useState("");
    //로그인 실패시 띄워질 모달 창에 대한 값을 저장한다.
    const [onModal, setOnModal] = useState(false);
    //배경화면 블러를 관리함
    const [onBlur, setOnBlur] = useState(false);
    //로그인 여부 , 로그인한 회원의 주문정보를 저장할 conText
    const {setIsLogin,setOrderUserData,orderUserData} = useContext(UserContext);
    //input창에서 id를 받아옴.
    const onChangeId = e => {
        setInputId(e.target.value);
    };
    //input창에서 pw를 받아옴.
    const onChangePw = (e) => {
        setInputPw(e.target.value)
    };
    //로그인 비동기통신
    const onClickLogin=  async() =>{ 
        const response = await AxiosFinal.memberLogin(inputId,inputPw);
        console.log(response);
        if(response.data===true){
            //로그인시 유저아이디와 로그인여부에 값을 바꿔준다.
            window.localStorage.setItem("isLoginSuv", "TRUE");
            window.localStorage.setItem("userIdSuv", inputId);
            setIsLogin(true);
            //로그인 성공시 home화면으로 돌아간다.
            navigate ("/");
            const orderMemberData = await AxiosFinal.orderMemberData(inputId);
            console.log(orderMemberData.data);
            setOrderUserData(orderMemberData.data); 
        } else {
            setOnModal(true);
            setOnBlur(true);
        }  
       


    }
    const closeModal = () => {
        setOnModal(false);
        setOnBlur(false);
    }

    return(
        <Container>
            <Body >
            <LoginFailModal open={onModal} close={closeModal}/>
                LOGIN
                <div className={onBlur ? "blur" : "login"}>
                    <input type="text" placeholder="ID" value ={inputId} onChange={onChangeId}/>
                    <input type="password" placeholder="PASSWORD" value ={inputPw} onChange={onChangePw}/>                 
                    <button onClick={onClickLogin}>SIGN IN</button>
                    <div className="otherOption">
                        <Link to="/FindEmail">FORGOT YOUR PASSWORD?</Link>
                        <Link to="/">home</Link>
                    </div>
                    <Link to="/SignUp"><button>RESISTER AN ACCOUNT</button></Link>
                </div>

            </Body>
        </Container>
    );
};

export default Login;