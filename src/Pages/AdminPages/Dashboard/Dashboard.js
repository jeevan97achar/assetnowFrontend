import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import PinDropIcon from '@material-ui/icons/PinDrop';

import { getDashboardStat } from '../../../Network/network';
import DashboardCard from '../../../Components/dashboard-card/dashboard-card';

const styles = theme => ({
})

class index extends React.Component {
    state = {
        DashboardCounts: "",
    }

    async componentDidMount() {
        let username = sessionStorage.getItem('username');
        console.log("SESSION_STORAGE:", sessionStorage);
        console.log("Session Storage:", JSON.parse(sessionStorage.client))
        let data = await getDashboardStat(username);
        this.setState({
            DashboardCounts: data[0]
        })
    }

    render() {
        const { classes } = this.props;
        const DashboardCounts = this.state.DashboardCounts;

        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    spacing={3}
                >
                    <Grid item xs={3}>
                        <DashboardCard
                            title='Client' 
                            backgroundColor='#651fff' 
                            icon={<PinDropIcon style={{ color: "white" }} />}
                            count={DashboardCounts.client_count ? DashboardCounts.client_count : 0 }
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <DashboardCard
                            title='Devices' 
                            backgroundColor='#00b0ff'
                            icon={<SupervisorAccountIcon style={{ color: "white" }} />}
                            count={DashboardCounts.device_count ? DashboardCounts.device_count : 0}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <DashboardCard
                            title='Alerts' 
                            backgroundColor='#1de9b6'
                            icon={<VpnKeyIcon style={{ color: "white" }} />}
                            count={DashboardCounts.alert_count ? DashboardCounts.alert_count : 0}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <DashboardCard
                            title='System Statistics' 
                            backgroundColor='#ff9800'
                            icon={<WorkOutlineIcon style={{ color: "white" }} />}
                            count={DashboardCounts.system_stats ? DashboardCounts.system_stats : 0}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <DashboardCard
                            title='Revenue Statistics' 
                            backgroundColor='#ff9800'
                            icon={<WorkOutlineIcon style={{ color: "white" }} />}
                            count={DashboardCounts.revenue_stats ? DashboardCounts.revenue_stats : 0}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(index);
