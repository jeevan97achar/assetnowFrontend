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
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table"
import moment from 'moment';
import axios from 'axios'
import {
  createMuiTheme,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { ActiveChip } from "../../../Util/theme"
import { InactiveChip } from "../../../Util/theme"

import { tableIcons } from '../../../Util/ui-reference';
import { getCompanyUsers } from "../../../Network/network";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import EditUser from "./UserComponents/EditUser";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";

import { deleteuser, addAdminUsers } from "../../../Network/network"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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

function CompanyUsers(props) {

  const [AddFlag, setAddFlag] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [adminUserList, setAdminUserList] = useState([]);

  const [userId, setUserId] = useState()
  const [companyId, setCompanyId] = useState(props.match.params.id)
  const [userType, setUserType] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [reTypePassword, setReTypePassword] = useState()
  const [primaryPhone, setPrimaryPhone] = useState()
  const [secondaryPhone, setSecondaryPhone] = useState()
  const [officeLocation, setOfficeLocation] = useState()
  const [status, setStatus] = useState()
  const [IncompleteAlertMessage, setIncompleteAlertMessage] = useState(false);
  const [passwordMatchCheck, setPasswordMatchCheck] = useState(false)
  const [emailValidate, setEmailValidate] = useState(false)
  const [emailorPassworderror, setEmailorPasswordError] = useState(false)

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

  const onAddUserClick = (props) => {
    setAddFlag(!AddFlag)
    setEmailorPasswordError(false)
    setIncompleteAlertMessage(false)
    setPasswordMatchCheck(false)
    setEmailValidate(false)
  }

  const handleDeleteUser = async (id) => {
    try {
      let response = await deleteuser(id);
      setAlert('success',  'User Deleted Successfully')
      setIsLoading(true);
      getCompanyUsers()
        .then((response) => {
          console.log(response);
          setAdminUserList(response);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error)
          let message = getErrorMessage(error);
          setAlert('error', message);
        })
      // if(respons
    } catch (error) {
      console.log(error)
          let message = getErrorMessage(error);
          setAlert('error', message);
    }
  }

  const addAdminUsers = async () => {
    let token = sessionStorage.getItem('token'),
      apiEndPoint = 'http://13.126.229.55:8000/account/register_ajax/';

    var FormData = require('form-data');
    var formdata = new FormData();

    formdata.append("rolename", userType);
    formdata.append("subrolename", "NA");
    formdata.append("client_name", "");
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
    formdata.append("company", props.match.params.id);
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
    // response = response.data;
    return response;
  }

  const handleAddUser = async () => {
    if (
      userType !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      username !== "" &&
      email !== "" &&
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) &&
      // /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      password !== "" &&
      reTypePassword !== "" &&
      primaryPhone !== "" &&
      secondaryPhone !== "" &&
      officeLocation !== "" &&
      password === reTypePassword
    ) {
      try{
        await addAdminUsers()
        setAlert('success',  'User Added Successfully')
        setIsLoading(true);
        getCompanyUsers()
          .then((response) => {
            setAdminUserList(response);
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
      if (password !== reTypePassword) {
        setPasswordMatchCheck(true)
      }
      if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
        setEmailValidate(true)
      }
      // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      //   setEmailValidate(true)
      // }
    }

  }

  const handleEditClick = (rowData) => {
    props.history.push({
      pathname: "companyUsers/editCompanyUsers/" + `${rowData.id}`,
      // pathname: "companyUsers/editCompanyUsers/",
      data: rowData,
      companyData: props.match.params.id
    });
  };

  //   const handleManageClientsClick = (rowData) => {
  //     props.history.push({
  //       pathname: "users/manageClients/" + `${rowData.id}`,
  //       data: rowData
  //     });
  //   };

  const getCompanyUsers = async () => {
    try{
      let user = JSON.parse(sessionStorage.getItem('user'));
    let userType = sessionStorage.getItem('username');
    // let username = sessionStorage.getItem('')

    let apiEndPoint = 'http://13.126.229.55:8000/webapi/companyusers';
    let token = sessionStorage.getItem('token');

    let config = {
      headers: { Authorization: `Token ${token}` },
      params: {
        company_id: props.match.params.id
      }
    }

    let response = await axios.get(apiEndPoint, config);
    response = response.data;
    return response;
    }catch(error){
      console.log(error)
          let message = getErrorMessage(error);
          setAlert('error', message);
    }
  }

  useEffect(() => {
    console.log("COMPANY_ID:", props.match.params.id)
    if (isLoading) {
      getCompanyUsers()
        .then((response) => {
          setAdminUserList(response);
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
        <Route exact path="/admin/users/edituser">
          <Container>
            <EditUser />
          </Container>
        </Route>

        <Route exact path={["/admin/users", "/admin/clients/details/:id"]}>
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
                      Client Users
      </Typography>
                  </Grid>

                  <Grid item>
                    <Button
                      onClick={onAddUserClick}
                      variant='contained'
                      color='primary'>
                      {!AddFlag ? 'Add New User' : 'Back to User Clients'}
                    </Button>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                {AddFlag ?
                  (<>

                    <Grid item xs={12}>
                      <Typography variant='body2' style={{ color: '#757575' }}>
                        All fields are mandatory!
                      </Typography>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography variant='subtitle1'>
                        User Type
      </Typography>
                    </Grid>

                    <Grid item xs={9}>
                      <FormControl
                        variant="outlined"
                        fullWidth size='small'
                        onChange={(event) => setUserType(event.target.value)}
                        required
                      >
                        <InputLabel id="demo-simple-select-outlined-label">User Type</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outli  ned"
                          // value={age}
                          onChange={(event) => setUserType(event.target.value)}
                          label="Age"
                        >
                          <MenuItem value=""><em>None</em></MenuItem>
                          <MenuItem value={"ClientAdmin"}>Admin</MenuItem>
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
                        required
                        onChange={(event) => setFirstName(event.target.value)}
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
                        required
                        onChange={(event) => setLastName(event.target.value)}

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
                        required
                        onChange={(event) => setUsername(event.target.value)}

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
                        required
                        error={emailValidate}
                        onChange={(event) => setEmail(event.target.value)}
                        helperText={emailValidate ? 'Incorrect email format!' : <div />}
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <Typography variant='subtitle1'>
                        Password
      </Typography>
                    </Grid>

                    <Grid item xs={9}>
                      <TextField
                        type='password'
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        size='small'
                        required
                        error={passwordMatchCheck}
                        onChange={(event) => setPassword(event.target.value)}

                      />
                    </Grid>

                    <Grid item xs={3}>
                      <Typography variant='subtitle1'>
                        Re-Type Password
      </Typography>
                    </Grid>

                    <Grid item xs={9}>
                      <TextField
                        type='password'
                        id="outlined-basic"
                        label="Password2"
                        variant="outlined"
                        fullWidth
                        required
                        error={passwordMatchCheck}
                        size='small'
                        onChange={(event) => setReTypePassword(event.target.value)}
                        helperText={passwordMatchCheck ? 'Passwords do not match!' : <div />}
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
                        required
                        size='small'
                        onChange={(event) => setPrimaryPhone(event.target.value)}

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
                        required
                        size='small'
                        onChange={(event) => setSecondaryPhone(event.target.value)}

                      />
                    </Grid>

                    <Grid item xs={3}>
                      <Typography variant='subtitle1'>
                        Office Location
      </Typography>
                    </Grid>


                    <Grid item xs={9}>
                      <TextField
                        id="outlined-basic"
                        label="Office Location"
                        variant="outlined"
                        fullWidth
                        required
                        size='small'
                        onChange={(event) => setOfficeLocation(event.target.value)}

                      />
                    </Grid>

                    <Grid item xs={3}>
                      <Typography variant='subtitle1'>
                        Status
      </Typography>
                    </Grid>

                    <Grid item xs={9}>
                      <FormControl
                        variant="outlined"
                        fullWidth size='small'
                        onChange={(event) => setStatus(event.target.value)}
                        required
                      >
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
                          <MenuItem value={"Enable"}>Enable</MenuItem>
                          <MenuItem value={"Disable"}>Disable</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

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
                    {emailorPassworderror ? (
                      <>
                        <Grid item container justify="center" alignItems="center" spacing={2}>
                          <Grid item>
                            <ReportProblemIcon style={{ color: "#f44336" }} />
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" style={{ color: "#f44336" }}>
                              Password or email already exists!
                </Typography>
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                        <div />
                      )}

                    <Grid item xs={4} style={{ padding: 30 }}>
                      <Button
                        variant='contained'
                        color='primary'
                        fullWidth
                        onClick={() => handleAddUser()}
                      >
                        Create Account
          </Button>
                    </Grid>
                  </>) :
                  (<>
                    <Grid item xs={12}>
                      <MaterialTable
                        isLoading={isLoading}
                        icons={tableIcons}
                        defaultSort="desc"
                        title="Client Users"
                        columns={[
                          // { title: 'User ID', field: 'code' },
                          { title: 'Username', field: 'user.username' },
                          { title: 'First Name', field: 'user.first_name' },
                          { title: 'Last Name', field: 'user.last_name' },
                          // { title: 'Office Location', field: 'officeLoc'},
                          // { title: 'Office Location', field: 'officeLoc' },
                          { title: 'Email', field: 'user.email' },
                          { title: "User Type:", field: 'rolename' },
                          { title: 'Phone', field: 'phone1' },
                          // { title: 'Date Joined'
                          // ,render: rowData => moment.utc(rowData['authuser.date_joined']).format("MMM DD YYYY, hh:mm A") },
                          // { title: 'Last Login'
                          // ,render: rowData => moment.utc(rowData['authuser.last_login']).format("MMM DD YYYY, hh:mm A") },
                          // { title: '#Clients', field: 'company.stats.client_count' },
                          // { title: '#Devices', field: 'company.stats.device_count' },
                          // {
                          //   title: "Status",
                          //   field: "authuser.is_active",
                          //   render: (rowData) =>
                          //     rowData["authuser.is_active"] 
                          //     // true
                          //     ? (
                          //       <InactiveChip label="Inactive" />
                          //     ) : (
                          //       <ActiveChip label="Active" />
                          //     ),
                          // },
                        ]}
                        data={adminUserList}
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

                          // {
                          //     icon: () => <PersonIcon />,
                          //     tooltip: 'Manage Clients',
                          //     onClick: (event,rowData) => {
                          //         handleManageClientsClick(rowData);
                          //     },
                          // },

                          {
                            // icon: () => <Link to="/admin/users/editUser" style={{textDecoration: "none", color: '#263238'}}><EditIcon /></Link>,
                            icon: () => <EditIcon />,
                            tooltip: 'Edit',
                            onClick: (event, rowData) => {
                              handleEditClick(rowData);
                            },
                          },
                          {
                            icon: () => <DeleteIcon />,
                            tooltip: 'Delete',
                            onClick: (event, rowData) => {
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

export default withRouter(CompanyUsers)