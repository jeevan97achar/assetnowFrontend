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
    Checkbox,
    IconButton
} from '@material-ui/core';
import moment from 'moment';


import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import { refreshAlerts } from "../../../Network/network"
import {
    createMuiTheme,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { tableIcons } from '../../../Util/ui-reference';
import axios from "axios"
import RefreshIcon from '@material-ui/icons/Refresh';
import ClearIcon from '@material-ui/icons/Clear';
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

export default function ViewAlerts() {

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [type, setType] = useState("")
    const [alertsList, setAlertsList] = useState()
    const [alertType, setAlertType] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [deviceId, setDeviceId] = useState("")
    const [IncompleteAlertMessage, setIncompleteAlertMessage] = useState(false);

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

    const onRefreshClick = async () => {
        try {
            setIsLoading(true)
            await getAllAlerts()
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            let message = getErrorMessage(error);
            setAlert('error', message);
        }
    }

    const onClearFilterClick = async () => {
        try {
            setStartDate("")
            setEndDate("")
            setType("")
        }
        catch (error) {
            console.log(error)
            let message = getErrorMessage(error);
            setAlert('error', message);
        }
    }

    const onDeviceRefreshClick = async (deviceId) => {
        try {
            setIsLoading(true);
            await refreshAlerts(deviceId);
            getAllAlerts()
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            let message = getErrorMessage(error);
            setAlert('error', message);
        }
    }

    const getAllAlerts = async () => {
        try{   
            setIsLoading(true);
        let user = JSON.parse(sessionStorage.getItem('user'));
        let userType = sessionStorage.getItem('userType');

        let apiEndPoint = 'http://13.126.229.55:8000/webapi/alerts';
        let token = sessionStorage.getItem('token');

        let config = {
            headers: { Authorization: `Token ${token}` },
            params: {
                alert_type: type,
                start_date: startDate,
                end_date: endDate,
            }
        }

        let response = await axios.get(apiEndPoint, config);
        response = response.data;
        setAlertsList(response.AssetAlerts)
        setAlertType(response.alert_type)
        setIsLoading(false);
        return response;
        } catch(error){
            console.log(error)
            let message = getErrorMessage(error);
            setAlert('error', message);
        }
    }

    useEffect(() => {
        console.log("ALERTS")
        getAllAlerts()
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
                            Alerts
      </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        type='date'
                        helperText='Start Date'
                        id='startDate'
                        value={startDate}
                        fullWidth
                        onChange={(event) => setStartDate(event.target.value)}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        type='date'
                        helperText='End Date'
                        id='endDate'
                        value={endDate}
                        fullWidth
                        onChange={(event) => setEndDate(event.target.value)}
                    />
                </Grid>

                {IncompleteAlertMessage ? (
                    <>
                        <Grid item container xs={12} justify="center" alignItems="center" spacing={2}>
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

                <Grid item xs={3}>
                    <Button variant='contained' color='primary' fullWidth
                        startIcon={<RefreshIcon />}
                        onClick={() => onRefreshClick()}
                    >
                        Refresh Alerts
                    </Button>
                </Grid>

                <Grid item xs={3}>
                    <Button variant='contained' color='secondary' fullWidth
                        startIcon={<ClearIcon />}
                        onClick={() => onClearFilterClick()}
                    >
                        Clear Filter
                    </Button>
                </Grid>

                {/* <Grid item xs={3}>
                    <Button variant='contained' color='primary' fullWidth>
                        Hide Selected Alerts
                        </Button>
                </Grid> */}

                <Grid item xs={2}>
                    <Typography variant='subtitle1'>
                        Zone/POI Filter:
      </Typography>
                </Grid>

                <Grid item xs={4}>
                    <FormControl variant="outlined" fullWidth size='small'>
                        <InputLabel id="demo-simple-select-outlined-label">User Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            // value={age}
                            onChange={(event) => setType(event.target.value)}
                            value={type}
                            label="Age"
                        >
                            <MenuItem value="ZoneAndPoI"><em>Both</em></MenuItem>
                            <MenuItem value={"POI"}>POI</MenuItem>
                            <MenuItem value={"Zone"}>Zone</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <MaterialTable
                        title=""
                        icons={tableIcons}
                        isLoading={isLoading}
                        columns={[
                            { title: 'Device ID', field: 'asset.id' },
                            { title: 'Device', field: 'asset.name' },
                            { title: 'Number', field: 'asset.number' },
                            {
                                title: 'Date'
                                , render: rowData => moment.utc(rowData['recorded_time']).format("MMM DD YYYY")
                            },
                            {
                                title: 'Time'
                                , render: rowData => moment.utc(rowData['recorded_time']).format("hh:mm A")
                            },
                            { title: 'Location Address', field: 'alert_message' },
                            { title: 'POI Message', field: 'poi_alert_message' },
                            { title: 'Zone Message', field: 'zone_alert_message' },
                            {
                                title: "Device Refresh",
                                field: "",
                                render: (rowData) => (
                                    <IconButton
                                        style={{ color: "#015C88" }}
                                        aria-label="delete"
                                        onClick={() => {
                                            // setDeviceId(rowData.asset.id)
                                            onDeviceRefreshClick(rowData.asset.id)
                                        }}
                                    >
                                        <RefreshIcon fontSize="large" />
                                    </IconButton>
                                ),
                            }
                        ]}
                        data={alertsList}
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
