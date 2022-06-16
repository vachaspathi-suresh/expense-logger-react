import React from "react";
import ChangePassword from "../components/Auth/ChangePassword";
import ForgetPassword from "../components/Auth/ForgetPassword";
import NavBar from "../components/UI/NavBar";

const ResetPassword = (props) => {
  return (
    <div>
      <NavBar />
      {props.forget ? <ForgetPassword /> : <ChangePassword />}
    </div>
  );
};

export default ResetPassword;
