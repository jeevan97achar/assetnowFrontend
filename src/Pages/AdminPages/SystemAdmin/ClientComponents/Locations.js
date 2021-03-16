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

import { tableIcons } from "../../../../Util/ui-reference"
import DeleteIcon from '@material-ui/icons/Delete'; 
import ReportProblemIcon from "@material-ui/icons/ReportProblem";

import { getCompanyLocations, addLocation } from "../../../../Network/network"

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

export default function Locations() {

    const [locationsList, setLocationsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [locationName, setLocationName] = useState("");
    const [locationAddress, setLocationAddress] = useState("");
    const [IncompleteAlertMessage, setIncompleteAlertMessage] = useState(false);


    const handleAddLocation =  async() => {
        if (
            locationName !== "" &&
            locationAddress !== ""
        ) {
            setIsLoading(true);
            let response = await addLocation(locationName, locationAddress);
        getCompanyLocations()
            .then((response) => {
                console.log(response);
                setLocationsList(response);
                setIsLoading(false);
                setLocationAddress("")
                setLocationName("")
            })
            .catch(error => {
                console.log(error)
            })
        } else {
            setIncompleteAlertMessage(true);
        }
        
        
        // if(response.status === 200) {
        //     getCompanyLocations()
        // }

        
    }

    const fetchCompanyLocations = async() => {
        if(isLoading){
            getCompanyLocations()
            .then((response) => {
                console.log(response);
                setLocationsList(response);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        fetchCompanyLocations()
        // if(isLoading){
        //     getCompanyLocations()
        //     .then((response) => {
        //         console.log(response);
        //         setLocationsList(response);
        //         setIsLoading(false);
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        // }
        
    })


    return (
        <div>
            <Grid container justify='center' alignItems='center' spacing={2} style={{ padding: 20 }}>

                <Grid item container justify='space-between'>
                    <Grid item>
                        <Typography variant='h5'>
                            Locations
      </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                            <TextField
                            fullWidth
                            id="name"
                            variant='outlined'
                            label="Name"
                            onChange={(event)=>  setLocationName(event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                        <TextField
                            id='address'
                            fullWidth
                            variant="outlined"
                            label="Address"
                            multiline
                            rows={3}
                            onChange={(event)=>  setLocationAddress(event.target.value)}
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

                            <Grid item xs={3}>
                                <Button 
                                onClick={()=> handleAddLocation()}
                                variant='contained' 
                                color='primary' 
                                fullWidth>
                                    Add Location
                        </Button>
                            </Grid>

                        
                        <Grid item xs={12}>
                            <MaterialTable
                                icons={tableIcons}
                                title=""
                                columns={[
                                    { title: 'Office Name', field: 'loc_geo.name' },
                                    { title: 'Address', field: 'loc_geo.address' },
                                ]}
                                data={locationsList}
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

                                // actions={[

                                //     {
                                //       icon: () => <DeleteIcon fontSize="small"/>,
                                //       tooltip: 'Preview POI',
                                //     //   onClick: (event,rowData)=>handleDetailsClick(rowData),
                            
                                //   },
                                // ]}
                            />
                        </Grid>

            </Grid>
        </div>
    );
}
