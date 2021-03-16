import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    Checkbox,
    MenuItem
} from '@material-ui/core';
import MaterialTable from 'material-table';
import moment from 'moment';

import { tableIcons } from '../../../Util/ui-reference';
import { getDevices, deleteDevice, toggleDeviceStatus, getObjects } from '../../../Network/network';

//Icons
import EditIcon  from '@material-ui/icons/Edit';
import SOSIcon from '@material-ui/icons/ChatBubble';
import TestIcon from '@material-ui/icons/Settings';
import LinkIcon from '@material-ui/icons/Send';
import TrackIcon  from '@material-ui/icons/Explore';
import DeleteIcon from '@material-ui/icons/Delete';
import { getErrorMessage } from '../../../Util/helper';


const getDays = (rowData) => {
    let {sun, mon, tue, wed, thu, fri, sat} = rowData;
    let days = '';
    if(sun) days += 'Su ';
    if(mon) days += 'M ';
    if(tue) days += 'T ';
    if(wed) days += 'W ';
    if(thu) days += 'Th ';
    if(fri) days += 'F ';
    if(sat) days += 'S ';

    return days;
}

class ListDevicesTable extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            key: 1,
            isLoading: true,
            showTrack : false,
            Devices: [],
            AssetGroups: [],
            AssetCategory: [],
            AssetClient: null,
            
        }

        this.deleteSelectedDevice = this.deleteSelectedDevice.bind(this);
    }

    async handleCheckboxClick(event, rowData){
        try{
            let id = rowData.id;
            let status = rowData.assetstatus === 'active' ? 'inactive' : 'active';

            let deviceList = [...this.state.Devices];
            deviceList.forEach(device => {
              if(device.id === id) device.assetstatus = status;
            })

            this.setState({ Devices: deviceList})
            let response = await toggleDeviceStatus(id, status);
            this.props.setAlert('success', 'Status Updated Successfully')
        }catch(error){
          console.log(error);
          let message = getErrorMessage(error); 
          this.props.setAlert('error', message);
        }        
    }

    getDeviceGroupName(id){
        let name = '';
        this.state.AssetGroups.forEach((group) => {
          if(id == group.id) name = group.group_name;
        })
        return name;
    }

    getDeviceType(id){
        let cat = '';
        this.state.AssetCategory.forEach((category) => {
            if(id == category.id) cat = category.assettypename;
        })
        return cat;
    }

    getDeviceGroups(groupIds){
        return (
            <FormControl>
                <InputLabel>Groups</InputLabel>
                <Select value='' > 
                    {groupIds.map((id) => (
                        <MenuItem value={id}>{this.getDeviceGroupName(id)}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

    async fetchDevices(){
      try{
        let userType = null,
        companyId = this.props.companyId,
        userDetails = JSON.parse(sessionStorage.getItem('user'));

        if(this.props.companyId){
          userType = 'client';
        }else if(userDetails.rolename === 'ClientAdmin'){
          userType = 'client';
        }else if(userDetails.rolename === 'Admin' || userDetails.rolename === 'OntracAdmin'){
          userType = 'admin'
        }else{
          userType = 'analyst'
        }

        let response = await getDevices(userType, companyId);
        let Devices = response.Devices ? response.Devices : [],
        AssetClientMap = response.AssetClientMap;

        Devices.forEach(device => {
          let client_id = 0;
          AssetClientMap.forEach(ac => {
            if(ac.asset == device.id) client_id = ac.client;
          })
          device['client_id']  = client_id; 
        })

        this.setState({
          AssetGroups: response.AssetGroups,
          AssetCategory: response.AssetCategory,
          Devices: Devices,
          isLoading: false,
          key: this.state.key+1
        })
      }catch(error){
        console.log(error);
        let message = getErrorMessage(error); 
        this.props.setAlert('error', message);
      }
    }

    async deleteSelectedDevice(id){
      try{
        let response = await deleteDevice(id);
        this.setState({ isLoading: true })
        this.props.setAlert('success', 'Device deleted successfully')
        this.fetchDevices();
      }catch(error){
        console.log(error);
        let message = getErrorMessage(error);
        this.props.setAlert('error', message);
      }
    }

    async componentDidMount(){
      await this.fetchDevices();
      let objects = await getObjects();
      this.props.setObjects(objects);
    }

    render(){
        const { 
            setDeviceId, 
            setEditMode, 
            setAddUserFlag, 
            setShowTrack, 
            setShowSos,
            setShowLinkModal,
            setAssetClient
        } = this.props;

        return(<div>
            <MaterialTable 
                key={this.state.key}
                icons={tableIcons}
                title="Devices"
                isLoading={this.state.isLoading}
                columns={[
                  { title: 'Device Id', field: 'id' },
                  { title: 'Nick Name', field: 'name' },
                  { 
                    title: 'Activation Date', 
                    render: rowData => moment.utc(rowData['aqtime']).format("MMM DD YYYY, hh:mm A"),
                  },
                  { 
                    title: 'Valid Week Days',  
                    render: rowData => getDays(rowData)
                  },
                  { 
                    title: 'Device Group', 
                    field: 'asset_group',
                    render: rowData => this.getDeviceGroups(rowData.asset_group)
                  },
                  { 
                    title: 'Device Type', 
                    field: 'asset_cat',
                    render: rowData => this.getDeviceType(rowData.asset_cat)
                  },
                  { title: 'Device Number', field: 'number' },
                  { 
                    title: 'Status', 
                    field: 'assetstatus',
                    render: rowData => (
                      <Checkbox 
                        key={rowData.id}
                        checked={(rowData.assetstatus === 'active')} 
                        name={rowData.name} 
                        onClick={(event) => {
                          this.handleCheckboxClick(event, rowData)
                        }} 
                      />
                    ) 
                  },
                ]}
                data={this.state.Devices}        
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
                    icon: () => <EditIcon style={{fontSize: 18}} />,
                    tooltip: 'Edit',
                    onClick: (event, rowData) => {
                      setDeviceId(rowData.id);
                      setEditMode(true);
                      setAddUserFlag(true);
                      setAssetClient(rowData['client_id']);
                    }
                  },
                  {
                    icon: () => <SOSIcon style={{fontSize: 18}} />,
                    tooltip: 'Set SOS',
                    onClick: (event, rowData) => {
                      setDeviceId(rowData.id);
                      setShowSos(true);
                    }
                  },
                  {
                    icon: () => <TestIcon style={{fontSize: 18}} />,
                    tooltip: 'Test',
                    onClick: (event, rowData) => {}
                  },
                  {
                    icon: () => <LinkIcon style={{fontSize: 18}} />,
                    tooltip: 'Link',
                    onClick: (event, rowData) => {
                      setShowLinkModal(true);
                      setDeviceId(rowData.id);
                    }
                  },
                  {
                    icon: () => <TrackIcon style={{fontSize: 18}} />,
                    tooltip: 'Track',
                    onClick: (event, rowData) => {
                      setDeviceId(rowData.id);
                      setShowTrack(true);
                    }
                  },
                  {
                    icon: () => <DeleteIcon style={{fontSize: 18}} />,
                    tooltip: 'Delete',
                    onClick: (event, rowData) => {
                      this.deleteSelectedDevice(rowData.id)
                    }
                  },
  
                ]}
            />
        </div>);
    }
}

export default ListDevicesTable; 