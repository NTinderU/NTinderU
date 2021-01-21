import React, { useState, useEffect } from "react";
import createMessage from "../graphql/CreateMessage";
import queryChatroom from "../graphql/QueryChatroom";
import { useQuery, useMutation } from "@apollo/client";
import SubscribeMessage from "../graphql/SubscribeMessage";
import Submit from "../../svg/Submit";
import "./ChatPanel.scss";

const ChatPanel = ({current_username, target_username, current_roomid}) => {
	console.log("Chat Panel",target_username, current_roomid)
	const { loading, error, data, subscribeToMore } = useQuery(queryChatroom, {
		variables: { id: current_roomid,
					target: target_username },
	});
	const [body, setBody] = useState("");
	const [addMessage] = useMutation(createMessage);

	// useEffect(() => {
	// 	console.log("data changed");
	// 	console.log(data);
	// }, [data]);
	/*
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
	}, [subscribeToMore,current_username]);*/

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
                alert("updated");
                const prevMsg = prev.chatroom.messages;
                if (!subscriptionData.data) return prevMsg;
                const newMsg = subscriptionData.data.message.data;
                console.log([...prevMsg, newMsg]);
                if (newMsg.from === target_username) {
                    alert(`Got a new message from ${newMsg.from}`);
                }
                return {
                    prev,
                    chatroom: {
                        id: current_roomid,
                        users: [current_username, target_username],
                        messages: [...prevMsg, newMsg],
                    }
                };
            },
        });
	}, [subscribeToMore,current_username,target_username]);
	if(loading) return (<div>Loading...</div>)
	if(error){
		console.error(error)
		return null;
	}
	return (
		<div className="chat-panel">
			<div className="chat-header">
				<img
					className="profile-picture"
					src={data?data.user.photo:"https://via.placeholder.com/100x100.png"}
					alt="profile"
				/>
				<div>{target_username}</div>
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
