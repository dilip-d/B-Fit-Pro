// import React, { useCallback, useEffect, useState } from 'react'
// import { useSocket } from '../../providers/Socket';
// import { usePeer } from '../../providers/Peer';
// import ReactPlayer from 'react-player';

// const RoomPage = () => {

//   const { socket } = useSocket();
//   const { peer, createAnswer, createOffer, setRemoteAns, sendStream, remoteStream } = usePeer();

//   const [myStream, setMyStream] = useState(null);
//   const [remoteEmailId, setRemoteEmailId] = useState();

// //   const user = JSON.parse(localStorage.getItem("user"))
// //   const userid = user?.user?._id;

// //   useEffect(() => {
// //     socket.current.emit("addUser", userid)
// // }, [userid])

//   const handleNewUserJoined = useCallback(async ({ emailId }) => {
//     console.log('New user joined room', emailId);
//     const offer = await createOffer();
//     socket.emit('call-user', { emailId, offer });
//     setRemoteEmailId(emailId)
//   },
//     [createOffer, socket]
//   );

//   const handleIncomingCall = useCallback(async (data) => {
//     const { from, offer } = data;
//     console.log('incoming call from', from, offer);
//     const ans = await createAnswer(offer);
//     socket.emit('call-accepted', { emailId: from, ans })
//     setRemoteEmailId(from)
//   }, [createAnswer, socket]);

//   const handleCallAccepted = useCallback(async (data) => {
//     const { ans } = data;
//     console.log('Call got Accepted', ans);
//     await setRemoteAns(ans);
//     sendStream(myStream);
//   }, [setRemoteAns]);

//   const getUserMediaStream = useCallback(async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: true
//     })
//     setMyStream(stream);
//   }, []);

//   const handleNegotiation = useCallback(async() => {
//     console.log('handling negotiation');
//     const localOffer = await peer.createOffer();
//     socket.emit('call-user', { emailId: remoteEmailId, offer: localOffer });
//   }, []);

//   useEffect(() => {
//     socket.on('user-joined', handleNewUserJoined)
//     socket.on('incoming-call', handleIncomingCall)
//     socket.on('call-accepted', handleCallAccepted)

//     return () => {
//       socket.off('user-joined', handleNewUserJoined)
//       socket.off('incoming-call', handleIncomingCall)
//       socket.off('call-accepted', handleCallAccepted)
//     }
//   }, [handleNewUserJoined, handleIncomingCall, handleCallAccepted, socket]);

//   useEffect(() => {
//     peer.addEventListener('negotiationneeded', handleNegotiation);
//     return () => {
//       peer.removeEventListener('negotiationneeded', handleNegotiation)
//     }
//   }, []);

//   useEffect(() => {
//     getUserMediaStream();
//   }, [])

//   return (
//     <div className='room-page-container bg-dark'>
//       <h1 className='text-white'>ROOM</h1>
//       <h4 className='text-white'>You are connected to {remoteEmailId}</h4>
//       <button onClick={(e) => sendStream(myStream)}>Send My Video</button>
//       <ReactPlayer url={myStream} playing muted />
//       <ReactPlayer url={remoteStream} playing />
//     </div>
//   )
// }

// export default RoomPage;