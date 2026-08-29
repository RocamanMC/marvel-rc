import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Film, 
  Tv, 
  Sparkles, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Search, 
  Filter, 
  Compass, 
  Info, 
  Layers, 
  Flame, 
  Shield, 
  Zap, 
  Award, 
  ChevronRight, 
  X, 
  Eye, 
  Bookmark, 
  GitBranch, 
  GitMerge, 
Skull,
  Star,
  ArrowRight,
  Maximize2,
  Minimize2,
  Activity,
  Globe,
  Radio,
  Server,
  Lock
} from 'lucide-react';

// --- BASE DE DATOS COMPLETA Y ACTUALIZADA DE MARVEL MULTIVERSE ---
const MARVEL_DATABASE = [
  // --- ERA 1: ORÍGENES Y SIGLO XX (1942 - 1995) ---
  {
    id: "cap-1",
    poster: "https://image.tmdb.org/t/p/w500/82ucHZ4ioVGiweT1XMl1mUZaodq.jpg",
    title: "Capitán América: El Primer Vengador",
    originalTitle: "Captain America: The First Avenger",
    releaseYear: 2011,
    timelineYear: "1942 - 1945",
    chronoOrder: 1,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 1",
    era: "Orígenes y Siglo XX",
    duration: "124 min",
    posterGradient: "from-blue-700 via-red-600 to-slate-900",
    coverTag: "Nacimiento del Primer Vengador",
    synopsis: "Durante la Segunda Guerra Mundial, Steve Rogers se somete al experimento del supersoldado y combate a HYDRA y Cráneo Rojo, asegurando el Teseracto (Gema del Espacio).",
    chronoReason: "Punto de partida histórico del UCM. Establece a Steve Rogers, Bucky Barnes, Peggy Carter, Howard Stark y la primera Gema del Infinito en la Tierra.",
    multiverseConnections: "Su escudo y suero son la base de todo el UCM. Su viaje temporal en Endgame cierra su ciclo vital.",
    characters: ["Steve Rogers", "Peggy Carter", "Bucky Barnes", "Red Skull", "Howard Stark"],
    rating: "6.9/10",
    doomsdayTier: "tier-3"
  },
  {
    id: "agent-carter",
    poster: "https://image.tmdb.org/t/p/w500/scZsg0rfAyH8ADphzrdhgo5jAXd.jpg",
    title: "Agente Carter (Temporadas 1 y 2)",
    originalTitle: "Marvel's Agent Carter",
    releaseYear: 2015,
    timelineYear: "1946 - 1947",
    chronoOrder: 2,
    type: "series",
    universe: "UCM / Marvel TV",
    universeKey: "mcu",
    phase: "Fase 2 (TV)",
    era: "Orígenes y Siglo XX",
    duration: "2 Temp. (18 eps)",
    posterGradient: "from-red-800 via-amber-700 to-stone-900",
    coverTag: "Fundación de S.H.I.E.L.D.",
    synopsis: "Peggy Carter trabaja en la Reserva Científica Estratégica en la posguerra mientras colabora en misiones encubiertas con Edwin Jarvis para limpiar el nombre de Howard Stark.",
    chronoReason: "Muestra las raíces secretas de S.H.I.E.L.D. tras la desaparición de Steve Rogers en el hielo.",
    multiverseConnections: "Edwin Jarvis (James D'Arcy) saltó directamente al cine canónico en Avengers: Endgame.",
    characters: ["Peggy Carter", "Edwin Jarvis", "Howard Stark", "Daniel Sousa"],
    rating: "7.9/10",
    doomsdayTier: "optional"
  },
  {
    id: "xmen-first-class",
    poster: "https://image.tmdb.org/t/p/w500/6ED3G0lpBXRZtEDJD2xVYsqIwxI.jpg",
    title: "X-Men: Primera Generación",
    originalTitle: "X-Men: First Class",
    releaseYear: 2011,
    timelineYear: "1962",
    chronoOrder: 3,
    type: "movie",
    universe: "Universo Mutante (Fox / Tierra-10005)",
    universeKey: "xmen",
    phase: "Saga Mutante Fox",
    era: "Orígenes y Siglo XX",
    duration: "132 min",
    posterGradient: "from-amber-600 via-blue-900 to-neutral-900",
    coverTag: "Amistad de Charles & Magneto",
    synopsis: "Durante la Crisis de los Misiles en Cuba, un joven Charles Xavier y Erik Lehnsherr reúnen a los primeros mutantes contra Sebastian Shaw y el Club Fuego Infernal.",
    chronoReason: "Primer punto cronológico del universo mutante de Fox previo a la alteración temporal de Días del Futuro Pasado.",
    multiverseConnections: "Conecta con la aparición de Charles Xavier en Doctor Strange 2 (Tierra-838) y el rescate de los mutantes en Deadpool & Wolverine.",
    characters: ["Charles Xavier", "Erik Lehnsherr (Magneto)", "Raven (Mystique)", "Sebastian Shaw", "Beast"],
    rating: "7.7/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "f4-first-steps",
    poster: "https://image.tmdb.org/t/p/w500/ckfiXWGEMWrUP53cc6QyHijLlhl.jpg",
    title: "The Fantastic Four: First Steps",
    originalTitle: "The Fantastic Four: First Steps",
    releaseYear: 2025,
    timelineYear: "Años 60 (Tierra Retro Alterna)",
    chronoOrder: 4,
    type: "movie",
    universe: "Los 4 Fantásticos / UCM Multiverso",
    universeKey: "f4",
    phase: "Fase 6",
    era: "Orígenes y Siglo XX",
    duration: "130 min",
    posterGradient: "from-blue-600 via-cyan-500 to-indigo-950",
    coverTag: "La Primera Familia Marvel",
    synopsis: "En una deslumbrante Tierra retro-futurista de los años 60, Reed Richards, Sue Storm, Johnny Storm y Ben Grimm enfrentan al devorador cósmico Galactus y a Silver Surfer.",
    chronoReason: "Se ubica en los años 60 de un universo paralelo antes de que sus eventos colisionen directamente con la Tierra-616 hacia Avengers: Doomsday.",
    multiverseConnections: "Pilar fundamental para Doomsday: Reed Richards (Pedro Pascal) será el gran némesis ideológico y científico de Victor Von Doom (Robert Downey Jr.).",
    characters: ["Reed Richards (Pedro Pascal)", "Sue Storm (Vanessa Kirby)", "Johnny Storm (Joseph Quinn)", "Ben Grimm (Ebon Moss-Bachrach)", "Galactus", "Silver Surfer"],
    rating: "8.1/10",
    doomsdayTier: "tier-1"
  },
  {
    id: "xmen-dofp-past",
    poster: "https://image.tmdb.org/t/p/w500/ggb9nmS5alJuA0ll0iU5YHiGbb0.jpg",
    title: "X-Men: Días del Futuro Pasado",
    originalTitle: "X-Men: Days of Future Past",
    releaseYear: 2014,
    timelineYear: "1973 / 2023 (Bifurcación Temporal)",
    chronoOrder: 5,
    type: "movie",
    universe: "Universo Mutante (Fox / Tierra-10005)",
    universeKey: "xmen",
    phase: "Saga Mutante Fox",
    era: "Orígenes y Siglo XX",
    duration: "131 min",
    posterGradient: "from-purple-900 via-blue-950 to-slate-900",
    coverTag: "Fractura de la Línea Mutante",
    synopsis: "Wolverine viaja en el tiempo desde un futuro distópico de 2023 hasta 1973 para evitar que Mystique asesine a Bolivar Trask y salvar a la especie mutante.",
    chronoReason: "Crea la bifurcación temporal que reescribe la historia de las películas originales de X-Men.",
    multiverseConnections: "Establece los viajes temporales en la franquicia de Fox y une dos generaciones de actores que colisionan con el UCM.",
    characters: ["Logan (Wolverine)", "Charles Xavier", "Magneto", "Mystique", "Bolivar Trask"],
    rating: "7.9/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "xmen-origins-wolverine",
    poster: "https://image.tmdb.org/t/p/w500/k2wFS6LAYDjOdSAtRc1Ey7roB4G.jpg",
    title: "X-Men Orígenes: Wolverine",
    originalTitle: "X-Men Origins: Wolverine",
    releaseYear: 2009,
    timelineYear: "1979 - 1981",
    chronoOrder: 6,
    type: "movie",
    universe: "Universo Mutante (Fox)",
    universeKey: "xmen",
    phase: "Saga Mutante Fox",
    era: "Orígenes y Siglo XX",
    duration: "107 min",
    posterGradient: "from-amber-700 via-orange-950 to-zinc-900",
    coverTag: "Esqueleto de Adamantium",
    synopsis: "Explora el violento pasado de James Howlett (Logan), su paso por varias guerras con Sabretooth y el experimento Arma X con William Stryker.",
    chronoReason: "Explica cómo Logan adquirió sus garras de adamantium y la pérdida de memoria previa a los X-Men.",
    multiverseConnections: "Contiene la versión de Arma XI parodiada en Deadpool 2 y Deadpool & Wolverine.",
    characters: ["Logan (Wolverine)", "Victor Creed", "William Stryker", "Wade Wilson (Arma XI)", "Gambit"],
    rating: "6.5/10",
    doomsdayTier: "optional"
  },
  {
    id: "xmen-apocalypse",
    poster: "https://image.tmdb.org/t/p/w500/i5ET4lACwrb97sdPzmIThieasOk.jpg",
    title: "X-Men: Apocalipsis",
    originalTitle: "X-Men: Apocalypse",
    releaseYear: 2016,
    timelineYear: "1983",
    chronoOrder: 7,
    type: "movie",
    universe: "Universo Mutante (Línea Nueva Fox)",
    universeKey: "xmen",
    phase: "Saga Mutante Fox",
    era: "Orígenes y Siglo XX",
    duration: "144 min",
    posterGradient: "from-blue-900 via-purple-900 to-black",
    coverTag: "El Primer Mutante",
    synopsis: "En-Sabah-Nur, el primer mutante de la historia, despierta en los años 80 y recluta a cuatro jinetes para purificar el planeta.",
    chronoReason: "Continúa la nueva línea temporal creada en 1973, presentando a Jean Grey, Cyclops y Storm jóvenes.",
    multiverseConnections: "Primera manifestación del poder latente del Fénix cósmico.",
    characters: ["Apocalipsis", "Charles Xavier", "Magneto", "Jean Grey", "Cyclops", "Quicksilver"],
    rating: "6.8/10",
    doomsdayTier: "optional"
  },
  {
    id: "xmen-dark-phoenix",
    poster: "https://image.tmdb.org/t/p/w500/rdByKDkfyVuVSrkllzxKYXiZmTd.jpg",
    title: "X-Men: Dark Phoenix",
    originalTitle: "Dark Phoenix",
    releaseYear: 2019,
    timelineYear: "1992",
    chronoOrder: 8,
    type: "movie",
    universe: "Universo Mutante (Línea Nueva Fox)",
    universeKey: "xmen",
    phase: "Saga Mutante Fox",
    era: "Orígenes y Siglo XX",
    duration: "113 min",
    posterGradient: "from-red-600 via-orange-800 to-neutral-950",
    coverTag: "La Fuerza Cósmica del Fénix",
    synopsis: "Durante una misión de rescate en el espacio, Jean Grey es alcanzada por una llamarada cósmica que desata una fuerza oscura dentro de ella.",
    chronoReason: "Cierre de la tetralogía de precuelas de los jóvenes X-Men antes de los años 2000.",
    multiverseConnections: "Muestra la entidad cósmica del Fénix.",
    characters: ["Jean Grey", "Charles Xavier", "Magneto", "Cyclops", "Mystique"],
    rating: "5.7/10",
    doomsdayTier: "optional"
  },
  {
    id: "captain-marvel",
    poster: "https://image.tmdb.org/t/p/w500/5SPa7dZ85p54xa7E9tHRmfKq5ce.jpg",
    title: "Capitana Marvel",
    originalTitle: "Captain Marvel",
    releaseYear: 2019,
    timelineYear: "1995",
    chronoOrder: 9,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 3",
    era: "Orígenes y Siglo XX",
    duration: "123 min",
    posterGradient: "from-amber-500 via-red-600 to-blue-900",
    coverTag: "Iniciativa Vengadores & Carol Danvers",
    synopsis: "Vers, una guerrera Kree en la Tierra de 1995, descubre junto a Nick Fury su verdadera identidad como Carol Danvers y absorbe el poder del Teseracto.",
    chronoReason: "Narra el origen de Carol y la creación de la Iniciativa Vengadores.",
    multiverseConnections: "Conduce al entrelazamiento cuántico y la apertura de portales en The Marvels.",
    characters: ["Carol Danvers", "Nick Fury", "Talos", "Yon-Rogg", "Maria Rambeau"],
    rating: "6.8/10",
    doomsdayTier: "tier-3"
  },

  // --- ERA 2: EL ALBA DE LOS HÉROES Y VARIANTES MULTIVERSALES (2000 - 2007) ---
  {
    id: "xmen-1",
    poster: "https://image.tmdb.org/t/p/w500/aF170xLGytZcC0xeSlSamImgIi4.jpg",
    title: "X-Men",
    originalTitle: "X-Men",
    releaseYear: 2000,
    timelineYear: "2000 (Línea Original Fox)",
    chronoOrder: 10,
    type: "movie",
    universe: "Universo Mutante (Fox / Tierra-10005)",
    universeKey: "xmen",
    phase: "Saga Clásica Fox",
    era: "Variantes Multiversales (2000s)",
    duration: "104 min",
    posterGradient: "from-slate-700 via-zinc-800 to-black",
    coverTag: "El Comienzo del Cine Mutante",
    synopsis: "Wolverine y Rogue son acogidos por Charles Xavier en su escuela para jóvenes dotados, mientras Magneto planea mutar a los líderes mundiales.",
    chronoReason: "Punto de partida del universo clásico de Fox y del Logan de Hugh Jackman.",
    multiverseConnections: "Sus personajes y variantes son rescatados en Deadpool & Wolverine y regresarán en Secret Wars.",
    characters: ["Wolverine", "Profesor X", "Magneto", "Jean Grey", "Cyclops", "Storm", "Rogue"],
    rating: "7.3/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "spiderman-1-raimi",
    poster: "https://image.tmdb.org/t/p/w500/bCDaKZLRkrVVtPNyHxUfKvepW1N.jpg",
    title: "Spider-Man (Tobey Maguire)",
    originalTitle: "Spider-Man",
    releaseYear: 2002,
    timelineYear: "2002 (Tierra-96283)",
    chronoOrder: 11,
    type: "movie",
    universe: "Spider-Verse / Raimi (Tierra-96283)",
    universeKey: "spidey",
    phase: "Trilogía Sam Raimi",
    era: "Variantes Multiversales (2000s)",
    duration: "121 min",
    posterGradient: "from-red-600 via-blue-700 to-amber-600",
    coverTag: "Un Gran Poder Conlleva una Gran Responsabilidad",
    synopsis: "Tras ser picado por una araña modificada genéticamente, Peter Parker se convierte en Spider-Man y enfrenta al Duende Verde (Norman Osborn).",
    chronoReason: "Nacimiento del Spider-Man clásico de Tobey Maguire (Peter-2).",
    multiverseConnections: "Norman Osborn (Willem Dafoe) y Peter Parker saltan al UCM en No Way Home.",
    characters: ["Peter Parker (Tobey Maguire)", "Mary Jane Watson", "Norman Osborn (Duende Verde)", "Harry Osborn"],
    rating: "7.4/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "daredevil-2003",
    poster: "https://image.tmdb.org/t/p/w500/jH3EQ7bzb0kFLYRaMb0YNmTs8Iu.jpg",
    title: "Daredevil (Ben Affleck)",
    originalTitle: "Daredevil",
    releaseYear: 2003,
    timelineYear: "2003 (Tierra-701306)",
    chronoOrder: 12,
    type: "movie",
    universe: "Variantes Legacy (Fox / Pre-MCU)",
    universeKey: "defenders",
    phase: "Películas Legacy",
    era: "Variantes Multiversales (2000s)",
    duration: "103 min",
    posterGradient: "from-red-950 via-rose-900 to-black",
    coverTag: "El Hombre sin Miedo Clásico",
    synopsis: "Matt Murdock, un abogado ciego con sentidos aumentados, combate el crimen en Hell's Kitchen enfrentando a Kingpin y Bullseye.",
    chronoReason: "Película icónica de los 2000 cuyo universo conecta con la Elektra de Jennifer Garner.",
    multiverseConnections: "La Elektra de Jennifer Garner aparece directamente en el Vacío de la TVA en Deadpool & Wolverine (2024).",
    characters: ["Matt Murdock (Ben Affleck)", "Elektra Natchios (Jennifer Garner)", "Bullseye", "Kingpin"],
    rating: "5.3/10",
    doomsdayTier: "optional"
  },
  {
    id: "xmen-2",
    poster: "https://image.tmdb.org/t/p/w500/bst4alFUXCxISwdRUKSMhhkrX1M.jpg",
    title: "X-Men 2",
    originalTitle: "X2: X-Men United",
    releaseYear: 2003,
    timelineYear: "2003 (Línea Original Fox)",
    chronoOrder: 13,
    type: "movie",
    universe: "Universo Mutante (Fox / Tierra-10005)",
    universeKey: "xmen",
    phase: "Saga Clásica Fox",
    era: "Variantes Multiversales (2000s)",
    duration: "134 min",
    posterGradient: "from-blue-800 via-slate-900 to-black",
    coverTag: "Alianza contra William Stryker",
    synopsis: "Tras un atentado contra el presidente, el coronel William Stryker ataca la Mansión X, forzando a los X-Men a una alianza con Magneto.",
    chronoReason: "Profundiza en el pasado de Logan en Lago Alkali y el sacrificio de Jean Grey.",
    multiverseConnections: "Establece el trasfondo canónico citado en Deadpool & Wolverine.",
    characters: ["Wolverine", "Profesor X", "Magneto", "Nightcrawler", "Jean Grey", "William Stryker"],
    rating: "7.4/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "spiderman-2-raimi",
    poster: "https://image.tmdb.org/t/p/w500/tGYrkVuskQKyRZ9WRS6wPTPBJpm.jpg",
    title: "Spider-Man 2 (Tobey Maguire)",
    originalTitle: "Spider-Man 2",
    releaseYear: 2004,
    timelineYear: "2004 (Tierra-96283)",
    chronoOrder: 14,
    type: "movie",
    universe: "Spider-Verse / Raimi (Tierra-96283)",
    universeKey: "spidey",
    phase: "Trilogía Sam Raimi",
    era: "Variantes Multiversales (2000s)",
    duration: "127 min",
    posterGradient: "from-red-600 via-amber-700 to-sky-900",
    coverTag: "El Poder del Sol en la Palma de mi Mano",
    synopsis: "Peter Parker sufre un bloqueo vocacional y pierde temporalmente sus poderes mientras el Dr. Otto Octavius se convierte en el Doctor Octopus.",
    chronoReason: "Cúspide de la era Tobey Maguire.",
    multiverseConnections: "Doc Ock (Alfred Molina) es transportado a la Tierra-616 en No Way Home.",
    characters: ["Peter Parker (Tobey Maguire)", "Doc Ock (Otto Octavius)", "Mary Jane Watson", "Harry Osborn"],
    rating: "7.5/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "f4-2005",
    poster: "https://image.tmdb.org/t/p/w500/l3Yk65bVdgiMOMeK6O8aZxEBt5J.jpg",
    title: "Los 4 Fantásticos (2005)",
    originalTitle: "Fantastic Four",
    releaseYear: 2005,
    timelineYear: "2005 (Tierra-121698)",
    chronoOrder: 15,
    type: "movie",
    universe: "Los 4 Fantásticos (Fox)",
    universeKey: "f4",
    phase: "Saga Clásica Fox",
    era: "Variantes Multiversales (2000s)",
    duration: "106 min",
    posterGradient: "from-blue-600 via-cyan-700 to-slate-900",
    coverTag: "Tormenta de Rayos Cósmicos",
    synopsis: "Cinco astronautas adquieren superpoderes tras una tormenta cósmica, naciendo Mr. Fantástico, la Mujer Invisible, Johnny Storm, La Cosa y el Dr. Doom.",
    chronoReason: "Primera encarnación moderna de Doom y los 4 Fantásticos (con Chris Evans como Johnny Storm).",
    multiverseConnections: "Chris Evans repite este Johnny Storm en el Vacío de Deadpool & Wolverine.",
    characters: ["Reed Richards", "Sue Storm", "Johnny Storm (Chris Evans)", "Ben Grimm", "Dr. Doom"],
    rating: "5.7/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "xmen-3",
    poster: "https://image.tmdb.org/t/p/w500/6FnWDI3mKZhfWv7NznKUFlvSdo0.jpg",
    title: "X-Men: La Batalla Final",
    originalTitle: "X-Men: The Last Stand",
    releaseYear: 2006,
    timelineYear: "2006 (Línea Original Fox)",
    chronoOrder: 16,
    type: "movie",
    universe: "Universo Mutante (Fox / Tierra-10005)",
    universeKey: "xmen",
    phase: "Saga Clásica Fox",
    era: "Variantes Multiversales (2000s)",
    duration: "104 min",
    posterGradient: "from-red-800 via-amber-900 to-black",
    coverTag: "La Cura Mutante y el Fénix Oscuro",
    synopsis: "La aparición de una cura mutante divide al mundo. Jean Grey resurge como el Fénix Oscuro y arrasa con todo a su paso.",
    chronoReason: "Cierre de la trilogía original de Fox que conduce a The Wolverine y al futuro distópico.",
    multiverseConnections: "La muerte de Jean Grey marca el tormento psicológico de Logan.",
    characters: ["Wolverine", "Jean Grey (Fénix)", "Profesor X", "Magneto", "Beast", "Juggernaut"],
    rating: "6.6/10",
    doomsdayTier: "optional"
  },
  {
    id: "spiderman-3-raimi",
    poster: "https://image.tmdb.org/t/p/w500/lkuQzlShE2uzJcsZYU4zBI4VQZP.jpg",
    title: "Spider-Man 3 (Tobey Maguire)",
    originalTitle: "Spider-Man 3",
    releaseYear: 2007,
    timelineYear: "2007 (Tierra-96283)",
    chronoOrder: 17,
    type: "movie",
    universe: "Spider-Verse / Raimi (Tierra-96283)",
    universeKey: "spidey",
    phase: "Trilogía Sam Raimi",
    era: "Variantes Multiversales (2000s)",
    duration: "139 min",
    posterGradient: "from-neutral-900 via-slate-800 to-red-800",
    coverTag: "El Traje Negro, Sandman & Venom",
    synopsis: "Peter Parker es corrompido por un simbionte alienígena mientras enfrenta a Flint Marko (Sandman), Eddie Brock (Venom) y Harry Osborn.",
    chronoReason: "Final de la trilogía de Sam Raimi.",
    multiverseConnections: "Sandman (Thomas Haden Church) cruza al UCM en No Way Home.",
    characters: ["Peter Parker", "Sandman (Flint Marko)", "Eddie Brock (Venom)", "Harry Osborn"],
    rating: "6.3/10",
    doomsdayTier: "optional"
  },
  {
    id: "f4-silver-surfer",
    poster: "https://image.tmdb.org/t/p/w500/pRXgCDTRKEIUy5cySYA4zC5to5B.jpg",
    title: "Los 4 Fantásticos y Silver Surfer",
    originalTitle: "Fantastic Four: Rise of the Silver Surfer",
    releaseYear: 2007,
    timelineYear: "2007 (Tierra-121698)",
    chronoOrder: 18,
    type: "movie",
    universe: "Los 4 Fantásticos (Fox)",
    universeKey: "f4",
    phase: "Saga Clásica Fox",
    era: "Variantes Multiversales (2000s)",
    duration: "92 min",
    posterGradient: "from-cyan-500 via-blue-800 to-slate-950",
    coverTag: "Llegada de Norrin Radd & Galactus",
    synopsis: "La llegada del misterioso Silver Surfer anuncia la inminente destrucción de la Tierra a manos del devorador cósmico Galactus.",
    chronoReason: "Segunda entrega con Galactus y Silver Surfer.",
    multiverseConnections: "Presenta el concepto de Galactus previo a First Steps.",
    characters: ["Silver Surfer", "Reed Richards", "Sue Storm", "Johnny Storm", "Ben Grimm", "Dr. Doom"],
    rating: "5.6/10",
    doomsdayTier: "optional"
  },

  // --- ERA 3: LA SAGA DEL INFINITO (2008 - 2019) ---
  {
    id: "iron-man-1",
    poster: "https://image.tmdb.org/t/p/w500/tFCTNx7foAsUQpgu2x1KjAJD1wT.jpg",
    title: "Iron Man",
    originalTitle: "Iron Man",
    releaseYear: 2008,
    timelineYear: "2008",
    chronoOrder: 19,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 1",
    era: "La Saga del Infinito",
    duration: "126 min",
    posterGradient: "from-red-600 via-amber-500 to-zinc-900",
    coverTag: "Yo Soy Iron Man (Robert Downey Jr.)",
    synopsis: "El multimillonario Tony Stark escapa del cautiverio construyendo una armadura y decide consagrar su tecnología para proteger al mundo.",
    chronoReason: "Piedra angular que da nacimiento a la Línea Sagrada del UCM.",
    multiverseConnections: "Esencial para Doomsday: El rostro de Tony Stark (Robert Downey Jr.) contrasta directamente con su nueva versión multiversal como el tirano Victor Von Doom.",
    characters: ["Tony Stark (Iron Man)", "Pepper Potts", "James Rhodes", "Obadiah Stane", "Nick Fury"],
    rating: "7.9/10",
    doomsdayTier: "tier-1"
  },
  {
    id: "incredible-hulk",
    poster: "https://image.tmdb.org/t/p/w500/p4NYZXVtgKf6aiH65QzzkUVJcsd.jpg",
    title: "El Increíble Hulk",
    originalTitle: "The Incredible Hulk",
    releaseYear: 2008,
    timelineYear: "2008 / 2011",
    chronoOrder: 20,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 1",
    era: "La Saga del Infinito",
    duration: "112 min",
    posterGradient: "from-emerald-700 via-green-950 to-neutral-900",
    coverTag: "Furia Gamma & Abominación",
    synopsis: "Bruce Banner busca una cura contra la radiación gamma mientras el General Ross y Emil Blonsky lo persiguen sin descanso.",
    chronoReason: "Ocurre en la 'Gran Semana de Fury'.",
    multiverseConnections: "El General Ross y Samuel Sterns (El Líder) regresan en Capitán América: Brave New World.",
    characters: ["Bruce Banner (Hulk)", "Betty Ross", "General Ross", "Emil Blonsky"],
    rating: "6.6/10",
    doomsdayTier: "tier-3"
  },
  {
    id: "iron-man-2",
    poster: "https://image.tmdb.org/t/p/w500/ayyJVOV5I4MGjti7nIHC3mVCagR.jpg",
    title: "Iron Man 2",
    originalTitle: "Iron Man 2",
    releaseYear: 2010,
    timelineYear: "2010",
    chronoOrder: 21,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 1",
    era: "La Saga del Infinito",
    duration: "124 min",
    posterGradient: "from-red-600 via-slate-800 to-amber-600",
    coverTag: "Debut de Black Widow & War Machine",
    synopsis: "Tony Stark combate el envenenamiento en su sangre y la venganza de Whiplash mientras el gobierno intenta arrebatarle su tecnología.",
    chronoReason: "Introduce a Black Widow y a War Machine.",
    multiverseConnections: "Desarrollo tecnológico de Stark Industries.",
    characters: ["Tony Stark", "Natasha Romanoff", "James Rhodes", "Ivan Vanko", "Nick Fury"],
    rating: "7.0/10",
    doomsdayTier: "optional"
  },
  {
    id: "thor-1",
    poster: "https://image.tmdb.org/t/p/w500/qFAVW4XJaxhj7PcpiUI5hhO9bOX.jpg",
    title: "Thor",
    originalTitle: "Thor",
    releaseYear: 2011,
    timelineYear: "2011",
    chronoOrder: 22,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 1",
    era: "La Saga del Infinito",
    duration: "115 min",
    posterGradient: "from-blue-700 via-amber-600 to-slate-900",
    coverTag: "El Dios del Trueno & Loki",
    synopsis: "Thor es desterrado a la Tierra por Odín para aprender humildad frente a las conspiraciones de su hermano Loki en Asgard.",
    chronoReason: "Abre el cosmos e introduce a Loki y Hawkeye.",
    multiverseConnections: "Loki se convertirá en el eje central del árbol multiversal.",
    characters: ["Thor", "Loki", "Jane Foster", "Odín", "Erik Selvig", "Clint Barton"],
    rating: "7.0/10",
    doomsdayTier: "tier-3"
  },
  {
    id: "the-avengers",
    poster: "https://image.tmdb.org/t/p/w500/ugX4WZJO3jEvTOerctAWJLinujo.jpg",
    title: "Los Vengadores",
    originalTitle: "The Avengers",
    releaseYear: 2012,
    timelineYear: "2012",
    chronoOrder: 23,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 1",
    era: "La Saga del Infinito",
    duration: "143 min",
    posterGradient: "from-blue-600 via-red-600 to-purple-900",
    coverTag: "La Batalla de Nueva York",
    synopsis: "Nick Fury reúne a Iron Man, Capitán América, Thor, Hulk, Black Widow y Hawkeye para detener la invasión Chitauri liderada por Loki.",
    chronoReason: "Primer gran crossover del UCM y punto de referencia para todo el multiverso.",
    multiverseConnections: "Durante la Batalla de NY en 2012, la variante de Loki escapa con el Teseracto (Loki Temp. 1).",
    characters: ["Iron Man", "Capitán América", "Thor", "Hulk", "Black Widow", "Hawkeye", "Loki", "Thanos"],
    rating: "8.0/10",
    doomsdayTier: "tier-1"
  },
  {
    id: "tasm-1",
    poster: "https://image.tmdb.org/t/p/w500/swjygVNvJ84ztpgfFX9gRr2MPBZ.jpg",
    title: "The Amazing Spider-Man (Andrew Garfield)",
    originalTitle: "The Amazing Spider-Man",
    releaseYear: 2012,
    timelineYear: "2012 (Tierra-120703)",
    chronoOrder: 24,
    type: "movie",
    universe: "Spider-Verse / TASM (Tierra-120703)",
    universeKey: "spidey",
    phase: "Saga Marc Webb",
    era: "Variantes Multiversales (2010s)",
    duration: "136 min",
    posterGradient: "from-sky-600 via-blue-900 to-red-700",
    coverTag: "El Secreto de Oscorp & Gwen Stacy",
    synopsis: "Peter Parker investiga el pasado de sus padres, lo que lo lleva a Oscorp y al Dr. Curt Connors (El Lagarto).",
    chronoReason: "Introducción de Andrew Garfield (Peter-3).",
    multiverseConnections: "Peter-3 y el Lagarto son arrastrados a la Tierra-616 en No Way Home.",
    characters: ["Peter Parker (Andrew Garfield)", "Gwen Stacy", "Dr. Curt Connors (Lagarto)"],
    rating: "6.9/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "iron-man-3",
    poster: "https://image.tmdb.org/t/p/w500/cW0fOIZONkgeiMJDYzqUcgl4MUn.jpg",
    title: "Iron Man 3",
    originalTitle: "Iron Man 3",
    releaseYear: 2013,
    timelineYear: "Navidad 2012 / 2013",
    chronoOrder: 25,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 2",
    era: "La Saga del Infinito",
    duration: "130 min",
    posterGradient: "from-amber-600 via-red-700 to-slate-900",
    coverTag: "Trastorno Postraumático & Extremis",
    synopsis: "Tony Stark combate el trauma psicológico de Nueva York mientras enfrenta al falso Mandarín y a Aldrich Killian.",
    chronoReason: "Explora la fragilidad humana de Stark.",
    multiverseConnections: "Trevor Slattery reaparece en Shang-Chi.",
    characters: ["Tony Stark", "Pepper Potts", "Aldrich Killian", "Trevor Slattery"],
    rating: "7.1/10",
    doomsdayTier: "optional"
  },
  {
    id: "the-wolverine-2013",
    poster: "https://image.tmdb.org/t/p/w500/nnx0puR1AvuYH4iAg0WHH1QcYzE.jpg",
    title: "Wolverine Inmortal",
    originalTitle: "The Wolverine",
    releaseYear: 2013,
    timelineYear: "2013 (Línea Original Fox)",
    chronoOrder: 26,
    type: "movie",
    universe: "Universo Mutante (Fox / Tierra-10005)",
    universeKey: "xmen",
    phase: "Saga Clásica Fox",
    era: "Variantes Multiversales (2010s)",
    duration: "126 min",
    posterGradient: "from-red-900 via-zinc-900 to-stone-950",
    coverTag: "El Samurai y la Espada de Plata",
    synopsis: "Logan viaja a Tokio atormentado por la muerte de Jean Grey, donde conspiran para robarle su factor de curación.",
    chronoReason: "Enlace previo a Días del Futuro Pasado.",
    multiverseConnections: "Escena post-créditos con Magneto y Charles Xavier alertando del peligro de los Centinelas.",
    characters: ["Logan", "Yukio", "Silver Samurai", "Profesor X", "Magneto"],
    rating: "6.7/10",
    doomsdayTier: "optional"
  },
  {
    id: "thor-dark-world",
    poster: "https://image.tmdb.org/t/p/w500/gPAmH41VpK5UPaNhAiNJePzrL8z.jpg",
    title: "Thor: Un Mundo Oscuro",
    originalTitle: "Thor: The Dark World",
    releaseYear: 2013,
    timelineYear: "2013",
    chronoOrder: 27,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 2",
    era: "La Saga del Infinito",
    duration: "112 min",
    posterGradient: "from-slate-800 via-rose-950 to-neutral-950",
    coverTag: "El Éter (Gema de la Realidad)",
    synopsis: "Jane Foster absorbe el Éter cósmico y Thor debe defender Asgard de Malekith y los Elfos Oscuros.",
    chronoReason: "Presenta la Gema de la Realidad.",
    multiverseConnections: "Viaje temporal en Endgame para recuperar el Éter.",
    characters: ["Thor", "Loki", "Jane Foster", "Malekith", "El Coleccionista"],
    rating: "6.8/10",
    doomsdayTier: "optional"
  },
  {
    id: "tasm-2",
    poster: "https://image.tmdb.org/t/p/w500/8W0mMrmaVdSoLz5LnX61gJOXfEb.jpg",
    title: "The Amazing Spider-Man 2: El Poder de Electro",
    originalTitle: "The Amazing Spider-Man 2",
    releaseYear: 2014,
    timelineYear: "2014 (Tierra-120703)",
    chronoOrder: 28,
    type: "movie",
    universe: "Spider-Verse / TASM (Tierra-120703)",
    universeKey: "spidey",
    phase: "Saga Marc Webb",
    era: "Variantes Multiversales (2010s)",
    duration: "142 min",
    posterGradient: "from-sky-500 via-blue-900 to-amber-500",
    coverTag: "La Tragedia de Gwen Stacy & Electro",
    synopsis: "Peter Parker combate a Electro y a Harry Osborn (Duende Verde), culminando en la trágica muerte de Gwen Stacy.",
    chronoReason: "Culminación de Andrew Garfield.",
    multiverseConnections: "Electro (Jamie Foxx) viaja a la Tierra-616 en No Way Home.",
    characters: ["Peter Parker (Andrew Garfield)", "Gwen Stacy", "Max Dillon (Electro)", "Harry Osborn"],
    rating: "6.6/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "cap-winter-soldier",
    poster: "https://image.tmdb.org/t/p/w500/wP7JcCzpWlX5XeROpf4ox9ZVFT6.jpg",
    title: "Capitán América: El Soldado de Invierno",
    originalTitle: "Captain America: The Winter Soldier",
    releaseYear: 2014,
    timelineYear: "2014",
    chronoOrder: 29,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 2",
    era: "La Saga del Infinito",
    duration: "136 min",
    posterGradient: "from-slate-700 via-cyan-900 to-blue-950",
    coverTag: "La Caída de S.H.I.E.L.D. & Bucky Barnes",
    synopsis: "Steve Rogers y Natasha Romanoff descubren la infiltración de HYDRA en S.H.I.E.L.D. y enfrentan al Soldado de Invierno (Bucky).",
    chronoReason: "Derrumba el status quo del espionaje e introduce a Sam Wilson.",
    multiverseConnections: "Base política directa para Civil War, Brave New World y Thunderbolts*.",
    characters: ["Steve Rogers", "Natasha Romanoff", "Sam Wilson", "Bucky Barnes", "Nick Fury"],
    rating: "7.8/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "gotg-1",
    poster: "https://image.tmdb.org/t/p/w500/zqZNnuMtrmK99Xux91KiCdnZxgb.jpg",
    title: "Guardianes de la Galaxia",
    originalTitle: "Guardians of the Galaxy",
    releaseYear: 2014,
    timelineYear: "2014",
    chronoOrder: 30,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 2",
    era: "La Saga del Infinito",
    duration: "121 min",
    posterGradient: "from-purple-700 via-rose-700 to-amber-600",
    coverTag: "El Orbe (Gema del Poder) & Star-Lord",
    synopsis: "Peter Quill roba la Gema del Poder y forma una alianza con Gamora, Drax, Rocket y Groot para detener a Ronan.",
    chronoReason: "Expande el cosmos y presenta formalmente a Thanos.",
    multiverseConnections: "La Gamora de 2014 viaja en el tiempo en Endgame.",
    characters: ["Peter Quill", "Gamora", "Drax", "Rocket", "Groot", "Ronan", "Thanos"],
    rating: "8.0/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "gotg-2",
    poster: "https://image.tmdb.org/t/p/w500/kdg6Y06jfq9FV7qknWNcKLYtBJn.jpg",
    title: "Guardianes de la Galaxia Vol. 2",
    originalTitle: "Guardians of the Galaxy Vol. 2",
    releaseYear: 2017,
    timelineYear: "2014 (Meses tras Vol. 1)",
    chronoOrder: 31,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 3",
    era: "La Saga del Infinito",
    duration: "136 min",
    posterGradient: "from-fuchsia-600 via-cyan-600 to-indigo-950",
    coverTag: "Ego el Planeta Viviente & Yondu",
    synopsis: "Peter Quill descubre la verdad sobre su padre celestial Ego mientras los Guardianes fortalecen sus lazos.",
    chronoReason: "Ocurre en 2014 poco después del Vol. 1.",
    multiverseConnections: "Establece los poderes celestiales y la redención de Nebula.",
    characters: ["Star-Lord", "Gamora", "Drax", "Rocket", "Baby Groot", "Yondu", "Ego", "Mantis"],
    rating: "7.6/10",
    doomsdayTier: "optional"
  },
  {
    id: "daredevil-s1",
    poster: "https://image.tmdb.org/t/p/w500/zFmJQzl6bFrdpHhDkxXmboyykqD.jpg",
    title: "Daredevil (Temporada 1)",
    originalTitle: "Marvel's Daredevil - Season 1",
    releaseYear: 2015,
    timelineYear: "2014 - 2015",
    chronoOrder: 32,
    type: "series",
    universe: "The Defenders Saga / UCM Canónico",
    universeKey: "defenders",
    phase: "The Defenders Saga",
    era: "La Saga del Infinito",
    duration: "1 Temp. (13 eps)",
    posterGradient: "from-red-900 via-rose-950 to-neutral-950",
    coverTag: "El Demonio de Hell's Kitchen & Kingpin",
    synopsis: "Matt Murdock combate por las noches el imperio criminal de Wilson Fisk en Hell's Kitchen.",
    chronoReason: "Inicio de la saga callejera canónica en el UCM.",
    multiverseConnections: "Conduce directamente a Daredevil: Born Again.",
    characters: ["Matt Murdock (Daredevil)", "Wilson Fisk (Kingpin)", "Foggy Nelson", "Karen Page"],
    rating: "8.6/10",
    doomsdayTier: "tier-3"
  },
  {
    id: "f4-2015",
    poster: "https://image.tmdb.org/t/p/w500/349fSE2Zd4fztRKK5BQ08A9rIMI.jpg",
    title: "Cuatro Fantásticos (2015 - Fant4stic)",
    originalTitle: "Fantastic Four",
    releaseYear: 2015,
    timelineYear: "2015 (Tierra-TRN562)",
    chronoOrder: 33,
    type: "movie",
    universe: "Los 4 Fantásticos (Reboot Fox)",
    universeKey: "f4",
    phase: "Reboot Fox",
    era: "Variantes Multiversales (2010s)",
    duration: "100 min",
    posterGradient: "from-emerald-950 via-slate-900 to-black",
    coverTag: "Dimensión Cero & Doom",
    synopsis: "Cuatro científicos viajan al Planeta Zero y sufren una mutación genética extrema enfrentando a Victor Von Doom.",
    chronoReason: "Versión alternativa multiversal de la Primera Familia.",
    multiverseConnections: "Parte del multiverso de Fox absorbido por la TVA.",
    characters: ["Reed Richards (Miles Teller)", "Sue Storm", "Johnny Storm (Michael B. Jordan)", "Ben Grimm", "Victor Von Doom"],
    rating: "4.3/10",
    doomsdayTier: "optional"
  },
  {
    id: "avengers-age-of-ultron",
    poster: "https://image.tmdb.org/t/p/w500/3Lz6h5rlCFNNyCZRaRJ2ZjtBnAE.jpg",
    title: "Vengadores: La Era de Ultrón",
    originalTitle: "Avengers: Age of Ultron",
    releaseYear: 2015,
    timelineYear: "2015",
    chronoOrder: 34,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 2",
    era: "La Saga del Infinito",
    duration: "141 min",
    posterGradient: "from-red-700 via-slate-800 to-cyan-800",
    coverTag: "Nacimiento de Visión & Wanda Maximoff",
    synopsis: "La inteligencia artificial Ultrón busca extinguir a la humanidad. Se unen Wanda Maximoff y Visión (Gema de la Mente).",
    chronoReason: "Destruye Sokovia e introduce a Scarlet Witch y Visión.",
    multiverseConnections: "Trauma que detona los poderes de alteración de la realidad de Wanda en WandaVision.",
    characters: ["Iron Man", "Capitán América", "Thor", "Hulk", "Wanda Maximoff", "Visión", "Ultrón"],
    rating: "7.3/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "ant-man-1",
    poster: "https://image.tmdb.org/t/p/w500/zwuE28gSXlLFLgueqMe9b7xKy1f.jpg",
    title: "Ant-Man",
    originalTitle: "Ant-Man",
    releaseYear: 2015,
    timelineYear: "2015",
    chronoOrder: 35,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 2",
    era: "La Saga del Infinito",
    duration: "117 min",
    posterGradient: "from-red-600 via-amber-600 to-zinc-900",
    coverTag: "Partículas Pym & El Reino Cuántico",
    synopsis: "Scott Lang usa el traje reductor de Hank Pym para evitar la venta de la armadura Yellowjacket.",
    chronoReason: "Presenta el Reino Cuántico, la llave para los viajes temporales multiversales.",
    multiverseConnections: "El Reino Cuántico permite el atraco al tiempo de Endgame.",
    characters: ["Scott Lang", "Hank Pym", "Hope van Dyne", "Darren Cross"],
    rating: "7.3/10",
    doomsdayTier: "tier-3"
  },
  {
    id: "deadpool-1",
    poster: "https://image.tmdb.org/t/p/w500/3TUYy0XvhPQBhrXJwRIaOoYFOBO.jpg",
    title: "Deadpool",
    originalTitle: "Deadpool",
    releaseYear: 2016,
    timelineYear: "2016 (Tierra-10005)",
    chronoOrder: 36,
    type: "movie",
    universe: "Universo Mutante (Fox / Tierra-10005)",
    universeKey: "xmen",
    phase: "Saga Deadpool",
    era: "Variantes Multiversales (2010s)",
    duration: "108 min",
    posterGradient: "from-red-600 via-rose-950 to-neutral-950",
    coverTag: "El Mercenario Bocazas",
    synopsis: "Wade Wilson adquiere un factor de curación extremo tras un brutal experimento y busca venganza rompiendo la cuarta pared.",
    chronoReason: "Inicio de Wade Wilson en la línea Fox.",
    multiverseConnections: "Wade Wilson rompe el multiverso y da el salto al UCM.",
    characters: ["Wade Wilson (Deadpool)", "Vanessa", "Ajax", "Coloso"],
    rating: "8.0/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "cap-civil-war",
    poster: "https://image.tmdb.org/t/p/w500/jPPy7tCfglppQo6J9nGwU6UmJ8X.jpg",
    title: "Capitán América: Civil War",
    originalTitle: "Captain America: Civil War",
    releaseYear: 2016,
    timelineYear: "2016",
    chronoOrder: 37,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 3",
    era: "La Saga del Infinito",
    duration: "147 min",
    posterGradient: "from-blue-700 via-slate-800 to-red-600",
    coverTag: "Fractura de los Vengadores & Debut de Spidey UCM",
    synopsis: "Los Acuerdos de Sokovia desatan una guerra civil entre Steve Rogers y Tony Stark manipulada por Zemo.",
    chronoReason: "Introduce a Spider-Man (Tom Holland) y Black Panther (Chadwick Boseman) y divide a los héroes.",
    multiverseConnections: "Provoca que la Tierra esté indefensa ante Thanos.",
    characters: ["Capitán América", "Iron Man", "Spider-Man", "Black Panther", "Bucky Barnes", "Zemo"],
    rating: "7.8/10",
    doomsdayTier: "tier-1"
  },
  {
    id: "black-widow",
    poster: "https://image.tmdb.org/t/p/w500/oggEsESyLjVGD7jbIdBfa2hFUrx.jpg",
    title: "Black Widow (Viuda Negra)",
    originalTitle: "Black Widow",
    releaseYear: 2021,
    timelineYear: "2016 (Post-Civil War)",
    chronoOrder: 38,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 4",
    era: "La Saga del Infinito",
    duration: "134 min",
    posterGradient: "from-red-600 via-zinc-900 to-stone-950",
    coverTag: "La Habitación Roja & Yelena Belova",
    synopsis: "Fugitiva de la justicia tras Civil War, Natasha Romanoff se reúne con su familia de espías rusa para desmantelar la Habitación Roja.",
    chronoReason: "Ocurre inmediatamente tras Civil War.",
    multiverseConnections: "Yelena Belova y Red Guardian son el núcleo de Thunderbolts*.",
    characters: ["Natasha Romanoff", "Yelena Belova", "Red Guardian", "Taskmaster"],
    rating: "6.7/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "black-panther-1",
    poster: "https://image.tmdb.org/t/p/w500/lAPzezdc5E6DFnttJwCWXZ9A9C6.jpg",
    title: "Black Panther",
    originalTitle: "Black Panther",
    releaseYear: 2018,
    timelineYear: "2016",
    chronoOrder: 39,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 3",
    era: "La Saga del Infinito",
    duration: "134 min",
    posterGradient: "from-purple-900 via-indigo-950 to-neutral-900",
    coverTag: "El Trono de Wakanda & Killmonger",
    synopsis: "T'Challa asume el trono de Wakanda y defiende el reino del desafío radical de Erik Killmonger.",
    chronoReason: "Abre la tecnología de Wakanda al mundo.",
    multiverseConnections: "Wakanda se vuelve el epicentro de la resistencia cósmica.",
    characters: ["T'Challa", "Erik Killmonger", "Shuri", "Okoye", "Nakia"],
    rating: "7.3/10",
    doomsdayTier: "tier-3"
  },
  {
    id: "spiderman-homecoming",
    poster: "https://image.tmdb.org/t/p/w500/bRl6C6FwzTndk0MBGZZ68nRFlw3.jpg",
    title: "Spider-Man: Homecoming",
    originalTitle: "Spider-Man: Homecoming",
    releaseYear: 2017,
    timelineYear: "Otoño 2016",
    chronoOrder: 40,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "spidey",
    phase: "Fase 3",
    era: "La Saga del Infinito",
    duration: "133 min",
    posterGradient: "from-red-600 via-sky-600 to-amber-500",
    coverTag: "Mentoría de Tony Stark & El Buitre",
    synopsis: "Peter Parker patrulla como Spider-Man bajo la mentoría de Tony Stark y enfrenta a Adrian Toomes (El Buitre).",
    chronoReason: "Primera aventura solista de Tom Holland en el UCM.",
    multiverseConnections: "El Buitre (Michael Keaton) salta al universo Sony tras el hechizo de No Way Home.",
    characters: ["Peter Parker (Tom Holland)", "Tony Stark", "Adrian Toomes", "Ned", "MJ"],
    rating: "7.4/10",
    doomsdayTier: "tier-3"
  },
  {
    id: "doctor-strange-1",
    poster: "https://image.tmdb.org/t/p/w500/wJEZI3PWyMW7qcW6n9jyCh7Cclf.jpg",
    title: "Doctor Strange: Hechicero Supremo",
    originalTitle: "Doctor Strange",
    releaseYear: 2016,
    timelineYear: "2016 - 2017",
    chronoOrder: 41,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 3",
    era: "La Saga del Infinito",
    duration: "115 min",
    posterGradient: "from-emerald-600 via-orange-600 to-purple-950",
    coverTag: "Ojo de Agamotto & La Dimensión Espejo",
    synopsis: "Stephen Strange aprende artes místicas en Kamar-Taj y domina el Ojo de Agamotto (Gema del Tiempo).",
    chronoReason: "Introduce la magia dimensional.",
    multiverseConnections: "Strange se convierte en el guardián de las puertas multiversales hacia No Way Home y Multiverse of Madness.",
    characters: ["Stephen Strange", "La Anciana", "Karl Mordo", "Wong", "Dormammu"],
    rating: "7.5/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "thor-ragnarok",
    poster: "https://image.tmdb.org/t/p/w500/pGtkLdk4rnF2A3Yz2BHiTgRwMU4.jpg",
    title: "Thor: Ragnarok",
    originalTitle: "Thor: Ragnarok",
    releaseYear: 2017,
    timelineYear: "2017",
    chronoOrder: 42,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 3",
    era: "La Saga del Infinito",
    duration: "130 min",
    posterGradient: "from-teal-500 via-fuchsia-600 to-amber-500",
    coverTag: "Sakaar & Destrucción de Asgard",
    synopsis: "Thor y Hulk escapan del planeta Sakaar para enfrentar a Hela, culminando en el Ragnarok de Asgard.",
    chronoReason: "Conecta directamente en su escena post-créditos con la nave de Thanos.",
    multiverseConnections: "Reubica a los asgardianos en la Tierra.",
    characters: ["Thor", "Loki", "Hela", "Hulk", "Valquiria"],
    rating: "7.9/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "ant-man-and-the-wasp",
    poster: "https://image.tmdb.org/t/p/w500/bvYI6i9lQ3bsup9PgnMF3YYr8ZR.jpg",
    title: "Ant-Man y la Avispa",
    originalTitle: "Ant-Man and the Wasp",
    releaseYear: 2018,
    timelineYear: "2018 (Previo al Chasquido)",
    chronoOrder: 43,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 3",
    era: "La Saga del Infinito",
    duration: "118 min",
    posterGradient: "from-red-600 via-amber-500 to-slate-900",
    coverTag: "Rescate de Janet van Dyne",
    synopsis: "Scott Lang y Hope van Dyne rescatan a Janet del Reino Cuántico. El chasquido de Thanos atrapa a Scott en el micromundo.",
    chronoReason: "Ocurre en paralelo a Infinity War.",
    multiverseConnections: "El túnel cuántico es el motor del atraco temporal de Endgame.",
    characters: ["Scott Lang", "Hope van Dyne", "Hank Pym", "Janet van Dyne", "Ghost"],
    rating: "7.0/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "avengers-infinity-war",
    poster: "https://image.tmdb.org/t/p/w500/ksBQ4oHQDdJwND8H90ay8CbMihU.jpg",
    title: "Vengadores: Infinity War",
    originalTitle: "Avengers: Infinity War",
    releaseYear: 2018,
    timelineYear: "2018",
    chronoOrder: 44,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 3",
    era: "La Saga del Infinito",
    duration: "149 min",
    posterGradient: "from-purple-800 via-amber-600 to-rose-900",
    coverTag: "El Chasquido de Thanos",
    synopsis: "Thanos reúne las seis Gemas del Infinito y erradica a la mitad de la vida en el universo.",
    chronoReason: "El clímax cósmico más devastador del cine moderno.",
    multiverseConnections: "Doctor Strange visualiza las 14.000.605 líneas de futuros posibles.",
    characters: ["Thanos", "Iron Man", "Thor", "Capitán América", "Doctor Strange", "Spider-Man", "Gamora"],
    rating: "8.4/10",
    doomsdayTier: "tier-1"
  },
  {
    id: "deadpool-2",
    poster: "https://image.tmdb.org/t/p/w500/84NUrv5kuMUDDlOPqi97KGJMdLm.jpg",
    title: "Deadpool 2",
    originalTitle: "Deadpool 2",
    releaseYear: 2018,
    timelineYear: "2018 (Fox Alterada)",
    chronoOrder: 45,
    type: "movie",
    universe: "Universo Mutante (Fox / Tierra-10005)",
    universeKey: "xmen",
    phase: "Saga Deadpool",
    era: "Variantes Multiversales (2010s)",
    duration: "119 min",
    posterGradient: "from-red-600 via-amber-600 to-neutral-900",
    coverTag: "Cable & El Dispositivo Temporal",
    synopsis: "Deadpool forma la X-Force para proteger a un joven mutante de Cable y repara el dispositivo de viaje temporal.",
    chronoReason: "Wade Wilson comienza a saltar entre líneas de tiempo.",
    multiverseConnections: "El dispositivo temporal reparado atrae la atención directa de la TVA en Deadpool & Wolverine.",
    characters: ["Deadpool", "Cable", "Domino", "Russell", "Coloso"],
    rating: "7.7/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "venom-1",
    poster: "https://image.tmdb.org/t/p/w500/jMBTJQiHAyGlZR05J2sq5coA6ew.jpg",
    title: "Venom (Tom Hardy)",
    originalTitle: "Venom",
    releaseYear: 2018,
    timelineYear: "2018 (Tierra-688 / SSU)",
    chronoOrder: 46,
    type: "movie",
    universe: "Universo Spider-Man Sony (SSU)",
    universeKey: "spidey",
    phase: "Sony Universe",
    era: "Variantes Multiversales (2010s)",
    duration: "112 min",
    posterGradient: "from-neutral-900 via-slate-800 to-black",
    coverTag: "El Simbionte & Mente Colmena",
    synopsis: "Eddie Brock se fusiona con el simbionte Venom convirtiéndose en el Protector Letal.",
    chronoReason: "Inicio del universo Sony de antihéroes.",
    multiverseConnections: "La mente colmena simbionte comparte memorias de todo el multiverso.",
    characters: ["Eddie Brock (Venom)", "Anne Weying", "Carlton Drake"],
    rating: "6.6/10",
    doomsdayTier: "optional"
  },
  {
    id: "spider-verse-1",
    poster: "https://image.tmdb.org/t/p/w500/xRMZikjAHNFebD1FLRqgDZeGV4a.jpg",
    title: "Spider-Man: Un Nuevo Universo",
    originalTitle: "Spider-Man: Into the Spider-Verse",
    releaseYear: 2018,
    timelineYear: "2018 (Tierra-1610B)",
    chronoOrder: 47,
    type: "movie",
    universe: "Spider-Verse Animado (Tierra-1610)",
    universeKey: "spidey",
    phase: "Saga Miles Morales",
    era: "Variantes Multiversales (2010s)",
    duration: "117 min",
    posterGradient: "from-pink-600 via-blue-600 to-indigo-950",
    coverTag: "El Salto de Fe de Miles Morales",
    synopsis: "Miles Morales es guiado por variantes de otras dimensiones (Peter B. Parker, Gwen Stacy, Spider-Ham) para detener el colisionador de Kingpin.",
    chronoReason: "Establece visualmente la red del multiverso.",
    multiverseConnections: "Base del multiverso arácnido y del Gran Tejido del Destino.",
    characters: ["Miles Morales", "Peter B. Parker", "Gwen Stacy", "Spider-Noir", "Kingpin"],
    rating: "8.4/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "avengers-endgame",
    poster: "https://image.tmdb.org/t/p/w500/br6krBFpaYmCSglLBWRuhui7tPc.jpg",
    title: "Vengadores: Endgame",
    originalTitle: "Avengers: Endgame",
    releaseYear: 2019,
    timelineYear: "2018 / 2023 (Salto de 5 Años)",
    chronoOrder: 48,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 3",
    era: "La Saga del Infinito",
    duration: "181 min",
    posterGradient: "from-purple-900 via-red-700 to-slate-950",
    coverTag: "Atraco al Tiempo & Sacrificio de Stark",
    synopsis: "Los Vengadores viajan al pasado por el Reino Cuántico para revertir el chasquido. Tony Stark da su vida para vencer a Thanos.",
    chronoReason: "Cierre monumental de 11 años. Reubica la línea principal en 2023.",
    multiverseConnections: "Durante el viaje a 2012, Loki escapa con el Teseracto creando la bifurcación que desata la serie Loki y la ruptura del multiverso.",
    characters: ["Tony Stark", "Steve Rogers", "Thor", "Bruce Banner", "Natasha Romanoff", "Scott Lang", "Thanos"],
    rating: "8.4/10",
    doomsdayTier: "tier-1"
  },

  // --- ERA 4: LA SAGA DEL MULTIVERSO (2021 - PRESENTE & RUTA DOOMSDAY) ---
  {
    id: "loki-s1-s2",
    poster: "https://image.tmdb.org/t/p/w500/53aonG0QS3ynbYuuwhPtyoOwTDD.jpg",
    title: "Loki (Temporadas 1 y 2)",
    originalTitle: "Loki (Seasons 1 & 2)",
    releaseYear: 2021,
    timelineYear: "Fuera del Tiempo (Eje Multiversal)",
    chronoOrder: 49,
    type: "series",
    universe: "UCM / TVA Multiversal",
    universeKey: "mcu",
    phase: "Fase 4 & 5",
    era: "La Saga del Multiverso",
    duration: "2 Temp. (12 eps)",
    posterGradient: "from-emerald-600 via-amber-600 to-neutral-950",
    coverTag: "El Telar Temporal & El Dios de las Historias",
    synopsis: "Loki descubre los secretos de la TVA y 'Aquel Que Permanece'. Al colapsar el Telar Temporal, Loki se sacrifica sentándose en el trono para sostener físicamente las ramas de todas las realidades existentes.",
    chronoReason: "Explica cómo y por qué coexisten Fox, Sony y el UCM en el mismo árbol cósmico.",
    multiverseConnections: "IMPRESCINDIBLE: Loki se convierte en el Dios de las Historias; la TVA es el centro de operaciones en Doomsday y Secret Wars.",
    characters: ["Loki", "Sylvie", "Mobius", "Aquel Que Permanece", "O.B.", "Ravonna"],
    rating: "8.2/10",
    doomsdayTier: "tier-1"
  },
  {
    id: "what-if-series",
    poster: "https://image.tmdb.org/t/p/w500/ebKQ0Lb84EF897UBk3d1KzMO33V.jpg",
    title: "What If...? (Temporadas 1 a 3)",
    originalTitle: "Marvel's What If...?",
    releaseYear: 2021,
    timelineYear: "Realidades Infinitas",
    chronoOrder: 50,
    type: "series",
    universe: "Multiverso Animado UCM",
    universeKey: "mcu",
    phase: "Fase 4 & 5",
    era: "La Saga del Multiverso",
    duration: "3 Temp. (27 eps)",
    posterGradient: "from-indigo-700 via-fuchsia-600 to-slate-950",
    coverTag: "El Vigilante Uatu & Variantes Infinitas",
    synopsis: "Uatu observa infinitas realidades donde una sola decisión cambia el cosmos: Capitana Carter, Strange Supremo, Ultrón Infinito.",
    chronoReason: "Muestra las consecuencias ilimitadas de la ruptura multiversal.",
    multiverseConnections: "Introduce a la Capitana Carter que aparece en carne y hueso en Multiverse of Madness.",
    characters: ["El Vigilante", "Capitana Carter", "Strange Supremo", "Kahhori"],
    rating: "7.4/10",
    doomsdayTier: "tier-3"
  },
  {
    id: "wandavision",
    poster: "https://image.tmdb.org/t/p/w500/j2VeSZ7tncd2p8z1CeMnxbxK76b.jpg",
    title: "WandaVision (Bruja Escarlata y Visión)",
    originalTitle: "WandaVision",
    releaseYear: 2021,
    timelineYear: "Otoño 2023 (3 semanas post-Endgame)",
    chronoOrder: 51,
    type: "series",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 4",
    era: "La Saga del Multiverso",
    duration: "1 Temp. (9 eps)",
    posterGradient: "from-rose-600 via-red-900 to-indigo-950",
    coverTag: "La Anomalía de Westview & El Darkhold",
    synopsis: "Devastada por el luto, Wanda crea la ilusión de Westview, da a luz a Billy y Tommy y despierta su poder legendario como la Bruja Escarlata con el Darkhold.",
    chronoReason: "Primera serie post-Endgame.",
    multiverseConnections: "Conduce directamente a Doctor Strange en el Multiverso de la Locura y Agatha All Along.",
    characters: ["Wanda Maximoff", "Visión", "Agatha Harkness", "Monica Rambeau"],
    rating: "7.9/10",
    doomsdayTier: "tier-1"
  },
  {
    id: "falcon-winter-soldier",
    poster: "https://image.tmdb.org/t/p/w500/kW3vNNeeIDkZ2xoRyWmNkeOK6f1.jpg",
    title: "Falcon y el Soldado de Invierno",
    originalTitle: "The Falcon and the Winter Soldier",
    releaseYear: 2021,
    timelineYear: "Primavera 2024",
    chronoOrder: 52,
    type: "series",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 4",
    era: "La Saga del Multiverso",
    duration: "1 Temp. (6 eps)",
    posterGradient: "from-blue-700 via-red-700 to-zinc-900",
    coverTag: "El Nuevo Capitán América",
    synopsis: "Sam Wilson asume el manto del Capitán América mientras Bucky Barnes busca redención y Valentina recluta a U.S. Agent.",
    chronoReason: "Consagra a Sam Wilson con las alas de vibranium.",
    multiverseConnections: "Valentina Allegra de Fontaine sienta las bases de Thunderbolts* y Brave New World.",
    characters: ["Sam Wilson (Capitán América)", "Bucky Barnes", "John Walker", "Valentina Allegra"],
    rating: "7.1/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "shang-chi",
    poster: "https://image.tmdb.org/t/p/w500/9VqajJXm29uprSaxOcEh7O0d6E9.jpg",
    title: "Shang-Chi y la Leyenda de los Diez Anillos",
    originalTitle: "Shang-Chi and the Legend of the Ten Rings",
    releaseYear: 2021,
    timelineYear: "Primavera 2024",
    chronoOrder: 53,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 4",
    era: "La Saga del Multiverso",
    duration: "132 min",
    posterGradient: "from-amber-600 via-red-800 to-neutral-950",
    coverTag: "La Baliza Cósmica de los Diez Anillos",
    synopsis: "Shang-Chi combate a su milenario padre Wenwu y hereda los Diez Anillos, los cuales emiten una misteriosa señal hacia el cosmos.",
    chronoReason: "Abre la dimensión de Ta Lo.",
    multiverseConnections: "Wong y Bruce Banner descubren que los anillos provienen de una civilización milenaria multiversal.",
    characters: ["Shang-Chi", "Katy", "Wenwu", "Wong", "Trevor Slattery"],
    rating: "7.4/10",
    doomsdayTier: "tier-3"
  },
  {
    id: "eternals",
    poster: "https://image.tmdb.org/t/p/w500/zp85WEn9YKM3Cajk4m4ZDcbCHpp.jpg",
    title: "Eternals",
    originalTitle: "Eternals",
    releaseYear: 2021,
    timelineYear: "Otoño 2024",
    chronoOrder: 54,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 4",
    era: "La Saga del Multiverso",
    duration: "156 min",
    posterGradient: "from-amber-500 via-teal-800 to-slate-950",
    coverTag: "El Celestial Petrificado Tiamut",
    synopsis: "Los seres inmortales creados por Arishem impiden la destrucción del planeta petrificando al gigantesco Celestial Tiamut en el océano.",
    chronoReason: "Deja el cuerpo de Tiamut en el océano, fuente del Adamantium.",
    multiverseConnections: "El Adamantium del Celestial Tiamut es el detonante del conflicto mundial en Capitán América: Brave New World.",
    characters: ["Sersi", "Ikaris", "Thena", "Dane Whitman", "Arishem"],
    rating: "6.3/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "spider-man-far-from-home",
    poster: "https://image.tmdb.org/t/p/w500/o59zDVJDIehGcWZsMUGU5SN0V0D.jpg",
    title: "Spider-Man: Lejos de Casa",
    originalTitle: "Spider-Man: Far From Home",
    releaseYear: 2019,
    timelineYear: "Verano 2024 (8 meses post-Endgame)",
    chronoOrder: 55,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "spidey",
    phase: "Fase 3",
    era: "La Saga del Multiverso",
    duration: "129 min",
    posterGradient: "from-blue-600 via-red-600 to-emerald-700",
    coverTag: "Identidad Revelada de Spider-Man",
    synopsis: "Peter Parker viaja a Europa donde Mysterio engaña al mundo con falsas amenazas elementales y revela públicamente su identidad.",
    chronoReason: "Detonante directo de la crisis de No Way Home.",
    multiverseConnections: "Prepara la llegada del verdadero colapso multiversal.",
    characters: ["Peter Parker", "Mysterio", "MJ", "Ned", "Nick Fury (Talos)"],
    rating: "7.4/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "venom-let-there-be-carnage",
    poster: "https://image.tmdb.org/t/p/w500/b0j9rHYpRML7dKm5xw9e97HTDJF.jpg",
    title: "Venom: Habrá Matanza",
    originalTitle: "Venom: Let There Be Carnage",
    releaseYear: 2021,
    timelineYear: "2024",
    chronoOrder: 56,
    type: "movie",
    universe: "Universo Spider-Man Sony (SSU)",
    universeKey: "spidey",
    phase: "Sony Universe",
    era: "La Saga del Multiverso",
    duration: "97 min",
    posterGradient: "from-red-600 via-neutral-900 to-black",
    coverTag: "El Salto Multiversal de Venom",
    synopsis: "Eddie y Venom derrotan a Carnage y son transportados mágicamente al UCM en su escena post-créditos.",
    chronoReason: "Cruce simultáneo al hechizo de Doctor Strange.",
    multiverseConnections: "Deja una gota de simbionte en la Tierra-616 en No Way Home.",
    characters: ["Eddie Brock (Venom)", "Cletus Kasady (Carnage)"],
    rating: "5.9/10",
    doomsdayTier: "optional"
  },
  {
    id: "spiderman-no-way-home",
    poster: "https://image.tmdb.org/t/p/w500/accAPImdjUwgNgocDNWXCGFEcvL.jpg",
    title: "Spider-Man: No Way Home",
    originalTitle: "Spider-Man: No Way Home",
    releaseYear: 2021,
    timelineYear: "Otoño - Diciembre 2024",
    chronoOrder: 57,
    type: "movie",
    universe: "Spider-Verse Crossover (MCU + Raimi + Webb)",
    universeKey: "spidey",
    phase: "Fase 4",
    era: "La Saga del Multiverso",
    duration: "148 min",
    posterGradient: "from-red-600 via-blue-700 to-amber-500",
    coverTag: "La Gran Reunión: Tobey, Andrew y Tom",
    synopsis: "Un hechizo alterado de Doctor Strange transporta a los villanos clásicos y a las variantes de Tobey Maguire y Andrew Garfield al UCM.",
    chronoReason: "La primera gran convergencia multiversal en live-action.",
    multiverseConnections: "IMPRESCINDIBLE: Demuestra que los universos pre-MCU son 100% canónicos y prepara las fracturas dimensionales.",
    characters: ["Peter-1 (Tom)", "Peter-2 (Tobey)", "Peter-3 (Andrew)", "Doctor Strange", "Duende Verde", "Doc Ock", "Electro"],
    rating: "8.2/10",
    doomsdayTier: "tier-1"
  },
  {
    id: "doctor-strange-multiverse-madness",
    poster: "https://image.tmdb.org/t/p/w500/1w3MlLZPqr2Pm5loQ9h2gJwenMr.jpg",
    title: "Doctor Strange en el Multiverso de la Locura",
    originalTitle: "Doctor Strange in the Multiverse of Madness",
    releaseYear: 2022,
    timelineYear: "Finales 2024 / 2025",
    chronoOrder: 58,
    type: "movie",
    universe: "UCM / Incursiones Multiversales",
    universeKey: "mcu",
    phase: "Fase 4",
    era: "La Saga del Multiverso",
    duration: "126 min",
    posterGradient: "from-purple-900 via-red-800 to-black",
    coverTag: "Las Incursiones & Los Illuminati",
    synopsis: "Doctor Strange protege a América Chavez de Wanda a través de realidades paralelas. En la Tierra-838 conoce a los Illuminati y aprende la amenaza de las Incursiones.",
    chronoReason: "Explica formalmente las Incursiones que destruyen realidades.",
    multiverseConnections: "CLAVE DIRECTA PARA DOOMSDAY: El concepto de Incursiones es el motor que llevará a Robert Downey Jr. (Doom) a forjar Battleworld.",
    characters: ["Stephen Strange", "Wanda Maximoff", "América Chavez", "Charles Xavier (Patrick Stewart)", "Reed Richards (John Krasinski)", "Clea"],
    rating: "6.9/10",
    doomsdayTier: "tier-1"
  },
  {
    id: "hawkeye-series",
    poster: "https://image.tmdb.org/t/p/w500/3ZcJetFxd8fwJ1I5xsLHCMTAKQo.jpg",
    title: "Ojo de Halcón (Hawkeye)",
    originalTitle: "Hawkeye",
    releaseYear: 2021,
    timelineYear: "Navidad 2024",
    chronoOrder: 59,
    type: "series",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 4",
    era: "La Saga del Multiverso",
    duration: "1 Temp. (6 eps)",
    posterGradient: "from-purple-800 via-indigo-950 to-slate-900",
    coverTag: "Kate Bishop & Retorno de Kingpin",
    synopsis: "Clint Barton entrena a Kate Bishop mientras su pasado como Ronin reaparece contra Wilson Fisk.",
    chronoReason: "Regreso de Vincent D'Onofrio como Kingpin.",
    multiverseConnections: "Kate Bishop funda a los Jóvenes Vengadores junto a Kamala Khan.",
    characters: ["Clint Barton", "Kate Bishop", "Yelena Belova", "Wilson Fisk"],
    rating: "7.5/10",
    doomsdayTier: "tier-3"
  },
  {
    id: "moon-knight",
    poster: "https://image.tmdb.org/t/p/w500/5AHnvXfW0mtsm047OP54n4pnV0R.jpg",
    title: "Caballero Luna (Moon Knight)",
    originalTitle: "Moon Knight",
    releaseYear: 2022,
    timelineYear: "Primavera 2025",
    chronoOrder: 60,
    type: "series",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 4",
    era: "La Saga del Multiverso",
    duration: "1 Temp. (6 eps)",
    posterGradient: "from-slate-200 via-cyan-900 to-neutral-950",
    coverTag: "Khonshu & Marc Spector",
    synopsis: "Steven Grant y Marc Spector comparten cuerpo como el avatar del dios lunar egipcio Khonshu.",
    chronoReason: "Abre el panteón místico egipcio.",
    multiverseConnections: "Lado sobrenatural de Marvel.",
    characters: ["Marc Spector (Oscar Isaac)", "Layla", "Arthur Harrow", "Khonshu"],
    rating: "7.3/10",
    doomsdayTier: "optional"
  },
  {
    id: "ms-marvel",
    poster: "https://image.tmdb.org/t/p/w500/3KzoEdclGwXQH2t2oYZZlw46TvW.jpg",
    title: "Ms. Marvel",
    originalTitle: "Ms. Marvel",
    releaseYear: 2022,
    timelineYear: "Otoño 2025",
    chronoOrder: 61,
    type: "series",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 4",
    era: "La Saga del Multiverso",
    duration: "1 Temp. (6 eps)",
    posterGradient: "from-pink-500 via-blue-600 to-amber-500",
    coverTag: "Kamala Khan & La Mutación Genética",
    synopsis: "Kamala Khan desbloquea poderes con un brazalete ancestral y descubre que posee una mutación genética.",
    chronoReason: "Primera mención oficial del gen mutante en la Tierra-616.",
    multiverseConnections: "Conecta con The Marvels y los Jóvenes Vengadores.",
    characters: ["Kamala Khan", "Bruno", "Muneeba Khan"],
    rating: "6.3/10",
    doomsdayTier: "tier-3"
  },
  {
    id: "she-hulk",
    poster: "https://image.tmdb.org/t/p/w500/7jzX4ZKwDxHZP8uSXrDAkVTdvKe.jpg",
    title: "She-Hulk: Abogada Hulka",
    originalTitle: "She-Hulk: Attorney at Law",
    releaseYear: 2022,
    timelineYear: "2025",
    chronoOrder: 62,
    type: "series",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 4",
    era: "La Saga del Multiverso",
    duration: "1 Temp. (9 eps)",
    posterGradient: "from-emerald-500 via-green-800 to-stone-900",
    coverTag: "Jennifer Walters & K.E.V.I.N.",
    synopsis: "Jennifer Walters maneja casos legales de superhumanos y rompe la cuarta pared hablando con la IA creadora.",
    chronoReason: "Aparición de Daredevil (traje amarillo) y Skaar.",
    multiverseConnections: "Ruptura meta de la estructura del multiverso.",
    characters: ["Jennifer Walters", "Bruce Banner", "Matt Murdock", "Abominación"],
    rating: "5.3/10",
    doomsdayTier: "optional"
  },
  {
    id: "black-panther-wakanda-forever",
    poster: "https://image.tmdb.org/t/p/w500/mYpT2R7639KvKZ668uoQGS2QNFp.jpg",
    title: "Black Panther: Wakanda Forever",
    originalTitle: "Black Panther: Wakanda Forever",
    releaseYear: 2022,
    timelineYear: "Primavera 2025",
    chronoOrder: 63,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 4",
    era: "La Saga del Multiverso",
    duration: "161 min",
    posterGradient: "from-purple-900 via-teal-900 to-black",
    coverTag: "El Reino de Talokan & Namor",
    synopsis: "Shuri asume el manto de Black Panther tras la muerte de T'Challa y pacta la paz con el mutante submarino Namor.",
    chronoReason: "Cierre de la Fase 4 e introducción de Riri Williams (Ironheart).",
    multiverseConnections: "Establece a Namor como uno de los mutantes más poderosos.",
    characters: ["Shuri", "Namor", "Reina Ramonda", "Riri Williams"],
    rating: "6.7/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "antman-quantumania",
    poster: "https://image.tmdb.org/t/p/w500/lKHy0ntGPdQeFwvNq8gK1D0anEr.jpg",
    title: "Ant-Man y la Avispa: Quantumania",
    originalTitle: "Ant-Man and the Wasp: Quantumania",
    releaseYear: 2023,
    timelineYear: "2026",
    chronoOrder: 64,
    type: "movie",
    universe: "UCM / Reino Cuántico",
    universeKey: "mcu",
    phase: "Fase 5",
    era: "La Saga del Multiverso",
    duration: "125 min",
    posterGradient: "from-blue-700 via-purple-800 to-red-700",
    coverTag: "El Consejo de Kangs & El Micromundo",
    synopsis: "La familia Ant-Man combate en el Reino Cuántico y presencia la reunión masiva del Consejo de Kangs.",
    chronoReason: "Muestra la inestabilidad de las líneas temporales.",
    multiverseConnections: "El vacío de poder tras el colapso de las variantes de Kang facilita el ascenso de Victor Von Doom.",
    characters: ["Scott Lang", "Hope van Dyne", "Kang", "Janet van Dyne"],
    rating: "6.1/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "gotg-3",
    poster: "https://image.tmdb.org/t/p/w500/6GkKzdNosVAL7UGgwTtCHSxLQ67.jpg",
    title: "Guardianes de la Galaxia Vol. 3",
    originalTitle: "Guardians of the Galaxy Vol. 3",
    releaseYear: 2023,
    timelineYear: "2026",
    chronoOrder: 65,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 5",
    era: "La Saga del Multiverso",
    duration: "150 min",
    posterGradient: "from-blue-600 via-amber-600 to-rose-700",
    coverTag: "El Origen de Rocket & El Alto Evolucionador",
    synopsis: "Los Guardianes salvan a Rocket de las garras del Alto Evolucionador y renuevan su alineación cósmica.",
    chronoReason: "Cierre de la trilogía cósmica de James Gunn.",
    multiverseConnections: "Star-Lord regresa a la Tierra preparando su papel en las guerras multiversales.",
    characters: ["Rocket", "Star-Lord", "Gamora (2014)", "Drax", "Adam Warlock"],
    rating: "7.9/10",
    doomsdayTier: "tier-3"
  },
  {
    id: "spider-verse-2",
    poster: "https://image.tmdb.org/t/p/w500/37WcNMgNOMxdhT87MFl7tq7FM1.jpg",
    title: "Spider-Man: Cruzando el Multiverso",
    originalTitle: "Spider-Man: Across the Spider-Verse",
    releaseYear: 2023,
    timelineYear: "Multiverso Arácnido",
    chronoOrder: 66,
    type: "movie",
    universe: "Spider-Verse Animado",
    universeKey: "spidey",
    phase: "Saga Miles Morales",
    era: "La Saga del Multiverso",
    duration: "140 min",
    posterGradient: "from-rose-600 via-amber-500 to-indigo-950",
    coverTag: "Miguel O'Hara & El Evento Canónico",
    synopsis: "Miles Morales desafía las reglas del 'evento canónico' de la Spider-Society de Miguel O'Hara.",
    chronoReason: "La enciclopedia visual más grande de variantes.",
    multiverseConnections: "Menciona los incidentes de Doctor Strange en la Tierra-199999 (UCM) y muestra cameos live-action.",
    characters: ["Miles Morales", "Gwen Stacy", "Spider-Man 2099", "Spider-Punk"],
    rating: "8.6/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "the-marvels",
    poster: "https://image.tmdb.org/t/p/w500/vpuuFM032yiX8tox4L84Wl9MGjG.jpg",
    title: "The Marvels (Capitana Marvel 2)",
    originalTitle: "The Marvels",
    releaseYear: 2023,
    timelineYear: "2026",
    chronoOrder: 67,
    type: "movie",
    universe: "UCM / Cruce Fox",
    universeKey: "mcu",
    phase: "Fase 5",
    era: "La Saga del Multiverso",
    duration: "105 min",
    posterGradient: "from-amber-500 via-cyan-600 to-purple-900",
    coverTag: "La Brecha Dimensional & Los X-Men",
    synopsis: "Carol, Kamala y Monica unen fuerzas. Al sellar un desgarro cósmico, Monica queda atrapada en una dimensión paralela.",
    chronoReason: "Abre la puerta directa al universo de los mutantes de Fox.",
    multiverseConnections: "IMPRESCINDIBLE: Monica despierta en la Mansión X frente a Bestia (Kelsey Grammer), conectando formalmente Fox con el UCM.",
    characters: ["Carol Danvers", "Kamala Khan", "Monica Rambeau", "Bestia (X-Men)"],
    rating: "5.5/10",
    doomsdayTier: "tier-1"
  },
  {
    id: "echo-series",
    poster: "https://image.tmdb.org/t/p/w500/1RFLMSnFng8G23zZ1G5Q6lFVRfY.jpg",
    title: "Echo",
    originalTitle: "Marvel's Echo",
    releaseYear: 2024,
    timelineYear: "2026",
    chronoOrder: 68,
    type: "series",
    universe: "The Defenders Saga / UCM Canónico",
    universeKey: "defenders",
    phase: "Fase 5",
    era: "La Saga del Multiverso",
    duration: "1 Temp. (5 eps)",
    posterGradient: "from-stone-700 via-rose-950 to-neutral-950",
    coverTag: "Linaje Choctaw & Alcaldía de Kingpin",
    synopsis: "Maya Lopez regresa a su ciudad natal tras disparar a Kingpin, reconectando con sus raíces mientras Fisk trama su ascenso político.",
    chronoReason: "Establece las ambiciones políticas de Kingpin hacia Daredevil: Born Again.",
    multiverseConnections: "Enlace directo con la trama urbana de Nueva York.",
    characters: ["Maya Lopez (Echo)", "Wilson Fisk (Kingpin)", "Matt Murdock (Daredevil)"],
    rating: "6.0/10",
    doomsdayTier: "tier-3"
  },
  {
    id: "deadpool-and-wolverine",
    poster: "https://image.tmdb.org/t/p/w500/9TFSqghEHrlBMRR63yTx80Orxva.jpg",
    title: "Deadpool & Wolverine",
    originalTitle: "Deadpool & Wolverine",
    releaseYear: 2024,
    timelineYear: "2024 - 2026 / El Vacío de la TVA",
    chronoOrder: 69,
    type: "movie",
    universe: "Crossover UCM & Fox",
    universeKey: "xmen",
    phase: "Fase 5",
    era: "La Saga del Multiverso",
    duration: "128 min",
    posterGradient: "from-red-600 via-amber-500 to-blue-900",
    coverTag: "Los Seres Ancla & El Rescate del Legado Fox",
    synopsis: "Wade Wilson recluta a una variante de Wolverine para evitar que la TVA pode su universo tras la muerte de su Ser Ancla (Logan en 2029), enfrentando a Cassandra Nova en el Vacío.",
    chronoReason: "Crossover histórico que integra a los personajes de Fox al UCM.",
    multiverseConnections: "IMPRESCINDIBLE: Establece el concepto de 'Seres Ancla' y reúne a Blade, Elektra, Gambito, X-23 y Johnny Storm, anticipando Battleworld.",
    characters: ["Deadpool", "Wolverine", "Cassandra Nova", "Laura (X-23)", "Blade", "Gambito"],
    rating: "7.8/10",
    doomsdayTier: "tier-1"
  },
  {
    id: "agatha-all-along",
    poster: "https://image.tmdb.org/t/p/w500/nbkbguUUNWQZygVJKjODyELBQk9.jpg",
    title: "Agatha All Along",
    originalTitle: "Agatha All Along",
    releaseYear: 2024,
    timelineYear: "Otoño 2026",
    chronoOrder: 70,
    type: "series",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 5",
    era: "La Saga del Multiverso",
    duration: "1 Temp. (9 eps)",
    posterGradient: "from-purple-900 via-emerald-900 to-neutral-950",
    coverTag: "La Senda de las Brujas & Billy Maximoff (Wiccan)",
    synopsis: "Agatha Harkness recorre la Senda de las Brujas junto a Billy Maximoff (Wiccan), quien busca a su hermano gemelo Tommy.",
    chronoReason: "Reencarnación del alma de Billy Maximoff.",
    multiverseConnections: "Conexión mística directa con la Bruja Escarlata y los Jóvenes Vengadores.",
    characters: ["Agatha Harkness", "Billy Maximoff (Wiccan)", "Rio Vidal (Muerte)"],
    rating: "7.2/10",
    doomsdayTier: "tier-3"
  },
  {
    id: "cap-brave-new-world",
    poster: "https://image.tmdb.org/t/p/w500/pVMSRyAiye7gZ8NtuCt1qgbspY9.jpg",
    title: "Capitán América: Un Nuevo Mundo",
    originalTitle: "Captain America: Brave New World",
    releaseYear: 2025,
    timelineYear: "2026",
    chronoOrder: 71,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 5",
    era: "La Saga del Multiverso",
    duration: "118 min",
    posterGradient: "from-blue-700 via-red-600 to-zinc-950",
    coverTag: "Red Hulk & La Crisis del Adamantium",
    synopsis: "Sam Wilson lidera a los Vengadores frente a una conspiración geopolítica mundial por el Adamantium extraído del Celestial petrificado Tiamut, desatando la transformación del presidente Ross en Red Hulk y el regreso de Samuel Sterns (El Líder).",
    chronoReason: "Establece el nuevo orden político de la Tierra-616 y la presencia masiva de Adamantium en el planeta.",
    multiverseConnections: "Conecta directamente con la reorganización gubernamental que da luz verde al equipo de los Thunderbolts*.",
    characters: ["Sam Wilson (Capitán América)", "Thaddeus Ross (Red Hulk / Harrison Ford)", "Joaquin Torres (Falcon)", "Samuel Sterns (El Líder)", "Isaiah Bradley"],
    rating: "7.2/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "daredevil-born-again",
    poster: "https://image.tmdb.org/t/p/w500/zNH50kOA5Zm5QSFqeIu3hJGuNdO.jpg",
    title: "Daredevil: Born Again",
    originalTitle: "Daredevil: Born Again",
    releaseYear: 2025,
    timelineYear: "2026",
    chronoOrder: 72,
    type: "series",
    universe: "The Defenders Saga / UCM Canónico",
    universeKey: "defenders",
    phase: "Fase 5",
    era: "La Saga del Multiverso",
    duration: "Temp. 1 (9 eps)",
    posterGradient: "from-red-700 via-rose-950 to-neutral-950",
    coverTag: "Matt Murdock vs. El Alcalde Wilson Fisk",
    synopsis: "Guerra urbana total en Nueva York: Matt Murdock y Wilson Fisk intentan dejar atrás sus dobles vidas, pero el ascenso de Fisk a la alcaldía y la presencia de Punisher desatan una cacería implacable.",
    chronoReason: "Consagra el lado urbano crudo del UCM con Charlie Cox, Vincent D'Onofrio y Jon Bernthal.",
    multiverseConnections: "El frente urbano que resistirá la fractura dimensional de las incursiones.",
    characters: ["Matt Murdock (Daredevil)", "Wilson Fisk (Alcalde)", "Frank Castle (Punisher)", "Bullseye", "Karen Page", "Foggy Nelson"],
    rating: "8.5/10",
    doomsdayTier: "tier-2"
  },
  {
    id: "thunderbolts",
    poster: "https://image.tmdb.org/t/p/w500/yDWU8YyFkPnlVY627QXPvct8bz9.jpg",
    title: "Thunderbolts*",
    originalTitle: "Thunderbolts*",
    releaseYear: 2025,
    timelineYear: "2026 - 2027",
    chronoOrder: 73,
    type: "movie",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 5",
    era: "La Saga del Multiverso",
    duration: "128 min",
    posterGradient: "from-amber-600 via-slate-800 to-rose-900",
    coverTag: "El Escuadrón de Antihéroes & Sentry / The Void",
    synopsis: "Yelena Belova, Bucky Barnes, Red Guardian, John Walker (U.S. Agent), Ava Starr (Ghost) y Taskmaster son enviados a una trampa mortal organizada por Valentina Allegra de Fontaine, donde deben contener a Bob Reynolds (Sentry / The Void).",
    chronoReason: "Cierre de la Fase 5 del UCM y nacimiento oficial de los Nuevos Vengadores / Thunderbolts.",
    multiverseConnections: "El poder cósmico descomunal de Sentry ('un millón de soles explotando') es una fuerza desestabilizadora clave frente a las incursiones.",
    characters: ["Yelena Belova (Florence Pugh)", "Bucky Barnes (Sebastian Stan)", "Alexei Shostakov (Red Guardian)", "John Walker", "Bob (Sentry / Lewis Pullman)", "Valentina Allegra"],
    rating: "7.8/10",
    doomsdayTier: "tier-1"
  },
  {
    id: "ironheart-series",
    poster: "https://image.tmdb.org/t/p/w500/dOh6MJpdlQhYpLBhzhNQeYGKTZ5.jpg",
    title: "Ironheart",
    originalTitle: "Marvel's Ironheart",
    releaseYear: 2025,
    timelineYear: "2027",
    chronoOrder: 74,
    type: "series",
    universe: "UCM (Tierra-616)",
    universeKey: "mcu",
    phase: "Fase 5",
    era: "La Saga del Multiverso",
    duration: "1 Temp. (6 eps)",
    posterGradient: "from-red-600 via-amber-600 to-purple-900",
    coverTag: "Tecnología vs Magia Oscura (The Hood)",
    synopsis: "Riri Williams enfrenta la magia oscura de Parker Robbins (The Hood) en Chicago, combinando tecnología de armaduras avanzadas y misticismo.",
    chronoReason: "Legado tecnológico de Iron Man.",
    multiverseConnections: "Choque entre ciencia de vanguardia y brujería dimensional.",
    characters: ["Riri Williams (Ironheart)", "Parker Robbins (The Hood)"],
    rating: "7.0/10",
    doomsdayTier: "optional"
  },
  {
    id: "spiderman-brand-new-day",
    poster: "https://image.tmdb.org/t/p/w500/9g0sEFhmvmK4nGhXj8DHuv2noYI.jpg",
    title: "Spider-Man: Brand New Day (Spider-Man 4)",
    originalTitle: "Spider-Man: Brand New Day",
    releaseYear: 2026,
    timelineYear: "2026 - 2027",
    chronoOrder: 75,
    type: "movie",
    universe: "UCM (Tierra-616) / Spider-Verse",
    universeKey: "spidey",
    phase: "Fase 6",
    era: "La Saga del Multiverso",
    duration: "135 min",
    posterGradient: "from-red-600 via-sky-600 to-amber-500",
    coverTag: "Un Nuevo Comienzo Callejero & El Vacío Multiversal",
    synopsis: "Peter Parker vive en el anonimato absoluto en Nueva York tras el hechizo de No Way Home, enfrentando nuevas amenazas callejeras mientras los ecos de las grietas multiversales vuelven a abrirse sobre la ciudad.",
    chronoReason: "Inicia la nueva trilogía de Tom Holland y conecta la escala urbana con la inminente llegada de Victor Von Doom.",
    multiverseConnections: "Spider-Man es el corazón emocional que conectará a los héroes terrestres con Los 4 Fantásticos y los X-Men en Doomsday.",
    characters: ["Peter Parker (Spider-Man / Tom Holland)", "Daredevil", "Ned Leeds", "MJ"],
    rating: "8.3/10",
    doomsdayTier: "tier-1"
  },
  {
    id: "avengers-doomsday",
    poster: "https://image.tmdb.org/t/p/w500/rQKabpeIewLLNStFr3anEXI0xqu.jpg",
    title: "Avengers: Doomsday",
    originalTitle: "Avengers: Doomsday",
    releaseYear: 2026,
    timelineYear: "2026 - 2027 / Colapso de Universos",
    chronoOrder: 76,
    type: "movie",
    universe: "Cruce Multiversal Definitivo",
    universeKey: "mcu",
    phase: "Fase 6",
    era: "La Saga del Multiverso",
    duration: "160 min",
    posterGradient: "from-emerald-700 via-neutral-900 to-amber-600",
    coverTag: "El Ascenso de Victor Von Doom (Robert Downey Jr.)",
    synopsis: "Las continuas incursiones provocan el colapso masivo e inevitable de universos paralelos. Los Vengadores (Sam Wilson, Thunderbolts, Spider-Man), Los 4 Fantásticos de los 60 y los X-Men deben enfrentar la abrumadora voluntad de Victor Von Doom.",
    chronoReason: "El gran evento multiversal que destruye las líneas temporales y conduce a la creación del mundo mosaico Battleworld.",
    multiverseConnections: "Robert Downey Jr. regresa como Victor Von Doom; convergen todas las franquicias de Marvel (UCM, Fox, Sony y 4 Fantásticos).",
    characters: ["Victor Von Doom (Robert Downey Jr.)", "Reed Richards", "Sam Wilson", "Spider-Man", "Thor", "Wolverine", "Doctor Strange"],
    rating: "Estreno 2026",
    doomsdayTier: "tier-1"
  },
  {
    id: "avengers-secret-wars",
    poster: "https://image.tmdb.org/t/p/w500/f0YBuh4hyiAheXhh4JnJWoKi9g5.jpg",
    title: "Avengers: Secret Wars",
    originalTitle: "Avengers: Secret Wars",
    releaseYear: 2027,
    timelineYear: "Battleworld / Fin de la Saga del Multiverso",
    chronoOrder: 77,
    type: "movie",
    universe: "Battleworld / Todas las Dimensiones Unificadas",
    universeKey: "mcu",
    phase: "Fase 6",
    era: "La Saga del Multiverso",
    duration: "175 min",
    posterGradient: "from-purple-900 via-red-700 to-amber-400",
    coverTag: "Battleworld & Reinicio del Universo Marvel",
    synopsis: "Tras la destrucción del multiverso, todos los héroes y variantes sobrevivientes luchan en Battleworld por el destino de una nueva realidad reiniciada.",
    chronoReason: "Cierre absoluto de la Saga del Multiverso y reinicio cósmico unificado de todo Marvel.",
    multiverseConnections: "Reunión de todas las eras cinematográficas (2000-2027) antes del nuevo universo unificado.",
    characters: ["Todos los Héroes del Multiverso", "Doctor Doom", "Spider-Man", "Wolverine", "Thor"],
    rating: "Estreno 2027",
    doomsdayTier: "tier-1"
  },
  {
    id: "logan-2017",
    poster: "https://image.tmdb.org/t/p/w500/d0ktjN9eKww26HhM8or8iUB1I68.jpg",
    title: "Logan (El Ocaso de los Mutantes)",
    originalTitle: "Logan",
    releaseYear: 2017,
    timelineYear: "2029 (Futuro Fox Aislado)",
    chronoOrder: 78,
    type: "movie",
    universe: "Universo Mutante (Fox)",
    universeKey: "xmen",
    phase: "Saga Logan",
    era: "Futuro Distópico",
    duration: "137 min",
    posterGradient: "from-amber-700 via-stone-900 to-black",
    coverTag: "La Despedida del Ser Ancla",
    synopsis: "En un sombrío 2029, un envejecido Logan y un enfermo Charles Xavier protegen a Laura (X-23) de los Reavers hasta el sacrificio final.",
    chronoReason: "Se ubica en 2029. Su muerte es el evento ancla que casi destruye el universo de Deadpool.",
    multiverseConnections: "Referenciada directamente en Deadpool & Wolverine con el regreso de Dafne Keen como X-23.",
    characters: ["Logan", "Charles Xavier", "Laura (X-23)", "Donald Pierce"],
    rating: "8.1/10",
    doomsdayTier: "tier-2"
  }
];

