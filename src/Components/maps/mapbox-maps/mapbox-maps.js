import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; 
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';

import './mapbox-maps.css';

import { mapboxMapsApiKey } from '../../../Util/config';
import { getMapboxAddress } from '../../../Network/network';

let map, draw, marker;
mapboxgl.accessToken = mapboxMapsApiKey;

class Map extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            center: {
                lat: 9.033584880621262, 
                lng: 7.489695623366288
            },
            markerPosition: {
                lat: 9.033584880621262, 
                lng: 7.489695623366288
            },
            zoom: 10,
        }

        this.loadMap = this.loadMap.bind(this);
        this.updateArea = this.updateArea.bind(this);
        this.deleteArea = this.deleteArea.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);

    }

    async handleDragEnd(){
        var lngLat = marker.getLngLat(); 
        this.setState({
            markerPosition: {
                lat: lngLat.lat,
                lng: lngLat.lng
            }
        })
        this.props.getPoiData(lngLat);
    }

    handleMapClick(e){
        let position = {
            lat: e.lngLat.lat,
            lng: e.lngLat.lng
        }
        this.setState({ markerPosition: position})
        this.props.getPoiData(position);
    }

    updateArea(e){
        let data = draw.getAll();
        data = data.features[0].geometry.coordinates[0];
        this.props.getZoneCoords(data);
    }

    deleteArea(){
        draw.changeMode('draw_rectangle');
    }

    loadMap(){
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.center.lng, this.state.center.lat],
            zoom: this.state.zoom
        });

        const modes = MapboxDraw.modes;
        modes.draw_rectangle = DrawRectangle;

        draw = new MapboxDraw({
            modes: modes,
            displayControlsDefault: false,
            controls: {
                polygon: false,
                trash: true
            }
        });
    
        if(this.props.zoneMode){
            map.addControl(draw);

            draw.changeMode('draw_rectangle');

            map.on('draw.create', this.updateArea);
            map.on('draw.delete', this.deleteArea);
            map.on('draw.update', this.updateArea);
        }

        if(this.props.poiMode){
            marker = (new mapboxgl.Marker({color: '#D63324', draggable: true})
            .setLngLat([this.state.markerPosition.lng, this.state.markerPosition.lat])
            .setPopup(new mapboxgl.Popup().setHTML(`<div>
                Lat: ${this.state.markerPosition.lat},<br /> Long: ${this.state.markerPosition.lng}
            </div>`))
            .addTo(map))

            marker.on('dragend', this.handleDragEnd)
            map.on('click', this.handleMapClick);
        }

    }

    componentDidMount(){
        this.loadMap();
    }

    render(){
        
        return(
            <div>
                <div 
                    id='map' 
                    ref={el=>this.mapContainer = el} 
                    className='mapContainer' 
                ></div>
            </div>
        )
    }

}

export default Map;