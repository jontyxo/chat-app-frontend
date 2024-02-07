import React, {useEffect, useState} from 'react'
import io from "socket.io-client"
import Chat from '../chat/chat';
import axios from "axios";
import ModalServer from '../modal/modal';





function Landing() {


  const [socket, SetSocket]=useState('');
  const [showModal,setShowModal] = useState(false);
  let apiCall;
  useEffect(()=>{
    const fetch=async()=>{
 
   
    apiCall=await io.connect('http://localhost:3001/');
    SetSocket(apiCall)
    }
    const checkServerStatus = async () => {
      const startTime = new Date().getTime();
      try {
        const res = await axios.get('https://chattt-app.onrender.com/server');
        const endTime = new Date().getTime();
        const responseTime = (endTime - startTime) / 1000;
        if (responseTime > 2){
         console.log("responseTimeTooLong"); 
         setShowModal(true);
         return;
        }
        console.log('Server response status:', res.status);
        if(res.status==200) fetch();
        else console.log("error")
      } catch (error) {
        console.error('Request error:', error);
      }
    }
    checkServerStatus()
  },[])


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
     {showModal && <ModalServer />}
    {!showChat ? (




    <div className="joinChatContainer">
    <h3>Join A Chat</h3>
      <input className="jccInput" type="text" placeholder="name" required='true' onChange={(e)=>{
        setName(e.target.value);
      }} />
      <input className="jccInput" type="text" placeholder="room" required='true' onChange={(e)=>{
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
