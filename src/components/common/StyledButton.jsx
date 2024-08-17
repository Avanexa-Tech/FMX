import { Button } from "antd";
import React from "react";

const StyledButton = ({ key, icon, text, btnClassName = "", onClick = null }) => {
  return (
    <Button className={btnClassName} key={key} onClick={onClick}>
      {icon && <>{icon}</>}
      {text && <span>{text}</span>}
    </Button>
  );
};

export default StyledButton;
