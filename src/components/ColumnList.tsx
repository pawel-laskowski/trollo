import { Column, DBSchema } from '../store/store'
import { ColumnItem } from './ColumnItem'

export const ColumnList = (props: DBSchema) => {
  return (
    <>
      {props.columns.map((column: Column) => (
        <>
          {column && (
            <ColumnItem
              cards={props.cards}
              title={column.title}
              columnID={column.columnID}
              key={column.columnID}
            />
          )}
        </>
      ))}
    </>
  )
}
