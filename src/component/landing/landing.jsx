import React, {useState} from 'react'
import io from "socket.io-client"
import Chat from '../chat/chat';

const socket=io.connect('https://chattt-app.onrender.com/')

function Landing() {
  const  [name,setName]=useState();
  const [room,setRoom]=useState();
  const [showChat,setShowChat]=useState(false);
  const submitbutton=()=>{
    if(name!=="" && room!==""){
      socket.emit("join_room",(room))
      setShowChat(true);
    }
  }
  return (
    <>
    {!showChat ? (


    <div className="joinChatContainer">
    <h3>Join A Chat</h3>
      <input className="jccInput" type="text" placeholder="name" onChange={(e)=>{
        setName(e.target.value);
      }} />
      <input className="jccInput" type="text" placeholder="room" onChange={(e)=>{
        setRoom(e.target.value);
      }} />
      <button onClick={submitbutton} 
      >Join</button>
    </div>
    ):(

    <Chat socket={socket}  username={name} room={room}/>
    )
    }
    </>
  )
}

export default Landing
