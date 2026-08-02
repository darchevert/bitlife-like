import type { MisfortuneEvent } from './types'

// Demo content — a broader curated pool to prove the game loop end-to-end.
// Tone stays absurd/comic on purpose (never realistic-sounding claims about
// a real person) — see README "Note sur le contenu".
export const MISFORTUNE_EVENTS: MisfortuneEvent[] = [
  // --- social ---
  {
    id: 'coffee',
    category: 'social',
    text: '{name} renverse son café sur sa chemise juste avant une réunion importante.',
    effects: { bonheur: -3 },
  },
  {
    id: 'reply-all',
    category: 'social',
    text: '{name} répond à tout le monde au lieu de répondre juste à son patron. Le message était sur son patron.',
    effects: { bonheur: -8, reputation: -6 },
  },
  {
    id: 'autocorrect',
    category: 'social',
    text: "L'autocorrecteur de {name} transforme un message important en catastrophe diplomatique.",
    effects: { bonheur: -5, reputation: -3 },
  },
  {
    id: 'birthday',
    category: 'social',
    text: 'Personne ne souhaite son anniversaire à {name}. Même pas Facebook.',
    effects: { bonheur: -7 },
  },
  {
    id: 'groupchat',
    category: 'social',
    text: '{name} est ajouté par erreur à un groupe où tout le monde se moque de lui depuis trois semaines.',
    effects: { bonheur: -6, reputation: -4 },
  },
  {
    id: 'photobomb',
    category: 'social',
    text: "{name} se fait immortaliser en train de trébucher, en arrière-plan d'une photo qui devient virale.",
    effects: { reputation: -5, chance: -3 },
  },
  {
    id: 'party-invite',
    category: 'social',
    text: 'Un ami organise une soirée. {name} arrive en retard sans excuse crédible.',
    choices: [
      {
        id: 'go-anyway',
        label: 'Y aller quand même',
        resultText: "{name} débarque en retard, tout le monde s'arrête de parler en le voyant entrer.",
        effects: { bonheur: -4, reputation: -2 },
      },
      {
        id: 'fake-excuse',
        label: 'Inventer une excuse',
        resultText: "{name} invente une excuse bancale. Quelqu'un la vérifie et le démasque publiquement.",
        effects: { bonheur: -3, reputation: -7 },
      },
    ],
  },

  // --- travail ---
  {
    id: 'wifi-interview',
    category: 'travail',
    text: "Le wifi de {name} tombe en panne pendant un entretien d'embauche en visio.",
    effects: { bonheur: -5, chance: -3 },
  },
  {
    id: 'typo-report',
    category: 'travail',
    text: 'Une faute de frappe dans le rapport de {name} change complètement le sens des chiffres. Tout le monde l’a vue.',
    effects: { reputation: -6 },
  },
  {
    id: 'zipper',
    category: 'travail',
    text: '{name} fait sa présentation la plus importante de l’année avec la braguette ouverte.',
    effects: { bonheur: -4, reputation: -5 },
  },
  {
    id: 'mass-layoff-email',
    category: 'travail',
    text: '{name} apprend qu’il est licencié via un mail groupé envoyé à toute l’entreprise.',
    effects: { bonheur: -9, argent: -15 },
  },
  {
    id: 'coffee-machine',
    category: 'travail',
    text: 'La machine à café du bureau tombe en panne. Le patron demande qui est responsable.',
    choices: [
      {
        id: 'confess',
        label: 'Avouer',
        resultText: "{name} avoue. Tout le monde le regarde bizarrement pendant une semaine, mais au moins c'est fini.",
        effects: { bonheur: -2, reputation: -1 },
      },
      {
        id: 'blame-colleague',
        label: 'Accuser un collègue',
        resultText: 'Le mensonge de {name} est découvert deux jours plus tard sur les caméras de surveillance.',
        effects: { bonheur: -1, reputation: -9 },
      },
    ],
  },

  // --- argent ---
  {
    id: 'parking-fine',
    category: 'argent',
    text: '{name} reçoit une amende pour un stationnement mal payé de 4 minutes.',
    effects: { argent: -6, bonheur: -3 },
  },
  {
    id: 'scam',
    category: 'argent',
    text: '{name} investit ses économies dans "un projet garanti à 300%". Le site disparaît le lendemain.',
    effects: { argent: -20, bonheur: -6 },
  },
  {
    id: 'atm-eats-card',
    category: 'argent',
    text: 'Le distributeur avale la carte de {name}, un dimanche, jour férié.',
    effects: { argent: -4, bonheur: -4 },
  },
  {
    id: 'forgotten-subscription',
    category: 'argent',
    text: '{name} découvre qu’il paie un abonnement oublié depuis deux ans.',
    effects: { argent: -12 },
  },
  {
    id: 'found-money',
    category: 'argent',
    text: '{name} trouve un billet de 20€ par terre.',
    choices: [
      {
        id: 'keep-it',
        label: 'Le garder',
        resultText: "{name} le garde. Le sac troué juste à côté appartenait à son voisin, qui l'a vu faire.",
        effects: { argent: 15, reputation: -4 },
      },
      {
        id: 'find-owner',
        label: 'Chercher le propriétaire',
        resultText: "{name} passe une heure à chercher le propriétaire. Il finit par le rendre à la mauvaise personne.",
        effects: { bonheur: -2, chance: -2 },
      },
    ],
  },

  // --- santé / quotidien ---
  {
    id: 'cold',
    category: 'sante',
    text: '{name} attrape un rhume la veille du jour le plus important de l’année.',
    effects: { bonheur: -4 },
  },
  {
    id: 'trip-camera',
    category: 'sante',
    text: '{name} trébuche en public, filmé par un inconnu qui poste la vidéo en story.',
    effects: { reputation: -5, bonheur: -3 },
  },
  {
    id: 'expired-food',
    category: 'sante',
    text: "{name} mange quelque chose de périmé une heure avant un rendez-vous important.",
    effects: { bonheur: -6, chance: -2 },
  },
  {
    id: 'insomnia',
    category: 'sante',
    text: '{name} ne dort pas de la nuit avant l’examen le plus important de sa vie.',
    effects: { bonheur: -5, chance: -3 },
  },
  {
    id: 'allergy-wedding',
    category: 'sante',
    text: '{name} découvre une allergie alimentaire en plein milieu d’un mariage, devant tout le monde.',
    effects: { bonheur: -4, reputation: -2 },
  },

  // --- amour ---
  {
    id: 'ex-supermarket',
    category: 'amour',
    text: 'Son ex tombe sur {name} au supermarché, en pyjama, un lundi à 14h.',
    effects: { bonheur: -6 },
  },
  {
    id: 'bad-date',
    category: 'amour',
    text: '{name} renverse un verre entier sur son rendez-vous, cinq minutes après son arrivée.',
    effects: { bonheur: -5, chance: -3 },
  },
  {
    id: 'wrong-recipient',
    category: 'amour',
    text: '{name} envoie un message d’amour enflammé... à la mauvaise personne.',
    effects: { bonheur: -6, reputation: -3 },
  },
  {
    id: 'breakup-text',
    category: 'amour',
    text: '{name} se fait quitter par SMS, le jour de son anniversaire.',
    effects: { bonheur: -9 },
  },
  {
    id: 'honest-opinion',
    category: 'amour',
    text: 'Son/sa partenaire demande à {name} : "Cette tenue me va ?"',
    choices: [
      {
        id: 'lie',
        label: 'Mentir gentiment',
        resultText: '{name} ment. La tenue apparaît sur toutes les photos de la soirée, taguées publiquement.',
        effects: { bonheur: -2, reputation: -2 },
      },
      {
        id: 'truth',
        label: 'Dire la vérité',
        resultText: 'La vérité déclenche une dispute qui dure jusqu’au lendemain matin.',
        effects: { bonheur: -6 },
      },
    ],
  },
]

const RECENT_HISTORY_SIZE = 3

export function pickRandomEvent(recentIds: string[] = []): MisfortuneEvent {
  const recent = new Set(recentIds.slice(-RECENT_HISTORY_SIZE))
  const pool = MISFORTUNE_EVENTS.filter((e) => !recent.has(e.id))
  const source = pool.length > 0 ? pool : MISFORTUNE_EVENTS
  return source[Math.floor(Math.random() * source.length)]
}
