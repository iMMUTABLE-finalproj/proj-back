import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {Link , useNavigate, useParams} from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import MyPageHeader from "../shopPage/MypageHeader";
import AxiosFinal from "../api/AxiosFinal";
import { UserContext } from "../context/UserInfo";


const Container = styled.div`
  width: 100%;
  height: 100vh;
`;


const InnerContainer = styled.div`
  width: 100%;
  margin-top: 50px;
  .header {
    margin: 0 40px;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const Product = styled.div`
  width: 100%;
  .wrapper {
    margin: 40px 40px;
    display: flex;
    .product {
      width: 50%;
      display: flex;
      justify-content: center;
      .imgName {
        display: flex;
        flex-direction: column;
        img {
          width: 400px;
          height: 400px;
          object-fit: cover;
        }
        .Name {
          display: flex;
          margin-top: 30px;
          font-size: 20px;
          justify-content: center;
          font-weight: bolder;
        }
      }
    }
    .content {
      width: 50%;
      .star{
        margin-bottom: 50px;
        & svg {
          color: #e6e6e6;
          cursor: pointer;
        }
        /* :hover svg {
            color: black;
        } */
        /* & svg:hover ~ svg {
            color: #e6e6e6;
        } */
        .black {
          color: black;
        }
      }
      .Title {
        margin: 20px 0;
        display: flex;
        .title {
          font-size: 14px;
          width: 20%;
        }
        input {
          width: 400px;
        }
      }
      .rvCon {
        margin-bottom: 20px;
        display: flex;
        .rvContent {
          width: 20%;
          font-size: 14px;
        }
        textarea {
          width: 400px;
          height: 200px;
          resize: none;
        }
      }
      .Btn {
        display: flex;
        justify-content: center;
        button {
          width: 410px;
          height: 40px;
          background-color: black;
          color: white;
          outline: none;
          cursor: pointer;
        }
      }
    }
  }
`;

const Review = () => {
    const navigate = useNavigate();
    const {productId} = useParams();
    const [productInfo, setProductInfo] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const {orderId} = useContext(UserContext);
    const id = window.localStorage.getItem("userIdSuv");

    const [clicked, setClicked] = useState([false, false, false, false, false]);
    const array = [0, 1, 2, 3, 4];
    const starClick = (index) => {
        let clickStatus = [...clicked];
        for(let i = 0; i < 5; i++) {
            clickStatus[i] = i <= index ? true : false;
        }
        setClicked(clickStatus);
    }
    let score = clicked.filter(Boolean).length;
    console.log(score);

    useEffect(()=> {
        const getProductInfo = async() => {
            const rsp = await AxiosFinal.reviewProduct(productId);
            console.log(rsp.data); setProductInfo(rsp.data);
        }
        getProductInfo();

    },[]);

    const writeTitle = (e) => {
        setTitle(e.target.value);
    }

    const writeContent = (e) => {
        setContent(e.target.value);
    }

    const writeReview = () => {
        if (title === "" || content === "") {
            alert("제목, 내용을 모두 입력해주세요");
            return;
        }
        const reviewWrite = async() => {
            const rsp = await AxiosFinal.submitReview(score, productId, title, content, id, orderId);
            console.log(rsp.data);
            if(rsp.data) {
                alert("리뷰가 작성되었습니다.");
                navigate("/Order");
            } else {
                alert("리뷰 작성에 실패하였습니다.");
            }
        }
        reviewWrite();
    }


    return (
        <Container>
            <MyPageHeader />
            <InnerContainer>
                <div className="header">후기 작성
                    <hr />
                </div>
                <Product>
                    <div className="wrapper">
                        <div className="product">
                            <div className="imgName">
                                <img src={productInfo.productImgFst} alt="" />
                                <div className="Name"><span>{productInfo.productName}</span></div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="star">{array.map((e)=> (
                                <FaStar key={e}
                                        onClick={()=> starClick(e)}
                                        className={clicked[e] && 'black'}
                                        size="30"
                                />
                            ))}</div>
                            <div className="Title">
                                <div className="title">제목</div>
                                <input type="text" placeholder="제목을 입력하세요" value={title} onChange={writeTitle}/>
                            </div>
                            <div className="rvCon">
                                <div className="rvContent">내용</div>
                                <textarea placeholder="내용을 입력하세요" value={content} onChange={writeContent}/>
                            </div>
                            <div className="Btn">
                                <button onClick={writeReview}>등록하기</button>
                            </div>
                        </div>

                    </div>
                </Product>
            </InnerContainer>
        </Container>
    );
}

export default Review;