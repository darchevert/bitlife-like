import type { Flags, MisfortuneEvent } from './types'

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
  // "en-poste" and "sans-emploi" events chain into each other: getting fired
  // gates the job-hunting events until a new-job event resolves it back.
  {
    id: 'wifi-interview',
    category: 'travail',
    text: "Le wifi de {name} tombe en panne pendant un entretien d'embauche en visio.",
    requires: { emploi: 'sans-emploi' },
    effects: { bonheur: -5, chance: -3 },
  },
  {
    id: 'job-rejection',
    category: 'travail',
    text: 'Encore une lettre de refus pour {name}. La pile commence à être impressionnante.',
    requires: { emploi: 'sans-emploi' },
    effects: { bonheur: -3, argent: -2 },
  },
  {
    id: 'new-job',
    category: 'travail',
    text: '{name} décroche enfin un nouveau poste. Correct, sans plus, mais ça paie les factures.',
    requires: { emploi: 'sans-emploi' },
    effects: { bonheur: 4, argent: 6 },
    setFlags: { emploi: 'en-poste' },
  },
  {
    id: 'typo-report',
    category: 'travail',
    text: 'Une faute de frappe dans le rapport de {name} change complètement le sens des chiffres. Tout le monde l’a vue.',
    requires: { emploi: 'en-poste' },
    effects: { reputation: -6 },
  },
  {
    id: 'zipper',
    category: 'travail',
    text: '{name} fait sa présentation la plus importante de l’année avec la braguette ouverte.',
    requires: { emploi: 'en-poste' },
    effects: { bonheur: -4, reputation: -5 },
  },
  {
    id: 'mass-layoff-email',
    category: 'travail',
    text: '{name} apprend qu’il est licencié via un mail groupé envoyé à toute l’entreprise.',
    requires: { emploi: 'en-poste' },
    effects: { bonheur: -9, argent: -15 },
    setFlags: { emploi: 'sans-emploi' },
  },
  {
    id: 'coffee-machine',
    category: 'travail',
    text: 'La machine à café du bureau tombe en panne. Le patron demande qui est responsable.',
    requires: { emploi: 'en-poste' },
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
  // Same chaining idea as "travail": a breakup gates dating-attempt events
  // until a new-relationship event puts the character back "en-couple".
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
    requires: { couple: 'celibataire' },
    effects: { bonheur: -5, chance: -3 },
  },
  {
    id: 'new-relationship',
    category: 'amour',
    text: 'Après une série de rendez-vous ratés, {name} rencontre enfin quelqu’un... qui vit à 400 km.',
    requires: { couple: 'celibataire' },
    effects: { bonheur: 5 },
    setFlags: { couple: 'en-couple' },
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
    requires: { couple: 'en-couple' },
    effects: { bonheur: -9 },
    setFlags: { couple: 'celibataire' },
  },
  {
    id: 'honest-opinion',
    category: 'amour',
    text: 'Son/sa partenaire demande à {name} : "Cette tenue me va ?"',
    requires: { couple: 'en-couple' },
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

function matchesFlags(event: MisfortuneEvent, flags: Flags): boolean {
  if (!event.requires) return true
  return (Object.keys(event.requires) as (keyof Flags)[]).every((key) => event.requires?.[key] === flags[key])
}

export function pickRandomEvent(recentIds: string[], flags: Flags): MisfortuneEvent {
  const eligible = MISFORTUNE_EVENTS.filter((e) => matchesFlags(e, flags))
  const recent = new Set(recentIds.slice(-RECENT_HISTORY_SIZE))
  const pool = eligible.filter((e) => !recent.has(e.id))
  const source = pool.length > 0 ? pool : eligible.length > 0 ? eligible : MISFORTUNE_EVENTS
  return source[Math.floor(Math.random() * source.length)]
}
