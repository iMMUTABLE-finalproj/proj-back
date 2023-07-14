import React ,{ useContext }from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserInfo";
import AxiosFinal from "../api/AxiosFinal";
import { useNavigate } from "react-router-dom";


const Container=styled.div`
    width: 100%;
    min-width: 400px;
    height: 100%;
    button{
        width: 100px;
        height: 20px;
        border: 1px solid #CCC;
        background-color: white;
        font-size: 11px;
        &:hover{
            background-color: black;
            color:white;
        }
    }
`

const CustomerInfo = styled.div`
    width: 100%;
    height: 27px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 11px;
    border-bottom: 1px solid #CCC;
    .userId{
        width: 100px;
        display: flex;
        justify-content: center;
    }
    .customerName{
        width: 80px;
        display: flex;
        justify-content: center;
    }
    .customerAddr{
        width: 500px;
        display: flex;
        justify-content: center;
    }
    .customerPhone{
        width: 100px;
        display: flex;
        justify-content: center;
    }
    .customerGrade{
        width: 80px;
        display: flex;
        justify-content: center;
    }
    .customerDel{
        width: 70px;
        display: flex;
        justify-content: center;
    }
    button{
        border: 1px solid black;
        background-color: white;
        font-size: 11px;
        &:hover{
            background-color: black;
            color:white;
        }
    }
    .parnetContents{
        width: 100%;
        overflow: hidden;
        transition: height 0.35s ease;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .childContents{
        height: 110px;
        overflow-y: scroll;
        ::-webkit-scrollbar {
        display: none;
        }
    }
`
const  CustomerMan = () =>{
    const navigate = useNavigate();
    //유저data를 adminpage에서 가져옴
    const context = useContext(UserContext);
    const {customerData,setCustomerData} = context;
    //토큰을 담을 상수
    const tokenAdmin = window.localStorage.getItem("AdminToken")
    //고객 삭제 onClick의 ()=>안에 넣어 주어야 함
    const onDeleteCustomer = async(props) =>{ 
        //map의 userID값을 통해서 DB를 갔다온다.
        console.log(props);
        const response = await AxiosFinal.customerDelete(props,tokenAdmin);
        if(response===true){
            onLoadCustomerData();
        }else if(response === 401){
            navigate("/Admin401Error")
        }
    }

    const onLoadCustomerData = async() =>{ 
        const response = await AxiosFinal.customerManage();
        console.log(response.data);
        setCustomerData(response.data);
    }

    return(

        <Container>
            <button onClick={onLoadCustomerData}> DATA RELOAD </button>
            <CustomerInfo>
                <div className="userId">UserID</div>
                <div className="customerName">Name</div>
                <div className="customerAddr">Address</div>
                <div className="customerPhone"> Phone</div>
                <div className="customerGrade">Grade</div>
                <div className="customerDel">Del</div>
            </CustomerInfo>
            
            {customerData && customerData.map((x) =>
                <CustomerInfo>
                    <div className="userId">
                        {x.userId}
                    </div>
                    <div className="customerName">
                        {x.userName}
                    </div>
                    <div className="customerAddr">
                        {x.userAddr}
                    </div>
                    <div className="customerPhone">
                        {x.userPhone}
                    </div>
                    <div className="customerGrade">
                        {x.authority}
                    </div>
                    <div className="customerDel">
                        <button onClick={()=>{onDeleteCustomer(x.userId)}}>탈퇴</button>
                    </div>
                </CustomerInfo>
            )}
            
        </Container>
    );
};

export default CustomerMan;