import { Card, WithID } from '../store/store'
import { CardItem } from './CardItem'

interface Props {
  cards: WithID<Card>[]
}

export const CardList = ({ cards }: Props) => {
  return (
    <>
      {cards.map(
        (card) =>
          card && <CardItem text={card.text} key={card.id} cardID={card.id} />
      )}
    </>
  )
}
