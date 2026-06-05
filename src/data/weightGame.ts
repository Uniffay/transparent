export type WeightPerson = {
  id: string;
  name: string;
  src: string;
  weight: number; // kg, poids officiel public
  hint: string;   // profession / contexte
};

// Poids issus de sources officielles (infobox Wikipedia, fédérations sportives)
export const weightPeople: WeightPerson[] = [
  { id: 'simone-biles',     name: 'Simone Biles',        src: '/images/weight/simone-biles.jpg',     weight: 47,  hint: 'Gymnaste' },
  { id: 'nicola-adams',     name: 'Nicola Adams',        src: '/images/weight/nicola-adams.jpg',     weight: 51,  hint: 'Boxeuse olympique' },
  { id: 'amanda-nunes',     name: 'Amanda Nunes',        src: '/images/weight/amanda-nunes.jpg',     weight: 61,  hint: 'Championne MMA' },
  { id: 'frankie-edgar',    name: 'Frankie Edgar',       src: '/images/weight/frankie-edgar.jpg',    weight: 62,  hint: 'Combattant MMA' },
  { id: 'ronda-rousey',     name: 'Ronda Rousey',        src: '/images/weight/ronda-rousey.jpg',     weight: 64,  hint: 'Combattante MMA' },
  { id: 'conor-mcgregor',   name: 'Conor McGregor',      src: '/images/weight/conor-mcgregor.jpg',   weight: 70,  hint: 'Combattant MMA' },
  { id: 'khabib',           name: 'Khabib Nurmagomedov', src: '/images/weight/khabib.jpg',           weight: 70,  hint: 'Champion MMA' },
  { id: 'israel-adesanya',  name: 'Israel Adesanya',     src: '/images/weight/israel-adesanya.jpg',  weight: 84,  hint: 'Combattant MMA' },
  { id: 'usain-bolt',       name: 'Usain Bolt',          src: '/images/weight/usain-bolt.jpg',       weight: 94,  hint: 'Sprinter' },
  { id: 'jon-jones',        name: 'Jon Jones',           src: '/images/weight/jon-jones.jpg',        weight: 108, hint: 'Combattant MMA' },
  { id: 'tyson-fury',       name: 'Tyson Fury',          src: '/images/weight/tyson-fury.jpg',       weight: 116, hint: 'Boxeur poids lourd' },
  { id: 'tess-holliday',    name: 'Tess Holliday',       src: '/images/weight/tess-holliday.jpg',    weight: 127, hint: 'Mannequin' },
  { id: 'li-wenwen',        name: 'Li Wenwen',           src: '/images/weight/li-wenwen.png',        weight: 150, hint: 'Haltérophile olympique' },
  { id: 'hakuho',           name: 'Hakuho',              src: '/images/weight/hakuho.jpg',           weight: 155, hint: 'Lutteur de sumo' },
  { id: 'eddie-hall',       name: 'Eddie Hall',          src: '/images/weight/eddie-hall.jpg',       weight: 180, hint: 'Homme le plus fort du monde' },
  { id: 'lasha-talakhadze', name: 'Lasha Talakhadze',    src: '/images/weight/lasha-talakhadze.jpg', weight: 183, hint: 'Haltérophile olympique' },
  { id: 'thor-bjornsson',   name: 'Hafthor Björnsson',   src: '/images/weight/thor-bjornsson.jpg',   weight: 205, hint: 'Homme le plus fort du monde' },
];
