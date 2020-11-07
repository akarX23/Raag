import React from "react";
import { Switch, Route } from "react-router-dom";

//HOC
import Layout from "./hoc/layout";
import Auth from "./hoc/auth";

// Components
import Home from "./Components/Home";
import LogIn from "./Components/LogIn";
import Admin from "./Components/Admin/admin";
import CreatePost from "./Components/CreatePost/createpost";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/addPost" exact component={Auth(CreatePost, true)} />
        <Route path="/admin" exact component={Auth(Admin, true)} />
        <Route path="/login" exact component={Auth(LogIn, false)} />
        <Route path="/" component={Home} />
      </Switch>
    </Layout>
  );
};

export default Routes;
