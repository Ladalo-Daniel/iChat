import { Favorite, FavoriteBorder, MoreVert, Share } from '@mui/icons-material'
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Posts() {
  const {currentUser} = useContext(AuthContext)
  return (
    <Box>
        <Card sx={{marginBottom:"1rem"}}>
      <CardHeader
        avatar={
          <Avatar src={currentUser.photoURL} sx={{ bgcolor:"red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton  aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={currentUser.displayName}
        subheader="Aug, 2023"
      />
      <CardMedia
        component="img"
        height="350px"
        image={currentUser.photoURL}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:"red"}} />} />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions> 
    </Card>
    </Box>
  )
}
