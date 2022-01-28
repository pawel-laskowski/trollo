import { ColumnItem } from './ColumnItem'

export const ColumnList = (props: any) => {
  return (
    <>
      {props.columns &&
        props.columns.map((column: any) => (
          <ColumnItem
            cards={props.cards}
            title={column.title}
            columnID={column.columnID}
            key={column.columnID}
          />
        ))}
    </>
  )
}
