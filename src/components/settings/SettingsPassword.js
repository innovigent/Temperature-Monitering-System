import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography
} from '@material-ui/core';

import Popup from 'reactjs-popup';
import Model from '../model/model';

const SettingsPassword = (props) => {
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
      <CardHeader title="Profile Settings" />
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
            <Typography variant="body1">Update Password</Typography>
            <Model />
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default SettingsPassword;
