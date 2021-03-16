import axios from 'axios';
import { apiHost, mapboxMapsApiKey } from '../Util/config';

export const login = async (username, password) => {
  let apiEndPoint = apiHost + '/account/api-token-auth/';
  let data = new FormData();
  data.append('username', username);
  data.append('password', password);

  let config = {
    method: 'post',
    url: apiEndPoint,
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  let response = await axios(config).catch((err) => {
    console.log("errrrrrrrrrr", err);
    return err;

  })
  console.log("response", response)
  // response = response.data;
  return response;

}

export const getUserDetails = async (username, password, next, userType) => {

  let apiEndPoint = apiHost;

  if (userType === 'admin') apiEndPoint = apiEndPoint + '/webapi/admin';
  else apiEndPoint = apiEndPoint + '/webapi/'

  let data = new FormData();
  let token = sessionStorage.getItem('token');

  data.append('username', username);
  data.append('password', password);
  data.append('next', next);

  let config = {
    method: 'get',
    url: apiEndPoint,
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'multipart/form-data'
    },
    data: data,
  }

  let response = await axios(config);
  response = response.data[0];
  return response;
}

export const getUserCompany = async (id) => {
  let user = JSON.parse(sessionStorage.getItem('user')),
    apiEndPoint = apiHost + '/webapi/companiesview',
    token = sessionStorage.getItem('token');

  let company_id = id ? id : user.company;

  let config = {
    method: 'get',
    url: apiEndPoint,
    headers: {
      Authorization: `Token ${token}`,
    },
    params: {
      company_id: company_id
    }
  }

  let response = await axios(config);
  response = response.data[0];
  return response;
}

export const getDashboardStat = async (username) => {
  let apiEndPoint = apiHost;
  let token = sessionStorage.getItem('token');
  let userType = sessionStorage.getItem('userType');
  if (userType === 'admin') {
    apiEndPoint = apiEndPoint + '/webapi/adminstats';
  } else {
    apiEndPoint = apiEndPoint + '/webapi/clientstats';
  }

  let data = new FormData();
  data.append('username', username);

  let config = {
    method: 'get',
    url: apiEndPoint,
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'multipart/form-data'
    },
    data: data,
  }

  let response = await axios(config);
  response = response.data;
  return response;
}

export const getUsers = async () => {
  let username = sessionStorage.getItem('username'),
    token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/adminuserview/';

  var config = {
    method: 'get',
    url: apiEndPoint + '?username=' + username,
    headers: {
      'Authorization': 'Token ' + token,
    }
  };

  let response = await axios(config);
  return response.data;

}

export const logout = async () => {
  let apiEndPoint = apiHost + '/account/logout/',
    token = sessionStorage.getItem('token'),
    config = {
      method: 'get',
      url: apiEndPoint,
      headers: {
        'Authorization': 'Token ' + token
      }
    };

  let response = await axios(config);
  return response.date
}

//Clients
export const getClientsList = async () => {
  let apiEndPoint = apiHost + '/webapi/compview/',
    token = sessionStorage.getItem('token'),
    username = sessionStorage.getItem('username');

  let config = {
    headers: { Authorization: `Token ${token}` },
    params: {
      username: username,
      filter: 'OtherCompany'
    }
  }

  let response = await axios.get(apiEndPoint, config);
  return response.data;
}

//Devices
export const getDeviceGroups = async (company_id, userType) => {
  let apiEndPoint = apiHost + '/webapi/device_group_view';
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` },
    params: {
      company_id: company_id,
      userType: userType,
    }
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;
}

export const getCompanyGroups = async (companyId) => {
  let apiEndPoint = apiHost + '/webapi/companygroups?company_id='+companyId;
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` },
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;
}

