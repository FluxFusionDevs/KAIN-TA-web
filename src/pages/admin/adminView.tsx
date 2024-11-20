import { useState, CSSProperties } from "react";
import background from "../../assets/images/background.png";
import logo from "../../assets/images/kain-ta-Logo.png";
import Modal from "../../components/Modal";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

import MenuPage from "./menuPage";
import './adminView.css'
import FeedbackView from "./feedbackView";

enum DashboardState {
  Idle, IsAdding, IsEditting, IsDeleting, IsSaving
}

enum Tab {
  Dashboard, Menu, Feedbacks
}

function AdminView() {
  const [state, setState] = useState<DashboardState>(DashboardState.Idle);

  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.Dashboard);

  let sidebar_buttons: React.ReactNode[] = [];
  for (const key in Tab) {
    if (isNaN(Number(key))) {
        let cur_tab: Tab = Tab[key as keyof typeof Tab];
        sidebar_buttons.push(
            <Button 
                onClick={() => setSelectedTab(cur_tab)}
                style={{
                ...styles.sidebar_button,
                ...(selectedTab === cur_tab ? styles.selected_sidebar_button : {})
                }}>{key}</Button>
        );
    }
  }

  const user_inputs = [
    <div style={styles.section}>
      <TextField style={styles.text_input} id="text_input" label="ID" variant="standard" disabled />
    </div>,
    <div style={styles.section}>
      <TextField style={styles.text_input} id="text_input" label="Name" variant="standard" />
    </div>,
    <div style={styles.section}>
      <TextField style={styles.text_input} id="text_input" label="Avatar" variant="standard" />
    </div>,
    <div style={styles.section}>
      <TextField style={styles.text_input} id="text_input" label="Type" variant="standard" />
    </div>,
    <div style={styles.section}>
      <TextField style={styles.text_input} id="text_input" label="Owned" variant="standard" />
    </div>,
  ]

  return (
    <div style={styles.background}>
      <div style={styles.modal}>
        <div className="container">
          <div style={styles.sidebar}>
            <img
              style={{
                width: "70%",
                height: "auto",
                borderRadius: "50%",
                marginTop: 77,
              }}
              src={logo}
              alt=""
            />

            <div style={{ marginTop: 35 }}>{sidebar_buttons}</div>
          </div>
          <div style={{
            width: "100%",
            paddingLeft: 35,
            paddingRight: 35,
            overflow: "auto",
          }}>
            {selectedTab === Tab.Menu && (
              <MenuPage />
            )}

            {selectedTab === Tab.Feedbacks && (
              <FeedbackView />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  background: {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100vw",
    height: "100vh",
    color: "black",
  },
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

export default AdminView;
