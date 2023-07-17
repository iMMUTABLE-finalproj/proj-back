import React, { useState ,useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserInfo.js";
import PopupPostCode from "../api/PopupPostCode";
import AxiosFinal from "../api/AxiosFinal"
import { Link } from "react-router-dom";



const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow-y: scroll;
`;
const InerContainer = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
  width: 400px;
  height: 750px;
  a{
    width: 100%;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    font-size:10px;
    text-decoration: none;
    color: black;
    background-color: white;
    &:hover{
      background-color: black;
      color:white;
    }
    @media only screen and ( max-width: 390px){
      width: 380px;
      margin-left: 4px;
    }
  }
  .top{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;

  }
  .input {
    width: 100%;
  }
  input {
    width: 395px;
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
  .emailBtn,
  .verifyBtn,
  .addrBtn {
    text-align: right;
    width: 50px;
    font-size: 10px;
    background-color: white;
    border: none;
    &:hover{
      color: #CCC;
    }
    margin-bottom : 10px
  }
  .singUp {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* height: 38px; */
    margin-top: 20px;
    background-color: white;
  }

  .hint {
    width: 100%;
    display: flex;
    margin: 5px 0px 0px 8px;
    justify-content:right;
    align-items:center;
    font-size: 12px;
    color: #999;
  }
  .addrFind {
    margin-right: 10px;
    width: 170px;
  }

  .addrBtn {
    height: 40px;
  }

  .success {
    color: royalblue;
  }

  .error {
    color: red;
  }
  .enable-button {
    font-size: 10px;
    /* font-weight: bold; */
    margin-bottom: 20px;
    width: 100%;
    height: 38px;
    color: white;
    background-color: black;
    @media only screen and ( max-width: 390px){
      width: 380px;
    }
  }
  .enable-button:active {
    font-size: 10px;
    /* font-weight: bold; */
    width: 100%;
    height: 38px;
    color: white;
    background-color: black;
    &:hover {
      border: 1px solid black;
    }
    @media only screen and ( max-width: 390px){
      width: 380px;
    }
  }
  .disable-button {
    width: 100%;
    height: 38px;
    margin-bottom: 20px;
    font-size: 10px;
    color: black;
    background-color: white;
    border: 1px solid black;
    &:hover{
      color: #CCC;
    }
    @media only screen and ( max-width: 390px){
      width: 380px;
    }
  }
`;

const SignUp = () => {
   
    const navigate = useNavigate();

    // 키보드 입력 받기
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [code, setCode] = useState("");
    const [inputPw, setInputPw] = useState("")
    const [inputConPw, setInputConPw] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [inputAddr, setInputAddr] = useState("");

    // 오류 메세지
    const [emailMessage, setEmailMessage] = useState("")
    const [codeMessage, setCodeMessage] = useState("")
    const [pwMessage, setPwMessage] = useState("");
    const [conPwMessage, setConPwMessage] = useState("");
    const [phoneMessage, setPhoneMessage] = useState("");

    //유효성 검사
    const [isName, setIsName] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isCode, setIsCode] = useState(false);
    const [isPw, setIsPw] = useState(false)
    const [isConPw, setIsConPw] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    const [isAddr, setIsAddr] = useState(false);

    //저장된 주소값을 설정하여 주소는 받아온다.
    const context = useContext(UserContext);
    const {addr, setAddr} = context;
    


     //주소찾기 영역
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true);
    }
     
	// 팝업창 닫기
    const closePostCode = (e) => {
        setIsPopupOpen(false);
    }
    

    // 이름 정규식
    const onChangeName = (e) => {
        const inputNameRegex = /^[가-힣]{2,5}$/ // 이름은 한글로만 2자리 이상 5자리 미만
        const nameCurrent = e.target.value;
        setInputName(nameCurrent);
        if (!inputNameRegex.test(nameCurrent)) { // 이름은 잘못 입력 되었을 때
            setIsName(false);
        } else {
            setIsName(true);
        }
    }

     //메일 정규식
     const onChangeMail = (e) => {
        const inputEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const emailCurrent = e.target.value;
        setInputEmail(emailCurrent);
        if (inputEmailRegex.test(emailCurrent)) { // 이메일 입력이 잘 못 되었을 때
            setEmailMessage('올바른 이메일 형식입니다.')
            setIsEmail(true);
        } else {
            setEmailMessage('이메일 형식이 올바르지 않습니다.')
            setIsEmail(false)
        } 
    }

    //비밀번호 정규식
    const onChangePw = (e) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,25}$/ // 비밀번호 정규식
        const passwordCurrent = e.target.value ;
        setInputPw(passwordCurrent);
        if (!passwordRegex.test(passwordCurrent)) {
            setPwMessage('숫자+영문자 조합으로 8자리 이상 입력해주세요!')
            setIsPw(false)
        } else {
            setPwMessage('안전한 비밀번호에요 : )')
            setIsPw(true);
        }        
    }

    //비밀번호 확인
    const onChangeConPw = (e) => {
        const passwordCurrent = e.target.value ;
        setInputConPw(passwordCurrent)
        if (passwordCurrent !== inputPw) {
            setConPwMessage('비밀 번호가 일치하지 않습니다.') // 입력한 비밀번호가 일치해야 함
            setIsConPw(false)
        } else {
            setConPwMessage('비밀 번호가 일치 합니다. )')
            setIsConPw(true);
        }      
    }

     //전화번호 정규식
     const onChangePhone = (e) => {
        const inputPhoneRegex = /^\d{3}\d{4}\d{4}$/;
        const phoneCurrent = e.target.value;
        setInputPhone(phoneCurrent);
        if (!inputPhoneRegex.test(e.target.value)) { // 전화번호 입력이 잘 못 되었을 때
            setPhoneMessage('전화번호 형식이 올바르지 않습니다.');
            setIsPhone(false);
        } else {
            setPhoneMessage('올바른 전화번호 형식입니다.');
            setIsPhone(true);
        } 
    }
    console.log(isPhone);


    const onClickEmailAuth = async() => { 
        console.log("이메일 인증 호출 : " + inputEmail);
        const res = await AxiosFinal.mailCode(inputEmail);
				// Axios를 이용하여 서버로 inputEmail 변수에 담긴 이메일 주소를 전송하고, 
				//서버에서 생성한 랜덤한 인증 코드를 받아오는 API를 호출
        console.log(res.data);

    }   


       // 이메일 인증코드 유효성 검사
       const onClickCode = async() => {
        console.log(inputEmail, code, code.length);
        console.log(typeof(code));
        const res = await AxiosFinal.mailCodeck(inputEmail, code);
        console.log(res.data);
        if (res.data) {
            setCodeMessage("인증이 완료되었습니다.");
            setIsCode(true);
        } else {
            setCodeMessage("인증 코드가 일치하지 않습니다.");
            setIsCode(false);
        }
          
    }

