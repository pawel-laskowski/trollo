import React from 'react'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppBar, Button, Toolbar, Typography, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { RootState } from '../store/store'

export const Header = () => {
  const firebase = useFirebase()
  const navigate = useNavigate()
  const auth = useSelector((state: RootState) => state.firebase.auth)
  const [openAlert, setOpenAlert] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenAlert(false)
  }

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: 'google',
        type: 'popup',
      })
      .then(() => {
        navigate('/dashboard')
      })
      .catch(() => {
        setErrorMessage('Login error! Please try again.')
        setOpenAlert(true)
      })
  }

  const logout = () => {
    firebase
      .logout()
      .then(() => {
        navigate('/')
      })
      .catch(() => {
        setErrorMessage('Logout error! Please try again.')
        setOpenAlert(true)
      })
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Trollo
          </Typography>
          {isLoaded(auth) && !isEmpty(auth) ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={signInWithGoogle}>
              Login
            </Button>
          )}
        </Toolbar>
        <Snackbar
          open={openAlert}
          autoHideDuration={4000}
          onClose={handleCloseAlert}
        >
          <MuiAlert
            onClose={handleCloseAlert}
            severity="error"
            elevation={6}
            variant="filled"
          >
            {errorMessage}
          </MuiAlert>
        </Snackbar>
      </AppBar>
    </>
  )
}
