import Chat from './components/Chat';
import {Box,Stack} from '@mui/material';
import Sidebar from './components/Sidebar';
import { useEffect, useState } from 'react';

function App() {
  const [users,setUsers]=useState([]);
  const [user,setUser]=useState('');

 
  useEffect(()=>{
    const userName = window.prompt('Please enter your name:');
    setUser(userName);
    // setUsers([...users,userName]);
  },[])

// console.log(users);

  return (
    <>
   {
     user ? (<> <Box sx={theme=>({
      display:'flex',
      gap:'2px',
      p:'5px',
 })}>
 <Stack flex={2}  sx={{display:{xs:'none',md:"block"}}}>
 <Sidebar user={user} users={users}/>

 </Stack>
 <Stack flex={6}  >
 <Chat user={user.replace(/^\w/, (c) => c.toUpperCase())} setUsers={setUsers} length={users?.length}/> 
 </Stack>
 </Box></>):(<h4 style={{textAlign:'center'}}>Refresh the page and enter your name</h4>)
   }
    </>
  );
}

export default App;
