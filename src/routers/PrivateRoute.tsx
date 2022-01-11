import { Navigate } from 'react-router-dom'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export const PrivateRoute = ({ children }: any) => {
  const auth = useSelector((state: RootState) => state.firebase.auth)
  return isLoaded(auth) && !isEmpty(auth) ? children : <Navigate to="/" />
}
