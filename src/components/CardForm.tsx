import { useState } from 'react'
import { useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Button, Card, IconButton, TextField, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { RootState } from '../store/store'

export const CardForm = (props: { columnID: string }) => {
  const firestore = useFirestore()
  const { uid } = useSelector((state: RootState) => state.firebase.auth)

  const [openForm, setOpenForm] = useState(false)
  const [presetCardText, setPresetCardText] = useState('')

  const handleChange = ({
    currentTarget: { name, value },
  }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (name === 'addCard') {
      setPresetCardText(value)
    }
  }

  const addNewCard = (cardText: string) => {
    if (cardText.trim().length > 0) {
      firestore.collection('users').doc(uid).collection('cards').add({
        text: cardText,
        columnID: props.columnID,
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
              onClick={(event) => {
                event.preventDefault()
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