// --- LO QUE TENEMOS (tenemos.txt) ---
const TENEMOS_IDS = [
  "cap-1",
  "xmen-1",
  "iron-man-1",
  "spiderman-1-raimi",
  "tasm-1",
  "the-avengers",
  "cap-civil-war",
  "avengers-infinity-war",
  "avengers-endgame",
  "captain-marvel",
  "deadpool-1",
  "deadpool-and-wolverine",
  "spiderman-brand-new-day",
  "daredevil-born-again",
  // Saga X-Men y Deadpool
  "xmen-2",
  "xmen-3",
  "xmen-apocalypse",
  "xmen-origins-wolverine",
  "the-wolverine-2013",
  "xmen-first-class",
  "xmen-dofp-past",
  "xmen-dark-phoenix",
  "deadpool-2",
  "logan-2017",
  // Los 4 Fantásticos
  "f4-first-steps",
  "f4-2005",
  "f4-silver-surfer",
  "f4-2015",
  // Thunderbolts*
  "thunderbolts",
  // Series (de tenemos.txt)
  "daredevil-s1",
  "agatha-all-along",
  // Spider-Man y Venom
  "spiderman-2-raimi",
  "spiderman-3-raimi",
  "tasm-2",
  "spiderman-homecoming",
  "spider-man-far-from-home",
  "spider-verse-1",
  "spider-verse-2",
  "venom-1",
  "venom-let-there-be-carnage",
  // Daredevil (2003) — añadida hoy
  "daredevil-2003",
  // MCU (confirmados en los discos del RocaServer)
  "iron-man-2",
  "iron-man-3",
  "cap-winter-soldier",
  "cap-brave-new-world",
  "thor-1",
  "thor-dark-world",
  "thor-ragnarok",
  "avengers-age-of-ultron",
  "gotg-1",
  "gotg-2",
  "ant-man-1",
  "ant-man-and-the-wasp",
  "black-panther-1",
  "doctor-strange-1",
  "incredible-hulk"
];