export const getDevices = async (usertype, companyId) => {
  let username = sessionStorage.getItem('username'),
    user = JSON.parse(sessionStorage.getItem('user')),
    userType = usertype ? usertype : sessionStorage.getItem('userType'),
    company_id = companyId ? companyId : user.company;


  let apiEndPoint = apiHost + '/webapi/device_view';
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` },
    params: {
      userType: userType,
      company_id: company_id,
      user_name: username
    }
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;

}

export const getDeviceInfo = async (id) => {
  let apiEndPoint = apiHost + '/webapi/device_get';
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` },
    params: {
      id: id
    }
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;
}

export const getDeviceMakers = async () => {
  let apiEndPoint = apiHost + '/webapi/devicemakers',
    token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` },
  }

  let response = await axios.get(apiEndPoint, config);
  return response.data;
}

export const addDevice = async (formdata) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/device_add';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('selectclientname', formdata.clientname);
  data.append('asset_cat', formdata.asset_cat);
  data.append('name', formdata.name);
  data.append('number', formdata.number);
  data.append('assetstatus', formdata.assetstatus);
  data.append('aqtime', formdata.aqtime);
  data.append('selecttype', formdata.selecttype);
  data.append('msisdn', formdata.msisdn);
  data.append('imei', formdata.imei);
  data.append('network', formdata.network);
  data.append('serial_num', formdata.serial_num);
  data.append('maker', formdata.maker);
  data.append('model', formdata.model);
  data.append('app_name', formdata.app_name);
  data.append('ac_code', formdata.ac_code);
  data.append('selectusernamegroup', formdata.usernamegroup);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token,
    },
    data: data
  };
  
  let response = await axios(config);
  return response;
}

export const editDevice = async (id, formdata) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/device_edit';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('de-Id', id);
  data.append('de-AssetName', formdata.name);
  data.append('de-Model', formdata.model);
  data.append('de-Barcod', formdata.barcode);
  data.append('de-Number', formdata.number);
  data.append('de-AqPrice', formdata.aqprice);
  data.append('de-ManufacturerStatus', formdata.manufacturerstatus);
  data.append('de-AqTime', formdata.aqtime);
  data.append('de-RegStatus', formdata.regstatus);
  data.append('de-AssetStatus', formdata.assetstatus);
  data.append('de-AssetOwnerAddress', formdata.owneraddress);
  data.append('de-AssetCat', formdata.asset_cat);
  // data.append('network', formdata.network);
  // data.append('msisdn', formdata.msisdn);
  // data.append('imei', formdata.imei);
  // data.append('serial_num', formdata.serial_num);

  var config = {
    method: 'post',
    url: apiEndPoint + '?id=' + id,
    headers: {
      'Authorization': 'Token ' + token,
    },
    data: data
  };

  let response = await axios(config);
  return response.data;
}

export const deleteDevice = async (id) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/device_delete';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('deviceId', id);

  var config = {
    method: 'post',
    url: apiEndPoint + '?device_id=' + id,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };

  let response = await axios(config);
  response = response.data;
  return response;
}

export const toggleDeviceStatus = async (id, deviceStatus) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/device_status_toggle';

  let status = (deviceStatus === 'active');

  var FormData = require('form-data');
  var data = new FormData();
  data.append('device_id', id);
  data.append('assetstatus', status);

  var config = {
    method: 'post',
    url: apiEndPoint + '?device_id=' + id + '&assetstatus=' + status,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };

  let response = await axios(config);
  return response;
}

export const setSosTime = async (id, time) => {
  let apiEndPoint = apiHost + '/webapi/setSOSTime',
    token = sessionStorage.getItem('token');

  var FormData = require('form-data');
  var data = new FormData();
  data.append('devid', id);
  data.append('time', time);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };

  let response = await axios(config);
  return response;

}

export const setTrackParameter = async (parameter) => {
  let token = sessionStorage.getItem('token'),
  apiEndPoint = apiHost + '/webapi/DeviceTrackSchedule';
  
  let date = new Date();
  let offsetInfo = date.getTimezoneOffset();

  var FormData = require('form-data');
  var data = new FormData();
  data.append('TrackFilterDeviceID', parameter.id);
  data.append('trackType', parameter.type);
  data.append('asset_tzInfo', offsetInfo);
  data.append('DeviceTrackInterval', parameter.interval);
  data.append('timeFilter1', parameter.timefilter1);
  data.append('timeFilter2', parameter.timefilter2);
  data.append('timeFilter3', parameter.timefilter3);
  data.append('timeFilter4', parameter.timefilter4);
  data.append('timeFilter5', parameter.timefilter5);
  data.append('timeFilter6', parameter.timefilter6);
  data.append('timeFilter7', parameter.timefilter7);
  data.append('timeFilter8', parameter.timefilter8);
  data.append('timeFilter9', parameter.timefilter9);
  data.append('timeFilter10', parameter.timefilter10);
  data.append('timeFilter11', parameter.timefilter11);
  data.append('timeFilter12', parameter.timefilter12);
  data.append('timeFilter13', parameter.timefilter13);
  data.append('timeFilter14', parameter.timefilter14);
  data.append('timeFilter15', parameter.timefilter15);
  data.append('timeFilter16', parameter.timefilter16);
  data.append('timeFilter17', parameter.timefilter17);
  data.append('timeFilter18', parameter.timefilter18);
  data.append('timeFilter19', parameter.timefilter19);
  data.append('timeFilter20', parameter.timefilter20);
  data.append('timeFilter21', parameter.timefilter21);
  data.append('timeFilter22', parameter.timefilter22);
  data.append('timeFilter23', parameter.timefilter23);
  data.append('timeFilter24', parameter.timefilter24);
  data.append('mon', parameter.mon);
  data.append('tue', parameter.tue);
  data.append('wed', parameter.wed);
  data.append('thu', parameter.tue);
  data.append('fri', parameter.fri);
  data.append('sat', parameter.sat);
  data.append('sun', parameter.sun);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token,
    },
    data: data
  };

  let response = await axios(config);
  return response;

}

export const linkObjectToAsset = async (link_obj_id, asset_id) => {
  let apiEndPoint = apiHost + '/webapi/assetlinkbind',
    token = sessionStorage.getItem('token');

  var FormData = require('form-data');
  var data = new FormData();
  data.append('link_obj_id', link_obj_id);
  data.append('asset_id', asset_id);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token,
    },
    data: data
  };

  let response = await axios(config);
  return response.data;

}

//POI
export const getPOI = async (companyId,usertype) => {
  let user = JSON.parse(sessionStorage.getItem('user')),
    token = sessionStorage.getItem('token');

  let company_id = null,
    client = '',
    userType = '';
if(usertype=="client"){
  userType = "client";
}else{
if(user.rolename === 'OntracAdmin' || user.rolename === 'Admin'){
    userType = 'admin'
  }else if(user.rolename === 'ClientAdmin'){
    userType = 'client'
  }else{
    userType = 'analyst'
  }
}
  

  if (companyId) {
    company_id = companyId;
    let clientInfo = await getUserCompany(companyId);
    client = clientInfo.name;
  } else {
    company_id = user.company;
    if (userType === 'admin') {
      client = sessionStorage.getItem('username');
    } else {
      client = JSON.parse(sessionStorage.getItem('client'));
      client = client.name;
    }
  }

  let apiEndPoint = apiHost + '/webapi/poi?client=' + client + '&userType=' + userType + '&company_id=' + company_id;
  var config = {
    method: 'get',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token,
    }
  };

  let response = await axios(config)
  return response.data;
}

export const addPOI = async (name, description, address, city, zipcode, lat, long) => {
  let username = sessionStorage.getItem('username'),
    user = JSON.parse(sessionStorage.getItem('user')),
    userType = sessionStorage.getItem('userType'),
    token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/poiAdd';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('poi_company_id', user.company);
  data.append('poi_userType', userType);
  data.append('poi_username', username);
  data.append('poiLat', lat);
  data.append('poiLong', long);
  data.append('poi_name', name);
  data.append('poi_address', address);
  data.append('poi_city', city);
  data.append('poi_zipcode', zipcode);
  data.append('poi_description', description);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token,
    },
    data: data
  };

  let response = await axios(config);
  return response.data;
}
export const addPOICompany = async (
  name,
  description,
  address,
  city,
  zipcode,
  lat,
  long,id
) => {
  let username = sessionStorage.getItem("username"),
    user = JSON.parse(sessionStorage.getItem("user")),
    userType = sessionStorage.getItem("userType"),
    token = sessionStorage.getItem("token"),
    apiEndPoint = apiHost + "/webapi/poiAdd";

  var FormData = require("form-data");
  var data = new FormData();
  data.append("poi_company_id", id);
  data.append("poi_userType", "client");
  data.append("poi_username", "");
  data.append("poiLat", lat);
  data.append("poiLong", long);
  data.append("poi_name", name);
  data.append("poi_address", address);
  data.append("poi_city", city);
  data.append("poi_zipcode", zipcode);
  data.append("poi_description", description);

  var config = {
    method: "post",
    url: apiEndPoint,
    headers: {
      Authorization: "Token " + token,
    },
    data: data,
  };

  let response = await axios(config);
  return response.data;
};

export const deletePOI = async (id) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/poiDel';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('poi', id);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };


  let response = await axios(config);
  response = response.data;
  return response;
}

export const togglePoiStatus = async (id, status) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/poi_status_toggle';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('poi_id', id);
  data.append('status', status);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token,
    },
    data: data
  };

  let response = await axios(config);
  return response;
}


//Zones
export const getZone = async (companyId,usertype) => {
  let apiEndPoint = apiHost + '/webapi/zone',
    token = sessionStorage.getItem('token'),
    user = JSON.parse(sessionStorage.getItem('user')),
    company_id = null,
    client = '',
    userType = '';
if (usertype==="client"){
userType = "client";
}else{
 if (user.rolename === "OntracAdmin" || user.rolename === "Admin") {
   userType = "admin";
 } else if (user.rolename === "ClientAdmin") {
   userType = "client";
 } else {
   userType = "analyst";
 }
}
 
  
  if (companyId) {
    company_id = companyId;
    let clientInfo = await getUserCompany(companyId);
    client = clientInfo.name;
  } else {
    company_id = user.company;
    if (userType === 'admin') {
      client = sessionStorage.getItem('username');
    } else {
      client = JSON.parse(sessionStorage.getItem('client'));
      client = client.name;
    }
  }

  let config = {
    headers: { Authorization: `Token ${token}` },
    params: {
      client: client,
      userType: userType,
      company_id: companyId
    }
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;

}

export const getAdminUsers = async () => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let username = sessionStorage.getItem('username');
  // let username = sessionStorage.getItem('')

  let apiEndPoint = apiHost + '/webapi/adminuserview/';
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` },
    params: {
      username: username
    }
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;

}

