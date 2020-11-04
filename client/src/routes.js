import React from "react";
import { Switch, Route } from "react-router-dom";

//HOC
import Layout from "./hoc/layout";
import Auth from "./hoc/auth";

// Components
import Home from "./Components/Home";
import LogIn from "./Components/LogIn";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/login" exact component={Auth(LogIn, false)} />
        <Route path="/" component={Home} />
      </Switch>
    </Layout>
  );
};

export default Routes;
