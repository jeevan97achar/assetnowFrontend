import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

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

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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

import Users from "../SystemAdmin/Users";
import Profile from "../SystemAdmin/Profile";
import ListDevices from "../DeviceAdmin/ListDevices";
import ListPOIs from "../MapAdmin/ListPOIs";
import ListZones from "../MapAdmin/ListZones";
import ViewAlerts from "../Alerts/ViewAlerts";
import DashboardPage from "../Dashboard/Dashboard";
import EditUser from "../SystemAdmin/editUsers";
import AnalystSidemenu from "../../AnalystPages/AnalystSidemenu";
import { Dashboard } from "@material-ui/icons";
import AnalystMap from "../../AnalystPages/AnalystMap";
import AnalystTable from "../../AnalystPages/AnalystTable";
import { logout } from "../../../Network/network";

const drawerWidth = 260;

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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

const names = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [SystemAdminOpen, setSystemAdminOpen] = React.useState(false);
  const [DeviceAdminOpen, setDeviceAdminOpen] = React.useState(false);
  const [MapAdminOpen, setMapAdminOpen] = React.useState(false);
  const [AlertsOpen, setAlertsOpen] = React.useState(false);
  const [mapview, setmapview] = React.useState();
  const [AdminViewFlag, setAdminViewFlag] = React.useState(false);

  const handleAdminViewButtonClick = () => {
    setAdminViewFlag(!AdminViewFlag);
  };

  const handleSystemAdminOpenClick = () => {
    setSystemAdminOpen(!SystemAdminOpen);
  };

  const handleDeviceAdminOpenClick = () => {
    setDeviceAdminOpen(!DeviceAdminOpen);
  };

  const handleMapAdminOpenClick = () => {
    setMapAdminOpen(!MapAdminOpen);
  };

  const handleAlertsOpenClick = () => {
    setAlertsOpen(!AlertsOpen);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogoutClick = () => {
    logout()
      .then((response) => {
        sessionStorage.clear();
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const maportableview = () => {
    setmapview(!mapview);
  };

  const user = JSON.parse(sessionStorage.getItem('user'));

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap className={classes.title}>
              Performance &amp; Asset Tracking System Client
            </Typography>

            {AdminViewFlag ? (
              <>
                <Link to="/client/dashboard" className={classes.link}>
                  <Button
                    onClick={handleAdminViewButtonClick}
                    color="inherit"
                    size="small"
                    style={{
                      padding: 10,
                      color: "#FFF",
                      backgroundColor: "#015C88",
                    }}
                  >
                    Admin View
                  </Button>
                </Link>
              </>
            ) : (
                <>
                  <Link to="/client/analystView" className={classes.link}>
                    <Button
                      onClick={handleAdminViewButtonClick}
                      color="inherit"
                      size="small"
                      style={{
                        padding: 10,
                        color: "#FFF",
                        backgroundColor: "#015C88",
                      }}
                    >
                      Analyst View
                  </Button>
                  </Link>
                </>
              )}

            <Button
              onClick={handleLogoutClick}
              color="inherit"
              size="small"
              variant="outlined"
              startIcon={<PowerSettingsNewIcon />}
              style={{
                padding: 10,
                color: "#FFF",
                backgroundColor: "#015C88",
              }}
            >
              Logout
                    </Button>

            {/* <IconButton color="inherit" onClick={handleLogoutClick}>
              <ExitToAppIcon />
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <Grid
              container
              justify={!AdminViewFlag ? "space-between" : "flex-end"}
              spacing={1}
              style={{ padding: 20 }}
            >
              {!AdminViewFlag ? (
                <Grid item>
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    className={classes.large}
                  />
                </Grid>
              ) : (
                  <div />
                )}

              <Grid item xs={2}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon style={{ color: "#FFF" }} />
                  ) : (
                      <ChevronRightIcon style={{ color: "#FFF" }} />
                    )}
                </IconButton>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Welcome {capitalizeFirstLetter(sessionStorage.getItem('username'))}!</Typography>
              </Grid>

            </Grid>
          </div>

          {/* <Divider /> */}

          {AdminViewFlag ? (
            <>
              <AnalystSidemenu maportable={maportableview} />
            </>
          ) : (
              <>
                <List>
                  <Link to="/client/dashboard" className={classes.link}>
                    <ListItem button>
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary="Dashboard" />
                      <ChevronRightIcon />
                    </ListItem>
                  </Link>

                  <ListItem button onClick={handleSystemAdminOpenClick}>
                    <ListItemIcon>
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="System Admin" />
                    {SystemAdminOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={SystemAdminOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {(user.rolename !== 'ClientUser') && (
                        <Link to="/client/users" className={classes.link}>
                          <ListItem button className={classes.nested}>
                            <ListItemIcon>
                              <ArrowRightIcon fontSize="large" />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                          </ListItem>
                        </Link>
                      )}
                      <Link to="/client/profile" className={classes.link}>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <ArrowRightIcon fontSize="large" />
                          </ListItemIcon>
                          <ListItemText primary="Profile" />
                        </ListItem>
                      </Link>
                    </List>
                  </Collapse>

                  <ListItem button onClick={handleDeviceAdminOpenClick}>
                    <ListItemIcon>
                      <DevicesIcon />
                    </ListItemIcon>
                    <ListItemText primary="Device Admin" />
                    {DeviceAdminOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={DeviceAdminOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <Link to="/client/listDevices" className={classes.link}>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <ArrowRightIcon fontSize="large" />
                          </ListItemIcon>
                          <ListItemText primary="List Devices" />
                        </ListItem>
                      </Link>
                    </List>
                  </Collapse>

                  <ListItem button onClick={handleMapAdminOpenClick}>
                    <ListItemIcon>
                      <RoomIcon />
                    </ListItemIcon>
                    <ListItemText primary="Map Admin" />
                    {MapAdminOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={MapAdminOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <Link to="/client/listPOIs" className={classes.link}>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <ArrowRightIcon fontSize="large" />
                          </ListItemIcon>
                          <ListItemText primary="List POIs" />
                        </ListItem>
                      </Link>

                      <Link to="/client/listZones" className={classes.link}>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <ArrowRightIcon fontSize="large" />
                          </ListItemIcon>
                          <ListItemText primary="List Zones" />
                        </ListItem>
                      </Link>
                    </List>
                  </Collapse>

                  <ListItem button onClick={handleAlertsOpenClick}>
                    <ListItemIcon>
                      <AnnouncementIcon />
                    </ListItemIcon>
                    <ListItemText primary="Alerts" />
                    {AlertsOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={AlertsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <Link to="/client/viewAlerts" className={classes.link}>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <ArrowRightIcon fontSize="large" />
                          </ListItemIcon>
                          <ListItemText primary="View Alerts" />
                        </ListItem>
                      </Link>
                    </List>
                  </Collapse>
                </List>
              </>
            )}
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          {/* <div className={classes.drawerHeader} /> */}
          <Toolbar />
          <Switch>
            <Route exact path="/client/dashboard">
              <Container>
                <DashboardPage />
              </Container>
            </Route>

            <Route exact path="/client/users">
              <Container>
                <Users />
              </Container>
            </Route>

            <Route exact path="/client/profile">
              <Container>
                {/* <Grid container */}
                <Profile />
              </Container>
            </Route>
            <Route exact path="/client/analystView">
              <Container>
                {mapview ? <AnalystTable /> : <AnalystMap />}
              </Container>
            </Route>
            <Route exact path="/client/listDevices">
              <Container>
                <ListDevices />
              </Container>
            </Route>

            <Route exact path="/client/listPOIs">
              <Container>
                <ListPOIs />
              </Container>
            </Route>

            <Route exact path="/client/listZones">
              <Container>
                <ListZones />
              </Container>
            </Route>

            <Route exact path="/client/viewAlerts">
              <Container>
                <ViewAlerts />
              </Container>
            </Route>

            <Route exact path="/client/users/editUsers/:id">
              <Container>
                <EditUser />
              </Container>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
