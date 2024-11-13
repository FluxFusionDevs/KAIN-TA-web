import { useState } from 'react'
import background from './assets/images/background.png'
import logo from './assets/images/kain-ta-Logo.png'
import { borderBottom, borderRadius, display, height, minHeight, width } from '@mui/system'
import Button from '@mui/material/Button';

function Dashboard() {
  enum Tab { Users, Establishments, Food }

  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.Users);

  const sidebar_buttons = [
    <Button style={{...styles.sidebar_button}}>Moderation</Button>,
    <Button style={styles.sidebar_button}>Verification</Button>,
    <Button style={styles.sidebar_button}>Analytics</Button>,
  ];

  const mstyles = {
    button: { 
      outline: 'none',
            '&:focus': {
              outline: 'none',
              boxShadow: 'none', // Removes focus ring shadow
            },
      borderBottom: selectedTab === Tab.Establishments ? '2px solid black' : 'none' }
  }

  const tab_buttons = [
    <Button 
      style={{...styles.tab_button}} 
      sx={{ 
        outline: 'none',
        '&:focus': {
        outline: 'none',
        boxShadow: 'none', // Removes focus ring shadow
        },
        borderBottom: selectedTab === Tab.Users ? '2px solid black' : 'none' 
      }}
      onClick={() => setSelectedTab(Tab.Users)}>
        Users
    </Button>,
    <Button 
    style={{...styles.tab_button}} 
    sx={mstyles.button}
    onClick={() => setSelectedTab(Tab.Establishments)}>
      Establishments
  </Button>,
    <Button 
    style={{...styles.tab_button}} 
    sx={{ 
      outline: 'none',
            '&:focus': {
              outline: 'none',
              boxShadow: 'none', // Removes focus ring shadow
            },
      borderBottom: selectedTab === Tab.Food ? '2px solid black' : 'none' }}
    onClick={() => setSelectedTab(Tab.Food)}>
      Food
  </Button>,
    <Button style={{...styles.tab_button, background: '#2673DD', color: 'white'}}>add</Button>,
  ];

  return (
    <div style={styles.background}>
      <div style={styles.modal}>
        <div style={styles.container}>
          <div style={styles.sidebar}>
            <img style={{ width: '70%', height: 'auto', borderRadius: '50%', marginTop: 77 }} src={logo} alt="" />

            <div style={{marginTop: 35}}>
                {sidebar_buttons}
            </div>
          </div>
          <div style={{width: '100%'}}>
            <div style={{...styles.header, ...{textAlign: 'center'}}}>KAIN-TA SUPER ADMIN DASHBOARD</div>
            <div style={{marginLeft: 25, marginRight: 25}}>
              {/* HEADER */}
              <div style={{height: 50}}>
                <div style={{...{float: 'left'}}}>
                    {tab_buttons[0]}
                </div>
                <div style={{...{marginLeft: 10, marginRight: 10, float: 'left'}}}>
                    {tab_buttons[1]}
                </div>
                <div style={{...{marginLeft: 10, marginRight: 10, float: 'left'}}}>
                    {tab_buttons[2]}
                </div>

                <div style={{...{float: 'right'}}}>
                    {tab_buttons[3]}
                </div>
              </div>

              {/* TABLE */}
              <div>
                <div style={styles.row}>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                </div>
                <div style={{...styles.row, ...styles.odd_row}}>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                </div>
                <div style={styles.row}>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                </div>
                <div style={{...styles.row, ...styles.odd_row}}>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                </div>
                <div style={styles.row}>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                </div>
                <div style={{...styles.row, ...styles.odd_row}}>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                </div>
                <div style={styles.row}>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                </div>
                <div style={{...styles.row, ...styles.odd_row}}>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                </div>
                <div style={styles.row}>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                </div>
                <div style={{...styles.row, ...styles.odd_row}}>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                </div>
                <div style={styles.row}>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                </div>
                <div style={{...styles.row, ...styles.odd_row}}>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                  <div style={{width: "100%"}}>ROW</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
    selected_button: {
      borderBottomWidth: 2,
      borderBottomColor: 'black',
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 35,
      borderRadius: 25,
      background: '#D9D9D9'
    },
    odd_row: {
      borderRadius: 25,
      background: 'transparent'
    },
    background: { 
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      width: "100vw",
      height: "100vh",
      color: "black"
    },
    modal: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    },
    container: {
      backgroundColor: "white",
      borderRadius: '18px',
      margin: "auto",
      textAlign: "center",
      position: "absolute",
      top: 40, bottom: 40, right: 40, left: 40,
      overflow: 'hidden',
      
      display: 'flex',
    },
    section: {
      marginTop: 5
    },
    button: {
      borderRadius: 25,
      width: 150
    },
    text_input: {
      width: "100%"
    },
    header: {
      fontWeight: 'bold',
      fontSize: 36
    },
    sub_header: {
  
    },
    sidebar: {
        backgroundColor: "#2673DD",
        width: 260,
        color: "white"
    },
    sidebar_button: {
        width: '100%',
        color: 'white',
    },
    tab_button: {
        width: '100%',
        color: 'black',
    }
  }


export default Dashboard
