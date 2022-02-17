import { useState } from 'react'
import { useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Button, IconButton, TextField, Paper, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { RootState } from '../store/store'

interface Props {
  columnsOrder: string[]
}

export const ColumnForm = ({ columnsOrder }: Props) => {
  const firestore = useFirestore()
  const { uid } = useSelector((state: RootState) => state.firebase.auth)

  const [openForm, setOpenForm] = useState(false)
  const [presetColumnTitle, setPresetColumnTitle] = useState('')

  const handleChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPresetColumnTitle(value)
  }

  const addNewColumn = (columnTitle: string) => {
    if (columnTitle.trim().length > 0) {
      firestore
        .collection('users')
        .doc(uid)
        .collection('columns')
        .add({
          title: columnTitle,
          cardsIds: [],
        })
        .then((docRef) => {
          firestore
            .collection('users')
            .doc(uid)
            .update({ columnsOrder: [...columnsOrder, docRef.id] })
        })
      setPresetColumnTitle('')
      setOpenForm(false)
    }
  }

  return (
    <Paper
      sx={{
        width: 330,
        padding: '10px',
        marginRight: '10px',
        background: '#ebecf0',
      }}
    >
      {openForm ? (
        <Box component="form">
          <TextField
            variant="outlined"
            multiline={true}
            name="addColumn"
            value={presetColumnTitle}
            placeholder="Provide column title"
            onChange={handleChange}
            sx={{ backgroundColor: '#fff', width: '90%' }}
          />
          <Box
            sx={{
              marginTop: '10px',
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                addNewColumn(presetColumnTitle)
              }}
            >
              ADD COLUMN
            </Button>
            <IconButton size="small" onClick={() => setOpenForm(false)}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
          fullWidth={true}
        >
          ADD COLUMN
        </Button>
      )}
    </Paper>
  )
}
