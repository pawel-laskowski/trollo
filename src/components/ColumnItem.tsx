import { useState } from 'react'
import { useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import {
  Paper,
  IconButton,
  TextField,
  Typography,
  Divider,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { CardList } from './CardList'
import { CardForm } from './CardForm'
import { RootState } from '../store/store'

export const ColumnItem = (props: any) => {
  const firestore = useFirestore()
  const { uid } = useSelector((state: RootState) => state.firebase.auth)

  const columnCards: any = props.cards.filter(
    (card: any) => card.column === props.columnID
  )

  const [editMode, setEditMode] = useState(false)
  const [presetColumnTitle, setPresetColumnTitle] = useState(props.title)

  const handleChange = ({ currentTarget: { name, value } }: any) => {
    if (name === 'editColumn') {
      setPresetColumnTitle(value)
    }
  }

  const editColumn = (columnTitle: string) => {
    firestore
      .collection('users')
      .doc(uid)
      .collection('columns')
      .doc(props.columnID)
      .update({ title: columnTitle })
    console.log(props.columnID)

    setEditMode(false)
  }

  const deleteColumn = () => {
    firestore
      .collection('users')
      .doc(uid)
      .collection('columns')
      .doc(props.columnID)
      .delete()
  }

  return (
    <Paper
      sx={{ width: 330, padding: 2, margin: '2px', background: '#ebecf0' }}
    >
      {editMode ? (
        <form style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            value={presetColumnTitle}
            variant="standard"
            name="editColumn"
            multiline={true}
            onChange={handleChange}
            sx={{ backgroundColor: '#fff' }}
          />
          <div>
            <IconButton
              onClick={(event) => {
                event.preventDefault()
                editColumn(presetColumnTitle)
              }}
              size="small"
            >
              <CheckIcon fontSize="inherit" />
            </IconButton>
          </div>
        </form>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">{props.title}</Typography>
          <div>
            <IconButton onClick={() => setEditMode(true)} size="small">
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton onClick={deleteColumn} size="small">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
      )}
      <Divider variant="middle" style={{ margin: '10px' }} />
      <CardList cards={columnCards} />
      <CardForm columnID={props.columnID} />
    </Paper>
  )
}
