import React, { useContext, useState } from "react";
import ContextStore from "../ContextStore";
import ChatroomButton from "./ChatroomButton/ChatroomButton";
import MatchPanel from "./Panel/MatchPanel";
import ChatPanel from "./Panel/ChatPanel";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "./MainPage.scss";

const MainPage = () => {
	// eslint-disable-next-line no-unused-vars
	const { loggedInUser } = useContext(ContextStore);
	const [mode, setMode] = useState("match");
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
				<Tabs id="panelSwitcher" activeKey={mode} onSelect={(k) => setMode(k)}>
					<Tab eventKey="match" title="Matches" />
					<Tab eventKey="chat" title="Messages" />
				</Tabs>
				<div className="messages">
					{mode === "chat" ? (
						<div>
							<ChatroomButton username="test1" lastMessage="test4" />
							<ChatroomButton choosing username="test2" lastMessage="test5" />
							<ChatroomButton username="test3" lastMessage="test6" />
						</div>
					) : null}
				</div>
			</div>
			{mode === "match" ? <MatchPanel /> : <ChatPanel />}
		</div>
	);
};

export default MainPage;
