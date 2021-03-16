import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Divider,
  InputLabel,
  MenuItem,
  FormHelperText,
  TextField,
  FormControl,
  Select,
  Container
} from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import axios from 'axios'

import {
  createMuiTheme,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { ActiveChip } from "../../../Util/theme"
import { InactiveChip } from "../../../Util/theme"

import { tableIcons } from '../../../Util/ui-reference';
import { getClientUsers } from "../../../Network/network";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import EditUser from "./editUsers";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";

import { deleteuser, addAdminUsers } from "../../../Network/network"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";

import AlertCard from '../../../Components/alert-card/alert-card.component'
import { getErrorMessage } from '../../../Util/helper'


const names = [
  'Shyna Default Group',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
    padding: "15px 0",
    color: "white",
    display: "block",
    textAlign: "center",
    backgroundColor: `rgb(67,176,42)`,
    "&:hover": {
      backgroundColor: `rgb(67,176,42)`,
    },
  },
}));

  function ClientUsers(props) {

    const [AddFlag, setAddFlag] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [adminUserList, setAdminUserList] = useState([]);
  const [clientUserList, setClientUserList] = useState([]);

  const [userId, setUserId] = useState()
  const [userType, setUserType] = useState("")
  const [subroleName, setSubroleName ] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [reTypePassword, setReTypePassword] = useState("")
  const [primaryPhone, setPrimaryPhone] = useState("")
  const [secondaryPhone, setSecondaryPhone] = useState("")
  const [officeLocation, setOfficeLocation] = useState("")
  const [status, setStatus] = useState("")
  const [IncompleteAlertMessage, setIncompleteAlertMessage] = useState(false);
  const [passwordMatchCheck,setPasswordMatchCheck] = useState(false)
  const [emailValidate, setEmailValidate] = useState(false)
  const [clientData, setClientData] = useState([])
  const [userData, setUserData] = useState([])
  const [companyId, setCompanyId] = useState("")
  const [companyName, setCompanyName] = useState("")

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
  
  const onAddUserClick = () => {
    setAddFlag(!AddFlag)
    console.log("CLIENT_DATA:", clientData.name)
    setCompanyName(clientData.name)
    console.log("USER_DATA:", userData.company)
    setCompanyId(userData.company)
  }

  // const handleDeleteUser = async(id) => {
  //   try{
  //     let response = await deleteuser(id);
  //     // this.setState({isLoading: true})
  //     getClientUsers()
  // }catch(error){
  //     console.log(error)
  // }
  // }

  const addAdminUsers = async () => {
    let token = sessionStorage.getItem('token'),
      apiEndPoint = 'http://13.126.229.55:8000/account/register_ajax/';

    var FormData = require('form-data');
    var formdata = new FormData();

    formdata.append("rolename", userType);
    formdata.append("subrolename", "NA");
    formdata.append("client_name", companyName);
    formdata.append("username", username);
    formdata.append("first_name", firstName);
    formdata.append("last_name", lastName);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("password2", reTypePassword);
    formdata.append("user", username);
    formdata.append("payment_info", "Done");
    formdata.append("photo", "1");
    formdata.append("stats", "1");
    formdata.append("company", companyId);
    formdata.append("package", "1");
    formdata.append("wallet", "1");
    formdata.append("code", "");
    formdata.append("phone1", primaryPhone);
    formdata.append("phone2", secondaryPhone);
    // formdata.append("officeLoc", officeLocation);

    var config = {
      method: 'post',
      url: apiEndPoint,
      headers: {
        'Authorization': 'Token ' + token
      },
      data: formdata
    };
    let response = await axios(config);
    response = response.data;
    return response;
  }

  const handleAddUser = async () => {
    console.log("FUCNTION STARTS")
    if ( 
      userType !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      username !== "" &&
      email !== "" &&
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) &&
      password !== "" &&
      reTypePassword !== "" &&
      primaryPhone !== "" &&
      secondaryPhone !== "" &&
      // officeLocation !== "" &&
      password === reTypePassword
    ){
      try{
        await addAdminUsers(userType, firstName, lastName, username, email, password, reTypePassword, primaryPhone, secondaryPhone,officeLocation, status, subroleName)
      setAlert('success',  'User Added Successfully')
      setIsLoading(true);
      getClientUsers()
      .then((response) => {
          // console.log(response);
          setClientUserList(response);
          setIsLoading(false);
          console.log("USERS:", response)
      })
      .catch(error => {
        console.log(error)
        let message = getErrorMessage(error);
        setAlert('error', message);
      })
            setAddFlag(!AddFlag)
      }catch(error){

        if(error.response.data.email){
          setAlert('error', "Email exists!");
        }
        else if(error.response.data.username){
          setAlert('error', "Username exists!");
        } else {
          let message = getErrorMessage(error);
          setAlert('error', message);
        }
      }
      
    } else {
      setIncompleteAlertMessage(true);
      if(password !== reTypePassword) {
        setPasswordMatchCheck(true)
      } 
      if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
        setEmailValidate(true)
      }
    }
    
  }

  const handleDeleteUser = async(id) => {
    try{
      let response = await deleteuser(id);
      setAlert('success',  'User Deleted Successfully')
      setIsLoading(true);
      getClientUsers()
            .then((response) => {
                console.log(response);
                setClientUserList(response);
                setIsLoading(false);
            })
            .catch(error => {
              console.log(error)
              let message = getErrorMessage(error);
              setAlert('error', message);
            })
        // if(respons
  }catch(error){
    console.log(error)
    let message = getErrorMessage(error);
    setAlert('error', message);
  }
  }

  const handleEditClick = (rowData) => {
    console.log(props)
    console.log(rowData)
    props.history.push({
      pathname: "users/editUsers/" + `${rowData.id}`,
      data: rowData
    });
  };


  useEffect(() => {
    console.log("SESSION_STORAGE:", sessionStorage);
    console.log("Session Storage Client:", JSON.parse(sessionStorage.client))
    console.log("Session Storage User:", JSON.parse(sessionStorage.user))
    setClientData(JSON.parse(sessionStorage.client))
    setUserData(JSON.parse(sessionStorage.user))
    if(isLoading){
        getClientUsers()
        .then((response) => {
            // console.log(response);
            setClientUserList(response);
            setIsLoading(false);
            console.log("USERS:", response)
        })
        .catch(error => {
          console.log(error)
          let message = getErrorMessage(error);
          setAlert('error', message);
        })

    }
    
}, [])

  return (
    <Router>
    <Switch>
        <Route exact path="/client/users/editUsers">
              <Container>
                <EditUser />
              </Container>
        </Route>

        <Route exact path="/client/users">
              <Container>
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
            List Users
      </Typography>
        </Grid>

        <Grid item>
          <Button 
          onClick={onAddUserClick}
          variant='contained' 
          color='primary'>
            {!AddFlag? 'Add New User' : 'Back to User Clients'}
      </Button>
        </Grid>
      </Grid>
        
        <Grid item xs={12}>
          <Divider />
        </Grid>

        {AddFlag ? 
        (<>
            <Grid item xs={3}>
            <Typography variant='subtitle1'>
              User Type
        </Typography>
          </Grid>
  
          <Grid item xs={9}>
            <FormControl variant="outlined" fullWidth size='small'>
              <InputLabel id="demo-simple-select-outlined-label">User Type</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // value={age}
                // onChange={set}
                label="Age"
                onChange={(event)=> setUserType(event.target.value)}
              >
                <MenuItem value={"ClientUser"}>Analyst</MenuItem>
              </Select>
            </FormControl>
          </Grid>
  
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
              onChange = {(event)=> setFirstName(event.target.value)}

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
              onChange = {(event)=> setLastName(event.target.value)}

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
              label="Username"
              variant="outlined" 
              fullWidth
              size='small'
              onChange = {(event)=> setUsername(event.target.value)}

              />
          </Grid>
  
          <Grid item xs={3}>
            <Typography variant='subtitle1'>
              Primary Phone 
        </Typography>
          </Grid>
  
          <Grid item xs={9}>
            <TextField
              id="outlined-basic"
              label="Primary Phone"
              variant="outlined" 
              fullWidth
              size='small'
              onChange = {(event)=> setPrimaryPhone(event.target.value)}

              />
          </Grid>
  
          <Grid item xs={3}>
            <Typography variant='subtitle1'>
              Secondary Phone 
        </Typography>
          </Grid>
  
          <Grid item xs={9}>
            <TextField
              id="outlined-basic"
              label="Secondary Phone"
              variant="outlined" 
              fullWidth
              size='small'
              onChange = {(event)=> setSecondaryPhone(event.target.value)}

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
              onChange = {(event)=> setEmail(event.target.value)}
              helperText={emailValidate? 'Incorrect email format!': <div/>}
              />
          </Grid>
  
          {/* <Grid item xs={3}>
            <Typography variant='subtitle1'>
              Device Groups
        </Typography>
          </Grid>
  
          <Grid item xs={9}>
          <FormControl fullWidth variant='outlined' size='small'> 
          <InputLabel shrink htmlFor="select-multiple-native">
          </InputLabel>
          <Select
            multiple
            native
            // value={personName}
            // onChange={handleChangeMultiple}
            inputProps={{
              id: 'select-multiple-native',
            }}
          >
            {names.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </FormControl>
          </Grid> */}
  
          <Grid item xs={3}>
            <Typography variant='subtitle1'>
              Password
        </Typography>
          </Grid>
  
          <Grid item xs={9}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined" 
              fullWidth
              size='small'
              error={passwordMatchCheck}
              onChange = {(event)=> setPassword(event.target.value)}
              type="password"
              />
          </Grid>
  
          <Grid item xs={3}>
            <Typography variant='subtitle1'>
              Re-Type Password
        </Typography>
          </Grid>
  
          <Grid item xs={9}>
            <TextField
              id="outlined-basic"
              label="Password2"
              variant="outlined" 
              fullWidth
              size='small'
              error={passwordMatchCheck}
              onChange = {(event)=> setReTypePassword(event.target.value)}
              helperText = {passwordMatchCheck ? 'Passwords do not match!' : <div/>}
              type="password"
              />
          </Grid>
  
          {/* <Grid item xs={3}>
            <Typography variant='subtitle1'>
              Status
        </Typography>
          </Grid>
  
          <Grid item xs={9}>
            <FormControl variant="outlined" fullWidth size='small'>
              <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // value={age}
                // onChange={handleChange}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Enable</MenuItem>
                <MenuItem value={20}>Disable</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}

{IncompleteAlertMessage ? (
          <>
            <Grid item container justify="center" alignItems="center" spacing={2}>
              <Grid item>
                <ReportProblemIcon style={{ color: "#f44336" }} />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" style={{ color: "#f44336" }}>
                  Please fill valid data in all fields!
                </Typography>
              </Grid>
            </Grid>
          </>
        ) : (
          <div />
        )}
  
          <Grid item xs={4} style={{padding: 30}}>
            <Button 
            variant='contained' 
            color='primary' 
            fullWidth
            onClick={()=> handleAddUser()}
            >
              Create Account
            </Button>
          </Grid>
          </>): 
        (<>
          <Grid item xs={12}>
          <MaterialTable
          isLoading={isLoading}
          icons={tableIcons}
      title="All Users"
      columns={[
        // { title: 'User Id', field: 'id' },
        { title: 'First Name', field: 'authuser.first_name' },
        { title: 'Last Name', field: 'authuser.last_name' },
        { title: 'Phone1', field: 'phone1' },
        { title: 'Phone2', field: 'phone2' },
        { title: 'Email', field: 'authuser.email' },
        { title: 'Role', field: 'rolename' },
        { title: 'Username', field: 'authuser.username' },
        // { title: 'Groups', field: 'surname' },
      ]}
      data={clientUserList}        
      options={{
        search: true,
        actionsColumnIndex: -1,
        loadingType: 'linear',
        headerStyle: {
          backgroundColor: '#263238',
          color: '#FFF'
        },
        rowStyle: {
          backgroundColor: '#EEE',
        }
      }}

      actions={[

        {
          icon: () => <EditIcon />,
          tooltip: 'Edit',
          onClick: (event,rowData) => {
              handleEditClick(rowData);
          },
        },
      {
        icon: () => <DeleteIcon />,
        tooltip: 'Delete',
        onClick: (event,rowData) => {
          handleDeleteUser(rowData.id)
        },
    },
    ]}
    />
          </Grid>
        </>)}

        {/* <Grid item>
          <EditUser />
        </Grid> */}

      </Grid>    
    </div>
              </Container>
        </Route>
    </Switch>
    </Router>
  );
}

export default withRouter(ClientUsers)