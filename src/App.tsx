import { useEffect, useRef, useState } from 'react'
import './App.css'
import { CHAPTERS, FINALE_ENDING, STARTING_AGE } from './data/chapters'
import { checkGameOver, type Ending } from './data/endings'
import { pickCloserLine, RANK_CAPTIONS } from './data/mockery'
import { INITIAL_STATS, STAT_LABELS, type Scene, type SceneChoice, type Stats } from './data/types'

interface LogEntry {
  key: string
  emoji: string
  text: string
  accent?: string
  impact: number
  isChapterTitle?: boolean
}

function computeImpact(effects: Partial<Stats> = {}): number {
  return Object.values(effects).reduce((total, value = 0) => total + Math.max(0, -value), 0)
}

const STAT_ORDER: (keyof Stats)[] = ['bonheur', 'chance', 'reputation', 'argent']
const STAT_ICONS: Record<keyof Stats, string> = {
  bonheur: '😊',
  chance: '🍀',
  reputation: '⭐',
  argent: '💶',
}
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

function sceneText(scene: Scene, memory: string[]): string {
  const hasCallback = scene.callbackRequires && scene.callbackRequires.every((tag) => memory.includes(tag))
  return hasCallback && scene.callbackText ? scene.callbackText : scene.text
}

function App() {
  const [characterName, setCharacterName] = useState<string | null>(null)
  const [nameDraft, setNameDraft] = useState('')
  const [age, setAge] = useState(STARTING_AGE)
  const [stats, setStats] = useState<Stats>(INITIAL_STATS)
  const [memory, setMemory] = useState<string[]>([])
  const [chapterIndex, setChapterIndex] = useState(0)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [log, setLog] = useState<LogEntry[]>([])
  const [pendingScene, setPendingScene] = useState<Scene | null>(null)
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

  function advanceScene() {
    if (!characterName || ending || isTyping || pendingScene) return
    const chapter = CHAPTERS[chapterIndex]
    if (!chapter) return
    const scene = chapter.scenes[sceneIndex]

    setIsTyping(true)
    window.setTimeout(() => {
      setLog((prev) => {
        const next = [...prev]
        if (sceneIndex === 0) {
          next.push({ key: `${chapter.id}-title`, emoji: '', text: chapter.title, impact: 0, isChapterTitle: true })
        }
        next.push({
          key: `${scene.id}-prompt`,
          emoji: scene.emoji,
          text: sceneText(scene, memory).replaceAll('{name}', characterName),
          accent: chapter.accent,
          impact: 0,
        })
        return next
      })
      setPendingScene(scene)
      setIsTyping(false)
    }, TYPING_DELAY_MS)
  }

  function chooseOption(choice: SceneChoice) {
    if (!pendingScene || !characterName || isTyping) return
    const chapter = CHAPTERS[chapterIndex]
    setIsTyping(true)
    window.setTimeout(() => {
      const text = choice.resultText.replaceAll('{name}', characterName)
      const nextStats = applyEffects(stats, choice.effects)
      const nextAge = pendingScene.ageAfter
      setStats(nextStats)
      setAge(nextAge)
      if (choice.memoryTags?.length) setMemory((prev) => [...prev, ...choice.memoryTags!])
      setLog((prev) => [
        ...prev,
        { key: `${pendingScene.id}-${choice.id}`, emoji: choice.emoji, text, accent: chapter.accent, impact: computeImpact(choice.effects) },
      ])
      setPendingScene(null)
      setIsTyping(false)

      const statEnding = checkGameOver(nextStats, nextAge)
      if (statEnding) {
        setEnding(statEnding)
        return
      }
      const isLastSceneOfChapter = sceneIndex >= chapter.scenes.length - 1
      if (isLastSceneOfChapter) {
        if (chapterIndex >= CHAPTERS.length - 1) {
          setEnding(FINALE_ENDING)
        } else {
          setChapterIndex((c) => c + 1)
          setSceneIndex(0)
        }
      } else {
        setSceneIndex((s) => s + 1)
      }
    }, TYPING_DELAY_MS)
  }

  function restart() {
    setCharacterName(null)
    setNameDraft('')
    setAge(STARTING_AGE)
    setStats(INITIAL_STATS)
    setMemory([])
    setChapterIndex(0)
    setSceneIndex(0)
    setLog([])
    setPendingScene(null)
    setEnding(null)
    setIsTyping(false)
  }

  if (!characterName) {
    return (
      <main className="screen name-screen">
        <span className="title-emoji" aria-hidden="true">
          🎭
        </span>
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
        <p className="tagline">{ending.text.replaceAll('{name}', characterName)}</p>
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
        <div className="stat stat--name" title="Nom">
          <span className="stat-icon" aria-hidden="true">
            👤
          </span>
          <span className="stat-value stat-value--name">{characterName}</span>
        </div>
        <div className="stat" title="Âge">
          <span className="stat-icon" aria-hidden="true">
            🎂
          </span>
          <span key={age} className="stat-value stat-value--pulse">
            {age}
          </span>
        </div>
        {STAT_ORDER.map((key) => {
          if (key === 'argent') {
            return (
              <div className="stat" key={key} title={STAT_LABELS[key]}>
                <span className="stat-icon" aria-hidden="true">
                  {STAT_ICONS[key]}
                </span>
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
            <div className="stat" key={key} title={STAT_LABELS[key]}>
              <span className="stat-icon" aria-hidden="true">
                {STAT_ICONS[key]}
              </span>
              <span key={value} className={`stat-value stat-value--pulse stat-value--${gaugeTone(value)}`}>
                {value}%
              </span>
            </div>
          )
        })}
      </header>

      <div className="log">
        {log.map((entry) =>
          entry.isChapterTitle ? (
            <div key={entry.key} className="chapter-divider">
              <span>{entry.text}</span>
            </div>
          ) : (
            <p
              key={entry.key}
              className="log-entry"
              style={entry.accent ? { borderLeftColor: entry.accent, background: `${entry.accent}14` } : undefined}
            >
              <span className="log-emoji" aria-hidden="true">
                {entry.emoji}
              </span>
              {entry.text}
            </p>
          ),
        )}
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
        {isTyping ? null : pendingScene ? (
          <div className="choices">
            {pendingScene.choices.map((choice) => (
              <button key={choice.id} className="primary-button choice-button" onClick={() => chooseOption(choice)}>
                {choice.label}
              </button>
            ))}
          </div>
        ) : (
          <button className="primary-button" onClick={advanceScene}>
            Continuer
          </button>
        )}
      </div>
    </main>
  )
}

export default App
