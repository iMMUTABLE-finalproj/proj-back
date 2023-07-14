import React , {useContext, useState } from "react";
import styled from "styled-components";
import AxiosFinal from "../api/AxiosFinal";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserInfo";

const Container = styled.div`
    .normalBackground{

    }
    .blockBackground{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    }
    a{
        color: black;
        text-decoration: none;
        font-size: 11px;
    }
    .modal {
        display: none;  // 숨겨진 상태로 시작
        position: fixed;
        width: 280px;
        height: 180px;
        top: 35%;  // 화면 전체를 덮도록 위치
        bottom: 0;
        left: 40%;
        z-index: 99; // 다른 모달 보다 위에 위치하도록 함
        background-color: white;
        border-radius: 10px;
 }

    .openModal {
        display: flex; // 모달이 보이도록 함
        align-items: center;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-bg-show 0.8s;
    }
    button {
        width: 100px;
        height: 30px;
        outline: none;
        cursor: pointer;
        margin-right: 20px;
        border: 0;
    }

    .form {
        border: 1px solid black;
        border-radius: 10px;
        width: 100%;
        height: 100%;
        //팝업이 열릴때 스르륵 열리는 효과
        animation: modal-show 0.3s;
        overflow: hidden;
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 30px;
            background-color: #E6E6E6;
            .header-title {
                margin-left: 5px;
                font-weight: bold;
            }
            .close {
                margin-right: 5px;
                cursor: pointer;
            }
        }
        .main {
           display: flex;
           flex-direction: column;
           justify-content: center;
           align-items: center;
            .closeButton{
                border: 1px solid black;
                width: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                &:hover{
                    background-color: black;
                    color: white;
                }
            }
            input{
            border: 1px solid #CCC;
            margin: 16px 0 0 0;
            width: 200px;
            height: 22px;
            &::placeholder{
                padding: 5px;
                font-size: 10px;
            }
            }
            button{
            width: 210px;
            margin: 20px 0 0 0;
            height: 25px;
            font-size: 10px;
            border: 1px solid #CCC;
            background-color: white;
            &:hover{
                background-color: black;
                color: white;
            }        
            }       
        }
    }
    @keyframes modal-show {
        from {
            opacity: 0;
            margin-top: -50px;
        }
        to {
            opacity: 1;
            margin-top: 0;
        }
    }
    @keyframes modal-bg-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

`;

const AdminLoginModal = (props) => {
    const {open, close} = props;

    const [inputId,setInputId] = useState("");
    const [inputPw,setInputPw] = useState("");
    //토큰을 담을 contextAPI
    const context = useContext(UserContext);
    const { setRefreshTokenAdmin } = context;
    //id 입력
    const onChangeId = e => {
        setInputId(e.target.value);
    };
    //pw 입력
    const onChangePw = (e) => {
        setInputPw(e.target.value)
    };
    //로그인 axios
    const onClickLogin=  async() =>{
        const responseToken = await AxiosFinal.adminTokenLogin(inputId,inputPw);
        console.log(responseToken)
        console.log(responseToken.data);
        //토큰을 넣는다.
        window.localStorage.setItem("AdminToken", responseToken.data.accessToken);
        setRefreshTokenAdmin(responseToken.data.refreshToken)
        if(responseToken.data.accessToken!==null){
            window.localStorage.setItem("userIdSuv", inputId);
            window.localStorage.setItem("isLoginAdminPage", "TRUE");
            close();
        }else{
            alert("id와 pw를 확인해주세요");
        }
    }

    return (
        <Container>
            <div className={open? 'blockBackground' : 'normalBackground'}>
            <div className={open ? 'openModal modal' : 'modal'}>
            {open &&
               <div className="form">
                    <header>
                        <div className="header-title">iMMUTABLE admin login</div>     
                    </header>
                    <div className="main">
                        <input type="text" placeholder="ID" value ={inputId} onChange={onChangeId}/>
                        <input type="password" placeholder="PASSWORD" value ={inputPw} onChange={onChangePw}/>                 
                        <button onClick={onClickLogin}>SIGN IN</button>
                        <Link to="/AdminSignup">admin join</Link>                
                    </div>
                </div>            
            }   
            </div>
            </div>
        </Container>
    );
};
export default AdminLoginModal;