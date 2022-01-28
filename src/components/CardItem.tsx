import { Card, IconButton, TextField } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export const CardItem = (props: any) => {
  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      <TextField
        defaultValue={props.text}
        variant="standard"
        multiline={true}
      />
      <IconButton onClick={console.log} size="small">
        <CheckIcon fontSize="inherit" />
      </IconButton>
      <IconButton onClick={console.log} size="small">
        <EditIcon fontSize="inherit" />
      </IconButton>
      <IconButton onClick={console.log} size="small">
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </Card>
  )
}