export const getCompanyUsers = async (companyId = null) => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userType = sessionStorage.getItem('username');
  // let username = sessionStorage.getItem('')

  let apiEndPoint = apiHost + '/webapi/companyusers';
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` },
    params: {
      company_id: companyId
    }
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;
}

export const getAdminUsersCompanyView = async () => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userType = sessionStorage.getItem('userType');
  // let username = sessionStorage.getItem('')

  let apiEndPoint = apiHost + '/webapi/adminuserview/';
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` },
    params: {
      username: userType
    }
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;

}

export const getClientUsers = async () => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userType = sessionStorage.getItem('userType');
  let username = sessionStorage.getItem('username')

  let apiEndPoint = apiHost + '/webapi/adminuserview/';
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` },
    params: {
      username: username
    }
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;
}

export const getClients = async (company_id) => {
  let companyId = company_id ? company_id : "";
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userType = sessionStorage.getItem('userType');

  let apiEndPoint = apiHost + '/webapi/companiesview';
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` },
    params: {
      companyid: companyId
    }
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;

}

export const getDeviceTypes = async () => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userType = sessionStorage.getItem('userType');

  let apiEndPoint = apiHost + '/webapi/device_type_sb_view';
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` }
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;

}

export const getObjects = async () => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userType = sessionStorage.getItem('userType');

  let apiEndPoint = apiHost + '/webapi/assetlinkObjs';
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` }
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;
}

