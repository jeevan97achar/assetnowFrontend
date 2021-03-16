import React from 'react'

function errorhandling(props) {
    return (
      <div>
        {props.error.status === 401 ? (
          <img src="401.svg" alt="Unauthorized" width="100%" height="600px" />
        ) : props.error.status === 404 ? (
          <img src="404.svg" alt="Not Found" width="100%" height="600px" />
        ) : props.error.status === 500 ? (
          <img
            src="500.svg"
            alt="Internal server error"
            width="100%"
            height="600px"
          />
        ) : (
          <img
            src="warning.svg"
            alt="Something went wrong"
            width="100%"
            height="600px"
          />
        )}
      </div>
    );
}

export default errorhandling
