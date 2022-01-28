import { useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Check'
import { RootState } from '../store/store'

export const ColumnForm = () => {
  const firestore = useFirestore()
  const { uid } = useSelector((state: RootState) => state.firebase.auth)

  const addNewColumn = () => {
    firestore
      .collection('users')
      .doc(uid)
      .collection('columns')
      .add({
        title: 'column title',
      })
      .then((docRef) => {
        docRef.update({
          columnID: docRef.id,
        })
      })
  }

  return (
    <Button variant="outlined" startIcon={<AddIcon />} onClick={addNewColumn}>
      ADD COLUMN
    </Button>
  )
}
