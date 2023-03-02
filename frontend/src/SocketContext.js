import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { getUserProfile } from './axios/services/HomeService';

const SocketContext = createContext();

const socket = io('http://localhost:5000')

const ContextProvider = ({ children, receiverId }) => {

    console.log('received', receiverId);

    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    const [details, setDetails] = useState([]);

    const token = JSON.parse(localStorage.getItem('user'))?.token || JSON.parse(localStorage.getItem('trainer'))?.token
    const result = JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('trainer'))
    const id = result?.user?._id || result?.trainer?._id
    const nam = result?.user?.fname || result?.trainer?.fname
    console.log('result', id);

    async function fetchData() {
        const data = await getUserProfile(token, id);
        console.log('in user profile');
        setDetails(data[0]);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream)
                if (myVideo.current) {
                    myVideo.current.srcObject = currentStream;

                }
            })
        const getUserMedia = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(stream);
            myVideo.current.srcObject = stream;
        };

        const handlePermission = async () => {
            const permission = await navigator.permissions.query({ name: 'camera' });
            if (permission.state === 'granted') {
                getUserMedia();
            } else if (permission.state === 'prompt') {
                permission.onchange = (event) => {
                    if (event.target.state === 'granted') {
                        getUserMedia();
                    }
                };
            }
        };

        handlePermission();

        // socket.on('me', (id) => setMe(id));

        // socket.on('callUser', ({ from, name: callerName, signal }) => {
        //     setCall({ isReceivingCall: true, from, name: callerName, signal })
        // });
    }, []);

    useEffect(() => {
        socket.emit("addUserVideo", id);
        socket.emit('callUser', ({ from, name: nam, signal }) => {
            setCall({ isReceivingCall: true, from, name: nam, signal })
        });
    }, [])

    const answerCall = () => {
        setCallAccepted(true)

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            console.log('in answer call');
            socket.emit('answerCall', { signal: data, to: call.from })
        });

        peer.on('stream', (currentStream) => {
            if (userVideo.current) {
                console.log('in stream');
                userVideo.current.srcObject = currentStream;
            }
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser = (id) => {
        console.log('in call user');
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: details.email, name: details.fname });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    }

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
    }

    return (
        <SocketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, me, callUser, leaveCall, answerCall }}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext };