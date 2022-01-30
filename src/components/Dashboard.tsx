import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { RootState } from '../store/store'
import { Header } from './Header'
import { ColumnList } from './ColumnList'
import { ColumnForm } from './ColumnForm'

export const Dashboard = () => {
  const { uid } = useSelector((state: RootState) => state.firebase.auth)
  useFirestoreConnect({
    collection: `users/${uid}/columns`,
    storeAs: 'columns',
  })
  const columns = useSelector(
    (state: RootState) => state.firestore.data.columns
  )
  const columnsArray = Object.entries(columns ?? []).map(([id, column]) => ({
    id,
    ...column,
  }))

  useFirestoreConnect({
    collection: `users/${uid}/cards`,
    storeAs: 'cards',
  })
  const cards = useSelector((state: RootState) => state.firestore.data.cards)
  const cardsArray = Object.entries(cards ?? []).map(([id, card]) => ({
    id,
    ...card,
  }))

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
