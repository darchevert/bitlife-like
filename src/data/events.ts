// Demo content only — a small placeholder pool to prove the game loop end-to-end.
// Real content design (tone, categories, LLM-assisted generation) comes later.
export interface MisfortuneEvent {
  id: string
  /** Use {name} as a placeholder for the character's name. */
  text: string
  happiness: number
}

export const MISFORTUNE_EVENTS: MisfortuneEvent[] = [
  { id: 'coffee', text: '{name} renverse son café sur sa chemise juste avant une réunion importante.', happiness: -3 },
  { id: 'wifi', text: "Le wifi de {name} tombe en panne pendant un entretien d'embauche en visio.", happiness: -5 },
  { id: 'parking', text: '{name} reçoit une amende pour un stationnement mal payé de 4 minutes.', happiness: -4 },
  { id: 'ex', text: 'Son ex tombe sur {name} au supermarché, en pyjama, un lundi à 14h.', happiness: -6 },
  { id: 'reply-all', text: '{name} répond à tout le monde au lieu de répondre juste à son patron. Le message était sur son patron.', happiness: -8 },
  { id: 'autocorrect', text: "L'autocorrecteur de {name} transforme un message important en catastrophe diplomatique.", happiness: -5 },
  { id: 'queue', text: '{name} attend 40 minutes dans la mauvaise file avant de découvrir son erreur.', happiness: -3 },
  { id: 'birthday', text: 'Personne ne souhaite son anniversaire à {name}. Même pas Facebook.', happiness: -7 },
]

export function pickRandomEvent(): MisfortuneEvent {
  return MISFORTUNE_EVENTS[Math.floor(Math.random() * MISFORTUNE_EVENTS.length)]
}
