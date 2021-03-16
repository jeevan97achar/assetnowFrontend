import React, { useState,useEffect } from "react";
import {
    Grid,
    Typography,
    Button,
    Divider,
    InputLabel,
    MenuItem,
    FormHelperText,
    TextField,
    FormControl,
    Select
} from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { tableIcons } from "../../../../src/Util/ui-reference";

import {
    createMuiTheme,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

import { revenue } from "../../../../src/Network/network";

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

export default function Revenue() {
    const [startDate, setstartDate] = useState("2020-01-01");
  const [endDate, setendDate] = useState("2020-12-30");
  const [data,setData]=useState();

  useEffect(() => {
    getData();
  }, [startDate, endDate]);

  const getData=async()=>{
await revenue(startDate, endDate).then((data) => {
     let dates = Object.keys(data);
     let finaldata=[];
     dates.map((date)=>{
         let obj={};
         obj["date"]=date;
         let simobj = data[date]["SIM based"];
         simobj.map((d)=>{
             obj["customer"] = d["company"];
             
             obj["simdevice_count"] = d["device_count"];
             obj["simrevenue"] = d["revenue"];
             
             finaldata.push(obj);
         })
     })
     setData(finaldata)

})
  }
 useEffect(() => {
    getData();
  }, []);
    return (
      <div>
        <Grid
          container
          justify="center"
          alignItems="center"
          spacing={2}
          style={{ padding: 20 }}
        >
          <Grid item container justify="space-between">
            <Grid item>
              <Typography variant="h5">Revenue</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <TextField
              type="date"
              helperText="Start Date"
              id="startDate"
              fullWidth
              onChange={(event) => setstartDate(event.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              type="date"
              helperText="End Date"
              id="endDate"
              fullWidth
              onChange={(event) => setendDate(event.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <MaterialTable
              icons={tableIcons}
              title="Customer/Devices Revenue Statistics"
              columns={[
                { title: "Date", field: "date" },
                { title: "Customer", field: "customer" },
               
                {
                  title: "GPS Based",
                  render: (rowData) => (
                    <p>
                      Devices: 0, Revenue:0
                    </p>
                  ),
                },
                {
                  title: "APP Based",
                  render: (rowData) => (
                    <p>
                      Devices: 0, Revenue:0
                    </p>
                  ),
                },
                {
                  title: "SIM Based",
                  render: (rowData) => (
                    <p>
                      Devices: {rowData.simdevice_count}, Revenue:{" "}
                      {rowData.simrevenue}
                    </p>
                  ),
                },
              ]}
              data={data}
              options={{
                search: true,
              }}
            />
          </Grid>
        </Grid>
      </div>
    );
}
