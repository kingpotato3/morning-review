'use client'

import { useState, useEffect } from 'react'
import CoverPage from '../components/CoverPage'
import PageTurn from '../components/PageTurn'
import Masthead from '../components/Masthead'

interface Article {
  kicker: string
  title: string
  byline: string
  body: string
}

function LeadArticle({ kicker, title, byline, body }: Article) {
  return (
    <div style={{ paddingBottom: '1rem' }}>
      <p style={{ fontFamily: 'IM Fell English, serif', color: '#8b6f47', fontStyle: 'italic', fontWeight: 'bold', fontSize: '0.72rem', margin: '0 0 0.3rem 0' }}>
        {kicker}
      </p>
      <h2 style={{ fontFamily: 'Marcellus, serif', color: '#1a1008', fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', margin: '0 0 0.3rem 0', lineHeight: 1.2 }}>
        {title}
      </h2>
      <p style={{ fontFamily: 'IM Fell English, serif', color: '#8b6f47', fontStyle: 'italic', fontSize: '0.7rem', margin: '0 0 0.75rem 0' }}>
        {byline}
      </p>
      <p style={{ fontFamily: 'DM Serif Display, serif', color: '#3d2b1a', fontSize: '1.1rem', lineHeight: 1.75, margin: 0 }}>
        {body}
      </p>
    </div>
  )
}

function MidArticle({ kicker, title, byline, body }: Article) {
  return (
    <div style={{ borderLeft: '2px solid #ede0c0', paddingLeft: '0.75rem' }}>
      <p style={{ fontFamily: 'IM Fell English, serif', color: '#8b6f47', fontStyle: 'italic', fontWeight: 'bold', fontSize: '0.68rem', margin: '0 0 0.3rem 0' }}>
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
        <p style={{ fontFamily: 'IM Fell English, serif', color: '#8b6f47', fontStyle: 'italic', fontWeight: 'bold', fontSize: '0.65rem', margin: '0 0 0.25rem 0' }}>
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
  const [weather, setWeather] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://wttr.in/Beaumont,Texas?format=j1')
      .then(r => r.json())
      .then(data => {
        const temp = data.current_condition[0].temp_F
        const desc = data.current_condition[0].weatherDesc[0].value.toLowerCase()
        const feels = data.current_condition[0].FeelsLikeF
        setWeather(`The instruments report ${temp}°F and ${desc} across the region, with conditions feeling closer to ${feels}°F to those abroad in the open air. Those with business outdoors are advised to dress accordingly and proceed with their ordinary plans.`)
      })
      .catch(() => setWeather('Conditions remain favorable across the region. Those with business in the open air are advised to proceed with their ordinary plans and to carry no unnecessary burdens.'))
  }, [])

  function handleOpen() {
    setCoverFolding(true)
    setTimeout(() => {
      setCoverGone(true)
      setEditionOpen(true)
    }, 800)
  }

  return (
    <div style={{ backgroundColor: '#f5eed8', minHeight: '100vh', perspective: '1200px', overflow: coverGone ? 'visible' : 'hidden', height: coverGone ? 'auto' : '100vh' }}>
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
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', paddingBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <LeadArticle
                kicker="On This Publication"
                title="What The Morning Review Is, & What It Intends to Become"
                byline="By the Editor"
                body="The Morning Review started as an inbox problem. You know the one: subscriptions you meant to read, newsletters you love in theory, news you should probably know about, all of it piling up in a place designed to make everything feel equally urgent. It is never equally urgent. It is rarely urgent at all. So here is the idea: you sync your email, your newsletters get pulled in and arranged by what actually matters to you, and you sit down with your paper. A real one, with a beginning and an end. No algorithm. No infinite scroll dragging you further than you meant to go. Just the things you chose, in the order that makes sense, wrapped in something that feels worth the fifteen minutes you are giving it. It started as a way to organise an inbox. It became a tool of intention. Come in, read your paper, and go live your life. You have much better things to do."
              />
            </div>
            <div style={{ flexShrink: 0, textAlign: 'center', width: '220px' }}>
              <img
                src="https://i.imgur.com/uLwSuX7.jpeg"
                alt="The Watsonian Museum of Natural Science"
                style={{
                  width: '100%',
                  filter: 'sepia(40%) contrast(1.05)',
                  border: '1px solid #8b6f47',
                  padding: '6px',
                  backgroundColor: '#faf4e6',
                }}
              />
              <p style={{
                fontFamily: 'IM Fell English, serif',
                fontStyle: 'italic',
                color: '#8b6f47',
                fontSize: '0.65rem',
                marginTop: '0.4rem',
              }}>
                The Watsonian Museum of Natural Science, our Chief Correspondent, depicted here in a moment of editorial contemplation.
              </p>
            </div>
          </div>

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
              body="Reid Babino is a writer, operator, and builder based in Beaumont, Texas. She has completed a novel and a collection of poetry, both presently moving through the publishing process. When she is not running events at an art museum or building applications at odd hours of the night, she is designing worlds for other people to inhabit: as a dungeon master, a narrative designer, and a person who believes that a good story, told well, is one of the few things that has always mattered."
            />
          </div>

          <div style={{ borderTop: '1px dashed #8b6f47', margin: '1rem 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <LowArticle
              numeral="I"
              kicker="On the Craft of Engagement"
              title="Thirty-Seven Students & a World Worth Living In"
              byline="From the Technical Desk"
              body="It was a Tuesday and nobody was looking at me. Thirty-seven college students, thirty-seven sets of eyes pointed at anything but the front of the room. I had been teaching psychology for three weeks and I was losing. Not to bad students — they were fine — but to something larger than all of us, something prehistoric almost, the evolution of attention itself, the way the human condition keeps rewriting the terms of engagement without asking anyone's permission. So I scrapped the lesson plan and built a world. I gave them characters. I gave them a campaign with branching storylines and real consequences and things worth protecting. I told them the only way to level up was to know the psychology. Personality theory became character traits. Psychological disorders became lore. The intersection of behavior and biology became the rules of the game. The first session was chaos. The second was competitive. By the third, a girl who had not spoken once in three weeks was arguing strategy with a boy across the room like something depended on it. The need, the ideas, the visceral urge to engage: it was still there, just as loud as it had ever been. It just needed somewhere to go. I am a dungeon master by hobby and by temperament, which means I have always known this: build the right world carefully enough and people will choose to live in it."
            />
            <LowArticle
              numeral="II"
              kicker="From the Weather Desk"
              title="Fair Skies Expected Through the Fortnight"
              byline="From the Observatory"
              body={weather ?? 'Consulting the instruments...'}
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
