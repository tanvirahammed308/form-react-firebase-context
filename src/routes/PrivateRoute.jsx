import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const {user,loader}=useContext(AuthContext);
    const location=useLocation()
    console.log(location.pathname)
    if (loader) {
        return <span className="loading loading-ring loading-lg"></span>
        
    }
    if (user) {
        return children
        
    }
  return (
    <Navigate to='/login' state={location.pathname}></Navigate>
  )
}

export default PrivateRoute