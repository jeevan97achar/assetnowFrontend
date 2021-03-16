import React from 'react';
import {
    Grid,
    FormControl,
    InputLabel,
    FormHelperText,
    Select,
    MenuItem,
    TextField,
    Checkbox,
    Button,
    Typography
} from '@material-ui/core';
import { setTrackParameter, setSosTime } from '../../Network/network';
import { getErrorMessage } from '../../Util/helper';

const TrackingType = [
    {id: 1, name: 'Auto Track', value: 'Auto'},
    {id: 2, name: 'Manual', value: 'Manual'},
    {id: 3, name: 'SOS', value: 'sos'}
]

class TrackDeviceForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.deviceId,
            type: 'Auto',
            interval: 0,
            timefilter1: 'off',
            timefilter2: 'off',
            timefilter3: 'off',
            timefilter4: 'off',
            timefilter5: 'off',
            timefilter6: 'off',
            timefilter7: 'off',
            timefilter8: 'off',
            timefilter9: 'off',
            timefilter10: 'off',
            timefilter11: 'off',
            timefilter12: 'off',
            timefilter13: 'off',
            timefilter14: 'off',
            timefilter15: 'off',
            timefilter16: 'off',
            timefilter17: 'off',
            timefilter18: 'off',
            timefilter19: 'off',
            timefilter20: 'off',
            timefilter21: 'off',
            timefilter22: 'off',
            timefilter23: 'off',
            timefilter24: 'off',
            mon: 'off',
            tue: 'off',
            wed: 'off',
            thu: 'off',
            fri: 'off',
            sat: 'off',
            sun: 'off'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckAllDays = this.handleCheckAllDays.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
        this.handleCheckAllTimeSlot = this.handleCheckAllTimeSlot.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    async submitForm(){
        try{
            if(parseInt(this.state.interval) >= 4){
                if(this.state.type === 'sos'){
                    let response = await setSosTime(this.state.id, this.state.interval)                
                }else{
                    let response = await setTrackParameter(this.state)
                }
                this.props.setAlert('success', 'Tracking Parameter Added Successfully')
                this.props.onClose();
            }else{
                this.props.setAlert('error', 'Interval should be minimum 4 minutes')
            }
        }catch(error){
            console.log(error)
            let message = getErrorMessage(error);
            this.props.setAlert('error', message);
        }
    }

    checkStatus(status){
        if(status === 'off') return false;
        return true;
    }

    handleChange(e){
        let checked = e.target.checked,
        name = e.target.name;
        let value = '';

        if(typeof(checked) === 'undefined'){
            value = e.target.value;
        }else{
            value = checked ? 'on' : 'off'
        }
        this.setState({
            [name] : value
        })
    }

    handleCheckAllDays(e){
        let value = '';
        if(e.target.checked){
            value = 'on';
        }else{
            value = 'off';
        }

        this.setState({
            mon: value,
            tue: value,
            wed: value,
            thu: value,
            fri: value,
            sat: value,
            sun: value
        })
    }

    handleCheckAllTimeSlot(e){
        let value = '';
        if(e.target.checked){
            value = 'on';
        }else{
            value = 'off';
        }
        this.setState({
            timefilter1: value,
            timefilter2: value,
            timefilter3: value,
            timefilter4: value,
            timefilter5: value,
            timefilter6: value,
            timefilter7: value,
            timefilter8: value,
            timefilter9: value,
            timefilter10: value,
            timefilter11: value,
            timefilter12: value,
            timefilter13: value,
            timefilter14: value,
            timefilter15: value,
            timefilter16: value,
            timefilter17: value,
            timefilter18: value,
            timefilter19: value,
            timefilter20: value,
            timefilter21: value,
            timefilter22: value,
            timefilter23: value,
            timefilter24: value,
        })
    }
    
    handleTypeChange(e){
        if(e.target.value === 'sos' || e.target.value === 'Auto'){
            this.setState({
                timefilter1: 'off',
                timefilter2: 'off',
                timefilter3: 'off',
                timefilter4: 'off',
                timefilter5: 'off',
                timefilter6: 'off',
                timefilter7: 'off',
                timefilter8: 'off',
                timefilter9: 'off',
                timefilter10: 'off',
                timefilter11: 'off',
                timefilter12: 'off',
                timefilter13: 'off',
                timefilter14: 'off',
                timefilter15: 'off',
                timefilter16: 'off',
                timefilter17: 'off',
                timefilter18: 'off',
                timefilter19: 'off',
                timefilter20: 'off',
                timefilter21: 'off',
                timefilter22: 'off',
                timefilter23: 'off',
                timefilter24: 'off',
                mon: 'off',
                tue: 'off',
                wed: 'off',
                thu: 'off',
                fri: 'off',
                sat: 'off',
                sun: 'off'
            })
        }
    }

    render(){
        return(
            <Grid container justify='center' alignItems='center' spacing={2} style={{ padding: 20 }}>
                <Grid item xs={3}>
                    <Typography variant='subtitle1'> Tracking Type </Typography>
                </Grid>
                <Grid item xs={9}>
                    <FormControl variant="outlined" fullWidth size='small'>
                        <InputLabel id="clientname">Tracking Type</InputLabel>
                        <Select
                            labelId="type"
                            id="type"
                            name='type'
                            onChange={(e) => {
                                this.handleChange(e);
                                this.handleTypeChange(e);
                            }}
                        >
                            {TrackingType.map(track => (
                                <MenuItem id={track.id} value={track.value} >{track.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </Grid>

                <Grid item xs={3}>
                    <Typography variant='subtitle1'> Interval in mins </Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        id="filled-basic"
                        name='interval'
                        label="Interval in mins"
                        variant="filled"
                        fullWidth
                        size='small'
                        multiline
                        onChange={this.handleChange}
                    />
                    <FormHelperText id="minimun-interval-time">Minimum 4 minutes</FormHelperText>
                </Grid>
                {
                    this.state.type === 'Manual' ? (
                        <>
                            <Grid item xs={3}>
                                <Typography variant='subtitle1'> Tracking Hours </Typography>
                            </Grid>
                            <Grid item xs={9}></Grid>
                            
                            <Grid item xs={5}>
                                <Typography variant='subtitle1'> Select All Timeslots </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Checkbox
                                    onChange={this.handleCheckAllTimeSlot}
                                />
                            </Grid>
                            <Grid item xs={6}></Grid>

                            <Grid item xs={12}>
                                <Grid container style={{ textAlign: 'center', height: 150, overflowY: 'scroll'}}>
                                    <Grid item xs={6}>1</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox 
                                            name='timefilter1'
                                            checked={this.checkStatus(this.state.timefilter1)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>2</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox 
                                            name='timefilter2'
                                            checked={this.checkStatus(this.state.timefilter2)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>3</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox 
                                            name='timefilter3'
                                            checked={this.checkStatus(this.state.timefilter3)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>4</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter4'
                                            checked={this.checkStatus(this.state.timefilter4)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>5</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter5'
                                            checked={this.checkStatus(this.state.timefilter5)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>6</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter6'
                                            checked={this.checkStatus(this.state.timefilter6)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>7</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter7'
                                            checked={this.checkStatus(this.state.timefilter7)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>8</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter8'
                                            checked={this.checkStatus(this.state.timefilter8)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>9</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter9'
                                            checked={this.checkStatus(this.state.timefilter9)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>10</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter10'
                                            checked={this.checkStatus(this.state.timefilter10)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>11</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter11'
                                            checked={this.checkStatus(this.state.timefilter11)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>12</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter12'
                                            checked={this.checkStatus(this.state.timefilter12)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>13</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter13'
                                            checked={this.checkStatus(this.state.timefilter13)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>14</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter14'
                                            checked={this.checkStatus(this.state.timefilter14)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>15</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter15'
                                            checked={this.checkStatus(this.state.timefilter15)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>16</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter16'
                                            checked={this.checkStatus(this.state.timefilter16)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>17</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter17'
                                            checked={this.checkStatus(this.state.timefilter17)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>18</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter18'
                                            checked={this.checkStatus(this.state.timefilter18)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>19</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter19'
                                            checked={this.checkStatus(this.state.timefilter19)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>20</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter20'
                                            checked={this.checkStatus(this.state.timefilter20)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>21</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter21'
                                            checked={this.checkStatus(this.state.timefilter21)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>22</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter22'
                                            checked={this.checkStatus(this.state.timefilter22)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>23</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter23'
                                            checked={this.checkStatus(this.state.timefilter23)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>24</Grid>
                                    <Grid item xs={6}>
                                        <Checkbox
                                            name='timefilter24'
                                            checked={this.checkStatus(this.state.timefilter24)}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                            <Grid item xs={3}>
                                <Typography variant='subtitle1'> Tracking Days </Typography>
                            </Grid>
                            <Grid item xs={9}></Grid>
                            
                            <Grid item xs={5}>
                                <Typography variant='subtitle1'> Select All Days </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Checkbox 
                                    onChange={this.handleCheckAllDays}
                                />
                            </Grid>
                            <Grid item xs={6}></Grid>
                            
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Grid container>
                                            <Grid item xs={6}>Mon</Grid>
                                            <Grid item xs={6}>
                                                <Checkbox
                                                    name='mon'
                                                    checked={this.checkStatus(this.state.mon)}
                                                    onChange={this.handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Grid container>
                                            <Grid item xs={6}>Tue</Grid>
                                            <Grid item xs={6}>
                                                <Checkbox 
                                                    name='tue'
                                                    checked={this.checkStatus(this.state.tue)}
                                                    onChange={this.handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Grid container>
                                            <Grid item xs={6}>Wed</Grid>
                                            <Grid item xs={6}>
                                                <Checkbox 
                                                    name='wed'
                                                    checked={this.checkStatus(this.state.wed)}
                                                    onChange={this.handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Grid container>
                                            <Grid item xs={6}>Thur</Grid>
                                            <Grid item xs={6}>
                                                <Checkbox 
                                                    name='thu'
                                                    checked={this.checkStatus(this.state.thu)}
                                                    onChange={this.handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Grid container>
                                            <Grid item xs={6}>Fri</Grid>
                                            <Grid item xs={6}>
                                                <Checkbox 
                                                    name='fri'
                                                    checked={this.checkStatus(this.state.fri)}
                                                    onChange={this.handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Grid container>
                                            <Grid item xs={6}>Sat</Grid>
                                            <Grid item xs={6}>
                                                <Checkbox 
                                                    name='sat'
                                                    checked={this.checkStatus(this.state.sat)}
                                                    onChange={this.handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Grid container>
                                            <Grid item xs={6}>Sun</Grid>
                                            <Grid item xs={6}>
                                                <Checkbox 
                                                    name='sun'
                                                    checked={this.checkStatus(this.state.sun)}
                                                    onChange={this.handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                                    
                        </>
                    ) : null
                }
                
                <Grid item container justify='center' spacing={3} xs={6}>
                    <Grid item>
                        <Button variant='contained' color='primary' onClick={this.submitForm}> Apply </Button>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default TrackDeviceForm;