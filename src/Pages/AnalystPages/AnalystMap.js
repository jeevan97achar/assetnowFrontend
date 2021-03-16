import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux"; 

import AnalystViewMaps from '../../Components/maps/analyst-view/analyst-view';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

let key = 0;

function AnalystMap(props) {
     useEffect(() => {
       key++;
     }, [props])
    return (
        <div>
          <AnalystViewMaps 
            key={key} 
            id={key} 
            data={props.data} 
            settingsdata={props.settingdata} 
            locationdata={props.locationdata}
            loading={props.loading}
          />
        </div>
    )
}
const mapStateToProps = (state) => ({
  data: state.AnalystData.data,
  loading: state.AnalystData.loading,
  error: state.AnalystData.error,
  settingdata: state.products.data,
  locationdata: state.AnalystData.locationdata,
});
const showAnalystMap = withRouter(AnalystMap);
export default connect(mapStateToProps)(AnalystMap);
