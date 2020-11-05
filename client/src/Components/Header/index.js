import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { auth, logout } from "../../actions/userActions";

import Loading from "../../WidgetsUI/loading";

import raaglogo from "../../assets/images/raaglogo.png";

const navLinks = [
  {
    link: "/",
    border: true,
    text: "Home",
  },
  {
    link: "/about",
    border: true,
    text: "About Us",
  },
  {
    link: "/admin",
    border: true,
    text: "Admin Panel",
    auth: true,
  },
  {
    link: "/contact",
    border: false,
    text: "Contact Us",
  },
];

const styles = (theme) => ({
  log_in: {
    outline: "none !important",
    border: "none !important",
    width: 140,
    backgroundColor: "#202428",
    "&:hover": {
      backgroundColor: "#001524",
    },
    fontWeight: 500,
    letterSpacing: "0.12rem",
    color: "#FCFFFC !important",
  },
  paper: {
    background: "#D2D8DD",
  },
  menu: {
    color: "#001524",
    fontSize: 40,
    cursor: "pointer",
  },
});

class Header extends Component {
  state = {
    openNav: false,
    loading: true,
  };

  renderLink = (info, i, nav) => {
    if (!info.auth || (info.auth && this.props.user.user?.isAuth))
      return (
        <a href={info.link} key={i}>
          <p
            className={`font-medium text-raag-700 text-lg ${
              info.border && !nav ? "border-r-2" : ""
            } my-2 px-4 border-raag-600 hover:underline`}
          >
            {info.text}
          </p>
        </a>
      );
  };

  getAuthLink = () => {
    const { classes } = this.props;
    if (this.props.user.user?.isAuth)
      return (
        <Button
          classes={{ root: classes.log_in }}
          variant="contained"
          color="primary"
          onClick={() => this.props.logout()}
        >
          log out
        </Button>
      );
    else
      return (
        <Button
          classes={{ root: classes.log_in }}
          variant="contained"
          color="primary"
          href="/login"
        >
          Log In
        </Button>
      );
  };

  componentWillMount() {
    this.setState({ loading: true }, () => this.props.auth());
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="w-full flex justify-evenly items-center bg-raag-200">
        <a href="/" className="flex items-center">
          <img src={raaglogo} alt="raag logo" className="h-32 w-32" />
          <h1 className="text-black font-serif tracking-widest font-bold">
            RAAG
          </h1>
        </a>
        <div className={`justify-around w-4/5 items-center hidden sm:flex`}>
          <div className="flex items-center">
            {navLinks.map((info, i) => this.renderLink(info, i))}
          </div>
          {this.getAuthLink()}
        </div>
        <div
          className="flex w-4/5 pr-3 justify-end sm:hidden"
          onClick={() => this.setState({ openNav: true })}
        >
          <MenuIcon classes={{ root: classes.menu }} />
        </div>
        <SwipeableDrawer
          open={this.state.openNav}
          anchor="top"
          onClose={() => this.setState({ openNav: false })}
          onOpen={() => this.setState({ openNav: true })}
          classes={{ paper: classes.paper }}
        >
          <div>
            {navLinks.map((info, i) => this.renderLink(info, i, true))}
            <div className="px-4 mb-2">{this.getAuthLink()}</div>
          </div>
        </SwipeableDrawer>
        <Loading showLoading={this.state.loading} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ auth, logout }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));
