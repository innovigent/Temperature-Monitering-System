import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Container
} from '@material-ui/core';

import txt from 'src/token.txt';
import axios from 'axios';
import { HashLoader } from 'react-spinners';

const Forgetpassword = () => {
  const [email, setemail] = useState();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const body = { email };
      //   const formData = new FormData()

      //   formData.append("name", locationname);

      //  formData.append("limit", max);
      //   formData.append("count", count);

      // const body = {email, firstName,lastName,mobile,epfNo,permission};
      const loginResponse = await axios.post(
        'https://project-tnt-api.herokuapp.com/api/v1/users/forgotpasswordverify',
        body
        //body: formData,

        //credentials: 'include',
      );

      window.location.reload();
    } catch (err) {
      err.response.data.message && setErr(err.response.data.message);
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
            <CardHeader subheader="Send Email" title="Forgot Passowrd" />
            <Divider />
            <CardContent>
              <TextField
                fullWidth
                label="Enter your email"
                margin="normal"
                name="email"
                onChange={(e) => setemail(e.target.value)}
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
