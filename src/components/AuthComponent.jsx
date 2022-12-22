import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";


const AuthComponent = ({
  title,
  formData,
  buttonAction,
  dataValue,
  handleChange,
  sendData,
  submitData,
  onBlur,
  validationErrors,
  isTouched,
  isSuccess
}) => {
  return (
    <div
      style={{
        backgroundColor: "#f6f6f6",
        borderRadius: "0 0 6px 6px",
        padding: "50px",
      }}
    >
      <h1 style={{ padding: "30px 0" }}>{title}</h1>
      <p style={{ marginBottom: "20px" }}>
        Build skills for today, tomorrow, and beyond. <br /> Education to
        future-proof your career.
      </p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="signWith">
          <GoogleIcon />
          <p>Sign in With Google</p>
        </div>
        <div className="signWith">
          <FacebookIcon />
          <p>Sign in With Facebook</p>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 0.2fr 1fr",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <hr />
        or
        <hr />
      </div>
      <div>
        <Formik>
          <Form
            style={{ display: "grid", rowGap: "15px" }}
            onSubmit={submitData}
          >
            {formData.map((data, index) => {
              // let valueFromProps = theProp[0];
              return (
                <>
                  <TextField
                    id={data.id}
                    label={data.label}
                    type={data.type}
                    name={data.name}
                    value={dataValue[data.label]}
                    onChange={handleChange}
                    onBlur={onBlur}
                  />
                  {isTouched.email &&
                  validationErrors.email &&
                  data.type === "email" ? (
                    <p style={{ color: "red", textAlign: "start" }}>
                      {validationErrors.email}
                    </p>
                  ) : isTouched.password &&
                    validationErrors.password &&
                    data.type === "password" ? (
                    <p style={{ color: "red", textAlign: "start" }}>
                      {" "}
                      {validationErrors.password}{" "}
                    </p>
                  ) : isTouched.name &&
                    validationErrors.name &&
                    data.type === "text" ? (
                    <p style={{ color: "red", textAlign: "start" }}>
                      {" "}
                      {validationErrors.name}{" "}
                    </p>
                  ) : isTouched.age &&
                    validationErrors.age &&
                    data.type === "number" ? (
                    <p style={{ color: "red", textAlign: "start" }}>
                      {" "}
                      {validationErrors.age}{" "}
                    </p>
                  ) : null}
                  {/* <p>validationErrors.email</p>  */}
                  {index === 1 && !isSuccess ? <p style={{ color: "red", textAlign: "start" }}>Invalid email or password</p> : null}
                </>
              );
            })}
            <p style={{ fontSize: ".7rem", margin: "20px 0" }}>
              By clicking "Sign up," you agree to our{" "}
              <a href="#">Terms of Use</a> and our{" "}
              <a href="#">Privacy Policy.</a>{" "}
            </p>
            <Button
              variant="contained"
              size="large"
              onClick={sendData}
              disabled={
                buttonAction === "SIGN IN" &&
                dataValue.email &&
                dataValue.password &&
                !validationErrors.email &&
                !validationErrors.password
                  ? false
                  : buttonAction === "SIGN UP" &&
                    dataValue.email &&
                    dataValue.password &&
                    dataValue.name &&
                    dataValue.age &&
                    !validationErrors.email &&
                    !validationErrors.password &&
                    !validationErrors.age &&
                    !validationErrors.name
                  ? false
                  : true
              }
            >
              {buttonAction}
            </Button>
            {/* onClick={() => sendData()} */}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AuthComponent;
