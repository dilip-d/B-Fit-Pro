// import React, { useCallback, useEffect, useMemo, useState } from "react";

// const PeerContext = React.createContext(null);

// export const usePeer = () => React.useContext(PeerContext);

// export const PeerProvider = (props) => {

//     const [remoteStream, setRemoteStream] = useState(null);
//     console.log(remoteStream);

//     const peer = useMemo(() => new RTCPeerConnection({
//         iceServers: [
//             {
//                 urls: [
//                     "stun:stun.l.google.com:19302",
//                     // "stun.global.stun.twilio.com:3478",
//                     "turn:my-turn-server.com:3478",
//                 ],
//                 username: "my-username",
//                 credential: "my-password"
//             }
//         ]
//     }), []);

//     const createOffer = async () => {
//         console.log('Create Offer');
//         try {
//             const offer = await peer.createOffer();
//             await peer.setLocalDescription(offer);
//             return offer;
//         } catch (error) {
//             console.error("Failed to create offer:", error);
//             throw error;
//         }
//     };

//     const createAnswer = async (offer) => {
//         //remembering opposite user offer
//         console.log('Create Ans');
//         try {
//             await peer.setRemoteDescription(offer);
//             const answer = await peer.createAnswer();
//             await peer.setLocalDescription(answer);
//             return answer;
//         } catch (error) {
//             console.error("Failed to create answer:", error);
//             throw error;
//         }
//     };

//     const setRemoteAns = async (ans) => {
//         await peer.setRemoteDescription(ans);
//     };

//     // const sendStream = async (stream) => {
//     //     if (!stream) return;
//     //     peer.addStream(stream);
//     // };

//     // useEffect(() => {
//     //     const handleTrackEvent = (event) => {
//     //         console.log('hi', event)
//     //         const {streams} = event.streams;
//     //         console.log(streams);
//     //         if (streams.length) {
//     //             setRemoteStream(streams[0]);
//     //             console.log(streams[0]);
//     //         }
//     //     };

//     //     peer.addEventListener('track', handleTrackEvent);

//     //     return () => {
//     //         peer.removeEventListener('track', handleTrackEvent);
//     //     };
//     // }, [peer]);

//     const sendStream = async (stream) => {
//         if (!stream) return;
//         const tracks = stream.getTracks();
//         for (const track of tracks) {
//             if (!peer.getSenders().find(sender => sender.track === track)) {
//                 peer.addTrack(track, stream);
//             }
//         }
//     };

//     const handleTrackEvent = useCallback((ev) => {
//         // console.log(ev);
//         const {streams} = ev;

//         console.log(streams);
//         if (streams.length) {
//             setRemoteStream(streams[0]);
//             console.log(streams[0]);
//         }
//     }, []);

//     useEffect(() => {
//         console.log('in handle track event');
//         peer.addEventListener('track', handleTrackEvent)
//         return () => {
//             //returns a cleanup function
//             peer.removeEventListener('track', handleTrackEvent)       
//         }
//     }, [ handleTrackEvent, peer]);

//     return (
//         <PeerContext.Provider value={{ peer, createOffer, createAnswer, setRemoteAns, sendStream, remoteStream }}>
//             {props.children}
//         </PeerContext.Provider>
//     )
// }