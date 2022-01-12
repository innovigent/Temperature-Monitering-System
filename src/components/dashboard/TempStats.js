import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TempStats = (props) => {
  const theme = useTheme();
  const token = localStorage.getItem('Token');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const [highCount, setHighCount] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [midCount, setMidCount] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [lowCount, setLowCount] = useState([0, 0, 0, 0, 0, 0, 0]);

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

          const currentDate = new Date();
          const oneJan = new Date(currentDate.getFullYear(), 0, 1);
          const numberOfDays = Math.floor(
            (currentDate - oneJan) / (24 * 60 * 60 * 1000)
          );
          const result = Math.ceil(
            (currentDate.getDay() + 1 + numberOfDays) / 7
          );

          setHighCount(
            res.data.data.movementLogs.filter((log) => {
              const currentDate = new Date(log.createdAt);
              const oneJan = new Date(currentDate.getFullYear(), 0, 1);
              const numberOfDays = Math.floor(
                (currentDate - oneJan) / (24 * 60 * 60 * 1000)
              );
              const resultTemp = Math.ceil(
                (currentDate.getDay() + 1 + numberOfDays) / 7
              );
              return resultTemp === result && log.temperature > 37.5;
            })
          );
          setMidCount(
            res.data.data.movementLogs.filter((log) => {
              const currentDate = new Date(log.createdAt);
              const oneJan = new Date(currentDate.getFullYear(), 0, 1);
              const numberOfDays = Math.floor(
                (currentDate - oneJan) / (24 * 60 * 60 * 1000)
              );
              const resultTemp = Math.ceil(
                (currentDate.getDay() + 1 + numberOfDays) / 7
              );

              return (
                resultTemp === result &&
                log.temperature <= 37.5 &&
                log.temperature >= 36
              );
            })
          );

          setLowCount(
            res.data.data.movementLogs.filter((log) => {
              const currentDate = new Date(log.createdAt);
              const oneJan = new Date(currentDate.getFullYear(), 0, 1);
              const numberOfDays = Math.floor(
                (currentDate - oneJan) / (24 * 60 * 60 * 1000)
              );
              const resultTemp = Math.ceil(
                (currentDate.getDay() + 1 + numberOfDays) / 7
              );

              return resultTemp === result && log.temperature < 36;
            })
          );
          console.log(highCount, midCount, lowCount);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEmps();
  }, []);

  const data = {
    datasets: [
      {
        backgroundColor: colors.red[500],
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: highCount?.map((count) => count.temperature),
        label: 'High Temperature',
        maxBarThickness: 10
      },
      {
        backgroundColor: colors.amber[400],
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: midCount?.map((count) => count.temperature),
        label: 'Normal Temperature',
        maxBarThickness: 10
      },
      {
        backgroundColor: colors.green[400],
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: lowCount?.map((count) => count.temperature),
        label: 'Low Temperature',
        maxBarThickness: 10
      }
    ],
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ]
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
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

  return (
    <Card {...props}>
      <CardHeader
        action={
          <Button endIcon={<ArrowDropDownIcon />} size="small" variant="text">
            Last 7 days
          </Button>
        }
        title="Temperature Stats"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

export default TempStats;
