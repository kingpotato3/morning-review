'use client'

import { useState } from 'react'
import Masthead from '../../components/Masthead'

// --- Types ---

interface Newsletter {
  name: string
  description: string
  tier: 'H' | 'M' | 'L' | null
}

interface ManualNewsletter {
  name: string
  tier: 'H' | 'M' | 'L'
}

// --- Constants ---

const INTERESTS = [
  'Literature', 'Science', 'Politics', 'Culture', 'History',
  'Philosophy', 'Technology', 'Art', 'Music', 'Film',
  'Nature', 'Economics', 'Feminism', 'Architecture', 'Astronomy',
]

const THEMES = [
  'Romantic Victorian', 'Dark Academia', 'Cottagecore',
  'Minimal', 'Steampunk', 'Renaissance',
]

const MODULES = [
  { name: 'Word of the Day', description: 'A carefully chosen word with its etymology and usage' },
  { name: 'This Day in History', description: 'Notable events that occurred on this date' },
  { name: 'Positive News', description: 'An uplifting dispatch to start the morning' },
  { name: 'Fun Fact', description: 'A curious and delightful piece of trivia' },
  { name: 'Calendar Preview', description: 'A glance at the day ahead' },
  { name: 'To-Do List', description: 'Your tasks for the day, neatly arranged' },
  { name: 'YouTube Dispatches', description: 'Notable video correspondence from trusted channels' },
  { name: 'Ambient Audio', description: 'A suggested soundscape for your reading hour' },
]

const CADENCES = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly', recommended: true },
  { value: 'monthly', label: 'Monthly' },
] as const

const CATALOG: Record<string, { name: string; description: string }[]> = {
  Literature: [
    { name: 'The Marginalian', description: 'Reflections on literature, philosophy, and the life of the mind' },
    { name: 'Lit Hub Daily', description: 'The best of the literary internet, every day' },
    { name: 'The Paris Review', description: 'Dispatches from the storied journal of letters' },
  ],
  Science: [
    { name: 'Quanta Magazine', description: 'Illuminating science and mathematics research' },
    { name: 'STAT News', description: 'Reporting from the frontiers of health and medicine' },
    { name: 'The Prepared', description: 'A weekly briefing on engineering and infrastructure' },
  ],
  Culture: [
    { name: 'Garbage Day', description: 'Making sense of the internet, one post at a time' },
    { name: 'The Culture Study', description: 'Essays on how we live and why' },
    { name: 'Hung Up', description: 'Notes on art, pop culture, and the spaces between' },
  ],
  Politics: [
    { name: 'Popular Information', description: 'Accountability journalism for the public interest' },
    { name: 'Grid News', description: 'Policy and politics, clearly explained' },
    { name: 'The Ink', description: 'Writing on power, justice, and the world we share' },
  ],
  History: [
    { name: 'JSTOR Daily', description: 'Where current events meet their scholarly past' },
    { name: "Lapham's Quarterly", description: 'History as a lens on the present moment' },
    { name: 'The Conversation', description: 'Academic insight for the general reader' },
  ],
  Technology: [
    { name: 'Import AI', description: 'Essential intelligence on artificial intelligence' },
    { name: 'Platformer', description: 'Dispatches from the intersection of tech and democracy' },
    { name: 'The Diff', description: 'Inflections in finance and technology' },
  ],
  Nature: [
    { name: 'Hakai Magazine', description: 'Stories from the coast and the living sea' },
    { name: 'Yale Environment 360', description: 'Reporting and analysis on the global environment' },
  ],
  Economics: [
    { name: 'Slow Boring', description: 'Policy writing that takes the long view' },
    { name: 'Money Stuff', description: 'Finance, markets, and the absurdities therein' },
    { name: 'The Browser', description: 'Five remarkable articles, recommended daily' },
  ],
}

const TIER_COLORS: Record<string, string> = {
  H: '#1a1008',
  M: '#8b6f47',
  L: '#b8a080',
}

const TIER_LABELS: Record<string, string> = {
  H: 'Above the Fold',
  M: 'Below the Fold',
  L: 'Deep Section',
}

// --- Shared Styles ---

