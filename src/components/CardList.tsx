import { WithID } from '../helpers/types'
import { Card } from '../store/store'
import { CardItem } from './CardItem'

interface Props {
  cards: WithID<Card>[]
}

export const CardList = ({ cards }: Props) => {
  return (
    <>
      {cards.map(({ text, id }) => (
        <CardItem text={text} key={id} cardID={id} />
      ))}
    </>
  )
}
