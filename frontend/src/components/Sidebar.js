import React from 'react'
import {Stack,Fab,Card,CardHeader,Avatar,Typography,Box,List} from '@mui/material';
import { red } from '@mui/material/colors';
import ListItmes from './ListItems.js';
import AddIcon from '@mui/icons-material/Add';

function Sidebar({users,user}) {

  return (
    <Stack >
      {/* SIDEBAR CARD HEADER */}
        <Card>
        <CardHeader titleTypographyProps={{fontSize:"1.1rem"}}
        avatar={
            <>
          <Avatar sx={{ bgcolor: red[500],width:'55px', height:'55px',position:'relative', overflow:'visible'}} aria-label="recipe" >
            G
          </Avatar>
          <Box sx={{width:'15px', height:'15px',bgcolor:"yellowGreen", position:'absolute', top:'3em', left:"4rem" ,borderRadius:"50%", outline:'5px solid white' }}>
          </Box>
          </>
        }
        title="Group Chat"
        subheader="April 14, 2024"
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
      {
    users.length ?     users?.map((user,index)=>(<>
             <ListItmes ListData={user} key={index}/>
        </>)):(<ListItmes ListData={user} />)
      }
 </List>
         
        
        

         </Box>

    </Stack>
  )
}

export default Sidebar;