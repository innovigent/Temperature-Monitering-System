import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import { red } from '@material-ui/core/colors';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TotalEmployees = (props) => {
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
          'https://project-tnt-api.herokuapp.com/api/v1/employees/' +
            localStorage.getItem('organization') +
            '/getall',
          headers
        );

        if (res.status === 200) {
          setCount(res.data.data.employees.length);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEmps();
  }, []);

  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL EMPLOYEES
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {count}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: red[400],
                height: 56,
                width: 56
              }}
            >
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ArrowDownwardIcon sx={{ color: red[400] }} />
          <Typography
            sx={{
              color: red[400],
              mr: 1
            }}
            variant="body2"
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
};

export default TotalEmployees;
