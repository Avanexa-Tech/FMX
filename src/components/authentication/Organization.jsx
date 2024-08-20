import React, { useState } from "react";
import StyledInput from "../common/StyledInput";
import { Button, Divider, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userData } from "../../redux/slice/userAuthSlice";

const Organization = () => {
  const [organization, setOrganization] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const { data = {} } = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orgList = [
    "Manufacturing",
    "hospitality",
    "Wholesale Distribution",
    "Public sector",
    "Healthcare",
    "Property Management",
    "Personal use",
    "Other",
  ];
  const onChange = (value, name) => {
    setOrganization((prevState) => ({ ...prevState, [name]: value }));
  };
  const success = (content) => {
    messageApi.open({
      type: "success",
      content,
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "All Fields are mandatory",
    });
  };  
  
  return (
    <div className="org-container">
      {contextHolder}
      <b className="title">Time to set up your organization</b>
      <StyledInput label={"Organization Name"} name="organization_name" onChange={onChange} />
      <div className="list">
        <b className="title">Industry</b>
        <div className="container">
          {orgList.map((org, ind) => (
            <div
              className={
                organization?.industry === org ? "selected-item item" : "item"
              }
              key={ind}
              onClick={() =>
                setOrganization((prev) => ({ ...prev, industry: org }))
              }
            >
              {org}
            </div>
          ))}
        </div>
      </div>
      <Divider />
      <Button
        className="submit"
        type="primary"
        onClick={() => {
          if (Object.keys(organization)?.length > 0 &&
            Object.keys(organization).every((i) => organization[i] !== "")) {
            dispatch(userData({ ...organization, ...data , token: "available" }));
            navigate("/");
          } else error();
        }}
      >
        {" "}
        Continue
      </Button>
    </div>
  );
};

export default Organization;
