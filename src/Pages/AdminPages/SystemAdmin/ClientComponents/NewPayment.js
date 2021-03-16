import React, { useState, useEffect } from "react";
import { withRouter } from "react-router"
import {
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
} from "@material-ui/core";
import { PaystackButton } from "react-paystack";
import { usePaystackPayment } from "react-paystack";
import { paystackpublickey } from "../../../../Util/config";
import MaterialTable from "material-table";
import { tableIcons } from "../../../../Util/ui-reference"
import { getPaymentTransactions } from "../../../../Network/network"
import moment from 'moment';


function NewPayment(props) {
  const [id, setId] = useState();
  const [email, setEmail] = useState("");
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [amount, setAmount] = useState(0);
  const [payments, setPayments] = useState()
  const [addFlag, setAddFlag] = useState(true);
  const [isLoading, setIsLoading]= useState(true);
  const [pageLoading, setPageLoading] = useState(true)
  const config = {
    reference: new Date().getTime(),
    email: email,
    amount: amount,
    publicKey: paystackpublickey,
    metadata: {
      firstname: firstname,
      lastname: lastname,
    },
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
        >
          Pay
        </Button>
      </div>
    );
  };

  const fetchPaymentTransactions = async(id) => {
    if(isLoading){
        await getPaymentTransactions(id)
        .then((response) => {
            console.log("Response:",response);
            setPayments(response); 
        })
        .catch(error => {
            console.log(error)
        })
        // setIsLoading(false);
    }
}

useEffect(() => {
    console.log("PaymentPageProps:", props)
    // await setId(props.location.data.id)
    fetchPaymentTransactions(props.history.location.data.id)
    // if(isLoading){
    //     getCompanyLocations()
    //     .then((response) => {
    //         console.log(response);
    //         setLocationsList(response);
    //         setIsLoading(false);
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // }
})

  return (
    <div>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={2}
        style={{ padding: 20 }}
      >

        <Grid item container justify="space-between" alignItems="center">

          <Grid item>
            <Typography variant="h5">New Payment</Typography>
          </Grid>

          <Grid item>
            <Button
              variant='contained'
              color='primary'
              onClick={() => setAddFlag(!addFlag)}
            >
              {addFlag ? "Add New Payment" : "Back to Payments"}
            </Button>
          </Grid>
        </Grid>


        <Grid item xs={12}>
          <Divider />
        </Grid>

        {addFlag ?
          (<>
            <Grid item xs={12}>
              <MaterialTable
                icons={tableIcons}
                title=""
                columns={[
                  { title: 'Transaction Id', field: 'id' },
                  { title: 'Date', render: rowData => moment.utc(rowData['trxDate']).format("MMM DD YYYY, hh:mm A") },
                  { title: 'Amount', field: 'trxAmount' },
                  { title: 'Status', field: 'trxStatus' },
                  { title: 'Source', field: 'trxSource' },
                  { title: 'Transaction Type', field: 'trxType' },
                  { title: 'Balance', field: 'balanceAfterTrx' },

                ]}
                data={payments}
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

              // actions={[

              //     {
              //       icon: () => <DeleteIcon fontSize="small"/>,
              //       tooltip: 'Preview POI',
              //     //   onClick: (event,rowData)=>handleDetailsClick(rowData),

              //   },
              // ]}
              />
            </Grid>
          </>) : (
            <>
              <Grid item xs={3}>
                <Typography variant="subtitle1">Email Address</Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  id="outlined-basic"
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle1">Amount</Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  value={amount / 100}
                  id="outlined-basic"
                  label="Amount"
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={(event) => {
                    setAmount(event.target.value * 100);
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle1">First Name</Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  value={firstname}
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={(event) => setfirstName(event.target.value)}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle1">Last Name</Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  value={lastname}
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={(event) => setlastName(event.target.value)}
                />
              </Grid>

              <Grid item xs={4} style={{ padding: 30 }}>
                <PaystackHookExample />
              </Grid>
            </>
          )}


      </Grid>
    </div>
  );
}

export default withRouter(NewPayment)
