import React, { Suspense, lazy } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "../models/Root";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

const LoginViewEmail = lazy(() => import("./LoginViewEmail"));
const LoginViewPassword = lazy(() => import("./LoginViewPassword"));
const PostsView = lazy(() => import("./PostsView"));

const Routes: React.FC = observer(() => {
  const { auth } = useMst();
  return (
    <div
      className={`lg:container lg:mx-auto p-5 h-screen flex flex-col items-center content-center`}
    >
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={LoginViewEmail} />
            <Route path="/password" component={LoginViewPassword} />
            <PrivateRoute
              path="/posts"
              isAuthenticated={auth.loggedIn}
              component={PostsView}
            />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
});

export default Routes;