// --- ACCESO ADMIN (oculto) ---
const ADMIN_USER = "roca";
const ADMIN_PASSWORD = "[REDACTED]";
const ADMIN_SESSION_KEY = "marvel_admin_session_v2";
const OWNED_ADDED_KEY = "marvel_admin_owned_added_v2";
const OWNED_REMOVED_KEY = "marvel_admin_owned_removed_v2";
const OWNED_STARS_KEY = "marvel_show_owned_stars_v1";

// --- RUTA MÍNIMA IMPRESCINDIBLE PARA AVENGERS: DOOMSDAY (orden de visión) ---
const DOOMSDAY_RELEASE_DATE = new Date("2026-12-18T00:00:00");
const DOOMSDAY_ESSENTIAL_IDS = [
  "xmen-1",
  "xmen-2",
  "cap-1",
  "the-avengers",
  "avengers-infinity-war",
  "avengers-endgame",
  "shang-chi",
  "spiderman-no-way-home",
  "black-panther-wakanda-forever",
  "cap-brave-new-world",
  "deadpool-and-wolverine",
  "doctor-strange-multiverse-madness",
  "thunderbolts",
  "f4-first-steps",
  "loki-s1-s2"
];

// --- ESTRUCTURA DEL ÁRBOL VISUAL DE LÍNEAS TEMPORALES ACTUALIZADO ---
// Carriles (Lanes):
// 0: Línea Sagrada UCM (Tierra-616) - Rojo
// 1: Los 4 Fantásticos (Tierra Retro 60s & Fox) - Azul
// 2: Universo Fox Mutante (Tierra-10005) - Ámbar
// 3: Spider-Verse & Sony (Tobey / Andrew / Miles) - Celeste
// 4: TVA y Trono del Multiverso (Loki) - Esmeralda
// 5: Battleworld (Convergencia Final Doomsday) - Púrpura

