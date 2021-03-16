import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Divider,
  InputLabel,
  MenuItem,
  TextField,
  FormControl,
  Select
} from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";

import {
  createMuiTheme,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

import { tableIcons } from '../../../Util/ui-reference';
import { getDevices } from "../../../Network/network";

const names = [
  'Shyna Default Group',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
    padding: "15px 0",
    color: "white",
    display: "block",
    textAlign: "center",
    backgroundColor: `rgb(67,176,42)`,
    "&:hover": {
      backgroundColor: `rgb(67,176,42)`,
    },
  },
}));

export default function ListDevices() {

  const [AddFlag, setAddFlag] = useState(false)
  const [ Devices, setDevices ] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onAddUserClick = () => {
    setAddFlag(!AddFlag)
  }

  useEffect( () => {
    if(isLoading){
      getDevices()
      .then(response => {
        setDevices(response.Devices);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      })
    }  
  })

  return (
    <div>
      <Grid container justify='center' alignItems='center' spacing={2} style={{ padding: 20 }}>

      <Grid item container justify='space-between'>
      <Grid item>
        <Typography variant='h5'>
          Devices
      </Typography>
        </Grid>

        <Grid item>
          <Button 
          onClick={onAddUserClick}
          variant='contained' 
          color='primary'>
            {!AddFlag? 'Add New Device' : 'Back to Devices'}
      </Button>
        </Grid>
      </Grid>
        
        <Grid item xs={12}>
          <Divider />
        </Grid>

        {AddFlag ? 
        (<>
            <Grid item xs={3}>
            <Typography variant='subtitle1'>
              For Client
        </Typography>
          </Grid>
  
          <Grid item xs={9}>
            <FormControl variant="outlined" fullWidth size='small'>
              <InputLabel id="demo-simple-select-outlined-label">Client</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // value={age}
                // onChange={handleChange}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Shyna</MenuItem>
                <MenuItem value={20}>Tvast</MenuItem>
              </Select>
            </FormControl>
          </Grid>
  
          <Grid item xs={3}>
            <Typography variant='subtitle1'>
              Select to Map Asset
        </Typography>
          </Grid>
  
          <Grid item xs={9}>
            <FormControl variant="outlined" fullWidth size='small'>
              <InputLabel id="demo-simple-select-outlined-label">Select Asset</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // value={age}
                // onChange={handleChange}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>User</MenuItem>
                <MenuItem value={20}>Group</MenuItem>
              </Select>
            </FormControl>
          </Grid>
  
          <Grid item xs={3}>
            <Typography variant='subtitle1'>
              For User/Group
        </Typography>
          </Grid>
  
          <Grid item xs={9}>
          <FormControl fullWidth > 
          <InputLabel shrink htmlFor="select-multiple-native">
            Select
          </InputLabel>
          <Select
            multiple
            native
            // value={personName}
            // onChange={handleChangeMultiple}
            inputProps={{
              id: 'select-multiple-native',
            }}
          >
            {names.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </FormControl>
          </Grid>
  
          <Grid item xs={3}>
            <Typography variant='subtitle1'>
              Device Type
        </Typography>
          </Grid>
  
          <Grid item xs={9}>
            <FormControl variant="outlined" fullWidth size='small'>
              <InputLabel id="demo-simple-select-outlined-label">Device Type</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // value={age}
                // onChange={handleChange}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>SIM Based</MenuItem>
                <MenuItem value={20}>GPS Based</MenuItem>
                <MenuItem value={20}>App Based</MenuItem>
              </Select>
            </FormControl>
          </Grid>
  
          <Grid item xs={3}>
            <Typography variant='subtitle1'>
              Aquisition Date
        </Typography>
          </Grid>
  
          <Grid item xs={9}>
            <TextField
              id="outlined-basic"
              variant="outlined" 
              fullWidth
              size='small'
              type='date'
              />
          </Grid>
  
          <Grid item xs={3}>
            <Typography variant='subtitle1'>
              Number
        </Typography>
          </Grid>
  
          <Grid item xs={9}>
            <TextField
              id="outlined-basic"
              label="Number"
              variant="outlined" 
              fullWidth
              size='small'
              />
          </Grid>
  
          <Grid item xs={3}>
            <Typography variant='subtitle1'>
              Device Name
        </Typography>
          </Grid>
  
          <Grid item xs={9}>
            <TextField
              id="outlined-basic"
              label="Device Name"
              variant="outlined" 
              fullWidth
              size='small'
              />
          </Grid>
  
          <Grid item xs={3}>
            <Typography variant='subtitle1'>
              Serial Number
        </Typography>
          </Grid>
  
          <Grid item xs={9}>
            <TextField
              id="outlined-basic"
              label="Serial Number"
              variant="outlined" 
              fullWidth
              size='small'
              />
          </Grid>
  
          <Grid item xs={3}>
            <Typography variant='subtitle1'>
              Asset Status
        </Typography>
          </Grid>
  
          <Grid item xs={9}>
            <FormControl variant="outlined" fullWidth size='small'>
              <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // value={age}
                // onChange={handleChange}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Active</MenuItem>
                <MenuItem value={20}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
  
          <Grid item xs={3} style={{padding: 30}}>
            <Button variant='contained' color='primary' fullWidth>
              Save
            </Button>
          </Grid>
  
          <Grid item xs={3} style={{padding: 30}}>
            <Button variant='contained' color='secondary' fullWidth>
              Cancel
            </Button>
          </Grid>
          </>): 
        (<>

        <Grid item container xs={12} justify='flex-start' spacing={2}>
            <Grid item>
                <Button variant='contained' color='default'>Excel</Button>
            </Grid>
            <Grid item>
                <Button variant='contained' color='default'>PDF</Button>
            </Grid>
            <Grid item>
                <Button variant='contained' color='default'>Print</Button>
            </Grid>
        </Grid>
          <Grid item xs={12}>
            <MaterialTable
              icons={tableIcons}
              title="Devices"
              isLoading={isLoading}
              columns={[
                { title: 'Device Id', field: 'id' },
                { title: 'Nick Name', field: 'name' },
                { title: 'Activation Date', field: 'aqdate' },
                { title: 'Valid Week Days', field: 'aqdate' },
                { title: 'Device Group', field: 'asset_group' },
                { title: 'Device Type', field: 'asset_cat' },
                { title: 'Device Key Id', field: 'serial_num' },
                { title: 'Status', field: 'assetstatus' },
              ]}
              data={Devices}        
              options={{
                search: true,
                loadingType: 'linear',
                headerStyle: {
                  backgroundColor: '#263238',
                  color: '#FFF'
                },
                rowStyle: {
                  backgroundColor: '#EEE',
                }
              }}
              
            />
          </Grid>
        </>)}

      </Grid>    
    </div>
  );
}
