import { useEffect, useRef, useState } from 'react'
import './App.css'
import { pickRandomEvent } from './data/events'
import { checkGameOver, type Ending } from './data/endings'
import { pickCloserLine, RANK_CAPTIONS } from './data/mockery'
import { INITIAL_FLAGS, INITIAL_STATS, STAT_LABELS, type EventCategory, type Flags, type MisfortuneEvent, type Stats } from './data/types'

interface LogEntry {
  key: string
  emoji: string
  text: string
  category?: EventCategory
  /** How badly this turn's event hurt the character's stats, for the shame ranking. */
  impact: number
}

function computeImpact(effects: Partial<Stats> = {}): number {
  return Object.values(effects).reduce((total, value = 0) => total + Math.max(0, -value), 0)
}

const STAT_ORDER: (keyof Stats)[] = ['bonheur', 'chance', 'reputation', 'argent']
const TYPING_DELAY_MS = 700

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

function gaugeTone(value: number): 'bad' | 'mid' | 'good' {
  if (value < 30) return 'bad'
  if (value < 60) return 'mid'
  return 'good'
}

function App() {
  const [characterName, setCharacterName] = useState<string | null>(null)
  const [nameDraft, setNameDraft] = useState('')
  const [age, setAge] = useState(18)
  const [stats, setStats] = useState<Stats>(INITIAL_STATS)
  const [flags, setFlags] = useState<Flags>(INITIAL_FLAGS)
  const [log, setLog] = useState<LogEntry[]>([])
  const [recentEventIds, setRecentEventIds] = useState<string[]>([])
  const [pendingChoice, setPendingChoice] = useState<MisfortuneEvent | null>(null)
  const [ending, setEnding] = useState<Ending | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const logEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [log, isTyping])

  function startGame() {
    const trimmed = nameDraft.trim()
    if (!trimmed) return
    setCharacterName(trimmed)
  }

  function resolveTurn(
    emoji: string,
    text: string,
    effects: Partial<Stats> | undefined,
    eventId: string,
    category: EventCategory | undefined,
    flagChanges?: Partial<Flags>,
  ) {
    if (!characterName) return
    const nextStats = applyEffects(stats, effects)
    const nextAge = age + 1
    setStats(nextStats)
    setAge(nextAge)
    if (flagChanges) setFlags((prev) => ({ ...prev, ...flagChanges }))
    setLog((prev) => [...prev, { key: `${eventId}-${prev.length}`, emoji, text, category, impact: computeImpact(effects) }])
    setRecentEventIds((prev) => [...prev, eventId].slice(-5))
    setPendingChoice(null)

    const result = checkGameOver(nextStats, nextAge)
    if (result) setEnding(result)
  }

  function advanceYear() {
    if (!characterName || ending || isTyping || pendingChoice) return
    setIsTyping(true)
    window.setTimeout(() => {
      const event = pickRandomEvent(recentEventIds, flags)
      const text = event.text.replace('{name}', characterName)
      if (event.choices) {
        setPendingChoice(event)
        setLog((prev) => [
          ...prev,
          { key: `${event.id}-prompt-${prev.length}`, emoji: event.emoji, text, category: event.category, impact: 0 },
        ])
        setIsTyping(false)
        return
      }
      resolveTurn(event.emoji, text, event.effects, event.id, event.category, event.setFlags)
      setIsTyping(false)
    }, TYPING_DELAY_MS)
  }

  function chooseOption(choiceId: string) {
    if (!pendingChoice || !characterName || isTyping) return
    const choice = pendingChoice.choices?.find((c) => c.id === choiceId)
    if (!choice) return
    setIsTyping(true)
    window.setTimeout(() => {
      const text = choice.resultText.replace('{name}', characterName)
      resolveTurn(choice.emoji, text, choice.effects, `${pendingChoice.id}-${choice.id}`, pendingChoice.category, choice.setFlags)
      setIsTyping(false)
    }, TYPING_DELAY_MS)
  }

  function restart() {
    setCharacterName(null)
    setNameDraft('')
    setAge(18)
    setStats(INITIAL_STATS)
    setFlags(INITIAL_FLAGS)
    setLog([])
    setRecentEventIds([])
    setPendingChoice(null)
    setEnding(null)
    setIsTyping(false)
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
    const shameList = [...log]
      .filter((entry) => entry.impact > 0)
      .sort((a, b) => b.impact - a.impact)
      .slice(0, 3)

    return (
      <main className="screen name-screen ending-screen">
        <span className="ending-emoji" aria-hidden="true">
          {ending.emoji}
        </span>
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

        {shameList.length > 0 && (
          <section className="shame-hall">
            <h2>Palmarès de la honte</h2>
            {shameList.map((entry, index) => (
              <div key={entry.key} className="shame-entry">
                <p className="shame-caption">{RANK_CAPTIONS[index]}</p>
                <p className="log-entry shame-quote">
                  <span className="log-emoji" aria-hidden="true">
                    {entry.emoji}
                  </span>
                  {entry.text}
                </p>
                <p className="shame-closer">{pickCloserLine(index + entry.impact)}</p>
              </div>
            ))}
          </section>
        )}

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
        {STAT_ORDER.map((key) => {
          if (key === 'argent') {
            return (
              <div className="stat" key={key}>
                <span className="stat-label">{STAT_LABELS[key]}</span>
                <span
                  key={stats.argent}
                  className={`stat-value stat-value--pulse ${stats.argent < 0 ? 'stat-value--negative' : ''}`}
                >
                  {stats.argent}€
                </span>
              </div>
            )
          }
          const value = stats[key]
          return (
            <div className="stat" key={key}>
              <span className="stat-label">{STAT_LABELS[key]}</span>
              <div className="gauge">
                <div className={`gauge-fill gauge-fill--${gaugeTone(value)}`} style={{ width: `${value}%` }} />
              </div>
              <span key={value} className="stat-value stat-value--pulse">
                {value}%
              </span>
            </div>
          )
        })}
      </header>

      <div className="log">
        {log.map((entry) => (
          <p key={entry.key} className={`log-entry${entry.category ? ` log-entry--${entry.category}` : ''}`}>
            <span className="log-emoji" aria-hidden="true">
              {entry.emoji}
            </span>
            {entry.text}
          </p>
        ))}
        {isTyping && (
          <p className="log-entry log-entry--typing" aria-live="polite" aria-label={`La vie de ${characterName} continue...`}>
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </p>
        )}
        <div ref={logEndRef} />
      </div>

      <div className="action-bar">
        {isTyping ? null : pendingChoice ? (
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
      </div>
    </main>
  )
}

export default App