//    const onChangeAddr = (e) => {
//        const inputValue = e.target.value;
//        setInputAddr(inputValue);
//        if(inputValue!="") {
//            setIsAddr(true);
//        } else setIsAddr(false);
//    }

    useEffect(()=> {
        setIsAddr(!!addr);
    }, [addr])


    const onClickSignUp = async() => {
        console.log("Click 회원가입");
        // 가입 여부 우선 확인
        const response = await AxiosFinal.memberRegCheck(inputEmail);
        const check = response.data;

        if(!check) { // 가입된 이메일이 없으면 다음단계 진행
            console.log("가입가능");
            // 가입 진행
            const memberReg = await AxiosFinal.memberReg(inputName, inputEmail, inputPw, addr, inputPhone);
            setAddr("");
            if(memberReg.data === true) {
                navigate("/Login");
            } else {
                alert("회원 가입에 실패했습니다");
            }
        } else {
            alert("이미 가입된 회원입니다");
        }
     }




   
    return(
        <Container>
            <InerContainer>
                <div className="top">
                    SIGNUP
                </div>
                <div className="input">
                    <div className="item">
                        <input type="text" placeholder="NAME" onChange={onChangeName}/>
                    </div>
                
                    <div className="item1">
                        <input className="email" type="email" placeholder="EMAIL"onChange={onChangeMail}/>
                        <button className="emailBtn" onClick={onClickEmailAuth}>SEND</button>
                    </div>
                    <div className="hint">
                        {inputEmail.length > 0 && (
                        <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>)}
                    </div>
                    <div className="item1">
                        <input className="verify" type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="VERIFYCODE" />
                        <button className="verifyBtn" onClick={onClickCode}>VERIFY</button>
                    </div>
                    <div className="hint">
                        {code.length > 0 && (
                        <span className={`message ${isCode ? 'success' : 'error'}`}>{codeMessage}</span>)}
                    </div>

                    <div className="item">
                        <input type="password" placeholder="PWD" onChange={onChangePw}/>
                    </div>
                    <div className="hint">
                            {inputPw.length > 0 && (
                            <span className={`message ${isPw ? 'success' : 'error'}`}>{pwMessage}</span>)}
                    </div>
                    <div className="item">
                        <input type="password" placeholder="PWD CHECK" onChange={onChangeConPw}/>
                    </div>
                    <div className="hint">
                            {inputPw.length > 0 && (
                            <span className={`message ${isConPw ? 'success' : 'error'}`}>{conPwMessage}</span>)}
                    </div>
                    <div className="item">
                        <input type="phone" placeholder="PHONE" onChange={onChangePhone}/>
                    </div>
                    <div className="hint">
                            {inputPhone.length > 0 && (
                            <span className={`message ${isPhone ? 'success' : 'error'}`}>{phoneMessage}</span>)}
                    </div>

                    <div className="item">
                        <input type="text" placeholder="ADDRESS" className="addrInput"  value={addr}/>
                        <button className="addrBtn" onClick={openPostCode}>FIND</button>
                        <div id='popupDom'>
                            {isPopupOpen && (                    
                                    <PopupPostCode onClose={closePostCode} />
                            )} 
                        </div>
                    </div>
                    <div>
                    {(isEmail && isPw && isConPw && isName && isPhone && isAddr) ?
                    <button className="enable-button" onClick={onClickSignUp}>CREATE</button> :
                    <button className="disable-button">INPUT INFORMATION</button> }
                    </div>                                     
                </div>
                <Link to="/Login">LOGIN</Link>
            </InerContainer>
        </Container>
    );
};

export default SignUp