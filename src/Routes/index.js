import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SummaryDashBoard from "../Pages/SummaryDashBoard";
import Login from "../Pages/Login";
import SideNav from "../Navigation/SideNav";


function Routes() {
  return (
              <BrowserRouter>
                <Switch>
                  <Route path="/" exact component={Login} />

                  <SideNav>

                    <Route
                      path="/summary-dashboard"
                      exact
                      component={SummaryDashBoard}
                    />

                  </SideNav>

                  <Route component={SideNav} />
                </Switch>
              </BrowserRouter>
  );
}

export default Routes;
