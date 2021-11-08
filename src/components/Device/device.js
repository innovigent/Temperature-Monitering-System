import { useState ,useEffect} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
    CardHeader,
  Divider,
 
  TextField
} from '@material-ui/core';
import txt from "src/token.txt";
import axios from "axios";


const states = [
  {
    value: 'location01',
    label: 'location01'
  },
  {
    value: 'location02',
    label: 'location02'
  },
  {
    value: 'location03',
    label: 'location03'
  }
];
const token = localStorage.getItem("Token")
     console.log(token);
 const headers = {

        headers: {

            "Authorization":`Bearer ${token}`
        }
    };

const Device = () => {
  const [devicename, setdevicename] = useState();
  const [type, settype] = useState();
  const [locaation, setlocaation] = useState();
  const [err, setErr] = useState("");
  const [emp, setemp] = useState();
 
  
    const submit = async (e) => {
      
   e.preventDefault();
        setErr("");
        try {
            const formData = new FormData()

            
            
          const body={type}
           
       
            // const body = {email, firstName,lastName,mobile,epfNo,permission};
            const loginResponse = await axios.post("https://project-tnt-api.herokuapp.com/api/v1/devices", body,{
                    //body: formData,
                    headers: {
                        'Accept': 'multipart/form-data',
                        "Authorization": `Bearer ${token}`
                    },
                    //credentials: 'include',
                }
          );
        
            window.location.reload();

        } catch (err) {
            err.response.data.message && setErr(err.response.data.message)
        }  

    

      };
 

    return (
      <>
    <form  onSubmit={submit}>
      <Card>
        <CardHeader
          subheader="Add Device"
          title="Device"
        />
        <Divider />
        <CardContent>
     
        <TextField
            fullWidth
            label="Type"
            margin="normal"
            name=""
            onChange={(e) => settype(e.target.value)}
            type="text"
            value={type}
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
          <Button
            color="primary"
                variant="contained"
                type="submit"
          >
            Save
          </Button>
        </Box>
      </Card>
            </form>
        </>    
  )
}

 export default Device;
