import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Main from './mainPage/Main';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Cart from './pages/Cart';
import FindEmail from './pages/FindEmail';
import FindPwd from './pages/FindPwd';
import Shop from './shopPage/Shop';
import Top from './shopPage/Top';
import Bottom from './shopPage/Bottom';
import FAQ from './pages/FAQ';
import Mypage from './pages/Mypage';
import Board from './pages/Board';
import AdminPage from './adminPage/AdminPage';
import ProductInfo from './pages/ProductInfo';
import ModifyingInfo from './pages/ModifyingInfo';
import Secession from './pages/Secession';
import Mypost from './pages/Mypost';
import Order from './pages/Order';
import Review from './pages/Review';
import Wishlist from './pages/Wishlist';
import UserStore from './context/UserInfo';
import CartOrder from './pages/CartOrder';
import OrderComplete from './pages/OrderComplete';
import AdminSignUp from './adminPage/AdminSignUp';
import Admin401Error from './adminPage/Admin401Error';
import ChatSocket from './chatPage/ChatSocket'

function App() {
  return (
    <UserStore>
      <Router>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/Cart" element={<Cart/>}/>
          <Route path="/FindEmail" element={<FindEmail/>}/>
          <Route path="/FindPwd" element={<FindPwd/>}/>
          <Route path="/Shop" element={<Shop/>}/>
          <Route path="/Top" element={<Top/>}/>
          <Route path="/Bottom" element={<Bottom/>}/>
          <Route path="/FAQ" element={<FAQ/>}/>
          <Route path="/Board/:faqId" element={<Board/>}/>
          <Route path="/Mypage" element={<Mypage/>}/>
          <Route path="/AdminPage" element={<AdminPage/>}/>
          <Route path="ProductInfo" element={<ProductInfo/>}/>
          <Route path="/ModifyingInfo" element={<ModifyingInfo/>}/>
          <Route path="/Secession" element={<Secession/>}/>
          <Route path="/ProductInfo" element={<ProductInfo/>}/>
          <Route path="/Order" element={<Order/>} />
          <Route path="/Mypost" element={<Mypost/>} />
          <Route path="/Review/:productId" element={<Review/>} />
          <Route path="/Wishlist" element={<Wishlist/>} />
          <Route path="/CartOrder/:cartId" element={<CartOrder/>} />
          <Route path="/OrderComplete" element={<OrderComplete/>} />
          <Route path="/AdminSignUp" element={<AdminSignUp/>} />
          <Route path="/Admin401Error" element={<Admin401Error/>} />
          <Route path="/ChatSocket" element={<ChatSocket/>} />
        </Routes>
      </Router>
    </UserStore>
  );
}
export default App;