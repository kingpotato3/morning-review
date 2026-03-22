interface PageTurnProps {
  visible: boolean
  children: React.ReactNode
}

export default function PageTurn({ visible, children }: PageTurnProps) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 450ms ease-in-out',
      }}
    >
      {children}
    </div>
  )
}
