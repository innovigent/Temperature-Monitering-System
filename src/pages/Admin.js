import { Box, Card } from '@material-ui/core';
import Location from '../components/admin/AdminSubmit';
import CustomerListResults from '../components/admin/AdminList';

const Admin = () => (
  <Card>
    <Box>
      <Location />
    </Box>
    <Box>{/* <CustomerListResults /> */}</Box>
  </Card>
);

export default Admin;
