import React, { useContext } from "react";
import ContextStore from "../ContextStore";
import ChatroomButton from "./ChatroomButton/ChatroomButton";
import MoodButton from "./MoodButton/MoodButton";
import "./MainPage.scss";
import ArrowBox from "../svg/ArrowBox";
import Enter from "../svg/Enter";
import Space from "../svg/Space";

const MainPage = () => {
	// eslint-disable-next-line no-unused-vars
	const { loggedInUser } = useContext(ContextStore);
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
			<div className="right-panel">
				<img
					className="user-picture-big"
					src="https://via.placeholder.com/320x500.png"
					alt="帥哥 || 美女"
				/>
				<div className="mood-buttons">
					<MoodButton type="x" />
					<MoodButton type="star" />
					<MoodButton type="heart" />
				</div>
				<footer className="keyboard-shortcuts">
					<div>
						<ArrowBox direction="left" />
						<span>NOPE</span>
					</div>
					<div>
						<ArrowBox direction="right" />
						<span>LIKE</span>
					</div>
					<div>
						<ArrowBox direction="top" />
						<span>OPEN PROFILE</span>
					</div>
					<div>
						<ArrowBox direction="bottom" />
						<span>CLOSE PROFILE</span>
					</div>
					<div>
						<Enter />
						<span>SUPER LIKE</span>
					</div>
					<div>
						<Space />
						<span>NEXT PHOTO</span>
					</div>
				</footer>
			</div>
		</div>
	);
};

export default MainPage;
