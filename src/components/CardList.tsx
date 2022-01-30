import { Card } from '../store/store'
import { CardItem } from './CardItem'

export const CardList = (props: { cards: Card[] }) => {
  return (
    <>
      {props.cards.map((card: Card) => (
        <>
          {card && (
            <CardItem text={card.text} key={card.cardID} cardID={card.cardID} />
          )}
        </>
      ))}
    </>
  )
}
