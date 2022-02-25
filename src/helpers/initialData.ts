import { ExtendedFirestoreInstance } from 'react-redux-firebase'

const initialColumns = [
  { title: 'To do', cardsIds: [] },
  { title: 'In progress', cardsIds: [] },
  { title: 'Done', cardsIds: [] },
]

export const createInitialData = (
  firestore: ExtendedFirestoreInstance,
  uid: string | undefined
) => {
  const userRef = firestore.collection('users').doc(uid)
  const columnsOrder: string[] = []
  initialColumns.forEach(async ({ title, cardsIds }) => {
    const columnRef = await userRef.collection('columns').add({
      title,
      cardsIds,
    })
    columnsOrder.push(columnRef.id)
    userRef.update({ columnsOrder: columnsOrder })
  })
}
