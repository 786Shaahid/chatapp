import { Avatar, Divider, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'

function ListItems({ListData}) {

  return (
    <>
     <ListItem alignItems="center" justifyContent='center'>
          <ListItemButton>
        <ListItemAvatar>
          <Avatar alt="profile_pic" />
        </ListItemAvatar>
        <ListItemText
          primary={ListData.user ?? ListData}
         
        />
          </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />  
    </>
  )
}

export default ListItems;