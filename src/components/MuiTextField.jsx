import React, { useState } from 'react';
import { Box, Grid2 as Grid, TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import MuiButton from './MuiButton';

function MuiTextField({
  name,
  label,
  control,
  type = 'text',
  endAdornment,
  InputProps,
  multiline,
  readOnly,
  xs,
  sm,
  md,
  lg,
  xl,
  ...props
}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  if (readOnly) {
    return (
      <Grid
        item
        xs={multiline ? 12 : 6}
        sm={multiline ? 12 : 6}
        md={multiline ? 12 : 4}
        lg={multiline ? 12 : 2}
        xl={multiline ? 12 : 2}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            const isTextLong = field.value?.length > 300;
            const displayedText = isTextLong && !expanded ? `${field.value.slice(0, 250)}...` : field.value || '-';

            return (
              <Box sx={{ marginBottom: '10px' }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                  }}
                  {...props}
                >
                  {label || '-'}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                  }}
                  {...props}
                >
                  {displayedText}
                </Typography>
                {isTextLong && (
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                    <MuiButton
                      size="small"
                      onClick={toggleExpanded}
                      sx={{
                        textTransform: 'none',
                        padding: 0,
                        '&:hover': {
                          backgroundColor: 'inherit',
                          boxShadow: 'none',
                        },
                      }}
                    >
                      {expanded ? 'Read Less' : 'Read More'}
                    </MuiButton>
                  </Box>
                )}
              </Box>
            );
          }}
        />
      </Grid>
    );
  }

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...field }, fieldState: { error } }) => {
          return (
            <TextField
              {...field}
              {...props}
              label={label}
              type={type}
              placeholder={props.placeholder || `Enter ${label}`}
              fullWidth
              error={!!error}
              helperText={error?.message}
              multiline={multiline}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment,
                ...InputProps,
                ...field.InputProps,
                style: {
                  padding: multiline ? 3 : undefined,
                  ...InputProps?.style,
                },
              }}
              inputRef={ref}
            />
          );
        }}
      />
    </Grid>
  );
}

export default MuiTextField;
