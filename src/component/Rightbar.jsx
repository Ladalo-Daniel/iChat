import { Avatar, AvatarGroup, Box, ImageList, ImageListItem, Typography } from '@mui/material'
import React from 'react'
import Conversation from './Conversation';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
]; 

function Rightbar() {
  return (
    <Box bgcolor="otherColor" flex={2} p={2} sx={{display: {xs:"none", sm:"block"}}}>
      <Box sx={{position:"fixed"}} width={300}>
            <Typography variant='h6' fontWeight={100}>Online Friends</Typography>
            <AvatarGroup sx={{marginRight:"9rem"}} max={4}>
              <Avatar alt="Remy Sharp" src="../src/img/1.jpeg" />
              <Avatar alt="Travis Howard" src="../src/img/2.jpeg" />
              <Avatar alt="Cindy Baker" src="../src/img/3.jpeg" />
              <Avatar alt="Agnes Walker" src="../src/img/1.jpeg" />
              <Avatar alt="Trevor Henderson" src="../src/img/3.jpeg" />
          </AvatarGroup>
          <Typography variant='h6' fontWeight={100}>Latest Photos</Typography>
          <ImageList sx={{ width: 300, height: 100, overflow:"hidden" }} cols={2} rowHeight={164} >
            {itemData.map((item) => (
              <ImageListItem  key={item.img}>
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                /> 
              </ImageListItem>
            ))}
        </ImageList>
        <Typography variant='h6' fontWeight={100}>Latest conversation </Typography>
        <Conversation />
     </Box>
 </Box>
  )
}

export default Rightbar
