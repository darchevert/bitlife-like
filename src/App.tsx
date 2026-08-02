import { useState } from 'react'
import './App.css'
import { pickRandomEvent, type MisfortuneEvent } from './data/events'

interface LogEntry {
  key: string
  text: string
}

function App() {
  const [characterName, setCharacterName] = useState<string | null>(null)
  const [nameDraft, setNameDraft] = useState('')
  const [age, setAge] = useState(18)
  const [happiness, setHappiness] = useState(50)
  const [log, setLog] = useState<LogEntry[]>([])

  function startGame() {
    const trimmed = nameDraft.trim()
    if (!trimmed) return
    setCharacterName(trimmed)
  }

  function advanceYear() {
    if (!characterName) return
    const event: MisfortuneEvent = pickRandomEvent()
    const text = event.text.replace('{name}', characterName)
    setHappiness((h) => Math.max(0, Math.min(100, h + event.happiness)))
    setAge((a) => a + 1)
    setLog((prev) => [{ key: `${event.id}-${prev.length}`, text }, ...prev])
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
        <div className="stat">
          <span className="stat-label">Bonheur</span>
          <span className="stat-value">{happiness}%</span>
        </div>
      </header>

      <button className="primary-button" onClick={advanceYear}>
        Année suivante
      </button>

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
