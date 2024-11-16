import { useState } from "react";
import { Button } from "@mui/material";
import ThumbUp from "@mui/icons-material/ThumbUp";

import './menuPage.css'
import { ThumbDown } from "@mui/icons-material";

function DashboardPage() {
  const [selectedRow, setSelectedRow] = useState<number>(0);

  return (
    <div className="verification-wrapper">
      <div className="table">
            <div className="content">
              <div className="header row row-header">
                <div style={{ width: "100%" }}>Name</div>
                <div style={{ width: "100%" }}>Tags</div>
                <div style={{ width: "100%" }}>Image</div>
                <div style={{ width: "100%" }}>Price</div>
                <div style={{ width: "100%" }}>Action</div>
              </div>
              {
                Array.from({length: 30}).map((_, rowIndex) => {
                  const class_name = rowIndex % 2 === 0 ? "row odd-row" : "row";

                  return (<div className={class_name} onClick={() => setSelectedRow(rowIndex)}>
                    <div>ROW</div>
                    <div>ROW</div>
                    <div>ROW</div>
                    <div>ROW</div>
                    <div>
                      {selectedRow === rowIndex ? (
                        <div className="action-buttons">
                        <div className="reject-button">
                          <Button 
                            sx={{
                              backgroundColor: "#dc3545"
                            }}
                            className="button" 
                            variant="contained" 
                            startIcon={<ThumbDown />}>
                            Reject
                          </Button>
                        </div>
                        <div className="approve-button">
                          <Button 
                            sx={{
                              backgroundColor: "#28a745",
                            }}
                            className="button"
                            variant="contained" 
                            startIcon={<ThumbUp />}>
                            Approve
                          </Button>
                        </div>
                      </div>
                      ) : null}
                    </div>
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

export default DashboardPage;
