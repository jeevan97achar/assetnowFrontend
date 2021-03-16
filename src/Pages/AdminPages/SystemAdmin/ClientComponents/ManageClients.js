import React, { useState, useEffect } from "react";
import { withRouter } from "react-router"
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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


import { getUserManageClients, addNewClientManagement, deleteClientManagement } from "../../../../Network/network"

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

function ManageClients(props) {

    const [availableClientsList, setAvailableClientsList] = useState([]);
    const [addedClientsList, setAddedClientsList] = useState([]);
    const [user, setUser] = useState()
    const [propsData, setPropsData] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState()


    const handleAddCompany =  async(client) => {
        
        await addNewClientManagement(user, client);
        await setIsLoading(true);
        fetchClients()
        setIsLoading(false);
    }

    const handleDeleteCompany =  async(client) => {
        await deleteClientManagement(user, client);
        await setIsLoading(true);
        fetchClients()
        setIsLoading(false);
    }

    const fetchClients = async() => {
        setIsLoading(true)
            getUserManageClients(props.location.data.authuser.username)
            .then((response) => {
                console.log(response.Clients);
                setAvailableClientsList(response.Clients);
                setAddedClientsList(response.AdminUserClientMaps);
                setUser(response.userid)
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error)
            })
        setIsLoading(false)
    }

    useEffect(() => {
        fetchClients()
        setPropsData(props)
        console.log("Props:", propsData)

        // if(isLoading){
        //     getCompanyLocations()
        //     .then((response) => {
        //         console.log(response);
        //         setAvailableClientsList(response);
        //         setIsLoading(false);
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        // }
        
    }, [])


    return (
        <div>
            <Grid container justify='center' alignItems='center' spacing={2} style={{ padding: 20 }}>

                <Grid item container justify='space-between'>
                    <Grid item>
                        <Typography variant='h5'>
                            Manage Clients
      </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>



                <Grid item xs={6}>
                            <MaterialTable
                                icons={tableIcons}
                                title="Available"
                                columns={[
                                    { title: 'Company Name', field: 'name' },
                                ]}
                                data={availableClientsList}
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
                                      icon: () => <AddCircleOutlineIcon fontSize="small"/>,
                                      tooltip: 'Add',
                                      onClick: (event,rowData)=>handleAddCompany(rowData.name),                            
                                  },
                                ]}
                            />
                        </Grid>

                        
                        <Grid item xs={6}>
                            <MaterialTable
                                icons={tableIcons}
                                title="Added"
                                columns={[
                                    { title: 'Company Name', field: 'client.name' },
                                ]}
                                data={addedClientsList}
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
                                      icon: () => <DeleteIcon fontSize="small"/>,
                                      tooltip: 'Add',
                                      onClick: (event,rowData)=>{handleDeleteCompany(rowData.client.name);},
                            
                                  },
                                ]}
                            />
                        </Grid>

            </Grid>
        </div>
    );
}

export default withRouter(ManageClients)