const headlineStyle: React.CSSProperties = {
  fontFamily: 'Cormorant SC, serif',
  color: '#1a1008',
  fontWeight: 700,
  fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
  margin: '0 0 0.5rem 0',
  lineHeight: 1.2,
  textAlign: 'center',
}

const subheadStyle: React.CSSProperties = {
  fontFamily: 'IM Fell English, serif',
  fontStyle: 'italic',
  color: '#8b6f47',
  fontSize: '0.9rem',
  textAlign: 'center',
  margin: '0 0 1.5rem 0',
}

const bodyStyle: React.CSSProperties = {
  fontFamily: 'IM Fell English, serif',
  fontStyle: 'italic',
  color: '#3d2b1a',
  fontSize: '0.95rem',
  lineHeight: 1.8,
}

const buttonStyle: React.CSSProperties = {
  fontFamily: 'Aleo, serif',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  fontSize: '0.8rem',
  padding: '0.7rem 2rem',
  border: '1px solid #1a1008',
  backgroundColor: '#1a1008',
  color: '#f5eed8',
  cursor: 'pointer',
}

const cardBase: React.CSSProperties = {
  backgroundColor: '#faf4e6',
  border: '1px solid #ede0c0',
  padding: '1rem',
  cursor: 'pointer',
  transition: 'all 150ms ease',
}

const cardSelected: React.CSSProperties = {
  ...cardBase,
  backgroundColor: '#ede0c0',
  border: '2px solid #1a1008',
}

const sectionDivider: React.CSSProperties = {
  height: '1px',
  background: 'linear-gradient(to right, transparent, #7a5c3a, transparent)',
  margin: '2rem 0',
}

// --- Component ---

