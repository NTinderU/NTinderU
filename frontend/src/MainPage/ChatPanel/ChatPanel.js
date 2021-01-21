import React, { useState, useEffect, useRef } from "react";
import createMessage from "../graphql/CreateMessage";
import queryChatroom from "../graphql/QueryChatroom";
import { useQuery, useMutation } from "@apollo/client";
import SubscribeMessage from "../graphql/SubscribeMessage";
import Submit from "../../svg/Submit";
import "./ChatPanel.scss";

const ChatPanel = ({ current_username, target_username, current_roomid }) => {
	console.log("Chat Panel", target_username);
	const { loading, error, data, subscribeToMore, refetch } = useQuery(queryChatroom, {
		variables: {
			id: current_roomid,
			target: target_username,
		},
	});
	const [body, setBody] = useState("");
	const messagesRef = useRef(null);
	const [addMessage] = useMutation(createMessage);

	useEffect(
		() =>
			messagesRef.current
				? (messagesRef.current.scrollTop = messagesRef.current.scrollHeight)
				: undefined,
		[data, messagesRef]
	);

	useEffect(() => {
		refetch({
			variables: {
				id: current_roomid,
				target: target_username,
			},
		});
	}, [current_roomid, refetch, target_username]);

	const handleMessage = () => {
		if (!body.trim().length) return;
		addMessage({
			variables: {
				id: current_roomid,
				from: current_username,
				to: target_username,
				body: body.trim(),
			},
		});
		setBody("");
	};

	useEffect(() => {
		console.log("load subscribeToMore");
		subscribeToMore({
			document: SubscribeMessage,
			variables: { username: current_username },
			updateQuery: (prev, { subscriptionData }) => {
				console.log(prev, subscriptionData);
				const prevMsg = prev.chatroom.messages;
				if (!subscriptionData.data) return prev;
				const newMsg = subscriptionData.data.message.data;
				console.log([...prevMsg, newMsg]);
				if (newMsg.from !== target_username && newMsg.from !== current_username) {
					return prev;
				}
				return {
					prev,
					chatroom: {
						id: current_roomid,
						users: [current_username, target_username],
						messages: [...prevMsg, newMsg],
					},
				};
			},
		});
	}, [current_roomid, current_username, subscribeToMore, target_username]);

	if (loading) return <div>Loading...</div>;

	if (error) {
		console.error(error);
		return null;
	}

	return (
		<div className="chat-panel">
			<div className="chat-header">
				<img
					className="profile-picture"
					src={data ? data.user.photo : "https://via.placeholder.com/100x100.png"}
					alt="profile"
				/>
				<div>{target_username}</div>
			</div>
			<div className="chat-messages" ref={messagesRef}>
				{loading ? (
					<p>Loading...</p>
				) : error ? (
					<p>Error</p>
				) : (
					data.chatroom.messages.map(({ from, body }, i) => (
						<div
							className={`chat-message${from === current_username ? " self" : ""}`}
							key={i}
						>
							<span>{body}</span>
						</div>
					))
				)}
			</div>
			<div className="chat-input">
				<div className="chat-input-buttons"></div>
				<div className="chat-input-wrapper">
					<input
						type="text"
						placeholder="Aa"
						onChange={(e) => setBody(e.target.value)}
						onKeyUp={(e) => (e.key === "Enter" ? handleMessage() : undefined)}
						value={body}
					/>
				</div>
				<div className="chat-input-submit">
					<button className="chat-input-submit-button" onClick={handleMessage}>
						<Submit />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChatPanel;
