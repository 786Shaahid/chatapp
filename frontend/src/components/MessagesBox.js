import { Avatar, Box, CardHeader, Fab, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { red } from '@mui/material/colors';


function MessagesBox({ chatMessages, data }) {
  const messageScroll = useRef(null);
  const [likes, setLikes] = useState(0);
  const [likedBy, setLikedBy] = useState([]);

 
  const handleClick = (userId) => {
    let item = chatMessages.find(item => item.id === userId);
    if (likedBy.includes(userId)) {
      setLikes(prev => prev + item.likes--)
      setLikedBy(likedBy.filter(id => id !== userId));
      console.log(item.likes);
    } else {
      setLikes(prev => prev + item.likes++)
      setLikedBy([...likedBy, userId]);
    }

  };


  useEffect(() => {
    if (messageScroll.current) {
      messageScroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);
  return (
    <>
      <Stack justifyContent='flex-start' ref={messageScroll} >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {data.user[0]}
            </Avatar>
          }
          title={<div style={{ display: 'flex', alignItems: 'center', fontSize: '17px', textTransform: 'capitalize', fontWeight: '600', opacity: '0.9' }}>{data.user} <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: '#777' }}>{data.time}</span></div>}
        />
        <Box display={'flex'}>
          <Stack sx={theme => ({ mt: '-20px', ml: '60px', p: '3' })} direction={{ xs: 'column', md: 'row' }} spacing={1} >
            <Typography variant='body1' sx={theme => ({
              bgcolor: 'white', p: '2px 10px', borderRadius: '8px', fontSize: '17px', fontWeight: '500',
              [theme.breakpoints.up('md')]: {
                maxWidth: '30rem'
              }
            })} >{data.text}</Typography>
            <Stack direction={'row'} alignItems={'center'}>
              <Fab onClick={() => handleClick(data.id)} color={likedBy.includes(data.id) ? 'primary' : 'default'} size='small'>
                {likedBy.includes(data.id) ? <ThumbUpIcon sx={{ marginLeft: '2px' }} /> : <ThumbUpOffAltIcon sx={{ marginLeft: '2px' }} />
                }
              </Fab>
              <Box sx={{ marginLeft: '4px' }} >{data.likes}</Box>
            </Stack>
          </Stack>
          <Box></Box>
        </Box>
      </Stack>

    </>
  )
}

export default MessagesBox;