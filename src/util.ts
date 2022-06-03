import {AttackDetails, CardType, Player} from "./types";

type Style = {
  background?: string,
  boxShadow?: string,
}

export const getStyleForCardType = (cardType: CardType): Style => {
  const { color } = cardType
  return {
    // background: color,
    boxShadow: color && `0px 0px 9px 5px ${color}`,
  }
}

const parseLines = (value: string): string[] => {
    return value.split('\n')
      .map(x => x.trim())
      .filter(x => x)
      .filter((x, i, all) => all.indexOf(x) === i)
}

export const parseCardTypesText = (text: string): CardType[] => {
  const lines = parseLines(text)
  const newTypes = lines.map((line): CardType => {
    const parts = line.split(/\s+/)
    return {
      name: parts[0],
      color: parts[1] || undefined,
    }
  })
  return newTypes
}

const getDistance = (a: number, b: number, mod: number): number => {
  // Return modulo distance, steps from a to b.
  if (b < a) {
    return mod - a + b
  }
  return b - a
}

const getAdvantageModifier = (a: CardType, opponent: CardType, cardTypes: CardType[]): number => {
  if (a === opponent) {
    return 0
  }
  const aIndex = cardTypes.indexOf(a)
  const opponentIndex = cardTypes.indexOf(opponent)
  const stepsToOpponent = getDistance(aIndex, opponentIndex, cardTypes.length)
  const HIGH = 1
  const LOW = -1.4
  const span = Math.abs(HIGH - LOW)
  const steps = cardTypes.length - 1
  const interval = span / (steps - 1)
  const advantage = HIGH - (interval * (stepsToOpponent - 1))
  return advantage
}

const getModifier = (
  player: Player,
  opponent: Player | null,
  types: CardType[],
) => {
    const modifier = !opponent ? null : getAdvantageModifier(
      player.cardType,
      opponent.cardType,
      types,
    )
    return modifier
}

const getAttack = (
  player: Player,
  modifier: number | null,
): number => {
    const attack = player.dieValue
      && (player.dieValue + (modifier || 0))
    return attack
}

export const getAttackDetails = (
  player: Player,
  opponent: Player | null,
  types: CardType[],
): AttackDetails => {
  const modifier = getModifier(player, opponent, types)
  const attack = getAttack(player, modifier)
  return {
    attack,
    modifier,
  }
}
