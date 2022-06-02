import React, {ChangeEvent} from 'react'
import {Action, Actions, CardType} from './types'
import {parseCardTypesText} from './util'



type TypeListProps = {
  types: CardType[],
  dispatch: React.Dispatch<Action>,
}

const typeToString = (value: CardType): string => {
  return `${value.name} ${value.color || ''}`.trim()
}

const TypeList: React.FunctionComponent<TypeListProps> = ({
  dispatch,
  types,
}: TypeListProps) => {

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newTypes = parseCardTypesText(event.target.value)
    dispatch({
      type: Actions.changeTypes,
      value: newTypes,
    })
  }

  return (
    <div className="TypeList">
      <textarea
        onChange={handleTextAreaChange}
        defaultValue={types.map(typeToString).join('\n')}
        cols={30}
        rows={12}
      />
    </div>
  )
}

export default TypeList
