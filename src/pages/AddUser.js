import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';

import Addusermar from '../components/adduser/adduserpopup';
import SettingsPassword from '../components/settings/SettingsPassword';
import CustomerListResults from '../components/customer/CustomerListResults';
import CustomerListToolbar from '../components/customer/CustomerListToolbar';
import customers from '../__mocks__/customers';

const Adduserfil = () =>  (
  <>
 
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>

     <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
       
        <Box sx={{ pt: 3 }}>
          <Addusermar />
        </Box>
      </Container>
    </Box>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default Adduserfil;
