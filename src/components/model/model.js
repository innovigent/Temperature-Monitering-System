import React, { useState } from 'react';
import './Model.css';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Alert
} from '@material-ui/core';
import axios from 'axios';

const token = localStorage.getItem('Token');

const Model = (props) => {
  const [modal, setModal] = useState(false);
  const [oldpassword, setold] = useState();
  const [newpassword, setpassword] = useState();
  const [confirmNewpassword, setconfirm] = useState();
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');

  const toggleModal = (event) => {
    setErr('');
    setSuccess('');
    setModal(!modal);
    event.preventDefault();
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setSuccess('');
    try {
      const body = { oldpassword, newpassword, confirmNewpassword };
      console.log(body);

      if (newpassword !== confirmNewpassword)
        return setErr('Passwords do not match');

      const loginResponse = await axios.post(
        'https://project-tnt-api.herokuapp.com/api/v1/users/' +
          localStorage.getItem('organization') +
          '/changepassword/addnewpassword',
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (loginResponse.status === 200) {
        setold('');
        setpassword('');
        setconfirm('');
        setSuccess('Updated Successfully');

        setTimeout(() => {
          setModal(false);
        }, 2000);
      }
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
            <form {...props}>
              {err && (
                <Alert severity="error" sx={{ mb: 4 }}>
                  {err}
                </Alert>
              )}
              {success && (
                <Alert severity="success" sx={{ mb: 4 }}>
                  {success}
                </Alert>
              )}
              <Card>
                <CardHeader title="Update Password" />
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
                    onChange={(e) => setconfirm(e.target.value)}
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
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={submit}
                  >
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
