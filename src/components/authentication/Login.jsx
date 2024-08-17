import React, { useState } from "react";
import StyledInput from "../common/StyledInput";
import StyledButton from "../common/StyledButton";
import { google } from "../../assets/images";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Login = () => {
  const [input, setInput] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [inputError, setInputError] = useState("");
  const loginButtons = [
    {
      key: 1,
      text: "Email Address",
      regex: /^[a-z\.-]+@[a-z\d\.-]+\.[a-z]{2,}$/,
      type: "text",
      icon: (
        <i
          class="fi fi-rr-envelope"
          style={{
            fontSize: "15px",
            fontWeight: "600",
            marginRight: "2px",
          }}
        ></i>
      ),
    },
    {
      key: 2,
      text: "Phone Number",
      regex: /^\+?\d{10,15}$/,
      type: "number",
      icon: (
        <i
          class="fi fi-rr-phone-flip"
          style={{
            fontSize: "15px",
            fontWeight: "600",
            marginRight: "2px",
            transform: "rotateY(180deg)",
          }}
        ></i>
      ),
    },
  ];
  const [selectedOption, setSelectedOption] = useState(loginButtons[0]);
  const navigate = useNavigate();
  const success = (content) => {
    messageApi.open({
      type: "success",
      content,
    });
  };

  const error = (content) => {
    messageApi.open({
      type: "error",
      content,
    });
  };
  return (
    <div className="login-card">
      {contextHolder}
      <h1>Log in to GBI FM</h1>
      <div className="inputs">
        <StyledInput
          label={selectedOption.text}
          prefix={selectedOption.icon}
          type={selectedOption.type}
          error={inputError !== ""}
          errorMessage={`Enter valid ${selectedOption.text}*`}
          onChange={(value) => {
            setInput(value);
            value !== "" && !selectedOption.regex.test(value)
              ? setInputError(`Enter valid ${selectedOption.text}*`)
              : setInputError("");
          }}
        />

        <StyledButton
          text={"Login"}
          btnClassName="login-btn"
          onClick={() => {
            if (input == "") {
              error("Enter Input");
            } else if (inputError !== "") {
              error(inputError);
            } else {
              success("Otp Sended Successfully");
              setTimeout(() => {
                navigate("/verify-otp", { state: { username: input } });
              }, 500);
            }
          }}
        />
        <div className="login-options">
          <p>Or, Use one of the following options</p>
          <div className="option-btns">
            <StyledButton
              text={loginButtons.find((i) => i.key !== selectedOption.key).text}
              icon={loginButtons.find((i) => i.key !== selectedOption.key).icon}
              btnClassName="option-btn"
              onClick={() =>
                setSelectedOption(
                  loginButtons.find((i) => i.key !== selectedOption.key)
                )
              }
            />
            <StyledButton
              text={"Google"}
              icon={
                <img
                  src={google}
                  alt="google"
                  style={{ width: "20px", marginTop: "2px" }}
                />
              }
              btnClassName="option-btn"
            />
          </div>
        </div>
        <hr style={{ width: "100%", color: "#ccc" }} />
        <p className="dont-have-account">Don't have an account?</p>
        <StyledButton text={"Sign up"} onClick={() => navigate("/signup")} />
      </div>
    </div>
  );
};

export default Login;
