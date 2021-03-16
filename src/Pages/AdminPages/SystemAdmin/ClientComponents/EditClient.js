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
import AlertCard from '../../../../Components/alert-card/alert-card.component'
import { getErrorMessage } from '../../../../Util/helper'

import { editCompany ,getAdminUsers } from "../../../../Network/network"


function EditClient(props) {

  const [companyName, setCompanyName] = useState(props.location.data.name);
  const [companyAddress, setCompanyAddress] = useState(props.location.data.address);
  const [companyId, setCompanyId] = useState(props.location.data.id);
  // const [primaryContact, setPrimaryContact] = useState(props.location.data.pcontact.first_name)
  const [primaryContact, setPrimaryContact] = useState("")
  const [industryType, setIndustryType] = useState(props.location.data.industry)
  const [enrollmentDate, setEnrollmentDate] = useState(props.location.data.startDate)
  const [expiryDate, setExpiryDate] = useState(props.location.data.endDate)
  const [companyData, setCompanyData] = useState([])
  const [loading, setLoading] = useState()
  const [id, setId] = useState(props.location.data.id)
  const [adminUserList, setAdminUserList] = useState([]);
  const [pcontact, setPcontact] = useState(false)

  const [ AlertDetails, setAlertDetails ] = useState({
    open: false,
    type: '',
    title: 'Devices Groups',
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

  const handleEditCompany = async () => {
    console.log("PRIMARYCONTACT:",primaryContact )
    if ( primaryContact === ""){
      setPcontact(true)
    } else {
      try{
        await editCompany(companyName, companyAddress, companyId, primaryContact, industryType, enrollmentDate, expiryDate, id)
      // console.log(response)
      setAlert('success',  'Client Updated Successfully')
      getAdminUsers()
        .then((response) => {
            setAdminUserList(response);
            console.log("USERS:", response)
        })
        .catch(error => {
            console.log(error)
            let message = getErrorMessage(error);
          setAlert('error', message);
        })
        props.history.push({
          pathname: "/admin/clients",
        });
      } catch(error){
        console.log(error);
      let message = getErrorMessage(error);
      setAlert('error', message);
      }
      
    }
    }

    const getPrimaryContactsList = () => {
      getAdminUsers()
        .then((response) => {
            setAdminUserList(response);
            console.log("USERS:", response)
        })
        .catch(error => {
            console.log(error)
            let message = getErrorMessage(error);
          setAlert('error', message);
        })
    };
  

    useEffect(() => {
      console.log(props)
      getPrimaryContactsList()
      setId(props.location.data.id)
      console.log("props:", props)
      setCompanyData(props.location.data)
      // setCompanyName(props.location.data.name)
    
      // setId(props.match.params.id)
      // console.log("props:", props)
      // setUserData(props.location.data);
      // // setId(props.location.data.id)
      // // setId(userData.id) 
      // console.log("setId:", id)
      // console.log(props.location.data);
      // console.log(userData);
      setLoading(false)
    }, [])

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
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={2}
        style={{ padding: 20 }}
      >
        <Grid item container justify="space-between">
          <Grid item>
            <Typography variant="h5">Edit Company</Typography>
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
              <Typography variant="subtitle1">Company Name</Typography>
            </Grid>

            <Grid item xs={9}>
              <TextField
                id="outlined-basic"
                label="Company Name"
                variant="outlined"
                fullWidth
                size="small"
                onChange={(event) => setCompanyName(event.target.value)}
                value={companyName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography variant="subtitle1">Company Address</Typography>
            </Grid>

            <Grid item xs={9}>
              <TextField
                id="outlined-basic"
                label="Company Address"
                variant="outlined"
                fullWidth
                size="small"
                name="address"
                defaultValue={companyAddress}
                autoComplete="address"
                onChange={(event) => setCompanyAddress(event.target.value)}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography variant="subtitle1">Company Id</Typography>
            </Grid>

            <Grid item xs={9}>
              <TextField
                id="outlined-basic"
                label="Corporate Id"
                variant="outlined"
                fullWidth
                size="small"
                onChange={(event) => setCompanyId(event.target.value)}
                defaultValue={companyId}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography variant="subtitle1">Primary Contact</Typography>
            </Grid>

            <Grid item xs={9}>
            <Box py={1}>
              <FormControl
                variant="outlined"
                fullWidth
                size="small"
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Primary Contact
                </InputLabel>
                <Select
                  InputLabelProps={{
                    shrink: true,
                  }}
                  native
                  value={primaryContact}
                  onChange={(e) => {
                    setPrimaryContact(e.target.value);
                  }}
                  label="Age"
                  defaultValue={primaryContact}
                  required
                  error={pcontact}
                >
                  {" "}
                  <option aria-label="None" value="" />
                  {adminUserList.map((name) => (
                    <option value={name.authuser.username}>{name.authuser.username}</option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>

              {/* <Grid item xs={9}>
                <TextField
                  id="outlined-basic"
                  label="Primary Contact"
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={(event) => setPrimaryContact(event.target.value)}
                  defaultValue={primaryContact}
                />
              </Grid> */}

            <Grid item xs={3}>
              <Typography variant="subtitle1">Industry Type</Typography>
            </Grid>

            <Grid item xs={9}>
              <TextField
                id="outlined-basic"
                label="Industry Type"
                variant="outlined"
                fullWidth
                size="small"
                onChange={(event) => setIndustryType(event.target.value)}
                defaultValue={industryType}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography variant="subtitle1">Enrollment Date</Typography>
            </Grid>

            <Grid item xs={9}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                size="small"
                type="date"
                onChange={(event) => setEnrollmentDate(event.target.value)}
                defaultValue={enrollmentDate}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography variant="subtitle1">Expiry Date</Typography>
            </Grid>

            <Grid item xs={9}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                size="small"
                type="date"
                onChange={(event) => setExpiryDate(event.target.value)}
                defaultValue={expiryDate}
              />
            </Grid>

            {pcontact ? (
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

            <Grid item xs={4} style={{ padding: 30 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleEditCompany()}
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

export default withRouter(EditClient)