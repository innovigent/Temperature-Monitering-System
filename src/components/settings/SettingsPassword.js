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
import Model from '../model/model'

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
     
     
      
         

          <label className="updatepassword"><b>Update password</b></label>
          <Model/>

      
    </form>
  );
};

export default SettingsPassword;
