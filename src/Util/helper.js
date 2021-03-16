export const getErrorMessage = (error) => {
    let status = error.response ? error.response.status : '',
    err_msg = error.response ? error.response.statusText: error.message;
    let message = err_msg;

    if(status){
        message = status + ": "+err_msg;
    }

    return message;
}