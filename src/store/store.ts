import { createStore } from 'redux'
import { rootReducer } from './reducers'
import { configureStore } from '@reduxjs/toolkit'
import {
  actionTypes,
  firebaseReducer,
  FirebaseReducer,
  FirestoreReducer as FirestoreReducerCore,
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
  columnID: string
  text: string
}

export interface Column {
  title: string
}

export interface DBSchema {
  cards: Record<string, Card> | undefined
  columns: Record<string, Column> | undefined
}

interface FirestoreReducer extends FirestoreReducerCore.Reducer {
  data: DBSchema
}

export interface RootState {
  firebase: FirebaseReducer.Reducer
  firestore: FirestoreReducer
}

const initialState = {}
export const store = createStore(rootReducer, initialState)
