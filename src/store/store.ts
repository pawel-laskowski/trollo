import { createStore } from 'redux'
import { rootReducer } from './reducers'
import { configureStore } from '@reduxjs/toolkit'
import {
  actionTypes,
  firebaseReducer,
  FirebaseReducer,
} from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

export const storeConfig = configureStore({
  reducer: {
    firebaseReducer,
    firestoreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [actionTypes.LOGIN, actionTypes.AUTH_LINK_ERROR],
      },
    }),
})
export interface RootState {
  firebase: FirebaseReducer.Reducer
}

const initialState = {}
export const store = createStore(rootReducer, initialState)
