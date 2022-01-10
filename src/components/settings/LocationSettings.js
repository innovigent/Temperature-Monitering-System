import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Switch,
  TextField,
  Typography
} from '@material-ui/core';
import axios from 'axios';

const LocationSettings = (props) => {
  const token = localStorage.getItem('Token');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const [devices, setDevices] = useState([]);

  const getEmps = async () => {
    try {
      const res = await axios.post(
        'https://project-tnt-api.herokuapp.com/api/v1/devices/admin/' +
          localStorage.getItem('organization') +
          '/listDevices',
        {},
        headers
      );

      if (res.status === 200) {
        console.log(res.data.data);
        setDevices(res.data.data.devices);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmps();
  }, []);

  const handleChange = async (status, id) => {
    console.log(status, id);
    try {
      const endpoint =
        status === 1
          ? 'https://project-tnt-api.herokuapp.com/api/v1/devices/' +
            localStorage.getItem('organization') +
            '/admin/deactivate'
          : 'https://project-tnt-api.herokuapp.com/api/v1/devices/' +
            localStorage.getItem('organization') +
            '/admin/activate';
      const res = await axios.post(endpoint, { deviceId: id }, headers);

      if (res.status === 200) {
        getEmps();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card sx={{ p: 1 }}>
      <CardHeader title="Device Settings" />
      <Divider />
      <CardContent>
        {devices?.map((device) => {
          return (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="body2">
                {device.uuid +
                  ' - ' +
                  device.deivceType.name +
                  ' (' +
                  device.location.name +
                  ')'}
              </Typography>
              <Switch
                checked={device.statusId === 1 ? true : false}
                onChange={() => handleChange(device.statusId, device.id)}
              />
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default LocationSettings;
