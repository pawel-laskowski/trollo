import { Card, Column, WithID } from '../store/store'
import { ColumnItem } from './ColumnItem'

interface Props {
  cards: WithID<Card>[]
  columns: WithID<Column>[]
}

export const ColumnList = ({ cards, columns }: Props) => {
  return (
    <>
      {columns.map(
        (column) =>
          column && (
            <ColumnItem
              cards={cards}
              title={column.title}
              id={column.id}
              key={column.id}
            />
          )
      )}
    </>
  )
}
