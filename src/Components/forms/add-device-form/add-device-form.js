import React from "react";
import {
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import moment from "moment";

import Loader from '../../loader/loader';

import {
  addDevice,
  editDevice,
  getUsers,
  getCompanyUsers,
  getDeviceTypes,
  getCompanyGroups,
  getDeviceMakers,
  getDeviceInfo,
  getClientsList,
  getAssetApps,
  getClients,
} from "../../../Network/network";
import { getErrorMessage } from "../../../Util/helper";

const network = ["MTN", "Glo", "AirTel", "9Mobile", "NTel"];

const client = JSON.parse(sessionStorage.getItem("client"));

class AddDeviceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminLoginStatus: false,
      selectedClientId: null,
      selectedClientIdvalid: false,
      groupType: null,
      groupTypevalid: false,
      deviceGroups: [],
      deviceGroupsvalid: false,
      userGroups: [],
      userGroupsvalid: false,
      deviceTypes: [],
      deviceTypesvalid: false,
      clientList: [],
      clientListvalid: false,
      deviceMakers: [],
      deviceMakersvalid: false,
      deviceId: this.props.deviceId,
      deviceIdvalid: false,
      editMode: this.props.editMode,
      editModevalid: false,
      deviceDetails: {
        clientname: "",
        clientnamevalid: false,
        asset_cat: "",
        asset_catvalid: false,
        name: "",
        namevalid: false,
        selecttype: "",
        selecttypevalid: false,
        msisdn: "",
        msisdnvalid: false,
        imei: "",
        imeivalid: false,
        network: "",
        networkvalid: false,
        serial_num: "",
        serial_numvalid: false,
        maker: "",
        makervalid: false,
        model: "",
        modelvalid: false,
        app_name: "",
        app_namevalid: false,
        ac_code: "",
        ac_codevalid: false,
        number: "",
        numbervalid: false,
        assetstatus: "",
        assetstatusvalid: false,
        aqtime: "",
        aqtimevalid: false,
        usernamegroup: "",
        usernamegroupvalid: false,
        asset_group: [],
        asset_groupvalid: false,
      },
      devicetype: null,
      loaderStatus: false,
    };

    this.getAQTime = this.getAQTime.bind(this);
    this.getassetCategory = this.getassetCategory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMultiple = this.handleChangeMultiple.bind(this);
    this.handleClientChange = this.handleClientChange.bind(this);
    this.onClientChange = this.onClientChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  getAQTime(aqtime) {
    if (aqtime) {
      let time = String(aqtime.substr(0, aqtime.length - 1));
      return time;
    }
    return null;
  }

  getassetCategory(id) {
    let category = null;
    this.state.deviceTypes.forEach((type) => {
      if (type.id === id) category = type.assettype;
    });
    return category;
  }

  handleClientChange(clientId) {
    if (clientId !== null || clientId !== "") {
      this.setState({
        selectedClientId: clientId,
        selectedClientIdvalid: true,
      }, () => {
        this.onClientChange(clientId)
      });
    } else {
      this.setState({
        selectedClientId: clientId,
        selectedClientIdvalid: false,
      }, () => {
        this.onClientChange(clientId)
      });
    }
  }

  handleChange(e) {
    const name = e.target.name;
    const namevalid = name + "valid";
    const value = e.target.value;
    if (value !== "" || value !== null) {
      this.setState((prevState) => ({
        deviceDetails: {
          // object that we want to update
          ...prevState.deviceDetails, // keep all other key-value pairs
          [namevalid]: true, // update the value of specific key
          [name]: value,
        },
      }));
    } else {
      this.setState({
        deviceDetails: {
          ...this.state.deviceDetails,
          [name]: value,
        },
      });
    }
    if (name === "selecttype" && (value !== "" || value !== null)) {
      this.setState({ groupType: value, groupTypevalid: true });
    } else {
      this.setState({ groupType: value });
    }
  }

  handleChangeMultiple(event) {
    const { options } = event.target;
    const value = [];
    let value_name = "";

    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
        value_name = value_name + options[i].text + ",";
      }
    }
    value_name = value_name.substr(
      0,
      value_name.length ? value_name.length - 1 : 0
    );

    this.setState({
      deviceDetails: {
        ...this.state.deviceDetails,
        asset_group: value,
        usernamegroup: value_name,
      },
    });
  }
