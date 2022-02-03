import { Box } from '@mui/material'
import { Droppable } from 'react-beautiful-dnd'
import { WithID } from '../helpers/types'
import { Card } from '../store/store'
import { CardItem } from './CardItem'

interface Props {
  cards: WithID<Card>[]
  droppableId: string
}

export const CardList = ({ cards, droppableId }: Props) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <Box ref={provided.innerRef} {...provided.droppableProps}>
          {cards.map(({ text, id }, index) => (
            <CardItem text={text} key={id} id={id} index={index} />
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  )
}
