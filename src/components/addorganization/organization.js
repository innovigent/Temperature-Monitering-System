import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Alert
} from '@material-ui/core';
import axios from 'axios';

const Companydetails = (props) => {
  const [companyname, setcompanyName] = useState();
  const [ceoname, setceoName] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [address, setaddress] = useState();
  const [regno, setreg] = useState();
  const [err, setErr] = useState('');

  const token = localStorage.getItem('Token');

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(companyname, ceoname, email, phone, address, regno);
    setErr('');
    try {
      const body = {
        name: companyname,
        companyWebsite: ceoname,
        companyEmail: email,
        telephoneNo: phone,
        address01: address,
        regNo: regno
      };

      const loginResponse = await axios.post(
        'https://project-tnt-api.herokuapp.com/api/v1/organizations/',
        body,
        {
          headers: {
            Accept: 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (loginResponse.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      err.response.data.message && setErr(err.response.data.message);
    }
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      {err && <Alert severity="error">{err}</Alert>}
      <Card sx={{ mb: 4 }}>
        <CardHeader subheader="Add Company" title="Companies" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Company Name"
                name="companyname"
                onChange={(e) => setcompanyName(e.target.value)}
                required
                value={companyname}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Company Website"
                name="ceoname"
                onChange={(e) => setceoName(e.target.value)}
                required
                value={ceoname}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
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
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="Address"
                onChange={(e) => setaddress(e.target.value)}
                required
                value={address}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Registration Number"
                name="regno"
                onChange={(e) => setreg(e.target.value)}
                required
                value={regno}
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
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={onSubmit}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default Companydetails;
