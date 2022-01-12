import React, { useState } from 'react';
import {
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
  const [name, setName] = useState('');
  const [count, setCount] = useState('');
  const [limit, setLimit] = useState('');

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const body = { name, limit, count };
      const loginResponse = await axios.post(
        'https://project-tnt-api.herokuapp.com/api/v1/organizations/' +
          localStorage.getItem('organization') +
          '/locations',
        body,
        {
          headers: {
            Accept: 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      window.location.reload();
    } catch (err) {
      err.response.data.message && setErr(err.response.data.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <Card sx={{ p: 1 }}>
        <CardHeader title="Admin Settings" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="AdminSubmit Name"
            margin="normal"
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Count"
            margin="normal"
            onChange={(e) => {
              console.log(e.target.value);
              setCount(e.target.value);
            }}
            type="number"
            value={count}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Maximum Number"
            margin="normal"
            onChange={(e) => {
              console.log(e.target.value);
              setLimit(e.target.value);
            }}
            type="number"
            value={limit}
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
