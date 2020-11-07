import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getPosts, deletePost } from "../../actions/postActions";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { addUser, clearAdminActions } from "../../actions/userActions";

import Loading from "../../WidgetsUI/loading";
import AddUser from "../../WidgetsUI/AddUser";
import PostPreview from "../../WidgetsUI/PostPreview";

const styles = (theme) => ({
  add: {
    backgroundColor: "#F57600",
    "&:hover": {
      backgroundColor: "#B85900 !important",
    },
    color: "#fff !important",
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
    severity: "error",
  };

  renderPosts = () => {
    if (!this.props.posts.posts?.found) return null;

    if (this.props.posts.posts.posts.length === 0)
      return (
        <div className="w-full text-center text-lg text-darktheme-400 font-medium">
          There are no posts yet. Add one now!
        </div>
      );

    return this.props.posts.posts.posts.map((post, i) => (
      <div key={i} className="w-full mb-4 mt-2">
        <PostPreview
          post={post}
          admin={true}
          deletePost={() =>
            this.props.deletePost(post._id, this.props.posts.posts.posts)
          }
        />
      </div>
    ));
  };

  componentWillMount() {
    if (this.props.user.isAuth === false) this.props.history.push("/");
    this.setState({ loading: true }, () => this.props.getPosts());
  }

  componentWillReceiveProps(nextProps) {
    let alert = "",
      severity = "error",
      showAlert = false;
    if (nextProps.user.adminAction) {
      showAlert = true;
      if (nextProps.user.adminAction.success === false) {
        alert = "Something went wrong!";
        severity = "error";
      } else if (nextProps.user.adminAction.userAdded === true) {
        alert = "User Added Successfully";
        severity = "success";
      }
    }
    this.setState({ showAlert, alert, severity, loading: false });
  }

  componentWillUnmount() {
    this.props.clearAdminActions();
  }

  render() {
    const {
      user: { user },
      classes,
    } = this.props;

    if (user.isAuth === true)
      return (
        <div className="sm:p-5 p-3">
          <h2 className="text-darktheme-100 font-sans pb-2 border-b border-darktheme-500">
            Welcome, Admin{" "}
            {user.name.substring(
              0,
              user.name.indexOf(" ") > 0
                ? user.name.indexOf(" ")
                : user.name.length
            )}
          </h2>
          <div className="mt-4 flex justify-around w-full">
            <Button
              variant="contained"
              classes={{ root: classes.add }}
              onClick={() => this.setState({ addUser: true })}
            >
              Add User
            </Button>
            <Button
              classes={{ root: classes.add }}
              variant="contained"
              href="/addPost"
            >
              Add Post
            </Button>
          </div>
          <div className="w-full mt-3">
            <h5 className="text-raag-100 pb-1 border-b border-darktheme-600">
              All Posts
            </h5>
            <div className="pt-2">{this.renderPosts()}</div>
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
          <Loading showLoading={this.state.loading} />
        </div>
      );

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    posts: state.post,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    { addUser, clearAdminActions, getPosts, deletePost },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Admin));
