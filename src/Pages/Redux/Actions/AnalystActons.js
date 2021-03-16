import { apiHost } from "../../../Util/config";
export function getAnalystData() {
  return (dispatch) => {
    dispatch(fetchProductsBegin());
    let token = sessionStorage.getItem("token");
    let userType = sessionStorage.getItem("userType");
    let username = sessionStorage.getItem("username");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    return fetch(
      apiHost + "/webapi/device_view_analyst?user=" + username +
        "&lkl=false&count",
      requestOptions
    )
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          response
            .json()
            .then((result) => {dispatch(
              fetchFilterDataSuccess(result))
              dispatch(fetchLocationDataEmpty())
            })
        } else {
          // dispatch(fetchProductsFailure(response));
        }
      })
      .catch((error) => console.log(error));

// const axios = require("axios");

// let config = {
//   method: "get",
//   url:
//       apiHost +
//         "/webapi/device_view_analyst?user=" +
//         username +
//         "&lkl=True&count",
//   headers: {
//     Authorization: "Token "+token,
//   },
// };

// return axios(config)
//   .then((response) => {
//     dispatch(fetchFilterDataSuccess(JSON.stringify(response.data)));
//   })
//   .catch((error) => {
//     console.log(error);
//   });
  };
}
export function locateapi(raw) {
  return (dispatch) => {
    // dispatch(fetchProductsBegin());
    let token = sessionStorage.getItem("token");
    let userType = sessionStorage.getItem("userType");
    let username = sessionStorage.getItem("username");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
     var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    return fetch(
      apiHost + "/webapi/device_locate_analyst?dvId="+raw,
      requestOptions
    )
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {

          response
            .json()
            .then((result) => dispatch(fetchLocationDataSuccess(result)));
        } else {
          // dispatch(fetchProductsFailure(response));
        }
      })
      .catch((error) => console.log(error));
      
  };
}
export const FETCH_ANALYST_DATA_BEGIN = "FETCH_ANALYST_DATA_BEGIN";
export const FETCH_ANALYST_DATA_SUCCESS = "FETCH_ANALYST_DATA_SUCCESS";
export const FETCH_LOCATION_DATA_SUCCESS = "FETCH_LOCATION_DATA_SUCCESS";
export const FETCH_LOCATION_DATA_EMPTY = "FETCH_LOCATION_DATA_EMPTY";
export const FETCH_ANALYST_DATA_FAILURE = "FETCH_ANALYST_DATA_FAILURE";
export const fetchProductsBegin = () => ({
  type: FETCH_ANALYST_DATA_BEGIN,
});

export const fetchFilterDataSuccess = (analystdata) => (
    {
  type: FETCH_ANALYST_DATA_SUCCESS,
  payload: { analystdata },
});
export const fetchLocationDataSuccess = (locationapidata) => ({
  type: FETCH_LOCATION_DATA_SUCCESS,
  payload: { locationapidata },
});
export const fetchLocationDataEmpty = () => ({
  type: FETCH_LOCATION_DATA_EMPTY,
  payload: {},
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_ANALYST_DATA_FAILURE,
  payload: { error },
});