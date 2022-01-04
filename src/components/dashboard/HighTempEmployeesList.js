import moment from 'moment';
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

const HighTempEmployeesList = (props) => {
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
            '/movements/flagged',
          headers
        );

        if (res.status === 200) {
          console.log(res);
          setEmployees(res.data.data.movementLogs);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEmps();
  }, []);

  return (
    <Card {...props}>
      <CardHeader title="High Temp Employees" />
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
    </Card>
  );
};

export default HighTempEmployeesList;
