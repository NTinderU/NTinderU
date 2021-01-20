import ChatroomButton from "../ChatroomButton/ChatroomButton";

const RoomList = ({rooms})=>{
    console.log("From RoomList ",rooms)
    return (
        <div>
			{rooms.map((room,i)=><ChatroomButton key={i} username={room.target}></ChatroomButton>)}
		</div>
    )
}

export default RoomList
