import React from 'react'
import LinearStepper from './LinearStepper.jsx'
import {CssBaseline, Container, Paper, Box} from "@mui/material"

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
           <LinearStepper />
        </Paper>
    </Container>
    </>
  )
}

export default App