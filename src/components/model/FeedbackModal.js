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

const FeedbackModal = (props) => {
  const [modal, setModal] = useState(false);
  const [oldpassword, setold] = useState();
  const [newpassword, setpassword] = useState();
  const [confirmNewpassword, setconfirm] = useState();
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');

  console.log(props);
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
        View
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
                <CardHeader title="Feedback Details" />
                <Divider />
                <CardContent>
                  <TextField
                    fullWidth
                    label="Subject"
                    margin="normal"
                    name="newpassword"
                    type="text"
                    value={props.feedback.subject}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    margin="normal"
                    name="newpassword"
                    type="text"
                    value={props.feedback.description}
                    variant="outlined"
                    multiline
                    rows={5}
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
                </Box>
              </Card>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default FeedbackModal;
