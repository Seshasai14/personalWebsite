import React, { useState, useRef } from "react";
import Authenticate from "./Authenticate.jsx";
import Cookies from "universal-cookie";
import ChatRoom from "./ChatRoom.jsx";
import { FaShareAlt, FaWhatsapp } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();

const ChatApp = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const shareRoom = () => {
    const roomCode = roomInputRef.current.value;
    const shareMessage = `You are in Sesh's ChatApp\nYour Room Code: ${roomCode}\nEnjoy your chat!`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      shareMessage
    )}`;
    const result = window.open(whatsappUrl, "_blank");
    if (result) {
      toast.success("Room code sent successfully via WhatsApp!");
    } else {
      toast.error("Failed to send the room code. Please try again.");
    }
  };
  if (!isAuth) {
    return (
      <div className="centered absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-5xl">Chat App</h1>
        <Authenticate setIsAuth={setIsAuth} />
        <p>This is the chat application page.</p>
      </div>
    );
  }
  return (
    <div className="centered absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {room ? (
        <ChatRoom room={room} />
      ) : (
        <div className="room flex flex-col items-center">
          <label className="mb-2">Enter Room Name:</label>
          <input
            ref={roomInputRef}
            type="text"
            className="border border-gray-300 p-2 mb-2"
            placeholder="Room name"
          />
          <button
            onClick={() => setRoom(roomInputRef.current.value)}
            className="bg-blue-500 text-white p-2 rounded mb-2 mt-3"
          >
            Enter Chat
          </button>
          <button
            onClick={shareRoom}
            className="flex items-center p-2 m-2 bg-green-500 text-white rounded"
          >
            <FaShareAlt className="mr-1" />
            <FaWhatsapp className="mr-1" />
            WhatsApp
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
export default ChatApp;
