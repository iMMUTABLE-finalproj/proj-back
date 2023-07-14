import React, { useState, useContext  } from "react";
import styled, {css} from "styled-components";
import { UserContext } from "../context/UserInfo";
import AxiosFinal from "../api/AxiosFinal";
import { useNavigate } from "react-router-dom";


const Container=styled.div`
width: 100%;
height: calc(100vh - 180px);
overflow-y: scroll;
::-webkit-scrollbar {
display: none;
 }
    .qnaHead{
        width: 100%;
        height: 27px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #CCC;
    }
    .qnaId{
        width: 50px;
        display: flex;
        justify-content: center;
    }
    .itemId{
        width: 100px;
        display: flex;
        justify-content: center;
    }
    .userId{
        width: 100px;
        display: flex;
        justify-content: center;
    }
    .qnaNm{
        width: 420px;
        display: flex;
        justify-content: center;  
    }
    .answer{
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        select{
            font-size: 11px;
            border: none;
        }
    }
    .date{
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
const QnaInfoHead=styled.div`
    width: 100%;
    height: 27px;
    font-size: 11px;
    display: flex;
    flex-direction: column;
   
`

const QnaInfo = styled.div`
    width: 100%;
    font-size: 11px;
    display: flex;
    flex-direction: column;
    .qnaNmList{
        width: 420px;
        display: flex;
        //줄바꿈 방지
        white-space : nowrap;        
        // 넘침 숨기기
        overflow : hidden;
        justify-content: center;
        cursor: pointer;
    }
    .parentContents{
        width: 100%;
        height: 0px;
        overflow: hidden;
        transition: height 0.35s ease;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        ${props => props.active && css`   // *&* props가 active이면 css를 재정의 한다.
          height: 200px;
        `}
    }
    .childContents{
        height: 110px;
        overflow-y: scroll;
        ::-webkit-scrollbar {
        display: none;
        }
    }
    .answerContents{
        width: 100%;
        height: 40px;
        background-color: #CCC;
    }               
    input{
        height: 15px;
        width: 100%;
        border: none;
    }
    button{
        height: 34px;
        background-color: white;
        border: 1px solid black;
        font-size: 12px;
        &:hover{
            background-color: black;
            color: white;
        }
    }

`


const Qna = () =>{
    const navigate = useNavigate();
    //제목을 누르면 답변창(accodian)이 생성된다.
    //css에 active를 넘겨줄 값
    const[qnaAccodian, setQnaAccodian] = useState("all"); 
    //넘어오는 qndId값만 active를 통해 props를 CSS로 넘겨준다
    const onPopAccodian =(props)=>{
        // console.log(props);
        //같은 버튼 클릭시 null로 바꿔주어 모든 css를 초기화한다
        if(props===qnaAccodian){
            setQnaAccodian(null);
            // console.log(qnaAccodian);
        }else{
            setQnaAccodian(props);
        }        
    };
    //Qnadata를 가져옴
    const context = useContext(UserContext);
    const {qnaData} = context;

   
    //답변과 답변 상태가 담길 상수
    const [qnaStatue, setQnaStatue] = useState({
        qnaSelect:'',
        qnaReply:''

    });
    //답변 상태의 value가 담길 컴포넌트 select는 배열이므로 해당 배열 안의 값을 구해야 한다.
    const getValue = (e) => {
        const { name } = e.target;
        setQnaStatue({
            ...qnaStatue,
            //name 키를 가진 값을 value로 설정
            [name]: e.target.value
          })
    }
    //토큰을 담을 상수
    const tokenAdmin = window.localStorage.getItem("AdminToken")
    //답변과 답변 상태를 비동기 통신으로 전달.
    const onSubmitQna =async(props)=>{  
        //덜 담긴 정보를 한번 더 랜더링 하여 최종으로 다 담기게 한다.
        setQnaStatue({...qnaStatue});
        // console.log(qnaStatue);
        const response = AxiosFinal.qnaUploadReply(props,qnaStatue.qnaSelect,qnaStatue.qnaReply,tokenAdmin);
        console.log("qna 답변 통신 ",response)
        if(response === 401){
             navigate("/Admin401Error")
        }
    }
    return(

        <Container>
            <QnaInfoHead>
                <div className="qnaHead">
                    <div className="qnaId">ID</div>
                    <div className="itemId">itemID</div>
                    <div className="userId">userID</div>
                    <div className="qnaNm">QnA</div>
                    <div className="answer">ANSWER</div>
                    <div className="date">DATE</div>
                </div>
            </QnaInfoHead>

            {qnaData && qnaData.map((q,index)=>
            <QnaInfo key={q.qnaId} active={qnaAccodian === q.qnaId}>
                <div className="qnaHead">
                    <div className="qnaId">
                        {q.qnaId}
                    </div>
                    <div className="itemId">
                        {q.productId}
                    </div>
                    <div className="userId">
                        {q.userId}
                    </div>
                    <div className="qnaNmList" onClick={()=>{onPopAccodian(q.qnaId)}}>
                        {q.qnaTitle}
                    </div>
                    <div className="answer" >
                        <select name ='qnaSelect'onChange={getValue}>
                            <option selected disabled>{q.qnaStatus}</option>
                            <option value="HOLD">HOLD</option>
                            <option value="COMPLETE">COMPLETE</option>                           
                        </select>
                    </div>
                    <div className="date">
                        20230620
                    </div>
                </div>
                <div className="parentContents">
                    <div className="childContents">
                        {q.qnaContent}   
                    </div>                     
                     <div className="answerContents">
                        {q.reply}
                     </div>
                    <input type="text" placeholder="answer" onChange={getValue} name ='qnaReply'/>
                    <button onClick={()=>{onSubmitQna(q.qnaId)}}>submit</button>
                </div>
            </QnaInfo>
            )}

           
       

        </Container>
    );
};

export default Qna;