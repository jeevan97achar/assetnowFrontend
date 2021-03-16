import React from 'react';
import {
    Checkbox,
    Grid,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import moment from 'moment';

//Icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';


import { tableIcons } from '../../../Util/ui-reference';
import MapPreview from '../../map-preview-pane/map-preview-pane';
import { getPOI, deletePOI, togglePoiStatus } from "../../../Network/network";
import { getErrorMessage } from '../../../Util/helper';

class ListPoiTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            openPreviewDialog: false,
            previewCoords: [],
            poiList: [],
        }
        this.fetchPOI = this.fetchPOI.bind(this);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.handlePreviewPoi = this.handlePreviewPoi.bind(this);
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
        this.handleDeletePoi = this.handleDeletePoi.bind(this);
    }

    onCloseDialog(){
        this.setState({ openPreviewDialog: false })
    }

    handlePreviewPoi(lat, long){
        this.setState({
            previewCoords: [lat, long],
            openPreviewDialog: true
        })
    }

    async handleCheckboxClick(event, rowData){
        try{
            let id = rowData.id, 
            status = rowData.status;
            let poiList = this.state.poiList;
            poiList.forEach(poi => {
                if(poi.id === id) poi.status = !status
            })
            this.setState({
                poiList: poiList
            })
            let response = await togglePoiStatus(id, !status);
        }catch(error){
            console.log(error)
            let message = getErrorMessage(error);
            this.props.setAlert('error', message);
        }
    }

    async fetchPOI(){
        try{
            let { companyId } = this.props;
            let poiList;
             if (this.props.companyId) {
                  poiList = await getPOI(companyId,"client");
            }else{
                  poiList = await getPOI(companyId,"");

             }
            this.setState({
                isLoading: false,
                poiList: poiList
            })
        }catch(error){
            console.log(error);
            let message = getErrorMessage(error);
            this.props.setAlert('error', message)
        }
    }

    async handleDeletePoi(id){
        try{
            let response = await deletePOI(id);
            this.setState({
                isLoading: true,
            })
            this.props.setAlert('success', 'POI deleted successfully');
            await this.fetchPOI();
        }catch(error){
            console.log(error)
            let message = getErrorMessage(error);
            this.props.setAlert('error', message);
        }
    }

    async componentDidMount(){
        await this.fetchPOI();
    }

    render(){

        const { poiList, previewCoords, openPreviewDialog, isLoading } = this.state;

        return(<div>
            <Grid container>
                <Grid item xs={12}>
                <MaterialTable
                        icons={tableIcons}
                        title="POI"
                        isLoading={isLoading}
                        columns={[
                            { title: 'POI Id', field: 'id' },
                            { title: 'POI Name', field: 'poi_name' },
                            { 
                                title: 'POI Date', 
                                field: 'create_date',
                                render: rowData => moment.utc(rowData['create_date']).format("MMM DD YYYY, hh:mm A"),
                            },
                            { title: 'POI Address', render: rowData => rowData.poi_geo.address },
                            { title: 'POI City',  render: rowData => rowData.poi_geo.city },
                            { title: 'POI Zip Code', render: rowData => rowData.poi_geo.zipcode },
                            { title: 'POI Latitude', render: rowData => rowData.poi_geo.latitude },
                            { title: 'POI Longitude', render: rowData => rowData.poi_geo.longitude },
                            { title: 'POI Description', field: 'description' },
                            { 
                                title: 'Status', 
                                field: 'status',
                                render: rowData => (
                                    <Checkbox 
                                        checked={rowData.status}
                                        name={rowData.poi_name} 
                                        onClick={(event) => {
                                            this.handleCheckboxClick(event, rowData);
                                        }}
                                    />
                                )
                            },
                        ]}
                        data={poiList}

                        options={{
                            search: true,
                            actionsColumnIndex: -1,
                            loadingType: 'linear',
                            headerStyle: {
                                backgroundColor: '#263238',
                                color: '#FFF'
                            },
                            rowStyle: {
                                backgroundColor: '#EEE',
                            }
                        }}
                        
                        actions={[
                            {
                                icon: () => <VisibilityIcon />,
                                tooltip: 'Preview POI',
                                onClick: (event,rowData) => this.handlePreviewPoi(rowData),
                            },
                            {
                                icon: () => <DeleteIcon />,
                                tooltip: 'Delete POI',
                                onClick: (event, rowData) => this.handleDeletePoi(rowData.id),
                            }
                        ]}
                    />
                </Grid>
                    <MapPreview 
                        poiMode={true} 
                        markers={{
                            lat: previewCoords[0] ? previewCoords[0].poi_geo.latitude : 0,
                            lng: previewCoords[0] ? previewCoords[0].poi_geo.longitude : 0
                        }} 
                        open={openPreviewDialog} 
                        onClose={this.onCloseDialog} 
                    />
                </Grid>
            </div>
        )
    }
}

export default ListPoiTable;