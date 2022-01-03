import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

const HighTempEmployees = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color="white" gutterBottom variant="h6">
            HIGH TEMP EMPLOYEES
          </Typography>
          <Typography color="white" variant="h3">
            12
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: red[600],
              height: 56,
              width: 56
            }}
          >
            <DeviceThermostatIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default HighTempEmployees;
