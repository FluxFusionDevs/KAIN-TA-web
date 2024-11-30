import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import AuthModal from '../components/AuthModal';

const fetchWrapper = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const token = sessionStorage.getItem('authToken');
  const headers = new Headers(init?.headers || {});
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  const updatedInit: RequestInit = {
    ...init,
    headers,
  };

  try {
    const response = await fetch(input, updatedInit);

    if (!response.ok) {
      if (response.status === 401) {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('user');
        showAuthModal('You are not authenticated. Logging out in 2 seconds...');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

const showAuthModal = (message: string) => {
  const modalContainer = document.createElement('div');
  document.body.appendChild(modalContainer);

  const root = createRoot(modalContainer);

  const ModalWrapper = () => {
    const [open] = useState(true);

    return <AuthModal open={open} message={message} />;
  };

  root.render(<ModalWrapper />);
};

export default fetchWrapper;