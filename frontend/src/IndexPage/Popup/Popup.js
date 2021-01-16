import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "./Popup.scss";

const usernameErrors = [null, "Cannot be blank.", "User not found.", "Username has been used."];
const passwordErrors = [null, "Cannot be blank.", "Incorrect password."];
const confirmErrors = [null, "Cannot be blank.", "Inconsistant with password."];

const Popup = (props) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");

	const handleUsername = (e) => setUsername(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);
	const handleConfirm = (e) => setConfirm(e.target.value);

	const resetError = () => {
		props.setUsernameError(0);
		props.setPasswordError(0);
		props.setConfirmError(0);
	};

	const checkFormat = () => {
		resetError();
		let fail = false;

		if (username === "") {
			props.setUsernameError(1);
			fail = true;
		} else props.setUsernameError(0);

		if (password === "") {
			props.setPasswordError(1);
			setPassword("");
			setConfirm("");
			fail = true;
		} else props.setPasswordError(0);

		if (!props.signin && (confirm === "" || password !== confirm)) {
			if (confirm === "") props.setConfirmError(1);
			else props.setConfirmError(2);
			setPassword("");
			setConfirm("");
			fail = true;
		} else props.setConfirmError(0);
		return !fail;
	};

	const enterEvent = () => {
		if (!checkFormat()) return;
	};

	const inputEnter = (e) => (e.key === "Enter" ? enterEvent() : undefined);

	return (
		<Modal show={props.show} onHide={props.onHide} className="popup-modal" centered>
			<Modal.Header>
				<Modal.Title>{props.signin ? "Sign In" : "Sign Up"}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form className="popup">
					<Form.Group controlId="username">
						<Form.Label>Username</Form.Label>
						<Form.Control
							type="text"
							placeholder="Username"
							onKeyUp={inputEnter}
							onChange={handleUsername}
							value={username}
						/>
						<Form.Text className="error">
							{usernameErrors[props.usernameError]}
						</Form.Text>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							onKeyUp={inputEnter}
							onChange={handlePassword}
							value={password}
						/>
						<Form.Text className="error">
							{passwordErrors[props.passwordError]}
						</Form.Text>
					</Form.Group>
					{props.signin ? (
						<Form.Text>
							Don't have an account?{" "}
							<button
								onClick={() => {
									resetError();
									setConfirm("");
									props.setsignin(0);
								}}
								type="button"
							>
								Sign Up
							</button>
						</Form.Text>
					) : null}
					{props.signin ? null : (
						<>
							<Form.Group controlId="password-again">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Confirm Password"
									onKeyUp={inputEnter}
									onChange={handleConfirm}
									value={confirm}
								/>
								<Form.Text className="error">
									{confirmErrors[props.confirmError]}
								</Form.Text>
							</Form.Group>
							<Form.Text>
								Have an account?{" "}
								<button
									onClick={() => {
										resetError();
										props.setsignin(1);
									}}
									type="button"
								>
									Log in now
								</button>
							</Form.Text>
						</>
					)}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.onHide}>
					Cancel
				</Button>
				<Button onClick={enterEvent}>{props.signin ? "Sign In" : "Sign Up"}</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default Popup;
