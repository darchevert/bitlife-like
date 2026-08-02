import type { Stats } from './types'

export const MAX_AGE = 60

export interface Ending {
  id: string
  text: string
}

/** Returns an ending once a stat bottoms out or the character reaches MAX_AGE, else null. */
export function checkGameOver(stats: Stats, age: number): Ending | null {
  if (stats.bonheur <= 0) {
    return {
      id: 'depression',
      text: '{name} sombre dans une dépression existentielle et arrête de répondre à ses messages.',
    }
  }
  if (stats.reputation <= 0) {
    return {
      id: 'ruined-reputation',
      text: '{name} est devenu la légende locale du ridicule. Plus personne ne l’invite nulle part.',
    }
  }
  if (stats.argent <= -50) {
    return {
      id: 'bankrupt',
      text: '{name} déclare faillite personnelle après une succession ininterrompue de catastrophes financières.',
    }
  }
  if (age >= MAX_AGE) {
    return {
      id: 'natural-end',
      text: '{name} atteint un âge respectable, fatigué mais toujours debout. Une victoire, en quelque sorte.',
    }
  }
  return null
}
