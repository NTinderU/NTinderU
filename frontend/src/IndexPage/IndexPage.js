import React from "react";
import { Col, Container } from "react-bootstrap";
import "./IndexPage.scss";
import logo from "./NTU.png";

const IndexPage = () => (
	<div>
		<Container className="index-header">
			<img alt="NTU-logo" src={logo} />
			<Col />
			<button size="lg">Log In</button>
		</Container>
		<div className="index-wrapper">
			<div id="app-title">NTinderU</div>
			<button size="lg">Sign Up</button>
		</div>
	</div>
);

export default IndexPage;
