import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Container
} from '@material-ui/core';
import axios from 'axios';

const token = localStorage.getItem('Token');

const FeedbackSubmit = () => {
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [desc, setDesc] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      console.log(subject, email, desc);
      const body = { subject, email, desc };
      const loginResponse = await axios.post(
        'https://project-tnt-api.herokuapp.com/api/v1/organizations/' +
          localStorage.getItem('organization') +
          '/locations',
        body,
        {
          headers: {
            Accept: 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      window.location.reload();
    } catch (err) {
      err.response.data.message && setErr(err.response.data.message);
    }
  };

  return (
    <Container maxWidth="xxl" sx={{ py: 3 }}>
      <Box>
        <>
          <form onSubmit={submit}>
            <Card>
              <CardHeader subheader="Submit Feedback" title="Feedbacks" />
              <Divider />
              <CardContent>
                <TextField
                  fullWidth
                  label="Your Email"
                  margin="normal"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  value={email}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Subject"
                  margin="normal"
                  onChange={(e) => setSubject(e.target.value)}
                  type="text"
                  value={subject}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Description"
                  margin="normal"
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  type="text"
                  value={desc}
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
                <Button color="primary" variant="contained" type="submit">
                  Send
                </Button>
              </Box>
            </Card>
          </form>
        </>
      </Box>
    </Container>
  );
};

export default FeedbackSubmit;
