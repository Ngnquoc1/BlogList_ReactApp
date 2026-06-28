// Tooglable.js
import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { Button, Container } from "react-bootstrap";

const Tooglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const buttonLabel1 = props.buttonLabel1 ? props.buttonLabel1 : "Show";
  const buttonLabel2 = props.buttonLabel2 ? props.buttonLabel2 : "Cancel";

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: !visible ? "none" : "" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // 2. Sử dụng `ref` đã được chuyển tiếp
  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <Container className="mt-4">
      <div style={hideWhenVisible}>
        {props.viewOne && props.viewOne()}
        <Button variant="primary" onClick={toggleVisibility} className="mb-3">
          {buttonLabel1}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
    </Container>
  );
});

Tooglable.displayName = "Tooglable";

Tooglable.propTypes = {
  buttonLabel1: PropTypes.string,
  buttonLabel2: PropTypes.string,
  children: PropTypes.node.isRequired,
  viewOne: PropTypes.func
};

export default Tooglable;