export const addZone = async (name, description, lat1, long1, lat2, long2) => {
  let username = sessionStorage.getItem('username'),
    company_id = JSON.parse(sessionStorage.getItem('user')).company,
    userType = sessionStorage.getItem('userType'),
    token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/zoneAdd';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('zone_username', username);
  data.append('zone_company_id', company_id);
  data.append('zone_userType', userType);
  data.append('zone_name', name);
  data.append('zone_description', description);
  data.append('lat1', lat1);
  data.append('long1', long1);
  data.append('lat2', lat2);
  data.append('long2', long2);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token,
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

}
export const addZonecompany = async (name, description, lat1, long1, lat2, long2,id) => {
  let username = sessionStorage.getItem("username"),
    company_id = JSON.parse(sessionStorage.getItem("user")).company,
    userType = sessionStorage.getItem("userType"),
    token = sessionStorage.getItem("token"),
    apiEndPoint = apiHost + "/webapi/zoneAdd";

  var FormData = require("form-data");
  var data = new FormData();
  data.append("zone_username", "");
  data.append("zone_company_id", id);
  data.append("zone_userType", "client");
  data.append("zone_name", name);
  data.append("zone_description", description);
  data.append("lat1", lat1);
  data.append("long1", long1);
  data.append("lat2", lat2);
  data.append("long2", long2);

  var config = {
    method: "post",
    url: apiEndPoint,
    headers: {
      Authorization: "Token " + token,
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deleteZone = async (id) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/zoneDel';

  let data = new FormData();
  data.append('zone', id);

  let config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token,
    },
    data: data
  }

  let response = await axios(config)
  response = response.data;
  return response;
}

