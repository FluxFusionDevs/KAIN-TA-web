import { Button } from "@mui/material";
import "./Modal.css";

import React from "react";

interface ModalProps {
  header: string;
  content: React.ReactNode;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const Modal: React.FC<ModalProps> = ({ header, content, onSubmit, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-container">
        <div className="header">{header}</div>
        <div className="content">
            {content}
        </div>
        <div className="buttons">
            <div style={{float: "left"}}>
                <Button className="btn" onClick={onCancel}>Cancel</Button>
            </div>
            <div style={{float: "right"}}>
                <Button variant="contained" className="btn" onClick={onSubmit}>Done</Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
