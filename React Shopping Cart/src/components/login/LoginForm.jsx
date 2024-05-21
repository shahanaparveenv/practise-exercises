import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import UseContext from "../../contexts/todoContext/UseContext";
import axios from "axios";

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate= useNavigate();
  const {setUser} = useContext(UseContext);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik=useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema: Yup.object({
      email: Yup.string()
      .required()
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "not a valid email address"
      ),  password: Yup.string()
      .required().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "password should contain atleast one uppercase, lowercase,number and a special character"
      )
      .trim()
    }),
    onSubmit:async (values) => {
      setLoading(true);
      try {
        const {data} = await axios.post("http://localhost:3000/login", values);
        if(data.success){
          localStorage.setItem("user",JSON.stringify(data.user));
          setUser(data.user);
          toast.success(`welcome back ${data.user.username}`);
          navigate("/")
        }
        else{
          toast.error(data.err_msg);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error(error.message);
      }
     
    },
    
  });

  
  return (
    <div className="p-10 mt-10 justify-center items-center flex">
      <form onSubmit={formik.handleSubmit} className="flex w-[50%] flex-col gap-3">
        <div className="flex flex-col">
          <label htmlFor="email">email</label>
          <input
            className="shadow-lg shadow-black outline-none rounded p-2"
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
           <p className="text-red-600 text-sm">{formik.errors.username}</p>
       
        </div>
        <div className="flex flex-col ">
          <label htmlFor="password">password</label>
          <div className="relative">
            <input
              className="shadow-lg w-full shadow-black outline-none rounded p-2"
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <p className="text-red-600 text-sm">{formik.errors.password}</p>
       
            <button
              type="button"
              className=" absolute right-2 top-1/4 cursor-pointer"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </button>
          </div>
        </div>
        { loading ? (
          <span className="bg-gray-500 p-2 rounded shadow shadow-black flex justify-center items-center ">
            <i class="fa-solid fa-spinner animate-spin"></i>
          </span>
        ) : ( <button
          className="bg-red-700 p-2 rounded shadow shadow-black text-white"
          type="submit"
        >
          Login
        </button>)}
       
        <hr className="mt-1"/>
        <p className="block font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700">
              New User?
              <Link to="/signup" className="text-blue-700 underline">
                Sign Up
              </Link>
              </p>
      </form>

    </div>
  );
}
export default LoginForm;
