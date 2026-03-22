interface ArticleCardProps {
  title: string
  kicker: string
  byline: string
  body: string
  tier: 'HIGH' | 'MID' | 'LOW'
}

const titleSize: Record<ArticleCardProps['tier'], string> = {
  HIGH: '2rem',
  MID: '1.5rem',
  LOW: '1.15rem',
}

export default function ArticleCard({ title, kicker, byline, body, tier }: ArticleCardProps) {
  return (
    <div
      style={{
        backgroundColor: '#faf4e6',
        padding: '1.5rem',
      }}
    >
      <p
        style={{
          fontFamily: 'IM Fell English, serif',
          color: '#8b6f47',
          fontStyle: 'italic',
          textTransform: 'uppercase',
          fontSize: '0.8rem',
          letterSpacing: '0.08em',
          margin: '0 0 0.4rem 0',
        }}
      >
        {kicker}
      </p>

      <h2
        style={{
          fontFamily: 'Aleo, serif',
          color: '#1a1008',
          fontWeight: 700,
          fontSize: titleSize[tier],
          margin: '0 0 0.5rem 0',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>

      <p
        style={{
          fontFamily: 'IM Fell English, serif',
          color: '#8b6f47',
          fontStyle: 'italic',
          fontSize: '0.8rem',
          margin: '0 0 1rem 0',
        }}
      >
        {byline}
      </p>

      <p
        style={{
          fontFamily: 'DM Serif Display, serif',
          color: '#3d2b1a',
          fontSize: '1rem',
          lineHeight: 1.75,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  )
}
