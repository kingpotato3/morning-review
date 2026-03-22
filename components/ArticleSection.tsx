interface ArticleSectionProps {
  label: string
  children: React.ReactNode
}

export default function ArticleSection({ label, children }: ArticleSectionProps) {
  return (
    <section style={{ backgroundColor: '#faf4e6' }}>
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid #8b6f47',
          margin: 0,
        }}
      />
      <p
        style={{
          fontFamily: 'Aleo, serif',
          fontWeight: 400,
          color: '#8b6f47',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontSize: '0.75rem',
          margin: '0.6rem 0',
        }}
      >
        {label}
      </p>
      {children}
    </section>
  )
}
