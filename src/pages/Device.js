import { Helmet } from 'react-helmet';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import Device from '../components/Device/device';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import Location from '../components/location/loc';

import CustomerListToolbar from '../components/customer/CustomerListToolbar';
import customers from '../__mocks__/customers';
import Table from '../components/table/Table';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import txt from 'src/token.txt';
import CustomerListResults from '../components/customer/devicetable';

const fields = ['firstName', 'email', 'epfNo', 'Status'];

const rows = [
  {
    id: 1,
    firstName: 'mujeeb',
    lastName: 'singham',
    email: 'chandulagayan@gmail.com',
    verificationtoken: '1234',
    epfNo: null,
    phoneNo: '0776465645',
    image: null,
    statusId: 1,
    password: '$2y$10$zrrjILLqTKyxYiR3jrOdvuaE.tEG3U148gVPoe7zYQLpitytXpyU2 ',
    createdAt: '2021-07-16T10:38:11.002Z',
    updatedAt: '2021-07-16T10:38:11.002Z'
  },
  {
    id: 9,
    firstName: 'Gayath',
    lastName: 'Chandula',
    email: 'chandulagayan1@gmail.com',
    verificationtoken: 'g96wx6',
    epfNo: '47586598',
    phoneNo: null,
    image: 'uploads/dashboard.JPG-1626512057383.jpeg',
    statusId: 50,
    password: '$2b$10$vqy4Pln0C.V88NOCdpOOFOKZYHbVGWv.yV/7XLn7cpYxLQnV2PzPi'
  }
];

const Deviceapp = () => {
  return (
    <>
      <Helmet>
        <title>Account | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="xxlg">
          <Box>
            <Device />
            <Box sx={{ pt: 3 }}>
              <CustomerListResults />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Deviceapp;
