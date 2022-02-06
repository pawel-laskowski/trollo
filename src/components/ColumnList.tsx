import { WithID } from '../helpers/types'
import { Card, Column } from '../store/store'
import { ColumnItem } from './ColumnItem'

interface Props {
  cards: WithID<Card>[]
  columns: WithID<Column>[]
}

export const ColumnList = ({ cards, columns }: Props) => {
  const filterCards = (columnCardsIds: string[], allCards: WithID<Card>[]) => {
    const filteredCards = columnCardsIds.map((cardId) => {
      const [value] = allCards.filter((card) => cardId === card.id)
      return value
    })
    return filteredCards
  }

  return (
    <>
      {columns.map(({ title, id, cardsIds }) => {
        const columnCards = filterCards(cardsIds, cards)
        return (
          <ColumnItem
            cards={columnCards}
            title={title}
            id={id}
            cardsIds={cardsIds}
            key={id}
          />
        )
      })}
    </>
  )
}
