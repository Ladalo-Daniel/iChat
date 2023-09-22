import React, { useState } from 'react'
import Header from '../component/Header'
import Rightbar from '../component/Rightbar'
import Feeds from '../component/Feeds'
import Leftbar from '../component/Leftbar'
import { Box, Stack, createTheme } from '@mui/material'
import Add from '../component/Add'
import { ThemeProvider } from '@emotion/react'

export default function HomePage() {
  const [mode, setMode] =useState("light")
  const darkTheme = createTheme({
    palette:{
      mode:mode,
    }
  })
  return (
    <ThemeProvider theme={darkTheme}> 
      <Box bgcolor={"background.default"} color={"text.primary"}>
          <Header />
          <Stack direction="row" spacing={2} justifyContent="space-between" marginTop={1} >
            <Leftbar setMode={setMode} mode={mode} />
            <Feeds />
            <Rightbar />
          </Stack>
          <Add />
      </Box>
    </ThemeProvider>
  )
}