const TIMELINE_GRAPH_NODES = [
{
    id: "cap1_node",
    refId: "cap-1",
    lane: 0,
    label: "Capitán América: Primer Vengador",
    subtitle: "Steve Rogers, el suero del supersoldado y el Teseracto",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "1942",
    type: "origin",
    tag: "Origen del UCM",
    parents: []
  },
  {
    id: "agent_carter_node",
    refId: "agent-carter",
    lane: 0,
    label: "Agente Carter",
    subtitle: "Peggy Carter construye los inicios de SHIELD en la posguerra",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "1946 - 1947",
    type: "event",
    tag: "Espionaje de Posguerra",
    parents: ["cap1_node"]
  },
{
    id: "xmen_fc_node",
    refId: "xmen-first-class",
    lane: 2,
    label: "X-Men: Primera Generación",
    subtitle: "Fundación de la Escuela de Mutantes de Charles Xavier",
    lineName: "Universo Fox Mutante",
    year: "1962",
    type: "branch_start",
    tag: "Origen Mutante",
    parents: []
  },
{
    id: "f4_steps_node",
    refId: "f4-first-steps",
    lane: 1,
    label: "The Fantastic Four: First Steps",
    subtitle: "La Primera Familia en una Tierra retro-futurista frente a Galactus",
    lineName: "Los 4 Fantásticos",
    year: "Años 60",
    type: "branch_start",
    tag: "Universo Paralelo 60s",
    parents: []
  },
{
    id: "dofp_node",
    refId: "xmen-dofp-past",
    lane: 2,
    label: "X-Men: Días del Futuro Pasado",
    subtitle: "Wolverine viaja al pasado creando una nueva línea alternativa",
    lineName: "Universo Fox Mutante",
    year: "1973",
    type: "event",
    tag: "Bifurcación Temporal",
    parents: ["xmen_fc_node"]
  },
{
    id: "xmen_origins_wolverine_node",
    refId: "xmen-origins-wolverine",
    lane: 2,
    label: "X-Men Orígenes: Wolverine",
    subtitle: "James Howlett, las garras de adamantium y las tramas de William Stryker",
    lineName: "Universo Fox Mutante",
    year: "1979 - 1981",
    type: "event",
    tag: "Origen del Mutante",
    parents: ["xmen_fc_node"]
  },
{
    id: "xmen_apocalypse_node",
    refId: "xmen-apocalypse",
    lane: 2,
    label: "X-Men: Apocalipsis",
    subtitle: "El primer mutante despierta en 1983 y reúne a sus Cuatro Jinetes",
    lineName: "Universo Fox Mutante",
    year: "1983",
    type: "event",
    tag: "El Primer Mutante",
    parents: ["xmen_origins_wolverine_node"]
  },
{
    id: "xmen_dark_phoenix_node",
    refId: "xmen-dark-phoenix",
    lane: 2,
    label: "X-Men: Dark Phoenix",
    subtitle: "Jean Grey se convierte en la Fuerza Fénix en 1992",
    lineName: "Universo Fox Mutante",
    year: "1992",
    type: "event",
    tag: "La Fuerza Fénix",
    parents: ["xmen_apocalypse_node"]
  },
  {
    id: "captain_marvel_node",
    refId: "captain-marvel",
    lane: 0,
    label: "Capitana Marvel",
    subtitle: "Carol Danvers y la Fuerza Kree en los 90",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "1995",
    type: "event",
    tag: "Origen Cósmico",
    parents: ["agent_carter_node"]
  },
{
    id: "xmen_1_node",
    refId: "xmen-1",
    lane: 2,
    label: "X-Men (2000)",
    subtitle: "El inicio de la franquicia mutante con Wolverine, Rogue y Pyro",
    lineName: "Universo Fox Mutante",
    year: "2000",
    type: "event",
    tag: "Comienza la Saga Mutante",
    parents: ["xmen_dark_phoenix_node"]
  },
{
    id: "spidey1_node",
    refId: "spiderman-1-raimi",
    lane: 3,
    label: "Spider-Man (Tobey Maguire)",
    subtitle: "Peter Parker adquiere sus poderes arácnidos en la Tierra-96283",
    lineName: "Spider-Verse & Sony",
    year: "2002",
    type: "branch_start",
    tag: "Universo Tobey Maguire",
    parents: []
  },
  {
    id: "daredevil_2003_node",
    refId: "daredevil-2003",
    lane: 2,
    label: "Daredevil (2003)",
    subtitle: "Matt Murdock, abogado ciego, en la Tierra-701306",
    lineName: "Universo Fox Mutante",
    year: "2003",
    type: "event",
    tag: "Fox & Affleck",
    parents: ["xmen_1_node"]
  },
{
    id: "xmen_2_node",
    refId: "xmen-2",
    lane: 2,
    label: "X-Men 2 (X2)",
    subtitle: "William Stryker ataca la escuela y mutantes y Magneto se alían",
    lineName: "Universo Fox Mutante",
    year: "2003",
    type: "event",
    tag: "El Ataque de Stryker",
    parents: ["xmen_1_node"]
  },
  {
    id: "spiderman_2_node",
    refId: "spiderman-2-raimi",
    lane: 3,
    label: "Spider-Man 2",
    subtitle: "Otto Octavius y el sacrificio del héroe",
    lineName: "Spider-Verse & Sony",
    year: "2004 (Tierra-96283)",
    type: "event",
    tag: "Saga Tobey",
    parents: ["spidey1_node"]
  },
{
    id: "f4_2005_node",
    refId: "f4-2005",
    lane: 1,
    label: "Los 4 Fantásticos (2005)",
    subtitle: "Tormenta de rayos cósmicos y debut de Johnny Storm (Chris Evans)",
    lineName: "Los 4 Fantásticos",
    year: "2005",
    type: "event",
    tag: "Saga Clásica Fox",
    parents: []
  },
{
    id: "xmen_3_node",
    refId: "xmen-3",
    lane: 2,
    label: "X-Men: La Batalla Final",
    subtitle: "La cura mutante desata la guerra final contra la Hermandad",
    lineName: "Universo Fox Mutante",
    year: "2006",
    type: "event",
    tag: "La Cura Mutante",
    parents: ["xmen_2_node"]
  },
  {
    id: "spiderman_3_node",
    refId: "spiderman-3-raimi",
    lane: 3,
    label: "Spider-Man 3",
    subtitle: "El Venom negro, el Duende Nuevo y el adiós de Tobey",
    lineName: "Spider-Verse & Sony",
    year: "2007 (Tierra-96283)",
    type: "event",
    tag: "Trilogía Tobey",
    parents: ["spiderman_2_node"]
  },
  {
    id: "f4_silver_surfer_node",
    refId: "f4-silver-surfer",
    lane: 1,
    label: "Los 4 Fantásticos y Silver Surfer",
    subtitle: "El heraldo de Galactus llega a la Tierra-121698",
    lineName: "Los 4 Fantásticos",
    year: "2007",
    type: "event",
    tag: "Galactus",
    parents: ["f4_2005_node"]
  },
{
    id: "ironman1_node",
    refId: "iron-man-1",
    lane: 0,
    label: "Iron Man (Tony Stark)",
    subtitle: "Tony Stark forja su armadura blindada y nace el UCM moderno",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2008",
    type: "event",
    tag: "Inicio Era Moderna",
    parents: ["cap1_node"]
  },
  {
    id: "incredible_hulk_node",
    refId: "incredible-hulk",
    lane: 0,
    label: "El Increíble Hulk",
    subtitle: "Bruce Banner busca cura frente al Abominación",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2008 / 2011",
    type: "event",
    tag: "Hulk & Abominación",
    parents: ["ironman1_node"]
  },
  {
    id: "iron_man_2_node",
    refId: "iron-man-2",
    lane: 0,
    label: "Iron Man 2",
    subtitle: "Stark contra Whiplash y la sombra de SHIELD",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2010",
    type: "event",
    tag: "Whiplash",
    parents: ["incredible_hulk_node"]
  },
  {
    id: "thor_1_node",
    refId: "thor-1",
    lane: 0,
    label: "Thor",
    subtitle: "El dios del trueno exiliado aprende humildad",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2011",
    type: "event",
    tag: "Dios del Trueno",
    parents: ["iron_man_2_node"]
  },
{
    id: "avengers1_node",
    refId: "the-avengers",
    lane: 0,
    label: "Los Vengadores (Batalla de NY)",
    subtitle: "Los héroes se unen contra Loki; la variante de Loki escapa",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2012",
    type: "event",
    tag: "Primer Gran Crossover",
    parents: ["ironman1_node"]
  },
{
    id: "tasm1_node",
    refId: "tasm-1",
    lane: 6,
    label: "The Amazing Spider-Man (Andrew Garfield)",
    subtitle: "Peter Parker investiga a Oscorp en la Tierra-120703",
    lineName: "Universo Andrew Garfield (Tierra-120703)",
    year: "2012",
    type: "event",
    tag: "Universo Andrew Garfield",
    parents: ["spidey1_node"]
  },
  {
    id: "iron_man_3_node",
    refId: "iron-man-3",
    lane: 0,
    label: "Iron Man 3",
    subtitle: "Stark, el Mandarín y la amenaza del Extremis",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "Navidad 2012",
    type: "event",
    tag: "Extremis",
    parents: ["avengers1_node"]
  },
{
    id: "the_wolverine_node",
    refId: "the-wolverine-2013",
    lane: 2,
    label: "Wolverine Inmortal",
    subtitle: "Logan en Japón enfrentando a la Yakuza y a los demonios de su pasado",
    lineName: "Universo Fox Mutante",
    year: "2013",
    type: "event",
    tag: "Rumbo a Japón",
    parents: ["xmen_3_node"]
  },
  {
    id: "thor_dark_world_node",
    refId: "thor-dark-world",
    lane: 0,
    label: "Thor: Un Mundo Oscuro",
    subtitle: "Los Elfos Oscuros siembran el Aether",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2013",
    type: "event",
    tag: "El Aether",
    parents: ["iron_man_3_node"]
  },
  {
    id: "tasm_2_node",
    refId: "tasm-2",
    lane: 6,
    label: "Amazing Spider-Man 2",
    subtitle: "Electro, la muerte de Gwen Stacy y el adiós de Andrew",
    lineName: "Universo Andrew Garfield (Tierra-120703)",
    year: "2014",
    type: "event",
    tag: "Universo Andrew",
    parents: ["tasm1_node"]
  },
  {
    id: "cap_winter_soldier_node",
    refId: "cap-winter-soldier",
    lane: 0,
    label: "Capitán América: Soldado de Invierno",
    subtitle: "Steve descubre la Hidra infiltrada en SHIELD",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2014",
    type: "event",
    tag: "Hidra en SHIELD",
    parents: ["thor_dark_world_node"]
  },
  {
    id: "gotg1_node",
    refId: "gotg-1",
    lane: 0,
    label: "Guardianes de la Galaxia",
    subtitle: "Star-Lord y compañía custodian la Gema del Poder",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2014",
    type: "event",
    tag: "Gema del Poder",
    parents: ["cap_winter_soldier_node"]
  },
  {
    id: "gotg2_node",
    refId: "gotg-2",
    lane: 0,
    label: "Guardianes Vol. 2",
    subtitle: "Peter descubre a Ego, su padre celestial",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2014",
    type: "event",
    tag: "Ego, Planeta Vivo",
    parents: ["gotg1_node"]
  },
  {
    id: "daredevil_s1_node",
    refId: "daredevil-s1",
    lane: 0,
    label: "Daredevil (T1)",
    subtitle: "Matt Murdock contra Wilson Fisk en Hell's Kitchen",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2014 - 2015",
    type: "event",
    tag: "Héroes de Nueva York",
    parents: ["gotg2_node"]
  },
  {
    id: "f4_2015_node",
    refId: "f4-2015",
    lane: 1,
    label: "Cuatro Fantásticos (2015)",
    subtitle: "Fant4stic: el reinicio de la familia en la Tierra-TRN562",
    lineName: "Los 4 Fantásticos",
    year: "2015",
    type: "event",
    tag: "Reinicio 2015",
    parents: ["f4_silver_surfer_node"]
  },
  {
    id: "avengers_ultron_node",
    refId: "avengers-age-of-ultron",
    lane: 0,
    label: "Vengadores: La Era de Ultrón",
    subtitle: "Ultron nace, los Vengadores se fracturan y llega Vision",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2015",
    type: "event",
    tag: "Ultron & Vision",
    parents: ["avengers1_node"]
  },
  {
    id: "ant_man_1_node",
    refId: "ant-man-1",
    lane: 0,
    label: "Ant-Man",
    subtitle: "Scott Lang hereda el traje y el mundo cuántico de Pym",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2015",
    type: "event",
    tag: "Reino Cuántico",
    parents: ["avengers_ultron_node"]
  },
{
    id: "deadpool1_node",
    refId: "deadpool-1",
    lane: 2,
    label: "Deadpool (Wade Wilson)",
    subtitle: "Wade Wilson rompe la cuarta pared dentro del universo de Fox",
    lineName: "Universo Fox Mutante",
    year: "2016",
    type: "event",
    tag: "El Mercenario Bocazas",
    parents: ["dofp_node"]
  },
{
    id: "civilwar_node",
    refId: "cap-civil-war",
    lane: 0,
    label: "Capitán América: Civil War",
    subtitle: "Fractura de los Vengadores y llegada de Tom Holland al UCM",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2016",
    type: "event",
    tag: "Guerra Civil de Héroes",
    parents: ["avengers1_node"]
  },
  {
    id: "black_widow_node",
    refId: "black-widow",
    lane: 0,
    label: "Black Widow",
    subtitle: "Natasha regresa a su pasado: la Red y su familia",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2016 (Post-Civil War)",
    type: "event",
    tag: "Pasado de Viuda Negra",
    parents: ["civilwar_node"]
  },
  {
    id: "black_panther_1_node",
    refId: "black-panther-1",
    lane: 0,
    label: "Black Panther",
    subtitle: "T'Challa reina Wakanda frente a Killmonger",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2016",
    type: "event",
    tag: "Wakanda",
    parents: ["black_widow_node"]
  },
  {
    id: "spiderman_homecoming_node",
    refId: "spiderman-homecoming",
    lane: 0,
    label: "Spider-Man: Homecoming",
    subtitle: "Peter Parker crece bajo la tutela de Tony Stark",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "Otoño 2016",
    type: "event",
    tag: "UCM Arácnido",
    parents: ["black_panther_1_node"]
  },
  {
    id: "doctor_strange_1_node",
    refId: "doctor-strange-1",
    lane: 0,
    label: "Doctor Strange",
    subtitle: "Stephen Strange se forja como Hechicero Supremo",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2016 - 2017",
    type: "event",
    tag: "Hechicero Supremo",
    parents: ["spiderman_homecoming_node"]
  },
  {
    id: "thor_ragnarok_node",
    refId: "thor-ragnarok",
    lane: 0,
    label: "Thor: Ragnarok",
    subtitle: "Hela destruye Asgard y Thor pierde su hogar",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2017",
    type: "event",
    tag: "Crepúsculo de Asgard",
    parents: ["doctor_strange_1_node"]
  },
  {
    id: "ant_man_wasp_node",
    refId: "ant-man-and-the-wasp",
    lane: 0,
    label: "Ant-Man y la Avispa",
    subtitle: "Scott y Hope rescatan a Janet del Reino Cuántico",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2018",
    type: "event",
    tag: "Reino Cuántico",
    parents: ["thor_ragnarok_node"]
  },
{
    id: "infinitywar_node",
    refId: "avengers-infinity-war",
    lane: 0,
    label: "Vengadores: Infinity War",
    subtitle: "El chasquido de Thanos y la visión de 14 millones de futuros",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2018",
    type: "event",
    tag: "El Chasquido de Thanos",
    parents: ["civilwar_node"]
  },
{
    id: "deadpool_2_node",
    refId: "deadpool-2",
    lane: 2,
    label: "Deadpool 2",
    subtitle: "Wade Wilson forma a los X-Force para salvar al joven Russell Collins",
    lineName: "Universo Fox Mutante",
    year: "2018",
    type: "event",
    tag: "X-Force & Cable",
    parents: ["deadpool1_node"]
  },
  {
    id: "venom_1_node",
    refId: "venom-1",
    lane: 3,
    label: "Venom",
    subtitle: "Eddie Brock y el simbionte en la Tierra-688 (SSU)",
    lineName: "Spider-Verse & Sony",
    year: "2018 (Tierra-688)",
    type: "event",
    tag: "SSU de Sony",
    parents: ["tasm_2_node"]
  },
  {
    id: "spider_verse_1_node",
    refId: "spider-verse-1",
    lane: 3,
    label: "Un Nuevo Universo",
    subtitle: "Miles Morales reúne la red del multiverso arácnido animado",
    lineName: "Spider-Verse & Sony",
    year: "2018 (Tierra-1610B)",
    type: "event",
    tag: "Multiverso Arácnido",
    parents: ["venom_1_node"]
  },
{
    id: "endgame_node",
    refId: "avengers-endgame",
    lane: 0,
    label: "Vengadores: Endgame",
    subtitle: "Atraco al tiempo cuántico, despedida de Iron Man y salto a 2023",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2023",
    type: "event",
    tag: "Victoria & Ramas Abiertas",
    parents: ["infinitywar_node"]
  },
{
    id: "loki_tva_node",
    refId: "loki-s1-s2",
    lane: 4,
    label: "Loki: El Dios de las Historias",
    subtitle: "Loki sostiene físicamente con su magia todo el árbol del Multiverso",
    lineName: "TVA & Trono del Multiverso",
    year: "Atemporal",
    type: "multiverse_core",
    tag: "Eje Central Multiversal",
    parents: ["avengers1_node", "endgame_node"]
  },
  {
    id: "what_if_node",
    refId: "what-if-series",
    lane: 4,
    label: "What If...?",
    subtitle: "Uatu el Vigilante relata las realidades alternas",
    lineName: "TVA & Trono del Multiverso",
    year: "Realidades Infinitas",
    type: "event",
    tag: "Uatu",
    parents: ["loki_tva_node"]
  },
  {
    id: "wandavision_node",
    refId: "wandavision",
    lane: 0,
    label: "WandaVision",
    subtitle: "Wanda forja su suburbio de sitcom en Westview",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "Otoño 2023",
    type: "event",
    tag: "El Hex de Westview",
    parents: ["endgame_node"]
  },
  {
    id: "falcon_winter_soldier_node",
    refId: "falcon-winter-soldier",
    lane: 0,
    label: "Falcon y el Soldado de Invierno",
    subtitle: "Sam Wilson reclama el escudo del Capitán América",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "Primavera 2024",
    type: "event",
    tag: "Nuevo Capitán",
    parents: ["wandavision_node"]
  },
  {
    id: "shang_chi_node",
    refId: "shang-chi",
    lane: 0,
    label: "Shang-Chi",
    subtitle: "El maestro del kung fu y los legendarios Diez Anillos",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "Primavera 2024",
    type: "event",
    tag: "Diez Anillos",
    parents: ["falcon_winter_soldier_node"]
  },
  {
    id: "eternals_node",
    refId: "eternals",
    lane: 0,
    label: "Eternals",
    subtitle: "Los Celestiales y el juicio de Arishem sobre la Tierra",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "Otoño 2024",
    type: "event",
    tag: "Los Celestiales",
    parents: ["shang_chi_node"]
  },
  {
    id: "far_from_home_node",
    refId: "spider-man-far-from-home",
    lane: 0,
    label: "Spider-Man: Lejos de Casa",
    subtitle: "Mysterio engaña al mundo y desenmascara a Peter",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "Verano 2024",
    type: "event",
    tag: "Mysterio",
    parents: ["eternals_node"]
  },
  {
    id: "venom_carnage_node",
    refId: "venom-let-there-be-carnage",
    lane: 3,
    label: "Venom: Habrá Matanza",
    subtitle: "Cletus Kasady libera el caos de Carnage",
    lineName: "Spider-Verse & Sony",
    year: "2024",
    type: "event",
    tag: "Carnage",
    parents: ["spider_verse_1_node"]
  },
{
    id: "nowayhome_node",
    refId: "spiderman-no-way-home",
    lane: 0,
    label: "Spider-Man: No Way Home",
    subtitle: "Hechizo corrompido: Tobey, Andrew y Tom Holland luchan juntos",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2024",
    type: "convergence",
    tag: "CONVERGENCIA 1: Tres Spider-Man",
    parents: ["endgame_node", "tasm1_node", "loki_tva_node"]
  },
{
    id: "multiverse_madness_node",
    refId: "doctor-strange-multiverse-madness",
    lane: 0,
    label: "Doctor Strange: Multiverso de la Locura",
    subtitle: "Viaje a la Tierra-838 de los Illuminati y alerta de Incursiones",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2024",
    type: "event",
    tag: "Amenaza de Incursiones",
    parents: ["nowayhome_node"]
  },
  {
    id: "hawkeye_node",
    refId: "hawkeye-series",
    lane: 0,
    label: "Hawkeye",
    subtitle: "Clint y Kate Bishop: la navidad de los arqueros",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "Navidad 2024",
    type: "event",
    tag: "Kate Bishop",
    parents: ["far_from_home_node"]
  },
  {
    id: "moon_knight_node",
    refId: "moon-knight",
    lane: 0,
    label: "Moon Knight",
    subtitle: "Marc Spector, avatar del dios lunar Khonshu",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "Primavera 2025",
    type: "event",
    tag: "Khonshu",
    parents: ["hawkeye_node"]
  },
  {
    id: "ms_marvel_node",
    refId: "ms-marvel",
    lane: 0,
    label: "Ms. Marvel",
    subtitle: "Kamala Khan, la mutante de Jersey City",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "Otoño 2025",
    type: "event",
    tag: "Gen Mutante",
    parents: ["moon_knight_node"]
  },
  {
    id: "she_hulk_node",
    refId: "she-hulk",
    lane: 0,
    label: "She-Hulk",
    subtitle: "Jennifer Walters, la abogada que rompe la cuarta pared",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2025",
    type: "event",
    tag: "Rompe la 4ª Pared",
    parents: ["ms_marvel_node"]
  },
  {
    id: "wakanda_forever_node",
    refId: "black-panther-wakanda-forever",
    lane: 0,
    label: "Black Panther: Wakanda Forever",
    subtitle: "Shuri sucede a T'Challa frente a Namor y Talokan",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "Primavera 2025",
    type: "event",
    tag: "Namor & Talokan",
    parents: ["she_hulk_node"]
  },
  {
    id: "quantumania_node",
    refId: "antman-quantumania",
    lane: 0,
    label: "Quantumania",
    subtitle: "Kang el Conquistador y el Consejo de Kangs",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2026",
    type: "event",
    tag: "Kang",
    parents: ["wakanda_forever_node"]
  },
  {
    id: "gotg_3_node",
    refId: "gotg-3",
    lane: 0,
    label: "Guardianes Vol. 3",
    subtitle: "Rocket, High Evolutionary y el adiós de los Guardianes",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2026",
    type: "event",
    tag: "High Evolutionary",
    parents: ["quantumania_node"]
  },
  {
    id: "spider_verse_2_node",
    refId: "spider-verse-2",
    lane: 3,
    label: "Cruzando el Multiverso",
    subtitle: "Miles y la Mancha perseguidos por la Spider-Sociedad",
    lineName: "Spider-Verse & Sony",
    year: "Multiverso Arácnido",
    type: "event",
    tag: "La Mancha",
    parents: ["venom_carnage_node"]
  },
{
    id: "the_marvels_node",
    refId: "the-marvels",
    lane: 0,
    label: "The Marvels (Brecha Dimensional)",
    subtitle: "Monica Rambeau cruza a la dimensión mutante con Bestia de los X-Men",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2026",
    type: "event",
    tag: "Apertura al Universo Mutante",
    parents: ["multiverse_madness_node"]
  },
  {
    id: "echo_node",
    refId: "echo-series",
    lane: 0,
    label: "Echo",
    subtitle: "Maya López se reclama su legado en Nueva York",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2026",
    type: "event",
    tag: "Nueva York",
    parents: ["gotg_3_node"]
  },
{
    id: "deadpool_wolverine_node",
    refId: "deadpool-and-wolverine",
    lane: 2,
    label: "Deadpool & Wolverine (El Vacío)",
    subtitle: "Rescate del Vacío: Wolverine, Blade, Elektra, Gambito y X-23",
    lineName: "Universo Fox Mutante",
    year: "2024 / Vacío",
    type: "convergence",
    tag: "CONVERGENCIA 2: Legado Fox al UCM",
    parents: ["dofp_node", "loki_tva_node", "the_marvels_node", "f4_2005_node"]
  },
  {
    id: "agatha_node",
    refId: "agatha-all-along",
    lane: 0,
    label: "Agatha All Along",
    subtitle: "Agatha recorre el Camino de las Brujas con su aquelarre",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "Otoño 2026",
    type: "event",
    tag: "Camino de las Brujas",
    parents: ["echo_node"]
  },
{
    id: "cap_brave_new_world_node",
    refId: "cap-brave-new-world",
    lane: 0,
    label: "Capitán América: Un Nuevo Mundo",
    subtitle: "Sam Wilson vs. Red Hulk y la disputa mundial por el Adamantium de Tiamut",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2026",
    type: "event",
    tag: "El Nuevo Orden & Red Hulk",
    parents: ["civilwar_node", "the_marvels_node"]
  },
  {
    id: "daredevil_born_again_node",
    refId: "daredevil-born-again",
    lane: 0,
    label: "Daredevil: Born Again",
    subtitle: "Matt renace frente a Wilson Fisk, alcalde de Nueva York",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2026",
    type: "event",
    tag: "Renacer de Hells Kitchen",
    parents: ["agatha_node"]
  },
{
    id: "thunderbolts_node",
    refId: "thunderbolts",
    lane: 0,
    label: "Thunderbolts* (Sentry / The Void)",
    subtitle: "Yelena, Bucky, John Walker y Red Guardian frente al despertar de Sentry",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2026 - 2027",
    type: "event",
    tag: "Nuevos Vengadores & Sentry",
    parents: ["cap_brave_new_world_node"]
  },
  {
    id: "ironheart_node",
    refId: "ironheart-series",
    lane: 0,
    label: "Ironheart",
    subtitle: "Riri Williams forja su propia armadura",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2027",
    type: "event",
    tag: "Riri Williams",
    parents: ["daredevil_born_again_node"]
  },
{
    id: "spiderman_brand_new_day_node",
    refId: "spiderman-brand-new-day",
    lane: 0,
    label: "Spider-Man: Brand New Day",
    subtitle: "Peter Parker en el anonimato de NY enfrentando las secuelas multiversales",
    lineName: "Línea Sagrada (Tierra-616)",
    year: "2026 - 2027",
    type: "event",
    tag: "El Regreso de Spidey UCM",
    parents: ["nowayhome_node"]
  },
{
    id: "doomsday_node",
    refId: "avengers-doomsday",
    lane: 5,
    label: "Avengers: Doomsday (Victor Von Doom)",
    subtitle: "Colapso masivo de universos e incursiones: Ascenso de Doctor Doom",
    lineName: "Battleworld (Convergencia)",
    year: "2026 - 2027",
    type: "cataclysm",
    tag: "COLAPSO: Choque de Realidades",
    parents: ["thunderbolts_node", "spiderman_brand_new_day_node", "deadpool_wolverine_node", "f4_steps_node", "loki_tva_node"]
  },
{
    id: "secretwars_node",
    refId: "avengers-secret-wars",
    lane: 5,
    label: "Avengers: Secret Wars (Battleworld)",
    subtitle: "Guerra final en Battleworld y reinicio cósmico unificado de Marvel",
    lineName: "Battleworld (Convergencia)",
    year: "2027",
    type: "final",
    tag: "Reinicio Definitivo de Marvel",
    parents: ["doomsday_node"]
  },
{
    id: "logan_node",
    refId: "logan-2017",
    lane: 2,
    label: "Logan (El Ocaso de los Mutantes)",
    subtitle: "Muerte del Ser Ancla que sostenía la realidad mutante de Fox",
    lineName: "Universo Fox Mutante",
    year: "2029 (Distópico)",
    type: "event",
    tag: "Muerte del Ser Ancla",
    parents: ["deadpool_wolverine_node"]
  }

];

