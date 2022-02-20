import { Box } from '@mui/material'
import { Droppable } from 'react-beautiful-dnd'
import { WithID } from '../helpers/types'
import { Card, Column } from '../store/store'
import { ColumnItem } from './ColumnItem'

interface Props {
  cards: WithID<Card>[]
  columns: WithID<Column>[]
  columnsOrder: string[]
}

export const ColumnList = ({ cards, columns, columnsOrder }: Props) => {
  const filterCards = (columnCardsIds: string[], allCards: WithID<Card>[]) => {
    const filteredCards = columnCardsIds.map((cardId) => {
      const value = allCards
        .filter((card): card is WithID<Card> => !!card)
        .find((card) => cardId === card.id)
      if (!value) {
        throw new Error('Card not found')
      }
      return value
    })
    return filteredCards
  }

  return (
    <Droppable droppableId="all-columns" direction="horizontal" type="columns">
      {(provided) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {columnsOrder
            .map((columnId) => columns.find((column) => column.id === columnId))
            .filter((column): column is WithID<Column> => !!column)
            .map(({ title, id, cardsIds }, index) => {
              const columnCards = filterCards(cardsIds, cards)
              return (
                <ColumnItem
                  cards={columnCards}
                  title={title}
                  id={id}
                  cardsIds={cardsIds}
                  index={index}
                  key={id}
                />
              )
            })}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  )
}
