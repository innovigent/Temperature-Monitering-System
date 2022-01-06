import {
  Avatar,
  Card,
  CardContent,
  Box,
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useState, useEffect } from 'react';
import axios from 'axios';

const HighTempEmployees = (props) => {
  const token = localStorage.getItem('Token');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const [count, setCount] = useState([]);

  useEffect(() => {
    const getEmps = async () => {
      try {
        const res = await axios.get(
          'https://project-tnt-api.herokuapp.com/api/v1/organizations/' +
            localStorage.getItem('organization') +
            '/movements/flagged',
          headers
        );

        if (res.status === 200) {
          setCount(
            res.data.data.movementLogs.filter(
              (log) =>
                new Date(log.createdAt).toLocaleDateString() ===
                new Date().toLocaleDateString()
            ).length
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEmps();
  }, []);
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="white" gutterBottom variant="h6">
              HIGH TEMP EMPLOYEES
            </Typography>
            <Typography color="white" variant="h3">
              {count}
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
        <Box>
          <Button
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
            onClick={() => {
              window.location.href = '/app/flagged/employees';
            }}
            sx={{ color: 'white' }}
          >
            View All
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HighTempEmployees;
