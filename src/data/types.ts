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
  /** Shown before the result text, like an emoji reaction on a text message. */
  emoji: string
  effects: Partial<Stats>
  setFlags?: Partial<Flags>
}

export interface MisfortuneEvent {
  id: string
  category: EventCategory
  /** Use {name} as a placeholder for the character's name. */
  text: string
  /** Shown before the event text, like an emoji reaction on a text message. */
  emoji: string
  /** Only eligible when the current flags match all of these. */
  requires?: Partial<Flags>
  /** Present for simple (non-choice) events. */
  effects?: Partial<Stats>
  setFlags?: Partial<Flags>
  /** Present for events where the player picks how the character reacts. */
  choices?: EventChoice[]
}

export interface DialogueChoice {
  id: string
  label: string
  /** Shown before the result text, like an emoji reaction on a text message. */
  emoji: string
  /**
   * Use {name} as a placeholder for the character's name.
   * If the parent node has a `speaker`, set `isReply` and write this as the
   * character's own spoken line — it renders as an outgoing chat bubble
   * instead of narrator text.
   */
  resultText: string
  effects: Partial<Stats>
  /** Tags added to the run's memory when this choice is picked, for later callbacks. */
  memoryTags?: string[]
  /** Renders resultText as the player character's own outgoing message rather than narration. */
  isReply?: boolean
  /** Optional follow-up line from the node's speaker, shown as a second incoming bubble right after. */
  npcReaction?: string
  /**
   * Id of the next DialogueNode in this scene's conversation to continue
   * into. Omit to end the topic here — the two choices of a node can point
   * to two different nodes, so the conversation genuinely branches instead
   * of just swapping a line of flavor text.
   */
  next?: string
}

export interface DialogueNode {
  id: string
  emoji: string
  /** If set, text/callbackText is attributed to this character as an incoming dialogue bubble instead of narrator prose. */
  speaker?: string
  /** Use {name} as a placeholder for the character's name. */
  text: string
  /** If every one of these tags is already in memory, callbackText is shown instead of text. */
  callbackRequires?: string[]
  callbackText?: string
  choices: [DialogueChoice, DialogueChoice]
}

export interface Scene {
  id: string
  /** The character's age once the topic (the whole node graph) resolves. */
  ageAfter: number
  startNodeId: string
  nodes: DialogueNode[]
}

export interface Chapter {
  id: string
  title: string
  /** Left-border/tint color for this chapter's bubbles, e.g. "#3b82f6". */
  accent: string
  scenes: Scene[]
}
