import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import Input from "../../WidgetsUI/Input";
import Button from "@material-ui/core/Button";
import Loading from "../../WidgetsUI/loading";

import { login } from "../../actions/userActions";

const styles = (theme) => ({
  textField: {
    backgroundColor: "#343A40",
    borderRadius: "5px",
    width: "100%",
  },
  inputRoot: {
    color: "white",
    fontSize: "17px",
    fontFamily: "sans",
  },
  submit: {
    outline: "none !important",
    border: "none !important",
    width: 140,
    backgroundColor: "#F57600",
    "&:hover": {
      backgroundColor: "#B85900",
    },
    fontWeight: 500,
    letterSpacing: "0.12rem",
    color: "#FCFFFC !important",
    marginTop: 20,
  },
});

class LogIn extends Component {
  state = {
    values: { email: "", password: "" },
    valid: { email: false, password: false },
    config: {
      email: { type: "text", placeholder: "Enter email" },
      password: { type: "password", placeholder: "Enter password" },
    },
    errorMessage: { email: "", password: "" },
    alertMessage: "",
    severity: "",
    showAlert: false,
    loading: false,
  };

  handleInputChange = (inputName, value) => {
    let newValue = { ...this.state.values };
    let newErrors = { ...this.state.errorMessage };
    newValue[inputName] = value;

    let error = this.validateInputs(inputName, value);
    newErrors[inputName] = error;

    this.setState({
      values: newValue,
      errorMessage: newErrors,
    });
  };

  validateInputs = (inputName, value) => {
    let error = "";

    if (value === "") {
      error = "*This field is required";
    } else if (
      inputName === "email" &&
      !RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ).test(value)
    ) {
      error = "Email not valid";
    } else if (inputName === "password" && value.length < 5) {
      error = "Password too short";
    }

    return error;
  };

  onSubmit = (event) => {
    event.preventDefault();
    let newerrorMessage = { ...this.state.errorMessage };
    let formValid = true;

    Object.keys(newerrorMessage).forEach((key) => {
      if (this.state.values[key] === "")
        newerrorMessage[key] = "*This field is required";
      if (newerrorMessage[key] !== "" || this.state.values[key] === "")
        formValid = false;
    });
    if (!formValid) this.setState({ errorMessage: newerrorMessage });
    else {
      this.setState({ loading: true }, () =>
        this.props.login(this.state.values)
      );
    }
  };

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    let severity = "",
      alertMessage = "",
      showAlert = false;
    if (user.user) {
      if (user.user.success === false) {
        showAlert = true;
        if (user.user.mismatch === true) {
          alertMessage = "Email or password doesn't match";
          severity = "warning";
        } else {
          alertMessage = "Something went wrong!";
          severity = "error";
        }
        this.setState({ showAlert, alertMessage, severity, loading: false });
      } else if (user.user.success === true) this.props.history.push("/");
    }
  }

  render() {
    const { classes } = this.props;
    const {
      values,
      errorMessage,
      config,
      showAlert,
      alertMessage,
      severity,
    } = this.state;

    return (
      <div className="w-full h-full mt-48 flex items-center justify-center">
        <div className="bg-darktheme-900 rounded-lg p-6 w-4/5 -mt-24 sm:w-3/5">
          <h1 className="text-raag-100 mb-4">Log In</h1>
          <form onSubmit={(event) => this.onSubmit(event)}>
            <Input
              label="Email"
              classes={classes}
              value={values.email}
              error={errorMessage.email}
              onChange={(event) =>
                this.handleInputChange("email", event.target.value)
              }
              {...config.email}
            />
            <Input
              label="Password"
              classes={classes}
              value={values.password}
              error={errorMessage.password}
              onChange={(event) =>
                this.handleInputChange("password", event.target.value)
              }
              {...config.password}
            />
            <div className="w-full text-center">
              <Button type="submit" classes={{ root: classes.submit }}>
                Log in
              </Button>
            </div>
          </form>
        </div>
        <Snackbar
          open={showAlert}
          autoHideDuration={3000}
          onClose={() => this.setState({ showAlert: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            variant="filled"
            onClose={() => this.setState({ showAlert: false })}
            severity={severity}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
        <Loading showLoading={this.state.loading} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ login }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LogIn));
