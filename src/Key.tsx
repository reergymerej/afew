import React from 'react'
import {CardType} from './types'

type KeyProps = {
  cardTypes: CardType[],
}

const Key: React.FunctionComponent<KeyProps> = (props: KeyProps) => {
  const typesCopy = [
    ...props.cardTypes,
    props.cardTypes[0],
  ]
  return (
    <div>
      <div className="Key">
        { typesCopy.map((cardType, i, all) => {
          return (
            <div className="KeyItem" key={cardType + i}>
              {cardType} {i < all.length - 1 && '>'}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Key
