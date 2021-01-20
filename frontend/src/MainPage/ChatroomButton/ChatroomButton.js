import React from "react";
import "./ChatroomButton.scss";

const ChatroomButton = (props) => (
	<button className={`chatroom-button${props.choosing ? " choosing" : ""}`}>
		<img
			className="chatroom-button-picture"
			src="https://via.placeholder.com/100.png"
			alt="user big"
		/>
		<div className="chatroom-information">
			<div className="chatroom-button-username">{props.username}</div>
			<div className="chatroom-button-lastmessage">{props.lastMessage}</div>
		</div>
	</button>
);

export default ChatroomButton;
