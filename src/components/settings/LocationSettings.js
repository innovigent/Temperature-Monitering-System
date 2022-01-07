import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Switch,
  TextField,
  Typography
} from '@material-ui/core';

import Popup from 'reactjs-popup';
import Model from '../model/model';

const LocationSettings = (props) => {
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Card sx={{ p: 1 }}>
      <CardHeader title="Device Settings" />
      <Divider />
      <CardContent>
        <form {...props}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="body1">Device 01</Typography>
            <Switch />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="body1">Device 02</Typography>
            <Switch />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="body1">Device 03</Typography>
            <Switch />
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default LocationSettings;
