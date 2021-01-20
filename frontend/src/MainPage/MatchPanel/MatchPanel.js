import React, {useContext, useEffect, useState} from "react";
import MoodButton from "./MoodButton/MoodButton";
import ArrowBox from "../../svg/ArrowBox";
import Enter from "../../svg/Enter";
import Space from "../../svg/Space";
import "./MatchPanel.scss";

import ContextStore from "../../ContextStore"
import QueryMatch from "./graphql/QueryMatch"
import AddLikedTarget from "./graphql/AddLikedTarget"
import { useMutation, useQuery } from "@apollo/client";

const MatchPanel = ({matchCount}) => {
	const { loggedInUser } = useContext(ContextStore);
	const [matchIndex, setMatchIndex] = useState(0);
	const [isEnd, setIsEnd] = useState(false)
	const {loading, error, data} = useQuery(QueryMatch,
		{variables: {username: loggedInUser,
					max_count: matchCount}})
	const [addLikedTarget, Likedres] = useMutation(AddLikedTarget)

	const nextPeople = ()=>{
		if(matchIndex===data.match.length-1){
			console.log("No more people")
			setIsEnd(true)
		}
		else{
			setMatchIndex(matchIndex+1)
		}
	}
	const getMatchObject = ()=>{
		if(data.match.length===0||isEnd){
			return {
				username: "No People",
				liked: []
			}
		}
		else{
			return{
				username: data.match[matchIndex].username,
				liked: data.match[matchIndex].liked
			}
		}
	}

	const likeSomeone = ()=>{
		let target = getMatchObject().username
		console.log("target:", target)
		if(target!=="No People"){
			addLikedTarget({variables:{
				username: loggedInUser,
				target:target
			}})
		}
	}

	if(loading) return (<span>Loading...</span>)
	if(error) return (<span>{error}</span>)
	console.log(data.match)

	return (
		<div className="match-panel">
			<img
				className="user-picture-big"
				src="https://via.placeholder.com/320x500.png"
				alt="帥哥 || 美女"
			/>
			<div className="mood-buttons">
				<MoodButton type="x" onClick={nextPeople}/>
				{/*<MoodButton type="star" onClick={()=>{nextPeople()}}/>*/}
				<MoodButton type="heart" onClick={async ()=>{await likeSomeone()
															nextPeople()}}/>
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
	);
}

export default MatchPanel;