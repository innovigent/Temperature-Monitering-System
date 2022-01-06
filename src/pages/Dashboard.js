import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { useState } from 'react';
import TotalEmployees from '../components/dashboard/TotalEmployees';
import TappedEmployees from '../components/dashboard/TappedEmployees';
import TempStats from '../components/dashboard/TempStats';
import AbsentEmployees from '../components/dashboard/AbsentEmployees';
import EnteredEmployees from '../components/dashboard/EnteredEmployees';
import HighTempEmployees from '../components/dashboard/HighTempEmployees';
import TempStatsToday from '../components/dashboard/TempStatsToday';

const Dashboard = () => {
  const [total, setTotal] = useState(0);
  const [entered, setEntered] = useState(0);
  const [absent, setAbsent] = useState(0);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalEmployees setTotal={setTotal} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <EnteredEmployees setEntered={setEntered} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <AbsentEmployees entered={entered} total={total} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <HighTempEmployees
                sx={{
                  height: '100%',
                  backgroundColor: red[400]
                }}
              />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <TempStats />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <TempStatsToday sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <TappedEmployees />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
