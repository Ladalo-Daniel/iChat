import { Avatar, Box, Button, ButtonGroup, Fab, Modal, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Add as AddIcon, DateRange, EmojiEmotions, Image, PersonAdd, VideoCameraBack } from '@mui/icons-material'
import styled from '@emotion/styled'
import { AuthContext } from '../context/AuthContext'

const StyledModal = styled(Modal)({
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
 
})

const UserBox = styled(Box)({
  display:"flex",
  alignItems:"center",
  margin:"20px",
  gap:"10px"
})

export default function Add() {
  const {currentUser} = useContext(AuthContext)

  const [open, setOpen] = useState(false)

  return (
    <>
       <Tooltip title="Add Post" sx={{position:"fixed", bottom:"20px", left:{xs:"calc(50%)", md:30,} }} color='primary' onClick={e=>setOpen(true)}>
        <Fab caria-label="add">
            <AddIcon sx={{color:"white"}} />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={e=> setOpen(false)}
        aria-labelledby="StyledModal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} height={400} p={2} bgcolor={"background.default"} color={"text.primary"} borderRadius={3} >
           <Typography variant='h6' color="gray" textAlign="center">Create Post</Typography>
           <UserBox>
             <Avatar src={currentUser.photoURL} sx={{width:"30", height:"30"}} />
            <Typography fontWeight={500} variant='span'>{currentUser.displayName}</Typography>
           </UserBox>
           <TextField
           sx={{width:"100%"}}
            id="standard-multiline-static"
            rows={3}
            placeholder='What is on your mind?'
            variant="standard"
          />
          <Stack direction="row" marginTop={2} mb={1} gap={1}>
            <EmojiEmotions color='primary' />
            <Image color='secondary' />
            <VideoCameraBack color='success' />
            <PersonAdd color='error' />
          </Stack>
          <ButtonGroup sx={{mt:"1rem"}} fullWidth variant="contained" aria-label="outlined primary button group">
          <Button>Post</Button>
          <Button sx={{width:"100px"}}><DateRange /></Button>
        </ButtonGroup>
        </Box>
      </StyledModal>
    </>
  )
}
