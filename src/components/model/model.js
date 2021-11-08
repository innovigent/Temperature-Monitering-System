import React, { useState ,useEffect} from "react";
import './Model.css';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import axios from "axios";
import txt from "src/token.txt";

const token = localStorage.getItem("Token")
     console.log(token);
    const headers = {

        headers: {

            "Authorization":`Bearer ${token}`
        }
    };

const Model = (props) =>{
    const [modal, setModal] = useState(false);
  //   const [values, setValues] = useState({
  //   password: '',
  //   confirm: ''
  // });
  const [oldpassword, setold] = useState();
  const [password, setpassword] = useState();
  const [passwordConfirm, setconfirm] = useState();
  const [err, setErr] = useState("");


  
   

  
 
  const toggleModal = (event) => {
      setModal(!modal);
      event.preventDefault();
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
    }
    
  //    const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   });
  // };

  const submit = async (e) => {
    console.log("kasun");
      
   e.preventDefault();
        setErr("");
    try {
          
      const body = { oldpassword, password, passwordConfirm }
      console.log(body);
          //   const formData = new FormData()

            
          //   formData.append("name", locationname);
          
          //  formData.append("limit", max);
          //   formData.append("count", count);
       
            // const body = {email, firstName,lastName,mobile,epfNo,permission};
            const loginResponse = await axios.post("https://project-tnt-api.herokuapp.com/api/v1/users/3/changepassword/addnewpassword",body, {
                    //body: formData,
                    headers: {
                       
                        "Authorization": `Bearer ${token}`
                    },
                    //credentials: 'include',
                }
          );
        
            // window.location.reload();

        } catch (err) {
            err.response.data.message && setErr(err.response.data.message)
        }  

    

      };
  

  return (
    <>
      <button onClick={toggleModal} className="btn-modal" color="primary">
        Open
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            {/* <h2>Update Password</h2> */}
             <form {...props} onClick={submit}>
      <Card>
        <CardHeader
          subheader="Update password"
          title=""
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="old Password"
            margin="normal"
            name="password"
            onChange={(e) => setold(e.target.value)}
            type="password"
            value={oldpassword}
            variant="outlined"
                  />
                  <TextField
            fullWidth
            label="New password"
            margin="normal"
            name="password"
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            value={password}
            variant="outlined"
          /> 
           <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
                    onChange={(e) => {
                      setconfirm(e.target.value);
                      console.log(passwordConfirm)
                    }}
            type="password"
            value={passwordConfirm}
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
            Update
          </Button>
        </Box>
      </Card>
    </form>
            <button  color="red" className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
     
    </>
  );
}
export default Model;