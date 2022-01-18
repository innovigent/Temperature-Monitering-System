import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import axios from 'axios';

const token = localStorage.getItem('Token');
const headers = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

const AdminSubmit = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [epf, setEPF] = useState('');
  const [phoneNo, setPhone] = useState('');

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const body = { firstName, email, lastName, phoneNo, epf };
      const loginResponse = await axios.post(
        'https://project-tnt-api.herokuapp.com/api/v1/admin/' +
          localStorage.getItem('organization') +
          '/createAdminUsers',
        body,
        {
          headers: {
            Accept: 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(loginResponse);
      if (loginResponse.status === 200) {
        console.log(loginResponse.data);
        window.location.reload();
      }
    } catch (err) {
      err.response.data.message && setErr(err.response.data.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <Card sx={{ p: 1 }}>
        {err && <Alert severity="error">{err}</Alert>}
        <CardHeader title="Admin Settings" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            value={firstName}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Last Name"
            margin="normal"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            value={lastName}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            value={email}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="EPF Number"
            margin="normal"
            onChange={(e) => {
              setEPF(e.target.value);
            }}
            type="number"
            value={epf}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Phone Number"
            margin="normal"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            type="number"
            value={phoneNo}
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
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AdminSubmit;
