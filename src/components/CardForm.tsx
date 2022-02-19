import { useState } from 'react'
import { useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Button, Card, IconButton, TextField, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { RootState } from '../store/store'

interface Props {
  columnId: string
  cardsIds: string[]
}

export const CardForm = ({ columnId, cardsIds }: Props) => {
  const firestore = useFirestore()
  const { uid } = useSelector((state: RootState) => state.firebase.auth)

  const [openForm, setOpenForm] = useState(false)
  const [presetCardText, setPresetCardText] = useState('')

  const handleChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPresetCardText(value)
  }

  const addNewCard = async (text: string) => {
    if (text.trim().length > 0) {
      const userRef = firestore.collection('users').doc(uid)
      const cardRef = await userRef.collection('cards').add({
        text,
      })
      const columnRef = userRef.collection('columns').doc(columnId)
      columnRef.update({
        cardsIds: [...cardsIds, cardRef.id],
      })

      setPresetCardText('')
      setOpenForm(false)
    }
  }

  return (
    <>
      {openForm ? (
        <Box component="form">
          <Card sx={{ marginTop: '10px', padding: '10px' }}>
            <TextField
              variant="standard"
              multiline={true}
              name="addCard"
              value={presetCardText}
              placeholder="Provide card text"
              onChange={handleChange}
              sx={{ width: '80%' }}
            />
            <IconButton
              size="small"
              onClick={() => {
                addNewCard(presetCardText)
              }}
            >
              <CheckIcon fontSize="inherit" />
            </IconButton>
            <IconButton size="small" onClick={() => setOpenForm(false)}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Card>
        </Box>
      ) : (
        <Button
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
          fullWidth={true}
          sx={{
            color: 'black',
            marginTop: '10px',
          }}
        >
          ADD CARD
        </Button>
      )}
    </>
  )
}
