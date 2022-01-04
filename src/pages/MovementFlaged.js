import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import Companydetails from '../components/addorganization/organization';
import CustomerListResults from '../components/dashboard/HighTempEmployeesList';

const Addmovementflag = () => (
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
          <CustomerListResults />
        </Box>
      </Container>
    </Box>
  </>
);

export default Addmovementflag;
