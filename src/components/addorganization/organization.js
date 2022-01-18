import { useState } from 'react';
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

const Companydetails = (props) => {
  const [companyname, setcompanyName] = useState();
  const [ceoname, setceoName] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [address, setaddress] = useState();
  const [regno, setreg] = useState();

  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   });
  // };

  return (
    <form autoComplete="off" noValidate {...props}>
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
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default Companydetails;
