import axios from "axios";
const Final_proj = "http://localhost:8111";

const AxiosFinal = {
     // 로그인
     memberLogin: async(email, pw) => {    
        const login = {
            email : email,
            pwd : pw 
        };
        return await axios.post(Final_proj + "/auth/login", login);
    },
    adminSignUp: async(email, pw) => {    
        const signUpToken = {
            userEmail : email,
            userPwd : pw
        };
        return await axios.post(Final_proj + "/auth/signupToken", signUpToken);
    },
    // 어드민 로그인
     adminLogin: async(email, pw) => {    
        const adminLogin = {
            email : email,
            pwd : pw 
        };
        return await axios.post(Final_proj + "/auth/adminLogin", adminLogin);
    },
      // 어드민 토큰로그인
      adminTokenLogin: async(email, pw) => {    
        const adminTokenLogin = {
            userEmail : email,
            userPwd : pw
        };
        try{
            return await axios.post(Final_proj + "/auth/loginToken", adminTokenLogin);
            }catch (error){
                return error.response.status;
            }
    },
    //로그인시 로그인 유저 정보 저장
    orderMemberData: async(email) =>{
        const usrData = {
            email : email
        };
        return await axios.post(Final_proj + "/auth/userData", usrData);
    },
    // 전체 상품
    shop : async() => {
        return await axios.get(Final_proj + `/product/items`);
    },
    //어드민 페이지에서 아이템 전체 불러오기
    onLoadInventory : async(token) => {
        try{
            return await axios.get(Final_proj + `/admin/items`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });
            } catch(error){
                return error.response.status;
            }
    },
    //어드민페이지 head상태창 신규조회
    newOrderCheck: async(orderStatus) => {    
         const newOrder = {
                orderStatus : orderStatus
        };
        return await axios.post(Final_proj + "/adminPage/newOrderList", newOrder);
    },
    shipOrderCheck: async(orderStatus) => {    
        const shipOrder = {
                orderStatus : orderStatus
        };
        return await axios.post(Final_proj + "/adminPage/shipOrderList", shipOrder);
    },
    newQnaCheck: async(qnaStatus) => {    
        const newQna = {
                qnaStatus : qnaStatus
        };
        return await axios.post(Final_proj + "/adminPage/qnaLoadList", newQna);
    },
    //아이템 업로드
    productUpload : async(title,price,color,size,category,content,imgFst,imgSnd,imgDetail,token)=>{
        const upLoad={
            productName:title,
            productPrice:price,
            productColor:color,
            productSize:size,
            productCategory:category,
            productDetail:content,
            productImgFst:imgFst,
            productImgSnd:imgSnd,
            productImgDetail:imgDetail
        };
        try{
        return await axios.post(Final_proj + "/admin/upload", upLoad,{
          headers :{
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          }});
          }catch(error){
            return error.response.status;
          }

    },    
    //어드민페이지 회원 전체조회
    customerManage : async(token) => {
        try{
            return await axios.get(Final_proj + `/admin/check`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });
            } catch(error){
//                console.log(error);
//                console.log(error.response.status)
                return error.response.status;
            }
     },
    //어드민페이지 회원 선택 삭제
    customerDelete : async(userId,token) => {
        const deleteUser={
            userId : userId
        };
        try{
            return await axios.post(Final_proj + "/admin/deleteUser", deleteUser,{
                headers:{
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer ' + token
                }
            });
        }catch(error){
                 return error.response.status;
        }
    },
     //어드민페이지 qna 전체조회
     qnaLoadManage : async(token) => {
         try{
             return await axios.get(Final_proj + `/admin/qnaLoad`,{
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + token
                  },
             });
             } catch(error){
                  return error.response.status;
         }
      },
    //어드민페이지에 qna답변달기
    qnaUploadReply : async(qnaId,statue,reply,token)=>{
            const qnaReplyUpLoad={
                qnaId : qnaId,
                qnaStatue : statue,
                qnaReplay : reply
            };
          try{
              return await axios.post(Final_proj + "/admin/qnaUpload", qnaReplyUpLoad,{
                 headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                 }
              });
            }catch(error){
                return error.response.status;
          }
    },
    //어드민페이지 주문건 전체조회
    orderLoadManage : async(token) => {
         try{
             return await axios.get(Final_proj + `/admin/orderLoad`,{
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + token
                  },
             });
             } catch(error){
                  return error.response.status;
         }
    },
    // 어드민페이지 주문건 수정
    orderUploadData : async(orderId,orderStatus,shipCode,shipCompany)=>{
        const orderUpLoadData={
            orderId : orderId,
            orderStatue : orderStatus,
            orderShipCode : shipCode,
            orderShipCompany : shipCompany,
        };
        return await axios.post(Final_proj + "/admin/orderUpLoad", orderUpLoadData);
    },        
    //어드민 페이지 상품 Fst이미지 수정
    productChangeImgFst : async(productId,fstUrl)=>{
        const changeImgFst={
            productId : productId,
            productImgFst : fstUrl
        };
        return await axios.post(Final_proj + "/product/changImgFst", changeImgFst);
    },
     //어드민 페이지 상품 Snd이미지 수정
     productChangeImgSnd : async(productId,sndUrl)=>{
        const changeImgSnd={
            productId : productId,
            productImgSnd : sndUrl
        };
        return await axios.post(Final_proj + "/product/changImgSnd", changeImgSnd);
     },
     //어드민 페이지 상품 Detail이미지 수정
     productChangeImgDetail:async(productId,content,DetailUrl)=>{
        const changeImgDetail={
            productId : productId,
            productDetail:content,
            productImgDetail : DetailUrl
        };
        return await axios.post(Final_proj + "/product/changImgDetail", changeImgDetail);
     },
     //어드민 페이지 상품 재고 상태 수정
     productChangeData:async(productId,productStock,productSellStatus,productName)=>{
        const changeDetail={
            productId : productId,
            productStock:productStock,
            productSellStatus:productSellStatus,
            productName:productName
        };
        return await axios.post(Final_proj + "/product/changDetail", changeDetail);
    },
    //7일치 데이터 로드
    onLoadOrderDate:async(date,token)=>{
        const day={orderDate : date};
        try{
            return await axios.post(Final_proj + "/admin/findOrderDay", day,{
                headers:{
                       'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                 },
            });
            }catch(error){
                return error.response.status;
            }
    },
    // 어드민페이지 채팅 리스트 가져오기
    onLoadChatList : async(token) => {
         try{
             return await axios.get(Final_proj + `/admin/chatList`,{
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + token
                  },
             });
             } catch(error){
                  return error.response.status;
         }
    },
    //회원 조회
    memberGet: async(userId) => {
        return await axios.get(Final_proj + `/auth/users?userId=${userId}`);
    },
    // 아이디 찾기 
    searchUserEmail: async (email) => {
        return await axios.get(Final_proj+ `/auth/searchEmail?userEmail=${email}`);
    },
    // 비밀번호 찾기 
    searchPw: async (name, email, id) => {
            const searchPw = {
                name : name,
                email : email,
                id : id

            };
        return await axios.post(Final_proj+ "/searchPw", searchPw);
     },
    // 회원 가입 여부 확인
    memberRegCheck : async(email) => {
        return await axios.get(Final_proj + `/auth/check?email=${email}`);
    },
    // 회원 가입
    memberReg: async(name, email, pwd, addr, phone) => {
        const member = {
            userName: name,
            userEmail: email,
            userPwd: pwd,
            userAddr: addr,
            userPhone: phone,
        };
        return await axios.post(Final_proj + "/auth/signup", member);
    },
     //탈퇴
       memberSec : async(userId) =>{
           const sec ={
               userEmail : userId
           };
           return await axios.post(Final_proj + "/auth/sec", sec);
       },
    // 이메일 인증
    mailCode : async(email) => {
        return await axios.get(Final_proj + `/email/?email=${email}`);
    },
    // 이메일 인증 번호 
    mailCodeck : async(email, code) => {
        const check = {
            email : email,
            code : code
        }
        return await axios.post(Final_proj + `/verify`, check);
    },    
    // 임시 비밀번호 (고치기)
    pwdReset : async(email, name) => {
        const reset = {
            email : email,
            name : name
        }
        return await axios.post(Final_proj + `/resetPwd`, reset);
    },
    //채팅

    //faq 업로드
    faqUpload : async(title, content) => {
        const upload = {
            faqTitle : title,
            faqContent : content,
        }
        return await axios.post(Final_proj + `/faq/uploadFaq`, upload);
    },

    //faq List 가져오기
    faqList : async() => {
        return await axios.get(Final_proj + `/faq/faqList`);
    },

    // faq id로 list 불러오기
    faqIdList : async(faqId) => {
        return await axios.get(Final_proj + `/faq/faqIdList?faqId=${faqId}`);
    },

     // faq삭제
    faqDelete : async(faqId) => {
        const deleteFaq = {
            faqId : faqId
        }
        return await axios.post(Final_proj + `/faq/deleteFaq`, deleteFaq);
    },

    // faq 수정
    faqEdit : async(faqId, faqTitle, faqContent) => {
        const editFaq = {
            faqId : faqId,
            faqTitle : faqTitle,
            faqContent : faqContent
        }
        return await axios.post(Final_proj + `/faq/editFaq`, editFaq);
    },
  
    // 회원 정보 수정 저장
    saveUserInfo : async (userId, userName, userPwd, userAddr, userPhone) =>{
        const userInfo = {
            userId : userId,
            userName : userName,
            userPwd : userPwd,
            userAddr : userAddr, 
            userPhone : userPhone
        }
        return await axios.post(Final_proj +"/auth/saveInfo", userInfo)
    },
    //회원 프로필사진 정보 수정 저장
    changeUserImg : async (userEmail, userImg) =>{
        const userImgInfo = {
            userEmail : userEmail,
            userImg : userImg
        }
        return await axios.post(Final_proj +"/auth/saveUserImgInfo", userImgInfo)
    },
    // SELL 상품
    sellitems : async() => {
        return await axios.get(Final_proj + `/product/sellitems`);
    },

    // 좋아요 Insert
    likeProduct : async(id, heartProductId) => {
        const like = {
            id : id,
            productId : heartProductId
        }
        return await axios.post(Final_proj + "/like/likeInsert", like);
    },


    // 좋아요 불러오기
    wishItem : async(id) => {
        return await axios.get(Final_proj + `/like/likeList?id=${id}`);
    },

    // 좋아요 삭제
    deleteLikeProduct : async(id, heartProductId) => {
        const dislike = {
            id : id,
            productId : heartProductId
        }
        return await axios.post(Final_proj + "/like/likeDelete", dislike)
    },

    // 상품 좋아요 표시
    viewHeart : async(id, heartProductId) => {
        const heart = {
            id : id,
            productId : heartProductId
        }
        return await axios.post(Final_proj + "/like/Heart", heart)
    },

    // 장바구니 담기
     addCartItem : async(id, productId) =>{
        const params = {
            id : id,
            productId: productId 
        }
        return await axios.post(Final_proj + "/cart/addCartItem", params)
    },
        
    
    // 장바구니 상품
    cartItemList : async(id) => {
        return await axios.get(Final_proj + `/cart/cartItemList?id=${id}`);
    },

    // 카트 아이템 수량
    updateCount : async(count, cartList, idx) => {
            const updateCount = {
                count : count,
                cartList : cartList,
                idx : idx
            }
            return await axios.post(Final_proj + "/cart/updateCount", updateCount);
        },

    // qna 추가
    qnaUpdate : async(productId, userEmail, qnaTitle, qnaContent) => {
        const qna = {
            productId : productId,
            userEmail : userEmail,
            qnaTitle : qnaTitle,
            qnaContent : qnaContent
        }
        return await axios.post(Final_proj + "/qna/uploadQna", qna);
    },

    // user QnA 가져오기
    memQnaList : async() => {
        return await axios.get(Final_proj + `/qna/qnaList`);
    },

    // 제품이름으로 제품 정보 가져오기
    dataProduct : async(productName) => {
        return await axios.get(Final_proj + `/product/getProductData?productName=${productName}`);
    },

    // Qna 불러오기
    viewQna : async(heartProductId) => {
        return await axios.get(Final_proj + `/qna/qnaList?heartProductId=${heartProductId}`);
    },

    // 나의 Qna 불러오기
    myQna : async(id) => {
        return await axios.get(Final_proj + `/qna/myQnaList?id=${id}`);
    },

    // 나의 Qna 수정에서 제품정보 불러오기
    myQnaProductInfo : async(productId) => {
        return await axios.get(Final_proj + `/qna/myQnaProductInfo?productId=${productId}`);
    },

    // 나의 Qna 수정에서 내가 쓴 내용 가져오기
    editViewMyQna : async(qnaId) => {
        return await axios.get(Final_proj + `/qna/editViewMyQna?qnaId=${qnaId}`);
    },

    // 내가 쓴 Qna 수정
    editMyQna : async(qnaId, title, content) => {
        const editData = {
            qnaId : qnaId,
            title : title,
            content : content
        }
        return await axios.post(Final_proj + "/qna/editMyQna", editData);
    },

    // 내가 쓴 Qna 삭제
    deleteMyQna : async(qnaId) => {
        const deleteQna = {
            qnaId : qnaId
        }
        return await axios.post(Final_proj + "/qna/deleteMyQna", deleteQna);
    },

    // 오더페이지에서 카트 목록 가져오기
    realOrderList : async(cartId) => {
        return await axios.get(Final_proj + `/order/cartOrderList?cartId=${cartId}`);
    },

    // 오더페이지에서 주문하는 회원정보 가져오기
    orderGetUser : async(cartId) => {
        return await axios.get(Final_proj + `/order/orderGetUser?cartId=${cartId}`);
    },

    // 장바구니 상품목록 order에 저장
    orderPlace : async(cartId, inputName, inputEmail, inputPhone, addr) => {
        const saveOrder = {
            cartId : cartId,
            inputName : inputName,
            inputEmail : inputEmail,
            inputPhone : inputPhone,
            addr : addr
        }
        return await axios.post(Final_proj + "/order/cartOrder", saveOrder);
        },

    // cart에서 상품 목록 가져오기
    getCartList : async(cartId) => {
        return await axios.get(Final_proj + `/order/cartOrder?cartId=${cartId}`);
    },

    // 카트 아이템 삭제
    deleteCartItem : async(id, cartItemId) => {
        const deleteItem = {
            id : id,
            cartItemId : cartItemId
            }
        return await axios.post(Final_proj + "/cart/deleteItem", deleteItem);
     },

    // totalPrice 가져오기
     getTotalPrice : async(cartId) => {
         return await axios.get(Final_proj + `/order/totalPrice?cartId=${cartId}`);
     },

    // 주문내역 조회
    orderHistory : async(userEmail) => {
        return await axios.get(Final_proj + `/order/orderHistory?userEmail=${userEmail}`);
    },

    // 주문내역 리뷰 제품 정보 불러오기
    reviewProduct : async(productId) => {
        return await axios.get(Final_proj + `/review/reviewProduct?productId=${productId}`);
    },

     // 리뷰 작성하기
    submitReview : async(rate, productId, title, content, userEmail, orderId) => {
        const reviewData = {
            rate : rate,
            productId : productId,
            title : title,
            content : content,
            userEmail : userEmail,
            orderId : orderId
        }
        return await axios.post(Final_proj + "/review/writeReview", reviewData);
    },

    // 제품 별 리뷰 불러오기
    viewReview : async(productName) => {
        return await axios.get(Final_proj + `/review/viewReview?productName=${productName}`);
    }
    
};

export default AxiosFinal;