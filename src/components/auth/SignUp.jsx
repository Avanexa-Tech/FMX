import React, { useState } from "react";
import StyledInput from "../common/StyledInput";
import { Button } from "antd";
import StyledSelectedInput from "../common/StyledSelectedInput";
import Organization from "./Organization";

const SignUp = () => {
  const [signUp, setSignUp] = useState({});
  return (
      <Organization />
    // <>
    //   <div className="auth-container">
    //     <div className="content">
    //       <div className="title">Sign up for free</div>
    //       <div className="inputs">
    //         <StyledInput label={"Full Name"} prefix={<i className="fi fi-rs-user input-icon"></i>} />
    //         <StyledInput label={"Work Email"} prefix={<i className="fi fi-rr-envelope input-icon"></i>} />
    //         <StyledSelectedInput
    //           value={signUp.phone_number}
    //           label={"Phone Number"}
    //           name={"phone_number"}
    //           selectPlaceholder={"select"}
    //           selectOptions={[{ value: 91, label: "India" }]}
    //           selectName={"code"}
    //           selectValue={91}
    //         />
    //       </div>
    //       <Button className="submit" type="primary">
    //         Next
    //       </Button>
    //       <div className="foot">
    //         Already have an account?&nbsp;<a href={"#"}>Log in</a>
    //       </div>
    //     </div>
    //   </div>
    //   <p className="common-acceptance">
    //     By creating an account, you adhere to the <br />
    //     <b>Terms Of Service</b> and <b>Privacy Policy</b>.
    //   </p>
    // </>
  );
};

export default SignUp;
