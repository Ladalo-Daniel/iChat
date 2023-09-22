import React, { useContext, useState } from 'react'
 import { auth } from '../firebase'
 import { signOut } from 'firebase/auth'
import { AppBar, Avatar, Badge, Box, InputBase, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { Notifications, OfflineBolt } from '@mui/icons-material'
import { ChatsContext } from '../context/ChatsContext'
import { AuthContext } from '../context/AuthContext'
import SearchIcon from '@mui/icons-material/Search';

const StyledToolbar = styled(Toolbar)({
  display:"flex",
  justifyContent:"space-between",
  backgroundColor:"primary",
  marginBottom:"0.3rem"
});

const Search = styled("div")(({theme}) => ({
  backgroundColor:"white",
  padding:"0 10px",
  borderRadius:"5px",
  width:"40%",
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Icons = styled(Box)(({theme}) => ({
  backgroundColor:"",
  display:"flex",
  alignItems:"center",
  color:"white",
  gap:"20px"
}));



function Header() {
  const { data } = useContext(ChatsContext)
  const {currentUser} = useContext(AuthContext)


  const [open, setOpen] = useState(false)
  return (
    <AppBar position='sticky'>
      <StyledToolbar>
        <Typography variant='h6' m={1} color="white" sx={{fontSize:{xs:'13px', sm:"20px"}}}>DALLOH</Typography>
        <Search >
          <InputBase placeholder='Search here...'/>
        </Search>
        <Link to="/messenger" className='Link'><OfflineBolt /></Link>
        <Icons>
        <Badge badgeContent={2} color="error">
         <Notifications />
         </Badge>
         <Avatar src={currentUser.photoURL } sx={{width:"40px", height:"40px",}} onClick={e=>setOpen(!false)} />
        </Icons>
      </StyledToolbar>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={e=>setOpen(false)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}

          sx={{marginTop:"3rem"}}
        >
          <MenuItem >Profile</MenuItem>
          <MenuItem >My account</MenuItem>
          <MenuItem ><button onClick={() => setTimeout(() => {
            signOut(auth)
          }, 2000)}>Logout</button></MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Header

{/* <Link to="/messenger">Messenger</Link>
<button onClick={() =>signOut(auth)}>Logout</button> */}

// const Icons = styled(Box)(({theme})({
//   backgroundColor:"white"
// }));

{/* <Button onClick={() =>signOut(auth)}>Logout</Button> */}

{/* <SearchIconWrapper>
           <SearchIcon />
          </SearchIconWrapper> */}