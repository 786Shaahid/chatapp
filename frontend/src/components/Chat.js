import { Avatar, Box, CardHeader, Divider, Fab, IconButton, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Groups2Icon from '@mui/icons-material/Groups2';
import { blue, red } from '@mui/material/colors';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from 'emoji-picker-react';
import io from 'socket.io-client';



function Chat({ user ,length}) {
console.log(length);
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [liked, setLike] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const messageScroll=useRef(null);
  const socket = useMemo(
    () =>
      io('http://localhost:8080', { transports: ["websocket", 'polling'] }),
    []
  );

  useEffect(() => {
    if (messageScroll.current) {
      messageScroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("userId connected!", socket.id);
    });

    socket.on('chatMessage', (msg) => {
      setChatMessages([...chatMessages, msg]);
      // console.log(chatMessages.length);
    });


    return () => {
      socket.off('chat message');
    };
  }, [socket, chatMessages]);






  const handleClick = () => {
    setLike(!liked);
    setCount(count + 1)

  };
  const handleEmojiClick = (emoji) => {
    setMessage(message + " " + emoji.emoji);
    setIsEmojiPickerOpen(false);
  };

  //  const handleEmojiPicker=()=>{

  //  }
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const time = new Date().toLocaleTimeString();
      const newMessage = {
        id: Math.floor(Math.random() * 9000) + 1000,
        user: user,
        text: message,
        likes: 0,
        time: time

      };
      socket.emit('sendMessage', newMessage);
      setMessage('');
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };


  return (
    <Stack sx={{ p: '2px', bgcolor: 'whitesmoke' }}>
      {/* THIS IS CHAT BOX MESSAGE HEADER */}
      <CardHeader titleTypographyProps={{ fontSize: "1.1rem", }}
        title={user}
        subheader={new Date().toLocaleDateString()}
        action={
          <Box display={'flex'} p={2} sx={{ justifyContent: 'space-around', opacity: '0.6' }} fontSize={20}>
            <Box display={'flex'} justifyContent={'space-evenly'} width={'5rem'} >
              <Typography>3</Typography>
              <Divider orientation="vertical" />
              <Typography>100</Typography>
            </Box>
            <Groups2Icon />
          </Box>
        }
      />
      <Divider orientation="" flexItem sx={{ borderWidth: '1.5px' }} />
      {/* THIS IS MESSAGE CONTAINER */}
      <Stack    >
        <Stack p={2}   height='78vh' spacing={1} sx={{overflow:'auto'}} >
        {
          chatMessages.length ? chatMessages?.map((data, index) => (
            <>
              <Stack justifyContent='flex-start' key={index}  ref={messageScroll} >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {data.user[0]}
                    </Avatar>
                  }
                  title={<div style={{ display: 'flex', alignItems: 'center', fontSize: '17px', textTransform: 'capitalize',fontWeight:'600',opacity:'0.9' }}>{data.user} <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: '#777' }}>{data.time}</span></div>}
                />
                <Box display={'flex'}>
                  <Stack sx={theme => ({ mt: '-20px', ml: '60px', p: '3' })} direction={{ xs: 'column', md: 'row' }} spacing={1} >
                    <Typography variant='body1' sx={theme => ({
                      bgcolor:'white', p: '2px 10px', borderRadius: '8px', fontSize: '17px', fontWeight: '500',
                      [theme.breakpoints.up('md')]: {
                        maxWidth: '30rem'
                      }
                    })} >{data.text}</Typography>
                    <Stack direction={'row'} alignItems={'center'}>
                      <Fab onClick={handleClick} color={liked ? 'primary' : 'default'} size='small'>
                        {liked ? <ThumbUpIcon sx={{ marginLeft: '2px' }} /> : <ThumbUpOffAltIcon sx={{ marginLeft: '2px' }} />
                        }
                      </Fab>
                      <Box sx={{ marginLeft: '4px' }} >{count}</Box>

                    </Stack>
                  </Stack>
                  <Box></Box>
                </Box>
              </Stack>
            </>
          )) : (<Stack bgcolor={blue[300]} textAlign={'center'}><Typography variant='h5'>Let's Start Chat</Typography></Stack>)
        }

        {isEmojiPickerOpen && (
          <div style={{ position: 'absolute', bottom: 0, right: 0, zIndex: '1000' }}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
</Stack>
<Stack direction="row"
          spacing={2}
          padding={2}
          sx={theme => ({
            position: 'fixed',
            bottom: 0,
            backgroundColor: '#f5f5f5',
            alignItems: 'center',
            width: '95%',
            [theme.breakpoints.up('md')]: {
              width: '75%',
            }
          })}>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}

            id="message"
            label="Type your message"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <IconButton onClick={handleSendMessage}>
            <SendIcon />
          </IconButton>
          <IconButton aria-label="insert emoji" onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}>
            <InsertEmoticonIcon />
          </IconButton>

        </Stack>
      </Stack>
    </Stack>
  )
}


export default Chat;