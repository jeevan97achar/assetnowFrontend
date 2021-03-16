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
  Typography,
} from "@material-ui/core";
function Zonefilter(props) {
  const [zonedata, setzonedata] = useState([]);
  const [data, setData] = useState();
  const [zoneeditdata, setzoneeditdata] = useState();
  const [loading, setloading] = useState(false);
  const [zones, setzones] = useState([]);
  const [zonein, setzonein] = useState();
  const [zoneout, setzoneout] = useState();
  const [showzone, setshowzone] = useState();
  const convertdata = async (newArr) => {
    let myarray = "";
    await newArr.map((key) => {
      let n = key["id"].toString();
      if (key.value === true) {
        myarray = myarray  + n + ",";
      }
    });
    if (myarray.length > 0) {
      myarray = await myarray.slice(0, -1);
    } else {
      myarray = "reset";
    }
    let d = data;
    // console.log({ myarray });
    d["zoneFilterChk"] = await myarray;
    setData(d);
    props.post(d);
  };
  const handlezones = (event, index, zone) => {
    let newarr = [...zonedata];
    newarr[index].value = event.target.checked;
    // console.log(newarr);
    setzonedata(newarr);
    convertdata(newarr);
  };
  const initarr = async (zone) => {
    let arr = [];
    if(zone.length!==0&&zone!=="Unavailable Zone"){
      await zone.map((zone, index) => {
        arr.push({ id: zone.id, value: false });
      });
      setzonedata(arr);
      changeData(arr);
    }
  };
  const getzones = async () => {
    let token = sessionStorage.getItem("token");
    let userType = sessionStorage.getItem("userType");
    let user = JSON.parse(sessionStorage.getItem("user"));
    let username = sessionStorage.getItem("username");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

    var formdata = new FormData();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      apiHost +
        "/webapi/zone?client=" +
        username +
        "&userType=" +
        userType +
        "&company_id=" +
        user.company,
      requestOptions
    )
      .then((response) => {
        response.json().then((result) => {
          setzones(result);
          // console.log(result)
          initarr(result);
        });
      })

      .catch((error) => console.log("error", error));

    // setloading(true);
  };
  const changeData = async (zonedata1) => {
    // console.log(props.data.settings);
    if (props.data.settings) {
      let data2 = await props.data.settings.zoneFilterChk.split(",");
      // console.log(data2);
      await data2.map((d, index) => {
        let d1 = d;
        // d1=d1.subString(18)
        //  data2[index] = d1.slice(19);
        // console.log(d.slice(19));
        zonedata1.map((z, index1) => {
          if (z.id == d) {
            zonedata1[index1].value = true;
          }
        });
      });

      setzonedata(zonedata1);
      setzoneeditdata(data2);
    }
    // console.log(zonedata1,zonedata,zones);
    setloading(true);
  };
  useEffect(() => {
    if (props.data.settings) {
      changezoneinoutdata();

      getzones();

      setData(props.data.settings);
      var d = new Date();
      var n = d.getTimezoneOffset();
      //   console.log("timezoneoffset", n);
    }
  }, [props.data]);
  const changezoneinoutdata = async () => {
    let zoneinfilter = await props.data.settings.ZoneInFilterCmd;
    let zoneoutfilter = await props.data.settings.ZoneOutFilterCmd;
    let showzonefilter = await props.data.settings.ZoneShapeFilterCmd;
    if (zoneinfilter === "on") {
      setzonein(true);
    } else {
      setzonein(false);
    }
    if (zoneoutfilter === "on") {
      setzoneout(true);
    } else {
      setzoneout(false);
    }
    if (showzonefilter === "on") {
      setshowzone(true);
    } else {
      setshowzone(false);
    }
  };
  const handlezonein = async (event) => {
    setzonein(event.target.checked);
    let zoneinfilter = "";
    if (event.target.checked) {
      zoneinfilter = "on";
    } else {
      zoneinfilter = "off";
    }
    let d = data;
    d["ZoneInFilterCmd"] = await zoneinfilter;
    setData(d);
    props.post(d);
  };
  const handlezoneout = async (event) => {
    setzoneout(event.target.checked);
    let zoneoutfilter = "";
    if (event.target.checked) {
      zoneoutfilter = "on";
    } else {
      zoneoutfilter = "off";
    }
    let d = data;
    d["ZoneOutFilterCmd"] = await zoneoutfilter;
    setData(d);
    props.post(d);
  };
  const handleshowzone = async (event) => {
    setshowzone(event.target.checked);
    let showzonefilter = "";
    if (event.target.checked) {
      showzonefilter = "on";
    } else {
      showzonefilter = "off";
    }
    let d = data;
    d["ZoneShapeFilterCmd"] = await showzonefilter;
    setData(d);
    props.post(d);
  };
  const handleReset = () => {
    let d = data;
    d["ZoneInFilterCmd"] = "reset";
    d["ZoneOutFilterCmd"] = "reset";
    d["ZoneShapeFilterCmd"] = "reset";
    d["zoneFilterChk"] = "reset";
    props.post(d);
  };
  return (
    <div>
      <Grid item container justify="center" spacing={1} xs={12}>
        <Grid item xs={12}>
          {loading ? (
            <>
              <FormControl component="fieldset" size="small">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={zonein}
                        name="insideZones"
                        onClick={(event) => handlezonein(event)}
                      />
                    }
                    label={"filter when inside zone"}
                    labelPlacement="start"
                  />
                </FormGroup>
              </FormControl>

              <FormControl
                component="fieldset"
                size="small"
                // className={classes.formControl}
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={zoneout}
                        name="insideZones"
                        onClick={(event) => handlezoneout(event)}
                      />
                    }
                    label={"filter when outside zone"}
                    labelPlacement="start"
                  />
                </FormGroup>
              </FormControl>

              <FormControl
                component="fieldset"
                size="small"
                // className={classes.formControl}
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={showzone}
                        name="insideZones"
                        onClick={(event) => handleshowzone(event)}
                      />
                    }
                    label={"show zone"}
                    labelPlacement="start"
                  />
                </FormGroup>
              </FormControl>

              {zones.map((zone, index) => (
                <div key={index}>
                  <FormControl
                    component="fieldset"
                    size="small"
                    // className={classes.formControl}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={zonedata[index].value}
                            name="insideZones"
                            onClick={(event) => handlezones(event, index, zone)}
                          />
                        }
                        label={zone.zone_name}
                      />
                    </FormGroup>
                  </FormControl>
                </div>
              ))}
            </>
          ) : (
            <p>loading...</p>
          )}
        </Grid>

        <Grid item xs={12}></Grid>

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
export default connect(mapStateToProps, mapDispatchToProps)(Zonefilter);
