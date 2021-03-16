import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";
import moment from 'moment';
import MaterialTable from "material-table";
import { tableIcons } from "../../Util/ui-reference";
function AnalystTable(props) {
  const [tabledata, setTabledata] = useState();
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
      console.log(props.data);
       if (props.data.Devices) {
         setTabledata(props.data.Devices);
         setLoading(false)
       }
  }, [props.data]);
  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <MaterialTable
          icons={tableIcons}
          title="Analyst Users"
          columns={[
            { title: "Id", field: "current_geo__id" },
            { title: "Name", field: "name" },
            { title: "Number", field: "number" },
            { title: "Result", field: "current_geo__result" },
            // { title: "Date", field: "current_geo__recorded_time" },
            {
              title: 'Date'
              , render: rowData => moment.utc(rowData['current_geo__recorded_time']).format("MMM DD YYYY")
            },
            {
              title: 'Time'
              , render: rowData => moment.utc(rowData['current_geo__recorded_time']).format("hh:mm A")
            },
            { title: "Latitude", field: "current_geo__geo__latitude" },
            { title: "Longitude", field: "current_geo__geo__longitude" },
            // { title: "APP Based", field: "surname" },
            // { title: "Total", field: "surname" },
          ]}
          data={tabledata}
          options={{
            search: true,
            actionsColumnIndex: -1,
            loadingType: "linear",
            headerStyle: {
              backgroundColor: "#263238",
              color: "#FFF",
            },
            rowStyle: {
              backgroundColor: "#EEE",
            },
          }}
        />
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  data: state.AnalystData.data,
  loading: state.AnalystData.loading,
  error: state.AnalystData.error,
  settingdata: state.products.data,
  locationdata: state.AnalystData.locationdata,
});
// const showAnalystMap = withRouter(AnalystMap);
export default connect(mapStateToProps)(AnalystTable);
