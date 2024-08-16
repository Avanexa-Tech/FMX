import { Avatar, Badge, Button, Dropdown, Input } from "antd";
import React from "react";

function FMXHeader() {
  return (
    <header className="fmx-header">
      <div className="greeting-container">
        <h1>Hey Jimmy,</h1>
        <p>Manage Your Work Orders Efficiently</p>
      </div>
      <div className="action-container">
        <Input
          className="quick-search-input"
          placeholder="Search Work Orders"
          prefix={<i class="fi fi-rr-search"></i>}
        />
        <div className="settings-btn">
          <i class="fi fi-rr-settings-sliders"></i>
        </div>
        <div className="notifications-btn">
          <Badge count="2">
          <i class="fi fi-rr-bell-notification-social-media"></i>
          </Badge>
        </div>
        <div className="user-avatar-container">
          <Avatar size={"large"} shape="circle" icon={<i class="fi fi-tr-circle-user"></i>}/>
          <Dropdown
            overlay={
              <div>
                <a href="/login">Logout</a>
              </div>
            }
          >
            <div>Jimmy</div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

export default FMXHeader;
