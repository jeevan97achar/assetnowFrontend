import React from 'react';
import {
    Card, 
    Grid,
    Typography
} from '@material-ui/core';


class DashboardCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { backgroundColor, title, icon, count } = this.props; 
        
        return(
            <Card elevation={6} 
                style={{ 
                    minHeight: 175, 
                    padding: 20, 
                    background: backgroundColor ? backgroundColor : '#FFF' 
                }}>
                <Grid item xs container direction="column"
                    justify="center"
                    alignItems="center" spacing={2}>
                    <Grid item xs>
                        <Typography variant="h5" component="h5" style={{ color: "white" }}>{title}</Typography>
                    </Grid>
                    <Grid item xs>
                        {icon}
                    </Grid>
                    <Grid item >
                        <Typography variant="h2" component="h2" style={{ fontWeight: "bold", color: "white" }}>{count}</Typography>
                    </Grid>
                </Grid>
            </Card>
        )
    }
}

export default DashboardCard;