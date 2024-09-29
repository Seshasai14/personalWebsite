import React, { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from "../../../firebase-config";

const ChatRoom = ({ room }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(null); // New state to handle errors

    useEffect(() => {
        const messageRef = collection(db, "messages");
        
        // Adjusted query to use 'desc' for createdAt to match the Firestore index
        const queryMessages = query(
            messageRef,
            where("room", "==", room),
            orderBy("createdAt", "desc") // Changed to descending to match the existing index
        );

        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            if (!snapshot.empty) {
                const loadedMessages = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setMessages(loadedMessages);
            } else {
                console.log("No messages found in this room");
            }
        }, (error) => {
            console.error("Error with snapshot listener:", error.message);

            // Specific check for Firestore index error
            if (error.code === 'failed-precondition') {
                setErrorMessage("This query requires a Firestore index. Please check your Firebase Console.");
            } else {
                setErrorMessage("Error loading messages: " + error.message);
            }
        });

        return () => {
            console.log("Unsubscribing from Firestore listener");
            unsubscribe();
        };
    }, [room]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const messageRef = collection(db, "messages");

        try {
            await addDoc(messageRef, {
                text: newMessage,
                createdAt: serverTimestamp(),
                user: auth.currentUser ? auth.currentUser.displayName : "Anonymous",
                room,
            });
            setNewMessage('');
        } catch (error) {
            console.error("Error adding document: ", error);
            setErrorMessage("Failed to send message: " + error.message); // Error handling when sending message
        }
    };

    return (
        <div className='chatRoom'>
            {errorMessage && <div className="error">{errorMessage}</div>} {/* Display error message */}

            <div className='messages'>
                {messages.map((message) => (
                    <div key={message.id} className='message'>
                        <strong>{message.user}:</strong> {message.text}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className='newMessageForm'>
                <input
                    className='newMessageInput'
                    placeholder='Type a message'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className='sendButton' type='submit'>Send</button>
            </form>
        </div>
    );
}

export default ChatRoom;
