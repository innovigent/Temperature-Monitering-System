import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Container,
  Alert
} from '@material-ui/core';
import axios from 'axios';
import FeedbackList from '../components/feedback/FeedbackList';

const token = localStorage.getItem('Token');
const headers = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

const FeedbackSubmit = () => {
  const [subject, setSubject] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDesc] = useState('');
  const [err, setErr] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getEmps = async () => {
      try {
        const res = await axios.get(
          'https://project-tnt-api.herokuapp.com/api/v1/feedbacks/' +
            localStorage.getItem('organization') +
            '/myfeedback',
          headers
        );

        if (res.status === 200) {
          setEmployees(res.data.data.employees);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEmps();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      console.log(subject, phone, description);
      const body = { subject, phone, description };
      const loginResponse = await axios.post(
        'https://project-tnt-api.herokuapp.com/api/v1/feedback/' +
          localStorage.getItem('organization') +
          '/create',
        body,
        {
          headers: {
            Accept: 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (loginResponse.status === 201) {
        window.location.reload();
      }
    } catch (err) {
      err.response.data.message && setErr(err.response.data.message);
    }
  };

  return (
    <Container maxWidth="xxl" sx={{ py: 3 }}>
      <Box>
        <>
          <form onSubmit={submit}>
            {err && <Alert severity="error">{err}</Alert>}
            <Card>
              <CardHeader subheader="Submit Feedback" title="Feedbacks" />
              <Divider />
              <CardContent>
                <TextField
                  fullWidth
                  label="Contact Number"
                  margin="normal"
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  value={phone}
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
                  rows={5}
                  multiline
                  fullWidth
                  label="Description"
                  margin="normal"
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  type="text"
                  value={description}
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
      <Box sx={{ py: 3 }}>
        <FeedbackList employees={employees} />
      </Box>
    </Container>
  );
};

export default FeedbackSubmit;
