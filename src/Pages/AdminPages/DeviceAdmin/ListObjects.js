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
  Container
} from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";

import {
  createMuiTheme,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { ActiveChip } from "../../../Util/theme"
import { InactiveChip } from "../../../Util/theme"

import { tableIcons } from '../../../Util/ui-reference';
import { getListObjects } from "../../../Network/network";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
// import EditUser from "./UserComponents/EditUser";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";

import { deleteObject, addObject} from "../../../Network/network"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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

export default function Objects() {

  const [AddFlag, setAddFlag] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [objectsList, setObjectsList] = useState([]);

  const [objectType, setObjectType] = useState("")
  const [objectName, setObjectName] = useState("")
  const [objectId, setObjectId] = useState("")
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

  const onAddObjectClick = () => {
    setAddFlag(!AddFlag)
    setIncompleteAlertMessage(false)
  }

  const handleDeleteObject = async(objectType, objectName, objectId) => {
    try{
      let response = await deleteObject(objectType, objectName, objectId);
      // this.setState({isLoading: true})
      setAlert('success',  'Object Deleted Successfully')
      setIsLoading(true)
      getListObjects()
        .then((response) => {
            setObjectsList(response);
            setIsLoading(false);
        })
        .catch(error => {
          console.log(error)
          let message = getErrorMessage(error);
          setAlert('error', message);
        })
        setIsLoading(false)
  }catch(error){
    console.log(error)
    let message = getErrorMessage(error);
    setAlert('error', message);
  }
  }

  // const handleAddObject = () => {
  //   if (
  //     objectType !== "" &&
  //     objectName !== "" &&
  //     objectId !== ""
  //   ){
  //     addObject(objectType, objectName, objectId)
  //     getListObjects()
  //       .then((response) => {
  //           setObjectsList(response);
  //           setIsLoading(false);
  //       })
  //       .catch(error => {
  //           console.log(error)
  //       })
  //   } else {
  //     setIncompleteAlertMessage(true);
  //   }
  // }

  const handleAddObject = async () => {
    if ( 
      objectType !== "" &&
      objectName !== "" &&
      objectId !== ""
    ){
      await addObject(objectType, objectName, objectId)
      setAlert('success',  'Object Added Successfully')
      getListObjects()
        .then((response) => {
            setObjectsList(response);
            setIsLoading(false);
        })
        .catch(error => {
          console.log(error)
          let message = getErrorMessage(error);
          setAlert('error', message);
        })
            setAddFlag(!AddFlag)
            
    } else {
      setIncompleteAlertMessage(true);
    }
  }


  useEffect(() => {
    if(isLoading){
      getListObjects()
        .then((response) => {
            setObjectsList(response);
            setIsLoading(false);
        })
        .catch(error => {
          console.log(error)
          let message = getErrorMessage(error);
          setAlert('error', message);
        })
    }
    
})

  return (
    <Router>
    <Switch>
        {/* <Route exact path="/admin/users/edituser">
              <Container>
                <EditUser />
              </Container>
        </Route> */}

        <Route exact path="/admin/listObjects">
              <Container>
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
            List Objects
      </Typography>
        </Grid>

        <Grid item>
          <Button 
          onClick={onAddObjectClick}
          variant='contained' 
          color='primary'>
            {!AddFlag? 'Add New Object' : 'Back to Objects List'}
      </Button>
        </Grid>
      </Grid>
        
        <Grid item xs={12}>
          <Divider />
        </Grid>

        {AddFlag ? 
        (<>

        <Grid item xs={3}>
          <Typography variant='subtitle1'>
            Object Type
      </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Object Type"
            variant="outlined" 
            fullWidth
            size='small'
            onChange = {(event)=> setObjectType(event.target.value)}
            />
        </Grid>

        <Grid item xs={3}>
          <Typography variant='subtitle1'>
            Object Name
      </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Object Name"
            variant="outlined" 
            fullWidth
            size='small'
            onChange = {(event)=> setObjectName(event.target.value)}

            />
        </Grid>

        <Grid item xs={3}>
          <Typography variant='subtitle1'>
            Object Id
      </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Object Id"
            variant="outlined" 
            fullWidth
            size='small'
            onChange = {(event)=> setObjectId(event.target.value)}

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

        <Grid item xs={4} style={{padding: 30}}>
          <Button 
          variant='contained' 
          color='primary' 
          fullWidth 
          onClick={()=> handleAddObject()}
          >
            Add Object
          </Button>
        </Grid>
        </>): 
        (<>
          <Grid item xs={12}>
          <MaterialTable
          isLoading={isLoading}
          icons={tableIcons}
      title=""
      columns={[
        { title: 'Object Id', field: 'id' },
        { title: 'Object Type', field: 'objectType' },
        { title: 'Object Name', field: 'objectName' },
      ]}
      data={objectsList}        
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
        icon: () => <DeleteIcon />,
        tooltip: 'Delete Object',
        onClick: (event,rowData) => {
          handleDeleteObject(rowData.objectType, rowData.objectName, rowData.objectId )
        },
    },
    ]}
    />
          </Grid>
        </>)}

      </Grid>    
    </div>
              </Container>
        </Route>
    </Switch>
    </Router>
  );
}
