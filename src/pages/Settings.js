import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';

import SettingsPassword from '../components/settings/SettingsPassword';
import LocationSettings from 'src/components/settings/LocationSettings';
import Admin from 'src/pages/Admin';

const SettingsView = () => (
  <>
    <Helmet>
      <title>Settings</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%'
      }}
    >
      <Container maxWidth="xxlg">
        <Grid item lg={12} md={12} xs={12}>
          <Box sx={{ pt: 3 }}>
            <SettingsPassword />
          </Box>
          <Box sx={{ pt: 3 }}>
            <LocationSettings />
          </Box>
          <Box sx={{ py: 3 }}>
            <Admin />
          </Box>
        </Grid>
      </Container>
    </Box>
  </>
);

export default SettingsView;
