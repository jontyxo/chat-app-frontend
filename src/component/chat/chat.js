import React,{useState, useEffect} from 'react'
import ScrollToBottom from"react-scroll-to-bottom"

function Chat({socket,username,room}) {

    const[currentMessage,setCurrentMessage]=useState();
    const[messageList,setMessageList]=useState([]);


    const sendMessage=async ()=>{
        if(currentMessage!==""){
            const messageData={
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours()+':' + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message",messageData)
        setMessageList((list)=>[...list,messageData])
        setCurrentMessage("")

        }
   
    }

    useEffect(() =>{
      socket.on("recieve_message",(data)=>{
        console.log(data);
        setMessageList((list)=>[...list,data])
      })
    },[])

  return (
    <div className="chat-window">
        <div className="chat-header">
            <p>Hi {username}, you have joined room No. {room}</p>
        </div>
        <div className="chat-body"> 
        <ScrollToBottom className="message-container">

        {messageList.map((messageContent)=>{
            return (
                <div className="message" 
                id={username===messageContent.author?"you":"other"}
                >
                    <div className="message-content">
                        <p className="message">{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                        <p className="metaAuthor">{messageContent.author}</p>
                        <p className="metaTime">{messageContent.time}</p>
                    </div>

                </div>
            )
        })}
        </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input type="text" value={currentMessage} placeholder="your message......" 
            onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
             onChange={(e)=>{
                setCurrentMessage(e.target.value);
            }}/>
            <button onClick={sendMessage}
          
            >SEND</button>
        </div>

    </div>
  )
}

export default Chat