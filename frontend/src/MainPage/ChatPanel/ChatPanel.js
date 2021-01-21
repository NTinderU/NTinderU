import React, { useState, useEffect } from "react";
import createMessage from "../graphql/CreateMessage";
import queryChatroom from "../graphql/QueryChatroom";
import { useQuery, useMutation } from "@apollo/client";
import SubscribeMessage from "../graphql/SubscribeMessage";
import Submit from "../../svg/Submit";
import "./ChatPanel.scss";

const ChatPanel = ({current_username, target_username, current_roomid}) => {
	console.log("Chat Panel",target_username, )
	const { loading, error, data, subscribeToMore, refetch } = useQuery(queryChatroom,{
		variables:{
			id:current_roomid,
			target: target_username
		}
	});
	const [body, setBody] = useState("");
	const [addMessage] = useMutation(createMessage);

	useEffect(()=>{
		refetch({variables:{
			id: current_roomid,
			target: target_username
		}})
	},[target_username])

	const handleMessage = () => {
		if (!body.trim().length) return;
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
		console.log("load subscribeToMore")
        subscribeToMore({
            document: SubscribeMessage,
            variables: { username: current_username },
            updateQuery: (prev, { subscriptionData }) => {
				console.log(prev, subscriptionData)
				//alert("updated");
				
                const prevMsg = prev.chatroom.messages;
                if (!subscriptionData.data) return prev;
				const newMsg = subscriptionData.data.message.data;
				alert(`Got a new message from ${newMsg.from}, current target ${target_username}, ${current_username}, ${current_roomid}`);

                console.log([...prevMsg, newMsg]);
                if (newMsg.from !== target_username && newMsg.from!==current_username) {
					return {prev, prev}
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
	},[]);
	if(loading) return (<div>Loading...</div>)
	if(error){
		console.error(error)
		return null;
	}
	console.log(data)
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
