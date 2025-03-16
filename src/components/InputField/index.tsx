import React from 'react';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

const TextInput = ({
  id,
  label,
  name,
  type = "text",
  required = true,
  autoComplete,
  autoFocus = false,
  placeholder
}: any) => {
  return (
    <div>
      <Typography sx={{ color: "#494949", fontWeight: 600 }}>{label}</Typography>
      <TextField
        margin="normal"
        required={required}
        fullWidth
        id={id}
        //   label={label}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        variant="outlined"
        sx={{ background: '#F1F4FF' }} // Background color
        InputProps={{
          sx: {
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none', // Remove the border
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: '2px solid #3949ab', // Change border color on hover
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: '2px solid #3949ab', // Change border color when focused
            },
          },
        }}
      />
    </div>
  );
};

export default TextInput;
