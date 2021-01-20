import { useState } from "react";
import ChatroomButton from "../ChatroomButton/ChatroomButton";

const RoomList = ({rooms, setRoomID, setTargetName})=>{
    const [chosen, setChosen] = useState(0)
    /*
	if(rooms.length>0){
        setRoomID(rooms[0].roomID)
        setTargetName(rooms[0].target)
    }*/
    return (
        <div>
			{rooms.map((room,i)=>{
                if(i===chosen) return (<ChatroomButton choosing key={i} idx={i} username={room.target} roomID={room.roomID} sRID={setRoomID} sTN={setTargetName} sC={setChosen}></ChatroomButton>)
                return (<ChatroomButton key={i} idx={i} username={room.target} roomID={room.roomID} sRID={setRoomID} sTN={setTargetName} sC={setChosen}></ChatroomButton>)
            })}
		</div>
    )
}

export default RoomList
