import { Button } from "antd";
import React from "react";

const StyledButton = ({ btnClassName, icon, text, ...rest }) => {
  return (
    <Button className={btnClassName} {...rest}>
      {icon && <>{icon}</>}
      {text && <span>{text}</span>}
    </Button>
  );
};

export default StyledButton;
