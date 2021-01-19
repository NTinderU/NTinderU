import React from "react"
import MoodButton from "../MoodButton/MoodButton"
import ArrowBox from "../../svg/ArrowBox"
import Enter from "../../svg/Enter"
import "../MainPage.scss"
import Space from "../../svg/Space"

const MatchPanel = (props)=>{
    return (
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
    )
}

export default MatchPanel