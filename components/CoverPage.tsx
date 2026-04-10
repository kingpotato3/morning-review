function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

interface CoverPageProps {
  onOpen: () => void
}

const gradientRule = (
  <div
    style={{
      height: '1px',
      background: 'linear-gradient(to right, transparent, #7a5c3a, transparent)',
      margin: '1rem 0',
    }}
  />
)

export default function CoverPage({ onOpen }: CoverPageProps) {
  return (
    <div
      onClick={onOpen}
      style={{
        backgroundColor: '#f5eed8',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '3rem 2rem',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'Marcellus, serif',
            color: '#8b6f47',
            letterSpacing: '0.5rem',
            fontSize: '1rem',
            margin: '0 0 1rem 0',
          }}
        >
          ❧ ✦ ❧
        </p>

        {gradientRule}

        <p
          style={{
            fontFamily: 'Marcellus, serif',
            color: '#8b6f47',
            letterSpacing: '0.15em',
            fontSize: '0.85rem',
            margin: '0 0 0.5rem 0',
          }}
        >
          {getGreeting()}
        </p>

        <h1
          style={{
            fontFamily: 'Cormorant SC, serif',
            color: '#1a1008',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
            margin: '0 0 0.5rem 0',
            lineHeight: 1.1,
          }}
        >
          The Morning Review
        </h1>

        <p
          style={{
            fontFamily: 'IM Fell English, serif',
            color: '#8b6f47',
            fontStyle: 'italic',
            letterSpacing: '0.15em',
            fontSize: '0.72rem',
            margin: 0,
          }}
        >
          Est. MMXXVI
        </p>

        {gradientRule}

        <p
          style={{
            fontFamily: 'DM Serif Display, serif',
            color: '#3d2b1a',
            fontStyle: 'italic',
            fontSize: '0.88rem',
            lineHeight: 1.75,
            maxWidth: '320px',
            margin: '0 auto',
          }}
        >
          Friends, Romans, countrymen, lend me your ears.
        </p>

        {gradientRule}

        <p
          style={{
            fontFamily: 'Marcellus, serif',
            color: '#8b6f47',
            letterSpacing: '0.2em',
            fontSize: '0.72rem',
            margin: 0,
          }}
        >
          Sunday Edition - Volume I
        </p>
      </div>

      <p
        style={{
          fontFamily: 'IM Fell English, serif',
          position: 'absolute',
          bottom: '2rem',
          left: 0,
          right: 0,
          textAlign: 'center',
          color: '#8b6f47',
          fontStyle: 'italic',
          fontSize: '0.7rem',
          opacity: 0.7,
          margin: 0,
        }}
      >
        tap anywhere to open your edition
      </p>
    </div>
  )
}
