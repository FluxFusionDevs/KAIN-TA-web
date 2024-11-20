import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ThumbUp, ThumbDown } from "@mui/icons-material";

import Modal from "../../components/Modal";

import './feedbackView.css'
import { EstablishmentModel, Rating } from "../../models/establishmentModel";
import { getEstablishment } from "../../handlers/APIController";
import { UserModel } from "../../models/userModel";

function FeedbackView() {
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [establishment, setEstablishment] = useState<EstablishmentModel>();

  function UpdateRows(ratings: Rating[]): JSX.Element[] {
    const rows: JSX.Element[] = [];
    ratings.forEach((item, rowIndex) => {
      const class_name = rowIndex % 2 === 0 ? "row odd-row" : "row";
      rows.push(<div key={item._id} className={`${class_name} ${selectedRow === rowIndex ? "selected-row" : ""}`} onClick={() => setSelectedRow(rowIndex)}>
        <div className="user-row">{item.user_id.name}</div>
        <div className="comment-row">{item.comment}</div>
        <div className="rating-row">{item.rating}/5</div>
      </div>);
    })

    return rows;
  }

  useEffect(() => {
    const fetchEstablishment = async () => {
      const user = sessionStorage.getItem("user");
      if (user === undefined || user === null) 
        return console.warn("User Tokens not Initialized");

      const user_parsed: UserModel = JSON.parse(user) as UserModel;
      console.log(user_parsed);

      if (user_parsed === null || user_parsed === undefined) return;

      try {
        const user_parsed: UserModel = JSON.parse(user) as UserModel;
      
        if (!user_parsed || !user_parsed.owned_establishment) {
          console.warn("Owned establishment is not available");
          return;
        }

        // Now we can safely pass the owned_establishment to getEstablishment
        const establishment = await getEstablishment(user_parsed.owned_establishment);      
        setEstablishment(establishment);
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    }

    fetchEstablishment();
  }, [])

  return (
    <div className="wrapper">
      <div className="table">
            <div className="content">
              <div className="header row row-header">
                <div className="user-row">User</div>
                <div className="comment-row">Comment</div>
                <div className="rating-row">Rating</div>
              </div>
              { establishment === undefined ? 
                null : 
                UpdateRows(establishment.ratings)}
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
