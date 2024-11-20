import { useState } from "react";
import { Button } from "@mui/material";
import { ThumbUp, ThumbDown } from "@mui/icons-material";

import Modal from "../../components/Modal";

import './feedbackView.css'

function FeedbackView() {
  const [selectedRow, setSelectedRow] = useState<number>(0);

  return (
    <div className="wrapper">
      <div className="table">
            <div className="content">
              <div className="header row row-header">
                <div className="user-row">User</div>
                <div className="comment-row">Comment</div>
                <div className="rating-row">Rating</div>
              </div>
              {
                Array.from({length: 30}).map((_, rowIndex) => {
                  const class_name = rowIndex % 2 === 0 ? "row odd-row" : "row";

                  return (<div className={`${class_name} ${selectedRow === rowIndex ? "selected-row" : ""}`} onClick={() => setSelectedRow(rowIndex)}>
                    <div className="user-row">ROW</div>
                    <div className="comment-row">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum incidunt expedita voluptas sit quaerat reiciendis odio nam? Amet eum tempore modi earum molestias quasi ullam culpa dolor illo nihil. Maxime perspiciatis eius, odio natus a cupiditate autem enim fugit. Magni quis quibusdam a, quia, pariatur, vitae aperiam cumque sit consectetur blanditiis sed explicabo sint doloribus quasi earum dolores libero adipisci unde magnam! Voluptates deleniti incidunt voluptate perspiciatis assumenda. Alias illum magnam fugiat debitis consequatur adipisci dolores voluptatibus eveniet omnis, nesciunt maiores maxime sequi praesentium labore, dolorum a. Autem distinctio quae delectus asperiores dolore aut facilis inventore tempora possimus, libero nostrum!</div>
                    <div className="rating-row">ROW</div>
                  </div>)
                })
              }
            </div>
      </div>
    </div>
  );
}

const styles = {
  table: {
    maxHeight: '100%',
    overflowY: 'auto',
  },
  selected_button: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  section: {
    marginTop: 5,
  },
  button: {
    borderRadius: 25,
    width: 150,
  },
  text_input: {
    width: "100%",
  },
  header: {
    fontWeight: "bold",
    fontSize: 36,
  },
  sub_header: {},
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
