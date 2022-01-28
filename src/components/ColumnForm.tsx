import { useState } from 'react'
import { useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Button, IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { RootState } from '../store/store'

export const ColumnForm = () => {
  const firestore = useFirestore()
  const { uid } = useSelector((state: RootState) => state.firebase.auth)

  const [openForm, setOpenForm] = useState(false)
  const [presetColumnTitle, setPresetColumnTitle] = useState('')

  const handleChange = ({ currentTarget: { name, value } }: any) => {
    if (name === 'addColumn') {
      setPresetColumnTitle(value)
    }
  }

  const addNewColumn = (columnTitle: string) => {
    firestore
      .collection('users')
      .doc(uid)
      .collection('columns')
      .add({
        title: columnTitle,
      })
      .then((docRef) => {
        docRef.update({
          columnID: docRef.id,
        })
      })
    setPresetColumnTitle('')
    setOpenForm(false)
  }

  return (
    <>
      {openForm ? (
        <form>
          <TextField
            variant="outlined"
            multiline={true}
            name="addColumn"
            value={presetColumnTitle}
            placeholder="Provide column title"
            onChange={handleChange}
          />
          <Button
            variant="contained"
            onClick={(event) => {
              event.preventDefault()
              addNewColumn(presetColumnTitle)
            }}
          >
            ADD COLUMN
          </Button>
          <IconButton size="small" onClick={() => setOpenForm(false)}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </form>
      ) : (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
        >
          ADD COLUMN
        </Button>
      )}
    </>
  )
}
