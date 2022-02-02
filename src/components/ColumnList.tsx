import { WithID } from '../helpers/types'
import { Card, Column } from '../store/store'
import { ColumnItem } from './ColumnItem'

interface Props {
  cards: WithID<Card>[]
  columns: WithID<Column>[]
}

export const ColumnList = ({ cards, columns }: Props) => {
  return (
    <>
      {columns.map(({ title, id }) => (
        <ColumnItem cards={cards} title={title} id={id} key={id} />
      ))}
    </>
  )
}
