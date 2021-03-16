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
import { getZone, deleteZone, toggleZoneStatus } from '../../../Network/network';
import { getErrorMessage } from '../../../Util/helper';

const getCoords = (lat1, long1, lat2, long2) => {
    return [
        [long1, lat1],
        [long2, lat1],
        [long2, lat2],
        [long1, lat2]
    ]
}

class ListZonesTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            zoneList: [],
            previewCoords: [],
            openPreviewDialog: false,
        }

        this.fetchZones = this.fetchZones.bind(this);
        this.handlePreviewZone = this.handlePreviewZone.bind(this);
        this.handleDeleteZone = this.handleDeleteZone.bind(this);
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
        this.onCloseDialog = this.onCloseDialog.bind(this);
    }

    handlePreviewZone(rowData){
        let {lat1, long1, lat2, long2} = rowData;
        let coords = getCoords(lat1, long1, lat2, long2);
        coords = [...coords, coords[0]];
        
        this.setState({
            previewCoords: coords,
            openPreviewDialog: true,
        })
    }
    
    async handleCheckboxClick(event, rowData){
        try{
            let id = rowData.id,
            status = rowData.status;
            let zoneList = [...this.state.zoneList];
            zoneList.forEach(zone => {
                if(zone.id === id) zone.status = !status
            })
            this.setState({
                zoneList: zoneList
            })
            let response = await toggleZoneStatus(id, !status);
            this.props.setAlert('success', 'Zone Status Updated Successfully')
        }catch(error){
            console.log(error);
            let message = getErrorMessage(error);
            this.props.setAlert('error', message)
        }
    }

    async handleDeleteZone(id){
        try{
            let response = await deleteZone(id);
            this.setState({
                isLoading: true
            });
            this.props.setAlert('success', 'Zone deleted successfully')
            await this.fetchZones();
        }catch(error){
            console.log(error)
            let message = getErrorMessage(error);
            this.props.setAlert('error', message);
        }
    }

    onCloseDialog(){
        this.setState({
            openPreviewDialog: false
        })
    }

    async fetchZones(){
        
        try{
            let { companyId } = this.props;
            let zoneList;
            if (this.props.companyId) {
              zoneList = await getZone(companyId, "client");
            } else {
              
              zoneList = await getZone(companyId, "");
            }
            this.setState({
                zoneList: zoneList,
                isLoading: false
            })
        }catch(error){
            console.log(error);
            let message = getErrorMessage(error);
            this.props.setAlert('success', message);
        }
    }

    async componentDidMount(){
        await this.fetchZones();
    }

    render(){
        const { isLoading, zoneList, openPreviewDialog, previewCoords } = this.state;
        return(<Grid container>
            <Grid item xs={12}>
                <MaterialTable
                    icons={tableIcons}
                    isLoading={isLoading}
                    title="Zones"
                    columns={[
                        { title: 'Id', field: 'id' },
                        { title: 'Name', field: 'zone_name' },
                        {   
                            title: 'Zones Date', 
                            field: 'create_date' ,
                            render: rowData => moment.utc(rowData['create_date']).format("MMM DD YYYY, hh:mm A"),
                        },
                        { title: 'Zones Description', field: 'description' },
                        { 
                            title: 'Zone Corners',  
                            align: 'center',
                            render: rowData => {
                                let {lat1, long1, lat2, long2} = rowData;
                                let coords = getCoords(lat1, long1, lat2, long2);
                                return (
                                    <div>
                                        {coords.map(coord => (
                                            <span>({coord[0]},{coord[1]})<br /></span>
                                        ))}
                                    </div>
                                )
                            }
                        },
                        { title: '#Users', field: 'user_count', align: 'center' },
                        { title: '#Devices', field: 'device_count', align: 'center'},
                        { 
                            title: 'Status',  
                            field: 'status',
                            render: rowData => (
                                <Checkbox 
                                    checked={rowData.status}
                                    name={rowData.zone_name} 
                                    onClick={(event) => {
                                        this.handleCheckboxClick(event, rowData);
                                    }}
                                />
                            )
                        }
                    ]}
                    data={zoneList}
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
                            tooltip: 'Preview Zone',
                            onClick: (event,rowData) => this.handlePreviewZone(rowData),
                        },
                        {
                            icon: () => <DeleteIcon />,
                            tooltip: 'Delete Zone',
                            onClick: (event, rowData) => this.handleDeleteZone(rowData.id),
                        },
                    ]}
                />
            </Grid>
            <Grid item>
                {openPreviewDialog && (<MapPreview 
                    markers={{
                        lat: 9.033584880621262, 
                        lng: 7.489695623366288
                    }} 
                    zoneMarkers={previewCoords} 
                    open={openPreviewDialog} 
                    onClose={this.onCloseDialog} 
                    zoneMode={true} 
                />)}
            </Grid>
        </Grid>
        )
    }
}

export default ListZonesTable;