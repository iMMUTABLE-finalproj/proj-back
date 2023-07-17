import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AxiosFinal from "../api/AxiosFinal";
import ModalEmail from "./ModalEmail";


const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    overflow-y: scroll;
`;
const InerContainer = styled.div`
    align-items: center;
    width: 400px;
    a{
    text-decoration: none;
    color: black;
    }
    .top{
        justify-content: center;
        align-items: center;
        font-weight: bolder;
        font-size: 50px;
    }
    .input {
        margin-top: 30px;
    }
    input {
        width: 100%;
        height: 40px;
        margin-top: 20px;
        font-size: 10px;
        border: 1px solid #ccc;
        &::placeholder {
            padding: 5px;
            font-size: 10px;
        };
      @media only screen and ( max-width: 390px){
        width: 380px;
      }
    }
    .findPwdBtn,
    .findBtn {
        margin-top: 20px;
        text-align: center;
        width: 200px;   
        font-size: 10px;
        background-color: white;
        border: none;
        &:hover{
            color: #CCC;
        }
        margin-bottom : 10px
    }
`;
const FindEmail = () => {
    // useState 이용하여 상태를 업데이트한다.
    const [inputEmail, setInputEmail] = useState("");

    // 팝업
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModelText] = useState("중복된 아이디 입니다.");

    // const context = useState(UserStore);
    // const {userEmail} = context;

    //모달 창 닫기 
    const closeModal = () =>{
        setModalOpen(false);
    };
    
    //inputEamil 업데이트
    const handleEmailChange = (e) => {
        setInputEmail(e.target.value);
    };

    const handleSearchId = async() =>{ 
        console.log("click")
        // 비동기 요청을 통해 서버로 부터 userEmail 검색 요청 
        console.log(inputEmail);
        const response = await AxiosFinal.searchUserEmail(inputEmail);
        if (response.data) {
            setModalOpen(true)
            setModelText("존재하는 이메일 입니다.")
        } else {
            setModalOpen(true);
            setModelText("존재하지 않는 이메일 입니다.")
        }
    };

    return(
        <Container>
            <InerContainer>
                <Link to="/"><div className="top">
                    iMMUTABLE
                </div></Link>
                <div className="item">
                    <input type="email" value={inputEmail} onChange={handleEmailChange} placeholder="EMAIL"/>
                </div>
                <div className="item">
                    <ModalEmail open={modalOpen} close={closeModal}>{modalText}</ModalEmail>
                    <button className="findBtn" onClick={handleSearchId}>FIND</button>
                    <Link to="/FindPwd"><button className="findPwdBtn">FORGOT PASSWORD</button></Link>
                </div>
            </InerContainer>
        </Container>
    );
};

export default FindEmail;