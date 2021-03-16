import React, { useState, useEffect } from "react";
import {withRouter} from "react-router"
import {
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
} from '@material-ui/core';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";


import { editUser } from "../../../../Network/network"
// import EditUser from "./UserComponents/EditUser";


function EditUser(props) {

    const [id, setId] = useState(props.location.data.id);
    const [username, setUsername] = useState(props.location.data.authuser.username);
    const [firstName, setFirstName] = useState(props.location.data.authuser.first_name);
    const [lastName, setLastName] = useState(props.location.data.authuser.last_name);
    const [email, setEmail] = useState(props.location.data.authuser.email);
    const [primaryPhone, setPrimaryPhone] = useState(props.location.data.phone1);
    const [secondaryPhone, setSecondaryPhone] = useState(props.location.data.phone2);
    const [roleName, setRoleName] = useState(props.location.data.rolename);
    const [subRoleName, setSubRoleName] = useState(props.location.data.subrolename);
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false)

  const handleEditUser = async () => {
      let response = await editUser(id, username, firstName, lastName, email, primaryPhone, secondaryPhone, roleName, subRoleName)
      console.log("RESPONSE:", response)
      if (response.status === 200){
        props.history.push({
          pathname: "/admin/clients/details/" + props.match.params.id,
        });
      }
    }
  

  return (
    <div>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={2}
        style={{ padding: 20 }}
      >
        <Grid item container justify="space-between">
          <Grid item>
            <Typography variant="h5">Edit User</Typography>
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
              <Typography variant="subtitle1">Username</Typography>
            </Grid>

            <Grid item xs={9}>
            <TextField
                    autoComplete="uname"
                    name="userName"
                    variant="outlined"
                    defaultValue={username}
                    required
                    fullWidth
                    id="userName"
                    label="Username"
                    autoFocus
                    onChange={(event) => setUsername(event.target.value)}
                  />
            </Grid>

            <Grid item xs={3}>
              <Typography variant="subtitle1">First Name</Typography>
            </Grid>

            <Grid item xs={9}>
            <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    defaultValue={firstName}
                    autoFocus
                    onChange={(event) => setFirstName(event.target.value)}
                  />
            </Grid>

            <Grid item xs={3}>
              <Typography variant="subtitle1">Last Name</Typography>
            </Grid>

            <Grid item xs={9}>
            <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    defaultValue={lastName}
                    autoComplete="lname"
                    onChange={(event) => setLastName(event.target.value)}
                  />
            </Grid>

            <Grid item xs={3}>
              <Typography variant="subtitle1">Email</Typography>
            </Grid>

            <Grid item xs={9}>
            <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(event) => setEmail(event.target.value)}
                    defaultValue={email}
                  />
            </Grid>

            <Grid item xs={3}>
              <Typography variant="subtitle1">Primary Phone</Typography>
            </Grid>

            <Grid item xs={9}>
            <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="pphone"
                    label="Primary Phone Number"
                    type="number"
                    id="password"
                    autoComplete="current-password"
                    onChange={(event) => setPrimaryPhone(event.target.value)}
                    defaultValue={primaryPhone}
                  />
            </Grid>

            <Grid item xs={3}>
              <Typography variant="subtitle1">Secondary Phone</Typography>
            </Grid>

            <Grid item xs={9}>
            <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="sphone"
                    label="Seconday Phone Number"
                    type="number"
                    id="seccondaryNumber"
                    autoComplete="current-password"
                    onChange={(event) => setSecondaryPhone(event.target.value)}
                    defaultValue={secondaryPhone}
                  />
            </Grid>


            <Grid item xs={4} style={{ padding: 30 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleEditUser()}
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

export default withRouter(EditUser)