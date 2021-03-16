import React, { useEffect, useState } from "react";
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
import { CapacityReports } from "../../../../src/Network/network";

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

export default function CapacityReport() {
  const [startDate, setstartDate] = useState();
  const [endDate, setendDate] = useState();
  const [Data, setData] = useState();
  const getData = async () => {
    await CapacityReports(startDate, endDate).then((data) => {
      let d = data;
      let siderows = Object.keys(d);
      let device_rows = [];
      let query_rows = [];
      let record_rows = [];
      siderows.map((row) => {
        console.log(d[row][0]["device_count"]);
        device_rows.push(d[row][0]["device_count"]);
        query_rows.push(d[row][0]["queries_count"]);
        record_rows.push(d[row][0]["records_count"]);
      });
      console.log(device_rows, query_rows, record_rows);
      let finaldata = [];
      for (var i = 0; i < 3; i++) {
        var obj = {};
        obj["sidename"] = siderows[i];
        obj["device_count"] = device_rows[i];
        obj["queries_count"] = query_rows[i];
        obj["records_count"] = record_rows[i];
        finaldata.push(obj);
      }

      setData(finaldata);
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
            <Typography variant="h5">Capacity Report</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <MaterialTable
            title=""
            icons={tableIcons}
            columns={[
              { title: "", field: "sidename" },
              { title: "Device ", field: "device_count" },
              { title: "Record Capacity", field: "records_count" },
              { title: "Query Capacity", field: "queries_count" },
              //   { title: "Total", field: "surname" },
            ]}
            data={Data}
            options={{
              search: true,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
