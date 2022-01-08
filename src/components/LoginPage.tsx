import { useFirebase } from 'react-redux-firebase'
import { useNavigate } from 'react-router-dom'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

export const LoginPage = () => {
  const firebase = useFirebase()
  const navigate = useNavigate()

  // const signInWithGoogle = () => {
  //   const googleAuthProvider = new GoogleAuthProvider()
  //   googleAuthProvider.setCustomParameters({
  //     prompt: 'select_account',
  //   })
  //   const auth = getAuth()
  //   signInWithPopup(auth, googleAuthProvider).then(() => {
  //     navigate('/dashboard')
  //   })
  // }
  const signInWithGoogle = () => {
    firebase
      .login({
        provider: 'google',
        type: 'popup',
      })
      .then(() => {
        navigate('/dashboard')
      })
  }
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Trollo LoginPage
          </Typography>
          <Button
            color="inherit"
            onClick={(event) => {
              event.preventDefault()
              signInWithGoogle()
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
