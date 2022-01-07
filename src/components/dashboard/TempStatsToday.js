import { Doughnut } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import axios from 'axios';

const TempStatsToday = (props) => {
  const token = localStorage.getItem('Token');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const [highCount, setHighCount] = useState(0);
  const [midCount, setMidCount] = useState(0);
  const [lowCount, setLowCount] = useState(0);

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
          setHighCount(
            res.data.data.movementLogs.filter(
              (log) =>
                new Date(log.createdAt).toLocaleDateString() ===
                  new Date().toLocaleDateString() && log.temperature > 37.5
            ).length
          );
          setMidCount(
            res.data.data.movementLogs.filter(
              (log) =>
                new Date(log.createdAt).toLocaleDateString() ===
                  new Date().toLocaleDateString() &&
                log.temperature <= 37.5 &&
                log.temperature >= 36
            ).length
          );
          setLowCount(
            res.data.data.movementLogs.filter(
              (log) =>
                new Date(log.createdAt).toLocaleDateString() ===
                  new Date().toLocaleDateString() && log.temperature < 36
            ).length
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEmps();
  }, []);

  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [highCount, midCount, lowCount],
        backgroundColor: [
          colors.red[400],
          colors.amber[500],
          colors.green[500]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['High', 'Normal', 'Low']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'High',
      value: ((highCount / (highCount + midCount + lowCount)) * 100).toFixed(1),
      icon: ArrowUpwardIcon,
      color: colors.red[400]
    },
    {
      title: 'Normal',
      value: ((midCount / (highCount + midCount + lowCount)) * 100).toFixed(1),
      icon: ArrowForwardIcon,
      color: colors.amber[500]
    },
    {
      title: 'Low',
      value: ((lowCount / (highCount + midCount + lowCount)) * 100).toFixed(1),
      icon: ArrowDownwardIcon,
      color: colors.green[500]
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="Temperature Stats Today" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h2">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TempStatsToday;
