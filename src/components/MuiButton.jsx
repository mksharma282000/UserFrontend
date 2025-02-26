import React from 'react';
import { Button, CircularProgress } from '@mui/material';

function MuiButton({ children, sx, isLoading = false, ...props }) {
  return (
    <Button
      endIcon={isLoading && <CircularProgress size={20} color="inherit" />}
      disabled={isLoading || props.disabled}
      {...props}
      sx={(theme) => ({
        padding: '12px 36px',
        boxShadow: 'unset',
        height: '40px',
        whiteSpace: 'nowrap',
        minWidth: '110px',
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: (theme) => theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
        '&.MuiButton-outlined': {
          border: `1px solid ${theme.palette.primary.main}`,
          color: theme.palette.primary.main,
          backgroundColor: 'transparent',
          '&:hover': {
            // backgroundColor: theme.palette.primary.main,
            // color: theme.palette.primary.contrastText,
            border: `1px solid ${theme.palette.primary.main}`,
          },
        },
        ...sx,
      })}
    >
      {children}
    </Button>
  );
}

export default MuiButton;
