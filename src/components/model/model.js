import React, { useState, useEffect } from 'react';
import './Model.css';
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
import axios from 'axios';

const token = localStorage.getItem('Token');
console.log(token);
const headers = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

const Model = (props) => {
  const [modal, setModal] = useState(false);
  //   const [values, setValues] = useState({
  //   newpassword: '',
  //   confirm: ''
  // });
  const [oldpassword, setold] = useState();
  const [newpassword, setpassword] = useState();
  const [confirmNewpassword, setconfirm] = useState();
  const [err, setErr] = useState('');

  const toggleModal = (event) => {
    setModal(!modal);
    event.preventDefault();
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  //    const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   });
  // };

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const body = { oldpassword, newpassword, confirmNewpassword };
      console.log(body);

      const loginResponse = await axios.post(
        'https://project-tnt-api.herokuapp.com/api/v1/users/' +
          localStorage.getItem('organization') +
          '/changepassword/addnewpassword',
        body,
        {
          //body: formData,
          headers: {
            Authorization: `Bearer ${token}`
          }
          //credentials: 'include',
        }
      );

      // window.location.reload();
    } catch (err) {
      err.response.data.message && setErr(err.response.data.message);
    }
  };

  return (
    <>
      <Button onClick={toggleModal} color="primary">
        Edit
      </Button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <form {...props} onSubmit={submit}>
              <Card>
                <CardHeader subheader="Update newpassword" title="" />
                <Divider />
                <CardContent>
                  <TextField
                    fullWidth
                    label="Old Password"
                    margin="normal"
                    name="newpassword"
                    onChange={(e) => setold(e.target.value)}
                    type="password"
                    value={oldpassword}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="New Password"
                    margin="normal"
                    name="newpassword"
                    onChange={(e) => setpassword(e.target.value)}
                    type="password"
                    value={newpassword}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    margin="normal"
                    name="confirm"
                    onChange={(e) => {
                      setconfirm(e.target.value);
                      console.log(confirmNewpassword);
                    }}
                    type="password"
                    value={confirmNewpassword}
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
                  <Button
                    color="primary"
                    variant="text"
                    onClick={toggleModal}
                    sx={{ mr: 2 }}
                  >
                    Close
                  </Button>
                  <Button color="primary" variant="contained" type="submit">
                    Update
                  </Button>
                </Box>
              </Card>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default Model;
