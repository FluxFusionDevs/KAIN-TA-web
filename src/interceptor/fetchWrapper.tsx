import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import AuthModal from '../components/AuthModal';

const fetchWrapper = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
  // Add authorization token to headers
  const token = sessionStorage.getItem('authToken');
  const headers = new Headers(init?.headers || {});
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  // Create a new request with the updated headers
  const updatedInit: RequestInit = {
    ...init,
    headers,
  };

  try {
    const response = await fetch(input, updatedInit);

    // Handle response errors
    if (!response.ok) {
      if (response.status === 401) {
        // Show modal and redirect after 2 seconds
        showAuthModal('You are not authenticated. Logging out in 2 seconds...');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    // Handle fetch errors
    console.error('Fetch error:', error);
    throw error;
  }
};

const showAuthModal = (message: string) => {
  const modalContainer = document.createElement('div');
  document.body.appendChild(modalContainer);

  const ModalWrapper = () => {
    const [open, setOpen] = useState(true);

    return <AuthModal open={open} message={message} />;
  };

  ReactDOM.render(<ModalWrapper />, modalContainer);
};

export default fetchWrapper;