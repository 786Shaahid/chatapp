import {  Avatar, Box,  CardHeader, Divider,  Fab,  IconButton,  InputBase,  MenuItem,  Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import Groups2Icon from '@mui/icons-material/Groups2';
import { blue, red } from '@mui/material/colors';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from 'emoji-picker-react';

function Chat() {
  const [message, setMessage] = useState('');
  const [count,setCount]=useState(0);
  // const [chatMessages, setChatMessages] = useState([]);

  const [linked, setLike] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const handleClick = () => {
    setLike(!linked);
    setCount(count+1)
    
  };
  const handleEmojiClick = (emoji) => {
    setMessage(message + emoji.emoji);
    setIsEmojiPickerOpen(false);
  };

 const handleEmojiPicker=()=>{
     
 }
 const handleSendMessage=()=>{
     
 }

  return (
    <Stack sx={{p:'2px',bgcolor:'whitesmoke'}}>
        <CardHeader titleTypographyProps={{fontSize:"1.1rem"}}
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
        action={
          <Box  display={'flex'} p={2}  sx={{justifyContent:'space-around', opacity:'0.6'}} fontSize={20}>
         <Box display={'flex'} justifyContent={'space-evenly'} width={'5rem'} >
          <Typography>3</Typography>
         <Divider orientation="vertical" flexItem sx={{borderWidth:'1.5px'}}/>
          <Typography>100</Typography>
          </Box>
         <Groups2Icon/>
          </Box>
        }
      />  
        <Divider orientation="" flexItem sx={{borderWidth:'1.5px'}}/>
        <Stack  p={2} height='86vh' >
          <Stack  justifyContent='flex-start'   sx={theme=>({})}>
          <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={<div style={{ display: 'flex', alignItems: 'center' }}>Shrimp <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: '#777' }}>14:20 AM</span></div>}
        />
        <Box display={'flex'}>
        <Stack sx={theme=>({mt:'-20px',ml:'60px',p:'3'})}  direction={{ xs: 'column', md: 'row' }} spacing={1} >
         <Typography variant='body1' sx={theme=>({bgcolor:blue[300], p:'2px 10px' ,borderRadius:'8px',fontSize:'17px',fontWeight:'500',
            [theme.breakpoints.up('md')]:{
                  maxWidth:'30rem'
            } 
        })} >ths is my jbjkbjhbj kbjkjh   lsjfkdsahjfiuasdhfidu fksdhfakdsjfhkjdasfhk</Typography>
        <Stack direction={'row'} alignItems={'center'}>
         <Fab onClick={handleClick}  color={linked ? 'primary' : 'default'} size='small'>
  {linked ? <ThumbUpIcon  sx={{marginLeft:'2px' }} /> :<ThumbUpOffAltIcon   sx={{marginLeft:'2px' }} />
         }
         </Fab>
         <Box sx={{marginLeft:'4px' }} >{count}</Box> 

        </Stack>
        </Stack>
       <Box></Box>
          </Box>
          </Stack>
             <Stack  direction="row"
        spacing={1}
        sx={theme=>({
          position: 'fixed',
          bottom: 0,
          padding: '10px',
          backgroundColor: '#f5f5f5',
          alignItems: 'center',
          width: '95%', 
          [theme.breakpoints.up('md')]: {
            width: '70%', 
          }
        })}>
             <TextField
             value={message}
             onChange={(e) => setMessage(e.target.value)}
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
   
          <Stack>
            </Stack>
            {isEmojiPickerOpen && (
            <div style={{ position: 'absolute',bottom:0,right:0, zIndex: '1000' }}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
          )} 
        </Stack>
    </Stack>
  )
}


export default Chat ;