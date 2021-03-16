import React from 'react';
import {
    Dialog,
    DialogContent,
    AppBar,
    Toolbar,
    Grid,
    Typography,
    IconButton,
    withStyles
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import TrackDeviceForm from './track-device-form';

const styles = (theme) => ({
    container:{
        width: '40%',
        align: 'center',
    },
});


class TrackDevicePane extends React.Component{
    constructor(props){
        super(props)
        
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
                <Dialog
                    aria-labelledby='track-device-dialog'
                    open={this.props.open}
                    classes={{
                        paper: classes.container,
                    }}
                > 
                    <AppBar position='static'>
                        <Toolbar>
                            <Grid
                                justify='space-between'
                                container
                            >
                                <Grid item xs={11}>
                                    <Typography
                                        variant='h5'
                                        color='inherit'
                                    >
                                        Tracking Parameters
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton
                                        aria-label='close'
                                        color='inherit'
                                        onClick={this.props.onClose}
                                    >
                                        <Close />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>    
                        <TrackDeviceForm deviceId={this.props.deviceId} onClose={this.props.onClose} setAlert={this.props.setAlert} />
                    </DialogContent>                                                    
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(TrackDevicePane);