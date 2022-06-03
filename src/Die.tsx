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
  const [rolling, setRolling] = React.useState(false)
  const {value, onRoll, canRoll} = props
  const [rollingValue, setRollingValue] = React.useState<number>(0)
  const ROLL_DURATION = 1500
  const ROLL_SPEED = 100
  const ref = React.useRef<number>(rollingValue)

  // XXX: sloppy effects
  const handleClick = () => {
    if (canRoll || !rolling) {
      setRolling(true)
      setRollingValue(rand(1, 6))
      const rollingInterval = setInterval(() => {
        setRollingValue(rand(1, 6))
      }, ROLL_SPEED)
      setTimeout(() => {
        clearInterval(rollingInterval)
        setRolling(false)
        onRoll(ref.current)
      }, ROLL_DURATION)
    }
  }

  React.useEffect(() => {
    ref.current = rollingValue
  }, [rollingValue])

  return (
    <div className="Die" onClick={handleClick}>
      {rolling && <span>{rollingValue}</span>}
      {!rolling && value}
    </div>
  )
}

export default Die
