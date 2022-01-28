import { useState } from 'react'
import { useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Button, Card, IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { RootState } from '../store/store'

export const CardForm = (props: any) => {
  const firestore = useFirestore()
  const { uid } = useSelector((state: RootState) => state.firebase.auth)

  const [openForm, setOpenForm] = useState(false)
  const [presetCardText, setPresetCardText] = useState('')

  const handleChange = ({ currentTarget: { name, value } }: any) => {
    if (name === 'addCard') {
      setPresetCardText(value)
    }
  }

  const addNewCard = (cardText: string) => {
    firestore
      .collection('users')
      .doc(uid)
      .collection('cards')
      .add({
        text: cardText,
        column: props.columnID,
      })
      .then((docRef) => {
        docRef.update({
          cardID: docRef.id,
        })
      })
    setPresetCardText('')
    setOpenForm(false)
  }

  return (
    <>
      {openForm ? (
        <form>
          <Card sx={{ marginTop: '10px', padding: '10px' }}>
            <TextField
              variant="standard"
              multiline={true}
              name="addCard"
              value={presetCardText}
              placeholder="Provide card text"
              onChange={handleChange}
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
        </form>
      ) : (
        <Button
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
          fullWidth={true}
          style={{
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
