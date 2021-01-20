import React, { useContext, useState } from "react";
import ContextStore from "../ContextStore";
import ChatroomButton from "./ChatroomButton/ChatroomButton";
import MatchPanel from "./MatchPanel/MatchPanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import "./MainPage.scss";
import { useQuery } from "@apollo/client";
import QueryPhoto from "./graphql/QueryPhoto"

const MainPage = () => {
	// eslint-disable-next-line no-unused-vars
	const { loggedInUser } = useContext(ContextStore);
	const [mode, setMode] = useState("Matches");
	const [matchCount, setMatchCount] = useState(3);
	const {loading, error, data} = useQuery(QueryPhoto,{
		variables:{
			username: loggedInUser
		}
	})
	if(loading) return null
	if(error){
		console.error(error);
		return null;
	}
	return (
		<div className="main">
			<div className="left-panel">
				<div className="profile-wrapper">
					<img
						className="profile-picture"
						src={data.user.photo}
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
			{mode === "Matches" ? <MatchPanel matchCount={matchCount}/> : <ChatPanel />}
		</div>
	);
};

export default MainPage;