// async validatesave(){
//   if (
//     this.state.deviceDetails.clientnamevalid === true &&
//     this.state.deviceDetails.asset_catvalid === true &&
//     this.state.deviceDetails.imeivalid === true &&
//     this.state.deviceDetails.namevalid === true &&
//     this.state.deviceDetails.selecttypevalid === true &&
//     this.state.deviceDetails.msisdnvalid === true &&
//     this.state.deviceDetails.networkvalid === true &&
//     this.state.deviceDetails.serial_numvalid===true&&
//     this.state.deviceDetails.
//   ) {
//   }
// }
  async submitForm() {
    try {
      let response = "";
      let aqtime = this.state.deviceDetails.aqtime;
      aqtime = moment.utc(aqtime).format("yyyy-MM-DD HH:mm:ss");
      let deviceDetails = { ...this.state.deviceDetails, aqtime: aqtime },
      message = '';

      if (this.state.editMode) {
        response = await editDevice(this.props.deviceId, deviceDetails);
        message = "Device Updated Successfully"
      } else {
        response = await addDevice(deviceDetails);
        message = "Device Added Successfully"
      }
      this.props.setAlert('success', message);
      this.props.onCancel();
    } catch (error) {
      console.log(error);
      let message = getErrorMessage(error);
      this.props.setAlert('error', message);
    }
  }

  render() {
    let { deviceDetails, adminLoginStatus } = this.state;
    return (<div>
      <div style={{ display: this.state.loaderStatus? 'block' : 'none'}}>
        <Loader />
      </div>
      <div style={{ display: this.state.loaderStatus? 'none' : 'block'}}>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={2}
        style={{ padding: 20 }}
      >
        {adminLoginStatus ? <>
        <Grid item xs={3}>
          <Typography variant="subtitle1"> For Client </Typography>
        </Grid>

        <Grid item xs={9}>
          <FormControl 
          variant="outlined" 
          fullWidth 
          required 
          size="small"
          >
            <InputLabel id="clientname">Client</InputLabel>
            <Select
              labelId="clientname"
              id="clientname"
              name="clientname"
              value={deviceDetails.clientname ? deviceDetails.clientname : ""}
              onChange={this.handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.state.clientList.map((client) => (
                <MenuItem
                  value={client.name}
                  onClick={() => {
                    this.handleClientChange(client.id);
                  }}
                >
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        </> : null }
        <Grid item xs={3}>
          <Typography variant="subtitle1"> Select to Map Asset</Typography>
        </Grid>

        <Grid item xs={9}>
          <FormControl variant="outlined" fullWidth required size="small">
            <InputLabel id="selecttype">Select Asset</InputLabel>
            <Select
              labelId="selecttype"
              id="selecttype"
              name="selecttype"
              value={deviceDetails.selecttype}
              onChange={this.handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="nogroup">User</MenuItem>
              <MenuItem value="usersgroup">Group</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle1">For User/Group </Typography>
        </Grid>

        <Grid item xs={9}>
          <FormControl fullWidth required>
            <InputLabel shrink htmlFor="groupname">
              Select
            </InputLabel>
            <Select
              multiple
              native
              onChange={this.handleChangeMultiple}
              inputProps={{
                id: "groupname",
                name: "groupname",
              }}
            >
              {this.state.groupType === "nogroup" ? this.state.userGroups.map((group) => (
                  <option
                    key={group.id}
                    value={group.id}
                    selected={this.state.deviceDetails.asset_group.includes(
                      group.id
                    )}
                    name={group.user.username}
                  >
                    {group.user.username}
                  </option>
                ))
              : null
              }
              {this.state.groupType === 'usersgroup'? this.state.deviceGroups.map((group) => (
                  <option
                    key={group.id}
                    value={group.id}
                    selected={this.state.deviceDetails.asset_group.includes(
                      group.id
                    )}
                    name={group.group_name}
                  >
                    {group.group_name}
                  </option>
                )): null
              }
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle1"> Device Type </Typography>
        </Grid>

        <Grid item xs={9}>
          <FormControl variant="outlined" fullWidth size="small" required>
            <InputLabel id="asset_cat">Device Type</InputLabel>
            <Select
              labelId="asset_cat"
              id="asset_cat"
              name="asset_cat"
              value={deviceDetails.asset_cat}
              onChange={this.handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.state.deviceTypes.map((type) => (
                <MenuItem value={type.assettype}>{type.assettypename}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {this.state.deviceDetails.asset_cat === "mobile" && (
          <Grid item xs={12}>
            <Grid container justify="center" alignItems="center" spacing={2}>
              {/* <Grid item xs={3}>
                <Typography variant="subtitle1"> MSISDN </Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="msisdn"
                  name="msisdn"
                  label="MSISDN"
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  onChange={this.handleChange}
                  value={deviceDetails.msisdn}
                />
              </Grid> */}
              <Grid item xs={3}>
                <Typography variant="subtitle1"> IMEI </Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="imei"
                  name="imei"
                  label="IMEI"
                  variant="outlined"
                  fullWidth
                  size="small"
                  required
                  onChange={this.handleChange}
                  value={deviceDetails.imei}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1"> Network </Typography>
              </Grid>

              <Grid item xs={9}>
                <FormControl variant="outlined" fullWidth size="small" required>
                  <InputLabel id="network">Network</InputLabel>
                  <Select
                    labelId="network"
                    id="network"
                    name="network"
                    value={deviceDetails.network}
                    onChange={this.handleChange}
                  >
                    {network.map((net) => (
                      <MenuItem value={net}>{net}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        )}
        {this.state.deviceDetails.asset_cat === "gpstracker" && (
          <Grid item xs={12}>
            <Grid container justify="center" alignItems="center" spacing={2}>
              <Grid item xs={3}>
                <Typography variant="subtitle1"> Device Code </Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="dcode"
                  name="dcode"
                  label="Device Code"
                  variant="outlined"
                  fullWidth
                  size="small"
                  required
                  onChange={this.handleChange}
                  value={deviceDetails.dcode}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle1"> Device Maker </Typography>
              </Grid>

              <Grid item xs={9}>
                <FormControl variant="outlined" fullWidth size="small" required>
                  <InputLabel id="network">Device Maker</InputLabel>
                  <Select
                    labelId="maker"
                    id="maker"
                    name="maker"
                    value={deviceDetails.maker}
                    onChange={this.handleChange}
                  >
                    {this.state.deviceMakers.map((make) => (
                      <MenuItem value={make.name}>{make.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle1"> Device Model </Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="model"
                  name="model"
                  label="Device Model"
                  variant="outlined"
                  fullWidth
                  size="small"
                  required
                  value={deviceDetails.model}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        {this.state.deviceDetails.asset_cat === "app" && (
          <Grid item xs={12}>
            <Grid container justify="center" alignItems="center" spacing={2}>
              <Grid item xs={3}>
                <Typography variant="subtitle1"> App Name </Typography>
              </Grid>

              <Grid item xs={9}>
                <FormControl variant="outlined" fullWidth size="small" required>
                  <InputLabel id="app_name">App Name</InputLabel>
                  <Select
                    labelId="app_name"
                    id="app_name"
                    name="app_name"
                    value={deviceDetails.app_name}
                    onChange={this.handleChange}
                  >
                    {this.state.assetApps.map((app) => (
                      <MenuItem value={app.name}>{app.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle1"> Activation Code </Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="ac_code"
                  name="ac_code"
                  label="Activation Code"
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={this.handleChange}
                  value={deviceDetails.ac_code}
                  required
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid item xs={3}>
          <Typography variant="subtitle1"> Aquisition Date*</Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="aqtime"
            name="aqtime"
            variant="outlined"
            fullWidth
            size="small"
            type="datetime-local"
            value={deviceDetails.aqtime}
            onChange={this.handleChange}
            required
          />
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle1"> Number </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="number"
            name="number"
            label="Number"
            variant="outlined"
            fullWidth
            size="small"
            onChange={this.handleChange}
            value={deviceDetails.number}
            required
          />
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle1"> Device Name </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="name"
            name="name"
            label="Device Name"
            variant="outlined"
            fullWidth
            size="small"
            onChange={this.handleChange}
            value={deviceDetails.name}
            required
          />
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle1"> Serial Number </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="serial_num"
            name="serial_num"
            label="Serial Number"
            variant="outlined"
            fullWidth
            size="small"
            onChange={this.handleChange}
            value={deviceDetails.serial_num}
            required
          />
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle1">Asset Status </Typography>
        </Grid>

        <Grid item xs={9}>
          <FormControl variant="outlined" fullWidth size="small" required>
            <InputLabel id="assetstatus" required>Status</InputLabel>
            <Select
              labelId="assetstatus"
              id="assetstatus"
              name="assetstatus"
              value={deviceDetails.assetstatus}
              onChange={this.handleChange}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3} style={{ padding: 30 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.submitForm}
            fullWidth
          >
            {" "}
            Save{" "}
          </Button>
        </Grid>

        <Grid item xs={3} style={{ padding: 30 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.props.onCancel}
            fullWidth
          >
            {" "}
            Cancel{" "}
          </Button>
        </Grid>
      </Grid>
      </div>
      </div>
    );
  }

  async componentDidMount() {
    this.setState({loaderStatus: true})
    try{
      let companyId = this.props.companyId ? this.props.companyId : 0;
      let adminLoginStatus = this.props.companyId ? false: true ;
      let deviceTypes = await getDeviceTypes();
      let clientList = await getClients(companyId);
      let deviceMakers = await getDeviceMakers();
      let assetApps = await getAssetApps();

      if(this.props.editMode && adminLoginStatus){
        companyId = this.props.assetClient;
      }

      let deviceGroups = await getCompanyGroups(companyId); 
      let userGroups = companyId ? await getCompanyUsers(companyId) : await getUsers();

      this.setState({
        adminLoginStatus,
        deviceTypes,
        clientList,
        deviceMakers,
        deviceGroups,
        userGroups,
        assetApps,
      });
      
      if (this.props.editMode) {
        let clientname = null;
        clientList.forEach((client) => {
          if (client.id === this.props.assetClient) {
            clientname = client.name;
          }
        });
        let response = await getDeviceInfo(this.props.deviceId);
        let deviceInfo = response["deviceinfo"];
        let asset_group = deviceInfo[0]['asset_group'].length ? deviceInfo[0]['asset_group'][0]: null;
        let selecttype = "nogroup";

        if(asset_group){
          deviceGroups.forEach(dg => {
            if(dg.id == asset_group){
              selecttype = 'usersgroup';
            }
          })
        }

        let deviceDetails = {
          ...deviceInfo[0],
          clientname: clientname,
          app_name: deviceInfo[0].app,
          asset_cat: this.getassetCategory(deviceInfo[0].asset_cat),
          selecttype: selecttype,
          aqtime: this.getAQTime(deviceInfo[0].aqtime),
        };
        this.setState({ 
          deviceDetails: deviceDetails, 
          groupType: selecttype 
        });
      }else{
        let clientname = null;
        clientList.forEach(client => {
          if(client.id == this.props.companyId){
            clientname = client.name
          }
        })

        let deviceDetails = {
          ...this.state.deviceDetails,
          clientname: clientname
        }
        this.setState({ deviceDetails: deviceDetails });
      }
    }catch(error){
      console.log(error);
      let message = getErrorMessage(error);
      this.props.setAlert('error', message);
    }
    this.setState({loaderStatus: false})
  }

  async onClientChange(id){
    try{
      let deviceGroups = await getCompanyGroups(id); 
      let userGroups = await getCompanyUsers(id);
    
      this.setState({
        deviceGroups,
        userGroups,
      });
    }catch(error){
      let message = getErrorMessage(error);
      this.props.setAlert('error', message);
    }
  }
}

export default AddDeviceForm;
