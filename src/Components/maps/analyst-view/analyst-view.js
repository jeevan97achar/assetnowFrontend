import React from 'react';
import * as turf from '@turf/turf'

import { getDeviceTrackData, getPOI, getRestoreSetting, getZone } from '../../../Network/network';
import AnalystViewMap from '../analyst-view-map/analyst-view-map';
import AnalystTrackMap from '../analyst-track-map/analyst-track-map';
import Loader from '../../loader/loader';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const getCoords = (lat1, long1, lat2, long2) => {
  return [
    [long1, lat1],
    [long2, lat1],
    [long2, lat2],
    [long1, lat2],
    [long1, lat1],
  ];
};

class AnalystView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: null,
      loaderStatus: false,
      data: [],
      locationdata:[],
      selectedZone: [],
      selectedPoi: [],
      trackMode: false,
      trackData: [],
    };

    this.getTrackData = this.getTrackData.bind(this);
    this.getZoneData = this.getZoneData.bind(this);
    this.getPoiData = this.getPoiData.bind(this);
    this.getSelectedZone = this.getSelectedZone.bind(this);
    this.getSelectedPoi = this.getSelectedPoi.bind(this);
  }

  getZoneData(zonesList, zoneId) {
    let zoneData = null;
    zonesList.map((zone) => {
      if (zone.id == zoneId) {
        zoneData = zone;
      }
    });

    let { lat1, long1, lat2, long2 } = zoneData;
    let zoneCoords = getCoords(lat1, long1, lat2, long2);
    let polygonData = turf.polygon([[...zoneCoords]], { name: zoneId });

    return polygonData;
  }

  getPoiData(poiList, id) {
    let poiData = null;
    poiList.map((poi) => {
      if (poi.id == id) {
        poiData = poi;
      }
    });

    return poiData;
  }

  async getSelectedZone(settings) {
    let zoneList = await getZone();
    settings = settings.settings;
    if (settings) {
      let selectedZone = settings["zoneFilterChk"];
      let showzones = settings["ZoneShapeFilterCmd"];
      let selectedZoneIdList = [];
      if (
        selectedZone !== "reset" &&
        showzones === "on" &&
        selectedZone !== null &&
        selectedZone !== "" &&
        selectedZone.length > 0
      ) {
        selectedZone = selectedZone.split(",");
        selectedZone.forEach((zone) => {
          let zoneId = zone.split("-");
          zoneId = zoneId[zoneId.length - 1];
          let zoneData = this.getZoneData(zoneList, zoneId);
          selectedZoneIdList.push(zoneData);
        });
      }

      this.setState({
        zonesList: zoneList,
        selectedZone: selectedZoneIdList,
      });
    }
  }

  async getSelectedPoi(settings) {
    let poiList = await getPOI();
    settings = settings.settings;

    if (settings) {
      let selectedPoi = settings["poiFilterChk"];
      let showpoi = settings["poiFilterCmd"];
      showpoi = showpoi.split(",");

      let selectedPoiIdList = [];
    
      if (selectedPoi !== "reset" && showpoi[0].toLowerCase() === "poi") {
        selectedPoi = selectedPoi.split(",");
        selectedPoi.forEach((poi) => {
          let poiId = poi.split("-");
          poiId = poiId[poiId.length - 1];
          let poiData = this.getPoiData(poiList, poiId);
          selectedPoiIdList.push(poiData);
        });
    
      }
      this.setState({
        selectedPoi: selectedPoiIdList,
      });
    }
  }

  async componentDidMount() {
    this.setState({loaderStatus: true})
    
    let settings = this.props.settingsdata;
    let data = [];

    if(this.props.settingsdata.settings){

        let poifilter = this.props.settingsdata.settings["poiFilterCmd"];
        poifilter =await poifilter.split(",");
        await poifilter.map((poi) => {
          if (poi.toLowerCase() === "poi") {
            data = this.props.data["Devices"] ? this.props.data["Devices"] : [];
          }
        });
    }

    await this.getSelectedZone(settings);
    await this.getSelectedPoi(settings);

    this.setState({
      data: data,
      locationdata: this.props.locationdata,
      key: this.props.id,
      loaderStatus: false
    });
  }

  render() {
    let {
      key,
      data,
      locationdata,
      trackMode,
      trackData,
      loaderStatus,
      selectedZone,
      selectedPoi,
    } = this.state;

    let map = loaderStatus ? (
      <Loader />
    ) : trackMode ? (
      <AnalystTrackMap key={key} data={trackData} />
    ) : (
      <AnalystViewMap
        key={key}
        data={data}
        locationdata={locationdata}
        zoneData={selectedZone}
        poiData={selectedPoi}
        getTrackData={this.getTrackData}
      />
    );

    return map;
  }

  async getTrackData(id) {
    this.setState({ loaderStatus: true });
    let data = await getDeviceTrackData(id);
    this.setState({
      //trackMode: !(data.length === 0),
      trackMode: true,
      trackData: data,
      loaderStatus: false,
    });
  }
}

export default AnalystView;
