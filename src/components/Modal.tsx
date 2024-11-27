import { Button } from "@mui/material";
import "./Modal.css";
import React from "react";

interface ModalProps {
  header: string;
  content: React.ReactNode;
  onSubmit?: () => void;
  onCancel?: () => void;
  disableButtons?: boolean;
  contentStyle?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> = ({
  header,
  content,
  onSubmit,
  onCancel,
  disableButtons,
  contentStyle,
}) => {
  return (
    <div className="modal" onClick={onCancel} >
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={styles.container}>
        <div className="header">{header}</div>
        <div className="content" style={contentStyle}>
          {content}
        </div>

        {!disableButtons && (
          <div className="buttons">
            <div style={{ float: "left" }}>
              <Button className="btn" onClick={onCancel}>
                Cancel
              </Button>
            </div>
            <div style={{ float: "right" }}>
              <Button variant="contained" className="btn" onClick={onSubmit}>
                Done
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

const styles = {
  container: {
    paddingBottom: 20,
  }
};

export default Modal;
