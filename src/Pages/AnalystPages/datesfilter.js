import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getfilterData, post } from "../Redux/Actions/FilterActions";
import { apiHost } from "../../Util/config";
import {
  Grid,
  Button,
  FormControl,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@material-ui/core";
function Datesfilter(props) {
  const [data, setData] = useState();
  const [date, setDate] = useState([
    {
      startDate: null,
      EndDate: null,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
    },
  ]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    if (props.data.settings) {
      changedata();
      setData(props.data.settings);
    }
  }, [props.data]);
  const changedata = async () => {
    if (props.data.settings) {
      let data1 = date;
      let data2 = props.data.settings.excDays.split(",");
      data1[0]["startDate"] = props.data.settings.startDate;
      data1[0]["EndDate"] = props.data.settings.endDate;
      await data2.map((d, index) => {
        if (!date[0][d]) {
          data1[0][d] = true;
        }
      });
      setDate(data1);
      setloading(false);
    }
  };
  const handleday = async (event, day) => {
    let d = [...date];
    d[0][day] = event.target.checked;

    setDate(d);
    let myarray = "";
    ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => {
      if (d[0][day]) {
        myarray = myarray + day + ",";
      }
    });

    if (myarray.length > 0) {
      myarray = await myarray.slice(0, -1);
    } else {
      myarray = "reset";
    }
    let d1 = data;
    d1["excDays"] = await myarray;

    props.post(d1);
    setData(d1);
  };
  const handlestartDate = (e) => {
    let d = [...date];
    d[0]["startDate"] = e.target.value;
    setDate(d);
    let d1 = data;
    d1["startDate"] = e.target.value;
    props.post(d1);
    setData(d1);
  };
  const handleEndDate = (e) => {
    let d = [...date];
    d[0]["EndDate"] = e.target.value;

    setDate(d);
    let d1 = data;
    d1["endDate"] = e.target.value;
    props.post(d1);
    setData(d1);
  };
  const handleReset = () => {
    let d=data;
    d["startDate"]="reset";
    d["endDate"]="reset";
    d["excDays"]="reset"
    props.post(d)
  };
  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <Grid container justify="center" spacing={2} item xs={12}>
          <Grid item xs={12}>
            <TextField
              id="standard-helperText"
              defaultValue={date[0]["startDate"]}
              helperText="Start Date"
              type="date"
              size="small"
              fullWidth
              onChange={handlestartDate}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="standard-helperText"
              defaultValue={date[0]["EndDate"]}
              helperText="End Date"
              type="date"
              size="small"
              fullWidth
              onChange={handleEndDate}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Days Exclude Filter</FormLabel>
              <div style={{ display: "flex" }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={date[0]["mon"]}
                        name="mon"
                        onClick={(event) => handleday(event, "mon")}
                      />
                    }
                    label="Mon"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={date[0]["tue"]}
                        name="tue"
                        onClick={(event) => handleday(event, "tue")}
                      />
                    }
                    label="Tue"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={date[0]["wed"]}
                        name="wed"
                        onClick={(event) => handleday(event, "wed")}
                      />
                    }
                    label="Wed"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={date[0]["thu"]}
                        name="thu"
                        onClick={(event) => handleday(event, "thu")}
                      />
                    }
                    label="Thu"
                  />
                </FormGroup>

                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={date[0]["fri"]}
                        name="fri"
                        onClick={(event) => handleday(event, "fri")}
                      />
                    }
                    label="Fri"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={date[0]["sat"]}
                        name="sat"
                        onClick={(event) => handleday(event, "sat")}
                      />
                    }
                    label="Sat"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={date[0]["sun"]}
                        name="sun"
                        onClick={(event) => handleday(event, "sun")}
                      />
                    }
                    label="Sun"
                  />
                </FormGroup>
              </div>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" color="primary" size="small">
              Apply
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  data: state.products.data,
  loading: state.products.loading,
  error: state.products.error,
});
const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(getfilterData()),
    post: (data) => dispatch(post(data)),
    // begin: () => dispatch(fetchProductsBegin()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Datesfilter);
