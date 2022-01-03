import moment from 'moment';
import { v4 as uuid } from 'uuid';
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

const orders = [
  {
    id: uuid(),
    RFID: 'CDD1049',
    amount: 30.5,
    employee: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'high'
  },
  {
    id: uuid(),
    RFID: 'CDD1048',
    amount: 25.1,
    employee: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'low'
  },
  {
    id: uuid(),
    RFID: 'CDD1047',
    amount: 10.99,
    employee: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'normal'
  },
  {
    id: uuid(),
    RFID: 'CDD1046',
    amount: 96.43,
    employee: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'high'
  },
  {
    id: uuid(),
    RFID: 'CDD1045',
    amount: 32.54,
    employee: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'low'
  },
  {
    id: uuid(),
    RFID: 'CDD1044',
    amount: 16.76,
    employee: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'low'
  }
];

const LatestOrders = (props) => (
  <Card {...props}>
    <CardHeader title="Card Tapped Employees" />
    <Divider />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>RFID</TableCell>
              <TableCell>Employee</TableCell>
              <TableCell sortDirection="desc">
                <Tooltip enterDelay={300} title="Sort">
                  <TableSortLabel active direction="desc">
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow hover key={order.id}>
                <TableCell>{order.RFID}</TableCell>
                <TableCell>{order.employee.name}</TableCell>
                <TableCell>
                  {moment(order.createdAt).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>
                  <Chip color="primary" label={order.status} size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
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
        View all
      </Button>
    </Box>
  </Card>
);

export default LatestOrders;
