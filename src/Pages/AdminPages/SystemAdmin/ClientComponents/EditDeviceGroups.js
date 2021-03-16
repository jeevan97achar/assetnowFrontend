import React, { useState, useEffect } from "react";
import {withRouter} from "react-router"
import {
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
} from '@material-ui/core';

import AlertCard from '../../../../Components/alert-card/alert-card.component';

import { editCompanyDeviceGroup } from "../../../../Network/network"
import { getErrorMessage } from '../../../../Util/helper';

function EditDeviceGroups(props) {

  const [client, setClient] = useState(props.location.data.id)
  const [deviceGroup, setDeviceGroup] = useState(props.location.data.group_name)
  const [description, setDescription] = useState(props.location.data.description)
  const [ AlertDetails, setAlertDetails ] = useState({
    open: false,
    type: '',
    title: 'Devices Groups',
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

  const handleEditDeviceGroups = async() => {
    try{
      console.log("Edit Press")
      await editCompanyDeviceGroup(client, deviceGroup, description)
      setAlert('success', 'Device Group details updated successfully')
    }catch(error){
      console.log(error);
      let message = getErrorMessage(error);
      setAlert('error', message);
    }
  }

    useEffect(() => {
      console.log(props);
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
            Edit Device Group
      </Typography>
        </Grid>

      </Grid>
        
        {/* <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={3}>
          <Typography variant='subtitle1'>
            For Client
      </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Client"
            variant="outlined" 
            fullWidth
            size='small'
            onChange={(event)=> setClient(event.target.value)}
            defaultValue={client}
            />
        </Grid> */}

        <Grid item xs={3}>
          <Typography variant='subtitle1'>
            Device Group
      </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Device Group"
            variant="outlined" 
            fullWidth
            size='small'
            onChange={(event)=> setDeviceGroup(event.target.value)}
            defaultValue={deviceGroup}
            />
        </Grid>

        <Grid item xs={3}>
          <Typography variant='subtitle1'>
            Description
      </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined" 
            fullWidth
            size='small'
            onChange={(event)=> setDescription(event.target.value)}
            defaultValue={description}
            />
        </Grid>

        <Grid item xs={4} style={{padding: 30}}>
          <Button 
          variant='contained' 
          color='primary' 
          fullWidth 
          onClick={()=>handleEditDeviceGroups()}
          >
            Save Changes
          </Button>
        </Grid>

      </Grid>    
    </div>
  );
}

export default withRouter(EditDeviceGroups);