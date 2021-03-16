import React, { useEffect, useState } from "react";
import {
    Grid,
    Typography,
    Button,
    Divider,
    TextField,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import {
    createMuiTheme,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

//Local
import AddZoneForm from '../../../Components/forms/add-zone-form/add-zone-form';
import ListZonesTable from "../../../Components/tables/list-zone-table/list-zone-table";
import AlertCard from '../../../Components/alert-card/alert-card.component';

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

export default function ListZones() {

    const [AddUserFlag, setAddUserFlag] = useState(false)
    const [ AlertDetails, setAlertDetails ] = useState({
        open: false,
        type: '',
        title: 'Zones',
        message: ''
    })

    const onAddUserClick = () => {
        setAddUserFlag(!AddUserFlag)
    }

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
                            List Zones
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Button
                            onClick={onAddUserClick}
                            variant='contained'
                            color='primary'>
                            {!AddUserFlag ? 'Add New Zones' : 'Back to Zones List'}
                        </Button>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                {AddUserFlag ?
                    (<>
                        <AddZoneForm onCancel={onAddUserClick} setAlert={setAlert} />    
                    </>) :
                    (<>
                        <Grid item xs={12}>
                            <ListZonesTable setAlert={setAlert} />
                        </Grid>
                    </>)}
            </Grid>
        </div>
    );
}
