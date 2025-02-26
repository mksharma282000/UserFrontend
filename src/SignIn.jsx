import React, { useEffect, useLayoutEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box,Grid2 as Grid, IconButton, InputAdornment, Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import MuiButton from './components/MuiButton';
import MuiTextField from './components/MuiTextField';
import useAuthenticate from './apis/useAuthenticate';

const schema = yup.object().shape({
  email: yup.string().required('Username or Email is required'),
  password: yup.string().required('Password is required'),
});

const defaultValues = { email: '', password: '' };

export default function SignInForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useAuthenticate();




  const { control, handleSubmit } = useForm({ defaultValues, resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    mutate(
      {
        email: data?.email || '',
        password: data?.password || '',
      },
      {
        onSuccess: (data) => {
          handleAuthenticate(data);
        },
        onError: (error) => {
          errorToast(error?.message);
        },
      }
    );
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#F9EDEA',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={9} sm={6} md={5} lg={4} xl={4}>
          <Stack
           sx={{
            background: '#fff',
            padding: '20px 31px',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
            borderRadius: '20px',
          }}
          >
            <Stack spacing={1} sx={{ alignItems: 'center' }}>
              <Typography
                variant="h5"
                sx={{ margin: '21px 0', fontWeight: '500', fontSize: '26px', lineHeight: '25px' }}
              >
                Sign in
              </Typography>
            </Stack>
            <Stack spacing={3} marginTop={3}>
              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={2}>
                  <MuiTextField
                    md={12}
                    lg={12}
                    xl={12}
                    sm={12}
                    label="Username or Email"
                    name="email"
                    type="email"
                    control={control}
                  />
                  <MuiTextField
                    label="Password"
                    name="password"
                    md={12}
                    lg={12}
                    xl={12}
                    sm={12}
                    control={control}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <MuiButton
                    type="submit"
                    variant="contained"
                    sx={{ marginTop: '25px' }}
                  >
                    Sign in
                  </MuiButton>
                  <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Link
                      sx={{ textDecoration: 'none' }}
                    >
                      Forgot password?
                    </Link>
                  </div>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
