import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "./Popup.scss";

const EnterEvent = () => {
	// TODO
};

const inputEnter = (e) => (e.key === "Enter" ? EnterEvent() : undefined);

const Popup = (props) => (
	<Modal show={props.show} onHide={props.onHide} className="popup-modal" centered>
		<Modal.Header>
			<Modal.Title>{props.signin ? "Sign In" : "Sign Up"}</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<Form className="popup">
				<Form.Group controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control type="text" placeholder="Username" onKeyUp={inputEnter} />
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" onKeyUp={inputEnter} />
					{props.signin ? (
						<Form.Text>
							Don't have an account?{" "}
							<button onClick={() => props.setsignin(0)} type="button">
								Sign Up
							</button>
						</Form.Text>
					) : null}
				</Form.Group>
				{props.signin ? null : (
					<Form.Group controlId="password-again">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm Password"
							onKeyUp={inputEnter}
						/>
						<Form.Text>
							Have an account?{" "}
							<button onClick={() => props.setsignin(1)} type="button">
								Log in now
							</button>
						</Form.Text>
					</Form.Group>
				)}
			</Form>
		</Modal.Body>
		<Modal.Footer>
			<Button variant="secondary" onClick={props.onHide}>
				Cancel
			</Button>
			<Button onClick={EnterEvent}>{props.signin ? "Sign In" : "Sign Up"}</Button>
		</Modal.Footer>
	</Modal>
);

export default Popup;
