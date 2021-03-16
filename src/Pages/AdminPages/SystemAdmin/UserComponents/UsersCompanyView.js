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

import {
  createMuiTheme,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { ActiveChip } from "../../../Util/theme"
import { InactiveChip } from "../../../Util/theme"

import { tableIcons } from '../../../Util/ui-reference';
import { getAdminUsers } from "../../../Network/network";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import EditUser from "./UserComponents/EditUser";

import { deleteuser, addAdminUsers} from "../../../Network/network"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


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

function UsersCompanyView(props) {

  const [AddFlag, setAddFlag] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [adminUserList, setAdminUserList] = useState([]);

  const [userId, setUserId] = useState()
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

  const onAddUserClick = (props) => {
    setAddFlag(!AddFlag)
  }

  const handleDeleteUser = async(id) => {
    try{
      let response = await deleteuser(id);
      setIsLoading(true);
        getAdminUsers()
            .then((response) => {
                console.log(response);
                setAdminUserList(response);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error)
            })
        // if(respons
  }catch(error){
      console.log(error)
  }
  }

  const handleAddUser = () => {
    addAdminUsers(userType, firstName, lastName, username, email, password, reTypePassword, primaryPhone, secondaryPhone,officeLocation, status)
    setIsLoading(true);
        getAdminUsers()
            .then((response) => {
                console.log(response);
                setAdminUserList(response);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error)
            })
            setAddFlag(!AddFlag)
  }

  const handleEditClick = (rowData) => {
    props.history.push({
      pathname: "users/editUser/" + `${rowData.id}`,
      data: rowData
    });
  };

  const handleManageClientsClick = (rowData) => {
    props.history.push({
      pathname: "users/manageClients/" + `${rowData.id}`,
    });
  };

  useEffect(() => {
    if(isLoading){
        getAdminUsers()
        .then((response) => {
            setAdminUserList(response);
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error)
        })
    }
    
})

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
      <Grid container justify='center' alignItems='center' spacing={2} style={{ padding: 20 }}>

      <Grid item container justify='space-between'>
      <Grid item>
          <Typography variant='h5'>
            Ontrac Users
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
          <FormControl 
          variant="outlined" 
          fullWidth size='small'
          onChange = {(event)=> setUserType(event.target.value)}
          >
            <InputLabel id="demo-simple-select-outlined-label">User Type</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outli  ned"
              // value={age}
              onChange={(event)=> setUserType(event.target.value)}
              label="Age"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value={"ClientAdmin"}>Client Admin</MenuItem>
              <MenuItem value={"OntracUser"}>Ontrac User</MenuItem>
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
            label="First Name"
            variant="outlined" 
            fullWidth
            size='small'
            onChange = {(event)=> setUsername(event.target.value)}

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

            />
        </Grid>       

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
            onChange = {(event)=> setPassword(event.target.value)}

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
            onChange = {(event)=> setReTypePassword(event.target.value)}

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
            Office Location 
      </Typography>
        </Grid>


        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Office Location"
            variant="outlined" 
            fullWidth
            size='small'
            onChange = {(event)=> setOfficeLocation(event.target.value)}

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
          onChange = {(event)=> setStatus(event.target.value)}

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
          defaultSort="desc"
      title="All Users"
      columns={[
        { title: 'Username', field: 'authuser.username' },
        { title: 'First Name', field: 'authuser.first_name' },
        { title: 'Last Name', field: 'authuser.last_name' },
        { title: 'Office Location', field: 'officeLoc' },
        { title: 'Email', field: 'authuser.email' },
        { title: 'Date Joined'
        ,render: rowData => moment.utc(rowData['authuser.date_joined']).format("MMM DD YYYY, hh:mm A") },
        { title: 'Last Login'
        ,render: rowData => moment.utc(rowData['authuser.last_login']).format("MMM DD YYYY, hh:mm A") },
        { title: '#Clients', field: 'company.stats.client_count' },
        { title: '#Devices', field: 'company.stats.device_count' },
        {
          title: "Status",
          field: "authuser.is_active",
          render: (rowData) =>
            rowData["authuser.is_active"] 
            // true
            ? (
              <InactiveChip label="Inactive" />
            ) : (
              <ActiveChip label="Active" />
            ),
        },
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

        {
            icon: () => <PersonIcon />,
            tooltip: 'Preview POI',
            onClick: (event,rowData) => {
                handleManageClientsClick(rowData);
            },
        },

        {
          // icon: () => <Link to="/admin/users/editUser" style={{textDecoration: "none", color: '#263238'}}><EditIcon /></Link>,
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

export default withRouter(UsersCompanyView)