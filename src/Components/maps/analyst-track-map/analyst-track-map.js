import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; 
import './analyst-track-map.css';

import { mapboxMapsApiKey } from '../../../Util/config';
import { data } from '../analyst-view-map/dummy-data';


let map;
mapboxgl.accessToken = mapboxMapsApiKey;

class AnalystTrackMap extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            key: 1,
            center: {
                lat: 9.033584880621262, 
                lng: 7.489695623366288
            },
            markerPosition: {
                lat: 9.033584880621262, 
                lng: 7.489695623366288
            },
            zoom: 10,
            trackData: this.props.data,
        }

        this.loadMap = this.loadMap.bind(this);
    }


    loadMap(){
        map = new mapboxgl.Map({
            container: 'trackMap',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.center.lng, this.state.center.lat],
            zoom: this.state.zoom
        });
        
        map.addControl(new mapboxgl.NavigationControl());

        map.on('load', () => {
            let lineStringData = [];
            this.state.trackData.map((data) => {
                let longitude = data.geo.longitude,
                latitude = data.geo.latitude;
              
                if(longitude !== null && latitude !== null){
                    let marker = new mapboxgl.Marker()
                    .setLngLat([longitude, latitude])
                    .setPopup(new mapboxgl.Popup().setHTML(`
                            <div>
                            id: ${data.id}<br />
                            coordinates: (${longitude}, ${latitude})<br />
                            result: ${data.result}
                        </div>
                    `))
                    .addTo(map);
                    lineStringData.push([longitude, latitude]);
                }
            })

            map.addSource('route', {
                'type': 'geojson',
                'data' : {
                    'type' : 'Feature',
                    'properties' : {},
                    'geometry' : {
                        'type' : 'LineString',
                        'coordinates' : lineStringData
                    }
                }
            })

            map.addLayer({
                'id' : 'route',
                'type' : 'line',
                'source': 'route',
                'layout' : {
                    'line-join' : 'round',
                    'line-cap': 'round'
                },
                'paint' : {
                    'line-color' : '#1A377F',
                    'line-width' : 4
                }
            })
            
        })
    }

    componentDidMount(){
        console.log(this.props);
        this.loadMap();
    }

    render(){
        return (
            <div>
                <div 
                    id='trackMap' 
                    key={this.state.key}
                    ref={el=>this.trackMapContainer = el} 
                    className='trackMapContainer' 
                ></div>
            </div>

        );
    }
}

export default AnalystTrackMap;