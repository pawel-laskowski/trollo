import { useState } from 'react'
import { useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import {
  Paper,
  IconButton,
  TextField,
  Typography,
  Divider,
  Box,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { CardList } from './CardList'
import { CardForm } from './CardForm'
import { WithID } from '../helpers/types'
import { Card, RootState } from '../store/store'

interface Props {
  cards: WithID<Card>[]
  title: string
  id: string
}

export const ColumnItem = (props: Props) => {
  const firestore = useFirestore()
  const { uid } = useSelector((state: RootState) => state.firebase.auth)

  const columnCards = props.cards.filter((card) => card.columnID === props.id)

  const [editMode, setEditMode] = useState(false)
  const [presetColumnTitle, setPresetColumnTitle] = useState(props.title)

  const handleChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPresetColumnTitle(value)
  }

  const editColumn = (columnTitle: string) => {
    firestore
      .collection('users')
      .doc(uid)
      .collection('columns')
      .doc(props.id)
      .update({ title: columnTitle })

    setEditMode(false)
  }

  const deleteColumn = () => {
    firestore
      .collection('users')
      .doc(uid)
      .collection('columns')
      .doc(props.id)
      .delete()
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
      {editMode ? (
        <Box
          component="form"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <TextField
            value={presetColumnTitle}
            variant="standard"
            name="editColumn"
            multiline={true}
            onChange={handleChange}
            sx={{ backgroundColor: '#fff', width: '80%' }}
          />
          <Box>
            <IconButton
              onClick={(event) => {
                event.preventDefault()
                editColumn(presetColumnTitle)
              }}
              size="small"
            >
              <CheckIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ width: '80%' }}>
            {props.title}
          </Typography>
          <Box>
            <IconButton onClick={() => setEditMode(true)} size="small">
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton onClick={deleteColumn} size="small">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
      )}
      <Divider variant="middle" style={{ margin: '10px' }} />
      <CardList cards={columnCards} />
      <CardForm columnID={props.id} />
    </Paper>
  )
}
