import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import txt from 'src/token.txt';

const token = localStorage.getItem('Token');
console.log(token);
const headers = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

console.log(headers);
const Location = () => {
  const [name, setName] = useState('');
  const [count, setCount] = useState('');
  const [limit, setLimit] = useState('');
  const [listData, setListData] = useState({ lists: [] });
  const [listData1, setListData1] = useState({ lists: [] });

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const body = { name, limit, count };
      //   const formData = new FormData()

      //   formData.append("name", locationname);

      //  formData.append("limit", max);
      //   formData.append("count", count);

      // const body = {email, firstName,lastName,mobile,epfNo,permission};
      const loginResponse = await axios.post(
        'https://project-tnt-api.herokuapp.com/api/v1/organizations/' +
          localStorage.getItem('organization') +
          '/locations',
        body,
        {
          //body: formData,
          headers: {
            Accept: 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
          //credentials: 'include',
        }
      );

      window.location.reload();
    } catch (err) {
      err.response.data.message && setErr(err.response.data.message);
    }
  };

  //   if (loading) {
  //     return (
  //         <div style={{
  //             padding: "10px 20px",
  //             textAlign: "center",
  //             justifyContent: "center",
  //             display: "flex",
  //             alignItems: "center",
  //             width: "100%",
  //             height: "100vh",
  //             backgroundColor: "#FFFFFF"
  //         }}>
  //             <HashLoader loading={loading} size={150}/>
  //         </div>
  //     )
  // }

  return (
    <>
      <form onSubmit={submit}>
        <Card>
          <CardHeader subheader="Add Location" title="Location" />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="Location Name"
              margin="normal"
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Count"
              margin="normal"
              onChange={(e) => {
                console.log(e.target.value);
                setCount(e.target.value);
              }}
              type="number"
              value={count}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Maximum Number"
              margin="normal"
              onChange={(e) => {
                console.log(e.target.value);
                setLimit(e.target.value);
              }}
              type="number"
              value={limit}
              variant="outlined"
            />
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            <Button color="primary" variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};

export default Location;
