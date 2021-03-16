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
  Box,
  Typography,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 150,
    maxHeight: 100,
  },
});
function Searchfilter(props) {
  const classes = useStyles();
  const [data, setData] = useState();
  const [address, setaddress] = useState("");
  const [alarmtype, setalarmtype] = useState("");
  const [loading, setloading] = useState(true);
  const [time, settime] = useState([]);
  const [alltime, setalltime] = useState(false);
  useEffect(() => {
    let t = [];
    for (let i = 0; i < 24; i++) {
      t.push({
        checkbox: false,
      });
    }
    settime(t);
    if (props.data.settings) {
      changedata();
      setData(props.data.settings);
    }
  }, [props.data]);
  const changedata = async () => {
    if (props.data.settings) {
      let data1 = time;
      let data2 = props.data.settings.timeFilter.split(",");
      if (props.data.settings.searchText !== "reset") {
        setaddress(props.data.settings.searchText);
      }
      if (props.data.settings.alarmType !== "reset") {
        setalarmtype(props.data.settings.alarmType);
      }
      if (props.data.settings.timeFilter !== "reset") {
        await data2.map((d, index) => {
          data1[parseInt(d) - 1].checkbox = true;
        });
        settime(data1);
      }
      setloading(false);
    }
  };
  const handleaddress = (e) => {
    setaddress(e.target.value);
    let addressedit = data;
    addressedit["searchText"] = e.target.value;
    setData(addressedit);
  };
  const handlealarmtype = (e) => {
    setalarmtype(e.target.value);
    let alarmtypeedit = data;
    alarmtypeedit["alarmType"] = e.target.value;
    setData(alarmtypeedit);
  };
  const handletime = async (e, index) => {
    let timeFilter = [...time];
    timeFilter[index]["checkbox"] = e.target.checked;
    settime(timeFilter);
    if (e.target.checked === false) {
      setalltime(e.target.checked);
    }
    let timestring = "";
    for (let i = 0; i < 24; i++) {
      if (timeFilter[i]["checkbox"]) {
        let j = i + 1;
        timestring = timestring + j + ",";
      }
    }
    if (timestring.length === 0) {
      timestring = "reset";
    } else {
      timestring = await timestring.slice(0, -1);
    }
    let d = data;
    d["timeFilter"] = timestring;
    setData(d);
  };
  const handlealltime = async (e) => {
    setalltime(e.target.checked);
    let t = [];
    for (let i = 0; i < 24; i++) {
      t.push({
        checkbox: true,
      });
    }
    settime(t);
    let timestring = "";
    for (let i = 0; i < 24; i++) {
      if (t[i]["checkbox"]) {
        let j = i + 1;
        timestring = timestring + j + ",";
      }
    }
    if (timestring.length === 0) {
      timestring = "reset";
    } else {
      timestring = await timestring.slice(0, -1);
    }
    let d = data;
    d["timeFilter"] = timestring;
    setData(d);
  };
  const handleget = () => {
    props.post(data);
  };
  const handleReset=()=>{
    let d=data;
    d["timeFilter"]="reset";
    d["searchText"] = "reset";
    d["alarmType"] = "reset";
    props.post(d);
  }
  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <Grid container justify="center" spacing={2} item xs={12}>
          <Grid item xs={12}>
            <TextField
              label="Address"
              multiline
              rows={3}
              variant="outlined"
              fullWidth
              defaultValue={address}
              value={address}
              onChange={handleaddress}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" gutterBottom>
              Select all times
            </Typography>
            <FormControl component="fieldset" size="small">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultValue={alltime}
                      checked={alltime}
                      name="insideZones"
                      onClick={(event) => handlealltime(event)}
                    />
                  }
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Box py={2}>
            <Grid item xs={12} style={{ height: "250px", overflow: "scroll" }}>
              <TableContainer>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableBody>
                    {time.map((time, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="right">
                          <FormControl component="fieldset" size="small">
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={time.checkbox}
                                    name="insideZones"
                                    onClick={(event) =>
                                      handletime(event, index)
                                    }
                                  />
                                }
                                //   label={index}
                              />
                            </FormGroup>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Box>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel id="demo-simple-select-outlined-label">
                Alarm Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                defaultValue={alarmtype}
                value={alarmtype}
                onChange={handlealarmtype}
                label="Alarm type"
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={"Any"}>All Data</MenuItem>
                <MenuItem value={"PoI"}>POI Alerts Only</MenuItem>
                <MenuItem value={"zone"}>Zone Alerts Only</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleget}
            >
              Apply
            </Button>
          </Grid>

          <Grid item>
            <Button variant="contained" color="primary" size="small" onClick={handleReset}>
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Searchfilter);
