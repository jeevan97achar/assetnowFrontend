import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Util/theme';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignIn from "./Pages/SignIn/ClientSignIn"
import ClientSideNav from './Pages/ClientPages/Navigation/ClientSideNav'
import AdminSideNav from './Pages/AdminPages/Navigation/AdminSideNav'
import AnalystSidemenu from "../src/Pages/AnalystPages/AnalystSidemenu";
import NOCSignIn from "../src/Pages/SignIn/NOCSignIn"
import NOC from "../src/Pages/NOC/NOC"
function App() {
  return (
    <React.Fragment>
      {/* <Counterhooks /> */}
      <Router>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/NOC" component={NOCSignIn} />
            <Route exact path="/admin/NOC" component={NOC} />

            {/* Client Page Routes */}
            <Route exact path="/client/dashboard" component={ClientSideNav} />
            <Route exact path="/client/users" component={ClientSideNav} />
            <Route exact path="/client/profile" component={ClientSideNav} />
            <Route exact path="/client/listDevices" component={ClientSideNav} />
            <Route exact path="/client/listPOIs" component={ClientSideNav} />
            <Route exact path="/client/listZones" component={ClientSideNav} />
            <Route exact path="/client/viewAlerts" component={ClientSideNav} />
            {/* <Route exact path="/client/users/editUser/:id" component={ClientSideNav} /> */}

            <Route
              exact
              path="/client/users/editUsers/:id"
              component={ClientSideNav}
            />

          {/* Admin Page Routes */}
          <Route exact path="/admin/dashboard" component={AdminSideNav} />
          <Route exact path="/admin/users" component={AdminSideNav} />
          <Route exact path="/admin/profile" component={AdminSideNav} />
          <Route exact path="/admin/listDevices" component={AdminSideNav} />
          <Route exact path="/admin/listPOIs" component={AdminSideNav} />
          <Route exact path="/admin/listZones" component={AdminSideNav} />
          <Route exact path="/admin/viewAlerts" component={AdminSideNav} />
          <Route exact path="/admin/clients" component={AdminSideNav} />
          <Route exact path="/admin/analystView" component={AdminSideNav} />
          <Route exact path="/admin/listDeviceTypes" component={AdminSideNav} />
          <Route exact path="/admin/listObjects" component={AdminSideNav} />
          <Route exact path="/admin/users/editUser/:id" component={AdminSideNav} />
          <Route exact path="/admin/clients/payments/:id" component={AdminSideNav} />
          <Route exact path="/admin/clients/editClients/:id" component={AdminSideNav} />
          <Route exact path="/admin/clients/editLocations/:id" component={AdminSideNav} />
          <Route exact path="/admin/clients/details/:id" component={AdminSideNav} />
          <Route exact path="/admin/users/manageClients/:id" component={AdminSideNav} />
          <Route exact path="/admin/clients/details/deviceGroups/editDeviceGroups/:id" component={AdminSideNav} />
          <Route exact path="/admin/clients/details/companyUsers/editCompanyUsers/:id" component={AdminSideNav} />

            </Switch>
        </ThemeProvider>
      </Router>
      {/* <Producthooks/> */}
    </React.Fragment>
  );
}
export default App;
