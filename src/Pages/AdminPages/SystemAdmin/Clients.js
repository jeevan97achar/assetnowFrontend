import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
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
  Select
} from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import DeleteIcon from "@material-ui/icons/Delete";


import {
  createMuiTheme,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

import { tableIcons } from '../../../Util/ui-reference';
import { getClients, addCompany, deleteCompany } from "../../../Network/network";

import NewPayment from './ClientComponents/NewPayment'

import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EditIcon from '@material-ui/icons/Edit';
import MenuIcon from '@material-ui/icons/Menu';
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

function Clients(props) {

  const [AddFlag, setAddFlag] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [clientsList, setClientsList] = useState([]);

  const [companyName, setCompanyName] = useState("")
  const [companyAddress, setCompanyAddress] = useState("")
  const [companyId, setCompanyId] = useState("")
  const [industryType, setIndustryType] = useState("")
  const [enrollmentDate, setEnrollmentDate] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [IncompleteAlertMessage, setIncompleteAlertMessage] = useState(false);

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
    setIncompleteAlertMessage(false)
  }

  const handlePaymentClick = (rowData) => {
    console.log("ROWDATA:", rowData)
    props.history.push({
      pathname: "clients/payments/" + `${rowData.id}`,
      data: rowData
    });
  };

  const handleEditClick = (rowData) => {
    props.history.push({
      pathname: "clients/editClients/" + `${rowData.id}`,
      data: rowData
    });
  };

  const handleLocationsClick = (rowData) => {
    props.history.push({
      pathname: "clients/editLocations/" + `${rowData.id}`,
    });
  };

  const handleDetailsClick = (rowData) => {
    props.history.push({
      pathname: "clients/details/" + `${rowData.id}`,
      data:rowData
    });
  };

  const handleAddCompany = async () => {
    if (
      companyName === "" ||
      companyAddress === "" ||
      companyId === "" ||
      industryType === "" ||
      enrollmentDate === "" ||
      expiryDate === ""
    ) {
      setIncompleteAlertMessage(true);
    } else {
      await addCompany(companyName, companyAddress, companyId, industryType, enrollmentDate, expiryDate)
      getClients()
        .then((response) => {
          setClientsList(response);
          setIsLoading(false);
          console.log("Clients_Fetched")
        })
        .catch(error => {
          console.log(error)
          let message = getErrorMessage(error);
          setAlert('error', message);
        })
        setAlert('success',  'Client Added Successfully')
      setAddFlag(false)
      setIncompleteAlertMessage(false);

    }
  }

  const handleDeleteCompany = async (id) => {
    try {
      let response = await deleteCompany(id);
      setAlert('success',  'Client Deleted Successfully')
      setIsLoading(true);
      getClients()
        .then((response) => {
          setClientsList(response);
          setIsLoading(false);
          console.log("Clients_Fetched")
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

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (isLoading) {
      getClients()
        .then((response) => {
          setClientsList(response);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error)
          let message = getErrorMessage(error);
          setAlert('error', message);
        })
    }

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
      <Grid container justify='center' alignItems='center' spacing={2} style={{ padding: 20 }}>

        <Grid item container justify='space-between'>
          <Grid item>
            <Typography variant='h5'>
              Clients
      </Typography>
          </Grid>

          <Grid item>
            <Button
              onClick={onAddUserClick}
              variant='contained'
              color='primary'>
              {!AddFlag ? 'Add New Client' : 'Back to Clients'}
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
                Company Name
      </Typography>
            </Grid>

            <Grid item xs={9}>
              <TextField
                id="outlined-basic"
                label="Company Name"
                variant="outlined"
                fullWidth
                size='small'
                required
                onChange={(event) => setCompanyName(event.target.value)}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography variant='subtitle1'>
                Company Address
      </Typography>
            </Grid>

            <Grid item xs={9}>
              <TextField
                id="outlined-basic"
                label="Company Address"
                variant="outlined"
                fullWidth
                size='small'
                required
                onChange={(event) => setCompanyAddress(event.target.value)}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography variant='subtitle1'>
                Company Id
      </Typography>
            </Grid>

            <Grid item xs={9}>
              <TextField
                id="outlined-basic"
                label="Corporate Id"
                variant="outlined"
                fullWidth
                size='small'
                required
                onChange={(event) => setCompanyId(event.target.value)}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography variant='subtitle1'>
                Industry Type
      </Typography>
            </Grid>

            <Grid item xs={9}>
              <TextField
                id="outlined-basic"
                label="Industry Type"
                variant="outlined"
                fullWidth
                size='small'
                required
                onChange={(event) => setIndustryType(event.target.value)}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography variant='subtitle1'>
                Enrollment Date*
      </Typography>
            </Grid>

            <Grid item xs={9}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                size='small'
                type='date'
                required
                onChange={(event) => setEnrollmentDate(event.target.value)}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography variant='subtitle1'>
                Expiry Date**
      </Typography>
            </Grid>

            <Grid item xs={9}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                size='small'
                type='date'
                required
                onChange={(event) => setExpiryDate(event.target.value)}
              />
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

            <Grid item xs={4} style={{ padding: 30 }}>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                onClick={() => handleAddCompany()}
              >
                Create Company
          </Button>
            </Grid>
          </>) :
          (<>
            <Grid item xs={12}>
              <MaterialTable
                icons={tableIcons}
                title="All Clients"
                columns={[
                  { title: 'Company Name', field: 'name' },
                  // { title: 'Contact Person', field: '' },
                  // { title: 'Contact Phone', field: '' },
                  // { title: 'Contact Email', field: 'surname' },
                  { title: 'Address', field: 'address' },
                  { title: 'Corporate Id', field: 'corporateId' },
                  { title: 'Industry', field: 'industry' },
                  { title: 'Enrollment Date', field: 'startDate' },
                  { title: 'Expires On', field: 'endDate' },
                  // { title: '#Devices', field: 'surname' },
                  { title: 'Balance', field: 'wallet.balance' },
                ]}
                data={clientsList}
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
                    icon: () => <MenuIcon fontSize="small" />,
                    tooltip: 'Details',
                    onClick: (event, rowData) => handleDetailsClick(rowData),

                  },
                  // {
                  //   icon: () => <AccountBalanceIcon fontSize="small" />,
                  //   tooltip: 'Locations',
                  //   onClick: (event, rowData) => handleLocationsClick(rowData),

                  // },
                  {
                    icon: () => <EditIcon fontSize="small" />,
                    tooltip: 'Edit',
                    onClick: (event, rowData) => handleEditClick(rowData),
                  },
                  {
                    icon: () => <AccountBalanceWalletIcon fontSize="small" />,
                    tooltip: 'Payments',
                    onClick: (event, rowData) => handlePaymentClick(rowData),

                  },
                  {
                    icon: () => <DeleteIcon fontSize="small" />,
                    tooltip: 'Delete',
                    onClick: (event, rowData) => handleDeleteCompany(rowData.id),

                  },
                ]}
              />
            </Grid>
          </>)}

        {/* <Grid>
          <NewPayment />
        </Grid> */}

      </Grid>
    </div>
  );
}

export default withRouter(Clients)