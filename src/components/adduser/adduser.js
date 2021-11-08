import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';

import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import Userpopup from '../adduser/adduserpopup';

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
    <form {...props}>
      <Card>
        <CardHeader
          subheader=""
          title="Add users through form"
        />
        <Divider />
        <CardContent>
         

         
          <Userpopup/>

        </CardContent>
       
         
       
      </Card>
    </form>
  );
};

export default SettingsPassword;
