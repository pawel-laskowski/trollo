import { useState } from 'react'
import { useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Card, IconButton, TextField, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { RootState } from '../store/store'

export const CardItem = (props: any) => {
  const firestore = useFirestore()
  const { uid } = useSelector((state: RootState) => state.firebase.auth)

  const [editMode, setEditMode] = useState(false)
  const [presetCardText, setPresetCardText] = useState(props.text)

  const handleChange = ({ currentTarget: { name, value } }: any) => {
    if (name === 'editCard') {
      setPresetCardText(value)
    }
  }
  const editCard = (cardText: string) => {
    firestore
      .collection('users')
      .doc(uid)
      .collection('cards')
      .doc(props.cardID)
      .update({ text: cardText })
    setEditMode(false)
  }

  const deleteCard = () => {
    firestore
      .collection('users')
      .doc(uid)
      .collection('cards')
      .doc(props.cardID)
      .delete()
  }

  return (
    <>
      <Card
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',
          marginTop: '10px',
        }}
      >
        {editMode ? (
          <form>
            <TextField
              value={presetCardText}
              variant="standard"
              name="editCard"
              multiline={true}
              onChange={handleChange}
            />
            <IconButton
              onClick={(event) => {
                event.preventDefault()
                editCard(presetCardText)
              }}
              size="small"
            >
              <CheckIcon fontSize="inherit" />
            </IconButton>
          </form>
        ) : (
          <>
            <Typography variant="subtitle1">{props.text}</Typography>
            <div>
              <IconButton onClick={() => setEditMode(true)} size="small">
                <EditIcon fontSize="inherit" />
              </IconButton>
              <IconButton onClick={deleteCard} size="small">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </div>
          </>
        )}
      </Card>
    </>
  )
}
