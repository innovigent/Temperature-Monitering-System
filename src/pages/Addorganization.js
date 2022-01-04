import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import Companydetails from '../components/addorganization/organization';
import CustomerListResults from '../components/customer/Organizations';

const Addcompanypage = () => (
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
          <Companydetails />
        </Box>
        <CustomerListResults />
      </Container>
    </Box>
  </>
);

export default Addcompanypage;
