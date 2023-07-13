import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import Header from "./Header";
import DropFiter from "./DropFiter";
import AxiosFinal from "../api/AxiosFinal";
import { UserContext } from "../context/UserInfo";
import { useNavigate } from "react-router-dom";
import Pagenation from "../pages/Pagenation";



const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
`

const Mainboby=styled.div`
    margin: 0px 40px 0px 40px;

`


const Article = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`

const Container_in = styled.div`
    height: 500px;
    width: 300px;
    margin-left: 10px;



    .blur {
        filter: blur(5px); /* 흐릿한 효과를 원하는 정도로 조절합니다. */
    }

    img{
        margin-left: 40px;
        height: 400px;
    }

    .info{
        margin-left: 40px;
    }

    .logo{
        margin-left: 40px;
        width: 200px;
        font-size: 15px;
        font-weight:bolder;

    }

    .price{
        margin-left: 40px;
        width: 200px;
        font-size: 10px;
    }
`;


const Filter = styled.div`
    width: 250px;
    margin: 20px 0px 20px 0px;
    font-size: 12px;
    color: black;
    float: right;
    display: flex;
    cursor: pointer;

    .name{
        width: 50px;
        height: 16px;
        border-right: 1px solid black;
    }

    .lowPrice{
        margin-left: 10px;
        width: 80px;
        height: 16px;
        border-right: 1px solid black;
    }

    .highPrice{
        width: 90px;
        margin-left: 10px;
    }
`





const Bottom = () => {

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const {item, setItem} = useContext(UserContext);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isBlurred, setIsBlurred] = useState(false);
    const [product, setProduct] = useState([]);
    const nav = useNavigate();

    const id = window.localStorage.getItem("userIdSuv");
    console.log(id);

    const handleHeaderClick = () => {
      setIsBlurred(!isBlurred);
    };
    useEffect(() => {
        const getProduct = async() => {
           const rsp = await AxiosFinal.sellitems();
           if (rsp.status === 200) {
            const filteredProduct = rsp.data.filter((item) => item.productCategory === 'BOTTOM');
             setProduct(filteredProduct);
        };
       };
       getProduct();
      }, []);


    const mergeProduct = {};

    product.forEach((e) => {
    const { productName } = e;

    if (!mergeProduct[productName]) {
        mergeProduct[productName] = {
            productId : e.productId,
            productName: e.productName,
            productMainImg: e.productMainImg,
            productPrice: e.productPrice,
            productDetail : e.productDetail,
            productImgFst: e.productImgFst,
            productImgSnd: e.productImgSnd,
            productImgDetail: e.productImgDetail,
            productPrice: e.productPrice,
            productContent : e.productContent,
        };
    }
    });

    const handleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
      };

    const onclick = async(e) => {
        const productName = e.productName;
        const rsp = await AxiosFinal.dataProduct(productName);
        const result = rsp.data;
        setItem(result);
        window.localStorage.setItem("heartProductId",result[0].productId);
        window.localStorage.setItem("productData", JSON.stringify(rsp.data));

        nav("/ProductInfo");
    }



        // 가격 높은순
        const priceHigh = () => {
            const sortedProduct = [...product].sort((a, b) => b.productPrice - a.productPrice);
            setProduct(sortedProduct);
        };

        // 가격 낮은 순
        const priceLow = () => {
            const sortedProduct = [...product].sort((a, b) => a.productPrice - b.productPrice);
            setProduct(sortedProduct);
        };

        // 이름 순
        const sortByName = () => {
            const sortedProduct = [...product].sort((a, b) => a.productName.localeCompare(b.productName));
            setProduct(sortedProduct);
        };

    return(
      <Container>
        <Header onClick={handleHeaderClick}/>

        <Mainboby >
            <Filter>
                <div className="name" onClick={sortByName}>이름 순</div>
                <div className="lowPrice" onClick={priceLow}>가격 낮은 순</div>
                <div className="highPrice" onClick={priceHigh}>가격 높은 순</div>
            </Filter>
            <Article >
            {Object.values(mergeProduct).slice(offset, offset + limit).map((e)=> (
                <Container_in key={e.productName} onClick={()=>onclick(e)}>
                    <div className={isBlurred ? "blur" : ""}>
                        <div className="view">
                            <img src={e.productImgFst} />
                            <div className="logo">iMMUTABLE</div>
                            <div className="info">{e.productName}</div>
                            <div className="price">{e.productPrice.toLocaleString()}</div>
                        </div>
                    </div>
                </Container_in>
            ))}
            </Article>
                <Pagenation
                total={product.length}
                limit={limit}
                page={page}
                setPage={setPage}
                />
        </Mainboby>
      </Container>
    )
};

export default Bottom;