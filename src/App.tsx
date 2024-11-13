import { useState } from 'react'
import './App.css'
import background from './assets/images/background.png'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { fontSize, fontWeight } from '@mui/system';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './dashboard';
import Login from './login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
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

export default App
