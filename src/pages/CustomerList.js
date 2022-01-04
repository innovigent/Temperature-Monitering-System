import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from '../components/customer/CustomerListResults';
import CustomerListToolbar from '../components/customer/CustomerListToolbar';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerList = () => {
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
          'https://project-tnt-api.herokuapp.com/api/v1/employees/' +
            localStorage.getItem('organization') +
            '/getall',
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

  return (
    <>
      <Helmet>
        <title>Employees</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <AccountProfileDetails />
          {/* <CustomerListToolbar /> */}
          <Box sx={{ pt: 3 }}>
            <CustomerListResults employees={employees} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerList;