export const toggleZoneStatus = async (id, status) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/zone_status_toggle';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('zone_id', id);
  data.append('status', status);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token,
    },
    data: data
  };


  let response = await axios(config);
  return response;
}

//Asset App
export const getAssetApps = async () => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/assetapps';
  var config = {
    method: 'get',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token,
    },
  };

  let response = await axios(config);
  return response.data;
}

//Others
export const getMapboxAddress = async (long, lat) => {
  let apiEndPoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + long + ',' + lat + '.json?access_token=' + mapboxMapsApiKey;
  let response = await axios.get(apiEndPoint).catch((err)=>{
    console.log(err)

  });
  console.log(response);
  return response.data;
}

export const getCompanyLocations = async () => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userType = sessionStorage.getItem('userType');

  let apiEndPoint = apiHost + '/webapi/locationsview';
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` }
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;

}

export const deleteuser = async (id) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/account/userDel';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('user', id);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };


  let response = await axios(config);
  response = response.data;
  return response;
}

export const deleteCompany = async (id) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/del_company';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('id', id);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };


  let response = await axios(config);
  response = response.data;
  return response;
}

export const deleteDeviceGroup = async (id) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/device_group_delete';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('edgform-Id', id);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };
  let response = await axios(config);
  response = response.data;
  return response;
}

export const addLocation = async (name, address) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/locationsadd';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('dtLocationName', name);
  data.append('dtLocationAddress', address);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token,
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      return JSON.stringify(response)
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const userProfile = async () => {
  console.log("Profile_ID:",sessionStorage.getItem('user_id'))
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userType = sessionStorage.getItem('userType');
  let userId = sessionStorage.getItem('user_id')

  let apiEndPoint = apiHost + '/webapi/userprofile';
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` },
    params: {
      user_id: userId
    }
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;

}

