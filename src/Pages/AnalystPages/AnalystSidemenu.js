import React, { useEffect, useState } from "react";
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
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import DevicesIcon from "@material-ui/icons/Devices";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import RoomIcon from "@material-ui/icons/Room";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TableChartIcon from "@material-ui/icons/TableChart";
import AddIcon from "@material-ui/icons/Add";
import AssessmentIcon from "@material-ui/icons/Assessment";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getfilterData, post } from "../Redux/Actions/FilterActions";
import { apiHost } from "../../Util/config";
import Zonefilter from "./zonefilter";
import Poifilter from "./poifilter";
import Searchfilter from "./searchfilter";
import Devicefilter from "./devicefilter";
import Datesfilter from "./datesfilter";
import { getAnalystData } from "../Redux/Actions/AnalystActons";
import datesfilter from "./datesfilter";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
const drawerWidth = 260;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "#FFF",
    color: "#015C88",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    backgroundColor: "#015C88",
    color: "#FFF",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  title: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  link: {
    textDecoration: "none",
    color: "#015C88",
    // color: theme.palette.text.primary
  },
}));
function AnalystSidemenu(props) {
  useEffect(() => {
    sessionStorage.setItem("lkl",false)
    var d = new Date();
    var n = d.getTimezoneOffset();
    props.get();
    // props.getAnalystData();
  }, []);

  const changeData = async () => {
    let dtlist = [false, false, false, false];
    let data1 = await props.data.settings.dtSelectList.split(",");
    data1.map((index) => {
      dtlist[index] = true;
    });
    setdtlist(dtlist);
  };
  useEffect(() => {
    if (props.data.settings) {
      changeData();
      setData(props.data.settings);
    }
  }, [props.data, props.data1]);
  const classes = useStyles();
   
   const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const [data, setData] = useState(props.data);
  const [dtlist, setdtlist] = useState([false, false, false, false]);
  const [SimBased, setSimBased] = useState();
  const [GpsBased, setGpsBased] = useState();
  const [AppBased, setAppBased] = useState();

  const [loading, setloading] = useState(false);
  const dataconvert = async (newArr) => {
    let myarray = "";
    await newArr.map((key, index) => {
      let n = index.toString();
      if (key === true) {
        myarray = myarray + n + ",";
      }
    });
    if (myarray.length > 0) {
      myarray = await myarray.slice(0, -1);
    } else {
      myarray = "reset";
    }
    let d = data;
    d["dtSelectList"] = await myarray;
    setData(d);
    props.post(d);
  };
  const handlesimbased = (event) => {
    let newArr = [...dtlist]; // copying the old datas array
    newArr[1] = event.target.checked;
    setdtlist(newArr);
    dataconvert(newArr);
  };
  const handleGpsbased = (event) => {
    let newArr = [...dtlist]; // copying the old datas array
    newArr[2] = event.target.checked;
    setdtlist(newArr);

    dataconvert(newArr);
  };
  const handleappbased = (event) => {
    let newArr = [...dtlist]; // copying the old datas array
    newArr[3] = event.target.checked;
    setdtlist(newArr);
    dataconvert(newArr);
  };
const handleRefresh=()=>{
  sessionStorage.setItem("lkl", false);
  props.get()
}
const handleReset=()=>{
  let d=data;
  d["startDate"]="reset";
  d["endDate"] = "reset";
  d["poiFilterChk"] = "reset";
  d["zoneFilterChk"] = "reset";
  d["searchText"] = "reset";
  d["excDays"] = "reset";
  d["timeFilter"] = "reset";
  d["alarmType"] = "reset";
  // d["dtSelectList"] = "reset";
  // d["dvSelectList"] = "reset";
  // d["dgSelectList"] = "reset";
  sessionStorage.setItem("lkl", false);
  props.post(d);

}
const handleLastKnownLocation=()=>{
sessionStorage.setItem("lkl", true);
props.get()
}
  return (
    <>
      <Grid container justify="center" spacing={2} style={{ padding: 10 }}>
        <Grid item xs={12}>
          <ButtonGroup
            fullWidth
            size="small"
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button startIcon={<RoomIcon />} onClick={props.maportable}>
              Map
            </Button>
            <Button startIcon={<TableChartIcon />} onClick={props.maportable}>Table</Button>
          </ButtonGroup>
        </Grid>

        <Grid item>
          <Typography variant="subtitle1">Filters</Typography>
        </Grid>
        <Grid item>
          <Accordion>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Device Types</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl
                component="fieldset"
                size="small"
                className={classes.formControl}
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={dtlist[1]}
                        name="sim"
                        onClick={handlesimbased}
                      />
                    }
                    label="SIM Based"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={dtlist[2]}
                        name="gps"
                        onClick={handleGpsbased}
                      />
                    }
                    label="GPS Based"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={dtlist[3]}
                        name="app"
                        onClick={handleappbased}
                      />
                    }
                    label="App Based"
                  />
                </FormGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Devices</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Devicefilter />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Dates</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Datesfilter />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Zones</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Zonefilter />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>POI</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Poifilter />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Search</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Searchfilter />
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            style={{ color: "#000", backgroundColor: "#FFF" }}
            fullWidth
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            style={{ color: "#FFF" }}
            fullWidth
            onClick={handleReset}
          >
            Clear/Reset Filter
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLastKnownLocation}
          >
            Last Know Location
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
const mapStateToProps = (state) => ({
  data: state.products.data,
  loading: state.products.loading,
  error: state.products.error,
  data1: state.AnalystData.data,
});
const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(getfilterData()),
    post: (data) => dispatch(post(data)),
    getAnalystData: () => dispatch(getAnalystData()),
    // begin: () => dispatch(fetchProductsBegin()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AnalystSidemenu);
