import { useState, CSSProperties } from "react";
import background from "./assets/images/background.png";
import logo from "./assets/images/kain-ta-Logo.png";
import Modal from "./components/users_modal";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import ThumbUp from "@mui/icons-material/ThumbUp";

import './dashboard.css'
import { ThumbDown } from "@mui/icons-material";

import VerificationPage from "./pages/verificationPage";

enum DashboardState {
  Idle, IsAdding, IsEditting, IsDeleting, IsSaving
}

enum Tab {
  Users,
  Establishments,
  Food,
}

enum SidebarTab {
  Verification,
  Accounts,
  Dashboard,
}

function Dashboard() {
  const [state, setState] = useState<DashboardState>(DashboardState.Idle);

  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.Users);
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [selectedSidebarTab, setSelectedSidebarTab] = useState<SidebarTab>(SidebarTab.Verification);

  const sidebar_buttons = [
    <Button 
      onClick={() => setSelectedSidebarTab(SidebarTab.Verification)}
      style={{
      ...styles.sidebar_button,
      ...(selectedSidebarTab === SidebarTab.Verification ? styles.selected_sidebar_button : {})
    }}>Verification</Button>,
    <Button 
      onClick={() => setSelectedSidebarTab(SidebarTab.Accounts)}
      style={{ 
      ...styles.sidebar_button,
      ...(selectedSidebarTab === SidebarTab.Accounts ? styles.selected_sidebar_button : {})
     }}>Accounts</Button>,
    <Button 
      onClick={() => setSelectedSidebarTab(SidebarTab.Dashboard)}
      style={{
      ...styles.sidebar_button,
      ...(selectedSidebarTab === SidebarTab.Dashboard ? styles.selected_sidebar_button : {})
    }}>Dashboard</Button>,
  ];

  const mstyles = {
    button: {
      outline: "none",
      "&:focus": {
        outline: "none",
        boxShadow: "none", // Removes focus ring shadow
      },
      borderBottom:
        selectedTab === Tab.Establishments ? "2px solid black" : "none",
    },
  };

  const tab_buttons = [
    <Button
      style={{ ...styles.tab_button }}
      sx={{
        outline: "none",
        "&:focus": {
          outline: "none",
          boxShadow: "none", // Removes focus ring shadow
        },
        borderBottom: selectedTab === Tab.Users ? "2px solid black" : "none",
      }}
      onClick={() => setSelectedTab(Tab.Users)}
    >
      Users
    </Button>,
    <Button
      style={{ ...styles.tab_button }}
      sx={mstyles.button}
      onClick={() => setSelectedTab(Tab.Establishments)}
    >
      Establishments
    </Button>,
    <Button
      style={{ ...styles.tab_button }}
      sx={{
        outline: "none",
        "&:focus": {
          outline: "none",
          boxShadow: "none", // Removes focus ring shadow
        },
        borderBottom: selectedTab === Tab.Food ? "2px solid black" : "none",
      }}
      onClick={() => setSelectedTab(Tab.Food)}
    >
      Food
    </Button>,
    <Button style={{ ...styles.tab_button, background: "#2673DD", color: "white" }}
      onClick={() => setState(DashboardState.IsAdding)}
    >
      add
    </Button>,
  ];

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
      {state === DashboardState.IsAdding ? (
        <Modal 
          header="ADD USER" 
          content={(user_inputs)}
          onSubmit={() => setState(DashboardState.IsSaving)}
          onCancel={() => setState(DashboardState.Idle)}
          />
      ) : []}
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
          }}>
            <VerificationPage />
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

export default Dashboard;
