import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import PopupPostCode from "../api/PopupPostCode";
import AxiosFinal from "../api/AxiosFinal";
import { isCompositeComponent } from "react-dom/test-utils";
import Shop from "../shopPage/Shop";


const Container=styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .contTop{
    width: 80%;
    display: flex;
    flex-direction: row;
  }
  .shop{
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-start;
  }
  .chkAll,.chkDel{
    margin-right: 5px;
    height: 25px;
    border-radius: 2px;
    border: 1px solid #CCC;
    font-size: 11px;
    color: rgb(50,50,50);
    background-color: white;
    &:hover{
      background-color: black;
      color: white;
    }
  }
  a{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
    color:rgb(50,50,50);
    font-size: 12px;
  }
`
const MainBody=styled.div`
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
  height: 90%;
  .paymentBtn{
    margin: 10px 0 0 0;
    width: 100%;
    height: 70px;
    font-size: 12px;
    color: rgb(50,50,50);
    border: 1px solid #CCC;
    background-color: white;
    &:hover{
      background-color: black;
      color: white;
    }
  }
`
const Products = styled.div`

  width: 100%;
  height: 100%;
  overflow-y:scroll;
  ::-webkit-scrollbar {
    display: none;
  }

`
const Products_in=styled.div`

  width: 100%;
  height: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  &:hover{
    background-color: rgba(0,0,0,0.1);
  }

  .delete_item{
    background-color:white;
    border: none;
    cursor : pointer;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  }

  .product_image{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100%;
  }
  .itemName{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 40%;
    height: 100%;
    padding: 0 0 0 5px;
    font-size: 12px;
  }
  .count{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
  }
  input{
    width: 20px;
    height: 20px;
  }
  .countbutton{
    display: flex;
    flex-direction: column;
  }
  .plus,.minus{
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: white;
    &:hover{
      background-color: black;
      color: white;
    }
  }
  .price{
    width: 120px;
    font-size: 12px;
  }
  img{
    width: 80px;
  }

  .total{

    display: flex;
    position: reltive;
  }
`
const Total=styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  height: 80px;
  font-size: 12px;
`

const OrderInfo=styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 300px;
  border-bottom: 1px solid #ccc;
  color:rgba(80,80,80);
  font-size: 12px;
  .shippingInfo{
    padding: 0 0 0 10px;
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    .name{
      margin: 20px 0 0 0;
    }
    .addr{
      margin: 10px 0 10px 0;
    }
  }
  .addrChange{
    font-size: 12px;
    color: rgb(50,50,50);
    background-color: white;
    border: 1px solid #CCC;
    width: 120px;
    height: 40px;
    border-radius: 4px;
    &:hover{
      background-color: black;
      color: white;
    }
  }
`


const Cart=()=>{
    const [count, setCount] = useState([]);

    const navigate = useNavigate();

    const[cartList, setCartList] = useState([]);


    // 주문창으로 이동, order에 장바구니 정보 저장
    const onClickCartOrder = async(cartId) => {
        navigate(`/CartOrder/${cartId}`);
    }

    // 장바구니에 제품이 없을경우 shop 페이지로 이동
    const onClickShop = () => {
        navigate('/Shop');
    }


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

    const id = window.localStorage.getItem("userIdSuv");


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



    // 토탈 가격
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        for(let i = 0; i< cartList.length; i++){
            totalPrice += cartList[i].setOriginProductPrice * count[i];
            console.log("total" + totalPrice)
        }
        return totalPrice.toLocaleString();

    }


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

    console.log(cartList)

    // 카트 아이템 삭제
    const deleteCartItem = async(id, index) => {
        console.log(index);
        console.log("삭제");
        const cartItemId =  cartList[index].cartItemId;
        console.log(" ::"  + cartItemId);
        const rsp = await AxiosFinal.deleteCartItem(id, cartItemId);
        setCartList(rsp.data);
    }


    return(
        <Container>
            <div className="contTop">
                <div className="shop">
                    <Link to="/shop">shop</Link>
                </div>
                <Link to="/">home</Link>
            </div>
            <MainBody>

                <Products>
                    {cartList && cartList.map((e, index)=>(
                        <Products_in key={e.cartItemId}>
                            <div className="product_image">
                                <img src ={e.productImgFst} /></div>
                            <div className="itemName">{e.productName}</div>
                            <div className="itemSize">{e.sizeStatus}</div>
                            <div className="count">
                                <input type="text" Value={count[index]} />
                                <div className="countbutton">
                                    <button className="plus" onClick={()=>countPlus(index)}>∧</button>
                                    <button className="minus" onClick={()=>countMinus(index)}>∨</button>
                                </div>
                            </div>
                            <div className="price">{(e.setOriginProductPrice * count[index]).toLocaleString()} won</div>
                            <button className="delete_item" onClick={() => deleteCartItem(id, index)}>x</button>
                        </Products_in>
                    ))}
                </Products>


                <Total>
                    {calculateTotalPrice()} won
                </Total>

                {cartList && cartList.length > 0 ?(
                    <button className="paymentBtn" onClick={() => onClickCartOrder(cartList[0].cartId)}>payment</button>
                ) : (
                    <button className="paymentBtn" onClick={onClickShop}>SHOP</button> )}
            </MainBody>
        </Container>
    );
};

export default Cart;