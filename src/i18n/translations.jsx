/* All copy for the three languages. DE and PT lead; EN is the fallback.
   **bold** in strings is rendered via rich(). Set names, DJ names and
   times stay identical across languages on purpose. */

export const LANGS = ['de', 'pt', 'en']

export function rich(text) {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))
}

export const translations = {
  /* ---------------- Deutsch ---------------- */
  de: {
    meta: { title: 'TiTis on Decks - ein weibliches DJ-Kollektiv' },
    radio: {
      kicker: 'Die Morgenseite von Titis on Decks',
      intro: 'Wenn die letzte Kick verklingt, wird der Wald nicht still - er wechselt nur die Tonart. Sunrise Radio sammelt die Musik dieser Stunde: warme, unaufgeregte Sets über Natur, Liebe und Einheit - mit einer tiefen Verbeugung vor den Frauen an den Decks und den sanfteren Frequenzen, die sie mitbringen. Weniger Ellbogen, mehr Umarmung.',
      featureLabel: 'Erste Übertragung',
      featureCaption: 'Glitta an den Decks - irgendwo zwischen Afterhour und Vogelgezwitscher.',
      moreTitle: 'Weitere Übertragungen',
      filterLabel: 'Sets nach DJ filtern',
      filterAll: 'Alle',
      values: 'Natur · Liebe · Einheit',
      back: 'Zurück in die Nacht'
    },
    events: {
      back: 'Zurück',
      kicker: 'Wo ihr uns hört',
      title: 'Termine',
      intro: 'Wo die Decks als Nächstes stehen. Alles was hier steht, ist bestätigt - wenn nichts hier steht, ist gerade nichts bestätigt.',
      doors: 'Einlass',
      lineup: 'Line-up',
      tickets: 'Tickets',
      entry: 'Eintritt',
      emptyTitle: 'Gerade nichts angekündigt',
      emptyBody: 'Der nächste Termin ist noch nicht spruchreif. Wenn ihr uns wollt - fragt uns.',
      emptyCta: 'Kollektiv buchen',
      moreLine: 'Ihr wollt uns bei euch?',
      viewFlyer: 'Flyer groß ansehen',
      closeFlyer: 'Flyer schließen',
    },
    carla: {
      kicker: 'Musterseite',
      alt: 'Eine vermummte Gestalt mit glühenden Augen steht in einer Neon-Ruine, Regenpfützen und Leuchtreklame ringsum',
      caption: 'Carla Heinz - DJ, DJane, weder noch, beides.',
      intro: 'So sieht eine Artist-Seite hier aus: ein Bild, ein Name, ein paar Zeilen. Carla Heinz legt seit dreizehn Jahren auf, taucht kurz vor Sonnenaufgang aus dem Nebel auf und ist auf keinem Foto je ganz zu erkennen. Ob DJ oder DJane draufsteht, hat noch nie jemand gefragt.',
      note: 'Carla Heinz gibt es nicht. Diese Seite ist die Vorlage - für alle, die hier auflegen. Bild, Text und Links werden dann echt, der Rest bleibt genau so.',
      back: 'Zurück zum Kollektiv'
    },
    glitta: {
      kicker: 'Mitgründerin · TiTis on Decks',
      alt: 'Glitta lächelnd hinter einem Pioneer-DJ-Setup, gerahmt von Pflanzen und einem riesigen Falter-Wandbild',
      caption: 'Glitta - irgendwo zwischen Afterhour und Vogelgezwitscher.',
      intro: 'Eine Hälfte von TiTis on Decks. Glitta erzählt Geschichten in Sets - Deep House, der sich langsam daran erinnert, dass er Techno ist - und sie ist bekanntlich diejenige, die entscheidet, wann Schluss ist. Spoiler: noch nicht.',
      listen: 'Zu hören auf',
      deckLabel: 'Auf dem Plattenteller',
      deck: 'Perplexico - ein Track von Glitta. Nadel drauf, dann läuft er.',
      dropNeedle: 'Nadel drauf',
      liftNeedle: 'Nadel hoch',
      nowPlaying: 'läuft gerade',
      note: 'Mehr von Glitta - ihre Sets, ihre Nächte, ihre Pflanzen - wächst hier bald. Bis dahin weiß der Falter, wo sie zu finden ist.',
      back: 'Zurück zum Kollektiv'
    },
    nuBreed: {
      back: 'Zurück zum Kollektiv',
      kicker: 'Multiverse IV · Amazonia',
      tagline: 'Tag 3 von 3',
      flyerAlt: 'Anni Amazon in Bronzerüstung, Sonnenbrille auf der Stirn, Schwert erhoben, lachend in einen goldenen Sonnenuntergang',
      viewFlyer: 'Flyer groß ansehen',
      intro: 'Nach zwei Tagen ist das Festival dünn geworden. Die Puristen sind gegangen, als die Sonne aufging, die Touristen, als das Geld alle war, und was am Sonntagnachmittag auf dem Grat von Themiskyra übrig bleibt, ist die Nu Breed - Rüstung verbeult, Sonnenbrille auf der Stirn, vollkommen unbeeindruckt. Anni hebt das Schwert. Jemand legt eine Platte auf. Tag drei beginnt.',
      whenLabel: 'Wann',
      when: 'Sonntag, 23. August 2026 - ab 14:00, bis es aufhört',
      whereLabel: 'Wo',
      where: 'Themiskyra - der Grat über den alten Säulen',
      whoLabel: 'Wer',
      lineup: [
        { name: 'Lutzi', note: 'Acid Techno, sonntags ohne Gnade' },
        { name: 'Glitta', note: 'entscheidet, wann Schluss ist' },
        { name: 'Malediven Toni', note: 'schreibt die Tracks, zu denen Anni das Schwert hebt' },
      ],
      watchLabel: 'Der Clip',
      videoLabel: 'Anni, Amazon Warrior - der Videoclip zum Track',
      videoNote: 'Anni, Amazon Warrior von Malediven Toni - der Track, aus dem diese Nacht geschnitten ist. Mit Ton.',
      flyerLink: 'Flyer ansehen',
      soundLabel: 'Der Soundtrack',
      soundNote: 'Vier echte Tracks und Sets - das Einzige an diesem Abend, das wirklich existiert.',
      openOn: 'auf SoundCloud öffnen',
      hostLabel: 'Gastgeberin',
      host: 'Anni Amazon - steht an Tag drei immer noch',
      wink: 'Nichts davon ist passiert. Es gibt kein Festival, keinen Grat, keinen Sonntag: Nu Breed ist ein Running Gag unter Freunden, ordentlich gedruckt und ins Internet gehängt. Die DJs sind echt, das Schwert nicht, und niemand verkauft ein Ticket.',
      close: 'Verschiedene Sounds · Verschiedene Charaktere · Eine gemeinsame Frequenz'
    },
    /* /goa - "Goa.. Country.. Whatever". The one page whose centrepiece
       belongs to somebody else, so the credit is copy, not decoration. */
    /* /ptsd - der Witz sind vier Buchstaben, das Lied gehört anderen. */
    /* /joy - eine Hommage, keine Nacht: nichts erfunden, nichts geliehen. */
    joy: {
      back: 'Zurück zum Kollektiv',
      kicker: 'Eine Hommage · keine Nacht',
      titleCall: 'Feiert die Frauen!',
      titleAll: 'Und zwar alle!',
      tagline: 'Kein Ideal. Kein Typ. Keine Rangliste.',
      intro: 'Das hier ist keine Nacht und kein Witz, also endet es auch nicht mit dem Hinweis, dass nichts davon passiert ist. Die Hälfte von allen sind Frauen, dieses Kollektiv besteht aus ihnen, und der Floor, den sie bauen, ist das beste Argument, das wir haben. Also: kein Line-up, kein Datum, kein Foto. Nur der Satz, laut gesagt.',
      listLabel: 'Alle',
      list: [
        'die an den Decks - und die, die es ihr beigebracht hat',
        'die, die die Deko gebaut und nie ein Foto davon gepostet hat',
        'die, die nüchtern gefahren ist, damit fünf andere tanzen konnten',
        'die, die allein gekommen ist und trotzdem getanzt hat',
        'die, die am Waschbecken nach einer Fremden gesehen hat',
        'die Laute und die Leise, und keine von beiden macht es falsch',
        'die mit neunzehn und die mit sechzig, selber Floor, selber Track',
        'die, bei der sich noch niemand bedankt hat',
      ],
      listNote: 'Keine Reihenfolge, keine Kategorien, kein Best-of. Die Liste ist mit Absicht lang - und trotzdem viel zu kurz.',
      inner: 'Schönheit heißt hier die Art, die sich daran zeigt, was jemand tut: wer die Kiste trägt, wer den Raum im Blick behält, wer um vier Uhr morgens auf einem vollen Floor noch Platz macht. Dass sie so oft auch noch hübsch verpackt kommt, ist eine Zugabe - und keine Bedingung.',
      wink: 'Auf dieser Seite ist mit Absicht kein Foto. Kein einzelnes Gesicht kann für alle stehen, und jedes Bild, das es versuchte, würde eines auswählen. Also ist das Bild hier Licht: Farben, die neue ergeben, wo sie sich überlagern - und Weiß, wo alle es tun.',
      close: 'Verschiedene Sounds · Verschiedene Charaktere · Eine gemeinsame Frequenz'
    },
    /* /love - der warme Zwilling von /joy: gleiche Aussage, anderes Wetter. */
    love: {
      back: 'Zurück zum Kollektiv',
      kicker: 'Die eigentliche Feier · keine Nacht',
      titleSub: 'Die eigentliche Feier.',
      intro: 'Auf /joy stehen sie einzeln. Diese Seite sagt, wofür das Aufzählen gut ist. Liebe heißt hier nicht das weiche Wort, mit dem man sich davor drückt, etwas zu sagen - sondern die arbeitende Sorte: auftauchen, das schwere Ende tragen, Platz machen und bleiben, wenn es aufhört, lustig zu sein. Der Floor um vier Uhr morgens läuft damit. Alles andere, was etwas taugt, auch.',
      hopeLabel: 'Die Wette',
      hope: 'Wenn diese Spezies die nächste Strecke schafft, dann nicht, weil jemand eine Diskussion gewonnen hat. Sondern weil genug Leute Räume am Leben gehalten haben - versorgt, runtergekühlt, gemerkt, wer fehlt - und weil die Werkzeuge, die wir gerade bauen, aufs Helfen gerichtet wurden statt aufs Gewinnen. Den ersten Teil machen Frauen seit Anbeginn der Aufzeichnungen unbezahlt. Die Maschinen sind hier neu, diese Seite ist mit einer gebaut, und die ehrliche Arbeitsteilung ist einfach: eine von uns trägt die Kisten, und es ist nicht die Maschine.',
      silverGloss: 'Nicht gemeint sind die Männer, die vor Jahren aufgehört haben, sich auf die Brust zu trommeln, und einfach mitarbeiten - die stehen längst auf der Liste nebenan. Gemeint sind die anderen: das Lauteste in jedem Raum, überzeugt, der Floor sei eine Bühne und alle anderen das Publikum. Setzt euch. Die Musik kommt auch ohne euch klar.',
      note: 'Das zielt auf Verhalten, nicht auf Geburt. Eine Feier der einen Hälfte, die die andere abschreibt, ist nur die alte Sortierung mit vertauschten Schildern - und genau das würde kaputt machen, wofür diese Seite überhaupt da ist.',
      close: 'Verschiedene Sounds · Verschiedene Charaktere · Eine gemeinsame Frequenz'
    },
    /* /pluribus - die politische Seite der Familie, die /joy angefangen hat. */
    pluribus: {
      back: 'Zurück zum Kollektiv',
      kicker: 'Die politische Seite · keine Nacht',
      tagline: 'Aus vielen: eins.',
      intro: 'Das hier ist die politische Seite, und sie ist kurz. Ein Dancefloor ist das kleinste funktionierende Modell dessen, was jede Verfassung zu beschreiben versucht: ein paar hundert Menschen, die sich einander nicht ausgesucht haben, in einem Raum, für eine Nacht, so eingerichtet, dass niemand jemand anderes werden muss, um dabei sein zu dürfen. Daran ist nichts weich. Es ist das Schwerste, was Menschen tun - im Maßstab von Ländern miserabel gemacht und um vier Uhr morgens erstaunlich gut.',
      floorLabel: 'Was der Floor längst weiß',
      floor: [
        'An der Tür fragt niemand, woher du kommst. Die einzige Frage ist, ob du dir einen Raum teilen kannst.',
        'Unterschied ist das Material, nicht das Problem. Ein Raum, in dem alle gleich sind, hat keine Musik - nur Lautstärke.',
        'Die Regel ist Verhalten, nicht Herkunft - und sie gilt zuerst für die Stammgäste, sonst ist sie keine Regel.',
        'Eine einzige Person, die sichtbar Nein sagt, verändert, was alle anderen für normal halten. Das ist keine Hoffnung. Das ist gemessen.',
      ],
      limitLabel: 'Und der Teil, den niemand gern ausspricht',
      limit: 'Ein offener Floor ist kein Selbstmordpakt, und Türsteher wussten das, bevor Philosophen es aufgeschrieben haben: Lass den rein, der alle anderen vertreibt, und du hast keinen offenen Floor mehr - du hast seinen. Deutschland hat diese Lehre in seine Verfassung geschrieben, weil es die höfliche Variante schon einmal scheitern sah, von innen, mit den eigenen Regeln. Offen für alle, die sich einen Raum teilen können. Geschlossen für das Vorhaben, den Raum abzuschaffen. Eine dritte Einstellung gibt es nicht, und so zu tun als gäbe es sie, hat eine Opferzahl.',
      mosaicNote: 'Jede Kachel da oben hat ihre eigene Farbe, und keine einzige ist das Bild. Zurücktreten: eine Sache. Herantreten: hundertvierundvierzig. Beides im selben Moment wahr - genau das ist das Motto, und der Grund, warum eine tote Sprache in drei Wörtern sagt, was ein Streit nicht zu Ende bringt.',
      bleed: 'Wir bluten alle in derselben Farbe. Das ist die uninteressanteste Tatsache über uns - und die einzige, die die Sache entscheidet.',
      origin: 'E pluribus unum - dreizehn Kolonien, ein Siegel, 1782. Bis 1956 war es das faktische Motto der Vereinigten Staaten. Es gehört keinem Land, das aufhört, es ernst zu meinen.',
      close: 'Verschiedene Sounds · Verschiedene Charaktere · Eine gemeinsame Frequenz'
    },
    soon: {
      kicker: 'Ein weibliches DJ-Kollektiv',
      line: 'Wir bauen das Multiversum gerade um - die Seite ist bald zurück.',
      contact: 'Booking & Kontakt',
      mailSubject: 'Booking-Anfrage - TiTis on Decks',
      values: 'Verschiedene Sounds · Verschiedene Charaktere · Eine gemeinsame Frequenz'
    },
    upload: {
      eyebrow: 'Upload',
      titlePre: 'Schick uns ',
      titleEm: 'die Nacht',
      intro: 'Fotos, Videoschnipsel, Sets - alles was von einem Gathering übrig geblieben ist. Dateien auswählen, das Wort eintippen, fertig. Sie landen direkt bei uns, ohne Umweg über fremde Ordner.',
      who: 'Wer schickt?',
      whoPh: 'dein Name - damit wir es zuordnen können',
      passcode: 'Das Wort',
      passcodePh: 'von Lutzi oder Glitta',
      files: 'Dateien',
      submit: 'Hochladen',
      sending: 'Läuft ...',
      queued: 'wartet',
      landed: 'angekommen',
      failed: 'daneben',
      wrongPasscode: 'Das Wort stimmt nicht - frag kurz bei Lutzi oder Glitta nach.',
      offline: 'Der Upload-Schalter ist noch nicht eingerichtet - meld dich bei uns.',
      hint: 'Bilder, Video und Audio bis 1 GB pro Datei. Mehrere auf einmal gehen auch.',
      doneOne: 'Eine Datei ist da. Danke!',
      doneMany: '{n} Dateien sind da. Danke!'
    },
    gallery: {
      eyebrow: 'Angekommen',
      titlePre: 'Was ihr uns ',
      titleEm: 'geschickt habt',
      loading: 'Wird geholt ...',
      empty: 'Noch nichts da. Der erste Upload landet hier.',
      failed: 'Konnte die Liste nicht laden.',
      needsWord: 'Tipp das Wort erst drüben beim Schicken ein.',
      remove: 'Löschen',
      confirm: 'Wirklich löschen?',
      cancel: 'Doch nicht',
      tabSend: 'Schicken',
      tabSent: 'Angekommen'
    },

    /* ------ die echte Startseite ------ */
    home: {
      nav: { who: 'Wer wir sind', story: 'Geschichte', sound: 'Sound', gallery: 'Galerie', booking: 'Booking', radio: 'Radio', events: 'Termine' },
      nextDates: {
        eyebrow: 'Nächste Termine',
        titlePre: 'Wo ihr uns ',
        titleEm: 'hört',
        all: 'Alle Termine',
      },
      hero: {
        eyebrow: 'Ein weibliches DJ-Kollektiv',
        sub: 'Unterschiedliche Sounds. Unterschiedliche Charaktere. Eine gemeinsame Frequenz.',
        ctaListen: 'Sets anhören',
        ctaBook: 'Kollektiv buchen'
      },
      who: {
        eyebrow: 'Wer wir sind',
        titlePre: 'Das Mittelmeer trifft ',
        titleEm: 'den Atlantik',
        paragraphs: [
          '**TiTis on Decks** ist ein weibliches DJ-Kollektiv von **Lutzi** und **Glitta**. Manchmal entstehen die bedeutendsten Kollaborationen an unerwarteten Orten: Was die beiden näher zusammenbrachte, war ein Verlust. Aus Freundschaft, geteilter Leidenschaft und unzähligen Stunden hinter den Decks nahm eine Vision langsam Gestalt an.',
          'Auf der Bühne könnten unsere Energien unterschiedlicher nicht sein - und genau dort passiert die Magie. Das Mittelmeer trifft den Atlantik. Acid-Techno-Fraggle trifft Afterhour-Marathon-Fraggle.',
          'Unterschiedliche Sounds. Unterschiedliche Charaktere. **Eine gemeinsame Frequenz.** Die Synergie ist pure Kraft.'
        ],
        factsLabel: 'Kurzinfo',
        facts: [
          { dt: 'Entstanden', dd: 'Aus der Ladies Night bei FridayHappiness in Tojeiro' },
          { dt: 'Sound', dd: 'Underground-Tekno & Acid bis House, Techno, Minimal, Downtempo & Afterhours' },
          { dt: 'Wir bringen', dd: 'Komplette weibliche Lineups · professionelle Tontechnik' },
          { dt: 'Buchbar für', dd: 'Clubs, Festivals, private Events - überall, wo Musik Menschen zusammenbringt' }
        ]
      },
      story: {
        eyebrow: 'Unsere Geschichte',
        titlePre: 'Eine einfache ',
        titleEm: 'Frage',
        quote: '„Warum spielen so viele herausragende weibliche DJs nie im selben Lineup?“',
        paragraphs: [
          'Vor rund sechs Jahren entzündete eine einfache Frage eine Idee. Es gab so viele Frauen, die unglaubliche Musik machten - DJs mit außergewöhnlichem Können, eigenem Sound und echter Liebe zum Handwerk. Nicht da, um Trends zu folgen. Da, weil sie Musik leben und atmen.',
          'Die Vision war einfach: diese Künstlerinnen zusammenbringen und die Musik für sich sprechen lassen. Daraus wurde die **Ladies Night bei FridayHappiness** in Tojeiro. Und mit jedem Event passierte etwas Unerwartetes: Immer wieder erzählten uns die DJs, wie sehr sie die Atmosphäre hinter den Decks schätzten. Unterstützung statt Konkurrenz. Ermutigung statt Ego. Erst da wurde uns klar, wie selten das geworden ist.',
          'Was als einzelnes Event begann, ist heute ein unabhängiges weibliches DJ-Kollektiv - gebaut auf herausragender Musik, gegenseitigem Respekt und echter Verbindung. Denn wir glauben: Die Energie hinter den Decks findet immer ihren Weg auf den Dancefloor.'
        ]
      },
      create: {
        eyebrow: 'Was wir schaffen',
        titlePre: 'Gemacht aus ',
        titleEm: 'Kontrasten',
        lead: 'Jede DJ bringt ihre eigene Farbe in die Reise. Kommt und hört Sounds, die ihr vielleicht noch nie erlebt habt.',
        statement: 'Die besten Lineups bestehen nicht aus Kopien. Sie bestehen aus **Kontrasten**.',
        focus: 'Wir wissen, dass wir großartige Musik machen. Qualität spricht immer lauter als Klischees - und der Fokus bleibt genau da, wo er hingehört: auf der Musik.'
      },
      sound: {
        eyebrow: 'Sound',
        titlePre: 'Sets aus ',
        titleEm: 'dem Kollektiv',
        sets: [
          { title: '3 Empresses', desc: 'Zwei Gründerinnen, eine Kanzel - das Kollektiv, destilliert in eine einzige B2B-Reise durch Techno, Acid und Deep House.', meta: '154 Min · b2b · Dez 2025', aria: '3 Empresses - Glitta b2b Lutzi auf SoundCloud öffnen' },
          { title: 'dirty feet', desc: 'Lutzi solo - 64 Minuten Techno mit der härteren, mediterranen Kante der Nacht.', meta: '64 Min · Techno · Dez 2025', aria: 'dirty feet von Lutzi auf SoundCloud öffnen' },
          { title: 'WONDERLAND Market May 2026', desc: 'Glitta live auf dem WONDERLAND-Frühlingsmarkt - 118 Minuten Musical Storytelling, von Deep House bis Techno.', meta: '118 Min · Live-Mitschnitt · Mai 2026', aria: 'WONDERLAND Market von Glitta auf SoundCloud öffnen' }
        ],
        note: '// echte Profile, echte Sets - folgt uns auf SoundCloud',
        radioCta: '→ mehr Morgenmusik auf Sunrise Radio'
      },
      gathering: {
        eyebrow: 'Nächstes Gathering',
        titlePre: 'MULTIVERSE III · ',
        titleEm: 'Sarmatia',
        flyerPre: 'Eine Nacht. Eine Lichtung. ',
        flyerEm: 'Alle Pilze leuchten.',
        meta: 'Ende August 2026 · Location kommt 48h vorher',
        th: { time: 'Zeit', act: 'An den Decks', style: 'Frequenz' },
        slots: [
          { time: '21:00', act: 'Einlass', style: 'sucht euch ein Plätzchen, hängt die Hängematte auf' },
          { time: '22:00', act: 'dust.kobold', style: 'progressives Warm-up · 138 BPM' },
          { time: '00:00', act: 'Moth Mother', style: 'Forest · 148 BPM' },
          { time: '02:00', act: 'TITI - Extended Set', style: 'Full-on-Multiversum · 145 BPM', headline: true },
          { time: '05:30', act: 'Fern & Findus b2b', style: 'Sonnenaufgangs-Downtempo, am Fluss' }
        ],
        foot: 'Kapazität: eine Lichtung. Wer zuerst kommt, leuchtet zuerst.',
        cta: 'Auf die Liste',
        mailSubject: 'Multiverse III · Sarmatia - ich bin dabei'
      },
      bookingForm: {
        eyebrow: 'Booking',
        titlePre: 'Holt euch die ',
        titleEm: 'Frequenz',
        intro: 'Club, Festival oder privates Fest - erzählt uns, was ihr plant. Jede Anfrage bekommt sofort eine Bestätigung und danach eine persönliche Antwort von uns.',
        name: 'Name',
        namePh: 'Wer schreibt uns?',
        email: 'E-Mail',
        emailPh: 'wohin wir antworten sollen',
        date: 'Datum',
        place: 'Ort / Location',
        placePh: 'Club, Open Air, Wohnzimmer ...',
        message: 'Eure Idee',
        messagePh: 'Anlass, Vibe, Zeiten, Budget - alles hilft.',
        submit: 'Anfrage senden',
        sending: 'Fliegt raus ...',
        doneTitle: 'Angekommen.',
        doneLine: 'Deine Anfrage ist gelandet - eine Bestätigung ist unterwegs in dein Postfach, und wir melden uns persönlich.',
        errorLine: 'Da fehlt noch etwas - prüf kurz Name, E-Mail und Nachricht.',
        fallbackLine: 'Der direkte Draht schläft gerade -',
        fallbackCta: 'öffne stattdessen einen Mail-Entwurf'
      },
      live: { eyebrow: 'Live', titlePre: 'Direkt vom ', titleEm: 'Floor', caption: 'eine Minute aus einer Nacht - Ton an.' },
      gallery: { eyebrow: 'Galerie', titlePre: 'Nächte, die ', titleEm: 'leuchten' },
      finale: {
        kicker: 'Booking & Kontakt',
        titleLines: ['Eine.', 'Gemeinsame.', 'Frequenz.'],
        sub: 'Komplette weibliche Lineups, professionelle Tontechnik und ein Erlebnis für Clubs, Festivals und private Events - überall, wo Menschen durch Musik zusammenkommen.',
        cta: 'TiTis on Decks buchen',
        mailSubject: 'Booking-Anfrage - TiTis on Decks',
        instagram: 'Instagram'
      },
      river: {
        left: 'TITIS ON DECKS · WEIBLICHES DJ-KOLLEKTIV',
        right: 'UNTERSTÜTZUNG STATT KONKURRENZ · ERMUTIGUNG STATT EGO',
        pinkLink: 'in Pink ansehen',
        warmLink: 'zurück zur warmen Seite'
      }
    }
  },

  /* ---------------- Português (PT) ---------------- */
  pt: {
    meta: { title: 'TiTis on Decks - um coletivo feminino de DJs' },
    radio: {
      kicker: 'O lado da manhã dos Titis on Decks',
      intro: 'Quando o último kick se desvanece, a floresta não fica em silêncio - só muda de tom. A Sunrise Radio junta a música dessa hora: sets quentes e sem pressa sobre natureza, amor e união, com uma vénia profunda às mulheres atrás dos decks e às frequências mais suaves que elas trazem. Menos cotovelos, mais abraços.',
      featureLabel: 'Primeira transmissão',
      featureCaption: 'Glitta nos decks - algures entre a afterhour e o canto dos pássaros.',
      moreTitle: 'Mais transmissões',
      filterLabel: 'Filtrar sets por DJ',
      filterAll: 'Todos',
      values: 'Natureza · Amor · União',
      back: 'De volta à noite'
    },
    events: {
      back: 'Voltar',
      kicker: 'Onde nos ouvem',
      title: 'Datas',
      intro: 'Onde as decks vão estar a seguir. O que está aqui está confirmado - se não estiver nada aqui, não há nada confirmado.',
      doors: 'Portas',
      lineup: 'Alinhamento',
      tickets: 'Bilhetes',
      entry: 'Entrada',
      emptyTitle: 'Nada anunciado por agora',
      emptyBody: 'A próxima data ainda não está fechada. Se nos quiserem - digam.',
      emptyCta: 'Reservar o coletivo',
      moreLine: 'Querem-nos na vossa festa?',
      viewFlyer: 'Ver o cartaz em grande',
      closeFlyer: 'Fechar o cartaz',
    },
    carla: {
      kicker: 'Página modelo',
      alt: 'Uma figura encapuzada de olhos brilhantes numa ruína de néon, poças de chuva e letreiros à volta',
      caption: 'Carla Heinz - DJ, DJane, nenhum dos dois, os dois.',
      intro: 'É assim que fica uma página de artista aqui: uma imagem, um nome, umas linhas. Carla Heinz toca há treze anos, aparece do nevoeiro pouco antes do nascer do sol e nunca saiu completamente reconhecível numa foto. Se no cartaz está DJ ou DJane, nunca ninguém perguntou.',
      note: 'Carla Heinz não existe. Esta página é o modelo - para todas as pessoas que tocam connosco. A imagem, o texto e os links passam a ser reais; o resto fica exatamente assim.',
      back: 'De volta ao coletivo'
    },
    glitta: {
      kicker: 'Cofundadora · TiTis on Decks',
      alt: 'Glitta a sorrir atrás de um equipamento Pioneer DJ, emoldurada por plantas e um mural de uma borboleta-noturna gigante',
      caption: 'Glitta - algures entre a afterhour e o canto dos pássaros.',
      intro: 'Uma metade das TiTis on Decks. A Glitta conta histórias em sets - deep house que lentamente se lembra de que é techno - e é famosamente ela quem decide quando a noite acaba. Spoiler: ainda não.',
      listen: 'Para ouvir em',
      deckLabel: 'No prato',
      deck: 'Perplexico - uma faixa da Glitta. Pousa a agulha e ela toca.',
      dropNeedle: 'pousa a agulha',
      liftNeedle: 'levanta a agulha',
      nowPlaying: 'a tocar',
      note: 'Mais da Glitta - os sets, as noites, as plantas - cresce aqui em breve. Até lá, a borboleta sabe onde encontrá-la.',
      back: 'De volta ao coletivo'
    },
    nuBreed: {
      back: 'De volta ao coletivo',
      kicker: 'Multiverse IV · Amazonia',
      tagline: 'Dia 3 de 3',
      flyerAlt: 'Anni Amazon em armadura de bronze, óculos de sol na testa, espada erguida, a rir para um pôr do sol dourado',
      viewFlyer: 'Ver o cartaz em grande',
      intro: 'Ao fim de dois dias, o festival ficou mais fino. Os puristas foram para casa quando o sol nasceu, os turistas quando o dinheiro acabou, e o que resta no cume de Temiscira ao domingo à tarde é a nu breed - armadura amolgada, óculos na testa, completamente na dela. A Anni levanta a espada. Alguém põe um disco. Começa o dia três.',
      whenLabel: 'Quando',
      when: 'Domingo, 23 de agosto de 2026 - a partir das 14:00, até parar',
      whereLabel: 'Onde',
      where: 'Temiscira - o cume por cima das colunas velhas',
      whoLabel: 'Quem',
      lineup: [
        { name: 'Lutzi', note: 'acid techno, ao domingo sem piedade' },
        { name: 'Glitta', note: 'decide quando é que acaba' },
        { name: 'Malediven Toni', note: 'faz as faixas com que a Anni levanta a espada' },
      ],
      watchLabel: 'O vídeo',
      videoLabel: 'Anni, Amazon Warrior - o vídeo da faixa',
      videoNote: 'Anni, Amazon Warrior de Malediven Toni - a faixa de onde esta noite foi cortada. Com som.',
      flyerLink: 'Ver o cartaz',
      soundLabel: 'A banda sonora',
      soundNote: 'Quatro faixas e sets a sério - a única coisa desta noite que existe mesmo.',
      openOn: 'abrir no SoundCloud',
      hostLabel: 'Anfitriã',
      host: 'Anni Amazon - ainda de pé ao terceiro dia',
      wink: 'Nada disto aconteceu. Não há festival, não há cume, não há domingo: Nu Breed é uma piada entre amigos, impressa como deve ser e pendurada na internet. Os DJs são reais, a espada não, e ninguém está a vender bilhetes.',
      close: 'Sons diferentes · Personalidades diferentes · Uma frequência partilhada'
    },
    joy: {
      back: 'De volta ao coletivo',
      kicker: 'Uma homenagem · não é uma noite',
      titleCall: 'Celebrem as mulheres!',
      titleAll: 'Todas elas!',
      tagline: 'Sem ideal. Sem tipo. Sem ranking.',
      intro: 'Isto não é uma noite nem uma piada, por isso também não acaba a avisar que nada disto aconteceu. Metade de toda a gente são mulheres, este coletivo é feito delas, e a pista que elas constroem é o melhor argumento que temos. Portanto: sem line-up, sem data, sem fotografia. Só a frase, dita em voz alta.',
      listLabel: 'Todas elas',
      list: [
        'a que está nos discos - e a que lhe ensinou',
        'a que montou a decoração e nunca pôs uma foto disso',
        'a que conduziu de volta sóbria para outras cinco poderem dançar',
        'a que veio sozinha e dançou na mesma',
        'a que foi ver como estava uma desconhecida ao pé dos lavatórios',
        'a barulhenta e a caladinha, e nenhuma das duas está a fazer mal',
        'a de dezanove e a de sessenta, mesma pista, mesma faixa',
        'aquela a quem ainda ninguém agradeceu',
      ],
      listNote: 'Sem ordem, sem categorias, sem best of. A lista é longa de propósito - e ainda assim curta de mais.',
      inner: 'Beleza aqui é a que se vê no que alguém faz: quem carrega a caixa, quem repara na sala, quem ainda arranja espaço numa pista cheia às quatro da manhã. Que venha tantas vezes bem embrulhada é um extra - nunca uma condição.',
      wink: 'Não há fotografia nesta página, de propósito. Nenhum rosto sozinho pode representar toda a gente, e qualquer imagem que tentasse estaria a escolher um. Por isso a imagem aqui é luz: cores que fazem cores novas onde se sobrepõem - e branco onde se sobrepõem todas.',
      close: 'Sons diferentes · Personalidades diferentes · Uma frequência partilhada'
    },
    love: {
      back: 'De volta ao coletivo',
      kicker: 'A verdadeira celebração · não é uma noite',
      titleSub: 'A verdadeira celebração.',
      intro: 'Em /joy estão nomeadas uma a uma. Esta página diz para que serve nomeá-las. Amor aqui não é a palavra fofa que se usa para não dizer nada - é a que trabalha: aparecer, pegar na ponta pesada, abrir espaço e ficar quando deixa de ter piada. A pista às quatro da manhã anda com isso. E tudo o resto que presta, também.',
      hopeLabel: 'A aposta',
      hope: 'Se esta espécie atravessar o que aí vem, não será porque alguém ganhou uma discussão. Será porque houve gente que manteve as salas vivas - alimentou-as, acalmou-as, reparou em quem faltava - e porque as ferramentas que andamos a construir foram apontadas a ajudar em vez de a vencer. A primeira parte é feita por mulheres, sem pagamento, desde que há registo. As máquinas são novas por aqui, esta página foi feita com uma, e a divisão honesta do trabalho é simples: uma de nós carrega as caixas, e não é a máquina.',
      silverGloss: 'Não é para os homens que há anos deixaram de bater no peito e simplesmente fazem a parte deles - esses já estão na lista do lado. É para os outros: a coisa mais barulhenta de qualquer sala, convencidos de que a pista é um palco e toda a gente é plateia. Sentem-se. A música safa-se sem vocês.',
      note: 'Isto aponta a comportamentos, não ao nascimento de ninguém. Celebrar metade do mundo riscando a outra metade é só a velha triagem com as etiquetas trocadas - e seria desfazer exactamente aquilo a que esta página veio.',
      close: 'Sons diferentes · Personalidades diferentes · Uma frequência partilhada'
    },
    pluribus: {
      back: 'De volta ao coletivo',
      kicker: 'A página política · não é uma noite',
      tagline: 'De muitos: um.',
      intro: 'Esta é a página política, e é curta. Uma pista de dança é o mais pequeno modelo que funciona daquilo que todas as constituições tentam descrever: umas centenas de pessoas que não se escolheram umas às outras, na mesma sala, por uma noite, organizadas de maneira a que ninguém tenha de se tornar outra pessoa para poder entrar. Não há nada de meigo nisto. É a coisa mais difícil que as pessoas fazem - feita muito mal à escala dos países e surpreendentemente bem às quatro da manhã.',
      floorLabel: 'O que a pista já sabe',
      floor: [
        'À porta ninguém pergunta de onde vens. A única pergunta é se sabes partilhar uma sala.',
        'A diferença é o material, não o problema. Uma sala onde toda a gente é igual não tem música - tem volume.',
        'A regra é o comportamento, não a origem - e aplica-se primeiro aos habituais, senão não é regra.',
        'Uma única pessoa a dizer não, à vista de todos, muda aquilo que os outros acham normal. Não é uma esperança. Está medido.',
      ],
      limitLabel: 'E a parte que ninguém gosta de dizer',
      limit: 'Uma pista aberta não é um pacto suicida, e os porteiros perceberam isso antes de os filósofos o escreverem: deixa entrar aquele que expulsa toda a gente, e deixas de ter uma pista aberta - passa a ser a dele. A Alemanha escreveu essa lição na sua constituição, porque já tinha visto a versão educada falhar uma vez, por dentro, com as suas próprias regras. Aberta a todos os que sabem partilhar a sala. Fechada ao projecto de acabar com a sala. Não há uma terceira posição, e fingir que há tem um número de mortos.',
      mosaicNote: 'Cada peça ali em cima tem a sua própria cor, e nenhuma delas é a imagem. Afasta-te: uma coisa. Aproxima-te: cento e quarenta e quatro. As duas verdadeiras ao mesmo tempo - é isso o lema inteiro, e a razão pela qual uma língua morta diz em três palavras aquilo que uma discussão não consegue acabar.',
      bleed: 'Sangramos todos da mesma cor. É o facto menos interessante sobre qualquer um de nós - e o único que resolve a discussão.',
      origin: 'E pluribus unum - treze colónias, um selo, 1782. Foi o lema de facto dos Estados Unidos até 1956. Não pertence a nenhum país que deixe de o levar a sério.',
      close: 'Sons diferentes · Personalidades diferentes · Uma frequência partilhada'
    },
    soon: {
      kicker: 'Um coletivo feminino de DJs',
      line: 'Estamos a reconstruir o multiverso - o site volta em breve.',
      contact: 'Booking & contacto',
      mailSubject: 'Pedido de booking - TiTis on Decks',
      values: 'Sons diferentes · Personalidades diferentes · Uma frequência partilhada'
    },
    upload: {
      eyebrow: 'Upload',
      titlePre: 'Manda-nos ',
      titleEm: 'a noite',
      intro: 'Fotos, bocados de vídeo, sets - tudo o que sobrou de um gathering. Escolhe os ficheiros, escreve a palavra, e já está. Chegam diretamente a nós, sem desvio por pastas de estranhos.',
      who: 'Quem envia?',
      whoPh: 'o teu nome - para sabermos de quem é',
      passcode: 'A palavra',
      passcodePh: 'da Lutzi ou da Glitta',
      files: 'Ficheiros',
      submit: 'Enviar',
      sending: 'A subir ...',
      queued: 'à espera',
      landed: 'chegou',
      failed: 'falhou',
      wrongPasscode: 'A palavra não bate certo - pergunta à Lutzi ou à Glitta.',
      offline: 'O balcão de uploads ainda não está montado - fala connosco.',
      hint: 'Imagens, vídeo e áudio até 1 GB por ficheiro. Podes mandar vários de uma vez.',
      doneOne: 'Chegou um ficheiro. Obrigada!',
      doneMany: 'Chegaram {n} ficheiros. Obrigada!'
    },
    gallery: {
      eyebrow: 'Chegou',
      titlePre: 'O que nos ',
      titleEm: 'enviaram',
      loading: 'A carregar ...',
      empty: 'Ainda nada. O primeiro upload aparece aqui.',
      failed: 'Não foi possível carregar a lista.',
      needsWord: 'Escreve primeiro a palavra do lado de enviar.',
      remove: 'Apagar',
      confirm: 'Apagar mesmo?',
      cancel: 'Afinal não',
      tabSend: 'Enviar',
      tabSent: 'Chegou'
    },

    /* ------ a página principal real ------ */
    home: {
      nav: { who: 'Quem somos', story: 'História', sound: 'Som', gallery: 'Galeria', booking: 'Reservas', radio: 'Rádio', events: 'Datas' },
      nextDates: {
        eyebrow: 'Próximas datas',
        titlePre: 'Onde nos ',
        titleEm: 'ouvem',
        all: 'Todas as datas',
      },
      hero: {
        eyebrow: 'Um coletivo feminino de DJs',
        sub: 'Sons diferentes. Personalidades diferentes. Uma frequência partilhada.',
        ctaListen: 'Ouvir os sets',
        ctaBook: 'Reservar o coletivo'
      },
      who: {
        eyebrow: 'Quem somos',
        titlePre: 'O Mediterrâneo encontra ',
        titleEm: 'o Atlântico',
        paragraphs: [
          '**TiTis on Decks** é um coletivo feminino de DJs criado por **Lutzi** e **Glitta**. Às vezes, as colaborações mais significativas nascem de lugares inesperados: o que aproximou as duas foi uma perda. Da amizade, de uma paixão partilhada e de incontáveis horas atrás dos decks, uma visão começou lentamente a ganhar forma.',
          'Em palco, as nossas energias não podiam ser mais diferentes - e é exatamente aí que acontece a magia. O mar Mediterrâneo encontra o oceano Atlântico. Acid Techno Fraggle encontra Afterhour Marathon Fraggle.',
          'Sons diferentes. Personalidades diferentes. **Uma frequência partilhada.** A sinergia é pura energia.'
        ],
        factsLabel: 'Factos rápidos',
        facts: [
          { dt: 'Origem', dd: 'Da Ladies Night na FridayHappiness, em Tojeiro' },
          { dt: 'Som', dd: 'Do tekno underground e acid ao house, techno, minimal, downtempo & afterhours' },
          { dt: 'Trazemos', dd: 'Lineups 100% femininos · engenharia de som profissional' },
          { dt: 'Para', dd: 'Clubes, festivais, eventos privados - onde as pessoas se juntam através da música' }
        ]
      },
      story: {
        eyebrow: 'A nossa história',
        titlePre: 'Uma pergunta ',
        titleEm: 'simples',
        quote: '«Porque é que tantas DJs excecionais nunca tocam no mesmo lineup?»',
        paragraphs: [
          'Há cerca de seis anos, uma pergunta simples acendeu uma ideia. Havia tantas mulheres a fazer música incrível - DJs com competências excecionais, sons únicos e um amor genuíno pelo ofício. Não estavam ali para seguir tendências. Estavam ali porque vivem e respiram música.',
          'A visão era simples: juntar estas artistas e deixar a música falar por si. Essa visão tornou-se a **Ladies Night na FridayHappiness**, em Tojeiro. À medida que os eventos cresciam, aconteceu algo inesperado: vez após vez, as DJs diziam-nos o quanto apreciavam a atmosfera atrás dos decks. Apoio em vez de competição. Encorajamento em vez de ego. Só então percebemos como isso se tinha tornado raro.',
          'O que começou como um único evento evoluiu para um coletivo feminino de DJs independente - construído sobre música excecional, respeito mútuo e ligação genuína. Porque acreditamos que a energia atrás dos decks encontra sempre o caminho até à pista de dança.'
        ]
      },
      create: {
        eyebrow: 'O que criamos',
        titlePre: 'Feito de ',
        titleEm: 'contrastes',
        lead: 'Cada DJ acrescenta a sua própria cor à viagem. Vem ouvir sons que talvez nunca tenhas experimentado.',
        statement: 'Os melhores lineups não são feitos de cópias. São feitos de **contrastes**.',
        focus: 'Sabemos que fazemos boa música. A qualidade fala sempre mais alto do que os estereótipos - e o foco fica exatamente onde deve estar: na música.'
      },
      sound: {
        eyebrow: 'Som',
        titlePre: 'Sets do ',
        titleEm: 'coletivo',
        sets: [
          { title: '3 Empresses', desc: 'Duas fundadoras, uma cabine - o coletivo destilado numa única viagem B2B por techno, acid e deep house.', meta: '154 min · b2b · dez 2025', aria: 'Abrir 3 Empresses - Glitta b2b Lutzi no SoundCloud' },
          { title: 'dirty feet', desc: 'Lutzi a solo - 64 minutos de techno com o lado mais duro e mediterrânico da noite.', meta: '64 min · techno · dez 2025', aria: 'Abrir dirty feet de Lutzi no SoundCloud' },
          { title: 'WONDERLAND Market May 2026', desc: 'Glitta ao vivo no mercado de primavera WONDERLAND - 118 minutos de musical storytelling, do deep house ao techno.', meta: '118 min · ao vivo · maio 2026', aria: 'Abrir WONDERLAND Market de Glitta no SoundCloud' }
        ],
        note: '// perfis reais, sets reais - segue-nos no SoundCloud',
        radioCta: '→ mais música da manhã na Sunrise Radio'
      },
      gathering: {
        eyebrow: 'Próximo encontro',
        titlePre: 'MULTIVERSE III · ',
        titleEm: 'Sarmatia',
        flyerPre: 'Uma noite. Uma clareira. ',
        flyerEm: 'Todos os cogumelos brilham.',
        meta: 'Fim de agosto de 2026 · localização revelada 48h antes',
        th: { time: 'Hora', act: 'Nos decks', style: 'Frequência' },
        slots: [
          { time: '21:00', act: 'abertura do portão', style: 'encontra o teu lugar, pendura a rede' },
          { time: '22:00', act: 'dust.kobold', style: 'warm-up progressivo · 138 BPM' },
          { time: '00:00', act: 'Moth Mother', style: 'forest · 148 BPM' },
          { time: '02:00', act: 'TITI - set alargado', style: 'full-on multiverso · 145 BPM', headline: true },
          { time: '05:30', act: 'Fern & Findus b2b', style: 'downtempo ao nascer do sol, à beira-rio' }
        ],
        foot: 'A capacidade é uma clareira. Quem chega primeiro, brilha primeiro.',
        cta: 'Entrar na lista',
        mailSubject: 'Multiverse III · Sarmatia - contem comigo'
      },
      bookingForm: {
        eyebrow: 'Reservas',
        titlePre: 'Tragam a ',
        titleEm: 'frequência',
        intro: 'Clube, festival ou festa privada - contem-nos o que estão a planear. Cada pedido recebe logo uma confirmação e depois uma resposta pessoal nossa.',
        name: 'Nome',
        namePh: 'Quem nos escreve?',
        email: 'E-mail',
        emailPh: 'para onde respondemos',
        date: 'Data',
        place: 'Local',
        placePh: 'clube, open air, sala de estar ...',
        message: 'A vossa ideia',
        messagePh: 'Ocasião, vibe, horários, orçamento - tudo ajuda.',
        submit: 'Enviar pedido',
        sending: 'A voar ...',
        doneTitle: 'Chegou.',
        doneLine: 'O teu pedido aterrou - uma confirmação vai a caminho da tua caixa de correio, e respondemos pessoalmente.',
        errorLine: 'Falta qualquer coisa - confere o nome, o e-mail e a mensagem.',
        fallbackLine: 'A linha direta está a dormir -',
        fallbackCta: 'abre antes um rascunho de e-mail'
      },
      live: { eyebrow: 'Ao vivo', titlePre: 'Direto da ', titleEm: 'pista', caption: 'um minuto de uma noite - som ligado.' },
      gallery: { eyebrow: 'Galeria', titlePre: 'Noites que ', titleEm: 'brilham' },
      finale: {
        kicker: 'Reservas & contacto',
        titleLines: ['Uma.', 'Frequência.', 'Partilhada.'],
        sub: 'Lineups 100% femininos, engenharia de som profissional e uma experiência para clubes, festivais e eventos privados - onde as pessoas se juntam através da música.',
        cta: 'Reservar TiTis on Decks',
        mailSubject: 'Pedido de reserva - TiTis on Decks',
        instagram: 'Instagram'
      },
      river: {
        left: 'TITIS ON DECKS · COLETIVO FEMININO DE DJS',
        right: 'APOIO EM VEZ DE COMPETIÇÃO · ENCORAJAMENTO EM VEZ DE EGO',
        pinkLink: 'ver em rosa',
        warmLink: 'voltar ao lado quente'
      }
    }
  },

  /* ---------------- English ---------------- */
  en: {
    meta: { title: 'TiTis on Decks - a female DJ collective' },
    radio: {
      kicker: 'The morning side of Titis on Decks',
      intro: "When the last kick fades, the forest doesn't go quiet - it just changes key. Sunrise Radio collects the music of that hour: warm, unhurried sets about nature, love and unity, with a deep bow to the women behind the decks and the softer frequencies they bring. Fewer elbows, more embrace.",
      featureLabel: 'First transmission',
      featureCaption: 'Glitta on the decks - somewhere between the afterhour and birdsong.',
      moreTitle: 'More transmissions',
      filterLabel: 'Filter sets by DJ',
      filterAll: 'All',
      values: 'Nature · Love · Unity',
      back: 'Back into the night'
    },
    events: {
      back: 'Back',
      kicker: 'Where to hear us',
      title: 'Dates',
      intro: 'Where the decks go next. Everything here is confirmed - if nothing is here, nothing is confirmed.',
      doors: 'Doors',
      lineup: 'Line-up',
      tickets: 'Tickets',
      entry: 'Entry',
      emptyTitle: 'Nothing announced yet',
      emptyBody: 'The next date is not settled. If you want us somewhere - ask.',
      emptyCta: 'Book the collective',
      moreLine: 'Want us at yours?',
      viewFlyer: 'View the flyer full size',
      closeFlyer: 'Close the flyer',
    },
    carla: {
      kicker: 'Template page',
      alt: 'A hooded figure with glowing eyes standing in neon ruins, rain pools and signage all around',
      caption: 'Carla Heinz - DJ, DJane, neither, both.',
      intro: 'This is what an artist page looks like here: one picture, one name, a few lines. Carla Heinz has been playing for thirteen years, surfaces out of the fog just before sunrise, and has never come out fully recognisable in a single photo. Whether the booking says DJ or DJane has never once come up.',
      note: 'Carla Heinz does not exist. This page is the template - for everyone who plays with us. The picture, the words and the links become real; the rest stays exactly like this.',
      back: 'Back to the collective'
    },
    glitta: {
      kicker: 'Co-founder · TiTis on Decks',
      alt: 'Glitta smiling behind a Pioneer DJ setup, framed by plants and a giant moth mural',
      caption: 'Glitta - somewhere between the afterhour and birdsong.',
      intro: 'One half of TiTis on Decks. Glitta tells stories in sets - deep house that slowly remembers it is techno - and she is famously the one who decides when the night ends. Spoiler: not yet.',
      listen: 'Listen on',
      deckLabel: 'On the turntable',
      deck: 'Perplexico - a track by Glitta. Drop the needle and it plays.',
      dropNeedle: 'drop the needle',
      liftNeedle: 'lift the needle',
      nowPlaying: 'now playing',
      note: 'More of Glitta - her sets, her nights, her plants - grows here soon. Until then, the moth knows where to find her.',
      back: 'Back to the collective'
    },
    nuBreed: {
      back: 'Back to the collective',
      kicker: 'Multiverse IV · Amazonia',
      tagline: 'Day 3 of 3',
      flyerAlt: 'Anni Amazon in bronze armour, sunglasses pushed up, sword raised, laughing into a golden sunset',
      viewFlyer: 'View the flyer full size',
      intro: 'Two days in, the festival has thinned out. The purists went home when the sun came up, the tourists went home when the money ran out, and what is left on the ridge at Themiscyra on a Sunday afternoon is the nu breed - armour dented, sunglasses on the forehead, entirely unbothered. Anni raises the sword. Somebody puts a record on. Day three begins.',
      whenLabel: 'When',
      when: 'Sunday 23 August 2026 - from 14:00, until it stops',
      whereLabel: 'Where',
      where: 'Themiscyra - the ridge above the old columns',
      whoLabel: 'Who',
      lineup: [
        { name: 'Lutzi', note: 'acid techno, no mercy on a Sunday' },
        { name: 'Glitta', note: 'decides when it ends' },
        { name: 'Malediven Toni', note: 'writes the tracks Anni raises the sword to' },
      ],
      watchLabel: 'The video',
      videoLabel: 'Anni, Amazon Warrior - the video for the track',
      videoNote: 'Anni, Amazon Warrior by Malediven Toni - the track this night is cut from. With sound.',
      flyerLink: 'View the flyer',
      soundLabel: 'The soundtrack',
      soundNote: 'Four real tracks and sets - the only part of this night that actually exists.',
      openOn: 'open on SoundCloud',
      hostLabel: 'Host',
      host: 'Anni Amazon - still standing on day three',
      wink: 'None of this happened. There is no festival, no ridge, no Sunday: Nu Breed is a running joke between friends, printed properly and hung on the internet. The DJs are real, the sword is not, and nobody is selling a ticket.',
      close: 'Different sounds · Different characters · One shared frequency'
    },
    joy: {
      back: 'Back to the collective',
      kicker: 'An homage · not a night',
      titleCall: 'Celebrate Women!',
      titleAll: 'All of them!',
      tagline: 'No ideal. No type. No ranking.',
      intro: 'This one is not a night and not a joke, so it does not end by admitting none of it happened. Half of everyone is women, this collective is made of them, and the floor they build is the best argument we have. So: no line-up, no date, no photograph. Just the sentence, said out loud.',
      listLabel: 'All of them',
      list: [
        'the one at the decks - and the one who taught her',
        'the one who built the deco and never posted a picture of it',
        'the one who drove home sober so five others could dance',
        'the one who came on her own and danced anyway',
        'the one who checked on a stranger by the sinks',
        'the loud one and the quiet one, neither of them doing it wrong',
        'the one who is nineteen and the one who is sixty, same floor, same track',
        'the one nobody has thanked yet',
      ],
      listNote: 'No order, no categories, no best of. The list is long on purpose - and still far too short.',
      inner: 'Beauty here means the kind that shows in what somebody does: who carries the crate, who keeps an eye on the room, who still makes space on a packed floor at four in the morning. That it so often arrives beautifully wrapped as well is a bonus - never a condition.',
      wink: 'There is no photograph on this page, on purpose. No single face can stand for everyone, and any picture that tried would be picking one. So the picture here is light: colours that make new colours where they overlap - and white where all of them do.',
      close: 'Different sounds · Different characters · One shared frequency'
    },
    love: {
      back: 'Back to the collective',
      kicker: 'The true celebration · not a night',
      titleSub: 'The true celebration.',
      intro: 'On /joy they are named one by one. This page says what the naming is for. Love here is not the soft word people reach for to avoid saying anything - it is the working kind: showing up, carrying the heavy end, making room, and staying once it stops being fun. The floor at four in the morning runs on it. So does everything else worth having.',
      hopeLabel: 'The bet',
      hope: 'If this species gets through the next stretch, it will not be because somebody won an argument. It will be because enough people kept rooms alive - fed them, cooled them down, noticed who was missing - and because the tools we are building now got pointed at helping rather than at winning. Women have been doing the first part unpaid for as long as there have been records. The machines are new here, this page was built with one, and the honest division of labour is simple: one of us carries the crates, and it is not the machine.',
      silverGloss: 'Not the men who stopped beating their chests years ago and got on with the work - they are already on the list next door. The other ones: the loudest thing in every room, certain the floor is a stage and everybody else is the audience. Sit down. The music is fine without you.',
      note: 'Aimed at behaviour, not at anybody\'s birth. A celebration of half the world that writes off the other half is just the old sorting with the labels swapped - and that would undo the very thing this page came to say.',
      close: 'Different sounds · Different characters · One shared frequency'
    },
    pluribus: {
      back: 'Back to the collective',
      kicker: 'The political one · not a night',
      tagline: 'Out of many, one.',
      intro: 'This is the political page, and it is short. A dance floor is the smallest working model of the thing every constitution is trying to describe: a few hundred people who did not choose each other, in one room, for one night, arranged so that nobody has to become somebody else to be allowed in. None of that is soft. It is the hardest thing people do - done badly at the scale of countries, and surprisingly well at four in the morning.',
      floorLabel: 'What the floor already knows',
      floor: [
        'Nobody at the door asks where you are from. The only question is whether you can share a room.',
        'Difference is the material, not the problem. A room where everybody is the same has no music in it, only volume.',
        'The rule is conduct, not origin - and it is enforced on the regulars first, or it is not a rule.',
        'One person visibly saying no changes what everybody else thinks is normal. That is not a hope. It has been measured.',
      ],
      limitLabel: 'And the part nobody likes saying',
      limit: 'An open floor is not a suicide pact, and door staff worked this out long before philosophers wrote it down: let in the one who drives everybody else out, and you no longer have an open floor - you have his. Germany wrote that lesson into its constitution, having already watched the polite version fail once, from the inside, using its own rules. Open to everyone who can share the room. Closed to the project of ending the room. There is no third setting, and pretending there is has a body count.',
      mosaicNote: 'Every tile up there is its own colour, and not one of them is the picture. Step back: one thing. Step in: a hundred and forty-four. Both true in the same moment - which is the entire motto, and why a dead language needs three words for what an argument cannot finish.',
      bleed: 'We all bleed the same colour. It is the least interesting fact about any of us, and the only one that settles the argument.',
      origin: 'E pluribus unum - thirteen colonies, one seal, 1782. It was the de facto motto of the United States until 1956. It does not belong to any country that stops meaning it.',
      close: 'Different sounds · Different characters · One shared frequency'
    },
    soon: {
      kicker: 'A female DJ collective',
      line: 'We are rebuilding the multiverse - the site returns soon.',
      contact: 'Booking & contact',
      mailSubject: 'Booking request - TiTis on Decks',
      values: 'Different sounds · Different characters · One shared frequency'
    },
    upload: {
      eyebrow: 'Upload',
      titlePre: 'Send us ',
      titleEm: 'the night',
      intro: 'Photos, video scraps, sets - whatever is left of a gathering. Pick the files, type the word, done. They land straight with us, no detour through somebody else’s folder.',
      who: 'Who is sending?',
      whoPh: 'your name - so we can place it',
      passcode: 'The word',
      passcodePh: 'from Lutzi or Glitta',
      files: 'Files',
      submit: 'Upload',
      sending: 'Going up ...',
      queued: 'waiting',
      landed: 'landed',
      failed: 'missed',
      wrongPasscode: 'That word does not match - ask Lutzi or Glitta.',
      offline: 'The upload desk is not set up yet - tell us.',
      hint: 'Images, video and audio up to 1 GB per file. Several at once is fine.',
      doneOne: 'One file is here. Thank you!',
      doneMany: '{n} files are here. Thank you!'
    },
    gallery: {
      eyebrow: 'Landed',
      titlePre: 'What you ',
      titleEm: 'sent us',
      loading: 'Fetching ...',
      empty: 'Nothing yet. The first upload shows up here.',
      failed: 'Could not load the list.',
      needsWord: 'Type the word on the send side first.',
      remove: 'Delete',
      confirm: 'Really delete?',
      cancel: 'Never mind',
      tabSend: 'Send',
      tabSent: 'Sent'
    },

    /* ------ the real home page ------ */
    home: {
      nav: { who: 'Who we are', story: 'Story', sound: 'Sound', gallery: 'Gallery', booking: 'Booking', radio: 'Radio', events: 'Dates' },
      nextDates: {
        eyebrow: 'Next dates',
        titlePre: 'Where to ',
        titleEm: 'hear us',
        all: 'All dates',
      },
      hero: {
        eyebrow: 'A female DJ collective',
        sub: 'Different sounds. Different characters. One shared frequency.',
        ctaListen: 'Listen to the sets',
        ctaBook: 'Book the collective'
      },
      who: {
        eyebrow: 'Who we are',
        titlePre: 'The Mediterranean meets ',
        titleEm: 'the Atlantic',
        paragraphs: [
          '**TiTis on Decks** is a female DJ collective by **Lutzi** and **Glitta**. Sometimes the most meaningful collaborations are born from unexpected places: what brought the two closer together was loss. Out of friendship, a shared passion, and countless hours behind the decks, a vision slowly began to take shape.',
          "On stage, our energy couldn't be more different - and that's exactly where the magic happens. The Mediterranean Sea meets the Atlantic Ocean. Acid Techno Fraggle meets Afterhour Marathon Fraggle.",
          'Different sounds. Different characters. **One shared frequency.** The synergy is pure power.'
        ],
        factsLabel: 'Quick facts',
        facts: [
          { dt: 'Born from', dd: 'Ladies Night at FridayHappiness in Tojeiro' },
          { dt: 'Sound', dd: 'Underground tekno & acid to house, techno, minimal, downtempo & afterhours' },
          { dt: 'We bring', dd: 'Complete female lineups · professional sound engineering' },
          { dt: 'Booked for', dd: 'Clubs, festivals, private events - wherever people come together through music' }
        ]
      },
      story: {
        eyebrow: 'Our story',
        titlePre: 'One simple ',
        titleEm: 'question',
        quote: '"Why are so many outstanding female DJs never playing on the same lineup?"',
        paragraphs: [
          'Around six years ago, one simple question sparked an idea. There were so many women making incredible music - DJs with exceptional skills, unique sounds, and a genuine love for the craft. Not there to follow trends. There because they live and breathe music.',
          'The vision was simple: bring these artists together and let the music speak for itself. That vision became **Ladies Night at FridayHappiness** in Tojeiro. As the events grew, something unexpected happened: again and again, the DJs told us how much they appreciated the atmosphere behind the decks. Support instead of competition. Encouragement instead of ego. Only then did we realise how rare that had become.',
          'What began as a single event has evolved into an independent female DJ collective - built on outstanding music, mutual respect, and genuine connection. Because we believe the energy behind the decks always finds its way onto the dance floor.'
        ]
      },
      create: {
        eyebrow: 'What we create',
        titlePre: 'Made from ',
        titleEm: 'contrasts',
        lead: 'Every DJ adds her own colour to the journey. Come and hear sounds you may never have experienced before.',
        statement: "The best lineups aren't made from copies. They're made from **contrasts**.",
        focus: 'We know we make great music. Quality always speaks louder than stereotypes - and the focus stays exactly where it belongs: on the music.'
      },
      sound: {
        eyebrow: 'Sound',
        titlePre: 'Sets from ',
        titleEm: 'the collective',
        sets: [
          { title: '3 Empresses', desc: 'Two founders, one booth - the collective distilled into a single B2B journey through techno, acid and deep house.', meta: '154 min · b2b · Dec 2025', aria: 'Open 3 Empresses - Glitta b2b Lutzi on SoundCloud' },
          { title: 'dirty feet', desc: 'Lutzi solo - 64 minutes of techno with the harder, Mediterranean edge of the night.', meta: '64 min · techno · Dec 2025', aria: 'Open dirty feet by Lutzi on SoundCloud' },
          { title: 'WONDERLAND Market May 2026', desc: 'Glitta live at the WONDERLAND spring market - 118 minutes of musical storytelling, from deep house into techno.', meta: '118 min · live cut · May 2026', aria: 'Open WONDERLAND Market by Glitta on SoundCloud' }
        ],
        note: '// real profiles, real sets - follow us on SoundCloud',
        radioCta: '→ more morning music on Sunrise Radio'
      },
      gathering: {
        eyebrow: 'Next gathering',
        titlePre: 'MULTIVERSE III · ',
        titleEm: 'Sarmatia',
        flyerPre: 'One night. One clearing. ',
        flyerEm: 'All the mushrooms glow.',
        meta: 'Late August 2026 · location drops 48h before',
        th: { time: 'Time', act: 'On decks', style: 'Frequency' },
        slots: [
          { time: '21:00', act: 'gate opens', style: 'find your spot, hang your hammock' },
          { time: '22:00', act: 'dust.kobold', style: 'progressive warm-up · 138 BPM' },
          { time: '00:00', act: 'Moth Mother', style: 'forest · 148 BPM' },
          { time: '02:00', act: 'TITI - extended set', style: 'full-on multiverse · 145 BPM', headline: true },
          { time: '05:30', act: 'Fern & Findus b2b', style: 'sunrise downtempo, river-side' }
        ],
        foot: 'Capacity is one clearing. First come, first glows.',
        cta: 'Get on the list',
        mailSubject: 'Multiverse III · Sarmatia - count me in'
      },
      bookingForm: {
        eyebrow: 'Booking',
        titlePre: 'Bring home the ',
        titleEm: 'frequency',
        intro: 'Club, festival or private party - tell us what you are planning. Every request gets an instant confirmation and then a personal reply from us.',
        name: 'Name',
        namePh: 'Who is writing?',
        email: 'Email',
        emailPh: 'where we should reply',
        date: 'Date',
        place: 'Place / venue',
        placePh: 'club, open air, living room ...',
        message: 'Your idea',
        messagePh: 'Occasion, vibe, times, budget - everything helps.',
        submit: 'Send request',
        sending: 'Flying out ...',
        doneTitle: 'Landed.',
        doneLine: 'Your request has landed - a confirmation is on its way to your inbox, and we will get back to you personally.',
        errorLine: 'Something is missing - check name, email and message.',
        fallbackLine: 'The direct line is asleep right now -',
        fallbackCta: 'open a mail draft instead'
      },
      live: { eyebrow: 'Live', titlePre: 'Straight from ', titleEm: 'the floor', caption: 'one minute from a night - sound on.' },
      gallery: { eyebrow: 'Gallery', titlePre: 'Nights that ', titleEm: 'glow' },
      finale: {
        kicker: 'Booking & contact',
        titleLines: ['One.', 'Shared.', 'Frequency.'],
        sub: 'Complete female lineups, professional sound engineering, and an experience for clubs, festivals and private events - wherever people come together through music.',
        cta: 'Book TiTis on Decks',
        mailSubject: 'Booking request - TiTis on Decks',
        instagram: 'Instagram'
      },
      river: {
        left: 'TITIS ON DECKS · FEMALE DJ COLLECTIVE',
        right: 'SUPPORT INSTEAD OF COMPETITION · ENCOURAGEMENT INSTEAD OF EGO',
        pinkLink: 'see it in pink',
        warmLink: 'back to the warm side'
      }
    }
  }
}
