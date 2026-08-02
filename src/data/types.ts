export type StatKey = 'bonheur' | 'chance' | 'reputation' | 'argent'

export type Stats = Record<StatKey, number>

export const STAT_LABELS: Record<StatKey, string> = {
  bonheur: 'Bonheur',
  chance: 'Chance',
  reputation: 'Réputation',
  argent: 'Argent',
}

export const INITIAL_STATS: Stats = {
  bonheur: 60,
  chance: 50,
  reputation: 50,
  argent: 20,
}

export type EventCategory = 'social' | 'travail' | 'argent' | 'sante' | 'amour'

export interface EventChoice {
  id: string
  /** Button label, e.g. "Mentir" / "Dire la vérité". */
  label: string
  /** Use {name} as a placeholder for the character's name. */
  resultText: string
  effects: Partial<Stats>
}

export interface MisfortuneEvent {
  id: string
  category: EventCategory
  /** Use {name} as a placeholder for the character's name. */
  text: string
  /** Present for simple (non-choice) events. */
  effects?: Partial<Stats>
  /** Present for events where the player picks how the character reacts. */
  choices?: EventChoice[]
}
