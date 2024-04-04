import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const Header = () => {
  const {user,createSignOut}=useContext(AuthContext)
  const handlelogOut=()=>{
    createSignOut().then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Log out successfully",
        showConfirmButton: false,
        timer: 1500
      });
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }
    const navLinks=<>
    <li>
              <Link to='/'>Home</Link>
            </li>
    <li>
              <Link to='/product'>Product</Link>
            </li>
    <li>
              <Link to='/cart'>Cart</Link>
            </li>
    <li>{
      
      
      user &&  <Link >{user.displayName}</Link>
    
    }
             
            </li>
    <li className=" md:hidden">
              <Link to='/login'>Login</Link>
            </li>
    
    </>
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {
                navLinks
            }
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">React-form</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {
            navLinks
          }
        </ul>
      </div>
      <div className="navbar-end">
        {
          user ? <Link onClick={handlelogOut} to='/login' className="btn">Logout</Link> : <Link to='/login' className="btn">Login</Link>
        }
        
      </div>
    </div>
  );
};

export default Header;
