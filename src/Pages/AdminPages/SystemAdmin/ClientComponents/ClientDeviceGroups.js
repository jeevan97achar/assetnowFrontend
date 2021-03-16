import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import {
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PinDropIcon from "@material-ui/icons/PinDrop";
import MapIcon from "@material-ui/icons/Map";

import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { createMuiTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

import AlertCard from '../../../../Components/alert-card/alert-card.component';
import ZonesDialog from "../ClientComponents/DeviceGroupsDialogs/ZonesDialog";
import POIDialog from "../ClientComponents/DeviceGroupsDialogs/POIDialog";
import UsersDialog from "../ClientComponents/DeviceGroupsDialogs/UsersDialog";
import {
  getDeviceGroupsCompany,
  addDeviceGroup,
  deleteDeviceGroup
} from "../../../../Network/network";
import { tableIcons } from "../../../../Util/ui-reference";
import { getErrorMessage } from "../../../../Util/helper";

const names = [
  "Shyna Default Group",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
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

function ClientDeviceGroups(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [AddFlag, setAddFlag] = useState(false);
  const [zonesDialog, setZonesDialog] = useState(false);
  const [poiDialog, setpoiDialog] = useState(false);
  const [usersDialog, setUsersDialog] = useState(false);

  const [clientName, setClientName] = useState();
  const [clientId, setClientId] = useState(props.match.params.id);
  const [deviceGroup, setDeviceGroup] = useState();
  const [description, setDescription] = useState();
  const [currentRowData, setCurrentRowData] = useState();

  const [deviceGroupList, setdeviceGroupList] = useState([]);

  const [ AlertDetails, setAlertDetails ] = useState({
    open: false,
    type: '',
    title: 'Device Groups',
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

  const onAddDeviceGroupClick = async () => {
    try{
      await addDeviceGroup(deviceGroup, description, clientId);
      getDeviceGroupsCompany(clientId)
        .then((response) => {
          setdeviceGroupList(response);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          let message = getErrorMessage(error);
          setAlert('error', message);
        });
      setAlert('success',  'Device Group Added Successfully')
      setAddFlag(false)
    }catch(error){
      console.log(error);
      let message = getErrorMessage(error);
      setAlert('error', message);
    }
  };

  const onDeleteDeviceGroupClick = async (id) => {
    try{
      setIsLoading(true)
      await deleteDeviceGroup(id);
      getDeviceGroupsCompany(clientId)
        .then((response) => {
          setdeviceGroupList(response);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          let message = getErrorMessage(error);
          setAlert('error', message);
        });
      setAlert('success',  'Device Group Deleted Successfully')
      setIsLoading(false)
    }catch(error){
      console.log(error);
      let message = getErrorMessage(error);
      setAlert('error', message);
    }
  };

  const onAddUserClick = () => {
    setAddFlag(!AddFlag);
  };

  const onCloseDialog = () => {
    setZonesDialog(false);
  };

  const onZonesDialogClose = () => {
    setZonesDialog(false);
  };
  const onPOIDialogClose = () => {
    setpoiDialog(false);
  };
  const onUserDialogClose = () => {
    setUsersDialog(false);
  };

  const handleEditClick = (rowData) => {
    props.history.push({
      pathname: "deviceGroups/editDeviceGroups/" + `${rowData.id}`,
      data: rowData,
    });
  };

  const handleZonesDialog = async (rowData) => {
    await setCurrentRowData(rowData);
    setZonesDialog(true);
  };

  const handlePOIDialog = async (rowData) => {
    await setCurrentRowData(rowData);
    setpoiDialog(true);
  };

  const handleUsersDialog = async (rowData) => {
    await setCurrentRowData(rowData);
    setUsersDialog(true);
  };

  useEffect(() => {
    console.log("COMPANY_ID", props.match.params.id);
    if (isLoading) {
      getDeviceGroupsCompany(clientId)
        .then((response) => {
          setdeviceGroupList(response);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          let message = getErrorMessage(error);
          setAlert('error', message);
        });
    }
  }, []);

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
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={2}
        style={{ padding: 20 }}
      >
        <Grid item container justify="space-between">
          <Grid item>
            <Typography variant="h5">Device Groups</Typography>
          </Grid>

          <Grid item>
            <Button
              onClick={onAddUserClick}
              variant="contained"
              color="primary"
            >
              {!AddFlag ? "Add New Device Group" : "Back to Device Groups"}
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {AddFlag ? (
          <>
            {/* <Grid item xs={3}>
              <Typography variant="subtitle1">Client Name</Typography>
            </Grid>

            <Grid item xs={9}>
              <TextField
                id="filled-basic"
                label="Client Name"
                variant="outlined"
                fullWidth
                size="small"
                onChange={(event) => setClientName(event.target.value)}
              />
            </Grid> */}

            <Grid item xs={3}>
              <Typography variant="subtitle1">Device Group</Typography>
            </Grid>

            <Grid item xs={9}>
              <TextField
                id="filled-basic"
                label="Device Group"
                variant="outlined"
                fullWidth
                size="small"
                onChange={(event) => setDeviceGroup(event.target.value)}
              />
            </Grid>

            <Grid item xs={3}>
              <Typography variant="subtitle1">Description</Typography>
            </Grid>

            <Grid item xs={9}>
              <TextField
                id="filled-basic"
                label="Description"
                variant="outlined"
                fullWidth
                size="small"
                onChange={(event) => setDescription(event.target.value)}
              />
            </Grid>

            {/* <Grid ite xs={12}>
                            <MapboxMap zoneMode={true} />
                        </Grid> */}

            <Grid item container justify="center" spacing={3} xs={6}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onAddDeviceGroupClick}
                >
                  Add Device Group
                </Button>
              </Grid>

              <Grid item>
                <Button variant="contained" color="secondary">
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <MaterialTable
                icons={tableIcons}
                isLoading={isLoading}
                title=""
                columns={[
                  // { title: "Device Group Id", field: "id" },
                  // { title: "Client Name", field: "client" },
                  { title: "Device Group Name", field: "group_name" },
                  { title: "Description", field: "description" },
                  // { title: 'Assign', }
                ]}
                data={deviceGroupList}
                options={{
                  search: true,
                  actionsColumnIndex: -1,
                  loadingType: "linear",
                  headerStyle: {
                    backgroundColor: "#263238",
                    color: "#FFF",
                  },
                  rowStyle: {
                    backgroundColor: "#EEE",
                  },
                }}
                actions={[
                  {
                    icon: () => <MapIcon />,
                    tooltip: "Zones",
                    // onClick: (event, rowData) => {
                    //     setZonesDialog(true);
                    // },
                    onClick: async (event, rowData) => {
                      await handleZonesDialog(rowData);
                    },
                  },
                  {
                    icon: () => <PinDropIcon />,
                    tooltip: "POI",
                    onClick: (event, rowData) => {
                      handlePOIDialog(rowData);
                    },
                  },
                  {
                    icon: () => <PersonIcon />,
                    tooltip: "Users",
                    onClick: (event, rowData) => {
                      handleUsersDialog(rowData);
                    },
                  },
                  {
                    icon: () => <EditIcon />,
                    tooltip: "Edit",
                    onClick: (event, rowData) => {
                      handleEditClick(rowData);
                    },
                  },
                  {
                    icon: () => <DeleteIcon />,
                    tooltip: "Delete",
                    onClick: (event,rowData) => {
                        onDeleteDeviceGroupClick(rowData.id);
                    },
                  },
                ]}
              />
            </Grid>
          </>
        )}
        <Grid item container>
          {zonesDialog && (<ZonesDialog
            open={zonesDialog}
            DGData={currentRowData}
            onClose={onZonesDialogClose}
            setAlert={setAlert}
          />)}

          {poiDialog && (
            <POIDialog
            open={poiDialog}
            DGData={currentRowData}
            onClose={onPOIDialogClose}
            setAlert={setAlert}
          />
          )}
          {usersDialog && (
          <UsersDialog
            open={usersDialog}
            DGData={currentRowData}
            onClose={onUserDialogClose}
            setAlert={setAlert}
          />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(ClientDeviceGroups);
