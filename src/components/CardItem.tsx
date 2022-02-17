import { useState } from 'react'
import { useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Card, IconButton, TextField, Typography, Box } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Draggable } from 'react-beautiful-dnd'
import { RootState } from '../store/store'

interface Props {
  text: string
  id: string
  index: number
}

export const CardItem = ({ id, text, index }: Props) => {
  const firestore = useFirestore()
  const { uid } = useSelector((state: RootState) => state.firebase.auth)

  const [editMode, setEditMode] = useState(false)
  const [presetCardText, setPresetCardText] = useState(text)

  const handleChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPresetCardText(value)
  }
  const editCard = (newText: string) => {
    firestore
      .collection('users')
      .doc(uid)
      .collection('cards')
      .doc(id)
      .update({ text: newText })
    setEditMode(false)
  }

  const deleteCard = () => {
    firestore.collection('users').doc(uid).collection('cards').doc(id).delete()
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Box ref={provided.innerRef} {...provided.draggableProps}>
          <Card
            sx={{
              padding: '10px',
              marginTop: '10px',
            }}
          >
            {editMode ? (
              <Box
                component="form"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <TextField
                  value={presetCardText}
                  variant="standard"
                  name="editCard"
                  multiline={true}
                  onChange={handleChange}
                  sx={{ width: '80%' }}
                />
                <IconButton
                  onClick={() => {
                    editCard(presetCardText)
                  }}
                  size="small"
                >
                  <CheckIcon fontSize="inherit" />
                </IconButton>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ width: '80%' }}
                  {...provided.dragHandleProps}
                >
                  {text}
                </Typography>
                <Box>
                  <IconButton onClick={() => setEditMode(true)} size="small">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton onClick={deleteCard} size="small">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Card>
        </Box>
      )}
    </Draggable>
  )
}
