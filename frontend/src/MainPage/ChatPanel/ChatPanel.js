import React, { useState, useEffect } from "react";
import "./ChatPanel.scss";
import createChatroom from "../graphql/CreateChatroom";
import createMessage from "../graphql/CreateMessage";
import queryChatroom from "../graphql/QueryChatroom";
import { useQuery, useMutation } from "@apollo/client";
import SubscribeMessage from "../graphql/SubscribeMessage";

const ChatPanel = () => {
    const current_username = "NL"; // should be props
    const target_username = "overloadtw";
    const [current_roomid, setRoom] = useState("6007c0e50fc2da24505b51da"); // should be props
    const { loading, error, data, subscribeToMore } = useQuery(queryChatroom, {
        variables: { id: current_roomid },
    });
    const [body, setBody] = useState("");
    const [addMessage] = useMutation(createMessage);
    useEffect(() => {
        console.log("data changed");
        console.log(data);
    }, [data]);

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
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error</p>
            ) : (
                data.chatroom.messages.map(({ from, body }, i) => (
                    <p className="App-message" key={i}>
                        {from} =&gt; {body}
                    </p>
                ))
            )}
            <form>
                <input
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></input>
                <input
                    type="submit"
                    onClick={() => {
                        addMessage({
                            variables: {
                                id: current_roomid,
                                from: current_username,
                                to: target_username,
                                body: body,
                            },
                        });
                    }}
                />
            </form>
        </div>
    );
};

export default ChatPanel;
