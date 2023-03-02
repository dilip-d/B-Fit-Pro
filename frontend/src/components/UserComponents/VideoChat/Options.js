import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Assignment, AssignmentIndRounded, Phone, PhoneDisabled } from '@material-ui/icons'

import { SocketContext } from '../../../SocketContext';
import { getUserProfile } from '../../../axios/services/HomeService';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    gridContainer: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    container: {
        width: '600px',
        margin: '35px 0',
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },
    margin: {
        marginTop: 20,
    },
    padding: {
        padding: 20,
    },
    paper: {
        padding: '10px 20px',
        border: '2px solid black',
    },
}));

const Options = ({ children ,receiverId}) => {

    const { me, callAccepted, name, setName, leaveCall, callEnded, callUser } = useContext(SocketContext)
    const [idToCall, setIdToCall] = useState('')
    console.log(idToCall);
    const classes = useStyles();

    // const [details, setDetails] = useState([]);

    const token = JSON.parse(localStorage.getItem('user'))?.token || JSON.parse(localStorage.getItem('trainer'))?.token
    const result = JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('trainer'))
    const id = result?.user?._id || result?.trainer?._id
    const nam = result?.user?.fname || result?.trainer?.fname
    console.log('result',id);

    // async function fetchData() {
    //     const id = result.user._id
    //     const data = await getUserProfile(token, id);
    //     console.log('in user profile');
    //     setDetails(data[0]);
    // }

    // useEffect(() => {
    //     fetchData();
    // }, []);

    return (
        <Container className={classes.container}>
            <Paper elevation={10} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete='off'>
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12} md={6} className={classes.padding}>
                            <Typography gutterBottom variant='h6'>Account Info</Typography>
                            <TextField label='Name' value={nam} onChange={(e) => setName(e.target.value)} fullWidth ></TextField>
                            {console.log(me)}
                            <CopyToClipboard text={me} className={classes.margin}>
                                <Button variant='contained' color='primary' fullWidth startIcon={<Assignment fontSize='large' />}>
                                    Copy Your ID
                                </Button>
                            </CopyToClipboard>
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.padding}>
                            <Typography gutterBottom variant='h6'>Make a call</Typography>
                            <TextField label='ID to call' value={me} onChange={(e) => setIdToCall(me)} fullWidth ></TextField>
                            {callAccepted && !callEnded ? (
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    startIcon={<PhoneDisabled fontSize='large' />}
                                    fullWidth
                                    onClick={leaveCall}
                                    className={classes.margin}
                                >
                                    Hang Up
                                </Button>
                            ) : (
                                <Button
                                    variant='contained'
                                    color='primary'
                                    startIcon={<Phone fontSize='large' />}
                                    fullWidth
                                    onClick={() => callUser(idToCall)}
                                    className={classes.margin}
                                >
                                    call
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </form>
                {children}
            </Paper>
        </Container>
    )
}

export default Options