import React, { useState, useEffect } from "react";
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
  Select,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { tableIcons } from "../../../../src/Util/ui-reference";

import { createMuiTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { systemStatistics } from "../../../../src/Network/network";

const names = [
  "Shyna Default Group",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
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

export default function SystemStatistics() {
  const [startDate, setstartDate] = useState("2020-01-01");
  const [endDate, setendDate] = useState("2020-12-30");
  const [data,setData]=useState()
  const getData = async () => {
    await systemStatistics(startDate, endDate).then((data) => {
      let finaldata = [];
       data.map((row) => {
        let obj = {};
        obj["date"] = row.date;
        if (row.assetType.assettypename === "SIM based") {
          obj["SIM based"] = row.queries_count;
          obj["App based"] = 0;
          obj["GPS based"] = 0;
        } else if (row.assetType.assettypename === "App based") {
          obj["App based"] = row.queries_count;
          obj["SIM based"] = 0;
          obj["GPS based"] = 0;
        } else {
          obj["GPS based"] = row.queries_count;
          obj["SIM based"] = 0;
          obj["App based"] = 0;
        }
        finaldata.push(obj)
      });
      setData(finaldata)
    });
  };
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
            <Typography variant="h5">System Statistics</Typography>
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
          />
        </Grid>

        <Grid item xs={6}>
          <TextField type="date" helperText="End Date" id="endDate" fullWidth />
        </Grid>

        <Grid item xs={12}>
          <MaterialTable
            title="Location Queries"
            icons={tableIcons}
            columns={[
              { title: "Date", field: "date" },
              { title: "SIM Based", field: "SIM based" },
              { title: "APP Based", field: "App based" },
              { title: "GPS Based", field: "GPS based" },
            //   { title: "Total", field: "surname" },
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
