import React, { useContext, useState } from "react";
import ContextStore from "../ContextStore";
import ChatroomButton from "./ChatroomButton/ChatroomButton";
import MatchPanel from "./MatchPanel/MatchPanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import "./MainPage.scss";

const MainPage = () => {
	// eslint-disable-next-line no-unused-vars
	const { loggedInUser } = useContext(ContextStore);
	const [mode, setMode] = useState("Matches");
	return (
		<div className="main">
			<div className="left-panel">
				<div className="profile-wrapper">
					<img
						className="profile-picture"
						src="https://via.placeholder.com/100.png"
						alt="X"
					/>
					<div className="profile-title">My Profile</div>
				</div>
				<div className="mode-buttons">
					<button
						className={`${mode === "Matches" ? "mode-choosing" : ""}`}
						onClick={() => setMode("Matches")}
					>
						Matches
					</button>
					<button
						className={`${mode === "Messages" ? "mode-choosing" : ""}`}
						onClick={() => setMode("Messages")}
					>
						Messages
					</button>
				</div>
				<div className="messages">
					{mode === "Messages" ? (
						<div>
							<ChatroomButton username="test1" lastMessage="test4" />
							<ChatroomButton choosing username="test2" lastMessage="test5" />
							<ChatroomButton username="test3" lastMessage="test6" />
						</div>
					) : null}
				</div>
			</div>
			{mode === "Matches" ? <MatchPanel /> : <ChatPanel />}
		</div>
	);
};

export default MainPage;
