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

/**
 * Small persistent situation the character is in, used to chain events into
 * short story arcs (e.g. getting fired makes job-hunting events show up
 * until a new-job event resolves it) instead of every year being unrelated.
 */
export interface Flags {
  emploi: 'en-poste' | 'sans-emploi'
  couple: 'celibataire' | 'en-couple'
}

export const INITIAL_FLAGS: Flags = {
  emploi: 'en-poste',
  couple: 'celibataire',
}

export interface EventChoice {
  id: string
  /** Button label, e.g. "Mentir" / "Dire la vérité". */
  label: string
  /** Use {name} as a placeholder for the character's name. */
  resultText: string
  effects: Partial<Stats>
  setFlags?: Partial<Flags>
}

export interface MisfortuneEvent {
  id: string
  category: EventCategory
  /** Use {name} as a placeholder for the character's name. */
  text: string
  /** Only eligible when the current flags match all of these. */
  requires?: Partial<Flags>
  /** Present for simple (non-choice) events. */
  effects?: Partial<Stats>
  setFlags?: Partial<Flags>
  /** Present for events where the player picks how the character reacts. */
  choices?: EventChoice[]
}
