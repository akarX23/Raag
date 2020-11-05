import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { addUser, clearAdminActions } from "../../actions/userActions";

import Loading from "../../WidgetsUI/loading";
import AddUser from "../../WidgetsUI/AddUser";

const styles = (theme) => ({
  add: {
    backgroundColor: "#F57600",
    "&:hover": {
      backgroundColor: "#B85900 !important",
    },
    color: "#fff",
    fontWeight: "570",
    border: "none !important",
    outline: "none !important",
    width: "40%",
    maxWidth: 150,
    minWidth: 120,
  },
});

class Admin extends Component {
  state = {
    loading: false,
    addUser: false,
    showAlert: false,
    alert: "",
    severity: "",
  };

  componentWillMount() {
    if (this.props.user.isAuth === false) this.props.history.push("/");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.adminAction) {
      let alert = "",
        severity = "";
      if (nextProps.user.adminAction.success === false) {
        alert = "Something went wrong!";
        severity = "error";
      } else if (nextProps.user.adminAction.userAdded === true) {
        alert = "User Added Successfully";
        severity = "success";
      }

      this.setState({ showAlert: true, alert, severity, loading: false });
    }
  }

  componentWillUnmount() {
    this.props.clearAdminActions();
  }

  render() {
    const {
      user: { user },
      classes,
    } = this.props;
    if (this.state.loading) return <Loading showLoading={true} />;
    else if (user.isAuth === true)
      return (
        <div className="p-5">
          <h1 className="text-darktheme-100 font-sans pb-2 border-b border-darktheme-500">
            Welcome, Admin{" "}
            {user.name.substring(
              0,
              user.name.indexOf(" ") > 0
                ? user.name.indexOf(" ")
                : user.name.length
            )}
          </h1>
          <div className="mt-4 flex justify-around w-full">
            <Button
              variant="contained"
              classes={{ root: classes.add }}
              onClick={() => this.setState({ addUser: true })}
            >
              Add User
            </Button>
            <Button classes={{ root: classes.add }} variant="contained">
              Add Post
            </Button>
          </div>
          <Snackbar
            open={this.state.showAlert}
            autoHideDuration={3000}
            onClose={() => this.setState({ showAlert: false })}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => this.setState({ showAlert: false })}
              severity={this.state.severity}
              variant="filled"
            >
              {this.state.alert}
            </Alert>
          </Snackbar>
          <AddUser
            openDialogue={this.state.addUser}
            closeDialogue={() => this.setState({ addUser: false })}
            submitUser={(details) => {
              this.setState({ loading: true, addUser: false }, () =>
                this.props.addUser(details)
              );
            }}
          />
        </div>
      );

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ addUser, clearAdminActions }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Admin));
