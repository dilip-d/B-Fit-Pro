import React from 'react'
import Notifications from '../../components/UserComponents/VideoChat/Notifications';
import Options from '../../components/UserComponents/VideoChat/Options';
import VideoPlayer from '../../components/UserComponents/VideoChat/VideoPlayer';
import { AppBar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ContextProvider } from '../../SocketContext';

const useStyles = makeStyles((theme) => ({

    appBar: {
        borderRadius: 15,
        margin: '30px 100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        border: '2px solid black',

        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
    },
    image: {
        marginLeft: '15px',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        background: `linear-gradient(
          rgba(0, 0, 0, 0.3), 
          rgba(0, 0, 0, 0.3)
        ),
        url(https://img.freepik.com/free-psd/fiddle-leaf-fig-room_53876-89633.jpg?w=740&t=st=1676007282~exp=1676007882~hmac=8fd9f9ac80e386543be0f6618bab89357645130f997808cf3b3b9af82566cee3)`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
    },
}));

const ChatPage = () => {

    const classes = useStyles();

    return (
        <ContextProvider>
            <div className={classes.wrapper}>
                <AppBar className={classes.appBar} position='static' color='inherit'>
                    <Typography variant='h2' align='center'>Video Chat</Typography>
                </AppBar>
                <VideoPlayer />
                <Options>
                    <Notifications />
                </Options>
            </div>
        </ContextProvider>
    )
}

export default ChatPage;