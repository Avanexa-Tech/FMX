import { Avatar, Badge, Dropdown, Input, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/userAuthSlice";

function FMXHeader() {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useSelector(({ user_auth }) => user_auth);
  
  const success = (content) => {
    messageApi.open({
      type: "success",
      content,
    });
  };

  return (
    <header className="fmx-header">
      {contextHolder}
      <div className="greeting-container">
        <h1>Hey {user?.full_name},</h1>
        <p>Manage Your Work Orders Efficiently</p>
      </div>
      <div className="action-container">
        <Input
          className="quick-search-input"
          placeholder="Search Work Orders"
          prefix={<i className="fi fi-rr-search"></i>}
        />
        <div className="settings-btn">
          <i className="fi fi-rr-settings-sliders"></i>
        </div>
        <div className="notifications-btn">
          <Badge count="2">
            <i className="fi fi-rr-bell-notification-social-media"></i>
          </Badge>
        </div>
        <div className="user-avatar-container">
          <Avatar size={"large"} shape="circle" icon={<i className="fi fi-tr-circle-user"></i>} />
          <Dropdown
            overlay={
              <a href="/login" onClick={() => {
                success("Logged out successfully");
                dispatch(logout())
              }}> Logout </a>}>
            <div>{user?.full_name}</div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

export default FMXHeader;
