import {Redirect, Route} from "react-router";
import React from "react";

const PrivateRoute = ({component, isAuthenticated, ...rest}: any) => {
    const routeComponent = (props: any) => (
        isAuthenticated
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};

export default PrivateRoute;