import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

interface AuthModalProps {
  open: boolean;
  message: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, message }) => {
  return (
    <Modal open={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" sx={{color: "#000000"}}>
          {message}
        </Typography>
      </Box>
    </Modal>
  );
};

export default AuthModal;