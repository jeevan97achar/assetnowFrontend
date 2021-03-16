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

class UsersDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      usersList: [],
      result: [],
      pdata: this.props.DGData,
      checkedUsers: ""
    };
  }

  // state = {
  //   isLoading: false,
  //   usersList: [],
  //   result: [],
  //   pdata: "",
  //   checkedUsers: ""
  // };

  async componentDidMount() {
    await this.getUsers();
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
    let data = [...this.state.usersList];
    data[index].selected = await event.target.checked;
    this.setState({ usersList: data });
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
    this.setState({checkedUsers: val})
  }
  async getUsers() {
    try{
      let user = JSON.parse(sessionStorage.getItem("user"));
      let userType = sessionStorage.getItem("userType");
      let username = sessionStorage.getItem("username");
      let apiEndPoint = "http://13.126.229.55:8000/webapi/devgroupusers";
      let token = sessionStorage.getItem("token");
      
      let config = {
        headers: { Authorization: `Token ${token}` },
        params: {
          devgroupId: this.state.pdata.id,
        },
      };

      let response = await axios.get(apiEndPoint, config);
      response = response.data;
      this.setState({ usersList: response.devGroupUsersList });
      return response;
    }catch(error){
      console.log(error)
      let message = getErrorMessage(error);
      this.props.setAlert('error', message);
    }
  }

  async postUsers() {
    try{
      let token = sessionStorage.getItem('token'),
      apiEndPoint = 'http://13.126.229.55:8000/webapi/devgroupusers';

      var FormData = require('form-data');
      var data = new FormData();
      data.append('user_devgroup', this.state.pdata.id);
      data.append('devGroupUserSelect', this.state.checkedUsers);

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
      this.props.setAlert('success', 'Users added successfully')
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
                    Users
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
                  { title: "User Name", field: "username" },
                  {
                    title: "User Select",
                    field: "",
                    render: (rowData) => (
                      <Checkbox
                        key={rowData.id}
                        checked={
                          rowData.selected == "true" ||
                          rowData.selected == true
                        }
                        name={rowData.user_name}
                        onClick={(event) => {
                            console.log(this.props)
                          this.handleCheckboxClick(rowData.tableData.id, event);
                        }}
                      />
                    ),
                  },
                ]}
                data={this.state.usersList}
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
                  this.postUsers();
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

export default withStyles(styles)(UsersDialog);
