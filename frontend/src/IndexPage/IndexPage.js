import { useState } from "react";
import "./IndexPage.scss";
import logo from "./NTU.png";
import Popup from "./Popup/Popup";

const IndexPage = () => {
	const [popUpShow, setPopUpShow] = useState(false);
	const [signin, setSignin] = useState(0);
	return (
		<div className="index">
			<div className="index-header">
				<img className="logo" alt="NTU-logo" src={logo} />
				<button
					size="lg"
					onClick={() => {
						setPopUpShow(true);
						setSignin(1);
					}}
				>
					Sign In
				</button>
			</div>
			<div className="index-wrapper">
				<div id="app-title">NTinderU</div>
				<button
					size="lg"
					onClick={() => {
						setPopUpShow(true);
						setSignin(0);
					}}
				>
					Sign Up
				</button>
			</div>
			<Popup
				signin={signin}
				show={popUpShow}
				onHide={() => setPopUpShow(false)}
				setsignin={setSignin}
			/>
		</div>
	);
};

export default IndexPage;
