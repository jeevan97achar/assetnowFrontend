import {apiHost}from "../../../Util/config";
import {getAnalystData} from "./AnalystActons";
export function getfilterData() {

  return (dispatch) => {
    dispatch(fetchProductsBegin());
    let token = sessionStorage.getItem("token");
  let userType = sessionStorage.getItem("userType");
  let username = sessionStorage.getItem("username");
  let lkl=sessionStorage.getItem("lkl")
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(
      apiHost + "/webapi/restore_settings?user=" + username + "&lkl="+lkl,
      requestOptions
    )
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          response
            .json()
            .then((result) =>{
              dispatch(fetchFilterDataSuccess(result))
              dispatch(getAnalystData());
            }
            );
        } else {
          dispatch(fetchProductsFailure(response));
        }
      })
      .catch((error) => dispatch(fetchProductsFailure(error)));
  };
}
export function post(raw) {
 
  return (dispatch) => {

 let token = sessionStorage.getItem("token");
 let userType = sessionStorage.getItem("userType");
 let username = sessionStorage.getItem("username");
var myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Token "+token
);

var formdata = new FormData();
formdata.append("settings",  JSON.stringify(raw) );
formdata.append("user", username);
var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow",
};
console.log(formdata);

    return fetch(
      apiHost+"/webapi/backup_settings",
      requestOptions
    )
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          response.json().then((result) => dispatch(getfilterData()));
        } else {
          // dispatch(fetchProductsFailure(response));
        }
      })
      .catch((error) => console.log(error));
  };
}
export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN,
});

export const fetchFilterDataSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products },
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error },
});
