import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { red, green, amber } from '@material-ui/core/colors';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const LatestOrders = (props) => {
  const token = localStorage.getItem('Token');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const [employees, setEmployees] = useState([]);

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
          window.location.pathname.includes('tapped/employees')
            ? setEmployees(res.data.data.movementLogs)
            : setEmployees(res.data.data.movementLogs.slice(0, 5));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEmps();
  }, []);

  return (
    <Card {...props}>
      <CardHeader title="Card Tapped Employees" />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Temp Status</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((order) => (
                <TableRow hover key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {order.employee.firstName + ' ' + order.employee.firstName}
                  </TableCell>
                  <TableCell>
                    {moment(order.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        backgroundColor:
                          order.temperature >= 37.5
                            ? red[400]
                            : order.temperature <= 37.5 &&
                              order.temperature >= 36
                            ? green[400]
                            : amber[400]
                      }}
                      color="primary"
                      label={
                        order.temperature >= 37.5
                          ? 'High'
                          : order.temperature <= 37.5 && order.temperature >= 36
                          ? 'Normal'
                          : 'Low'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{order.location.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {window.location.pathname.includes('tapped/employees') ? (
        ''
      ) : (
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
            onClick={() => (window.location.href = '/app/tapped/employees')}
          >
            View all
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default LatestOrders;