export const getListObjects = async () => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userType = sessionStorage.getItem('userType');

  let apiEndPoint = apiHost + '/webapi/assetlinkObjs';
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` }
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;

}

export const addObject = async (objectType, objectName, objectId) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/assetlinkObjAdd';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('link_obj_type', objectType);
  data.append('link_obj_name', objectName);
  data.append('link_obj_id', objectId);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };


  let response = await axios(config);
  response = response.data;
  return response;
}


export const deleteObject = async (objectType, objectName, objectId) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/assetlinkObjDel';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('link_obj_type', objectType);
  data.append('link_obj_name', objectName);
  data.append('link_obj_id', objectId);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };


  let response = await axios(config);
  response = response.data;
  return response;
}

export const editCompany = async (companyName, companyAddress, companyId, primaryContact, industryType, enrollmentDate, expiryDate, id) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/edit_company';

  var FormData = require('form-data');
  var data = new FormData();
  // data.append('company_name_e ', companyName);
  // data.append('company_address_e', companyAddress);
  // data.append('corporate_id_e', primaryContact);
  // data.append('company_type_e', industryType);
  // data.append('start_date_e', enrollmentDate);
  // data.append('end_date_e', expiryDate);
  // data.append('primary_contact_e', companyId);

  data.append('id', id);
  data.append('company_name_e', companyName);
  data.append('company_address_e', companyAddress);
  data.append('corporate_id_e', companyId);
  data.append('company_type_e', industryType);
  data.append('start_date_e', enrollmentDate);
  data.append('end_date_e', expiryDate);
  data.append('primary_contact_e', primaryContact);
  var config = {
    method: 'post',
    url: 'http://13.126.229.55:8000/webapi/edit_company',
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };


  let response = await axios(config);
  // response = response.data;
  return response;
}

export const getAlertsList = async () => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userType = sessionStorage.getItem('userType');

  let apiEndPoint = apiHost + '/webapi/assetlinkObjs';
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` }
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;
}


//Analyst View
export const getDeviceTrackData = async (id) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/device_track_analyst?dvId=' + id;
  //apiEndPoint = apiHost + '/webapi/device_track_view?dvId='+id;

  var config = {
    method: 'get',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token,
    }
  };

  let response = await axios(config);
  return response.data;

}

export const getRestoreSetting = async () => {
  let username = sessionStorage.getItem('username'),
    token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/restore_settings?user=' + username + '&lkl=True';

  var config = {
    method: 'get',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token,
    }
  };

  let response = await axios(config);
  return response.data;
}

export const changePassword = async (password1, password2, firstName, lastName, username, email, dob) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/profileoperations';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('pe-password1', password1);
  data.append('pe-password2', password2);
  data.append('pe-first_name', firstName);
  data.append('pe-last_name', lastName);
  data.append('pe-username_in', username);
  data.append('pe-email', email);
  data.append('profilephoto', "none");
  data.append('pe-dob', dob);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };


  let response = await axios(config);
  response = response.data;
  return response;
}

export const addAdminUsers = async (userType, firstName, lastName, username, email, password, reTypePassword, primaryPhone, secondaryPhone, officeLocation, status, subroleName) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/account/register_ajax/';

  var FormData = require('form-data');
  var data = new FormData();

  if (subroleName === "")
  data.append('rolename', userType);
  data.append('subrolename', subroleName);
  data.append('client_name', 'Ontrac');
  data.append('username', username);
  data.append('first_name', firstName);
  data.append('last_name', lastName);
  data.append('email', email);
  data.append('password', password);
  data.append('password2', reTypePassword);
  data.append('user', username);
  data.append('payment_info', 'Done');
  data.append('photo', '');
  data.append('stats', '');
  data.append('company', '1');
  data.append('package', '');
  data.append('wallet', '');
  data.append('code', '');
  data.append('phone1', primaryPhone);
  data.append('phone2', secondaryPhone);
  data.append('officeLoc', officeLocation);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };
  let response = await axios(config);
  response = response.data;
  return response;
}

// export const addAdminUsers = async (userType, firstName, lastName, username, email, password, reTypePassword, primaryPhone, secondaryPhone, officeLocation, status, subroleName) => {
//   console.log("ADD_USER_API_CALLED")
//   let token = sessionStorage.getItem('token'),
//     apiEndPoint = apiHost + '/account/register_ajax/';
//   let user = JSON.parse(sessionStorage.user.company)
//   console.log("USER_COMPANY_ID:", user.company)

