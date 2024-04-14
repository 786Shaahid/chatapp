import Chat from './components/Chat';
import {Box,Stack} from '@mui/material';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Box sx={theme=>({
         display:'flex',
         gap:'2px',
         p:'5px'
    })}>
    <Stack flex={2}  sx={{display:{xs:'none',md:"block"}}}>
    <Sidebar/>

    </Stack>
    <Stack flex={6  }  >
    <Chat/> 
    </Stack>
         

    </Box>
  );
}

export default App;
