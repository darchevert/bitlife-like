import { useState } from 'react'
import './App.css'
import { pickRandomEvent } from './data/events'
import { checkGameOver, type Ending } from './data/endings'
import { INITIAL_STATS, STAT_LABELS, type MisfortuneEvent, type Stats } from './data/types'

interface LogEntry {
  key: string
  text: string
}

const STAT_ORDER: (keyof Stats)[] = ['bonheur', 'chance', 'reputation', 'argent']

function clampStats(stats: Stats): Stats {
  return {
    ...stats,
    bonheur: Math.max(0, Math.min(100, stats.bonheur)),
    chance: Math.max(0, Math.min(100, stats.chance)),
    reputation: Math.max(0, Math.min(100, stats.reputation)),
  }
}

function applyEffects(stats: Stats, effects: Partial<Stats> = {}): Stats {
  const next = { ...stats }
  for (const key of Object.keys(effects) as (keyof Stats)[]) {
    next[key] = next[key] + (effects[key] ?? 0)
  }
  return clampStats(next)
}

function App() {
  const [characterName, setCharacterName] = useState<string | null>(null)
  const [nameDraft, setNameDraft] = useState('')
  const [age, setAge] = useState(18)
  const [stats, setStats] = useState<Stats>(INITIAL_STATS)
  const [log, setLog] = useState<LogEntry[]>([])
  const [recentEventIds, setRecentEventIds] = useState<string[]>([])
  const [pendingChoice, setPendingChoice] = useState<MisfortuneEvent | null>(null)
  const [ending, setEnding] = useState<Ending | null>(null)

  function startGame() {
    const trimmed = nameDraft.trim()
    if (!trimmed) return
    setCharacterName(trimmed)
  }

  function resolveTurn(text: string, effects: Partial<Stats> | undefined, eventId: string) {
    if (!characterName) return
    const nextStats = applyEffects(stats, effects)
    const nextAge = age + 1
    setStats(nextStats)
    setAge(nextAge)
    setLog((prev) => [{ key: `${eventId}-${prev.length}`, text }, ...prev])
    setRecentEventIds((prev) => [...prev, eventId].slice(-5))
    setPendingChoice(null)

    const result = checkGameOver(nextStats, nextAge)
    if (result) setEnding(result)
  }

  function advanceYear() {
    if (!characterName || ending) return
    const event = pickRandomEvent(recentEventIds)
    const text = event.text.replace('{name}', characterName)
    if (event.choices) {
      setPendingChoice(event)
      setLog((prev) => [{ key: `${event.id}-prompt-${prev.length}`, text }, ...prev])
      return
    }
    resolveTurn(text, event.effects, event.id)
  }

  function chooseOption(choiceId: string) {
    if (!pendingChoice || !characterName) return
    const choice = pendingChoice.choices?.find((c) => c.id === choiceId)
    if (!choice) return
    const text = choice.resultText.replace('{name}', characterName)
    resolveTurn(text, choice.effects, `${pendingChoice.id}-${choice.id}`)
  }

  function restart() {
    setCharacterName(null)
    setNameDraft('')
    setAge(18)
    setStats(INITIAL_STATS)
    setLog([])
    setRecentEventIds([])
    setPendingChoice(null)
    setEnding(null)
  }

  if (!characterName) {
    return (
      <main className="screen name-screen">
        <h1>Souffre-Douleur</h1>
        <p className="tagline">Crée un personnage. La vie va s'occuper du reste.</p>
        <input
          className="name-input"
          type="text"
          placeholder="Nom du personnage"
          value={nameDraft}
          onChange={(e) => setNameDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && startGame()}
          autoFocus
        />
        <button className="primary-button" onClick={startGame} disabled={!nameDraft.trim()}>
          Créer
        </button>
      </main>
    )
  }

  if (ending) {
    return (
      <main className="screen name-screen">
        <h1>Fin de partie</h1>
        <p className="tagline">{ending.text.replace('{name}', characterName)}</p>
        <ul className="recap-stats">
          <li>Âge atteint : {age} ans</li>
          {STAT_ORDER.map((key) => (
            <li key={key}>
              {STAT_LABELS[key]} : {stats[key]}
              {key === 'argent' ? '€' : '%'}
            </li>
          ))}
        </ul>
        <button className="primary-button" onClick={restart}>
          Recommencer
        </button>
      </main>
    )
  }

  return (
    <main className="screen game-screen">
      <header className="stats-bar">
        <div className="stat">
          <span className="stat-label">Nom</span>
          <span className="stat-value">{characterName}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Âge</span>
          <span className="stat-value">{age}</span>
        </div>
        {STAT_ORDER.map((key) => (
          <div className="stat" key={key}>
            <span className="stat-label">{STAT_LABELS[key]}</span>
            <span className="stat-value">
              {stats[key]}
              {key === 'argent' ? '€' : '%'}
            </span>
          </div>
        ))}
      </header>

      {pendingChoice ? (
        <div className="choices">
          {pendingChoice.choices?.map((choice) => (
            <button key={choice.id} className="primary-button choice-button" onClick={() => chooseOption(choice.id)}>
              {choice.label}
            </button>
          ))}
        </div>
      ) : (
        <button className="primary-button" onClick={advanceYear}>
          Année suivante
        </button>
      )}

      <ul className="log">
        {log.map((entry) => (
          <li key={entry.key} className="log-entry">
            {entry.text}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
