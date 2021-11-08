import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import Location from '../components/location/loc';
import CustomerListResults from '../components/customer/users';

 const Addlocation = () => (
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
      
      <Container maxWidth="lg">    
           <Box sx={{ pt: 3 }}>
           <Location />
          
            </Box>
           
             <CustomerListResults/>
      
       </Container>
      
    </Box>
  </>
);

export default Addlocation;
