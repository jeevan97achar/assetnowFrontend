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

// import Map from '../maps/mapbox-maps/mapbox-maps';  

const styles = (theme) => ({
    container:{
        width: '40%',
        align: 'center',
    },
});


class SetSOSTime extends React.Component{
    constructor(props){
        super(props)
        
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
                <Dialog
                    aria-labelledby='map-preview-dialog'
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
                                        Preview
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
                        {/* <Map 
                            markers={this.props.markers} 
                            poiMode={this.props.poiMode} 
                            zoneMode={this.props.zoneMode} 
                        /> */}
                    </DialogContent>                                                    
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(MapPreview);