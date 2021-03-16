import React from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import MapboxMap from "../../maps/mapbox-maps/mapbox-maps";
import {
  addPOI,
  getMapboxAddress,
  addPOICompany,
} from "../../../Network/network";
import { getErrorMessage } from "../../../Util/helper";

class AddPoiForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      namevalid: true,
      description: "",
      lat: null,
      lng: null,
      address: "",
      city: "",
      zipcode: "",
      latlngvalid: false,
    };

    this.getPoiData = this.getPoiData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    // this.checkvaliddata = this.checkvaliddata(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  checkvaliddata() {
    if (this.state.lat !== null && this.state.lng !== null) {
      this.submitForm();
      this.setState({ latlngvalid: false });
    } else {
      console.log("checkvaliddata");
      this.setState({ latlngvalid: true });
    }
  }
  async submitForm() {
    if (this.props.companyId) {
      try {
        let {
          name,
          description,
          address,
          city,
          zipcode,
          lat,
          lng,
        } = this.state;
        let response = await addPOICompany(
          name,
          description,
          address,
          city,
          zipcode,
          lat,
          lng,
          this.props.companyId
        );

        this.props.setAlert('success', 'POI Company Added Successfully')
        this.props.onCancel();
      } catch (error) {
        console.log(error);
        let message = getErrorMessage(error);
        this.props.setAlert('error', message);
      }
    } else {
      try {
        let {
          name,
          description,
          address,
          city,
          zipcode,
          lat,
          lng,
        } = this.state;
        let response = await addPOI(
          name,
          description,
          address,
          city,
          zipcode,
          lat,
          lng
        );
        this.props.setAlert('success', 'POI added successfully')
        this.props.onCancel();
      } catch (error) {
        console.log(error);
        let message = getErrorMessage(error);
        this.props.setAlert('error', message);
      }
    }
  }

  async getPoiData(coords) {
    try {
      let address = await getMapboxAddress(coords.lng, coords.lat);
      address = address.features;

      let addressObj = {
        address: address[0].place_name ? address[0].place_name : null,
        zipcode: "",
        city: "",
      };

      address.map((feature) => {
        if (feature.place_type[0] === "postcode")
          addressObj.zipcode = feature.text;
        else if (feature.place_type[0] === "region")
          addressObj.region = feature.text;
        else if (feature.place_type[0] === "district")
          addressObj.district = feature.text;
        else if (feature.place_type[0] === "place")
          addressObj.place = feature.text;
      });

      if (addressObj.place) addressObj.city = addressObj.place;
      else if (addressObj.district) addressObj.city = addressObj.district;
      else addressObj.city = addressObj.region;

      this.setState({
        ...addressObj,
        lat: coords.lat,
        lng: coords.lng,
      });
    } catch (error) {
      console.log(error);
      let message = getErrorMessage(error);
      this.props.setAlert('success', message);
    }
  }

  render() {
    return (<div>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={2}
        style={{ padding: 20 }}
      >
        <Grid item xs={3}>
          <Typography variant="subtitle1">POI Name </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="filled-basic"
            name="name"
            label="POI Name"
            variant="filled"
            fullWidth
            size="small"
            onChange={this.handleChange}
          />
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle1"> POI Description </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="filled-basic"
            name="description"
            label="POI Description"
            variant="filled"
            fullWidth
            size="small"
            multiline
            rows={3}
            onChange={this.handleChange}
          />
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle1">POI Address</Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="filled-basic"
            name="address"
            label="POI Address"
            variant="filled"
            fullWidth
            size="small"
            value={this.state.address}
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">POI City </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="filled-basic"
            name="city"
            label="POI City"
            variant="filled"
            fullWidth
            size="small"
            value={this.state.city}
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">POI Zip Code </Typography>
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="filled-basic"
            name="zipcode"
            label="POI Zip Code"
            variant="filled"
            fullWidth
            size="small"
            value={this.state.zipcode}
            onChange={this.handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <MapboxMap poiMode={true} getPoiData={this.getPoiData} />
        </Grid>
        <Grid item xs={12}>
          {this.state.latlngvalid ? (
            <Alert severity="error">
              <AlertTitle>Please choose your location in map</AlertTitle>
            </Alert>
          ) : null}
        </Grid>

        <Grid item container justify="center" spacing={3} xs={6}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.checkvaliddata()}
            >
              {" "}
              Add POI{" "}
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
      </div>
    );
  }
}

export default AddPoiForm;
