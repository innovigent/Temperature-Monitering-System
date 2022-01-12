import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import txt from 'src/token.txt';
import axios from 'axios';

const states = [
  {
    value: 'Management',
    label: 'Management'
  },
  {
    value: 'Executive',
    label: 'Executive'
  },
  {
    value: 'Ordinary',
    label: 'Ordinary'
  }
];

const token = localStorage.getItem('Token');
const headers = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

const AccountProfileDetails = (props) => {
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [rfid, setRfid] = useState();
  const [emp, setemp] = useState();
  const [text, setText] = useState('');
  const [err, setErr] = useState('');
  const [type, settype] = useState();
  const [listData, setListData] = useState({ lists: [] });
  const [loading, setLoading] = useState(true);

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const body = { email, firstName, lastName, phone, rfid };
      const loginResponse = await axios.post(
        'https://project-tnt-api.herokuapp.com/api/v1/organizations/' +
          localStorage.getItem('organization') +
          '/employees',
        body,
        headers
      );

      if (loginResponse.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      err.response.data.message && setErr(err.response.data.message);
    }
  };

  return (
    <form noValidate {...props} onSubmit={submit}>
      <Card>
        <CardHeader subheader="Add Employee" title="Employees" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                onChange={(e) => setfirstName(e.target.value)}
                required
                value={firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                onChange={(e) => setlastName(e.target.value)}
                required
                value={lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={(e) => setemail(e.target.value)}
                required
                value={email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={(e) => setphone(e.target.value)}
                type="number"
                value={phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="RFID"
                name="Address"
                onChange={(e) => setRfid(e.target.value)}
                required
                value={rfid}
                variant="outlined"
              />
            </Grid>
          </Grid>
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
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
