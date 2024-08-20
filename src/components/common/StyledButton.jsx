import { Button } from "antd";
import React from "react";

const StyledButton = ({ key, icon, text, btnClassName = "", onClick = null,htmlType="" }) => {
  return (
    <Button
      className={btnClassName}
      key={key}
      onClick={onClick}
      htmlType={htmlType}
    >
      {icon && <>{icon}</>}
      {text && <span>{text}</span>}
    </Button>
  );
};

export default StyledButton;
