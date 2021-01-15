import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import IndexPage from "./IndexPage/IndexPage";

const Routes = () => (
	<Router>
		<Route exact path="/" component={IndexPage} />
	</Router>
);

export default Routes;
