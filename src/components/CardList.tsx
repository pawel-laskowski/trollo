import { CardItem } from './CardItem'

export const CardList = (props: any) => {
  return (
    <>
      {props.cards &&
        props.cards.map((card: any) => (
          <CardItem text={card.text} key={card.cardID} />
        ))}
    </>
  )
}
