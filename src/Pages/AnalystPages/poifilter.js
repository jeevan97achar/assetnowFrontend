import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getfilterData, post } from "../Redux/Actions/FilterActions";
import { apiHost } from "../../Util/config";
import {
  Grid,
  Button,
  FormControl,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
function Poifilter(props) {
  const [poidata, setpoidata] = useState([]);
  const [data, setData] = useState();
  const [poieditdata, setpoieditdata] = useState();
  const [loading, setloading] = useState(false);
  const [locations, setLocations] = useState();
  const [locationeditdata, setLocationeditdata] = useState();
  const [poi, setpoi] = useState([]);
  const [poishow,setpoishow]=useState(true);
  const [locationshow,setlocationshow]=useState(false)
  useEffect(() => {
    if (props.data.settings) {
      getpoi();

      setData(props.data.settings);
      var d = new Date();
      var n = d.getTimezoneOffset();
      //   console.log("timezoneoffset", n);
    }
  }, [props.data]);
  const getpoi = async () => {
    let token = sessionStorage.getItem("token");
    let userType = sessionStorage.getItem("userType");
    let user = JSON.parse(sessionStorage.getItem("user"));
    let username = sessionStorage.getItem("username");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

    var formdata = new FormData();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      apiHost +
        "/webapi/poi?client=" +
        username +
        "&userType=" +
        userType +
        "&company_id=" +
        user.company,
      requestOptions
    )
      .then((response) => {
        response.json().then((result) => {
         if (Object.keys(result).length !== 0) {
           setpoi(result);
         }
         else{
           setpoi([])
         }
          // console.log(result)
          initarr(result);
        });
      })

      .catch((error) => console.log("error", error));

    // setloading(true);
  };
  const initarr = async (poi) => {
    let arr = [];
    if (Object.keys(poi).length !== 0) {
      await poi.map((poi, index) => {
        arr.push({ id: poi.id, value: false });
      });
    }
    setpoidata(arr);
    changeData(arr);
  };
  const changeData = async (poidata1) => {
    if (props.data.settings) {
      let data2 = await props.data.settings.poiFilterChk.split(",");
      await data2.map((d, index) => {
        let d1 = d;
        // d1=d1.subString(18)
        //  data2[index] = d1.slice(19);
        poidata1.map((z, index1) => {
          if (z.id == d) {
            poidata1[index1].value = true;
          }
        });
      });

      setpoidata(poidata1);
      setpoieditdata(data2);
    }
    // console.log(zonedata1,zonedata,zones);
    setloading(true);
  };
  const handlepoi = (event, index, poi) => {
    let newarr = [...poidata];
    newarr[index].value = event.target.checked;
    setpoidata(newarr);
    convertdata(newarr);
  };
  const convertdata = async (newArr) => {
    let myarray = "";
    await newArr.map((key) => {
      let n = key["id"].toString();
      if (key.value === true) {
        myarray = myarray + n + ",";
      }
    });
    if (myarray.length > 0) {
      myarray = await myarray.slice(0, -1);
    } else {
      myarray = "reset";
    }
    let d = data;
    // console.log({ myarray });
    d["poiFilterChk"] = await myarray;
    setData(d);
    props.post(d);
  };
 
  const handlepoishow=()=>{
   let d=data;
   d["poiFilterCmd"]="poi";
   props.post(d);
  }
  const handlelocationshow=()=>{
     let d = data;
     d["poiFilterCmd"] = "locations";
     props.post(d);
  }
  const handleshowboth=()=>{
   let d = data;
   d["poiFilterCmd"] = "poi,locations";
   props.post(d);
  }
 const handleReset=()=>{
   let d=data;
   d["poiFilterChk"]="reset";

 }
  return (
    <div>
      <Grid container justify="center" spacing={2} item xs={12}>
        <Grid item xs={12}>
          <ButtonGroup
            fullWidth
            size="small"
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button onClick={handlepoishow}>POI</Button>
            <Button onClick={handlelocationshow}>Locations</Button>
            <Button onClick={handleshowboth}>Both</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          {loading ? 
            
              poi.map((poi, index) => (
                <div key={index}>
                  <FormControl component="fieldset" size="small">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={poidata[index].value}
                            name="insideZones"
                            onClick={(event) => handlepoi(event, index, poi)}
                          />
                        }
                        label={poi.poi_name}
                      />
                    </FormGroup>
                  </FormControl>
                </div>
              ))
             : null
          }
         
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" size="small">
            Apply
          </Button>
        </Grid>

        <Grid item>
          <Button variant="contained" color="primary" size="small" onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
const mapStateToProps = (state) => ({
  data: state.products.data,
  loading: state.products.loading,
  error: state.products.error,
});
const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(getfilterData()),
    post: (data) => dispatch(post(data)),
    // begin: () => dispatch(fetchProductsBegin()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Poifilter);
