import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import AuthComponent from "../AuthComponent";
import { trackURL } from "../trackURL.js";
import * as yup from "yup";
import axios from "../../api/axios";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthorized = useSelector((state) => state.isAuthorized);
  const currentURL = window.location.href;

  useEffect(() => {
    trackURL(currentURL, dispatch, isAuthorized);
  }, [currentURL]);
  // Formik
  const formik = useFormik({
    initialValues: {
      age: "",
      email: "",
      name: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required("Please, enter your email."),
      password: yup
        .string()
        .required("Please, enter your password.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      name: yup
        .string()
        .required("Please, enter your name.")
        .max(12, "Your name is too long")
        .min(2, "Your name is too short")
        .matches(/[a-zA-Z]/, "Name can only contain Latin letters."),
      age: yup
        .number()
        .required("Please, enter your age")
        .min(18, "You must be at least 18 years")
        .max(60, "You must be at most 60 years"),
    }),
    // onSubmit: (values) => {
    //   signUpUser(values);
    // }
  });
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
    {
      id: "outlined-name-input",
      label: "Name",
      type: "text",
      name: "name",
    },
    {
      id: "outlined-age-input",
      label: "Age",
      type: "number",
      name: "age",
    },
  ];

  const validationErrors = formik.errors;
  const isTouched = formik.touched;

  const signUpUser = async () => {
    if (
      formik.values.email &&
      formik.values.password &&
      formik.values.name &&
      formik.values.age
    ) {
      const result = await axios.post('/signup', JSON.stringify(formik.values));
      formik.values = formik.initialValues;
      if (result.status === 200) {
        navigate("/auth/signin");
        alert(result.data.message);
      }
      return result;
    }
  };

  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      <nav className="signUp">
        <NavLink to="/auth/signin">SIGN IN</NavLink>
        <NavLink to="/auth/signup">SIGN UP</NavLink>
      </nav>
      <AuthComponent
        title="Create your account."
        formData={formData}
        buttonAction="SIGN UP"
        dataValue={formik.values}
        handleChange={formik.handleChange}
        submitData={formik.onSubmit}
        sendData={signUpUser}
        onBlur={formik.handleBlur}
        validationErrors={validationErrors}
        isTouched={isTouched}
        isSuccess={true}
      />
    </div>
  );
};

export default Signup;
