import { useSelector } from 'react-redux'
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase'
import { Box } from '@mui/material'
import { DragDropContext } from 'react-beautiful-dnd'
import { RootState } from '../store/store'
import { Header } from './Header'
import { ColumnList } from './ColumnList'
import { ColumnForm } from './ColumnForm'

export const Dashboard = () => {
  const firestore = useFirestore()
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

  const onDragEnd = ({ destination, source, draggableId }: any) => {
    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    firestore
      .collection('users')
      .doc(uid)
      .collection('cards')
      .doc(draggableId)
      .update({
        columnID: destination.droppableId,
      })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
    </DragDropContext>
  )
}
