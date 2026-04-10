function getVictorianDate(): string {
  const now = new Date()
  const day = now.getDate()
  const month = now.toLocaleString('en-GB', { month: 'long' })
  const year = now.getFullYear()
  const weekday = now.toLocaleString('en-GB', { weekday: 'long' })
  const ordinal = (n: number) => {
    if (n >= 11 && n <= 13) return `${n}th`
    switch (n % 10) {
      case 1: return `${n}st`
      case 2: return `${n}nd`
      case 3: return `${n}rd`
      default: return `${n}th`
    }
  }
  return `${weekday}, ${ordinal(day)} ${month} ${year}`
}

const metaStyle: React.CSSProperties = {
  fontFamily: 'IM Fell English, serif',
  fontStyle: 'italic',
  fontSize: '0.68rem',
  color: '#8b6f47',
  margin: 0,
}

export default function Masthead() {
  return (
    <header style={{ backgroundColor: '#f5eed8', padding: '0.5rem 1.5rem 0' }}>
      <div
        style={{
          borderTop: '2px solid #1a1008',
          borderBottom: '1px solid #8b6f47',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.25rem 0',
        }}
      >
        <p style={metaStyle}>{getVictorianDate()}</p>
        <p style={metaStyle}>Price: One Penny</p>
      </div>

      <h1
        style={{
          fontFamily: 'Cormorant SC, serif',
          color: '#1a1008',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
          textAlign: 'center',
          margin: '0.4rem 0',
          lineHeight: 1.1,
        }}
      >
        The Morning Review
      </h1>

      <div
        style={{
          borderTop: '1px solid #8b6f47',
          borderBottom: '2px solid #1a1008',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.25rem 0',
        }}
      >
        <p style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', fontSize: '0.7rem', color: '#3d2b1a', margin: 0 }}>{new Date().toLocaleString('en-GB', { weekday: 'long' })} Edition - Volume I</p>
        <p style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', fontSize: '0.7rem', color: '#3d2b1a', margin: 0 }}>Beaumont, Texas</p>
        <p style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', fontSize: '0.7rem', color: '#3d2b1a', margin: 0 }}>Est. MMXXVI</p>
      </div>
    </header>
  )
}
