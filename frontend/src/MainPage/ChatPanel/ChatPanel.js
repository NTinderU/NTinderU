import React, { useState, useEffect } from "react";
import createMessage from "../graphql/CreateMessage";
import queryChatroom from "../graphql/QueryChatroom";
import { useQuery, useMutation } from "@apollo/client";
import SubscribeMessage from "../graphql/SubscribeMessage";
import Submit from "../../svg/Submit";
import "./ChatPanel.scss";

const ChatPanel = (props) => {
	return (<div></div>)
	const current_username = "NL"; // should be props
	const target_username = "overloadtw";
	const [current_roomid, setRoom] = useState("6007c0e50fc2da24505b51da"); // should be props
	const { loading, error, data, subscribeToMore } = useQuery(queryChatroom, {
		variables: { id: current_roomid },
	});
	const [body, setBody] = useState("");
	const [addMessage] = useMutation(createMessage);

	// useEffect(() => {
	// 	console.log("data changed");
	// 	console.log(data);
	// }, [data]);

	useEffect(() => {
		subscribeToMore({
			document: SubscribeMessage,
			variables: { username: current_username },
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				const newMsg = subscriptionData.data.message.data;

				return {
					...prev,
					messages: [...prev.messages, newMsg],
				};
			},
		});
	}, [subscribeToMore]);

	const handleMessage = () => {
		addMessage({
			variables: {
				id: current_roomid,
				from: current_username,
				to: target_username,
				body: body,
			},
		});
		setBody("");
	};

    useEffect(() => {
        subscribeToMore({
            document: SubscribeMessage,
            variables: { username: current_username },
            updateQuery: (prev, { subscriptionData }) => {
                console.log("updated");
                if (!subscriptionData.data) return prev;
                const newMsg = subscriptionData.data.message.data;
                console.log(subscriptionData.data);
                if (newMsg.from === target_username) {
                    alert(`Got a new message from ${newMsg.from}`);
                }
                return {
                    ...prev,
                    messages: [...prev.messages, newMsg],
                };
            },
        });
	}, [subscribeToMore]);
	return (
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
				{loading ? (
					<p>Loading...</p>
				) : error ? (
					<p>Error</p>
				) : (
					data.chatroom.messages.map(({ from, body }, i) => (
						<div
							className={`chat-message ${from === current_username ? " self" : ""}`}
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
