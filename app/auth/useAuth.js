import { useContext } from "react";
import {jwtDecode} from 'jwt-decode';
import "core-js/stable/atob";
import AuthContext from "./context";
import authStorage from "./storage";
import routes from "../navigations/routes";

export default useAuth = () => {
  const { user, setUser,width,shops,setShops,height,shopImage,setShopImage,orders,setOrders,serviceData,setServiceData,modal,setModal } = useContext(AuthContext);

  const logIn = (authToken,navigation) => {
    const user = jwtDecode(authToken);
    if (user.doctor.authorized){
      setUser(user.doctor);
    }else{
      navigation.navigate(routes.UNAUTHORIZED_USERS);
    }
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };
  

  return { user,width,height,setUser,logIn, logOut,shops,setShops,shopImage,setShopImage,orders,setOrders,serviceData,setServiceData,modal,setModal };
};