//   var FormData = require('form-data');
//   var data = new FormData();

//   data.append('rolename', userType);
//   data.append('subrolename', subroleName);
//   data.append('client_name', 'Ontrac');
//   data.append('username', username);
//   data.append('first_name', firstName);
//   data.append('last_name', lastName);
//   data.append('email', email);
//   data.append('password', password);
//   data.append('password2', reTypePassword);
//   data.append('user', username);
//   data.append('payment_info', 'Done');
//   data.append('photo', '');
//   data.append('stats', '');
//   data.append('company', user);
//   data.append('package', '');
//   data.append('wallet', '');
//   data.append('code', '');
//   data.append('phone1', primaryPhone);
//   data.append('phone2', secondaryPhone);
//   data.append('officeLoc', officeLocation);

//   console.log("ADD_BODY:", data)

//   var config = {
//     method: 'post',
//     url: apiEndPoint,
//     headers: {
//       'Authorization': 'Token ' + token
//     },
//     data: data
//   };


//   let response = await axios(config);
//   response = response.data;
//   return response;
// }

export const addCompanyUsers = async (userType, firstName, lastName, username, email, password, reTypePassword, primaryPhone, secondaryPhone, officeLocation, status, companyId) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/account/register_ajax/';
  // let user = JSON.parse(sessionStorage.user)
  // console.log("USER_COMPANY_ID:", user.company)

  var FormData = require('form-data');
  var data = new FormData();

  data.append('rolename', userType);
  data.append('subrolename', 'NA');
  data.append('client_name', 'NA');
  data.append('username', username);
  data.append('first_name', firstName);
  data.append('last_name', lastName);
  data.append('email', email);
  data.append('password', password);
  data.append('password2', reTypePassword);
  data.append('user', 'NA');
  data.append('payment_info', 'Done');
  data.append('photo', '');
  data.append('stats', '');
  data.append('company', companyId);
  data.append('package', '');
  data.append('wallet', '');
  data.append('code', '');
  data.append('phone1', primaryPhone);
  data.append('phone2', secondaryPhone);
  // data.append('officeLoc', officeLocation);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };


  let response = await axios(config);
  response = response.data;
  return response;
}

export const editUser = async (id, username, firstName, lastName, email, primaryPhone, secondaryPhone, roleName, subRoleName) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/account/edit/';

  var FormData = require('form-data');
  var data = new FormData();
  data.append("ueform-Id", id);
  data.append("ueform-username", username);
  data.append("ueform-user_name1", firstName);
  data.append("ueform-user_name2", lastName);
  data.append("ueform-rolename", roleName);
  data.append("ueform-subrolename", subRoleName);
  data.append("ueform-email", email);
  data.append("ueform-phone1", primaryPhone);
  data.append("ueform-phone2", secondaryPhone);
  data.append("ueform-payment", '');
  data.append("ueform-status", '');

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };
  let response = await axios(config);
  // response = JSON.stringify({response})
  return response;
}

export const addCompany = async (companyName, companyAddress, companyId, industryType, enrollmentDate, expiryDate) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/register_company';

  var FormData = require('form-data');
  var data = new FormData();
  data.append("name", companyName);
  data.append("company_address", companyAddress);
  data.append("corporate_id", companyId);
  data.append("company_type", industryType);
  data.append("start_date", enrollmentDate);
  data.append("end_date", expiryDate);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };


  let response = await axios(config);
  response = response.data;
  return response;
}

