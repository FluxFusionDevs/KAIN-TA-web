import React, { useState } from 'react'
import { Button, TextField, IconButton, Snackbar } from '@mui/material';
import background from './assets/images/background.png'
import { Apple, Delete, Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { loginWithEmail } from './handlers/APIController';
import { UserPayload, UserType } from './models/userModel';
import CloseIcon from '@mui/icons-material/Close';

function Login() {
    const navigate = useNavigate();
    const [count, setCount] = useState(0)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    const handleLogin = async () => {
      try {
        const data: UserPayload = await loginWithEmail(email, password);
        sessionStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.type === "OWNER") {
          navigate('/admin');
        } else if (data.user.type === "ADMIN") {
          navigate('/superadmin');
        }
      } catch (err) {
        if (err instanceof Error) {
          setErrors(err.message);
        }

        return;
      }
    }

    const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setErrors("")}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );

  return (
    <div style={styles.background}>
      <Snackbar
        open={errors !== ""}
        autoHideDuration={6000}
        onClose={() => setErrors("")}
        message={errors}
        action={action}
      />
      <div style={styles.modal}>
        <div style={{...styles.container, ...{textAlign: 'center'}}}>
          <div style={styles.header}>
            KAIN-TA
          </div>
          <div style={styles.sub_header}>
            Super Admin Login
          </div>
          <div style={styles.section}>
            <TextField 
              value={email}
              onChange={event => setEmail(event.target.value)}
              style={styles.text_input} id="text_input" label="Email" variant="standard" />
          </div>
          <div style={styles.section}>
            <TextField 
              value={password}
              onChange={event => setPassword(event.target.value)}
              style={styles.text_input} id="text_input" label="Password" variant="standard"  type='password'/>
          </div>
          <div style={{...styles.section, ...{marginTop: 25}}}>
            <Button variant="contained" style={styles.button} onClick={handleLogin}>
                LOGIN
            </Button>
          </div>

          <div style={{...styles.section, ...{marginTop: 25}}}>
            {/* <div style={{padding: 10}} >or Login with</div>
            <IconButton style={{marginRight: 5}} className="alt-buttons" aria-label="apple">
              <Apple fontSize="large" />
            </IconButton>

            <IconButton style={{marginLeft: 5}} className="alt-buttons" aria-label="google">
              <Google fontSize="large" />
            </IconButton> */}
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
      paddingBottom: 15,
      display: 'inline-block',
      width: 260,
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
