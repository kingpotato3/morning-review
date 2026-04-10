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

interface Article {
  kicker: string
  title: string
  byline: string
  body: string
}

function LeadArticle({ kicker, title, byline, body }: Article) {
  return (
    <div style={{ paddingBottom: '1rem' }}>
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
      <p style={{ fontFamily: 'IM Fell English, serif', color: '#8b6f47', fontStyle: 'italic', textTransform: 'uppercase', fontSize: '0.68rem', margin: '0 0 0.3rem 0' }}>
        {kicker}
      </p>
      <h2 style={{ fontFamily: 'Marcellus, serif', color: '#1a1008', fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)', margin: '0 0 0.3rem 0', lineHeight: 1.2 }}>
        {title}
      </h2>
      <p style={{ fontFamily: 'IM Fell English, serif', color: '#8b6f47', fontStyle: 'italic', fontSize: '0.65rem', margin: '0 0 0.5rem 0' }}>
        {byline}
      </p>
      <p style={{ fontFamily: 'DM Serif Display, serif', color: '#3d2b1a', fontSize: '0.82rem', lineHeight: 1.7, margin: 0 }}>
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
        <p style={{ fontFamily: 'IM Fell English, serif', color: '#8b6f47', fontStyle: 'italic', textTransform: 'uppercase', fontSize: '0.65rem', margin: '0 0 0.25rem 0' }}>
          {kicker}
        </p>
        <h2 style={{ fontFamily: 'Marcellus, serif', color: '#1a1008', fontSize: '0.9rem', margin: '0 0 0.25rem 0', lineHeight: 1.2 }}>
          {title}
        </h2>
        <p style={{ fontFamily: 'IM Fell English, serif', color: '#8b6f47', fontStyle: 'italic', fontSize: '0.65rem', margin: '0 0 0.5rem 0' }}>
          {byline}
        </p>
        <p style={{ fontFamily: 'DM Serif Display, serif', color: '#3d2b1a', fontSize: '0.82rem', lineHeight: 1.7, margin: 0 }}>
          {body}
        </p>
      </div>
    </div>
  )
}

export default function Home() {
  const [editionOpen, setEditionOpen] = useState(false)
  const [coverFolding, setCoverFolding] = useState(false)
  const [coverGone, setCoverGone] = useState(false)

  function handleOpen() {
    setCoverFolding(true)
    setTimeout(() => {
      setCoverGone(true)
      setEditionOpen(true)
    }, 800)
  }

  return (
    <div style={{ backgroundColor: '#f5eed8', minHeight: '100vh', perspective: '1200px' }}>
      {!coverGone && (
        <div
          style={{
            position: coverFolding ? 'fixed' : 'relative',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transformOrigin: 'left center',
            transform: coverFolding ? 'rotateY(-20deg)' : 'rotateY(0deg)',
            opacity: coverFolding ? 0 : 1,
            transition: 'transform 800ms ease-in-out, opacity 800ms ease-in-out',
            zIndex: 10,
            backfaceVisibility: 'hidden',
          }}
        >
          <CoverPage onOpen={handleOpen} />
        </div>
      )}

      <PageTurn visible={editionOpen}>
        <Masthead />

        <div style={{ padding: '1.5rem 2rem' }}>
          <LeadArticle
            kicker="On This Publication"
            title="What The Morning Review Is, & What It Intends to Become"
            byline="By the Editor"
            body="The Morning Review is a personalised daily newspaper — a single, finite edition delivered each morning, written in the voice of a Victorian broadsheet but populated with the things that actually matter to you. Real news, current weather, your calendar, your own writing, things you are tracking. It is built on the belief that the morning deserves intention, and that the best way to start a day is to sit down with something that was made for you specifically."
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <MidArticle
              kicker="On the Matter of Creativity"
              title="The Need, the Urge, the Yearning — A Correspondent Writes"
              byline="By Reid Babino"
              body="There is a throughline from the person who pressed a hand against a cave wall and traced the outline, to the Romans who carved I was here into stone in graffiti bold enough to survive two thousand years, to the thirty thousand writers currently finishing the thing they have been trying to say. The need, the ideas, the visceral urge, the words — it is all still there, and just as loud as it has ever been. What has changed is that time and focus have become commodities most of us cannot access anymore. But the need is programmed into us as part of the human condition: to create, to be expressive, to shout it from the rooftops. The yearning does not go anywhere just because our resources are stretched thin."
            />
            <MidArticle
              kicker="Correspondent's Profile"
              title="On the Editor Herself, Her Habits & Preoccupations"
              byline="From Our Staff"
              body="Reid Babino is a writer, operator, and builder based in Beaumont, Texas. She has completed a novel and a collection of poetry, both presently moving through the publishing process. When she is not running events at an art museum or building applications at odd hours of the night, she is designing worlds for other people to inhabit — as a dungeon master, a narrative designer, and a person who believes that a good story, told well, is one of the few things that has always mattered."
            />
          </div>

          <div style={{ borderTop: '1px dashed #8b6f47', margin: '1rem 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <LowArticle
              numeral="I"
              kicker="On the Craft"
              title="A Note on the Trellis & the Plant"
              byline="From the Editorial Office"
              body="Artificial intelligence ought to be the trellis, not the plant — the scaffolding that lets a person grow taller and reach places they could not get to on their own. Fully generated words are not respectful of the human spirit. But helping a human spirit finish the thing it has been trying to say for years? That is worth building something around. It is personal and universal and prehistoric and inherently human."
            />
            <LowArticle
              numeral="II"
              kicker="Dispatches & Technology"
              title="This Application, Its Architecture & Its Intentions"
              byline="From the Technical Desk"
              body="The Morning Review is built in Next.js and styled entirely in the Victorian broadsheet tradition — Cormorant SC for the masthead, IM Fell English for editorial voice, DM Serif Display for body copy. It is designed to be personalised: future editions will pull from live news, weather, calendar data, and the reader's own writing. The cover page animates open on tap. The date updates itself each morning. The paper ends when you reach the bottom, and there is nothing more to scroll."
            />
            <LowArticle
              numeral="III"
              kicker="From the Weather Desk"
              title="Fair Skies Expected Through the Fortnight"
              byline="From the Observatory"
              body="Conditions remain favorable across the region. Those with business in the open air are advised to proceed with their ordinary plans and to carry no unnecessary burdens."
            />
          </div>

          <div
            style={{
              borderTop: '2px solid #1a1008',
              textAlign: 'center',
              padding: '1.25rem 0 1rem',
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
