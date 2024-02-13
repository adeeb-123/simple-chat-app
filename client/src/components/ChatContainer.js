import React, { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client"
import UserLogin from './UserLogin'
import ChatBoxReciever, { ChatBoxSender } from './ChatBox'
import InputText from './InputText'

const ChatContainer = () => {

  let socketio = socketIOClient("http://localhost:3001")
  const [chats, setChats] = useState([])
  const [user, setUser] = useState(localStorage.getItem("user"))
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"))

  useEffect(() => {
    socketio.on('chat', senderChats => {
      setChats(senderChats)
    })
  })

  function sendChatToSocket(chat) {
    socketio.emit("chat", chat)
  }

  function addMessage(chat) {
    const newChat = { ...chat, user, avatar }
    setChats([...chats, newChat])
    sendChatToSocket([...chats, newChat])
  }

  function logout() {
    localStorage.removeItem("user")
    localStorage.removeItem("avatar")
    setChats([])
    setUser("")
  }

  function ChatsList() {

    return chats.map((chat, index) => {
      if (chat.user === user) {
        console.log("chats", chats)
        return <ChatBoxSender key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />
      }
      console.log("chats", chats)
      return <ChatBoxReciever key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />
    })

  }


  return (
    <div>
      {
        user ? (
          <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <h4>Username: {user}</h4>
              <p onClick={() => logout()} style={{ color: "blue", cursor: 'pointer' }}>Log Out</p>
            </div>


            <ChatsList />
            <InputText addMessage={addMessage} />
          </div>
        ) : <UserLogin setUser={setUser} />

      }
    </div>
  )
}

export default ChatContainer
