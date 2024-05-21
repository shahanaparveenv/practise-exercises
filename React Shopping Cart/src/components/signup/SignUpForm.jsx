import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UseContext from "../../contexts/todoContext/UseContext";
import axios from "axios";
import { toast } from "react-toastify";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UseContext);
  const navigate = useNavigate();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      mobile: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(4).max(30).required().trim(),
      email: Yup.string()
        .required()
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "not a valid email address"
        ),
      mobile: Yup.string()
        .required()
        .matches(/^[789]\d{9}$/, "not a valid mobile number"),
      password: Yup.string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "password should contain atleast one uppercase, lowercase,number and a special character"
        )
        .trim(),
      confirmpassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "password must be same"
      ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { data } = await axios.post("http://localhost:3000/signup", {
          username: values.username,
          email: values.email,
          password: values.password,
        });
        if (data.success) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
          toast.success(`welcome ${data.user.username}`);
          navigate("/");
        } else {
          toast.error(data.err_msg);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="p-10 justify-center items-center flex">
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-[50%] flex-col gap-3"
      >
        <h1 className="font-serif text-2xl">Sign Up</h1>
        <div className="flex flex-col">
          <label htmlFor="username">user name</label>
          <input
            className="shadow shadow-black outline-none rounded p-2"
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <p className="text-red-600 text-sm">{formik.errors.username}</p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">email</label>
          <input
            className="shadow shadow-black outline-none rounded p-2"
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <p className="text-red-600 text-sm">{formik.errors.email}</p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="mobile">mobile</label>
          <input
            className="shadow shadow-black outline-none rounded p-2"
            type="text"
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
          />
          <p className="text-red-600 text-sm">{formik.errors.mobile}</p>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="password">password</label>
          <div className="relative">
            <input
              className="shadow w-full shadow-black outline-none rounded p-2"
              type={showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
            />
            <p className="text-red-600 text-sm">{formik.errors.password}</p>

            <button
              type="button"
              className=" absolute right-2 top-1/3 cursor-pointer"
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
        <div className="flex flex-col">
          <label htmlFor="confirmpassword">confirm password</label>
          <input
            className="shadow-lg shadow-black outline-none rounded p-2"
            type="password"
            name="confirmpassword"
            value={formik.values.confirmpassword}
            onChange={formik.handleChange}
          />
          <p className="text-red-600 text-sm">
            {formik.errors.confirmpassword}
          </p>
        </div>
        {loading ? (
          <span className="bg-gray-500 p-2 rounded shadow shadow-black flex justify-center items-center ">
            <i class="fa-solid fa-spinner animate-spin"></i>
          </span>
        ) : (
          <button
            className="bg-red-700 text-white p-2 rounded shadow shadow-black"
            type="submit"
            
          >
            Sign Up
          </button>
        )}

        <hr className="mt-1" />
        <p className="block font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700">
          Already have an account?
          <Link to="/login" className="text-red-700 underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
export default SignUpForm;
