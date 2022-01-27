import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FeedbackList from '../components/feedback/FeedbackList';

const Feedback = () => {
  const token = localStorage.getItem('Token');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getEmps = async () => {
      try {
        const res = await axios.get(
          'https://project-tnt-api.herokuapp.com/api/v1/feedbacks/' +
            localStorage.getItem('organization') +
            '/ListAll',
          headers
        );

        if (res.status === 200) {
          setEmployees(res.data.data.allreports);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEmps();
  }, []);

  return (
    <>
      <Helmet>
        <title>Feedbacks</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box>
            <FeedbackList employees={employees} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Feedback;
