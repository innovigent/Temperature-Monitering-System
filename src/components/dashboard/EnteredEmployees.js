import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EnteredEmployees = (props) => {
  const token = localStorage.getItem('Token');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getEmps = async () => {
      try {
        const res = await axios.get(
          'https://project-tnt-api.herokuapp.com/api/v1/organizations/' +
            localStorage.getItem('organization') +
            '/movements',
          headers
        );

        if (res.status === 200) {
          console.log(res);
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
            <Typography color="textSecondary" gutterBottom variant="h6">
              ENTERED EMPLOYEES
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {count}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: green[500],
                height: 56,
                width: 56
              }}
            >
              <PeopleIcon />
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
            16%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since yesterday
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EnteredEmployees;
