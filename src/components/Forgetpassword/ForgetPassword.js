import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Container,
  Alert
} from '@material-ui/core';
import axios from 'axios';

const Forgetpassword = () => {
  document.title = 'Forget Password';
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const body = { email };
      const loginResponse = await axios.post(
        'https://project-tnt-api.herokuapp.com/api/v1/users/forgotpasswordverify',
        body
      );
    } catch (err) {
      console.log(err.response);
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <form onSubmit={submit}>
          <Card maxWidth="lg">
            {err && (
              <Alert severity="error" sx={{ mb: 4 }}>
                {err}
              </Alert>
            )}
            <CardHeader subheader="Send Email" title="Forgot Passowrd" />
            <Divider />
            <CardContent>
              <TextField
                fullWidth
                label="Enter your email"
                margin="normal"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                variant="outlined"
              />
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              <Button color="primary" variant="contained" type="submit">
                Verify
              </Button>
            </Box>
          </Card>
        </form>
      </Container>
    </>
  );
};

export default Forgetpassword;
