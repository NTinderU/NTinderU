import React, { useContext, useState } from "react";
import ContextStore from "../ContextStore";
import ChatroomButton from "./ChatroomButton/ChatroomButton";
import "./MainPage.scss";
import MatchPanel from "./Panel/MatchPanel";

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
				<div className="messages">
					<ChatroomButton username="test1" lastMessage="test4" />
					<ChatroomButton choosing username="test2" lastMessage="test5" />
					<ChatroomButton username="test3" lastMessage="test6" />
				</div>
			</div>
			{
				mode==="match"?<MatchPanel></MatchPanel>:<div></div>
			}	
		</div>
	);
};

export default MainPage;
