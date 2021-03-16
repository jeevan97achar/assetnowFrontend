import React from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import MapboxMap from "../../maps/mapbox-maps/mapbox-maps";
import { addZone, addZonecompany } from "../../../Network/network";
import { getErrorMessage } from '../../../Util/helper';
import { Alert, AlertTitle } from "@material-ui/lab";

class AddZoneForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      lat1: null,
      long1: null,
      lat2: null,
      long2: null,
      zonevalid: false,
    };

    this.getZoneCoords = this.getZoneCoords.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    // this.checkzonevalid = this.checkzonevalid(this);
  }

  handleChange(e) {
   
    
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  checkzonevalid() {
    
    
    if (this.state.lat1 !== null && this.state.long2 !== null) {
      this.submitForm();
      this.setState({ zonevalid: false });
    } else {
      this.setState({ zonevalid: true });
    }
  }

  async submitForm() {
     if (this.props.id) {
       try {
         let { name, description, lat1, long1, lat2, long2 } = this.state;
         let response = await addZonecompany(
           name,
           description,
           lat1,
           long1,
           lat2,
           long2,
           this.props.id
         );
         this.props.setAlert('success', 'Zone Company Added Successfully')
         this.props.onCancel();
       } catch (error) {
         console.log(error);
         let message = getErrorMessage(error);
         this.props.setAlert('success', message)
       }
     }else{

     
    try {
      let { name, description, lat1, long1, lat2, long2 } = this.state;
      let response = await addZone(name, description, lat1, long1, lat2, long2);
      this.props.setAlert('success', 'Zone Added Successfully')
      this.props.onCancel();
    } catch (error) {
      console.log(error);
      let message = getErrorMessage(error);
      this.props.setAlert('success', message);
    }
  }
  }

  getZoneCoords(coords) {
    let lat1 = coords[0][1],
      long1 = coords[0][0],
      lat2 = null,
      long2 = null;

    coords.map((coord) => {
      if (coord[0] !== long1 && coord[0] !== long2 && long2 === null)
        long2 = coord[0];
      if (coord[1] !== lat1 && coord[1] !== lat2 && lat2 === null)
        lat2 = coord[1];
    });

    this.setState({
      lat1: lat1,
      lat2: lat2,
      long1: long1,
      long2: long2,
    });
  }

  render() {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={2}
        style={{ padding: 20 }}
      >
        <Grid item xs={3}>
          <Typography variant="subtitle1"> Zones Name </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="filled-basic"
            name="name"
            required
            label="Zones Name"
            variant="filled"
            fullWidth
            size="small"
            onChange={this.handleChange}
          />
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle1"> Zones Description </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="filled-basic"
            required
            name="description"
            label="Zones Description"
            variant="filled"
            fullWidth
            size="small"
            multiline
            rows={3}
            onChange={this.handleChange}
          />
        </Grid>

        <Grid ite xs={12}>
          <MapboxMap zoneMode={true} getZoneCoords={this.getZoneCoords} />
        </Grid>
        <Grid item xs={12}>
          {this.state.zonevalid ? (
            <Alert severity="error">
              <AlertTitle>Please choose your zone in map</AlertTitle>
            </Alert>
          ) : null}
        </Grid>
        <Grid item container justify="center" spacing={3} xs={6}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.checkzonevalid()}
            >
              {" "}
              Add Zone{" "}
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.props.onCancel}
            >
              {" "}
              Cancel{" "}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default AddZoneForm;
