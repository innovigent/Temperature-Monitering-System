import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Alert,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');

    try {
      const body = { email, password };
      const loginResponse = await axios.post(
        'https://project-tnt-api.herokuapp.com/api/v1/users/login',
        body
      );

      if (loginResponse.status === 200) {
        console.log(loginResponse.data);
        localStorage.setItem('Token', loginResponse.data.data.token);
        localStorage.setItem(
          'name',
          loginResponse.data.data.user.firstName +
            ' ' +
            loginResponse.data.data.user.lastName
        );
        localStorage.setItem(
          'organization',
          loginResponse.data.data.user.organizations[0].id
        );
        navigate('/app/dashboard');
      }
    } catch (err) {
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
          <form onSubmit={submit}>
            <Box sx={{ mb: 3, position: 'relative' }}>
              {err && (
                <Alert severity="error" sx={{ mb: 4 }}>
                  {err}
                </Alert>
              )}
              <Typography color="textPrimary" variant="h2">
                Sign in
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sign in on the internal platform
              </Typography>
            </Box>
            <Grid container spacing={3}></Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            ></Box>
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
        </Container>
      </Box>
    </>
  );
};

export default Login;
