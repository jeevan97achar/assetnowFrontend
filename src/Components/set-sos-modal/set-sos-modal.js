import React from 'react';
import {
    Dialog,
    DialogContent,
    AppBar,
    Toolbar,
    Grid,
    TextField,
    Typography,
    IconButton,
    withStyles,
    Button
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { setSosTime } from '../../Network/network';
import { getErrorMessage } from '../../Util/helper';

const styles = (theme) => ({
    container:{
        width: '40%',
        align: 'center',
    },
});


class SosModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id: this.props.deviceId,
            time: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);

    }

    handleChange(e){
        let name = e.target.name,
        value = e.target.value;

        this.setState({
            [name] : value
        })
    }

    async submitForm(){
        try{
            let { id, time } = this.state;
            let response = await setSosTime(id, time);
            this.props.setAlert('success', 'SOS set successfully')
            this.props.onClose();
        }catch(error){
            console.log(error);
            let message = getErrorMessage(error);
            this.props.setAlert('error', message);
        }
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
                                        Set SOS Time
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
                        <Grid container justify='center' alignItems='center' style={{padding: 20}} >
                            <Grid item xs={5}>Input the Total Time Interval</Grid>
                            <Grid item xs={7}>
                                <TextField
                                    id="time"
                                    name='time'
                                    label="Interval in hrs"
                                    variant="filled"
                                    fullWidth
                                    value={this.state.time}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item container justify='center' spacing={3} xs={12} style={{paddingTop: 20}}>
                                <Grid item>
                                    <Button variant='contained' color='primary' onClick={this.submitForm}> Apply </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>                                                    
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(SosModal);