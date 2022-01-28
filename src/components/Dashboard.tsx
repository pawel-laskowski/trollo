import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { RootState } from '../store/store'
import { Header } from './Header'
import { CircularProgress } from '@mui/material'
import { ColumnList } from './ColumnList'
import { ColumnForm } from './ColumnForm'

// const columns = [{ title: 'first' }, { title: 'second' }]

export const Dashboard = () => {
  const { uid } = useSelector((state: RootState) => state.firebase.auth)
  useFirestoreConnect({
    collection: `users/${uid}/columns`,
    storeAs: 'columns',
  })
  const columns = useSelector(
    (state: RootState) => state.firestore.data.columns
  )
  const newColumns = columns ? Object.values(columns) : []

  useFirestoreConnect({
    collection: `users/${uid}/cards`,
    storeAs: 'cards',
  })
  const cards = useSelector((state: RootState) => state.firestore.data.cards)
  const newCards = cards ? Object.values(cards) : []

  return (
    <>
      <Header />
      <h1>Dashboard</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
      >
        <ColumnList columns={newColumns} cards={newCards} />
        <ColumnForm />
      </div>
    </>
  )
}
