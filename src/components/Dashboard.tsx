import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { Card, Column, RootState } from '../store/store'
import { Header } from './Header'
import { ColumnList } from './ColumnList'
import { ColumnForm } from './ColumnForm'

export const Dashboard = () => {
  const { uid } = useSelector((state: RootState) => state.firebase.auth)
  useFirestoreConnect({
    collection: `users/${uid}/columns`,
    storeAs: 'columns',
  })
  const columns: Column[] = useSelector(
    (state: RootState) => state.firestore.data.columns
  )
  const columnsArray = columns ? Object.values(columns) : []

  useFirestoreConnect({
    collection: `users/${uid}/cards`,
    storeAs: 'cards',
  })
  const cards: Card[] = useSelector(
    (state: RootState) => state.firestore.data.cards
  )
  const cardsArray = cards ? Object.values(cards) : []

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
        <ColumnList columns={columnsArray} cards={cardsArray} />
        <ColumnForm />
      </div>
    </>
  )
}
