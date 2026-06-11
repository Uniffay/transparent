export type LinkPerson = {
  id: string;
  name: string;
  src: string;
  hasAccount: boolean; // a publiquement lancé/assumé un OnlyFans ou un MYM
};

export const linkPeople: LinkPerson[] = [
  // ── Ont publiquement un OnlyFans / MYM (lancé par elles/eux-mêmes) ──
  { id: 'megan-barton-hanson', name: 'Megan Barton-Hanson', hasAccount: true, src: '/images/linkinbio/megan-barton-hanson.jpg' },
  { id: 'india-reynolds', name: 'India Reynolds', hasAccount: true, src: '/images/linkinbio/india-reynolds.jpg' },
  { id: 'scotty-t', name: 'Scotty T', hasAccount: true, src: '/images/linkinbio/scotty-t.jpg' },
  { id: 'marnie-simpson', name: 'Marnie Simpson', hasAccount: true, src: '/images/linkinbio/marnie-simpson.jpg' },
  { id: 'katie-price', name: 'Katie Price', hasAccount: true, src: '/images/linkinbio/katie-price.jpg' },
  { id: 'kerry-katona', name: 'Kerry Katona', hasAccount: true, src: '/images/linkinbio/kerry-katona.jpg' },
  { id: 'olivia-attwood', name: 'Olivia Attwood', hasAccount: true, src: '/images/linkinbio/olivia-attwood.jpg' },
  { id: 'demi-sims', name: 'Demi Sims', hasAccount: true, src: '/images/linkinbio/demi-sims.png' },
  { id: 'chloe-sims', name: 'Chloe Sims', hasAccount: true, src: '/images/linkinbio/chloe-sims.jpg' },
  { id: 'lottie-moss', name: 'Lottie Moss', hasAccount: true, src: '/images/linkinbio/lottie-moss.jpg' },
  { id: 'carmen-electra', name: 'Carmen Electra', hasAccount: true, src: '/images/linkinbio/carmen-electra.jpg' },
  { id: 'coco-austin', name: 'Coco Austin', hasAccount: true, src: '/images/linkinbio/coco-austin.jpg' },
  { id: 'courtney-stodden', name: 'Courtney Stodden', hasAccount: true, src: '/images/linkinbio/courtney-stodden.jpg' },
  { id: 'amber-rose', name: 'Amber Rose', hasAccount: true, src: '/images/linkinbio/amber-rose.jpg' },
  { id: 'aubrey-oday', name: "Aubrey O'Day", hasAccount: true, src: '/images/linkinbio/aubrey-oday.png' },
  { id: 'shanna-moakler', name: 'Shanna Moakler', hasAccount: true, src: '/images/linkinbio/shanna-moakler.jpg' },
  { id: 'farrah-abraham', name: 'Farrah Abraham', hasAccount: true, src: '/images/linkinbio/farrah-abraham.jpg' },
  { id: 'mandy-rose', name: 'Mandy Rose', hasAccount: true, src: '/images/linkinbio/mandy-rose.jpg' },
  { id: 'bart-swings', name: 'Bart Swings', hasAccount: true, src: '/images/linkinbio/bart-swings.jpg' },
  { id: 'robeisy-ramirez', name: 'Robeisy Ramírez', hasAccount: true, src: '/images/linkinbio/robeisy-ramirez.jpg' },
  { id: 'daniel-goodfellow', name: 'Daniel Goodfellow', hasAccount: true, src: '/images/linkinbio/daniel-goodfellow.jpg' },
  { id: 'noah-williams', name: 'Noah Williams', hasAccount: true, src: '/images/linkinbio/noah-williams.jpg' },
  { id: 'matthew-dixon', name: 'Matthew Dixon', hasAccount: true, src: '/images/linkinbio/matthew-dixon.jpg' },

  // ── N'en ont pas ──
  { id: 'femke-bol', name: 'Femke Bol', hasAccount: false, src: '/images/linkinbio/femke-bol.jpg' },
  { id: 'karsten-warholm', name: 'Karsten Warholm', hasAccount: false, src: '/images/linkinbio/karsten-warholm.jpg' },
  { id: 'leon-marchand', name: 'Léon Marchand', hasAccount: false, src: '/images/linkinbio/leon-marchand.jpg' },
  { id: 'keely-hodgkinson', name: 'Keely Hodgkinson', hasAccount: false, src: '/images/linkinbio/keely-hodgkinson.jpg' },
  { id: 'holger-rune', name: 'Holger Rune', hasAccount: false, src: '/images/linkinbio/holger-rune.jpg' },
  { id: 'gabby-thomas', name: 'Gabby Thomas', hasAccount: false, src: '/images/linkinbio/gabby-thomas.jpg' },
  { id: 'aitana', name: 'Aitana', hasAccount: false, src: '/images/linkinbio/aitana.jpg' },
  { id: 'tini', name: 'Tini', hasAccount: false, src: '/images/linkinbio/tini.png' },
  { id: 'griff', name: 'Griff', hasAccount: false, src: '/images/linkinbio/griff.jpg' },
  { id: 'mahmood', name: 'Mahmood', hasAccount: false, src: '/images/linkinbio/mahmood.png' },
  { id: 'adut-akech', name: 'Adut Akech', hasAccount: false, src: '/images/linkinbio/adut-akech.jpg' },
  { id: 'winnie-harlow', name: 'Winnie Harlow', hasAccount: false, src: '/images/linkinbio/winnie-harlow.jpg' },

  { id: 'barbara-palvin', name: 'Barbara Palvin', hasAccount: false, src: '/images/linkinbio/barbara-palvin.jpg' },
  { id: 'jon-kortajarena', name: 'Jon Kortajarena', hasAccount: false, src: '/images/linkinbio/jon-kortajarena.jpg' },
  { id: 'david-gandy', name: 'David Gandy', hasAccount: false, src: '/images/linkinbio/david-gandy.jpg' },
  { id: 'taylor-hill', name: 'Taylor Hill', hasAccount: false, src: '/images/linkinbio/taylor-hill.jpg' },
  { id: 'lais-ribeiro', name: 'Lais Ribeiro', hasAccount: false, src: '/images/linkinbio/lais-ribeiro.jpg' },
  { id: 'izabel-goulart', name: 'Izabel Goulart', hasAccount: false, src: '/images/linkinbio/izabel-goulart.jpg' },
  { id: 'joan-smalls', name: 'Joan Smalls', hasAccount: false, src: '/images/linkinbio/joan-smalls.jpg' },
  { id: 'lucky-blue-smith', name: 'Lucky Blue Smith', hasAccount: false, src: '/images/linkinbio/lucky-blue-smith.jpg' },
  { id: 'jasmine-tookes', name: 'Jasmine Tookes', hasAccount: false, src: '/images/linkinbio/jasmine-tookes.jpg' },
  { id: 'cindy-bruna', name: 'Cindy Bruna', hasAccount: false, src: '/images/linkinbio/cindy-bruna.jpg' },
  { id: 'francisco-lachowski', name: 'Francisco Lachowski', hasAccount: false, src: '/images/linkinbio/francisco-lachowski.jpg' },
  { id: 'sara-sampaio', name: 'Sara Sampaio', hasAccount: false, src: '/images/linkinbio/sara-sampaio.jpg' },
];
