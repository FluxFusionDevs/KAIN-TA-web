import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='1097769604930-dsvojfoj2pp9ms4mjn3cuncfhaoobgq1.apps.googleusercontent.com'>
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>
)
