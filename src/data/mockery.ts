// Sarcastic narrator lines for the "Palmarès de la honte" recap. Mean and a
// little vulgar on purpose (this is a misfortune game), but always aimed at
// the *situation*, never a direct insult thrown at the character's name —
// see README "Note sur le contenu" for why that line matters.
export const RANK_CAPTIONS = [
  '🏆 Le sommet incontesté de la loose :',
  '🥈 Juste derrière, mais tout aussi lamentable :',
  '🥉 Et pour compléter le podium de la honte :',
]

export const CLOSER_LINES = [
  'Franchement, bravo.',
  'Quel talent monumental pour tout foirer.',
  "On applaudit des deux mains. Ou pas.",
  'Un grand moment de médiocrité.',
  'Putain, quelle catastrophe ambulante.',
  "Purée, quelle cata. Digne d'un mémorial.",
  'Chef-d’œuvre du n’importe quoi.',
  'Merci pour ce moment.',
]

export function pickCloserLine(seed: number): string {
  return CLOSER_LINES[seed % CLOSER_LINES.length]
}
