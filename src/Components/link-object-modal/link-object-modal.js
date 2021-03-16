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
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { linkObjectToAsset } from '../../Network/network';
import { getErrorMessage } from '../../Util/helper';

const styles = (theme) => ({
    container:{
        width: '40%',
        align: 'center',
    },
});

class LinkObjectModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            objects: this.props.objects,
            deviceId: this.props.deviceId,
            objectId: null,
            objectType: null,
            objectName: null,
            linkId: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.setObjectId = this.setObjectId.bind(this);
        this.submitForm = this.submitForm.bind(this);
        
    }

    setObjectId(){
        let objectId = null;
        this.state.objects.forEach(object => {
            if(this.state.objectType === object.objectType &&
                this.state.objectName === object.objectName){
                objectId = object.objectId 
            }
        })
        this.setState({
            objectId: objectId
        })
    }

    handleChange(e){
        let name = e.target.name,
        value = e.target.value;

        this.setState({
            [name] : value
        }, () => {
            this.setObjectId();
        })
    }

    async submitForm(){
        try{
            let { deviceId, objectId } = this.state;
            let response = await linkObjectToAsset(objectId, deviceId) ;
            this.props.setAlert('success', 'Object Linked Successfully')
            this.props.onClose();
        }catch(error){
            console.log(error);
            let message = getErrorMessage(error);
            this.props.setAlert('error', message);
        }
    }

    componentDidMount(){
        //console.log(this.props)
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
                                        Link Object
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
                        <Grid container justify='center' alignItems='center' spacing={2} style={{padding: 20}} >
                            <Grid item xs={3}>Object Type</Grid>
                            <Grid item xs={9}>
                                <FormControl variant="outlined" fullWidth size='small'>
                                    <InputLabel id="objectType">Object Type</InputLabel>
                                    <Select
                                        labelId="objectType"
                                        id="objectType"
                                        name='objectType'
                                        value={this.state.objectType}
                                        onChange={this.handleChange}
                                    >
                                        {this.state.objects.map(object => (
                                            <MenuItem value={object.objectType} >{object.objectType}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>Object Name</Grid>
                            <Grid item xs={9}>
                                <FormControl variant="outlined" fullWidth size='small'>
                                    <InputLabel id="objectName">Object Name</InputLabel>
                                    <Select
                                        labelId="objectName"
                                        id="objectName"
                                        name='objectName'
                                        value={this.state.objectName}
                                        onChange={this.handleChange}
                                    >
                                        {this.state.objects.map(object => (
                                            <MenuItem value={object.objectName} >{object.objectName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>Enter Id</Grid>
                            <Grid item xs={9}>
                                <TextField
                                    id="linkId"
                                    name='linkId'
                                    label="Enter Id"
                                    variant="filled"
                                    fullWidth
                                    value={this.state.linkId}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item container justify='center' spacing={3} xs={12} style={{paddingTop: 20}}>
                                <Grid item>
                                    <Button variant='contained' color='primary' onClick={this.submitForm}> Link Object </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>                                                    
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(LinkObjectModal);