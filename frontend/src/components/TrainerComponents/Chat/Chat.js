import React, { useEffect, useRef, useState } from 'react'
import { getConversations } from '../../../axios/services/ConversationServices'
import { getMessages, postMessages } from '../../../axios/services/MessageServices'
import Conversation from '../../../components/TrainerComponents/Conversation/Conversation'
import Message from '../../../components/UserComponents/Message/Message'
import './Chat.css'
import Picker from 'emoji-picker-react';
import { Link } from 'react-router-dom';
import { io } from "socket.io-client";

function Chat() {

    const [conversations, setConversations] = useState([])
    const [currentChat, setcurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
    const socket = useRef();
    const scrollRef = useRef()

    const user = JSON.parse(localStorage.getItem("trainer"));
    const userid = user?.trainer?._id;

    useEffect(() => {
        // socket.current = io("ws://localhost:5000");
           socket.current = io("https://bfitprobackend.onrender.com");
    }, [])

    useEffect(() => {
        if (socket.current) {
            socket.current.on("getMessage", (data) => {
                setArrivalMessage({
                    sender: data.senderId,
                    text: data.text,
                    createdAt: Date.now(),
                });
                console.log('new msg', data);
            })
        }
    }, [socket])

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage?.sender) &&
            setMessages((prev) => [...prev, arrivalMessage])
        console.log('triggered');
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current.emit("addUser", userid)
        socket.current.on('getUsers', (users) => {
            // console.log(users);
        })
    }, [userid])

    useEffect(() => {
        const getConversatns = async () => {
            const response = await getConversations(userid)
            setConversations(response.data);
        }
        getConversatns()
    }, [userid])

    useEffect(() => {
        const getMessage = async () => {
            const response = await getMessages(currentChat?._id)
            setMessages(response)
        }
        getMessage()
    }, [currentChat])

    const handleEmojiPickerToggle = () => {
        setIsEmojiPickerVisible(!isEmojiPickerVisible);
    }
    const handleEmojiClick = (emojiObject) => {
        setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
    };

    let receiverId = currentChat?.members.find(member => member !== userid)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedMessage = newMessage.trim();
        if (trimmedMessage !== '') {

            const message = {
                sender: userid,
                text: newMessage,
                conversationId: currentChat._id
            };
            receiverId = currentChat.members.find(member => member !== userid)

            socket.current.emit("sendMessage", {
                senderId: userid,
                receiverId,
                text: newMessage,
            })

            const response = await postMessages(message)
            setMessages([...messages, response])
            setNewMessage("")
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <>
            <div className='messenger mt-2 mx-2'>
                <div className='chatMenu' style={{ background: 'lightgrey', borderRadius: "20px" }}>
                    <div className="chatMenuWrapper">
                        {conversations.map((c) => (
                            <div onClick={() => setcurrentChat(c)}>
                                <Conversation conversation={c} currentUser={userid} key={c._id} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='chatBox'>
                    <div className="chatBoxWrapper">
                        {
                            currentChat
                                ? (
                                    <>
                                        <div className="chatBoxTop">
                                            {messages.map((m, index) => (
                                                <div ref={scrollRef} key={index}>
                                                    <Message message={m} own={m.sender === userid} />
                                                </div>
                                            ))}
                                        </div>
                                        {isEmojiPickerVisible && (
                                            <div style={{ zIndex: 99 }}>
                                                <Picker style={{ height: '300px', width: '100%' }} className='emojiPicker' onEmojiClick={handleEmojiClick} />
                                            </div>
                                        )}
                                        <div className="row d-flex flex-wrap">
                                            <div className="col-2 col-md-1 mb-2 mb-md-0">
                                                <button onClick={handleEmojiPickerToggle} class="btn btn-dark btn-sm">😀</button>
                                            </div>
                                            <div className="col-md-9 mb-2 mb-md-0">
                                                <input type="text" className="form-control input-lg" placeholder="Write message..." onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />
                                            </div>
                                            <div className="col-md-2 d-flex justify-content-end align-items-center">
                                                <button className="btn btn-dark btn-sm me-2" onClick={handleSubmit}>Send</button>
                                                <Link to={`/videoChat/${receiverId}`} className="btn btn-secondary btn-sm"><i className="fas fa-video"></i></Link>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <span className='noConversationText'>Open a conversation to start chat</span>
                                )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat