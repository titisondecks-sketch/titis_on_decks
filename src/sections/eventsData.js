/* Where the collective is playing next. Language-independent on purpose
   - venue names, DJ names and genres are proper nouns, written once. The
   translated chrome around them lives in i18n/translations.jsx.

   Past events are never deleted. upcomingEvents() filters them out, and
   when the archive arrives it reads this same array with the predicate
   inverted - no migration, nothing thrown away.

   `start` MUST carry an explicit offset. The Algarve is +01:00 in summer
   and +00:00 in winter. A start without one throws at build time. */

export const EVENTS = [
  {
    id: 'pizza-night-algarve-2026-07-31',
    title: 'Pizza Night Algarve',
    stage: 'Selva Stage',
    promoter: 'Friday Happiness',
    billing: "Ladies' Night presents TiTis on Decks",

    start: '2026-07-31T18:00:00+01:00',
    endsAt: null,

    venue: null,
    area: 'Tojeiro',
    country: 'Portugal',

    lineup: ['Lady CC', 'Lutzi', 'Fofa', 'Pippa', 'Pippa b2b Lutzi'],
    genres: ['House', 'Acid Trance', 'Techno', 'Acid Techno'],

    ticketUrl: null,
    entry: null,
    flyer: 'media/events/pizza-night-algarve-2026-07-31.jpg',
    socials: ['@dielu_lutzi', '@pippaofcourse', '@laladycc', '@dj_fofa'],
    source: 'https://www.instagram.com/stories/titis_on_decks/',
  },

  /* ---------------------------------------------------------------
     TEMPLATE - copy the block below, uncomment it, fill it in.
     Only id, title, start, area, country, lineup and genres are
     required; every other field may stay null and the card will
     simply not render that line.

  {
    id: 'slug-with-the-date-2026-09-12',   // unique, stable, never reused
    title: 'What it is called',
    stage: null,                            // room or stage, if the flyer names one
    promoter: null,                         // who throws it
    billing: null,                          // how the collective is billed
    start: '2026-09-12T22:00:00+01:00',     // doors. OFFSET IS MANDATORY
    endsAt: null,                           // null -> doors + 12h
    venue: null,                            // the room's name, if there is one
    area: 'Lisboa',                         // town or region the public is told
    country: 'Portugal',
    lineup: ['Glitta b2b Lutzi'],
    genres: ['Acid Techno'],
    ticketUrl: null,                        // null -> no ticket button
    entry: null,                            // 'free', 'at the door', a price
    flyer: null,                            // null -> the blacklight fallback
    socials: [],
    source: null,                           // where this came from, for humans
  },

  --------------------------------------------------------------- */
]