export default function SettingsPage() {
  const [step, setStep] = useState(1)
  const [interests, setInterests] = useState<string[]>([])
  const [theme, setTheme] = useState('Romantic Victorian')
  const [newsletters, setNewsletters] = useState<Newsletter[]>([])
  const [manualName, setManualName] = useState('')
  const [manualTier, setManualTier] = useState<'H' | 'M' | 'L'>('M')
  const [manualNewsletters, setManualNewsletters] = useState<ManualNewsletter[]>([])
  const [modules, setModules] = useState<string[]>([])
  const [cadence, setCadence] = useState('weekly')

  function toggleInterest(interest: string) {
    setInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    )
  }

  function toggleModule(mod: string) {
    setModules(prev =>
      prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]
    )
  }

  function setCatalogTier(name: string, tier: 'H' | 'M' | 'L') {
    setNewsletters(prev => {
      const existing = prev.find(n => n.name === name)
      if (existing) {
        if (existing.tier === tier) {
          return prev.filter(n => n.name !== name)
        }
        return prev.map(n => n.name === name ? { ...n, tier } : n)
      }
      const desc = Object.values(CATALOG).flat().find(c => c.name === name)?.description || ''
      return [...prev, { name, description: desc, tier }]
    })
  }

  function getCatalogTier(name: string): 'H' | 'M' | 'L' | null {
    return newsletters.find(n => n.name === name)?.tier || null
  }

  function addManualNewsletter() {
    const trimmed = manualName.trim()
    if (!trimmed) return
    if (manualNewsletters.some(n => n.name === trimmed)) return
    setManualNewsletters(prev => [...prev, { name: trimmed, tier: manualTier }])
    setManualName('')
  }

  function removeManualNewsletter(name: string) {
    setManualNewsletters(prev => prev.filter(n => n.name !== name))
  }

  const allNewsletters = [
    ...newsletters.filter(n => n.tier !== null),
    ...manualNewsletters,
  ]

  const relevantCategories = Object.keys(CATALOG).filter(cat =>
    interests.length === 0 || interests.includes(cat)
  )

  // --- Step Renderers ---

  function renderStep1() {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'IM Fell English, serif',
          fontStyle: 'italic',
          color: '#8b6f47',
          textTransform: 'uppercase',
          fontSize: '0.72rem',
          margin: '0 0 0.5rem 0',
        }}>
          A Note from the Editor
        </p>
        <h2 style={headlineStyle}>On the Shape of This Publication</h2>
        <div style={sectionDivider} />
        <p style={{ ...bodyStyle, textAlign: 'left', margin: '0 0 2rem 0' }}>
          You are reading the first edition of The Morning Review. It will not scroll forever.
          It will not surface trending topics, measure your reactions, or algorithmically
          reshuffle itself while you sleep. It will simply arrive on a schedule you choose,
          composed, finite, and yours. This paper is assembled from newsletters you trust,
          organised by tiers you define. When you reach the colophon, you have finished. That
          is not a limitation. That is the entire point.
        </p>
        <button style={buttonStyle} onClick={() => setStep(2)}>
          Proceed to the Editorial Desk
        </button>
      </div>
    )
  }

  function renderStep2() {
    return (
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={headlineStyle}>What Moves You?</h2>
        <p style={subheadStyle}>Your interests shape your edition. Select all that apply.</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.75rem',
          marginBottom: '2rem',
        }}>
          {INTERESTS.map(interest => {
            const selected = interests.includes(interest)
            return (
              <div
                key={interest}
                onClick={() => toggleInterest(interest)}
                style={selected ? cardSelected : cardBase}
              >
                <p style={{
                  fontFamily: 'Aleo, serif',
                  fontWeight: 700,
                  color: '#1a1008',
                  fontSize: '0.85rem',
                  margin: 0,
                  textAlign: 'center',
                }}>
                  {interest}
                </p>
              </div>
            )
          })}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button style={buttonStyle} onClick={() => setStep(3)}>
            Continue
          </button>
        </div>
      </div>
    )
  }

  function renderStep3() {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={headlineStyle}>Choose Your Edition's Atmosphere</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.75rem',
          marginBottom: '2rem',
        }}>
          {THEMES.map(t => {
            const selected = theme === t
            return (
              <div
                key={t}
                onClick={() => setTheme(t)}
                style={selected ? cardSelected : cardBase}
              >
                <p style={{
                  fontFamily: 'Aleo, serif',
                  fontWeight: 700,
                  color: '#1a1008',
                  fontSize: '0.9rem',
                  margin: 0,
                  textAlign: 'center',
                }}>
                  {t}
                </p>
              </div>
            )
          })}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button style={buttonStyle} onClick={() => setStep(4)}>
            Continue
          </button>
        </div>
      </div>
    )
  }

  function renderStep4() {
    return (
      <div style={{ maxWidth: '750px', margin: '0 auto' }}>
        {/* Email Sync Banner */}
        <div style={{
          border: '2px dashed #8b6f47',
          backgroundColor: '#faf4e6',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
        }}>
          <p style={{
            ...bodyStyle,
            margin: '0 0 1rem 0',
            textAlign: 'center',
          }}>
            Subscribers may connect their email inbox to import newsletters automatically.
            This feature is coming soon.
          </p>
          <div style={{ textAlign: 'center' }}>
            <button style={{
              fontFamily: 'Aleo, serif',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontSize: '0.75rem',
              padding: '0.5rem 1.5rem',
              border: '1px solid #c0b090',
              backgroundColor: '#e0d8c4',
              color: '#a09080',
              cursor: 'not-allowed',
            }} disabled>
              Connect Email Inbox
            </button>
          </div>
        </div>

        {/* Catalog */}
        <h2 style={headlineStyle}>Dispatches Available for Subscription</h2>
        <div style={sectionDivider} />

        {relevantCategories.map(category => (
          <div key={category} style={{ marginBottom: '1.5rem' }}>
            <h3 style={{
              fontFamily: 'Cormorant SC, serif',
              color: '#8b6f47',
              fontWeight: 600,
              fontSize: '1.1rem',
              margin: '0 0 0.75rem 0',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              {category}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '0.75rem',
            }}>
              {CATALOG[category].map(nl => {
                const currentTier = getCatalogTier(nl.name)
                return (
                  <div key={nl.name} style={{
                    ...cardBase,
                    cursor: 'default',
                    borderColor: currentTier ? TIER_COLORS[currentTier] : '#ede0c0',
                    borderWidth: currentTier ? '2px' : '1px',
                  }}>
                    <p style={{
                      fontFamily: 'Aleo, serif',
                      fontWeight: 700,
                      color: '#1a1008',
                      fontSize: '0.85rem',
                      margin: '0 0 0.25rem 0',
                    }}>
                      {nl.name}
                    </p>
                    <p style={{
                      fontFamily: 'IM Fell English, serif',
                      fontStyle: 'italic',
                      color: '#8b6f47',
                      fontSize: '0.75rem',
                      margin: '0 0 0.75rem 0',
                      lineHeight: 1.5,
                    }}>
                      {nl.description}
                    </p>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {(['H', 'M', 'L'] as const).map(tier => {
                        const active = currentTier === tier
                        return (
                          <button
                            key={tier}
                            onClick={() => setCatalogTier(nl.name, tier)}
                            style={{
                              fontFamily: 'Aleo, serif',
                              fontWeight: 700,
                              fontSize: '0.7rem',
                              padding: '0.3rem 0.6rem',
                              border: `1px solid ${TIER_COLORS[tier]}`,
                              backgroundColor: active ? TIER_COLORS[tier] : 'transparent',
                              color: active ? '#f5eed8' : TIER_COLORS[tier],
                              cursor: 'pointer',
                            }}
                            title={TIER_LABELS[tier]}
                          >
                            {tier}
                          </button>
                        )
                      })}
                    </div>
                    {currentTier && (
                      <p style={{
                        fontFamily: 'IM Fell English, serif',
                        fontStyle: 'italic',
                        fontSize: '0.65rem',
                        color: TIER_COLORS[currentTier],
                        margin: '0.4rem 0 0 0',
                      }}>
                        Assigned to {TIER_LABELS[currentTier]}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Manual Add */}
        <div style={sectionDivider} />
        <h3 style={{
          fontFamily: 'Cormorant SC, serif',
          color: '#1a1008',
          fontWeight: 600,
          fontSize: '1rem',
          margin: '0 0 0.75rem 0',
        }}>
          Add a Newsletter Not Listed Above
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          <input
            type="text"
            value={manualName}
            onChange={e => setManualName(e.target.value)}
            placeholder="Newsletter name"
            onKeyDown={e => { if (e.key === 'Enter') addManualNewsletter() }}
            style={{
              fontFamily: 'Aleo, serif',
              fontSize: '0.8rem',
              padding: '0.5rem 0.75rem',
              border: '1px solid #8b6f47',
              backgroundColor: '#faf4e6',
              color: '#1a1008',
              flex: 1,
              minWidth: '180px',
            }}
          />
          <select
            value={manualTier}
            onChange={e => setManualTier(e.target.value as 'H' | 'M' | 'L')}
            style={{
              fontFamily: 'Aleo, serif',
              fontSize: '0.8rem',
              padding: '0.5rem',
              border: '1px solid #8b6f47',
              backgroundColor: '#faf4e6',
              color: '#1a1008',
            }}
          >
            <option value="H">H - Above the Fold</option>
            <option value="M">M - Below the Fold</option>
            <option value="L">L - Deep Section</option>
          </select>
          <button onClick={addManualNewsletter} style={{
            ...buttonStyle,
            padding: '0.5rem 1rem',
            fontSize: '0.75rem',
          }}>
            Add
          </button>
        </div>
        {manualNewsletters.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
            {manualNewsletters.map(nl => (
              <div key={nl.name} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.4rem 0.75rem',
                backgroundColor: '#faf4e6',
                border: '1px solid #ede0c0',
              }}>
                <span style={{
                  fontFamily: 'Aleo, serif',
                  fontSize: '0.8rem',
                  color: '#1a1008',
                }}>
                  {nl.name}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    fontFamily: 'Aleo, serif',
                    fontSize: '0.7rem',
                    color: TIER_COLORS[nl.tier],
                    fontWeight: 700,
                  }}>
                    {nl.tier}
                  </span>
                  <button
                    onClick={() => removeManualNewsletter(nl.name)}
                    style={{
                      fontFamily: 'Aleo, serif',
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.5rem',
                      border: '1px solid #8b6f47',
                      backgroundColor: 'transparent',
                      color: '#8b6f47',
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button style={buttonStyle} onClick={() => setStep(5)}>
            Continue
          </button>
        </div>
      </div>
    )
  }

  function renderStep5() {
    return (
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={headlineStyle}>Select Your Daily Supplements</h2>
        <div style={sectionDivider} />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.75rem',
          marginBottom: '2rem',
        }}>
          {MODULES.map(mod => {
            const selected = modules.includes(mod.name)
            return (
              <div
                key={mod.name}
                onClick={() => toggleModule(mod.name)}
                style={selected ? cardSelected : cardBase}
              >
                <p style={{
                  fontFamily: 'Aleo, serif',
                  fontWeight: 700,
                  color: '#1a1008',
                  fontSize: '0.85rem',
                  margin: '0 0 0.25rem 0',
                }}>
                  {mod.name}
                </p>
                <p style={{
                  fontFamily: 'IM Fell English, serif',
                  fontStyle: 'italic',
                  color: '#8b6f47',
                  fontSize: '0.75rem',
                  margin: 0,
                  lineHeight: 1.5,
                }}>
                  {mod.description}
                </p>
              </div>
            )
          })}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button style={buttonStyle} onClick={() => setStep(6)}>
            Continue
          </button>
        </div>
      </div>
    )
  }

  function renderStep6() {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={headlineStyle}>Choose Your Cadence</h2>
        <div style={sectionDivider} />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          marginBottom: '2rem',
        }}>
          {CADENCES.map(c => {
            const selected = cadence === c.value
            return (
              <div
                key={c.value}
                onClick={() => setCadence(c.value)}
                style={{
                  ...(selected ? cardSelected : cardBase),
                  textAlign: 'center',
                  padding: '1.25rem',
                }}
              >
                <p style={{
                  fontFamily: 'Aleo, serif',
                  fontWeight: 700,
                  color: '#1a1008',
                  fontSize: '1rem',
                  margin: 0,
                }}>
                  {c.label}
                </p>
                {'recommended' in c && c.recommended && (
                  <p style={{
                    fontFamily: 'IM Fell English, serif',
                    fontStyle: 'italic',
                    color: '#8b6f47',
                    fontSize: '0.72rem',
                    margin: '0.25rem 0 0 0',
                  }}>
                    Recommended
                  </p>
                )}
              </div>
            )
          })}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button style={buttonStyle} onClick={() => setStep(7)}>
            Continue
          </button>
        </div>
      </div>
    )
  }

  function renderStep7() {
    const tierH = allNewsletters.filter(n => n.tier === 'H')
    const tierM = allNewsletters.filter(n => n.tier === 'M')
    const tierL = allNewsletters.filter(n => n.tier === 'L')

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={headlineStyle}>Your Edition at a Glance</h2>
        <div style={sectionDivider} />

        {/* Newsletters by tier */}
        <h3 style={{
          fontFamily: 'Cormorant SC, serif',
          color: '#1a1008',
          fontWeight: 600,
          fontSize: '1rem',
          margin: '0 0 0.5rem 0',
        }}>
          Dispatches
        </h3>
        {allNewsletters.length === 0 ? (
          <p style={{ ...bodyStyle, margin: '0 0 1rem 0' }}>No newsletters selected.</p>
        ) : (
          <div style={{ marginBottom: '1rem' }}>
            {tierH.length > 0 && (
              <div style={{ marginBottom: '0.5rem' }}>
                <p style={{
                  fontFamily: 'Aleo, serif',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  color: TIER_COLORS.H,
                  margin: '0 0 0.25rem 0',
                  textTransform: 'uppercase',
                }}>
                  Above the Fold
                </p>
                {tierH.map(n => (
                  <p key={n.name} style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: '#3d2b1a', fontSize: '0.85rem', margin: '0 0 0.15rem 0.75rem' }}>
                    {n.name}
                  </p>
                ))}
              </div>
            )}
            {tierM.length > 0 && (
              <div style={{ marginBottom: '0.5rem' }}>
                <p style={{
                  fontFamily: 'Aleo, serif',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  color: TIER_COLORS.M,
                  margin: '0 0 0.25rem 0',
                  textTransform: 'uppercase',
                }}>
                  Below the Fold
                </p>
                {tierM.map(n => (
                  <p key={n.name} style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: '#3d2b1a', fontSize: '0.85rem', margin: '0 0 0.15rem 0.75rem' }}>
                    {n.name}
                  </p>
                ))}
              </div>
            )}
            {tierL.length > 0 && (
              <div style={{ marginBottom: '0.5rem' }}>
                <p style={{
                  fontFamily: 'Aleo, serif',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  color: TIER_COLORS.L,
                  margin: '0 0 0.25rem 0',
                  textTransform: 'uppercase',
                }}>
                  Deep Section
                </p>
                {tierL.map(n => (
                  <p key={n.name} style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: '#3d2b1a', fontSize: '0.85rem', margin: '0 0 0.15rem 0.75rem' }}>
                    {n.name}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={sectionDivider} />

        {/* Theme */}
        <div style={{ marginBottom: '1rem' }}>
          <p style={{
            fontFamily: 'Aleo, serif',
            fontWeight: 700,
            fontSize: '0.75rem',
            color: '#1a1008',
            margin: '0 0 0.25rem 0',
            textTransform: 'uppercase',
          }}>
            Theme
          </p>
          <p style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: '#3d2b1a', fontSize: '0.85rem', margin: 0 }}>
            {theme}
          </p>
        </div>

        {/* Modules */}
        <div style={{ marginBottom: '1rem' }}>
          <p style={{
            fontFamily: 'Aleo, serif',
            fontWeight: 700,
            fontSize: '0.75rem',
            color: '#1a1008',
            margin: '0 0 0.25rem 0',
            textTransform: 'uppercase',
          }}>
            Supplements
          </p>
          {modules.length === 0 ? (
            <p style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: '#3d2b1a', fontSize: '0.85rem', margin: 0 }}>
              None selected.
            </p>
          ) : (
            modules.map(m => (
              <p key={m} style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: '#3d2b1a', fontSize: '0.85rem', margin: '0 0 0.15rem 0.75rem' }}>
                {m}
              </p>
            ))
          )}
        </div>

        {/* Cadence */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{
            fontFamily: 'Aleo, serif',
            fontWeight: 700,
            fontSize: '0.75rem',
            color: '#1a1008',
            margin: '0 0 0.25rem 0',
            textTransform: 'uppercase',
          }}>
            Cadence
          </p>
          <p style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: '#3d2b1a', fontSize: '0.85rem', margin: 0 }}>
            {CADENCES.find(c => c.value === cadence)?.label}
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button style={buttonStyle} onClick={() => setStep(8)}>
            Assemble My First Edition
          </button>
        </div>
      </div>
    )
  }

  function renderStep8() {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
        <Masthead />
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}>
          <p style={{
            ...bodyStyle,
            fontSize: '1.1rem',
            textAlign: 'center',
            maxWidth: '400px',
          }}>
            The press is running. Your edition is being assembled.
          </p>
        </div>
        <div style={{
          borderTop: '2px solid #1a1008',
          textAlign: 'center',
          padding: '1.25rem 0 1rem',
          fontFamily: 'IM Fell English, serif',
          color: '#8b6f47',
          fontStyle: 'italic',
          fontSize: '0.65rem',
        }}>
          The Morning Review is published in finite edition. When you reach this line, you have finished the paper. There is nothing more to scroll.
        </div>
      </div>
    )
  }

  // --- Main Render ---

  return (
    <div style={{ backgroundColor: '#f5eed8', minHeight: '100vh' }}>
      {step < 8 && (
        <div style={{ padding: '2rem 2rem 0' }}>
          <p style={{
            fontFamily: 'Cormorant SC, serif',
            color: '#1a1008',
            fontWeight: 700,
            fontSize: '1.3rem',
            textAlign: 'center',
            margin: '0 0 0.25rem 0',
          }}>
            The Morning Review
          </p>
          <p style={{
            fontFamily: 'IM Fell English, serif',
            fontStyle: 'italic',
            color: '#8b6f47',
            fontSize: '0.7rem',
            textAlign: 'center',
            margin: '0 0 0.5rem 0',
          }}>
            Editorial Desk
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
          }}>
            {[1, 2, 3, 4, 5, 6, 7].map(s => (
              <div key={s} style={{
                width: '2rem',
                height: '3px',
                backgroundColor: s <= step ? '#1a1008' : '#ede0c0',
                transition: 'background-color 300ms ease',
              }} />
            ))}
          </div>
        </div>
      )}
      <div style={{ padding: step < 8 ? '0 2rem 3rem' : '0' }}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
        {step === 6 && renderStep6()}
        {step === 7 && renderStep7()}
        {step === 8 && renderStep8()}
      </div>
    </div>
  )
}
