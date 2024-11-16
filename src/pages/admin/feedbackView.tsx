import { useState } from "react";
import { Button } from "@mui/material";

import './feedbackView.css'

function FeedbackView() {

  return (
    <div className="wrapper">
      <div className="content">

      </div>
    </div>
  );
}

const styles = {
    header: {
      fontWeight: "bold",
      fontSize: 36,
    },
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    section: {
      marginTop: 5,
    },
    text_input: {
      width: "100%",
    },
    sidebar: {
      backgroundColor: "#2673DD",
      width: 260,
      color: "white",
    },
    selected_sidebar_button: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    sidebar_button: {
      width: "100%",
      color: "white",
      borderRadius: 20
    },
    tab_button: {
      width: "100%",
      color: "black",
    },
  };

export default FeedbackView;
