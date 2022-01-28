import { Paper } from '@mui/material'
import { CardList } from './CardList'
import { CardForm } from './CardForm'

export const ColumnItem = (props: any) => {
  //filters cards from props that match columnID
  const columnCards: any = props.cards.filter(
    (card: any) => card.column === props.columnID
  )

  return (
    <Paper sx={{ maxWidth: 330 }}>
      <h1>{props.title}</h1>
      <CardList cards={columnCards} />
      <CardForm columnID={props.columnID} />
    </Paper>
  )
}
