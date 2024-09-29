import React, { useState, useRef } from "react";
import Authenticate from "./Authenticate.jsx";
import Cookies from "universal-cookie";
import ChatRoom from "./ChatRoom.jsx";
const cookies = new Cookies();

const ChatApp = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  if (!isAuth) {
    return (
      <div>
        <h1>Chat App</h1>
        <Authenticate setIsAuth={setIsAuth} /> {/* Pass the function correctly */}
        <p>This is the chat application page.</p>
      </div>
    );
  }

  return (
    <div>
      {room ? (
        <ChatRoom room={room}/>
      ) : (
        <div className="room">
          <label>Enter Room Name:</label>
          <input ref={roomInputRef} type="text" /> {/* Added type attribute */}
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