// Configuración de las Líneas Temporales Visuales (Carriles)
const LANE_CONFIG = [
  { id: 0, name: "Línea Sagrada (Tierra-616)", color: "#ef4444", glow: "rgba(239, 68, 68, 0.4)", label: "Línea Sagrada UCM", icon: Shield },
  { id: 1, name: "Los 4 Fantásticos", color: "#3b82f6", glow: "rgba(59, 130, 246, 0.4)", label: "Los 4 Fantásticos (60s & Fox)", icon: Compass },
  { id: 2, name: "Universo Fox Mutante", color: "#f59e0b", glow: "rgba(245, 158, 11, 0.4)", label: "Universo X-Men & Deadpool", icon: Flame },
  { id: 3, name: "Spider-Verse & Sony", color: "#06b6d4", glow: "rgba(6, 182, 212, 0.4)", label: "Spider-Verse & Sony", icon: Zap },
  { id: 4, name: "TVA & Trono del Multiverso", color: "#10b981", glow: "rgba(16, 185, 129, 0.4)", label: "Loki (Dios de las Historias)", icon: Sparkles },
  { id: 5, name: "Battleworld (Convergencia)", color: "#a855f7", glow: "rgba(168, 85, 247, 0.5)", label: "Battleworld / Doctor Doom", icon: Skull },
  { id: 6, name: "Universo Andrew Garfield (Tierra-120703)", color: "#6366f1", glow: "rgba(99, 102, 241, 0.4)", label: "TASM (Andrew Garfield)", icon: Globe },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("tree");
  const [selectedUniverse, setSelectedUniverse] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [onlyUnwatched, setOnlyUnwatched] = useState(false);
  const [onlyOwned, setOnlyOwned] = useState(false);
  const [sortOrder, setSortOrder] = useState("chrono");
  const [selectedItem, setSelectedItem] = useState(null);

  // Estados interactivos para el Árbol de Líneas
  const [selectedTimelineNode, setSelectedTimelineNode] = useState(TIMELINE_GRAPH_NODES[TIMELINE_GRAPH_NODES.length - 3]); // Doomsday por defecto
  const [highlightedLine, setHighlightedLine] = useState("all");
  const [treeDensity, setTreeDensity] = useState("spacious");
  const [collapsedLane, setCollapsedLane] = useState(null);
  const [treeDetailOpen, setTreeDetailOpen] = useState(false);
  const [nowTs, setNowTs] = useState(() => Date.now());

  const [watchedList, setWatchedList] = useState(() => {
    try {
      const saved = localStorage.getItem("marvel_watched_list_v2");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem("marvel_watchlist_v2");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("marvel_watched_list_v2", JSON.stringify(watchedList));
    } catch (e) {
      console.error(e);
    }
  }, [watchedList]);

  useEffect(() => {
    try {
      localStorage.setItem("marvel_watchlist_v2", JSON.stringify(watchlist));
    } catch (e) {
      console.error(e);
    }
  }, [watchlist]);

  // --- MODO ADMIN (oculto: 5 clics en el logo MARVEL) ---
  const [adminAuthed, setAdminAuthed] = useState(() => {
    try { return sessionStorage.getItem(ADMIN_SESSION_KEY) === "1"; } catch { return false; }
  });
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");
  const [logoClicks, setLogoClicks] = useState(0);
  const logoTimerRef = useRef(null);
  const [showOwnedStars, setShowOwnedStars] = useState(() => {
    try { return sessionStorage.getItem(OWNED_STARS_KEY) === "1"; } catch { return false; }
  });
  const [ownedAdded, setOwnedAdded] = useState(() => {
    try { return JSON.parse(localStorage.getItem(OWNED_ADDED_KEY)) || []; } catch { return []; }
  });
  const [ownedRemoved, setOwnedRemoved] = useState(() => {
    try { return JSON.parse(localStorage.getItem(OWNED_REMOVED_KEY)) || []; } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem(OWNED_ADDED_KEY, JSON.stringify(ownedAdded)); } catch (e) { console.error(e); }
  }, [ownedAdded]);

  useEffect(() => {
    try { localStorage.setItem(OWNED_REMOVED_KEY, JSON.stringify(ownedRemoved)); } catch (e) { console.error(e); }
  }, [ownedRemoved]);

  useEffect(() => {
    const t = setInterval(() => setNowTs(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const isOwned = (id) => {
    if (ownedRemoved.includes(id)) return false;
    return TENEMOS_IDS.includes(id) || ownedAdded.includes(id);
  };

  const showStars = showOwnedStars || adminAuthed;

  const getOwnedList = () => {
    if (!adminAuthed) return [];
    const base = TENEMOS_IDS.filter((id) => !ownedRemoved.includes(id));
    return [...new Set([...base, ...ownedAdded])];
  };

  const toggleOwned = (id) => {
    if (isOwned(id)) {
      if (ownedAdded.includes(id)) {
        setOwnedAdded((prev) => prev.filter((x) => x !== id));
      } else {
        setOwnedRemoved((prev) => [...prev, id]);
      }
    } else {
      if (ownedRemoved.includes(id)) {
        setOwnedRemoved((prev) => prev.filter((x) => x !== id));
      } else {
        setOwnedAdded((prev) => [...prev, id]);
      }
    }
  };

  const handleLogoClick = () => {
    setLogoClicks((prev) => {
      const next = prev + 1;
      if (logoTimerRef.current) clearTimeout(logoTimerRef.current);
      logoTimerRef.current = setTimeout(() => setLogoClicks(0), 3000);
      if (next >= 5) {
        setLogoClicks(0);
        setAdminPanelOpen(true);
        return 0;
      }
      return next;
    });
  };

  const handleStarClick = () => {
    setShowOwnedStars((prevShow) => {
      const toggled = !prevShow;
      try { sessionStorage.setItem(OWNED_STARS_KEY, toggled ? "1" : "0"); } catch (err) { console.error(err); }
      return toggled;
    });
    if (showOwnedStars) {
      setOnlyOwned(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUser.trim() === ADMIN_USER && adminPass === ADMIN_PASSWORD) {
      setAdminAuthed(true);
      try { sessionStorage.setItem(ADMIN_SESSION_KEY, "1"); } catch (err) { console.error(err); }
      setAdminPanelOpen(false);
      setAdminUser("");
      setAdminPass("");
      setAdminError("");
    } else {
      setAdminError("Usuario o contraseña incorrectos");
      setAdminPass("");
    }
  };

  const handleAdminLogout = () => {
    setAdminAuthed(false);
    try { sessionStorage.removeItem(ADMIN_SESSION_KEY); } catch (err) { console.error(err); }
    setAdminPanelOpen(false);
  };

  const toggleWatched = (id) => {
    setWatchedList((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleWatchlist = (id) => {
    setWatchlist((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredData = useMemo(() => {
    return MARVEL_DATABASE.filter((item) => {
      const matchesUniverse = selectedUniverse === "all" || item.universeKey === selectedUniverse;
      const matchesType = selectedType === "all" || item.type === selectedType;
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.originalTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.characters.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.timelineYear.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.synopsis.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesUniverse && matchesType && matchesSearch;
    }).sort((a, b) => {
      if (sortOrder === "chrono") {
        return a.chronoOrder - b.chronoOrder;
      } else {
        return a.releaseYear - b.releaseYear;
      }
    });
  }, [selectedUniverse, selectedType, searchQuery, sortOrder]);

  const catalogItems = useMemo(() => {
    let items = filteredData;
    if (onlyUnwatched) items = items.filter((item) => !watchedList.includes(item.id));
    if (onlyOwned) items = items.filter((item) => isOwned(item.id));
    return items;
  }, [filteredData, onlyUnwatched, onlyOwned, watchedList, ownedAdded, ownedRemoved]);

  const groupedByEra = useMemo(() => {
    const groups = {};
    filteredData.forEach((item) => {
      const groupName = sortOrder === "chrono" ? item.era : `Año ${item.releaseYear}`;
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(item);
    });
    return groups;
  }, [filteredData, sortOrder]);

  const progressPercent = Math.round((watchedList.length / MARVEL_DATABASE.length) * 100);

  const changeTab = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const doomsdayTier1 = useMemo(() => MARVEL_DATABASE.filter(m => m.doomsdayTier === "tier-1"), []);
  const doomsdayTier2 = useMemo(() => MARVEL_DATABASE.filter(m => m.doomsdayTier === "tier-2"), []);

  const doomsdayWatchedCount = MARVEL_DATABASE.filter(m => m.doomsdayTier === "tier-1" && watchedList.includes(m.id)).length;
  const doomsdayPercent = Math.round((doomsdayWatchedCount / doomsdayTier1.length) * 100);

  const doomsdayCountdown = useMemo(() => {
    const total = DOOMSDAY_RELEASE_DATE.getTime() - nowTs;
    const diff = Math.max(0, total);
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { d, h, m, s, over: total <= 0 };
  }, [nowTs]);
  const essentialWatchedCount = DOOMSDAY_ESSENTIAL_IDS.filter(id => watchedList.includes(id)).length;
  const essentialRouteRows = [];
  for (let i = 0; i < DOOMSDAY_ESSENTIAL_IDS.length; i += 5) {
    essentialRouteRows.push(DOOMSDAY_ESSENTIAL_IDS.slice(i, i + 5));
  }

  // Parámetros de renderizado SVG del Árbol de Líneas
  const nodeSpacingY = treeDensity === "spacious" ? 92 : 68;
  const laneSpacingX = 46;
  const graphOriginX = 32;
  const graphOriginY = 48;
  const visibleNodes = useMemo(
    () => collapsedLane == null ? TIMELINE_GRAPH_NODES : TIMELINE_GRAPH_NODES.filter(node => node.lane === collapsedLane),
    [collapsedLane]
  );
  const svgTotalHeight = visibleNodes.length * nodeSpacingY + 80;

  const maxLaneX = graphOriginX + Math.max(...LANE_CONFIG.map((l) => l.id)) * laneSpacingX;
  const cardOffset = maxLaneX + 24;

  // Posiciones calculadas para cada nodo
  const nodePositions = useMemo(() => {
    const map = {};
    visibleNodes.forEach((node, index) => {
      map[node.id] = {
        x: graphOriginX + node.lane * laneSpacingX,
        y: graphOriginY + index * nodeSpacingY,
        laneColor: LANE_CONFIG[node.lane]?.color || "#ef4444",
        index
      };
    });
    return map;
  }, [visibleNodes, nodeSpacingY, laneSpacingX, graphOriginX, graphOriginY]);

  // Generación de curvas Bézier vectoriales entre películas conectadas
  const svgTimelinePaths = useMemo(() => {
    const paths = [];
    TIMELINE_GRAPH_NODES.forEach((node) => {
      const targetPos = nodePositions[node.id];
      if (!targetPos || !node.parents) return;

      node.parents.forEach((parentId) => {
        const sourcePos = nodePositions[parentId];
        if (!sourcePos) return;

        const isSameLane = sourcePos.x === targetPos.x;
        const color = targetPos.laneColor;

        let d = "";
        if (isSameLane) {
          d = `M ${sourcePos.x} ${sourcePos.y} L ${targetPos.x} ${targetPos.y}`;
        } else {
          const midY = (sourcePos.y + targetPos.y) / 2;
          d = `M ${sourcePos.x} ${sourcePos.y} C ${sourcePos.x} ${midY}, ${targetPos.x} ${midY}, ${targetPos.x} ${targetPos.y}`;
        }

        const isHighlighted = highlightedLine === "all" || highlightedLine === node.lineName;

        paths.push({
          key: `${parentId}->${node.id}`,
          d,
          color,
          isConvergence: node.type === "convergence" || node.type === "cataclysm",
          isHighlighted
        });
      });
    });
    return paths;
  }, [nodePositions, highlightedLine]);

  const activeDatabaseItem = useMemo(() => {
    if (!selectedTimelineNode) return null;
    return MARVEL_DATABASE.find(m => m.id === selectedTimelineNode.refId);
  }, [selectedTimelineNode]);

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 font-sans selection:bg-red-600 selection:text-white pb-24">
      
      {/* Resplandor superior cósmico */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-purple-600/15 via-red-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* HEADER / BARRA DE NAVEGACIÓN */}
      <header className="border-b border-white/10 backdrop-blur-xl sticky top-0 z-40 bg-[#06080d]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleLogoClick}
                title={adminAuthed ? "Sesión admin activa" : "MARVEL"}
                className={`relative bg-gradient-to-r from-red-600 to-rose-700 text-white font-black px-2.5 py-1 rounded text-lg tracking-widest uppercase shadow-lg shadow-red-600/40 border select-none transition-transform ${
                  logoClicks > 0 ? "scale-105 ring-2 ring-white/40" : ""
                } ${adminAuthed ? "border-amber-400/60" : "border-red-500/40"}`}
              >
                MARVEL
                {adminAuthed && (
                  <Lock className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 text-amber-400 fill-amber-400/30 drop-shadow" title="Admin activo" />
                )}
              </button>
              <button
                onClick={handleStarClick}
                title={showStars ? "Ocultar estrellas" : "Mostrar estrellas de la colección"}
                className={`flex items-center justify-center w-9 h-9 rounded-lg border transition-all select-none ${
                  showStars ? "border-amber-500/60 bg-amber-500/15" : "border-white/10 bg-white/5 hover:bg-white/15"
                }`}
              >
                <Star className={`w-5 h-5 ${showStars ? "text-amber-400 fill-amber-400" : "text-slate-400"}`} />
              </button>
              <div className="flex flex-col">
                <span className="font-black text-sm sm:text-base tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                  CRONOLOGÍA MULTIVERSAL
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                  UCM • Fox Mutantes • Spider-Verse • 4 Fantásticos • Doomsday
                </span>
              </div>
            </div>

            <div className="flex md:hidden items-center gap-1 text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
              <span className="text-emerald-400 font-bold">{watchedList.length}</span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400">{MARVEL_DATABASE.length}</span>
            </div>
          </div>

          <nav className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10 text-xs sm:text-sm w-full md:w-auto justify-center overflow-x-auto scrollbar-none">
            
            <button
              onClick={() => changeTab("tree")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all font-bold ${
                activeTab === "tree"
                  ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-lg shadow-purple-900/40 border border-purple-400/40 scale-[1.02]"
                  : "text-purple-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <GitBranch className="w-4 h-4 text-purple-300" />
              Árbol de Líneas
              <span className="bg-purple-950 text-purple-300 text-[10px] px-1.5 py-0.5 rounded-full border border-purple-500/30">
                Visual
              </span>
            </button>

            <button
              onClick={() => changeTab("doomsday")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all font-bold ${
                activeTab === "doomsday"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-900/40 border border-emerald-400/30"
                  : "text-emerald-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Skull className="w-4 h-4 text-emerald-300 animate-pulse" />
              Ruta a Doomsday
            </button>

            <button
              onClick={() => changeTab("timeline")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all font-semibold ${
                activeTab === "timeline"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Clock className="w-4 h-4" />
              Cronología Completa
            </button>

            <button
              onClick={() => changeTab("catalog")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all font-semibold ${
                activeTab === "catalog"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Film className="w-4 h-4" />
              Catálogo ({MARVEL_DATABASE.length})
            </button>

            <button
              onClick={() => changeTab("tracker")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all font-semibold ${
                activeTab === "tracker"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {progressPercent}%
            </button>
          </nav>

        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6">

        {/* ========================================================================= */}
        {/* VISTA 1: ÁRBOL DE LÍNEAS TEMPORALES VISUAL (MAPA DE CONEXIONES)            */}
        {/* ========================================================================= */}
        {activeTab === "tree" && (
          <div className="space-y-6">
            
            {/* Banner Introductorio */}
            <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/70 border border-purple-500/30 relative overflow-hidden shadow-2xl">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-black uppercase tracking-wider">
                    <Globe className="w-3.5 h-3.5 text-purple-300" />
                    Mapa Visual de Líneas Temporales e Incursiones
                  </div>
                  <h1 className="text-xl sm:text-3xl font-black text-white">
                    El Árbol de Líneas Temporales del Multiverso Marvel
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Sigue la evolución de cada universo en paralelo (<em>Tierra-616, Mutantes de Fox, Spider-Verse, 4 Fantásticos</em>) incluyendo los eventos de <strong>Brave New World, Thunderbolts* y First Steps</strong>, hasta su colisión final en <strong>Battleworld (Avengers: Doomsday & Secret Wars)</strong>.
                  </p>
                </div>

                <div className="flex sm:flex-col items-center justify-end gap-2 bg-black/40 p-2.5 rounded-2xl border border-white/10 shrink-0">
                  <div className="flex items-center gap-1 text-[11px] text-slate-300 font-semibold">
                    <span>Espaciado:</span>
                    <button
                      onClick={() => setTreeDensity(treeDensity === "spacious" ? "compact" : "spacious")}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center gap-1"
                    >
                      {treeDensity === "spacious" ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                      {treeDensity === "spacious" ? "Compacto" : "Espacioso"}
                    </button>
                  </div>

                  <button
                    onClick={() => { setHighlightedLine("all"); setCollapsedLane(null); }}
                    className={`text-[11px] px-3 py-1 rounded-lg font-bold transition-all ${
                      highlightedLine === "all" && collapsedLane == null ? "bg-purple-600 text-white" : "bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    Ver Todas las Líneas
                  </button>
                </div>
              </div>
            </div>

            {/* BOTONES DE FILTRO POR LÍNEA TEMPORAL */}
            <div className="flex flex-wrap items-center gap-2 pb-2">
              {LANE_CONFIG.map((lane) => {
                const Icon = lane.icon;
                const isCollapsed = collapsedLane === lane.id;
                const isSelected = highlightedLine === lane.name;
                return (
                  <div
                    key={lane.id}
                    className={`flex items-stretch rounded-xl overflow-hidden text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                      isSelected
                        ? "bg-white/15 text-white border-white/40 shadow-lg scale-[1.02]"
                        : "bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border-white/5"
                    }`}
                  >
                    <button
                      title={isSelected ? "Quitar resaltado (ver todas)" : "Resaltar esta línea (atenuar las demás)"}
                      onClick={() => {
                        if (collapsedLane != null && collapsedLane !== lane.id) setCollapsedLane(null);
                        setHighlightedLine(isSelected ? "all" : lane.name);
                      }}
                      className="flex items-center gap-2 px-3.5 py-2"
                    >
                      <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: lane.color, boxShadow: `0 0 8px ${lane.glow}` }} />
                      <Icon className="w-3.5 h-3.5" style={{ color: lane.color }} />
                      <span>{lane.label}</span>
                    </button>
                    <button
                      title={isCollapsed ? "Expandir todas las líneas" : "Ver solo esta línea (contraer el árbol)"}
                      onClick={() => {
                        if (isCollapsed) {
                          setCollapsedLane(null);
                          setHighlightedLine("all");
                        } else {
                          setCollapsedLane(lane.id);
                          setHighlightedLine(lane.name);
                        }
                      }}
                      className={`px-2.5 flex items-center justify-center border-l transition-all ${
                        isCollapsed ? "bg-white text-black" : "bg-white/10 hover:bg-white/20 text-slate-300"
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Aviso cuando el árbol está contraído a una sola línea */}
            {collapsedLane != null && visibleNodes.length > 0 && (() => {
              const lane = LANE_CONFIG[collapsedLane];
              return (
                <div className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-300">
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: lane.color }} />
                    <span className="truncate">
                      Mostrando solo <strong style={{ color: lane.color }}>{lane.name}</strong> ({visibleNodes.length} títulos). Usa el botón ojito de la línea o «Ver Todas las Líneas» para expandir.
                    </span>
                  </span>
                  <button
                    onClick={() => { setCollapsedLane(null); setHighlightedLine("all"); }}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center gap-1"
                  >
                    <Maximize2 className="w-3 h-3" /> Expandir todo
                  </button>
                </div>
              );
            })()}

            {/* GRAFO VISUAL CON LÍNEAS Y NODOS */}
            <div className="space-y-6">
              
              {/* ÁREA DEL MAPA SVG (Ancho Completo) */}
              <div className="bg-[#090c14] rounded-3xl border border-white/10 p-3 sm:p-6 relative overflow-x-auto shadow-2xl">
                
                <div className="flex items-center justify-between pb-4 mb-2 border-b border-white/10 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-semibold text-slate-200">Telar del Multiverso en Tiempo Real</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Haz clic en cualquier título para ver detalles</span>
                </div>

                <div className="relative" style={{ minWidth: "700px", height: `${svgTotalHeight}px` }}>
                  
                  {/* CAPA SVG CON LAS LÍNEAS TEMPORALES */}
                  <svg 
                    className="absolute inset-0 w-full h-full pointer-events-none z-0"
                    style={{ height: `${svgTotalHeight}px` }}
                  >
                    {/* Líneas guía verticales para cada Universo */}
                    {LANE_CONFIG.map((lane) => {
                      const x = graphOriginX + lane.id * laneSpacingX;
                      return (
                        <line
                          key={lane.id}
                          x1={x}
                          y1={20}
                          x2={x}
                          y2={svgTotalHeight - 20}
                          stroke={lane.color}
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                          opacity="0.25"
                        />
                      );
                    })}

                    {/* Líneas Bézier conectando películas y eventos */}
                    {svgTimelinePaths.map((path) => (
                      <path
                        key={path.key}
                        d={path.d}
                        fill="none"
                        stroke={path.color}
                        strokeWidth={path.isConvergence ? "3.5" : "2.5"}
                        strokeDasharray={path.isConvergence ? "6 3" : "none"}
                        opacity={path.isHighlighted ? 0.9 : 0.2}
                        className="transition-all duration-300"
                        style={{
                          filter: path.isHighlighted ? `drop-shadow(0 0 6px ${path.color})` : "none"
                        }}
                      />
                    ))}
                  </svg>

                  {/* CAPA DE NODOS Y TARJETAS DE PELÍCULAS */}
                  <div className="relative z-10">
                    {visibleNodes.map((node) => {
                      const pos = nodePositions[node.id];
                      const isSelected = selectedTimelineNode?.id === node.id;
                      const laneInfo = LANE_CONFIG[node.lane];
                      const dbItem = MARVEL_DATABASE.find(m => m.id === node.refId);
                      const isWatched = dbItem && watchedList.includes(dbItem.id);
                      const esTenemos = showStars && dbItem && isOwned(dbItem.id);

                      const isNodeHighlighted = highlightedLine === "all" || highlightedLine === node.lineName;

                      return (
                        <div
                          key={node.id}
                          onClick={() => {
                        if (treeDetailOpen && selectedTimelineNode?.id === node.id) {
                          setTreeDetailOpen(false);
                        } else {
                          setSelectedTimelineNode(node);
                          setTreeDetailOpen(true);
                        }
                      }}
                          className={`absolute left-0 right-0 flex items-center cursor-pointer group transition-all duration-200 ${
                            isNodeHighlighted ? "opacity-100" : "opacity-30 hover:opacity-80"
                          }`}
                          style={{
                            top: `${pos.y - 20}px`,
                            height: "40px"
                          }}
                        >
                          {/* Nodo circular en el carril exacto */}
                          <div 
                            className="absolute -translate-x-1/2 flex items-center justify-center transition-transform group-hover:scale-125 z-20"
                            style={{ left: `${pos.x}px` }}
                          >
                            <div 
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected 
                                  ? "ring-4 ring-white/50 scale-125 bg-white text-black" 
                                  : "bg-[#090c14]"
                              }`}
                              style={{ 
                                borderColor: laneInfo?.color,
                                boxShadow: `0 0 12px ${laneInfo?.glow}`
                              }}
                            >
                              {node.type === "convergence" || node.type === "cataclysm" ? (
                                <GitMerge className="w-3 h-3 text-white" />
                              ) : node.type === "multiverse_core" ? (
                                <Sparkles className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <div 
                                  className="w-2 h-2 rounded-full" 
                                  style={{ backgroundColor: isSelected ? "#000" : laneInfo?.color }} 
                                />
                              )}
                            </div>
                          </div>

                          {/* Tarjeta de la Película */}
                          <div 
                            className={`flex-1 mr-2 p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 backdrop-blur-md ${
                              isSelected
                                ? "bg-white/15 border-white/40 shadow-xl shadow-black"
                                : "bg-black/50 border-white/5 hover:border-white/20 hover:bg-white/5"
                            }`}
                            style={{ marginLeft: `${cardOffset}px` }}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">

                              {dbItem?.poster && (
                                <img
                                  src={dbItem.poster}
                                  alt={node.label}
                                  loading="lazy"
                                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                                  className="w-10 h-14 rounded-lg object-cover object-top shrink-0 shadow-lg shadow-black/40 border border-white/10"
                                />
                              )}

                              <span 
                                className="p-1.5 rounded-lg text-white shrink-0 text-[10px] font-bold"
                                style={{ backgroundColor: `${laneInfo?.color}30`, border: `1px solid ${laneInfo?.color}60` }}
                              >
                                {node.year}
                              </span>

                              <div className="min-w-0">
                                <div className="flex items-start gap-1.5">
                                  {esTenemos && (
                                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0 mt-0.5" title="La tienes" />
                                  )}
                                  <h4 className="flex-1 min-w-0 text-xs sm:text-sm font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                                    {node.label}
                                  </h4>
                                  {isWatched && (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                  )}
                                </div>
                                <span className="text-[11px] text-slate-400 block truncate">
                                  {node.subtitle}
                                </span>
                              </div>
                            </div>

                            <div className="hidden sm:flex items-center gap-2 shrink-0">
                              <span 
                                className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white border"
                                style={{ 
                                  backgroundColor: `${laneInfo?.color}20`,
                                  borderColor: `${laneInfo?.color}40`,
                                  color: laneInfo?.color
                                }}
                              >
                                {node.tag}
                              </span>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>

              </div>

              {/* Guía de Universos y Realidades (ancho completo) */}
              <div className="bg-[#090c14] rounded-3xl border border-white/10 p-5 space-y-3 text-xs">
                <h4 className="font-bold text-white flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Guía de Universos y Realidades
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-slate-300 text-[11px]">
                  <div>
                    <strong className="text-red-400">Línea Sagrada (Tierra-616):</strong> El universo principal donde transcurren las películas de Marvel Studios (Vengadores, Thunderbolts, Sam Wilson).
                  </div>
                  <div>
                    <strong className="text-blue-400">Los 4 Fantásticos:</strong> La dimensión retro de los 60 de Pedro Pascal y la saga clásica de Fox.
                  </div>
                  <div>
                    <strong className="text-amber-400">Universo Mutante (Fox):</strong> La saga de X-Men y Deadpool rescatada en el Vacío de la TVA.
                  </div>
                  <div>
                    <strong className="text-cyan-400">Spider-Verse:</strong> Las líneas temporales de Tobey Maguire, Andrew Garfield y Miles Morales.
                  </div>
                  <div>
                    <strong className="text-purple-400">Battleworld:</strong> El mundo unificado forjado por Doctor Doom tras el colapso de las realidades.
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VISTA 2: RUTA A AVENGERS: DOOMSDAY                                        */}
        {/* ========================================================================= */}
        {activeTab === "doomsday" && (
          <div className="space-y-10">
            
            <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-purple-950/70 border border-emerald-500/30 relative overflow-hidden shadow-2xl">
              <div className="relative z-10 max-w-4xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-wider">
                  <Skull className="w-3.5 h-3.5" />
                  Guía de Preparación Esencial
                </div>
                
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  ¿Qué necesitas ver para entender <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">Avengers: Doomsday</span>?
                </h1>
                
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Con el regreso de <strong>Robert Downey Jr. como Victor Von Doom</strong> y el inminente choque multiversal hacia <strong>Secret Wars</strong>, esta es la lista depurada y jerarquizada por niveles de importancia para no perderte ningún detalle sobre las <em>Incursiones, el Adamantium de Tiamut, Sentry, la TVA, el legado de Fox y Los 4 Fantásticos</em>.
                </p>

                <div className="bg-black/60 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 backdrop-blur-md max-w-xl">
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Tu Preparación para Nivel 1 (Imprescindibles)
                    </span>
                    <span className="text-white font-extrabold">
                      {doomsdayWatchedCount} / {doomsdayTier1.length} completadas ({doomsdayPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-500 rounded-full"
                      style={{ width: `${doomsdayPercent}%` }}
                    />
                  </div>
                </div>

                <div className="bg-black/60 border border-rose-500/30 rounded-2xl p-4 sm:p-5 backdrop-blur-md max-w-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Skull className="w-5 h-5 text-rose-400" />
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                          Estreno de Avengers: Doomsday
                        </span>
                        <span className="text-lg font-black text-white">
                          {DOOMSDAY_RELEASE_DATE.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                    {doomsdayCountdown.over ? (
                      <span className="text-sm font-black text-emerald-400 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/40">
                        ¡Ya en cines!
                      </span>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        {[
                          { v: doomsdayCountdown.d, l: "Días" },
                          { v: doomsdayCountdown.h, l: "Horas" },
                          { v: doomsdayCountdown.m, l: "Min" },
                          { v: doomsdayCountdown.s, l: "Seg" }
                        ].map((b) => (
                          <div key={b.l} className="flex flex-col items-center bg-rose-500/10 border border-rose-500/30 rounded-xl px-2.5 py-1.5 min-w-[52px]">
                            <span className="text-xl sm:text-2xl font-black text-white tabular-nums leading-none">
                              {String(b.v).padStart(2, "0")}
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-rose-300">{b.l}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RUTA MÍNIMA IMPRESCINDIBLE PARA DOOMSDAY */}
            <div className="space-y-5 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-500/30 pb-3">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-lg shadow-rose-500/50 animate-pulse" />
                  <h2 className="text-lg sm:text-2xl font-black text-white uppercase tracking-wide">
                    Ruta Mínima Imprescindible
                  </h2>
                  <span className="text-xs bg-rose-500/20 text-rose-300 border border-rose-500/40 px-3 py-1 rounded-full font-bold">
                    {DOOMSDAY_ESSENTIAL_IDS.length} Paradas Clave
                  </span>
                </div>
                <div className="bg-black/50 border border-rose-500/30 rounded-xl px-4 py-2 backdrop-blur-md sm:min-w-[220px]">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-300">
                      {essentialWatchedCount} / {DOOMSDAY_ESSENTIAL_IDS.length} vistas (
                      <span className="text-emerald-400">{Math.round((essentialWatchedCount / DOOMSDAY_ESSENTIAL_IDS.length) * 100)}%</span>)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-rose-400 transition-all duration-500 rounded-full"
                      style={{ width: `${Math.round((essentialWatchedCount / DOOMSDAY_ESSENTIAL_IDS.length) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                {essentialRouteRows.map((chunk, cIdx) => (
                  <div key={cIdx} className="w-full">
                    <div className="flex flex-wrap items-stretch justify-center gap-2">
                      {chunk.map((id, k) => {
                        const item = MARVEL_DATABASE.find((d) => d.id === id);
                        if (!item) return null;
                        const isWatched = watchedList.includes(item.id);
                        const esTenemos = showStars && isOwned(item.id);
                        const globalN = cIdx * 5 + k + 1;
                        const arrow = k > 0 ? (
                          <div key={`arr-${id}`} className="flex items-center justify-center px-0.5">
                            <span className="text-rose-400 font-black text-2xl leading-none select-none">→</span>
                          </div>
                        ) : null;
                        const card = (
                          <div
                            key={id}
                            onClick={() => setSelectedItem(item)}
                            className={`flex-1 min-w-[105px] max-w-[240px] p-3 rounded-2xl border bg-slate-900/60 transition-all flex flex-col cursor-pointer group ${
                              isWatched
                                ? "border-emerald-500/40"
                                : "border-white/10 hover:border-rose-500/70 hover:ring-1 hover:ring-rose-500/40"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`flex-none w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black border ${
                                isWatched
                                  ? "bg-emerald-600 border-emerald-400 text-white"
                                  : "bg-slate-950 border-rose-500/40 text-rose-300"
                              }`}>
                                {globalN}
                              </span>
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleWatched(item.id); }}
                                className={`p-1.5 rounded-lg transition-all ${
                                  isWatched ? "text-emerald-400" : "text-slate-400 hover:text-white"
                                }`}
                                title={isWatched ? "Marcar como no vista" : "Marcar como vista"}
                              >
                                {isWatched ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                              </button>
                            </div>
                            <div className="flex flex-col items-center text-center mt-3 flex-1">
                              <div className="relative">
                                {item.poster && (
                                  <img
                                    src={item.poster}
                                    alt={item.title}
                                    loading="lazy"
                                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                                    className="w-20 h-28 rounded-lg object-cover object-top shadow-lg shadow-black/40 border border-white/10"
                                  />
                                )}
                                {esTenemos && (
                                  <Star className="absolute -bottom-1.5 -left-1.5 w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-md" title="La tienes" />
                                )}
                              </div>
                              <h3 className="mt-2.5 font-bold text-xs sm:text-sm text-white group-hover:text-rose-300 transition-colors line-clamp-2 leading-snug">
                                {item.title}
                              </h3>
                              <span className="mt-1 text-[10px] text-slate-400">{item.timelineYear} • {item.duration}</span>
                              <span className="mt-1.5 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-rose-300/60 group-hover:text-rose-300 transition-colors">
                                <Info className="w-3 h-3" />
                                Por qué importa
                              </span>
                            </div>
                          </div>
                        );
                        return [arrow, card];
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-400 bg-white/5 border border-white/10 rounded-xl p-3">
                Esta es la ruta elegida por ti para llegar a <strong className="text-white">Avengers: Doomsday</strong> en el orden de visión que indicaste. El resto de niveles (Nivel 1, Nivel 2 y el catálogo completo) se mantienen: también cuentan para tu preparación y como referencia.
              </p>
            </div>

            {/* NIVEL 1 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
                  <h2 className="text-lg sm:text-2xl font-black text-white uppercase tracking-wide">
                    Nivel 1: Imprescindibles Absolutas (Núcleo Argumental)
                  </h2>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full font-bold">
                  {doomsdayTier1.length} Títulos Obligatorios
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doomsdayTier1.map((item) => {
                  const isWatched = watchedList.includes(item.id);
                  return (
                    <div 
                      key={item.id}
                      className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                        isWatched 
                          ? "bg-slate-900/90 border-emerald-500/40" 
                          : "bg-slate-900/60 border-white/10 hover:border-emerald-500/50"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {item.universe}
                          </span>
                          <span className="text-slate-400 font-semibold">{item.timelineYear}</span>
                        </div>

                        <div>
                          <div className="flex items-start gap-3">
                            {item.poster && (
                              <img
                                src={item.poster}
                                alt={item.title}
                                loading="lazy"
                                onError={(e) => { e.currentTarget.style.display = "none"; }}
                                className="w-11 h-16 rounded-lg object-cover object-top shrink-0 shadow-lg shadow-black/40 border border-white/10"
                              />
                            )}
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                {showStars && isOwned(item.id) && (
                                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" title="La tienes" />
                                )}
                                <h3 
                                  onClick={() => setSelectedItem(item)}
                                  className="font-bold text-base sm:text-lg text-white hover:text-emerald-400 cursor-pointer transition-colors line-clamp-2"
                                >
                                  {item.title}
                                </h3>
                              </div>
                              <p className="text-xs text-slate-400 italic">{item.releaseYear} • {item.duration}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-black/40 p-3 rounded-xl border border-emerald-500/20 text-xs text-slate-200">
                          <strong className="text-emerald-400 block mb-1">¿Por qué es obligatoria para Doomsday?</strong>
                          {item.multiverseConnections}
                        </div>
                      </div>

                      <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-semibold"
                        >
                          <Info className="w-3.5 h-3.5" />
                          Ver Ficha
                        </button>

                        <button
                          onClick={() => toggleWatched(item.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                            isWatched
                              ? "bg-emerald-600 text-white"
                              : "bg-white/10 text-slate-300 hover:bg-emerald-600/30 hover:text-white"
                          }`}
                        >
                          {isWatched ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                          {isWatched ? "Completada" : "Marcar Vista"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* NIVEL 2 */}
            <div className="space-y-4 pt-6">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50" />
                  <h2 className="text-lg sm:text-2xl font-black text-white uppercase tracking-wide">
                    Nivel 2: Contexto Clave de Personajes y Regresos
                  </h2>
                </div>
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full font-bold">
                  {doomsdayTier2.length} Títulos de Apoyo
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {doomsdayTier2.map((item) => {
                  const isWatched = watchedList.includes(item.id);
                  return (
                    <div 
                      key={item.id}
                      className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>{item.universe}</span>
                          <span>{item.releaseYear}</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          {item.poster && (
                            <img
                              src={item.poster}
                              alt={item.title}
                              loading="lazy"
                              onError={(e) => { e.currentTarget.style.display = "none"; }}
                              className="w-10 h-14 rounded-lg object-cover object-top shrink-0 shadow-lg shadow-black/40 border border-white/10"
                            />
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              {showStars && isOwned(item.id) && (
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" title="La tienes" />
                              )}
                              <h4 
                                onClick={() => setSelectedItem(item)}
                                className="font-bold text-sm text-white hover:text-amber-400 cursor-pointer line-clamp-2"
                              >
                                {item.title}
                              </h4>
                            </div>
                            <p className="text-xs text-slate-300 line-clamp-2">
                              {item.synopsis}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 mt-2 border-t border-white/5 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="text-[11px] text-slate-400 hover:text-white"
                        >
                          Detalles
                        </button>
                        <button
                          onClick={() => toggleWatched(item.id)}
                          className={`p-1.5 rounded-lg text-xs font-semibold ${
                            isWatched ? "text-emerald-400 bg-emerald-500/10" : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {isWatched ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VISTA 3: CRONOLOGÍA COMPLETA                                              */}
        {/* ========================================================================= */}
        {activeTab === "timeline" && (
          <div className="space-y-12">
            
            <section className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
                <div className="relative md:col-span-6">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar película, serie, personaje..."
                    className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 md:col-span-3">
                  <button
                    onClick={() => setSelectedType("all")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${selectedType === "all" ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"}`}
                  >
                    Todo
                  </button>
                  <button
                    onClick={() => setSelectedType("movie")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${selectedType === "movie" ? "bg-red-600 text-white" : "text-slate-400 hover:text-white"}`}
                  >
                    Películas
                  </button>
                  <button
                    onClick={() => setSelectedType("series")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${selectedType === "series" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"}`}
                  >
                    Series
                  </button>
                </div>

                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 md:col-span-3">
                  <button
                    onClick={() => setSortOrder("chrono")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 ${sortOrder === "chrono" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-white"}`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    Cronológico
                  </button>
                  <button
                    onClick={() => setSortOrder("release")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 ${sortOrder === "release" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Por Estreno
                  </button>
                </div>
              </div>

              {adminAuthed && (
              <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/10 mt-3">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-300">
                  Tienes <span className="text-amber-400 font-extrabold">{getOwnedList().length}</span> de {MARVEL_DATABASE.length} títulos en tu colección — marcados con <span className="text-amber-400 font-extrabold">estrella amarilla ★</span>
                </span>
              </div>
            )}
            </section>

            {Object.entries(groupedByEra).map(([eraTitle, items]) => (
              <section key={eraTitle} className="relative">
                <div className="sticky top-16 z-30 bg-[#06080d]/95 backdrop-blur-md py-3 mb-6 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-600 shadow-md shadow-red-600/50" />
                    <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider">
                      {eraTitle}
                    </h2>
                  </div>
                  <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full text-slate-300 font-semibold">
                    {items.length} {items.length === 1 ? 'título' : 'títulos'}
                  </span>
                </div>

                <div className="relative border-l-2 border-red-600/20 ml-4 sm:ml-6 pl-4 sm:pl-8 space-y-6">
                  {items.map((item) => {
                    const isWatched = watchedList.includes(item.id);

                    return (
                      <div
                        key={item.id}
                        className={`group relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                          isWatched 
                            ? "bg-slate-900/60 border-emerald-500/30" 
                            : "bg-slate-900/80 border-white/10 hover:border-red-500/50"
                        }`}
                      >
                        <div className={`absolute -left-[25px] sm:-left-[41px] top-6 w-4 h-4 rounded-full border-2 transition-all ${
                          isWatched 
                            ? "bg-emerald-500 border-emerald-300 shadow-md shadow-emerald-500/50" 
                            : "bg-[#06080d] border-red-600 group-hover:scale-125 group-hover:bg-red-600"
                        }`} />

                        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                              <span className="font-extrabold px-2 py-0.5 rounded bg-white/10 text-white">
                                #{sortOrder === "chrono" ? item.chronoOrder : item.releaseYear}
                              </span>
                              <span className="px-2 py-0.5 rounded-md font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                                {item.universe}
                              </span>
                              <span className="flex items-center gap-1 font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                                <Clock className="w-3 h-3" />
                                {item.timelineYear}
                              </span>
                            </div>

                            <div className="flex items-start gap-3">
                              {item.poster && (
                                <img
                                  src={item.poster}
                                  alt={item.title}
                                  loading="lazy"
                                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                                  className="w-12 h-[72px] rounded-lg object-cover object-top shrink-0 shadow-lg shadow-black/40 border border-white/10"
                                />
                              )}
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  {showStars && isOwned(item.id) && (
                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" title="La tienes" />
                                  )}
                                  <h3 
                                    onClick={() => setSelectedItem(item)}
                                    className="text-base sm:text-xl font-bold text-white hover:text-red-400 cursor-pointer transition-colors line-clamp-2"
                                  >
                                    {item.title}
                                  </h3>
                                </div>
                                <p className="text-xs text-slate-400 italic">{item.originalTitle} ({item.releaseYear})</p>
                              </div>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                              {item.synopsis}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 w-full lg:w-auto justify-end border-t lg:border-t-0 border-white/10 pt-3 lg:pt-0">
                            <button
                              onClick={() => setSelectedItem(item)}
                              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                            >
                              Ficha
                            </button>

                            <button
                              onClick={() => toggleWatched(item.id)}
                              className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                                isWatched
                                  ? "bg-emerald-600 text-white border-emerald-500"
                                  : "bg-white/5 text-slate-300 hover:text-white border-white/10"
                              }`}
                            >
                              {isWatched ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                              {isWatched ? "Visto" : "Marcar"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VISTA 4: CATÁLOGO EN CARDS                                                */}
        {/* ========================================================================= */}
        {activeTab === "catalog" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar película, serie, personaje..."
                  className="w-full pl-10 pr-10 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 w-full sm:w-auto">
                <button
                  onClick={() => setOnlyUnwatched(!onlyUnwatched)}
                  className={`flex-1 px-3 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 ${onlyUnwatched ? "bg-red-600 text-white" : "text-slate-400 hover:text-white"}`}
                  title="Mostrar solo las que te faltan por ver"
                >
                  <Circle className="w-3.5 h-3.5" />
                  No vistas
                </button>
                {showStars && (
                <button
                  onClick={() => setOnlyOwned(!onlyOwned)}
                  className={`flex-1 px-3 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 ${onlyOwned ? "bg-amber-500 text-black" : "text-slate-400 hover:text-white"}`}
                  title="Mostrar solo los títulos que tienes"
                >
                  <Star className="w-3.5 h-3.5" />
                  Mis títulos
                </button>
                )}
                <button
                  onClick={() => setSortOrder("chrono")}
                  className={`flex-1 px-3 py-2 text-xs font-semibold rounded-lg ${sortOrder === "chrono" ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"}`}
                >
                  Cronología
                </button>
                <button
                  onClick={() => setSortOrder("release")}
                  className={`flex-1 px-3 py-2 text-xs font-semibold rounded-lg ${sortOrder === "release" ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"}`}
                >
                  Estreno
                </button>
              </div>
            </div>

            {searchQuery && (
              <p className="text-xs text-slate-400">
                {(onlyUnwatched || onlyOwned ? catalogItems.length : filteredData.length)} resultado{(onlyUnwatched || onlyOwned ? catalogItems : filteredData).length === 1 ? "" : "s"} para «{searchQuery}»
              </p>
            )}
            {onlyUnwatched && !searchQuery && (
              <p className="text-xs text-slate-400">
                Mostrando {catalogItems.length} títulos sin ver — {MARVEL_DATABASE.length - catalogItems.length} ya vistas
              </p>
            )}
            {onlyOwned && !onlyUnwatched && !searchQuery && (
              <p className="text-xs text-slate-400">
                Mostrando solo los {catalogItems.length} títulos que tienes en tu colección
              </p>
            )}
            {adminAuthed && (
            <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/10">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
              <span className="text-xs font-semibold text-slate-300">
                Tus títulos van marcados con <span className="text-amber-400 font-extrabold">estrella amarilla ★</span>
              </span>
            </div>
          )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {catalogItems.map((item) => {
              const isWatched = watchedList.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                    isWatched
                      ? "bg-slate-900/90 border-emerald-500/40"
                      : "bg-slate-900/80 border-white/10 hover:border-red-500/50"
                  }`}
                >
                  <div className={`h-48 bg-gradient-to-br ${item.posterGradient} p-3.5 flex flex-col justify-between relative overflow-hidden`}>
                    {item.poster && (
                      <img
                        src={item.poster}
                        alt={item.title}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                    )}
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[10px] font-extrabold bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-white border border-white/10">
                        #{item.chronoOrder}
                      </span>
                      <span className="text-[10px] font-bold bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-amber-300 border border-white/10">
                        {item.timelineYear}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-white/90 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm z-10">
                      {item.coverTag}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent" />
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>{item.universe}</span>
                        <span>{item.releaseYear}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        {item.poster && (
                          <img
                            src={item.poster}
                            alt={item.title}
                            loading="lazy"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                            className="w-11 h-16 rounded-lg object-cover object-top shrink-0 shadow-lg shadow-black/40 border border-white/10"
                          />
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            {showStars && isOwned(item.id) && (
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" title="La tienes" />
                            )}
                            <h3 
                              onClick={() => setSelectedItem(item)}
                              className="text-base font-bold text-white group-hover:text-red-400 transition-colors cursor-pointer line-clamp-1 leading-snug"
                            >
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {item.synopsis}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-black/40 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1"
                    >
                      <Info className="w-3.5 h-3.5" />
                      Ficha
                    </button>

                    <div className="flex items-center gap-1.5">
                      {adminAuthed && (
                        <button
                          onClick={() => toggleOwned(item.id)}
                          title="¿Está en tu servidor?"
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${isOwned(item.id) ? "bg-amber-500/30 text-amber-300 border border-amber-500/40" : "bg-white/10 text-slate-300 hover:text-white"}`}
                        >
                          <Server className="w-3.5 h-3.5" />
                          {isOwned(item.id) ? "Servidor" : "Añadir"}
                        </button>
                      )}

                      <button
                        onClick={() => toggleWatched(item.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold ${isWatched ? "bg-emerald-600 text-white" : "bg-white/10 text-slate-300"}`}
                      >
                        {isWatched ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                        {isWatched ? "Vista" : "Marcar"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VISTA 5: RASTREADOR DE PROGRESO                                           */}
        {/* ========================================================================= */}
        {activeTab === "tracker" && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
              <h2 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-400" />
                Panel de Seguimiento Global
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{watchedList.length}</span>
                  <p className="text-xs text-slate-400 mt-1">Vistos</p>
                </div>
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">{watchlist.length}</span>
                  <p className="text-xs text-slate-400 mt-1">Pendientes</p>
                </div>
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-sky-400">{MARVEL_DATABASE.length - watchedList.length}</span>
                  <p className="text-xs text-slate-400 mt-1">Por Ver</p>
                </div>
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-purple-400">{progressPercent}%</span>
                  <p className="text-xs text-slate-400 mt-1">Total</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                <p className="text-xs text-slate-400">Progreso guardado automáticamente.</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setWatchedList(MARVEL_DATABASE.map(m => m.id))}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 text-xs font-semibold"
                  >
                    Marcar Todo Visto
                  </button>
                  <button
                    onClick={() => { setWatchedList([]); setWatchlist([]); }}
                    className="px-3 py-1.5 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600/30 text-xs font-semibold"
                  >
                    Reiniciar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL DETALLE DEL EVENTO (telar: panel lateral derecho al hacer clic en un nodo) */}
      {treeDetailOpen && selectedTimelineNode && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 lg:hidden"
            onClick={() => setTreeDetailOpen(false)}
          />
          <div className="fixed z-50 right-0 top-0 h-full w-full max-w-[400px] bg-[#0e1017] border-l border-white/15 shadow-2xl overflow-y-auto p-5 sm:p-6 animate-in slide-in-from-right duration-300">
            <button
              onClick={() => setTreeDetailOpen(false)}
              className="absolute right-4 top-4 bg-white/5 hover:bg-white/15 p-1.5 rounded-full text-slate-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between border-b border-white/10 pb-3 pr-8">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-purple-300 font-bold uppercase">
                  Detalle del Evento
                </span>
              </div>
              <span className="text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded font-semibold">
                {selectedTimelineNode.year}
              </span>
            </div>

            <div className="space-y-1 pt-3">
              <div className="flex items-center gap-2 text-xs">
                <span
                  className="px-2 py-0.5 rounded font-bold text-white text-[10px]"
                  style={{ backgroundColor: LANE_CONFIG[selectedTimelineNode.lane]?.color }}
                >
                  {selectedTimelineNode.lineName}
                </span>
              </div>
              <div className="flex items-start gap-3 pt-2">
                {activeDatabaseItem?.poster && (
                  <img
                    src={activeDatabaseItem.poster}
                    alt={selectedTimelineNode.label}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                    className="w-16 h-24 rounded-xl object-cover object-top shrink-0 shadow-lg shadow-black/40 border border-white/10"
                  />
                )}
                <div className="flex items-start gap-2 min-w-0 pt-1">
                  {showStars && activeDatabaseItem && isOwned(activeDatabaseItem.id) && (
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0 mt-0.5" title="La tienes" />
                  )}
                  <div className="min-w-0">
                    <h3 className="text-lg font-black text-white leading-snug">
                      {selectedTimelineNode.label}
                    </h3>
                    <p className="text-xs text-slate-300 italic mt-0.5">
                      {selectedTimelineNode.tag}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {activeDatabaseItem && (
              <div className="space-y-3 pt-4">
                <div className="bg-white/5 rounded-2xl p-3 border border-white/5 space-y-1 text-xs">
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">
                    Impacto en la Cronología:
                  </span>
                  <p className="text-slate-200 leading-relaxed">
                    {activeDatabaseItem.chronoReason}
                  </p>
                </div>

                <div className="bg-purple-950/40 rounded-2xl p-3.5 border border-purple-500/30 space-y-1 text-xs">
                  <span className="text-purple-300 font-black uppercase text-[10px] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    Conexión Doomsday / Secret Wars:
                  </span>
                  <p className="text-slate-200 leading-relaxed">
                    {activeDatabaseItem.multiverseConnections}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setSelectedItem(activeDatabaseItem)}
                    className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-purple-900/30"
                  >
                    <Info className="w-3.5 h-3.5" />
                    Ver Ficha Completa
                  </button>

                  <button
                    onClick={() => toggleWatched(activeDatabaseItem.id)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      watchedList.includes(activeDatabaseItem.id)
                        ? "bg-emerald-600 text-white border-emerald-500"
                        : "bg-white/10 text-slate-300 hover:text-white border-white/10"
                    }`}
                    title="Marcar como vista"
                  >
                    {watchedList.includes(activeDatabaseItem.id) ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>
        </>
      )}

      {/* MODAL PANEL ADMIN (5 clics en el logo MARVEL) */}
      {adminPanelOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0e1017] border border-white/15 rounded-3xl max-w-sm w-full shadow-2xl relative p-6">
            <button
              onClick={() => { setAdminPanelOpen(false); setAdminError(""); }}
              className="absolute right-4 top-4 bg-white/5 hover:bg-white/10 p-1.5 rounded-full text-slate-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </span>
              <div>
                <h3 className="font-black text-white">Acceso Administrador</h3>
                <p className="text-[10px] text-slate-400">Ver y gestionar lo que hay en el servidor</p>
              </div>
            </div>

            {adminAuthed ? (
              <div className="space-y-4">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Sesión admin activa. Las estrellas amarillas y la lista del servidor son visibles.
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-xs text-slate-300">
                  Para marcar/quitar un título del servidor: ábrelo (pincha en su tarjeta) y usa el botón <strong className="text-amber-400">En el servidor</strong>. Los visitantes sin esta sesión no verán ninguna estrella.
                </div>
                <button
                  onClick={handleAdminLogout}
                  className="w-full px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Cerrar sesión admin
                </button>
              </div>
            ) : (
              <form onSubmit={handleAdminLogin} className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Usuario</label>
                  <input
                    type="text"
                    value={adminUser}
                    onChange={(e) => setAdminUser(e.target.value)}
                    autoComplete="username"
                    className="mt-1 w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white outline-none focus:border-indigo-500/60"
                    placeholder="usuario"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contraseña</label>
                  <input
                    type="password"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    autoComplete="current-password"
                    className="mt-1 w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white outline-none focus:border-indigo-500/60"
                    placeholder="••••••••"
                  />
                </div>
                {adminError && (
                  <p className="text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-xl">
                    {adminError}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 transition-all shadow-lg shadow-indigo-900/40"
                >
                  Entrar
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL DETALLE DE PELÍCULA / SERIE */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0e1017] border border-white/15 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            <div className={`h-48 bg-gradient-to-br ${selectedItem.posterGradient} p-6 flex flex-col justify-between relative overflow-hidden`}>
              {selectedItem.poster && (
                <img
                  src={selectedItem.poster}
                  alt={selectedItem.title}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              )}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 bg-black/60 hover:bg-black p-2 rounded-full text-white backdrop-blur-md transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 z-10">
                <span className="text-xs font-black bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white border border-white/10">
                  Orden #{selectedItem.chronoOrder}
                </span>
                <span className="text-xs font-bold bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-amber-300 border border-white/10">
                  {selectedItem.timelineYear}
                </span>
                {DOOMSDAY_ESSENTIAL_IDS.indexOf(selectedItem.id) !== -1 && (
                  <span className="text-xs font-bold bg-rose-600/70 backdrop-blur-md px-3 py-1 rounded-full text-white border border-rose-400/40">
                    Parada {DOOMSDAY_ESSENTIAL_IDS.indexOf(selectedItem.id) + 1} de {DOOMSDAY_ESSENTIAL_IDS.length} • Ruta Mínima
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 z-10">
                {showStars && isOwned(selectedItem.id) && (
                  <Star className="w-6 h-6 text-amber-400 fill-amber-400 drop-shadow-md shrink-0" title="La tienes" />
                )}
                <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow-md">
                  {selectedItem.title}
                </h2>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent" />
            </div>

            <div className="p-6 space-y-5">
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                  <strong>Original:</strong> {selectedItem.originalTitle}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                  <strong>Estreno:</strong> {selectedItem.releaseYear}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-red-600/20 border border-red-500/30 text-red-300 font-semibold">
                  {selectedItem.universe}
                </span>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sinopsis</h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-white/5 p-3.5 rounded-2xl border border-white/5">
                  {selectedItem.synopsis}
                </p>
              </div>

              <div className="space-y-1.5 bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  ¿Por qué va en esta posición cronológica?
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedItem.chronoReason}
                </p>
              </div>

              <div className="space-y-1.5 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Skull className="w-4 h-4" />
                  Conexión Directa con Avengers: Doomsday y Secret Wars
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedItem.multiverseConnections}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Personajes Clave</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.characters.map((char, index) => (
                    <span key={index} className="text-xs bg-white/10 px-3 py-1 rounded-xl text-slate-200 font-medium border border-white/5">
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => toggleWatchlist(selectedItem.id)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                    watchlist.includes(selectedItem.id)
                      ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                      : "bg-white/5 text-slate-300 hover:text-white border-white/10"
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  {watchlist.includes(selectedItem.id) ? "En Pendientes" : "Guardar"}
                </button>

                <button
                  onClick={() => toggleWatched(selectedItem.id)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    watchedList.includes(selectedItem.id)
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-red-600 hover:bg-red-700 text-white shadow-lg"
                  }`}
                >
                  {watchedList.includes(selectedItem.id) ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Marcada Vista
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4" />
                      Marcar Vista
                    </>
                  )}
                </button>

                {adminAuthed && (
                  <button
                    onClick={() => toggleOwned(selectedItem.id)}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                      isOwned(selectedItem.id)
                        ? "bg-amber-500/20 text-amber-400 border-amber-500/50"
                        : "bg-white/5 text-slate-300 hover:text-white border-white/10"
                    }`}
                    title="Gestiona si este título está en tu servidor (estrella amarilla)"
                  >
                    <Server className="w-4 h-4" />
                    {isOwned(selectedItem.id) ? "Quitar del servidor" : "En el servidor"}
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}