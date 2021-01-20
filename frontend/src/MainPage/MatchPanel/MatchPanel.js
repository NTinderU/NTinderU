import React, {useCallback, useContext, useEffect, useState} from "react";
import MoodButton from "./MoodButton/MoodButton";
import ArrowBox from "../../svg/ArrowBox";
import Enter from "../../svg/Enter";
import Space from "../../svg/Space";
import "./MatchPanel.scss";

import ContextStore from "../../ContextStore"
import QueryMatch from "./graphql/QueryMatch"
import AddLikedTarget from "./graphql/AddLikedTarget"
import AddMatchedTarget from "./graphql/AddMatchedTarget"
import { useMutation, useQuery } from "@apollo/client";
//import {GlobalHotKeys} from "react-hotkeys"

const MatchPanel = ({matchCount}) => {
	const { loggedInUser } = useContext(ContextStore);
	const [matchIndex, setMatchIndex] = useState(0);
	const [isEnd, setIsEnd] = useState(false)
	const {loading, error, data} = useQuery(QueryMatch,
		{variables: {username: loggedInUser,
					max_count: matchCount}})
	const [addLikedTarget, Likedres] = useMutation(AddLikedTarget)
	const [addMatchedTarget, Matchedres] = useMutation(AddMatchedTarget)

	const nextPeople = ()=>{
		console.log(matchIndex, data)
		if(matchIndex===data.match.length-1){
			console.log("No more people")
			setIsEnd(true)
		}
		else{
			setMatchIndex(matchIndex+1)
		}
	}
	const getMatchObject = ()=>{
		if(data===null){
			return{
				username: "No People",
				liked:[],
				photo: "https://via.placeholder.com/320x500.png"
			}
		}
		if(data.match.length===0||isEnd){
			return {
				username: "No People",
				liked: [],
				photo: "https://via.placeholder.com/320x500.png"
			}
		}
		else{
			return{
				username: data.match[matchIndex].username,
				liked: data.match[matchIndex].liked,
				photo: data.match[matchIndex].photo
			}
		}
	}

	const likeSomeone = ()=>{
		let obj = getMatchObject()
		let target = obj.username
		if(target!=="No People"){
			console.log("target:", target)
			addLikedTarget({variables:{
				username: loggedInUser,
				target:target
			}})
			if(obj.liked.includes(loggedInUser)){
				console.log("Match! ",loggedInUser, target)
				addMatchedTarget({variables:{
					username: loggedInUser,
					target: target
				}})
			}
		}
	}

	if(loading) return (<span>Loading...</span>)
	if(error){
		console.log(error)
		return null;
	}
	
	return (
		<div className="match-panel">
			<span>{getMatchObject().username}</span>
			<img
				className="user-picture-big"
				src={getMatchObject().photo}
				alt="帥哥 || 美女"
			/>
			<div className="mood-buttons">
				<MoodButton type="x" onClick={nextPeople}/>
				{/*<MoodButton type="star" onClick={()=>{nextPeople()}}/>*/}
				<MoodButton type="heart" onClick={async ()=>{await likeSomeone()
															nextPeople()}}/>
			</div>{/*
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
			</footer>*/}
		</div>
	);
}

export default MatchPanel;
