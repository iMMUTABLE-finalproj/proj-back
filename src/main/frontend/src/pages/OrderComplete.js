import React from "react";
import styled from "styled-components";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    a {
        width: 300px;
        height: 40px;
        margin-top: 20px;
        text-decoration: none;
        border: 1px solid black;
        color: black;
        justify-content: center;
        text-align: center;
        line-height: 40px;
        &:hover{
            color: #CCC;
            background-color: black;
        }
    }
    .header {
        margin-bottom: 20px;
        font-weight: bold;
        font-size: 50px;
    }
    .item {
        font-size: 20px;
    }
`;

const OrderComplete = () => {
    const location = useLocation();
    console.log(location);
    const url = location.search;
    const token = url.split('=')[1];
    console.log(token);
    console.log(window.localStorage.getItem("tid"));

    const handleApprove = async () => {
        try {
            const response = await axios.post(
                'https://kapi.kakao.com/v1/payment/approve',
                {
                    cid: 'TC0ONETIME', // 가맹점 CID
                    tid: window.localStorage.getItem("tid"),
                    partner_order_id: 'partner_order_id', // 가맹점 주문번호
                    partner_user_id: 'partner_user_id', // 가맹점 회원 ID
                    pg_token: token,

                },
                {
                    headers: {
                        Authorization: `KakaoAK 3923bafc46ca0d258af73bbf339e36d4`,       // 카카오톡 API 접속 로그인 후 내 애플리케이션 Admin키 저장
                        "Content-type": `application/x-www-form-urlencoded;charset=utf-8`
                    },
                }
            );
            console.log(response.data); // 결제 요청 결과 확인
            console.log(response.data.amount); // 가격확인
            console.log(response.data.amount.total); // 가격확인
            console.log(response.data.quantity); //수량 확인
            // window.close();//결제 완료후 창이 닫긴다.

        } catch (error) {
            console.error("에러입니다1.");
            console.error(error);
        }
    };

    return(
        <Container>
            <div className="header">iMMUTABLE</div>
            <div className="item">주문이 완료되었습니다.</div>
            <Link to="/" onChange={handleApprove}>메인으로</Link>
        </Container>
    );
};

export default OrderComplete;