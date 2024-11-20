import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { ThumbDown, ThumbUp } from "@mui/icons-material";

import Modal from "../../components/Modal";

import './menuPage.css'

enum DashboardState {
  Idle, IsAdding, IsEditting, IsDeleting, IsSaving
}

function DashboardPage() {
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [state, setState] = useState<DashboardState>(DashboardState.Idle);
    
  const user_inputs = [
    <div style={styles.section}>
      <TextField style={styles.text_input} id="text_input" label="Name" variant="standard" />
    </div>,
    <div style={styles.section}>
      <TextField style={styles.text_input} id="text_input" label="Description" variant="standard" />
    </div>,
    <div style={styles.section}>
      <TextField style={styles.text_input} id="text_input" label="Tags" variant="standard" />
    </div>,
    <div style={styles.section}>
      <TextField style={styles.text_input} id="text_input" label="Image" variant="standard" />
    </div>,
    <div style={styles.section}>
      <TextField style={styles.text_input} id="text_input" label="Price" variant="standard" />
    </div>,
  ]


  return (
    <div className="verification-wrapper">
      {state === DashboardState.IsAdding ? (
        <Modal 
          header="ADD FOOD" 
          content={(user_inputs)}
          onSubmit={() => setState(DashboardState.IsSaving)}
          onCancel={() => setState(DashboardState.Idle)}
          />
      ) : []}
      <div className="table">
        <Button 
          style={{ ...styles.tab_button, background: "#2673DD", color: "white", width: 200, borderRadius: 25, marginBottom: 20 }}
          onClick={() => setState(DashboardState.IsAdding)}>
          add
          </Button>
            <div className="content">
              <div className="header row row-header">
                <div style={{ width: "100%" }}>Name</div>
                <div style={{ width: "100%" }}>Description</div>
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
