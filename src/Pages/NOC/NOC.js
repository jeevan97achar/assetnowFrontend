import React, { useState, useEffect, useDebugValue } from "react";
import clsx from "clsx";
import {
    Grid,
    Typography,
    Button,
    Divider,
    InputLabel,
    MenuItem,
    FormHelperText,
    TextField,
    Container,
    ButtonGroup,
    FormControl,
  Select,
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
import { ActiveChip } from "../../Util/theme"
import { InactiveChip } from "../../Util/theme"
import { tableIcons } from '../../Util/ui-reference';
import AlertCard from '../../Components/alert-card/alert-card.component'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getErrorMessage } from '../../Util/helper'
import { getNOC, logout } from "../../Network/network"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const useStyles = makeStyles((theme) => ({
    // appBar: {
    //     backgroundColor: "#FFF",
    //     color: "#015C88",
    //     transition: theme.transitions.create(["margin", "width"], {
    //       easing: theme.transitions.easing.sharp,
    //       duration: theme.transitions.duration.leavingScreen,
    //     }),
    //   },
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
    title: {
        flexGrow: 1,
    },
}));

function Users(props) {

    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true)
    const [devicesList, setDevicesList] = useState([])
    const [NOCList, setNOCList] = useState([])
    const [status, setStatus] = useState("")
    const [assetName, setAssetName] = useState("")

    const [AlertDetails, setAlertDetails] = useState({
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

    const handleLogoutClick = () => {
        logout()
          .then((response) => {
            sessionStorage.clear();
            window.location = "/NOC";
          })
          .catch((error) => {
            console.log(error);
          });
      };

    const onFailureClick = async () => {
        setIsLoading(true)
        setStatus("Failure")
        await fetchNOCList(assetName,"Failure")
        setIsLoading(false)
    }

    const onSuccessClick = async () => {
        setIsLoading(true)
        // await setStatus("")
        await fetchNOCList(assetName,"")
        setIsLoading(false)
    }

    const onResetClick = async () => {
        setIsLoading(true)
        setAssetName("")
        await fetchNOCList("","")
        setIsLoading(false)
    }

    const handleAssetNameChange = async(value) => {
        setIsLoading(true)
        setAssetName(value)
        let response = await getNOC(value)
        setNOCList(response.Locations)
        console.log("DEVICES_RESPONSE:", response.Locations)
        setIsLoading(false)
    }

    const deviceFilter = async (response) => {
        let successArr = []
        let failureArr = []

        setDevicesList(response.DeviceNames)
                    await response.Locations.map((obj,i)=>{
                        if (obj.result === "Success") {
                            successArr.push(obj)
                        } else {
                            failureArr.push(obj)
                        }
                    })
                    if (status === "failure"){
                        setNOCList(failureArr)
                    } else {
                        setNOCList(successArr)
                    }
    }

    const fetchNOCList = (assetName, status) => {
        
        
        setIsLoading(true)
        // setAssetName("")
        getNOC(assetName, status)
                .then((response) => {
                    // deviceFilter(response)
                    setNOCList(response.Locations)
                    setDevicesList(response.DeviceNames)
                    setIsLoading(false);
                    console.log("NOC:", response.Locations)
                })
                .catch(error => {
                    console.log(error)
                    let message = getErrorMessage(error);
                    setAlert('error', message);
                })
                setIsLoading(true)
    }

    useEffect(() => {
        if (isLoading) {
            fetchNOCList()
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


            <Grid container justify='space-between' alignItems='center' spacing={2} style={{ padding: 20 }}>
                <Grid item container justify='space-between'>
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar)}
                    >
                        <Toolbar>
                            <Typography
                                variant="h6"
                                noWrap
                                className={classes.title}
                            >
                                Performance &amp; Asset Tracking System
            </Typography>
            <Button
                    onClick={()=> handleLogoutClick()}
                    color="inherit"
                    size="small"
                    variant="outlined"
                    startIcon={<PowerSettingsNewIcon />}
                    style={{
                      padding: 10,
                      color: "#FFF",
                      backgroundColor: "#015C88",
                    }}
                  >
                    Logout
                  </Button>

                            {/* <IconButton
                                color="inherit"
                            onClick={()=> handleLogoutClick()}
                            >
                                <ExitToAppIcon />
                            </IconButton> */}
                        </Toolbar>
                    </AppBar>
                </Grid>

                <Grid item container justify='space-between' style={{ marginTop: 50 }}>
                    <Grid item>
                        <Typography variant='h5'>
                            NOC
                        </Typography>
                    </Grid>

                    <Grid item>
                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                            <Button onClick={()=> onSuccessClick()}>Success</Button>
                            <Button onClick={()=> onFailureClick()}>Failure</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={3}>
                    {/* <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Select a Device"
                        fullWidth
                        size='small'
                        // value={currency}
                        // onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                    >
                        {devicesList.map((option,i) => (
                            <option key={i} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField> */}
                    <FormControl
                        variant="outlined"
                        fullWidth size='small'
                        SelectProps={{
                            native: true,
                        }}
                        onChange={(event) => handleAssetNameChange(event.target.value)}
                      >
                        <InputLabel id="demo-simple-select-outlined-label">Device</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outli  ned"
                          value={assetName}
                        //   onChange={(event) => setUserType(event.target.value)}
                        onChange={(event) => {handleAssetNameChange(event.target.value);
                                            setAssetName(event.target.value);}}

                          label="Age"
                        >
                          <MenuItem value=""><em>None</em></MenuItem>
                          {devicesList.map((option,i) => (
                            <MenuItem key={i} value={option}>{option}</MenuItem>
                        ))}

                        </Select>
                      </FormControl>
                </Grid>

                <Grid item xs={2}>
                    <Button
                        //   onClick={onAddUserClick}
                        fullWidth
                        variant='contained'
                        onClick={()=> onResetClick()}
                        color='secondary'>
                        Reset
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <MaterialTable
                        isLoading={isLoading}
                        icons={tableIcons}
                        defaultSort="desc"
                        title="Success"
                        columns={[
                            { title: 'Asset Name', field: 'asset__name' },
                            { title: 'Asset Number', field: 'asset__number' },
                            // { title: 'Recorded Time', field: 'recorded_time' },
                            {
                                title: 'Recorded Date'
                                , render: rowData => moment.utc(rowData['recorded_time']).format("MMM DD YYYY")
                              },
                            {
                                title: 'Recorded Time'
                                , render: rowData => moment.utc(rowData['recorded_time']).format("hh:mm A")
                              },
                            { title: 'Latitude', field: 'geo__latitude' },
                            { title: 'Longitude', field: 'geo__longitude' },
                        ]}
                        data={NOCList}
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
                    />
                </Grid>

            </Grid>
        </div>
    );
}

export default withRouter(Users)