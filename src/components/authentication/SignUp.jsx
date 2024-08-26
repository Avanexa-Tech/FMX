import React, { useState } from "react";
import StyledInput from "../common/StyledInput";
import { Button, message } from "antd";
import StyledSelectedInput from "../common/StyledSelectedInput";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signUp, setSignUp] = useState({});
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onChange = (value, name) => {
    const copy = { ...signUp };
    copy[name] = value;
    setSignUp((prevState) => ({ ...prevState, ...copy }));
  };
  const success = (content) => {
    messageApi.open({
      type: "success",
      content,
    });
  };

  const errorNotification = () => {
    messageApi.open({
      type: "error",
      content: "All Fields are mandatory",
    });
  };

  const handleSubmission = () => {
    if (Object.keys(signUp)?.length > 0 && Object.keys(signUp).every((i) => signUp[i] !== "")) {
      success("Otp Sended Successfully");
      setTimeout(
        navigate("/verify-otp", {
          state: { data: signUp, username: signUp?.email, newUser: true },
        }),
        500
      );
    } else errorNotification();
  }

  const handleSubmit = (e) => { 
    if (e.key === "Enter") {
      if (!signUp.full_name || !signUp.email || !signUp.phone_number) {
        errorNotification()
      }
      else {
        handleSubmission()
      }
    }
  }

  return (
    <>
      <div className="auth-container">
        {contextHolder}
        <div className="content" onKeyDown={handleSubmit}>
          <div className="title">Sign up for free</div>
          <div className="inputs">
            <StyledInput
              value={signUp?.full_name}
              label={"Full Name"}
              name="full_name"
              onChange={onChange}
              prefix={<i className="fi fi-rs-user input-icon"></i>}
            />
            <StyledInput
              value={signUp?.email}
              label={"Work Email"}
              name="email"
              error={!/^[a-z0-9.-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(signUp?.email) && signUp?.email}
              errorMessage={"Enter Valid Email Address"}
              onChange={onChange}
              prefix={<i className="fi fi-rr-envelope input-icon"></i>}
            />
            <StyledSelectedInput
              type={"number"}
              onChange={onChange}
              value={signUp?.phone_number}
              label={"Phone Number"}
              name={"phone_number"}
              error={signUp?.phone_number && !/^\+?\d{10,15}$/.test(signUp?.phone_number)}
              errorMessage={"Enter Valid Phone Number"}
              selectPlaceholder={"select"}
              selectOptions={[{ value: 91, label: "India" }]}
              onSelectChange={onChange}
              selectName={"code"}
              selectValue={91}
            />
          </div>
          <Button
            className="submit"
            type="primary"
            onClick={handleSubmission}
          >
            Next
          </Button>
          <div className="foot">
            Already have an account?&nbsp;<a href={"/login"}>Log in</a>
          </div>
        </div>
      </div>
      <p className="common-acceptance">
        By creating an account, you adhere to the <br />
        <b>Terms Of Service</b> and <b>Privacy Policy</b>.
      </p>
    </>
  );
};

export default SignUp;
