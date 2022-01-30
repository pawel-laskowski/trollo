import { createStore } from 'redux'
import { rootReducer } from './reducers'
import { configureStore } from '@reduxjs/toolkit'
import {
  actionTypes,
  firebaseReducer,
  FirebaseReducer,
  FirestoreReducer,
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

export interface Card {
  cardID: string
  column: string
  text: string
}

export interface Column {
  columnID: string
  title: string
}

export interface DBSchema {
  cards: Card[]
  columns: Column[]
}

export interface RootState {
  firebase: FirebaseReducer.Reducer<any, DBSchema>
  firestore: FirestoreReducer.Reducer
}

const initialState = {}
export const store = createStore(rootReducer, initialState)
