import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { Box } from '@mui/material'
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
  const columnsData = useSelector(
    (state: RootState) => state.firestore.data.columns
  )

  const columns = Object.entries(columnsData ?? [])
    .filter(([, column]) => column)
    .map(([id, column]) => ({
      id,
      ...column,
    }))

  useFirestoreConnect({
    collection: `users/${uid}/cards`,
    storeAs: 'cards',
  })
  const cardsData = useSelector(
    (state: RootState) => state.firestore.data.cards
  )
  const cards = Object.entries(cardsData ?? [])
    .filter(([, card]) => card)
    .map(([id, card]) => ({
      id,
      ...card,
    }))

  return (
    <>
      <Header />
      <h1>Dashboard</h1>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
      >
        <ColumnList columns={columns} cards={cards} />
        <ColumnForm />
      </Box>
    </>
  )
}
