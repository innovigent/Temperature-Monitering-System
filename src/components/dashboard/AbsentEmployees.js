import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { amber, green } from '@material-ui/core/colors';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const AbsentEmployees = (props) => (
  <Card sx={{ height: '100%' }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            ABSENT EMPLOYEES
          </Typography>
          <Typography color="textPrimary" variant="h3">
            {props.total - props.entered}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: amber[600],
              height: 56,
              width: 56
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        <ArrowUpwardIcon sx={{ color: green[500] }} />
        <Typography
          variant="body2"
          sx={{
            color: green[500],
            mr: 1
          }}
        >
          12%
        </Typography>
        <Typography color="textSecondary" variant="caption">
          Since yesterday
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default AbsentEmployees;
