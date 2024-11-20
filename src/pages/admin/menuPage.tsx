import { ComponentType, ReactText, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Delete, DoNotStepOutlined, Edit } from "@mui/icons-material";

import Modal from "../../components/Modal";

import './menuPage.css'
import { Food } from "../../models/foodModel";
import { EstablishmentModel } from "../../models/establishmentModel";
import { getEstablishment } from "../../handlers/APIController";
import { UserModel } from "../../models/userModel";

enum DashboardState {
  Idle, IsAdding, IsEditting, IsDeleting, IsSaving
}

function DashboardPage() {
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [state, setState] = useState<DashboardState>(DashboardState.Idle);
  const [establishment, setEstablishment] = useState<EstablishmentModel>();
    
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

  function UpdateRows(menu: Food[]):JSX.Element[] {
    const rows: JSX.Element[] = [];
    menu.forEach((item, rowIndex) => {
      const class_name = rowIndex % 2 === 0 ? "row odd-row" : "row";
      rows.push(
        <div
          key={item._id}
          className={class_name}
          onClick={() => setSelectedRow(rowIndex)}
        >
          <div>{item.name}</div>
          <div>{item.description}</div>
          <div>{item.tags.join(", ")}</div>
          <div>
            <a href={`${import.meta.env.VITE_API_URL}${item.image}`} target="_blank">Click to View</a>
          </div>
          <div>{item.price}</div>
          <div>
            {selectedRow === rowIndex ? (
              <div className="action-buttons">
                <div className="reject-button">
                  <Button
                    sx={{
                      backgroundColor: "#dc3545",
                    }}
                    className="button"
                    variant="contained"
                    startIcon={<Delete />}
                  >
                    Delete
                  </Button>
                </div>
                <div className="approve-button">
                  <Button
                    sx={{
                      backgroundColor: "#28a745",
                    }}
                    className="button"
                    variant="contained"
                    startIcon={<Edit />}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )
    });

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
              {establishment === undefined ? null : UpdateRows(establishment.menu_items)}

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
