import {CardType} from "./types";

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
