import React from "react";
import {
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  Grid,
  Typography,
  IconButton,
  withStyles,
  Checkbox,
  DialogActions,
  Button
} from "@material-ui/core";
import axios from "axios";
import Close from "@material-ui/icons/Close";
import MaterialTable from "material-table";
import { tableIcons } from "../../../../../Util/ui-reference";
import { getErrorMessage } from "../../../../../Util/helper";

// import Map from '../maps/mapbox-maps/mapbox-maps';

const styles = (theme) => ({
  container: {
    width: "40%",
    align: "center",
  },
});

class ZonesDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      zonesList: [],
      result: [],
      pdata: this.props.DGData,
      checkedZones: ""
    };
  }

  // state = {
  //   isLoading: false,
  //   zonesList: [],
  //   result: [],
  //   pdata: "",
  //   checkedZones: ""
  // };

  async componentDidMount() {
    await this.getZones();
    this.setState({ isLoading: false });
  }

  componentDidUpdate(prevProps) {
    
    if (this.props.DGData !== prevProps.DGData) {
        this.setState({
        pdata: this.props.DGData
      })
    }
  }
  async handleCheckboxClick(index, event) {
    let data = [...this.state.zonesList];
    data[index].selected = await event.target.checked;
    this.setState({ zonesList: data });
    this.changeData(data)
  }
  async changeData(data) {
    let val = ""
    await data.map((row) => {
      if (row.selected === "true" || row.selected === true) {
        val = val + row.id + ",";
      }
    })
    val = val.slice(0, -1);
    this.setState({checkedZones: val})
  }
  async getZones() {
    try{
      let user = JSON.parse(sessionStorage.getItem("user"));
      let userType = sessionStorage.getItem("userType");
      let username = sessionStorage.getItem("username");
      let apiEndPoint = "http://13.126.229.55:8000/webapi/devgroupzones";
      let token = sessionStorage.getItem("token");
      
      let config = {
        headers: { Authorization: `Token ${token}` },
        params: {
          devgroupId: this.state.pdata.id,
        },
      };

      let response = await axios.get(apiEndPoint, config);
      response = response.data;
      this.setState({ zonesList: response.devGroupZonesList });
      return response;
    }catch(error){
      console.log(error)
      let message = getErrorMessage(error);
      this.props.setAlert('error', message);
    }
  }

  async postZones() {
    try{
      let token = sessionStorage.getItem('token'),
      apiEndPoint = 'http://13.126.229.55:8000/webapi/devgroupzones';

      var FormData = require('form-data');
      var data = new FormData();
      data.append('zone_devGroup', this.state.pdata.id);
      data.append('devGroupZoneSelect', this.state.checkedZones);

      var config = {
        method: 'post',
        url: apiEndPoint,
        headers: {
          'Authorization': 'Token ' + token
        },
        data: data
      };
      let response = await axios(config);
      response = response.data;
      this.props.setAlert('success', 'Zones added successfully')
      return response;
    }catch(error){
      console.log(error);
      let message = getErrorMessage(error);
      this.props.setAlert('error', message);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          aria-labelledby="map-preview-dialog"
          open={this.props.open}
          classes={{
            paper: classes.container,
          }}
        >
          <AppBar position="static">
            <Toolbar>
              <Grid justify="space-between" container>
                <Grid item xs={11}>
                  <Typography variant="h5" color="inherit">
                    Zones
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    onClick={this.props.onClose}
                  >
                    <Close />
                  </IconButton>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <Grid item xs={12}>
              <MaterialTable
                icons={tableIcons}
                isLoading={this.state.isLoading}
                title=""
                columns={[
                  { title: "Zone Name", field: "zone_name" },
                  {
                    title: "Zone Select",
                    field: "",
                    render: (rowData) => (
                      <Checkbox
                        key={rowData.id}
                        checked={
                          rowData.selected == "true" ||
                          rowData.selected == true
                        }
                        name={rowData.zone_name}
                        onClick={(event) => {
                          this.handleCheckboxClick(rowData.tableData.id, event);
                        }}
                      />
                    ),
                  },
                ]}
                data={this.state.zonesList}
                options={{
                  search: true,
                  actionsColumnIndex: -1,
                  loadingType: "linear",
                }}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container justify='center' alignItems='center' style={{padding: 10}}>
              <Button
                variant='contained'
                color='primary'
                onClick={() => {
                  this.postZones();
                }}
              >
                Submit
            </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(ZonesDialog);
