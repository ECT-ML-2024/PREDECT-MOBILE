import { useContext } from "react";
import {jwtDecode} from 'jwt-decode';
import "core-js/stable/atob";
import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser,width,shops,setShops,height,shopImage,setShopImage,orders,setOrders,serviceData,setServiceData,modal,setModal } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    setUser(user.user);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };
  

  return { user,width,height,setUser,logIn, logOut,shops,setShops,shopImage,setShopImage,orders,setOrders,serviceData,setServiceData,modal,setModal };
};
