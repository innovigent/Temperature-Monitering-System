import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import FacebookIcon from '../icons/Facebook';
import GoogleIcon from '../icons/Google';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let [loading, setLoading] = useState('');
  const [err, setErr] = useState('');

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const Submit = async (e) => {
    e.preventDefault();
    setErr('');

    try {
      const body = { email, password };
      const loginResponse = await axios.post(
        'https://project-tnt-api.herokuapp.com/api/v1/users/login',
        body
      );

      localStorage.setItem('Token', loginResponse.data.data.token);
      localStorage.setItem(
        'organization',
        loginResponse.data.data.user.organizations[0].id
      );

      setLoading(false);

      navigate('app/dashboard');
    } catch (err) {
      setLoading(false);
      err.response.data.message && setErr(err.response.data.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
          // initialValues={{
          //   email: 'demo@devias.io',
          //   password: 'Password123'
          // }}
          // validationSchema={Yup.object().shape({
          //   email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          //   password: Yup.string().max(255).required('Password is required')
          // })}
          // onSubmit={() => {
          //   navigate('/app/dashboard', { replace: true });
          // }}
          >
            {/* {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => ( */}
            <form onSubmit={Submit}>
              <Box sx={{ mb: 3 }}>
                <Typography color="textPrimary" variant="h2">
                  Sign in
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Sign in on the internal platform
                </Typography>
              </Box>
              <Grid container spacing={3}>
                {/* <Grid
                    item
                    xs={12}
                    md={6}
                  > */}
                {/* <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button> */}
                {/* </Grid> */}
                {/* <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid> */}
              </Grid>
              <Box
                sx={{
                  pb: 1,
                  pt: 3
                }}
              >
                {/* <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography> */}
              </Box>
              <TextField
                error=""
                fullWidth
                helperText=""
                label="Email Address"
                margin="normal"
                name="email"
                onBlur=""
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                variant="outlined"
              />
              <TextField
                error=""
                fullWidth
                helperText=""
                label="Password"
                margin="normal"
                name="password"
                onBlur=""
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                variant="outlined"
              />
              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  disabled=""
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in now
                </Button>
              </Box>
              <Typography color="textSecondary" variant="body1">
                <Link
                  component={RouterLink}
                  to="/forgot"
                  variant="h6"
                  underline="hover"
                >
                  Forgot Password
                </Link>
              </Typography>
            </form>
            {/* )} */}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
