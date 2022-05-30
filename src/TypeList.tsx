import React, {ChangeEvent} from 'react'


const parseLines = (value: string): string[] => {
    return value.split('\n')
      .map(x => x.trim())
      .filter(x => x)
      .filter((x, i, all) => all.indexOf(x) === i)
}

type TypeListProps = {
  onChange: (values: string[]) => void,
  types: string[],
}

const TypeList: React.FunctionComponent<TypeListProps> = ({
  onChange,
  types,
}: TypeListProps) => {

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const values = parseLines(event.target.value)
    onChange(values)
  }

  return (
    <div className="TypeList">
      <textarea
        onChange={handleTextAreaChange}
        defaultValue={types.join('\n')}
        cols={30}
        rows={12}
      />
    </div>
  )
}

export default TypeList
