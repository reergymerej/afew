import React from 'react'

const rand = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export type DieProps = {
  value: number,
  onRoll: (value: number) => void,
  canRoll: boolean,
}

const Die: React.FunctionComponent<DieProps> = (props: DieProps) => {
  const { value, onRoll, canRoll} = props
  const handleClick = () => {
    if (canRoll) {
      const newValue = rand(1, 6)
      onRoll(newValue)
    }
  }
  return (
    <div className="Die" onClick={handleClick}>{value}</div>
  )
}

export default Die
