import { useSelector } from 'react-redux'
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase'
import { Box } from '@mui/material'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
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
    collection: `users`,
    doc: uid,
    storeAs: 'userData',
  })
  const userData = useSelector(
    (state: RootState) => state.firestore.data.userData
  )
  const columnsOrder = userData ? userData.columnsOrder : []

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

  const onDragEnd = ({
    destination,
    source,
    draggableId,
    type,
  }: DropResult) => {
    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    const userRef = firestore.collection('users').doc(uid)
    const columnsRef = userRef.collection('columns')

    switch (type) {
      case 'cards':
        // Remove card from old column
        const sourceColumn = columns.find(
          (column) => column.id === source.droppableId
        )
        const sourceColumnCards = sourceColumn ? [...sourceColumn.cardsIds] : []
        sourceColumnCards.splice(source.index, 1)

        columnsRef.doc(source.droppableId).update({
          cardsIds: sourceColumnCards,
        })

        // Set position for card in new column
        if (destination.droppableId === source.droppableId) {
          const destinationColumnCards = sourceColumnCards
          destinationColumnCards.splice(destination.index, 0, draggableId)

          columnsRef.doc(destination.droppableId).update({
            cardsIds: destinationColumnCards,
          })
        } else {
          const destinationColumn = columns.find(
            (column) => column.id === destination.droppableId
          )

          const destinationColumnCards = destinationColumn
            ? [...destinationColumn.cardsIds]
            : []

          destinationColumnCards.splice(destination.index, 0, draggableId)

          columnsRef.doc(destination.droppableId).update({
            cardsIds: destinationColumnCards,
          })
        }
        break
      case 'columns':
        const newColumnsOrder = [...columnsOrder]
        newColumnsOrder.splice(source.index, 1)
        newColumnsOrder.splice(destination.index, 0, draggableId)
        userRef.update({ columnsOrder: newColumnsOrder })
        break
      default:
        break
    }
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
        <ColumnList
          columns={columns}
          cards={cards}
          columnsOrder={columnsOrder}
        />
        <ColumnForm columnsOrder={columnsOrder} />
      </Box>
    </DragDropContext>
  )
}
