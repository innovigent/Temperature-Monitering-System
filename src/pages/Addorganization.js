import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Companydetails from '../components/addorganization/organization';
import CustomerListResults from '../components/customer/Organizations';

const Addcompanypage = () => (
  <>
    <Helmet>
      <title>Companies</title>
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
