import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MicIcon from "@mui/icons-material/Mic";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import "./css/chat.css";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

const Chat = () => {
  const { roomId } = useParams();

  const [roomName, setRoomName] = useState("");

  const [input, setInput] = useState("");

  const [messages, setMessage] = useState([]);

  const [{ user }, dispatch] = useStateValue();

  const [seed ,setSeed] = useState();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("message")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessage(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);
  console.log(messages);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input === "") {
      return alert("Please enter your message");
    }
    db.collection("rooms").doc(roomId).collection("message").add({
      name: user.displayName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            {
            new Date(messages[messages.length-1]?.timestamp?.seconds * 1000).toLocaleTimeString()
            }
          </p>
        </div>

        <div className="header__right">
          <IconButton>
            <SearchIcon />
          </IconButton>

          <IconButton>
            <AttachFileIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              user.displayName === message.name && `chat__receiver`
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__time">
            {
            new Date(message.timestamp?.seconds * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            }
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <EmojiEmotionsIcon />
        <AttachFileIcon />
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={input}
            placeholder="Type your message"
            onChange={(e) => setInput(e.target.value)}
          />
          <input type="submit" />
        </form>

        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
