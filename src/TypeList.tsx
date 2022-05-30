import React, {ChangeEvent} from 'react'


const parseLines = (value: string): string[] => {
    return value.split('\n')
      .map(x => x.trim())
      .filter(x => x)
      .filter((x, i, all) => all.indexOf(x) === i)
}

type TypeListProps = {
  onChange: (values: string[]) => void,
}

const TypeList: React.FunctionComponent<TypeListProps> = ({
  onChange,
}: TypeListProps) => {

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const values = parseLines(event.target.value)
    onChange(values)
  }

  return (
    <div className="TypeList">
      <textarea
        onChange={handleTextAreaChange}
      />
    </div>
  )
}

export default TypeList
