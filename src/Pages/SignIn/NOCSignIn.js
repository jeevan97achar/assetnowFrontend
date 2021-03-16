import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
// import "typeface-roboto";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
// import ValidationMessage from "./ValidationMessage";
// import Alert from "@material-ui/lab/Alert";
import { Box, Button } from "@material-ui/core";
import { getUserCompany, getUserDetails, login } from "../../Network/network";
// import ReCAPTCHA from "react-google-recaptcha";
import { Alert, AlertTitle } from "@material-ui/lab";

let result = [];

// let IP=window.$IP;
class signIn extends Component {
  constructor(props) {
    super(props);
    this._reCaptchaRef = React.createRef();
    this.onSignInButtonPress = this.onSignInButtonPress.bind(this);

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  state = {
    width: 0,
    height: 0,
    username: "",
    password: "",
    usernamevalid: false,
    passwordvalid: false,
    submitDisabled: "disabled",
    warning: false,
    accountdeactivated: false,
    errormessage:false,
    user_id: "",

    next: "",

    response: "",
    captha: "",
    capthavalid: false,
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  UserGreeting(props) {
    return <h1>Welcome back!</h1>;
  }
  usernamecheck = (event) => {
    this.setState({ username: event.target.value });
    // if (event.target.value.length === 0) {
    //   this.setState({ usernamevalid: true });
     
    // } else {
    //   this.setState({ usernamevalid: false });
    // }
  };
  passwordcheck = (event) => {
    // if (event.target.value.length === 0) {
    //   this.setState({ passwordvalid: true });
     
    // } else {
    //   this.setState({ passwordvalid: false });
    // }
  };

  formvalid() {
    if (this.state.username.length ==0) {
      this.setState({ usernamevalid: true });
    } else {
      this.setState({ usernamevalid: false });
    }
    if (this.state.password.length ==0 ) {
      this.setState({ passwordvalid: true });
    } else {
      this.setState({ passwordvalid: false });
    }
   console.log(this.state.usernamevalid, this.state.password.length);
    if (
      !this.state.usernamevalid &&
      !this.state.passwordvalid 
    ) {
      console.log("///")
      this.onSignInButtonPress();
      
    }
  }
  handleChange = (value) => {
    this.setState({ captha: value, capthavalid: true });

    if (value === null) this.setState({ expired: "true" });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container alignItems="center">
        <Grid
          alignItems="center"
          justify="center"
          item
          container
          //   md={6}
          xs={12}
          //   style={{ background: "#031a26", minHeight: "100vh" }}
        >
          <Grid item container justify="center" md={6} xs={11}>
            <Grid item xs={12} style={{ marginTop: 100 }}>
              <Card style={{ padding: 80 }} elevation={6}>
                <Grid item container justify="center" xs={12}>
                  {this.state.errormessage ? (
                    <Grid item xs={12}>
                      <Alert severity="error">
                        <AlertTitle>UserName or password is Wrong</AlertTitle>
                      </Alert>
                    </Grid>
                  ) : null}
                  <Grid item container justify="center" xs={12}>
                    <Grid>
                      <Typography
                        style={{ fontWeight: "bold" }}
                        variant="h4"
                        gutterBottom
                        color="primary"
                      >
                        NOC Login
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* <Grid item xs={12}>
                    {" "}
                    {this.state.warning ? (
                      <Alert severity="error">Wrong username or password</Alert>
                    ) : null}
                    {this.state.accountdeactivated ? (
                      <Alert severity="error">
                        Your Account has been deactivated please contact the
                        admin
                      </Alert>
                    ) : null}
                  </Grid> */}

                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      margin="normal"
                      required
                      error={this.state.usernamevalid}
                      // style={{ marginRight: 10 }}
                      // margin="dense"
                      id="username"
                      label="User Name"
                      value={this.state.username}
                      type="text"
                      autoComplete="username"
                      autoFocus
                      fullWidth
                      size="medium"
                      helperText={
                        this.state.usernamevalid
                          ? "Please enter your username"
                          : ""
                      }
                      onChange={(event) => this.usernamecheck(event)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      margin="normal"
                      required
                      error={this.state.passwordvalid}
                      // style={{ marginRight: 10 }}
                      // margin="dense"
                      label="Password"
                      value={this.state.password}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      fullWidth
                      size="small"
                      helperText={
                        this.state.passwordvalid
                          ? "Please enter your password"
                          : ""
                      }
                      onChange={(event) =>
                        this.setState(
                          { password: event.target.value },
                          this.passwordcheck(event)
                        )
                      }
                    />
                  </Grid>

                  {/* <Grid item container justify="center" xs={12}>
                    <ValidationMessage
                      valid={!this.state.capthavalid}
                      // message={"please check this box"}
                    />
                    <Box p={2}>
                      <ReCAPTCHA
                        style={{ display: "inline-block" }}
                        theme="light"
                        // ref={this._reCaptchaRef}
                        sitekey={"6LdDrqsZAAAAABrsnwXy1KB8r1dhblamd3rFz7wd"}
                        onChange={this.handleChange}
                        // asyncScriptOnLoad={this.asyncScriptOnLoad}
                      />
                    </Box>
                  </Grid> */}

                  <Grid
                    item
                    container
                    justify="center"
                    direction="row"
                    xs={10}
                    spacing={1}
                  >
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="primary"
                        style={{
                          marginTop: 16,
                          marginBottom: 16,
                        }}
                        onClick={() => this.formvalid()}
                      >
                        Sign In
                      </Button>
                    </Grid>
                    <Grid item container justify='center' alignItems='center' xs={12}>
                      <Grid item>
                      <Link href="/" variant="body2">
                        {"Back to Login"}
                      </Link>
                      </Grid>
                    </Grid>

                    {/* <Grid
                      item
                      container
                      justify="center"
                      direction="row"
                      xs={12}
                    >
                      <Link href="/forgotpassword" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid
                      item
                      container
                      justify="center"
                      direction="row"
                      xs={12}
                    >
                      <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid> */}
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  async onSignInButtonPress() {
    try {
      let username = this.state.username;
      let password = this.state.password;
      let user_id = this.state.user_id
      let next, location, userType;

      let response = await login(username, password);
      console.log("response", response.status);
      if (response.status === 200) {
        response=await response.data;
      
      if (response.token) {
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("user_id", response.user_id);

        if (
          response.rolename === "OntracAdmin" ||
          response.rolename === "OntracUser"
        ) {
          next = "/asset_main/admin";
          location = "/admin/NOC";
          userType = "admin";
        } else {
          next = "/asset_main";
          location = "/client/dashboard";
          userType = "client";
        }

        sessionStorage.setItem("userType", userType);
        let userData = await getUserDetails(username, password, next, userType);
        let user = {
          id: userData.id,
          username: userData.username,
          company: userData.company,
          rolename: userData.rolename,
          email: userData.authuser.email,
          firstname: userData.authuser.firstname,
          lastname: userData.authuser.lastname,
          is_active: userData.authuser.is_active,
          is_staff: userData.authuser.is_staff,
          is_superuser: userData.authuser.is_superuser,
        };
        sessionStorage.setItem("user", JSON.stringify(user));
        let clientInfo = await getUserCompany();
        sessionStorage.setItem("client", JSON.stringify(clientInfo));

        window.location = location;
      }
     } else {
        console.log("Unable to login");
        this.setState({ errormessage :true});
      }
    } catch (error) {
      console.log(error);
    }
  }
  
}
signIn.propTypes = {
  classes: PropTypes.object.isRequired,
};
const styles = (theme) => ({
  root: {
    height: "100vh",
  },
  mainImage: {
    backgroundRepeat: "no-repeat",

    backgroundColor: "#1c2330",
    backgroundPosition: "center",
  },
});

export default withStyles(styles)(signIn);
