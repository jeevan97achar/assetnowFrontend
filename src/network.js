import Axios from "axios";
let res = [];

export const getnetwork = async (url, token, params) => {
   let response= await Axios.get(url, {
      headers: {
        Authorization: token,
      },params
    })
      .catch((error) => {
        
      return error
       
      });
      return response;
   
};

export const post = async (url, token, formdata) => {
  let headers = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
   let response = await Axios.post(url, formdata, headers)
     .then((response) => {
       res = response;
       // ShowSuccessSnackbar("Added succesfully")
     })
     .catch((error) => {
      return error;
     });
  return response;
};

export const put = async (url, token, formdata) => {
  let headers = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
  let response= await Axios.put(url, formdata, headers)
    .then((response) => {
      res = response;
      // ShowSuccessSnackbar("Added succesfully")
    })
    .catch((error) => {
     return error
      // console.log(error.response.status)
      // if(error.response.status===401){

      // }
    });
  return response;
};

export const del = async (url, token) => {
  let headers = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
  let response= await Axios.delete(url, headers)
    .then((response) => {
      res = response;
      // ShowSuccessSnackbar("Added succesfully")
    })
    .catch((error) => {
     return error
      // console.log(error.response.status)
      // if(error.response.status===401){

      // }
    });
  return response;
};

  




