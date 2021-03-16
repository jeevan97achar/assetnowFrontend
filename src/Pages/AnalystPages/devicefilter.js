import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { getfilterData, post } from "../Redux/Actions/FilterActions";
import { apiHost } from "../../Util/config";
import {
  Grid,
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
  Box,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { locateapi } from "../Redux/Actions/AnalystActons";
const useStyles = makeStyles({
  table: {
    minWidth: 150,
    maxHeight: 100,
  },
});
const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        //This can be referred from Material UI API documentation.
        padding: "0px 0px",
        backgroundColor: "#eaeaea",
      },
      paddingNone: {
        padding: "none",
      },
    },
  },
});
function Devicefilter(props) {
  const classes = useStyles();
  const [devicegroup, setDeviceGroup] = useState([]);
  const [devices, setDevices] = useState([]);
  const [data, setData] = useState();
  const [devicegroupeditdata, setdevicegroupeditdata] = useState();
  const [deviceeditdata, setdeviceeditdata] = useState();
  const [loading, setloading] = useState(true);
  const [poi, setpoi] = useState([]);
  const [finaldevicedata, setfinaldevicedata] = useState();
  const [showdevices, setShowDevices] = useState([]);
  const [dtName, setdtName] = useState();
  useEffect(() => {}, []);
  useEffect(() => {
    if (props.data.settings) {
      setData(props.data.settings);
      setdtName(props.data.settings.dtSelectList);
      var d = new Date();
      var n = d.getTimezoneOffset();
      getdevices();
    }
  }, [props.data]);
  const getdevices = async () => {
    let token = sessionStorage.getItem("token");
    let userType = sessionStorage.getItem("userType");
    let user = sessionStorage.getItem("username");
    let username = sessionStorage.getItem("username");
    let lkl = sessionStorage.getItem("lkl");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

    var formdata = new FormData();
    formdata.append("user", user);
    formdata.append("dtName", props.data.settings.dtSelectList);
    formdata.append("lkl", lkl);
    // if (userType === "client") {
    //   formdata.append("userType", userType);
    // }
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(apiHost + "/webapi/device_sb_view", requestOptions)
      .then((response) => {
        response.json().then((result) => {
          setDevices(result);

          initarr1(result);
        });
      })
      .catch((error) => console.log("error", error));
  };
  const initarr1 = async (device) => {
    let arr = [];

    let keys = Object.keys(device.dgList);
    let values = Object.values(device.dgList);
    await values.map((val, index) => {
      let dev = val[0];
      dev.map((device) => {
        arr.push({
          deviceid: device.id,
          devicegroupid: keys[index],
          devicename: device.name,
          value: false,
        });
      });
    });
    changedeviceData(arr);
  };
  const changedeviceData = async (device) => {
    if (props.data.settings) {
      let data2 = await props.data.settings.dvSelectList.split(",");
      await data2.map((d, index) => {
        device.map((z, index1) => {
          if (z.deviceid == d) {
            device[index1].value = true;
          }
        });
      });
    }
    setdeviceeditdata(device);
    let finaldata = await removeduplicates(device);
    setfinaldevicedata(finaldata);
    getdevicegroup();
  };
  const getdevicegroup = async () => {
    // setloading(true);
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
        "/webapi/device_group_view?company_id=" +
        user.company +
        "&userType=" +
        userType,
      requestOptions
    )
      .then((response) => {
        response.json().then((result) => {
          setDeviceGroup(result);
          // console.log(result)
          initarr(result);
        });
      })

      .catch((error) => console.log("error", error));

    // setloading(true);
  };
  const removeduplicates = (data) => {
    const seen = new Set();
    const filteredArr = data.filter((el) => {
      const duplicate = seen.has(el.deviceid);
      seen.add(el.deviceid);
      return !duplicate;
    });
    // for(let i=0;i<devicecheck.Devices.length;i++){
    //   for(let j=0;j<filteredArr.length;j++){

    //     if(devicecheck.Devices.id!==filteredArr[j].deviceid){

    //     }
    //   }
    // }
    return filteredArr;
  };
  const initarr = async (devicegroup1) => {
    let arr = [];
    let arr1 = [];
    await devicegroup1.map((poi, index) => {
      arr.push({ id: poi.id, name: poi.group_name, value: false });
      arr1.push(false);
    });
    setShowDevices(arr1);
    changeData(arr);
  };
  const changeData = async (devicegroup1) => {
    if (props.data.settings) {
      let data2 = await props.data.settings.dgSelectList.split(",");
      await data2.map((d, index) => {
        let d1 = d;
        devicegroup1.map((z, index1) => {
          if (z.name == d) {
            devicegroup1[index1].value = true;
          }
        });
      });
    }

    setdevicegroupeditdata(devicegroup1);

    setloading(false);
  };
  const handledevicegroup = async (e, dg, index) => {
    let devicegroup = [...devicegroupeditdata];
    devicegroup[index].value = e.target.checked;
    let devicegroupdataid = devicegroup[index].id;
    let devices = [...deviceeditdata];
    
    await devices.map((device, index) => {
      

      
      if (devices[index].devicegroupid == devicegroupdataid) {

        devices[index].value = e.target.checked;
      }
    
    });
    await setdeviceeditdata(devices);
    setdevicegroupeditdata(devicegroup);
    convertdata(devicegroup,devices);
  };

  const convertdata = async (newArr,devices) => {
    let myarray = "";
    await newArr.map((key) => {
      if (key.value === true) {
        myarray = myarray + key.name + ",";
      }
    });
    if (myarray.length > 0) {
      myarray = await myarray.slice(0, -1);
    } else {
      myarray = "reset";
    }

    
    let myarray1 = "";
    await devices.map((key) => {
      if (key.value === true) {
        myarray1 = myarray1 + key.deviceid + ",";
      }
    });
    if (myarray1.length > 0) {
      myarray1 = await myarray1.slice(0, -1);
    } else {
      myarray1 = "reset";
    }
    let d = data;
    d["dgSelectList"] = await myarray;
    d["dvSelectList"] = await myarray1;
    setData(d);
    props.post(d);
  };
  const handledevice = (e, d, index) => {
    let device = [...deviceeditdata];
    device[index].value = e.target.checked;
    let deviceedata = [...finaldevicedata];
    for (let i = 0; i < deviceedata.length; i++) {
      if (deviceedata[i]["deviceid"] == d.deviceid) {
        deviceedata[i].value = e.target.checked;
      }
    }
    setfinaldevicedata(deviceedata);
    setdeviceeditdata(device);
    convertdevicedata(deviceedata);
  };

  const convertdevicedata = async (newArr) => {
    let myarray = "";
    await newArr.map((key) => {
      if (key.value === true) {
        myarray = myarray + key.deviceid + ",";
      }
    });
    if (myarray.length > 0) {
      myarray = await myarray.slice(0, -1);
    } else {
      myarray = "reset";
    }
    let d = data;
    d["dvSelectList"] = await myarray;
    setData(d);
    props.post(d);
  };
  const handlelocate = (device) => {
    props.getlocateapi(device.deviceid);
  };
  const handleshow = async (index) => {
    let arr = [...showdevices];
    arr[index] = !arr[index];
    await setShowDevices(arr);
  };
  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        devicegroupeditdata.map((devicegroup, index) => (
          <Box py={1} key={index}>
            <ButtonGroup
              disableElevation
              variant="contained"
              color="primary"
              aria-label="split button"
            >
              <Button
                style={{ minWidth: "130px", maxWidth: "130px" }}
                onClick={() => handleshow(index)}
              >
                {devicegroup.name}
              </Button>
              <Button
                disableElevation={true}
                disableFocusRipple={true}
                disableRipple={true}
              >
                <FormControl component="fieldset" size="small">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={devicegroup.value}
                          // name="insideZones"
                          onClick={(event) =>
                            handledevicegroup(event, devicegroup, index)
                          }
                        />
                      }
                      // label={poi.poi_name}
                    />
                  </FormGroup>
                </FormControl>
              </Button>
            </ButtonGroup>
            {showdevices[index] ? (
              <Grid
                item
                xs={8}
                style={{
                  maxHeight: "250px",
                  overflow: "auto",
                  maxWidth: "220px",
                }}
              >
                <ThemeProvider theme={theme}>
                  <TableContainer>
                    <Table
                      // className={classes.table}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableBody>
                        {deviceeditdata.map((device, index1) =>
                          device.devicegroupid == devicegroup.id ? (
                            <>
                              <TableRow key={index}>
                                <TableCell align="left" style={{ width: 50 }}>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    {device.devicename}
                                  </Typography>
                                </TableCell>
                                <TableCell align="left" style={{ width: 50 }}>
                                  <FormControl
                                    component="fieldset"
                                    size="small"
                                  >
                                    <FormGroup>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={device.value}
                                            name="insideZones"
                                            onClick={(event) =>
                                              handledevice(
                                                event,
                                                device,
                                                index1
                                              )
                                            }
                                          />
                                        }
                                        //   label={index}
                                      />
                                    </FormGroup>
                                  </FormControl>
                                </TableCell>
                                <TableCell align="left" style={{ width: 50 }}>
                                  <Button
                                    size="small"
                                    variant="contained"
                                    onClick={(event) => handlelocate(device)}
                                  >
                                    {" "}
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      Locate
                                    </Typography>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </>
                          ) : null
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ThemeProvider>
              </Grid>
            ) : null}
          </Box>
        ))
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
    getlocateapi: (data) => dispatch(locateapi(data)),
    // begin: () => dispatch(fetchProductsBegin()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Devicefilter);
