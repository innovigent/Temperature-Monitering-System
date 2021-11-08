// import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { useState } from 'react';
const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: '',
  country: '',
  jobTitle: '',
  name: '',
  timezone: ''
};




  


const AccountProfile = (props) => {

  const [selectedFile, setSelectedFile] = useState();
    const [name, setName] = useState("");

  const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }
   return(
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 100,
            width: 100
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${user.city} ${user.country}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
         {/* make space */}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
           <br />
          <br />
        
          {/* {`${moment().format('hh:mm A')} ${user.timezone}`} */}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
       <CardActions>
          <form>
       

        <input
          type="file"
          value={selectedFile}
         color="primary"
        />
      </form>
      {/* <Button
        type='file'
        color="primary"
        fullWidth
        variant="text"
        onChange={onSelectFile}
      >
        Upload picture
      </Button> */}
    </CardActions>
  </Card>
);
        };

export default AccountProfile;
