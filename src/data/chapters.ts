import type { Chapter } from './types'
import type { Ending } from './endings'

// First narrative arc — 4 chapters, richly detailed scenes with choices that
// shape the story, and memory tags so later chapters can call back to (or
// pay off) earlier decisions. Tone stays absurd/comic on purpose — see
// README "Note sur le contenu".
export const CHAPTERS: Chapter[] = [
  {
    id: 'fondations',
    title: 'Chapitre 1 — Les fondations',
    accent: '#3b82f6',
    scenes: [
      {
        id: 'ch1-controle',
        emoji: '🎒',
        ageAfter: 8,
        text: "{name} a 8 ans. Pendant le contrôle de maths, la maîtresse s'absente deux minutes. Sur la copie du voisin, la correction est parfaitement lisible.",
        choices: [
          {
            id: 'copier',
            label: 'Copier',
            emoji: '🤫',
            resultText:
              "{name} copie consciencieusement... et recopie aussi la faute de calcul du voisin. 3/20, avec la mention « recopié mot pour mot » écrite en rouge, en gros, soulignée deux fois.",
            effects: { reputation: -4, bonheur: -3 },
            memoryTags: ['tricheur-precoce'],
          },
          {
            id: 'pas-copier',
            label: 'Ne pas copier',
            emoji: '😇',
            resultText: "{name} fait l'effort tout seul. Résultat : 4/20, mais au moins c'est authentique.",
            effects: { bonheur: -2 },
            memoryTags: ['honnete-enfance'],
          },
        ],
      },
      {
        id: 'ch1-expose',
        emoji: '🏫',
        ageAfter: 10,
        text: "Quelques mois plus tard, {name} doit trouver un binôme pour le grand exposé de fin d'année.",
        choices: [
          {
            id: 'demander-populaire',
            label: 'Demander au plus populaire de la classe',
            emoji: '🙋',
            resultText:
              "Refusé, devant tout le monde. {name} finit seul(e) au fond de la classe, avec la maquette en carton la moins convaincante de toute l'école.",
            effects: { bonheur: -5, reputation: -2 },
            memoryTags: ['rejet-scolaire'],
          },
          {
            id: 'travailler-seul',
            label: 'Travailler seul',
            emoji: '🧍',
            resultText:
              "{name} fait tout seul un exposé sur les dinosaures. Il n'en reste que trois croquis approximatifs et une fierté totalement disproportionnée.",
            effects: { bonheur: -2, chance: -2 },
          },
        ],
      },
    ],
  },
  {
    id: 'adolescence',
    title: "Chapitre 2 — L'adolescence",
    accent: '#ec4899',
    scenes: [
      {
        id: 'ch2-bac',
        emoji: '📝',
        ageAfter: 17,
        text: "Le bac approche. {name} n'a pas ouvert un seul livre d'histoire depuis septembre.",
        callbackRequires: ['tricheur-precoce'],
        callbackText:
          "Le bac approche. Comme au CE2, {name} jette déjà un œil vers la copie du voisin — sauf que cette fois, il y a des caméras de surveillance.",
        choices: [
          {
            id: 'retenter',
            label: 'Retenter sa chance',
            emoji: '🎲',
            resultText: 'Repéré en trois minutes. Convocation, procès-verbal, et une réputation qui le/la suit jusqu’à la terminale.',
            effects: { reputation: -8, bonheur: -4 },
            memoryTags: ['tricheur-recidiviste'],
          },
          {
            id: 'reviser-urgence',
            label: 'Réviser en urgence',
            emoji: '📚',
            resultText: 'Une nuit blanche et trois litres de café plus tard, {name} obtient tout juste la moyenne. Un miracle statistique.',
            effects: { bonheur: 2, chance: -2 },
          },
        ],
      },
      {
        id: 'ch2-rupture',
        emoji: '💌',
        ageAfter: 17,
        text: '{name} vit son premier chagrin d’amour : largué(e) devant tout le lycée, entre deux cours.',
        choices: [
          {
            id: 'pleurer',
            label: 'Pleurer publiquement',
            emoji: '😭',
            resultText:
              '{name} pleure dans le couloir principal. La scène finit en story, avec 200 vues avant la fin de la journée.',
            effects: { bonheur: -6, reputation: -3 },
            memoryTags: ['premier-chagrin-public'],
          },
          {
            id: 'faire-style',
            label: 'Faire style que ça va',
            emoji: '😐',
            resultText: '{name} fait style que ça va. Personne n’est dupe, surtout pas {name}.',
            effects: { bonheur: -4 },
            memoryTags: ['premier-chagrin'],
          },
        ],
      },
    ],
  },
  {
    id: 'grand-saut',
    title: 'Chapitre 3 — Le grand saut',
    accent: '#e0a530',
    scenes: [
      {
        id: 'ch3-entretien',
        emoji: '🎓',
        ageAfter: 23,
        text: "Premier entretien d'embauche après les études. Le recruteur demande une référence de l'école.",
        callbackRequires: ['tricheur-recidiviste'],
        callbackText:
          "Premier entretien d'embauche. Le recruteur mentionne, un sourire en coin, avoir eu écho d'une « petite affaire de triche au bac ». Le bluff d'antan revient présenter la note.",
        choices: [
          {
            id: 'bluffer',
            label: 'Bluffer',
            emoji: '🤥',
            resultText: '{name} improvise une réponse. Le silence qui suit dure exactement assez longtemps pour être gênant.',
            effects: { reputation: -3, chance: -2 },
          },
          {
            id: 'assumer',
            label: 'Assumer',
            emoji: '🙋',
            resultText: '{name} assume tout, sans détour. Le recruteur apprécie la sincérité... et embauche quelqu’un d’autre.',
            effects: { bonheur: -3 },
          },
        ],
      },
      {
        id: 'ch3-cafe',
        emoji: '💼',
        ageAfter: 24,
        text: 'Trois mois plus tard, {name} est enfin en poste — jusqu’au jour où la machine à café tombe en panne et où le patron cherche un coupable.',
        choices: [
          {
            id: 'avouer-cafe',
            label: 'Avouer',
            emoji: '😅',
            resultText: '{name} avoue. Ambiance un peu étrange au bureau pendant une semaine, mais au moins c’est réglé.',
            effects: { bonheur: -2, reputation: -1 },
          },
          {
            id: 'accuser-collegue',
            label: 'Accuser un collègue',
            emoji: '🤥',
            resultText: 'Démasqué·e sur les caméras deux jours plus tard. La confiance de l’équipe ne reviendra jamais vraiment.',
            effects: { bonheur: -1, reputation: -7 },
            memoryTags: ['menteur-bureau'],
          },
        ],
      },
    ],
  },
  {
    id: 'bilan',
    title: 'Chapitre 4 — Le bilan',
    accent: '#7c3aed',
    scenes: [
      {
        id: 'ch4-miroir',
        emoji: '🪞',
        ageAfter: 45,
        text: '{name} a maintenant passé la moitié de sa vie à accumuler les catastrophes. L’heure d’un premier bilan a sonné.',
        callbackRequires: ['tricheur-precoce', 'tricheur-recidiviste'],
        callbackText:
          'Du CE2 jusqu’au bac, une seule et même stratégie : copier. {name} regarde en arrière et doit reconnaître au moins une chose — une carrière de tricheur cohérente du début à la fin.',
        choices: [
          {
            id: 'accepter',
            label: 'Accepter son destin',
            emoji: '🤷',
            resultText: '{name} hausse les épaules. Après tout ça, plus grand-chose ne surprend vraiment.',
            effects: { bonheur: 3 },
          },
          {
            id: 'nier',
            label: 'Nier en bloc',
            emoji: '🙅',
            resultText: '{name} refuse d’admettre le moindre échec. Le déni, dernier rempart avant la retraite.',
            effects: { reputation: -2 },
          },
        ],
      },
      {
        id: 'ch4-cloture',
        emoji: '🎬',
        ageAfter: 46,
        text: '{name} referme (provisoirement) ce chapitre de sa vie.',
        callbackRequires: ['menteur-bureau'],
        callbackText:
          'Au bureau, on se souvient encore de « l’affaire de la machine à café ». {name} referme (provisoirement) ce chapitre de sa vie, sans jamais avoir vraiment tourné la page.',
        choices: [
          {
            id: 'sourire',
            label: 'Sourire quand même',
            emoji: '🙂',
            resultText: '{name} choisit d’en sourire. Ce n’était pas glorieux, mais c’était, indéniablement, une vie.',
            effects: { bonheur: 4 },
          },
          {
            id: 'soupirer',
            label: 'Soupirer',
            emoji: '😮‍💨',
            resultText: '{name} pousse un long soupir. Certaines histoires méritent bien ça.',
            effects: { bonheur: 1 },
          },
        ],
      },
    ],
  },
]

export const STARTING_AGE = 8

export const FINALE_ENDING: Ending = {
  id: 'chapters-complete',
  emoji: '🎬',
  text: '{name} boucle son histoire. Pas franchement glorieuse, mais indéniablement mémorable.',
}
