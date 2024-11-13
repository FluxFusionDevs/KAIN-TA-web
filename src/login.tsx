import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import background from './assets/images/background.png'

import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [count, setCount] = useState(0)

    const handleLogin = () => {
        navigate('/dashboard'); 
    }

  return (
    <div style={styles.background}>
      <div style={styles.modal}>
        <div style={styles.container}>
          <div style={styles.header}>
            KAIN-TA
          </div>
          <div style={styles.sub_header}>
            Super Admin Login
          </div>
          <div style={styles.section}>
            <TextField style={styles.text_input} id="text_input" label="Email" variant="standard" />
          </div>
          <div style={styles.section}>
            <TextField style={styles.text_input} id="text_input" label="Password" variant="standard" />
          </div>
          <div style={{...styles.section, ...{marginTop: 25}}}>
            <Button variant="contained" style={styles.button} onClick={handleLogin}>
                LOGIN
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
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
      padding: 35,
      display: 'inline-block',
      width: 260,
      textAlign: "center"
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
  }

export default Login
