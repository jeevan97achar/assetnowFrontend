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
import MapPreview from '../../../Components/map-preview-pane/map-preview-pane';
import { getAdminUsers, deleteUser } from "../../../Network/network";

class AdminUsersTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            adminUserList: [],
        }
        this.fetchAdminUsers = this.fetchAdminUsers.bind(this);
        this.handleDeleteUsers = this.handleDeleteUsers.bind(this);
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
        }
    }

    async fetchAdminUsers(){
        try{
            let adminUserList = await getPOI();
            this.setState({
                isLoading: false,
                adminUserList: adminUserList
            })
        }catch(error){
            console.log(error);
        }
    }

    async handleDeletePoi(id){
        console.log('Deleting '+id);
        try{
            let response = await deletePOI(id);
            this.setState({isLoading: true})
            await this.fetchPOI();
        }catch(error){
            console.log(error)
        }
    }

    async componentDidMount(){
        await this.fetchPOI();
    }
    
    render(){

        const { poiList, previewCoords, openPreviewDialog, isLoading } = this.state;

        return(
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
                            loadingType: 'linear'
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
        )
    }
}

export default ListPoiTable;