import React from 'react'
import {Stack,Divider,ListItemAvatar,Fab,Card,CardHeader,Avatar,Typography,Box,List,ListItem,ListItemText, ListItemButton  } from '@mui/material';
import { red } from '@mui/material/colors';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import AddIcon from '@mui/icons-material/Add';

function Sidebar() {
  return (
    <Stack >
        <Card>
        <CardHeader titleTypographyProps={{fontSize:"1.1rem"}}
        avatar={
            <>
            
          <Avatar sx={{ bgcolor: red[500],width:'55px', height:'55px',position:'relative', overflow:'visible'}} aria-label="recipe" >
            R
          </Avatar>
          <Box sx={{width:'15px', height:'15px',bgcolor:"yellowGreen", position:'absolute', top:'3em', left:"4rem" ,borderRadius:"50%", outline:'5px solid white' }}>
          </Box>
          </>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />  
        </Card>  
        <Stack flexDirection={'row'} justifyContent="space-around" alignItems={'center'} mt={5 } >
<Typography variant='h6'>Conversations</Typography>
<Fab size='small' color="primary" aria-label="add">
  <AddIcon />
</Fab>

    </Stack>
         <Box sx={theme=>({
         ml:"2rem"
         })}>
         <List >
        <ListItem alignItems="center" justifyContent='center' >
          <ListItemButton>

        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
         
        />
          </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
        

      </List>

         </Box>

    </Stack>
  )
}

export default Sidebar;