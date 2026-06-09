export type GayPerson = {
  id: string;
  name: string;
  src: string;
  isGay: boolean; // a publiquement fait son coming out (LGB)
};

export const gayPeople: GayPerson[] = [
  // ── Personnes ouvertement LGB (coming out public) ──
  { id: 'elliot-page',         name: 'Elliot Page',         isGay: true,  src: '/images/paggaie/elliot-page.jpg' },
  { id: 'neil-patrick-harris', name: 'Neil Patrick Harris', isGay: true,  src: '/images/paggaie/neil-patrick-harris.jpg' },
  { id: 'ricky-martin',        name: 'Ricky Martin',        isGay: true,  src: '/images/paggaie/ricky-martin.jpg' },
  { id: 'tim-cook',            name: 'Tim Cook',            isGay: true,  src: '/images/paggaie/tim-cook.jpg' },
  { id: 'megan-rapinoe',       name: 'Megan Rapinoe',       isGay: true,  src: '/images/paggaie/megan-rapinoe.jpg' },
  { id: 'tom-daley',           name: 'Tom Daley',           isGay: true,  src: '/images/paggaie/tom-daley.jpg' },
  { id: 'sam-smith',           name: 'Sam Smith',           isGay: true,  src: '/images/paggaie/sam-smith.jpg' },
  { id: 'cynthia-nixon',       name: 'Cynthia Nixon',       isGay: true,  src: '/images/paggaie/cynthia-nixon.jpg' },
  { id: 'anderson-cooper',     name: 'Anderson Cooper',     isGay: true,  src: '/images/paggaie/anderson-cooper.jpg' },
  { id: 'wanda-sykes',         name: 'Wanda Sykes',         isGay: true,  src: '/images/paggaie/wanda-sykes.jpg' },
  { id: 'stephen-fry',         name: 'Stephen Fry',         isGay: true,  src: '/images/paggaie/stephen-fry.jpg' },
  { id: 'ian-mckellen',        name: 'Ian McKellen',        isGay: true,  src: '/images/paggaie/ian-mckellen.jpg' },
  { id: 'jodie-foster',        name: 'Jodie Foster',        isGay: true,  src: '/images/paggaie/jodie-foster.jpg' },
  { id: 'lily-tomlin',         name: 'Lily Tomlin',         isGay: true,  src: '/images/paggaie/lily-tomlin.jpg' },
  { id: 'adam-lambert',        name: 'Adam Lambert',        isGay: true,  src: '/images/paggaie/adam-lambert.jpg' },
  { id: 'janelle-monae',       name: 'Janelle Monáe',       isGay: true,  src: '/images/paggaie/janelle-monae.jpg' },
  { id: 'kristen-stewart',     name: 'Kristen Stewart',     isGay: true,  src: '/images/paggaie/kristen-stewart.jpg' },
  { id: 'robbie-rogers',       name: 'Robbie Rogers',       isGay: true,  src: '/images/paggaie/robbie-rogers.jpg' },
  { id: 'gus-kenworthy',       name: 'Gus Kenworthy',       isGay: true,  src: '/images/paggaie/gus-kenworthy.png' },
  { id: 'pete-buttigieg',      name: 'Pete Buttigieg',      isGay: true,  src: '/images/paggaie/pete-buttigieg.jpg' },
  { id: 'holland-taylor',      name: 'Holland Taylor',      isGay: true,  src: '/images/paggaie/holland-taylor.jpg' },
  { id: 'wentworth-miller',    name: 'Wentworth Miller',    isGay: true,  src: '/images/paggaie/wentworth-miller.jpg' },
  { id: 'jim-parsons',         name: 'Jim Parsons',         isGay: true,  src: '/images/paggaie/jim-parsons.jpg' },
  { id: 'frank-ocean',         name: 'Frank Ocean',         isGay: true,  src: '/images/paggaie/frank-ocean.jpg' },
  { id: 'hannah-gadsby',       name: 'Hannah Gadsby',       isGay: true,  src: '/images/paggaie/hannah-gadsby.jpg' },

  // ── Personnes hétérosexuelles (publiquement) ──
  { id: 'david-beckham',       name: 'David Beckham',       isGay: false, src: '/images/paggaie/david-beckham.jpg' },
  { id: 'george-clooney',      name: 'George Clooney',      isGay: false, src: '/images/paggaie/george-clooney.jpg' },
  { id: 'beyonce',             name: 'Beyoncé',             isGay: false, src: '/images/paggaie/beyonce.jpg' },
  { id: 'hugh-jackman',        name: 'Hugh Jackman',        isGay: false, src: '/images/paggaie/hugh-jackman.jpg' },
  { id: 'serena-williams',     name: 'Serena Williams',     isGay: false, src: '/images/paggaie/serena-williams.jpg' },
  { id: 'chris-hemsworth',     name: 'Chris Hemsworth',     isGay: false, src: '/images/paggaie/chris-hemsworth.jpg' },
  { id: 'adele',               name: 'Adele',               isGay: false, src: '/images/paggaie/adele.jpg' },
  { id: 'lionel-messi',        name: 'Lionel Messi',        isGay: false, src: '/images/paggaie/lionel-messi.jpg' },
  { id: 'blake-lively',        name: 'Blake Lively',        isGay: false, src: '/images/paggaie/blake-lively.jpg' },
  { id: 'ryan-reynolds',       name: 'Ryan Reynolds',       isGay: false, src: '/images/paggaie/ryan-reynolds.jpg' },
  { id: 'shakira',             name: 'Shakira',             isGay: false, src: '/images/paggaie/shakira.jpg' },
  { id: 'penelope-cruz',       name: 'Penélope Cruz',       isGay: false, src: '/images/paggaie/penelope-cruz.jpg' },
  { id: 'idris-elba',          name: 'Idris Elba',          isGay: false, src: '/images/paggaie/idris-elba.jpg' },
  { id: 'roger-federer',       name: 'Roger Federer',       isGay: false, src: '/images/paggaie/roger-federer.jpg' },
  { id: 'john-legend',         name: 'John Legend',         isGay: false, src: '/images/paggaie/john-legend.jpg' },
  { id: 'emma-stone',          name: 'Emma Stone',          isGay: false, src: '/images/paggaie/emma-stone.jpg' },
  { id: 'pharrell-williams',   name: 'Pharrell Williams',   isGay: false, src: '/images/paggaie/pharrell-williams.jpg' },
  { id: 'chiara-ferragni',     name: 'Chiara Ferragni',     isGay: false, src: '/images/paggaie/chiara-ferragni.jpg' },
  { id: 'burna-boy',           name: 'Burna Boy',           isGay: false, src: '/images/paggaie/burna-boy.jpg' },
  { id: 'lewis-hamilton',      name: 'Lewis Hamilton',      isGay: false, src: '/images/paggaie/lewis-hamilton.jpg' },
  { id: 'marion-cotillard',    name: 'Marion Cotillard',    isGay: false, src: '/images/paggaie/marion-cotillard.jpg' },
  { id: 'son-heung-min',       name: 'Son Heung-min',       isGay: false, src: '/images/paggaie/son-heung-min.jpg' },
  { id: 'mads-mikkelsen',      name: 'Mads Mikkelsen',      isGay: false, src: '/images/paggaie/mads-mikkelsen.jpg' },
  { id: 'deepika-padukone',    name: 'Deepika Padukone',    isGay: false, src: '/images/paggaie/deepika-padukone.png' },
  { id: 'gemma-arterton',      name: 'Gemma Arterton',      isGay: false, src: '/images/paggaie/gemma-arterton.jpg' },
];
