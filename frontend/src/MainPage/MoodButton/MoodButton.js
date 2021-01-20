import React from "react";
import "./MoodButton.scss";
import Star from "../../svg/Star";
import Heart from "../../svg/Heart";
import X from "../../svg/X";

const MoodButton = ({ type }) => (
	<button className={`mood-button${type ? ` mood-${type}` : ""}`}>
		{type === "heart" ? <Heart /> : type === "star" ? <Star /> : type === "x" ? <X /> : null}
	</button>
);

export default MoodButton;
