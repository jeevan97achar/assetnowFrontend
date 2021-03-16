import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
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



import AddDeviceForm from '../../../Components/forms/add-device-form/add-device-form';
import TrackDevicePane from '../../../Components/track-device/track-device-pane';
import SosModal from '../../../Components/set-sos-modal/set-sos-modal';
import LinkObjectModal from '../../../Components/link-object-modal/link-object-modal';
import ListDevicesTable from '../../../Components/tables/list-device-table/list-device-table';
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

export default function ListDevices() {

  const [ AddUserFlag, setAddUserFlag ] = useState(false);
  const [ showTrack, setShowTrack ] = useState(false);
  const [ showSos, setShowSos ] = useState(false);
  const [ showLinkModal, setShowLinkModal ] = useState(false);
  const [ editMode, setEditMode ] = useState(false);
  const [ deviceId, setDeviceId ] = useState(null)
  const [ objects, setObjects ] = useState([]);
  const [ assetClient, setAssetClient ] = useState(null);
  const [ AlertDetails, setAlertDetails ] = useState({
    open: false,
    type: '',
    title: 'Devices',
    message: ''
  })

  const onAddUserClick = () => {
    setAddUserFlag(!AddUserFlag)
    setEditMode(false);
    setDeviceId(null);
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

  const onTrackClick = () => {
    setShowTrack(!showTrack)
  }

  const onSosClick = () => {
    setShowSos(!showSos);
  }

  const onLinkClick = () => {
    setShowLinkModal(!showLinkModal);
  }

  let params = useParams(),
  user = JSON.parse(sessionStorage.getItem('user'));
  const companyId = params.id ? params.id : user.company;

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
            Devices
          </Typography>
        </Grid>

        <Grid item>
          <Button 
          onClick={onAddUserClick}
          variant='contained' 
          color='primary'>
            {!AddUserFlag? 'Add New Device' : 'Back to Devices'}
          </Button>
        </Grid>
      </Grid>
        
        <Grid item xs={12}>
          <Divider />
        </Grid>
        { showTrack && (<TrackDevicePane deviceId={deviceId} onClose={onTrackClick} open={showTrack} setAlert={setAlert} />) }
        { showSos && (<SosModal onClose={onSosClick} open={showSos} deviceId={deviceId} setAlert={setAlert}/>) }
        { showLinkModal && (<LinkObjectModal deviceId={deviceId} objects={objects} onClose={onLinkClick} open={showLinkModal} setAlert={setAlert} />) }
        {AddUserFlag ? 
        (<>
          <AddDeviceForm  onCancel={onAddUserClick} editMode={editMode} deviceId={deviceId} assetClient={assetClient} companyId={companyId} setAlert={setAlert}/>
        </>): 
        (<>

        <Grid item container xs={12} justify='flex-start' spacing={2}>
            <Grid item>
                <Button variant='contained' color='default'>Excel</Button>
            </Grid>
            <Grid item>
                <Button variant='contained' color='default'>PDF</Button>
            </Grid>
            <Grid item>
                <Button variant='contained' color='default'>Print</Button>
            </Grid>
        </Grid>
          <Grid item xs={12}>
            <ListDevicesTable 
              setDeviceId={setDeviceId}
              setEditMode={setEditMode}
              setAddUserFlag={setAddUserFlag}
              setShowTrack={setShowTrack}
              setShowSos={setShowSos}
              setShowLinkModal={setShowLinkModal}
              setObjects={setObjects}
              setAssetClient={setAssetClient}
              setAlert={setAlert}
            />
          </Grid>
        </>)}

      </Grid>    
    </div>
  );
}
