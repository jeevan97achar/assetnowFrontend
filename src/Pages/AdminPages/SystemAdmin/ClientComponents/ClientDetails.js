import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid, Divider } from '@material-ui/core/';
import Users from '../Users'
import CompanyUsers from '../CompanyUsers'

import ListDevice from '../../DeviceAdmin/ListDevices';
import ListZone from '../../MapAdmin/ListZones';
import ListPoi from '../../MapAdmin/ListPOIs'; 
import ClientDeviceGroups from './ClientDeviceGroups';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
} 

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));


export default function ClientDetails(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        console.log("CLIENT_PROPS:", props)
      }, [])

    return (
        <div className={classes.root}>
            <Grid container justify="flex-start" alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        Details
                </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <AppBar position="static">
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Company Users" {...a11yProps(0)} />
                            <Tab label="Device Group" {...a11yProps(1)} />
                            <Tab label="Devices" {...a11yProps(2)} />
                            <Tab label="POI" {...a11yProps(3)} />
                            <Tab label="Zones" {...a11yProps(4)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <CompanyUsers />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ClientDeviceGroups />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <ListDevice />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <ListPoi />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <ListZone />
                    </TabPanel>
                </Grid>
            </Grid>

        </div>
    );
}