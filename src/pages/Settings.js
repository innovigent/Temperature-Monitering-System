import { Helmet } from 'react-helmet';
import { Box, Container,Grid } from '@material-ui/core';

import SettingsPassword from '../components/settings/SettingsPassword';

const SettingsView = () => (
  <>
    <Helmet>
      <title>Settings | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
         <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
       
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
        </Grid>
      </Container>
    </Box>
  </>
);

export default SettingsView;
