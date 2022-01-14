import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { CircularProgress } from '@mui/material'

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const auth = useSelector((state: RootState) => state.firebase.auth)

  if (!isLoaded(auth)) {
    return <CircularProgress />
  }

  return isLoaded(auth) && !isEmpty(auth) ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  )
}
