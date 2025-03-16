import React from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Lottie from "react-lottie";


// Define the props interface
interface GlobalModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  animationData?: any; // Lottie animation data
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  imagelink?:any;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '400px',
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const GlobalModal: React.FC<GlobalModalProps> = ({
  open,
  onClose,
  title = 'Success!',
  description = 'Your action was completed successfully.',
//   animationData = successAnimation,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  imagelink,
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={style}>
        {/* Close Icon */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8, color: 'grey.500' }}
        >
          <CloseIcon />
        </IconButton>
        <img src={imagelink} style={{width:'90px', height:'90px'}}/>

        {/* Title */}
        <Typography id="modal-title" variant="h6" component="h2" mt={1}>
          {title}
        </Typography>

        {/* Description */}
        <Typography id="modal-description" sx={{ mt: 1, mb: 3, color: 'gray' }}>
          {description}
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          {onCancel && (
            <Button variant="outlined" onClick={onCancel} sx={{borderRadius:'20px'}}>
              {cancelText}
            </Button>
          )}
          {onConfirm && (
            <Button variant="contained" color="primary" sx={{borderRadius:'20px'}} onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default GlobalModal;
