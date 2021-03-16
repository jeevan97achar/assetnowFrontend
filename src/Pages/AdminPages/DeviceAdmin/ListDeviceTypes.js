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
    Select
} from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";

import {
    createMuiTheme,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { getDeviceTypes } from "../../../Network/network";
import { tableIcons } from "../../../Util/ui-reference";


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

export default function ListDeviceTypes() {

    const [isLoading, setIsLoading] = useState(true);
    const [deviceTypes, setDeviceTypes] = useState([]);

    useEffect(() => {
        if(isLoading){
            getDeviceTypes()
            .then((response) => {
                setDeviceTypes(response);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error)
            })
        }
    })

    return (
        <div>
            <Grid container justify='center' alignItems='center' spacing={2} style={{ padding: 20 }}>

                <Grid item container justify='space-between'>
                    <Grid item>
                        <Typography variant='h5'>
                            Device Types
      </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>
                        
                        <Grid item xs={12}>
                            <MaterialTable
                                isLoading={isLoading}
                                icons={tableIcons}
                                title=""
                                columns={[
                                    { title: 'Asset Type Name', field: 'assettypename' },
                                    { title: 'Asset Type', field: 'assettype' },
                                    { title: 'Description', field: 'description' },
                                ]}
                                data={deviceTypes}
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
