import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import axios from 'axios';

const token = localStorage.getItem('Token');

const headers = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

const CustomerListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [listData, setListData] = useState([]);
  const [text, setText] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {};
    const fetchData1 = async () => {
      setLoading(true);

      const result = await axios(
        `https://project-tnt-api.herokuapp.com/api/v1/organizations/${localStorage.getItem(
          'organization'
        )}/retrieveRegisteredOrg`,
        headers
      );
      console.log(result);

      setListData(result.data.data.organization);
      setLoading(false);
    };

    fetchData();
    fetchData1();
  }, []);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = listData.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(listData, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(listData.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        listData.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        listData.slice(0, selectedIndex),
        listData.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    /* checked={listData.length === listData.length}*/
                    color="primary"
                    indeterminate={
                      listData.length > 0 && listData.length < listData.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Company Email</TableCell>
                <TableCell>Company Website</TableCell>
                <TableCell>Registration Number</TableCell>
                <TableCell>Telephone Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listData.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={listData.id}
                  selected={listData.indexOf(listData.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={listData.indexOf(listData.id) !== -1}
                      onChange={(event) => handleSelectOne(event, listData.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {customer.id}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.companyEmail}</TableCell>
                  <TableCell>{customer.companyWebsite}</TableCell>
                  <TableCell>{customer.regNo}</TableCell>
                  <TableCell>{customer.telephoneNo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={listData.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomerListResults;
