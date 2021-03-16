import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; 
import './mapbox-maps.css';
import * as turf from '@turf/turf';

import { mapboxMapsApiKey } from '../../../Util/config';

let map, draw, marker;
mapboxgl.accessToken = mapboxMapsApiKey;

class Map extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            center: {
                lat: this.props.markers.lat, 
                lng: this.props.markers.lng
            },
            markerPosition: {
                lat: this.props.markers.lat, 
                lng: this.props.markers.lng
            },
            markers: this.props.zoneMarkers,
            zoom: 10,
        }

        this.loadMap = this.loadMap.bind(this);
        
    }

    loadMap(){
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.center.lng, this.state.center.lat],
            zoom: this.state.zoom
        });
        

        map.on('load', () => {
            if(this.props.zoneMode){
                let polygonData = turf.polygon([[...this.state.markers]], {name: 'zone'})
                let center = turf.centerOfMass(polygonData);

                this.setState({
                    center: {
                        lat: center.geometry.coordinates[0],
                        lng: center.geometry.coordinates[1]
                    }
                }, () => {
                    map.addSource('zone', {
                        type: 'geojson',
                        data: polygonData
                    });
                    map.addLayer({
                        id: 'zone',
                        type: 'fill',
                        source: 'zone',
                        layout: {},
                        paint: {
                            'fill-color': '#088',
                            'fill-opacity': 0.8
                        }
                    });
                })
            }
     
            if(this.props.poiMode){
                marker = (new mapboxgl.Marker({color: '#D63324', draggable: false})
                .setLngLat([this.state.markerPosition.lng, this.state.markerPosition.lat])
                .setPopup(new mapboxgl.Popup().setHTML(`<div>
                    Lat: ${this.state.markerPosition.lat}, <br />Long: ${this.state.markerPosition.lng}
                </div>`))
                .addTo(map))
            }
        })

    }

    componentDidMount(){
        this.loadMap();
    }

    render(){
        
        return(
            <div>
                <div id='map' ref={el=>this.mapContainer = el} className='mapContainer' ></div>
            </div>
        )
    }

}

export default Map;