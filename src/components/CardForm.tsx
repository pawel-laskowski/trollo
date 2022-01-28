import { useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Check'
import { RootState } from '../store/store'

export const CardForm = (props: any) => {
  const firestore = useFirestore()
  const { uid } = useSelector((state: RootState) => state.firebase.auth)

  const addNewCard = () => {
    firestore
      .collection('users')
      .doc(uid)
      .collection('cards')
      .add({
        text: 'card text',
        column: props.columnID,
      })
      .then((docRef) => {
        docRef.update({
          cardID: docRef.id,
        })
      })
  }

  return (
    <Button variant="outlined" startIcon={<AddIcon />} onClick={addNewCard}>
      ADD CARD
    </Button>
  )
}
