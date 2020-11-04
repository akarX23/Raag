import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../actions/userActions";
import { bindActionCreators } from "redux";
import Loading from "../WidgetsUI/loading";

export default function Auth(ComposedClass, authUser) {
  class AuthenticationCheck extends Component {
    state = {
      loading: true,
    };

    componentWillMount() {
      this.props.auth();
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ loading: false });

      if (!nextProps.user.user.isAuth && authUser === true)
        this.props.history.push("/");
      if (nextProps.user.user.isAuth && authUser === false)
        this.props.history.push("/");
    }

    render() {
      if (this.state.loading === true) return <Loading showLoading={true} />;
      return (
        <>
          <ComposedClass {...this.props} />
        </>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };

  const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ auth }, dispatch),
  });

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticationCheck);
}
