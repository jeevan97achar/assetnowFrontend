import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; 
import './analyst-view-map.css';
import moment from 'moment';

import { mapboxMapsApiKey } from '../../../Util/config';
import { getRandomColor } from '../../../Util/ui-reference';

let map, markerColor={};
mapboxgl.accessToken = mapboxMapsApiKey;

let center = {
    lat: 9.033584880621262, 
    lng: 7.489695623366288
}

class AnalystViewMap extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            center: this.props.locationdata.length ? {
                lat: this.props.locationdata[0].current_geo ? this.props.locationdata[0].current_geo['geo']['latitude'] : center.lat, 
                lng: this.props.locationdata[0].current_geo ? this.props.locationdata[0].current_geo['geo']['longitude'] : center.lng,
            }: center,
            markerPosition: {
                lat: 9.033584880621262, 
                lng: 7.489695623366288
            },
            zoom: 10,
            data: this.props.data ? this.props.data : [],
            locationdata: this.props.locationdata ? this.props.locationdata: [],
            selectedZone: this.props.zoneData ? this.props.zoneData : [],
            selectedPoi: this.props.poiData ? this.props.poiData : [],
        }

        this.loadMap = this.loadMap.bind(this);
        this.drawZone = this.drawZone.bind(this);
        this.drawPOI = this.drawPOI.bind(this);
    }

    drawZone(zoneData){
        let id = zoneData.properties.name;
        if (map.getLayer(id)) {
            map.removeLayer(id);
        }
        if (map.getSource(id)) {
            map.removeSource(id);
        }
        
        map.once('styledata', () => {
            console.log(map.isStyleLoaded())
            map.addSource(id, {
                'type': 'geojson',
                'data': zoneData,
            });
            map.addLayer({
                'id': id,
                'type': 'fill',
                'source': id,
                'layout': {},
                'paint': {
                'fill-color': '#088',
                'fill-opacity': 0.8
                }
            });
        })
    }

    drawPOI(poiData){
        let marker = (new mapboxgl.Marker({color: '#D63324', draggable: false})
        .setLngLat([poiData.poi_geo.longitude, poiData.poi_geo.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<div>
            <h4>${poiData.poi_geo.name}</h4>
            Lat: ${poiData.poi_geo.latitude}, <br />Long: ${poiData.poi_geo.longitude}
        </div>`))
        .addTo(map))
    }

    loadMap(){
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.center.lng, this.state.center.lat],
            zoom: this.state.zoom
        });

        map.addControl(new mapboxgl.NavigationControl());

        map.on('load', () => {
            let {data, locationdata, selectedZone, selectedPoi} = this.state;
            if(locationdata.length){
                locationdata.map((coord) => {
                    if(coord['current_geo']){
                        let marker = new mapboxgl.Marker()
                        .setLngLat([coord['current_geo']['geo']['longitude'], coord['current_geo']['geo']['latitude']])
                        .setPopup(new mapboxgl.Popup().setHTML(`
                            <div>
                                Name=${coord['name']}<br />
                                Number=${coord['number']}<br />
                                Serial No=${coord['serial_num']}<br />
                                Status=${coord['assetstatus']}<br/>
                                Address=${coord['current_geo']['geo']['address']}<br />
                                Co-ordinates=(${coord['current_geo']['geo']['longitude']}, ${coord['current_geo']['geo']['latitude']})<br />
                                Recorded Time=${coord['current_geo']['recorded_time'] ? moment.utc(coord['current_geo']['recorded_time']).format("DD-MM-yyyy HH:mm:ss") : 'NA'}
                            </div>
                        `))
                        .addTo(map);
                    }
                })
            }else{
                data.map((coord) => {
                    let color = markerColor[coord['asset_group__group_name']];
                    if(!color){
                        color = getRandomColor();
                        markerColor[coord['asset_group__group_name']] = color;
                    }
    
                    let marker = new mapboxgl.Marker({ "color" : color })
                    .setLngLat([coord['current_geo__geo__longitude'], coord['current_geo__geo__latitude']])
                    .setPopup(new mapboxgl.Popup().setHTML(`
                        <div>
                            Asset=${coord.name}<br />
                            Group=${coord['asset_group__group_name']}<br />
                            Address=${coord['current_geo__geo__address']}<br />
                            Co-ordinates=(${coord['current_geo__geo__longitude']},${coord['current_geo__geo__latitude']})<br />
                            Recorded Time=${coord['current_geo__recorded_time'] ? moment.utc(coord['current_geo__recorded_time']).format("DD-MM-yyyy HH:mm:ss") : 'NA'}
                        </div>
                    `))
                    .addTo(map);
    
                    marker.getElement().addEventListener('dblclick', (e) => {
                        this.props.getTrackData(coord.id);
                    })
                    
                })
                
                selectedZone.map((zone) => {
                    this.drawZone(zone);
                })
                
                selectedPoi.map((poi) => {
                    this.drawPOI(poi);
                })
            }
        })

    }

    async componentDidMount(){
        this.loadMap();
    }

    render(){
        return(
            <div key={this.state.key}>
                <div 
                    id='map' 
                    ref={el=>this.mapContainer = el} 
                    className='mapContainer' 
                ></div>
            </div>
        )
    }
}

export default AnalystViewMap;