import { ExtendedFirestoreInstance } from 'react-redux-firebase'

const initialColumns = [
  { title: 'To do', cardsIds: [] },
  { title: 'In progress', cardsIds: [] },
  { title: 'Done', cardsIds: [] },
]

export const createInitialData = async (
  firestore: ExtendedFirestoreInstance,
  uid: string | undefined
) => {
  const batch = firestore.batch()
  const userRef = firestore.collection('users').doc(uid)
  const columnsOrder = initialColumns.map(({ title, cardsIds }) => {
    const columnRef = userRef.collection('columns').doc()
    columnRef.set({
      title,
      cardsIds,
    })
    return columnRef.id
  })

  userRef.update({ columnsOrder: columnsOrder })

  await batch.commit()
}
