import React, { useState, useEffect } from "react";
import {
    Grid,
    Typography,
    Button,
    Divider,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import {
    createMuiTheme,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

//Local
import AddPoiForm from '../../../Components/forms/add-poi-form/add-poi-form';
import ListPoiTable from '../../../Components/tables/list-poi-table/list-poi-table';
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

export default function ListPOIs() {
    const [AddUserFlag, setAddUserFlag] = useState(false)
    const [ AlertDetails, setAlertDetails ] = useState({
        open: false,
        type: '',
        title: 'POI',
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
                            List POIs
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Button
                            onClick={onAddUserClick}
                            variant='contained'
                            color='primary'>
                            {!AddUserFlag ? 'Add New POI' : 'Back to POI List'}
                        </Button>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                {AddUserFlag ?
                    (<>
                        <AddPoiForm onCancel={onAddUserClick} setAlert={setAlert} />
                    </>) :
                    (<>
                        <Grid item xs={12}>
                            <ListPoiTable setAlert={setAlert} /> 
                        </Grid>
                    </>)}
            </Grid>
        </div>
    );
}
