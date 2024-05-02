import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { updateProfile  } from 'firebase/auth';
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { IoEyeOffOutline } from "react-icons/io5";





const Register = () => {
  const navigate=useNavigate();
  const [showPassword,setShowPassword]=useState(false)
   
    const { newUser,}=useContext(AuthContext);
  const handleRegister=e=>{
    e.preventDefault();
    const form=e.target;
    const name=form.name.value
    
    const form=new FormData(e.currentTarget);
   
    const name=form.get('name');
    const email=form.get('email');
    const password=form.get('password');
    console.log(name,email,password);
    newUser( email, password)
    .then(userCredential => {
      const user = userCredential.user;
      console.log(user)
      updateProfile( user,{ displayName: name })
        .then(() => {
          console.log("Profile updated!");
        })
        .catch(error => {
          console.log(error);
        });
        if (user) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registration success",
            showConfirmButton: false,
            timer: 1500
          });
          
        }
        navigate('/login')
    })
  // .then((userCredential) => {
  //   // Signed up 
  //   const user = userCredential.user;
  //   console.log(user);
  //   updateName(name, {
  //     displayName: "name"
  //   }).then(() => {
  //     // Profile updated!
  //     console.log('Profile updated!')
  //     // ...
  //   }).catch((error) => {
  //     // An error occurred
  //     console.log(error)
  //     // ...
  //   });
    
  //   // ...
  // })
  .catch((error) => {
  
    const errorMessage = error.message;
    console.log(errorMessage)
    // ..
  });
    
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              
            </div>
            <div className="mt-2 flex items-center relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text':"password"}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <span className="absolute right-0 pr-1" onClick={()=>setShowPassword(!showPassword)}>
                {
                  showPassword ? <IoEyeOffOutline />
                  :<FaEye />
                }
              

              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
         Already Have an Account?
          <Link to='/login'
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
