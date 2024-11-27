import { useState, CSSProperties } from "react";
import background from "../../assets/images/background.png";
import logo from "../../assets/images/kain-ta-Logo.png";
import { Button } from "@mui/material";

import './superadminView.css'

import VerificationPage from "./verificationPage";
import AccountsPage from "./accountsPage";
import DashboardPage from "./dashboardPage";
import { Logout } from "../../handlers/APIController";

enum Tab {
  Users,
  Establishments,
  Food,
}

enum SidebarTab {
  Verification,
  Accounts,
  Dashboard,
  Logout
}

function SuperadminView() {
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
    <Button
      onClick={async () =>  {
        await Logout();
      }}
      style={{
        ...styles.sidebar_button,
      }}
    >
      Logout
    </Button>
  ];

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
            <div style={{ ...styles.header, ...{ textAlign: "center" } }}>
              KAIN-TA SUPER ADMIN DASHBOARD
            </div>

            {selectedSidebarTab === SidebarTab.Verification ? (
              <VerificationPage />
            ) : (null)}

            {selectedSidebarTab === SidebarTab.Accounts ? (
              <AccountsPage />
            ) : (null)}

            {selectedSidebarTab === SidebarTab.Dashboard ? (
              <DashboardPage />
            ) : (null)}
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

export default SuperadminView;
