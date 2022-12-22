import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthComponent from "../AuthComponent";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { logInAC, logOutAC } from "../../redux/reducer";
import { trackURL } from "../trackURL.js";
import * as yup from "yup";
import axios from "../../api/axios";

const Signin = () => {
  let isAuthorized = useSelector((state) => state.isAuthorized);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentURL = window.location.href;
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    trackURL(currentURL, dispatch, isAuthorized);
  }, [currentURL]);

  // Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Please, enter your email"),
      password: yup.string().required("Please, enter your password."),
    }),
    // onSubmit: (values) => {
    //   signIn(values)
    // }
  });
  const validationErrors = formik.errors;
  const isTouched = formik.touched;

  const formData = [
    {
      id: "outlined-email-input",
      label: "Email",
      type: "email",
      name: "email",
    },
    {
      id: "outlined-password-input",
      label: "Password",
      type: "password",
      name: "password",
    },
  ];
  
  const signInUser = async () => {
    if (formik.values.email && formik.values.password) {
      try {
        const result = await axios.post('/signin', JSON.stringify(formik.values));
        if (result.status === 200) {
          setIsSuccess(true);
          const user = result.data.user;
          dispatch(logInAC(user));
          navigate(`/users/${user.id}`);
          localStorage.setItem("token", result.data.accessToken.toString());
          return result;
        }
      } catch (e) {
        setIsSuccess(false);
        console.error(e.message);
        dispatch(logOutAC());
        return;
      }
    }
  };

  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      <nav className="signIn">
        <NavLink to="/auth/signin">SIGN IN</NavLink>
        <NavLink to="/auth/signup">SIGN UP</NavLink>
      </nav>
      <AuthComponent
        title="Sign in to your account."
        formData={formData}
        buttonAction="SIGN IN"
        dataValue={formik.values}
        handleChange={formik.handleChange}
        sendData={signInUser}
        onBlur={formik.handleBlur}
        validationErrors={validationErrors}
        isTouched={isTouched}
        isSuccess={isSuccess}
      />
    </div>
  );
};

export default Signin;