export const getUserManageClients = async (username) => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userType = sessionStorage.getItem('userType');
  // let username = sessionStorage.getItem('username')  
  let apiEndPoint = apiHost + '/webapi/AdminUserManageClient';
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` },
    params: {
      username: username
    }
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;
}

export const addNewClientManagement = async (user, client) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/AdminUserManageClient';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('user', user);
  data.append('client', client);
  data.append('method', "add");

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };


  let response = await axios(config);
  response = response.data;
  return response;
}

export const deleteClientManagement = async (user, client) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/AdminUserManageClient';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('user', user);
  data.append('client', client);
  data.append('method', "delete");

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };


  let response = await axios(config);
  response = response.data;
  return response;
}


export const getDeviceGroupsCompany = async (id) => {
  let username = sessionStorage.getItem('username');
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userType = sessionStorage.getItem('userType');

  let apiEndPoint = apiHost + '/webapi/device_group_view';
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` },
    params: {
      company_id: id,
      userType: 'client',
      // user_name: username
    }
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;

}

export const editDeviceGroup = async (id, username, firstName, lastName, email, primaryPhone, secondaryPhone) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/edit_company';

  var FormData = require('form-data');
  var data = new FormData();
  data.append("ueform-Id", id);
  data.append("ueform-username", username);
  data.append("ueform-user_name1", firstName);
  data.append("ueform-user_name2", lastName);
  data.append("ueform-email", email);
  data.append("ueform-phone1", primaryPhone);
  data.append("ueform-phone2", secondaryPhone);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };


  let response = await axios(config);
  response = response.data;
  return response;
}

export const addDeviceGroup = async (deviceGroup, description, clientId) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/device_group_add';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('dgAssetGroup', deviceGroup);
  data.append('dgDescription', description);
  data.append('dgClientId', clientId);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };


  let response = await axios(config);
  response = response.data;
  return response;
}

export const editCompanyDeviceGroup = async (client, deviceGroup, description) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/device_group_edit';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('edgform-Id', client);
  data.append('edgform-AssetGroup', deviceGroup);
  data.append('edgform-Description', description);

  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token
    },
    params: {
      // company_id: company_id
    },
    data: data
  };


  let response = await axios(config);
  response = response.data;
  return response;
}

export const getPaymentTransactions = async (id) => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userType = sessionStorage.getItem('userType');
  console.log("ID:", id)

  let apiEndPoint = apiHost + '/wallet/accTransactions';
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` },
    params: {
      userid: id,
      account_type: 'Personal'
    }
  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;
}
export const CapacityReports = async (startdate, enddate) => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userType = sessionStorage.getItem('userType');


  let apiEndPoint =
    apiHost + "/webapi/capacityStats?start_date=" + startdate + "&end_date=" + enddate;
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` },

  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;
}
export const systemStatistics = async (startdate, enddate) => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userType = sessionStorage.getItem('userType');


  let apiEndPoint =
    apiHost + "/webapi/locationStats?company_id=&start_date=" + startdate + "&end_date=" + enddate;
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` },

  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;
}
export const revenue = async (startdate, enddate) => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let userType = sessionStorage.getItem('userType');


  let apiEndPoint =
    apiHost + "/webapi/customerStats?start_date=" + startdate + "&end_date=" + enddate;
  let token = sessionStorage.getItem('token');

  let config = {
    headers: { Authorization: `Token ${token}` },

  }

  let response = await axios.get(apiEndPoint, config);
  response = response.data;
  return response;
}

export const getNOC = async (assetName, status) => {
  let apiEndPoint = apiHost + '/webapi/device_view_noc',
    token = sessionStorage.getItem('token'),
    username = sessionStorage.getItem('username');

  let config = {
    headers: { Authorization: `Token ${token}` },
    params: {
      noc: '1',
      lkl: false,
      asset_name: assetName,
      status: status
    }
  }

  let response = await axios.get(apiEndPoint, config);
  return response.data;
}

export const refreshAlerts = async (deviceId) => {
  let token = sessionStorage.getItem('token'),
    apiEndPoint = apiHost + '/webapi/alertsRefresh';

  var FormData = require('form-data');
  var data = new FormData();
  data.append('device_id', deviceId);
 
  console.log("DATA__",data)
  var config = {
    method: 'post',
    url: apiEndPoint,
    headers: {
      'Authorization': 'Token ' + token
    },
    data: data
  };


  let response = await axios(config);
  response = response.data;
  return response;
}