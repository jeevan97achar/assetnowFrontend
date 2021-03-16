import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import { googleMapsApiKey } from '../../../Util/config';

class GoogleMaps extends Component {
    constructor(props){
        super(props);
        this.state = {
            center: {
                lat: 9.076005348058938, 
                lng: 7.399838165569338
            },
            markerPosition:{
                lat: 9.076005348058938, 
                lng: 7.399838165569338
            }
        }    

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(mapProps, map, coord){
        const { latLng } = coord;
        let marker = {
            lat: latLng.lat(),
            lng: latLng.lng()
        };
        this.setState({markerPosition: marker})
    }

    handleMouseMove(e){
        
    }

    render() {
        const style = {
            height: '100%'
        }
        
        const containerStyle = {
            position: 'relative',  
            width: '100%',
            height: '500px'
        }

        return(
            <div>
                <Map 
                    google={this.props.google}
                    onClick={this.handleClick}
                    initialCenter={this.state.center}
                    zoom={13}
                    containerStyle={containerStyle}
                    style={style}
                    onMousemove={this.handleMouseMove}
                >
                    {this.props.poiMode && (<Marker 
                        position={this.state.markerPosition}
                        draggable={true}
                        onDragEnd={ (t, map, coord) => {console.log(t, map, coord)} }
                    />)}
                </Map>
            </div>
        );
    }
};
export default GoogleApiWrapper({
    apiKey: googleMapsApiKey
  })(GoogleMaps)