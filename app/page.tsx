'use client'

import { useState } from 'react'
import CoverPage from '../components/CoverPage'
import PageTurn from '../components/PageTurn'
import Masthead from '../components/Masthead'

const sepiaDivider = (
  <div
    style={{
      height: '1px',
      background: 'linear-gradient(to right, transparent, #7a5c3a, transparent)',
      margin: '1rem 0',
    }}
  />
)

function SectionLabel({ text }: { text: string }) {
  return (
    <p
      style={{
        fontFamily: 'Marcellus, serif',
        color: '#8b6f47',
        textTransform: 'uppercase',
        letterSpacing: '0.25rem',
        fontSize: '0.62rem',
        margin: '0 0 0.75rem 0',
      }}
    >
      {text}
    </p>
  )
}

interface Article {
  kicker: string
  title: string
  byline: string
  body: string
}

function LeadArticle({ kicker, title, byline, body }: Article) {
  return (
    <div style={{ borderBottom: '1px solid #ede0c0', paddingBottom: '1rem', marginBottom: '1rem' }}>
      <p style={{ fontFamily: 'IM Fell English, serif', color: '#8b6f47', fontStyle: 'italic', textTransform: 'uppercase', fontSize: '0.72rem', margin: '0 0 0.3rem 0' }}>
        {kicker}
      </p>
      <h2 style={{ fontFamily: 'Marcellus, serif', color: '#1a1008', fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', margin: '0 0 0.3rem 0', lineHeight: 1.2 }}>
        {title}
      </h2>
      <p style={{ fontFamily: 'IM Fell English, serif', color: '#8b6f47', fontStyle: 'italic', fontSize: '0.7rem', margin: '0 0 0.75rem 0' }}>
        {byline}
      </p>
      <p style={{ fontFamily: 'DM Serif Display, serif', color: '#3d2b1a', fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>
        {body}
      </p>
    </div>
  )
}

function MidArticle({ kicker, title, byline, body }: Article) {
  return (
    <div style={{ borderLeft: '2px solid #ede0c0', paddingLeft: '0.75rem' }}>
      <p style={{ fontFamily: 'IM Fell English, serif', color: '#8b6f47', fontStyle: 'italic', textTransform: 'uppercase', fontSize: '0.72rem', margin: '0 0 0.3rem 0' }}>
        {kicker}
      </p>
      <h2 style={{ fontFamily: 'Marcellus, serif', color: '#1a1008', fontSize: 'clamp(1rem, 3vw, 1.3rem)', margin: '0 0 0.3rem 0', lineHeight: 1.2 }}>
        {title}
      </h2>
      <p style={{ fontFamily: 'IM Fell English, serif', color: '#8b6f47', fontStyle: 'italic', fontSize: '0.7rem', margin: '0 0 0.5rem 0' }}>
        {byline}
      </p>
      <p style={{ fontFamily: 'DM Serif Display, serif', color: '#3d2b1a', fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>
        {body}
      </p>
    </div>
  )
}

function LowArticle({ kicker, title, byline, body, numeral }: Article & { numeral: string }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
      <span style={{ fontFamily: 'Marcellus, serif', color: '#ede0c0', fontSize: '1.8rem', lineHeight: 1, flexShrink: 0 }}>
        {numeral}
      </span>
      <div>
        <p style={{ fontFamily: 'IM Fell English, serif', color: '#8b6f47', fontStyle: 'italic', textTransform: 'uppercase', fontSize: '0.72rem', margin: '0 0 0.25rem 0' }}>
          {kicker}
        </p>
        <h2 style={{ fontFamily: 'Marcellus, serif', color: '#1a1008', fontSize: '1rem', margin: '0 0 0.25rem 0', lineHeight: 1.2 }}>
          {title}
        </h2>
        <p style={{ fontFamily: 'IM Fell English, serif', color: '#8b6f47', fontStyle: 'italic', fontSize: '0.7rem', margin: '0 0 0.5rem 0' }}>
          {byline}
        </p>
        <p style={{ fontFamily: 'DM Serif Display, serif', color: '#3d2b1a', fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>
          {body}
        </p>
      </div>
    </div>
  )
}

export default function Home() {
  const [editionOpen, setEditionOpen] = useState(false)

  return (
    <div style={{ backgroundColor: '#f5eed8', minHeight: '100vh' }}>
      {!editionOpen && <CoverPage onOpen={() => setEditionOpen(true)} />}

      <PageTurn visible={editionOpen}>
        <Masthead />

        <div style={{ padding: '1.5rem 2rem' }}>
          <SectionLabel text="Above the Fold - First Dispatch" />
          <LeadArticle
            kicker="World Affairs"
            title="The Long Road to a Quieter World"
            byline="By a Staff Correspondent"
            body="For years the drumbeat of uncertainty has set the pace of daily life. Yet this morning brings with it a stillness that is not absence but arrival. Diplomats have gathered. Words, carefully chosen, have been spoken. Whether they will hold is a question only time may answer, but for now the air carries something resembling hope."
          />

          {sepiaDivider}

          <SectionLabel text="Below the Fold - Second Tier Dispatches" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <MidArticle
              kicker="Science"
              title="Researchers Find Patterns in the Noise"
              byline="By a Science Correspondent"
              body="A team working quietly in a university laboratory has identified what they believe to be a repeating structure hidden within data long considered random. The implications, if the finding holds, may reach further than anyone currently dares to say."
            />
            <MidArticle
              kicker="Culture"
              title="A Small Theater Refuses to Close"
              byline="By an Arts Reporter"
              body="Despite dwindling attendance and rising costs, the proprietors of a century-old playhouse have chosen to press on. They cite not stubbornness but obligation. The building has seen harder times, they say, and so have the people who come to sit in it."
            />
          </div>

          {sepiaDivider}

          <SectionLabel text="Deep Section - Lower Correspondence" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <LowArticle
              numeral="I"
              kicker="Letters"
              title="On the Habit of Reading Before Noon"
              byline="Submitted by a Reader"
              body="There is a particular quality of mind that arrives only in the morning hours, before the world has made its full demands. I have found no better use of it than the printed page."
            />
            <LowArticle
              numeral="II"
              kicker="Markets"
              title="Grain Prices Hold Steady Through the Week"
              byline="From Our Commercial Desk"
              body="Traders report little movement across the major exchanges. A cautious optimism prevails among those who have waited long enough to know that patience is itself a strategy."
            />
            <LowArticle
              numeral="III"
              kicker="Weather"
              title="Fair Skies Expected Through the Fortnight"
              byline="From the Observatory"
              body="Conditions remain favorable across the region. Those with business in the open air are advised to proceed with their ordinary plans and to carry no unnecessary burdens."
            />
          </div>

          {sepiaDivider}

          <div
            style={{
              borderTop: '2px solid #1a1008',
              textAlign: 'center',
              paddingTop: '0.75rem',
              fontFamily: 'IM Fell English, serif',
              color: '#8b6f47',
              fontStyle: 'italic',
              fontSize: '0.65rem',
            }}
          >
            The Morning Review is published in finite edition. When you reach this line, you have finished the paper. There is nothing more to scroll.
          </div>
        </div>
      </PageTurn>
    </div>
  )
}
