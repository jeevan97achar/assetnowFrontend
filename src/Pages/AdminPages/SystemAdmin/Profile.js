import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
} from '@material-ui/core';

import { userProfile, changePassword } from "../../../Network/network"
import AlertCard from '../../../Components/alert-card/alert-card.component'
import { getErrorMessage } from '../../../Util/helper'


export default function Profile() {

  const [UserDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rolename, setRoleName] = useState()
  const [subRoleName, setSubRoleName] = useState()
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [dob, setDob] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(true);
  const [passwordMatchCheck, setPasswordMatchCheck] = useState(false)

  const [ AlertDetails, setAlertDetails ] = useState({
    open: false,
    type: '',
    title: '',
    message: ''
  })

  const setAlert = (type, message) => {
    setAlertDetails({
      ...AlertDetails,
      open: true,
      type: type,
      message: message
    })
  }

  const closeAlert = () => {
    setAlertDetails({
      ...AlertDetails,
      open: false,
    })
  }

  const handleProfileSubmit = async () => {
    if(password1 === password2){
      try{
        await changePassword(password1, password2, firstName, lastName, username, email, dob)
        setPassword1("")
        setPassword2("")
        setAlert('success',  'User Added Successfully')
      }
      catch(error){
        console.log(error)
        let message = getErrorMessage(error);
          setAlert('error', message);
      }
    } else {
      setPasswordMatchCheck(true)
    }
    
  }

  useEffect(() => {
    if(isLoading){
      let user = JSON.parse(sessionStorage.getItem('user'));
    userProfile()
        .then((response) => {
            setUserDetails(response[0]);
            setFirstName(response[0].user.first_name)
            setLastName(response[0].user.last_name)
            setUsername(response[0].user.username)
            setRoleName(response[0].rolename)
            setSubRoleName(response[0].subrolename)
            setEmail(response[0].user.email)
            setDob(response[0].date_of_birth)
            setLoading(false);
            console.log('RESPONSE:', response)
        })
        .catch(error => {
            console.log(error)
        let message = getErrorMessage(error);
          setAlert('error', message);
        })
    }
}, []);

// console.log("UserDetails:",UserDetails)

  return (
    <div>
      {AlertDetails.open && (
        <AlertCard 
          type={AlertDetails.type}
          title={AlertDetails.title}
          message={AlertDetails.message}
          onClose={closeAlert}
        />
      )}
      <Grid container justify='center' alignItems='center' spacing={2} style={{ padding: 20 }}>

      <Grid item container justify='space-between'>
      <Grid item>
          <Typography variant='h5'>
            My Profile
      </Typography>
        </Grid>

      </Grid>
        
        <Grid item xs={12}>
          <Divider />
        </Grid>

        {loading ? (
          <p>Loading....</p>
        ) : (
          <>
             <Grid item xs={3}>
          <Typography variant='subtitle1'>
            First Name
      </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined" 
            fullWidth
            size='small'
            value={UserDetails.user.first_name}
            onChange={(event)=> setFirstName(event.target.value)}
            InputProps={{
              readOnly: true,
            }}
            />
        </Grid>

        <Grid item xs={3}>
          <Typography variant='subtitle1'>
            Last Name
      </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined" 
            fullWidth
            size='small'
            onChange={(event)=> setLastName(event.target.value)}
            value={UserDetails.user.last_name}
            InputProps={{
              readOnly: true,
            }}
            />
        </Grid>

        <Grid item xs={3}>
          <Typography variant='subtitle1'>
            User Name
      </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined" 
            fullWidth
            size='small'
            onChange={(event)=> setUsername(event.target.value)}
            value={UserDetails.user.username}
            InputProps={{
              readOnly: true,
            }}
            />
        </Grid>

        <Grid item xs={3}>
          <Typography variant='subtitle1'>
            Role Name
      </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Role Name"
            variant="outlined" 
            fullWidth
            size='small'
            onChange={(event)=> setRoleName(event.target.value)}
            value={UserDetails.rolename}
            InputProps={{
              readOnly: true,
            }}
            />
        </Grid>

        <Grid item xs={3}>
          <Typography variant='subtitle1'>
            Sub-Role Name
      </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Sub-Role Name"
            variant="outlined" 
            fullWidth
            size='small'
            value={UserDetails.subrolename}
            onChange={(event)=> setSubRoleName(event.target.value)}
            InputProps={{
              readOnly: true,
            }}
            />
        </Grid>

        <Grid item xs={3}>
          <Typography variant='subtitle1'>
            Email
      </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined" 
            fullWidth
            size='small'
            value={UserDetails.user.email}
            onChange={(event)=> setEmail(event.target.value)}
            InputProps={{
              readOnly: true,
            }}
            />
        </Grid>

        <Grid item xs={3}>
          <Typography variant='subtitle1'>
            Date of Birth
      </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            variant="outlined" 
            fullWidth
            size='small'
            type='date'
            onChange={(event)=> setDob(event.target.value)}
            value={UserDetails.date_of_birth}
            InputProps={{
              readOnly: true,
            }}
            />
        </Grid>

        <Grid item xs={3}>
          <Typography variant='subtitle1'>
            Date Joined
      </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            variant="outlined" 
            fullWidth
            size='small'
            type='date'
            InputProps={{
              readOnly: true,
            }}
            />
            
        </Grid>

        <Grid item xs={3}>
          <Typography variant='subtitle1'>
            Last Login
      </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            variant="outlined" 
            fullWidth
            size='small'
            type='date'
            InputProps={{
              readOnly: true,
            }}
            />
        </Grid>

        <Grid item xs={3}>
          <Typography variant='subtitle1'>
            Company
      </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Company"
            variant="outlined" 
            fullWidth
            size='small'
            value={UserDetails.company}
            InputProps={{
              readOnly: true,
            }}
            />
        </Grid>

        <Grid item xs={3}>
          <Typography variant='subtitle1'>
            New Password
      </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="New Password"
            variant="outlined" 
            fullWidth
            size='small'
            type='password'
            onChange={(event)=> setPassword1(event.target.value)}
            error={passwordMatchCheck}
            />
        </Grid>

        <Grid item xs={3}>
          <Typography variant='subtitle1'>
            Confirm Password
      </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined" 
            fullWidth
            size='small'
            type='password'
            onChange={(event)=> setPassword2(event.target.value)}
            error={passwordMatchCheck}
            helperText={passwordMatchCheck ? "Passwords do not Match!": <div/>}
            />
        </Grid>

        <Grid item xs={4} style={{padding: 30}}>
          <Button 
          variant='contained' 
          color='primary' 
          fullWidth 
          onClick={()=> handleProfileSubmit()}
          >
            Save Changes
          </Button>
        </Grid>
          </>
        )}

      </Grid>    
    </div>
  );
}
