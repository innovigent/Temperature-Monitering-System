import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
// import 'Customerlist.css';



const CustomerListToolbar = (props) => (
  <Box {...props}>
    
   
    <Box sx={{ mt: 3 }}>
     
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                      
                      
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search customer"
              variant="outlined"
            />
           
          </Box>
          {/* <Box
      sx={{
        // display: 'flex',
        // justifyContent: ' start'
              mt: 1,
        ml:130
      }}
    > */}
   
   
      <Button color="success"  variant="contained" sx={{ mx: 2 ,ml:130}}>
         Add customer
          </Button>
             <Button color="primary"  variant="contained" sx={{mx:2}}>
         Edit customer
      </Button>
      <Button
        color="error"
        variant="contained"
      >
        delete customer
      </Button>
     
    {/* </Box> */}
         
        </CardContent>
      </Card>
      
    </Box>
  </Box>
);

export default CustomerListToolbar;
