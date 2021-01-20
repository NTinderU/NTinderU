import React from "react";
import Submit from "../../svg/Submit";
import "./ChatPanel.scss";

const ChatPanel = () => (
	<div className="chat-panel">
		<div className="chat-header">
			<img
				className="profile-picture"
				src="https://via.placeholder.com/100x100.png"
				alt="profile"
			/>
			<div>blahblahblah</div>
		</div>
		<div className="chat-messages">
			<div className="chat-message self">
				<span> @@@@@@@@@@ </span>
			</div>
			<div className="chat-message">
				<span> @@@@@@@@@@ </span>
			</div>
		</div>
		<div className="chat-input">
			<div className="chat-input-buttons"></div>
			<div className="chat-input-wrapper">
				<input type="text" placeholder="Aa" />
			</div>
			<div className="chat-input-submit">
				<button className="chat-input-submit-button">
					<Submit />
				</button>
			</div>
		</div>
	</div>
);

export default ChatPanel;
