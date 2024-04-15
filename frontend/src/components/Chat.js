import { Box, CardHeader, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react'
import Groups2Icon from '@mui/icons-material/Groups2';
import { blue } from '@mui/material/colors';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from 'emoji-picker-react';
import io from 'socket.io-client';
import MessagesBox from './MessagesBox';

function SetUsersFromSocket(messages, setUsers) {
  const uniqueUsers = messages.filter((message, index, self) => {
    return self.findIndex(m => m.user === message.user) === index;
  });
  console.log(uniqueUsers);
  setUsers(uniqueUsers);
}


function Chat({ user, setUsers, length }) {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);


  //1. setUser from socket server
  useEffect(() => {
    SetUsersFromSocket(chatMessages, setUsers)
  }, [chatMessages, setUsers])

  //2. socket connection
  const socket = useMemo(
    () =>
      io('http://localhost:8080', { transports: ["websocket", 'polling'] }),
    []
  );
  //  SET MESSAGE FROM SOCKET   
  useEffect(() => {
    socket.on("connect", () => {
      console.log("userId connected!", socket.id);
    });
    socket.on('chatMessage', (msg) => {
      setChatMessages([...chatMessages, msg]);
    });
    return () => {
      socket.off('chatMessage');
    };
  }, [socket, chatMessages]);



  const handleEmojiClick = (emoji) => {
    setMessage(message + " " + emoji.emoji);
    setIsEmojiPickerOpen(false);
  };


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
      {/* 1. THIS IS CHAT BOX MESSAGE HEADER */}
      <CardHeader titleTypographyProps={{ fontSize: "1.1rem", }}
        title={user}
        subheader={new Date().toLocaleDateString()}
        action={
          <Box display={'flex'} p={2} sx={{ justifyContent: 'space-around', opacity: '0.6' }} fontSize={20}>
            <Box display={'flex'} justifyContent={'space-evenly'} width={'5rem'} >
              <Typography>{length === 0 ? "1" : length}</Typography>
              <Divider orientation="vertical" />
            </Box>
            <Groups2Icon />
          </Box>
        }
      />
      <Divider flexItem sx={{ borderWidth: '1.5px' }} />

      {/*2.  THIS IS MESSAGE CONTAINER */}
      <Stack    >
        <Stack p={2} height='78vh' spacing={1} sx={{ overflow: 'auto' }} >
          {
            chatMessages.length ? chatMessages?.map((data, index) => (
              <>
                <MessagesBox chatMessages={chatMessages} data={data} key={index} />
              </>
            )) : (<Stack bgcolor={blue[300]} textAlign={'center'}><Typography variant='h4'>Let's Start Chat</Typography></Stack>)
          }

          {/*3. EMOJI CONTAINER */}
          {isEmojiPickerOpen && (
            <div style={{ position: 'absolute', bottom: 0, right: 0, zIndex: '1000' }}>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </Stack>

        {/* 4. TEXT FIELD */}
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