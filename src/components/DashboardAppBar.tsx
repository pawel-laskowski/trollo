import { useFirebase } from 'react-redux-firebase'
import { useNavigate } from 'react-router-dom'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

export const DashboardAppBar = () => {
  const firebase = useFirebase()
  const navigate = useNavigate()

  const logout = () => {
    firebase
      .logout()
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        console.log('Logout error', error)
      })
  }
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Trollo DashboardPage
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}
