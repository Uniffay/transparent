export type WeightPerson = {
  id: string;
  name: string;
  src: string;
  weight: number; // kg officiel public
  hint: string;
};

export const weightPeople: WeightPerson[] = [
  // ── 40–60 kg ──
  { id: 'faith-kipyegon',    weight: 43,  name: 'Faith Kipyegon',       hint: 'Coureuse de fond',          src: '/images/weight/faith-kipyegon.jpg' },
  { id: 'simone-biles',      weight: 47,  name: 'Simone Biles',          hint: 'Gymnaste',                  src: '/images/weight/simone-biles.jpg' },
  { id: 'nicola-adams',      weight: 51,  name: 'Nicola Adams',          hint: 'Boxeuse olympique',         src: '/images/weight/nicola-adams.jpg' },
  { id: 'eliud-kipchoge',    weight: 52,  name: 'Eliud Kipchoge',        hint: 'Marathonien',               src: '/images/weight/eliud-kipchoge.jpg' },

  // ── 60–80 kg ──
  { id: 'amanda-nunes',      weight: 61,  name: 'Amanda Nunes',          hint: 'Championne MMA',            src: '/images/weight/amanda-nunes.jpg' },
  { id: 'frankie-edgar',     weight: 62,  name: 'Frankie Edgar',         hint: 'Combattant MMA',            src: '/images/weight/frankie-edgar.jpg' },
  { id: 'ronda-rousey',      weight: 64,  name: 'Ronda Rousey',          hint: 'Combattante MMA',           src: '/images/weight/ronda-rousey.jpg' },
  { id: 'conor-mcgregor',    weight: 70,  name: 'Conor McGregor',        hint: 'Combattant MMA',            src: '/images/weight/conor-mcgregor.jpg' },
  { id: 'khabib',            weight: 70,  name: 'Khabib Nurmagomedov',   hint: 'Champion MMA',              src: '/images/weight/khabib.jpg' },
  { id: 'kamaru-usman',      weight: 77,  name: 'Kamaru Usman',          hint: 'Champion MMA',              src: '/images/weight/kamaru-usman.png' },
  { id: 'lydia-valentin',    weight: 78,  name: 'Lydia Valentín',        hint: 'Haltérophile olympique',   src: '/images/weight/lydia-valentin.jpg' },
  { id: 'lu-xiaojun',        weight: 81,  name: 'Lü Xiaojun',            hint: 'Haltérophile olympique',   src: '/images/weight/lu-xiaojun.png' },

  // ── 80–100 kg ──
  { id: 'israel-adesanya',   weight: 84,  name: 'Israel Adesanya',       hint: 'Combattant MMA',            src: '/images/weight/israel-adesanya.jpg' },
  { id: 'tatiana-kashirina', weight: 87,  name: 'Tatiana Kashirina',     hint: 'Haltérophile olympique',   src: '/images/weight/tatiana-kashirina.jpg' },
  { id: 'ilya-ilyin',        weight: 94,  name: 'Ilya Ilyin',            hint: 'Haltérophile olympique',   src: '/images/weight/ilya-ilyin.jpg' },
  { id: 'usain-bolt',        weight: 94,  name: 'Usain Bolt',            hint: 'Sprinter',                  src: '/images/weight/usain-bolt.jpg' },
  { id: 'beth-ditto',        weight: 95,  name: 'Beth Ditto',            hint: 'Chanteuse',                 src: '/images/weight/beth-ditto.jpg' },

  // ── 100–120 kg ──
  { id: 'enho',              weight: 101, name: 'Enhō',                  hint: 'Lutteur de sumo',           src: '/images/weight/enho.jpg' },
  { id: 'jack-black',        weight: 105, name: 'Jack Black',            hint: 'Acteur / Musicien',         src: '/images/weight/jack-black.png' },
  { id: 'jon-jones',         weight: 108, name: 'Jon Jones',             hint: 'Combattant MMA',            src: '/images/weight/jon-jones.jpg' },
  { id: 'rebel-wilson',      weight: 111, name: 'Rebel Wilson',          hint: 'Actrice',                   src: '/images/weight/rebel-wilson.jpg' },
  { id: 'stipe-miocic',      weight: 113, name: 'Stipe Miocic',          hint: 'Combattant MMA',            src: '/images/weight/stipe-miocic.jpg' },
  { id: 'tyson-fury',        weight: 116, name: 'Tyson Fury',            hint: 'Boxeur poids lourd',        src: '/images/weight/tyson-fury.jpg' },
  { id: 'francis-ngannou',   weight: 117, name: 'Francis Ngannou',       hint: 'Combattant MMA',            src: '/images/weight/francis-ngannou.png' },
  { id: 'melissa-mccarthy',  weight: 118, name: 'Melissa McCarthy',      hint: 'Actrice',                   src: '/images/weight/melissa-mccarthy.jpg' },

  // ── 120–150 kg ──
  { id: 'tess-holliday',     weight: 127, name: 'Tess Holliday',         hint: 'Mannequin',                 src: '/images/weight/tess-holliday.jpg' },
  { id: 'kevin-james',       weight: 127, name: 'Kevin James',           hint: 'Acteur / Comédien',         src: '/images/weight/kevin-james.jpg' },
  { id: 'jonah-hill',        weight: 130, name: 'Jonah Hill',            hint: 'Acteur',                    src: '/images/weight/jonah-hill.jpg' },
  { id: 'james-corden',      weight: 133, name: 'James Corden',          hint: 'Animateur TV',              src: '/images/weight/james-corden.jpg' },
  { id: 'monique',           weight: 136, name: "Mo'Nique",              hint: 'Actrice / Comédienne',      src: '/images/weight/monique.jpg' },
  { id: 'wakatakakage',      weight: 138, name: 'Wakatakakage',          hint: 'Lutteur de sumo',           src: '/images/weight/wakatakakage.jpg' },
  { id: 'lizzo',             weight: 140, name: 'Lizzo',                 hint: 'Chanteuse / Rappeuse',      src: '/images/weight/lizzo.png' },
  { id: 'matthias-steiner',  weight: 145, name: 'Matthias Steiner',      hint: 'Haltérophile olympique',   src: '/images/weight/matthias-steiner.jpg' },
  { id: 'li-wenwen',         weight: 150, name: 'Li Wenwen',             hint: 'Haltérophile olympique',   src: '/images/weight/li-wenwen.png' },
  { id: 'hoshoryu',          weight: 150, name: 'Hōshōryū',              hint: 'Lutteur de sumo',           src: '/images/weight/hoshoryu.jpg' },
  { id: 'gabourey-sidibe',   weight: 150, name: 'Gabourey Sidibe',       hint: 'Actrice',                   src: '/images/weight/gabourey-sidibe.jpg' },

  // ── 150–175 kg ──
  { id: 'hakuho',            weight: 155, name: 'Hakuho',                hint: 'Lutteur de sumo',           src: '/images/weight/hakuho.jpg' },
  { id: 'daieisho',          weight: 160, name: 'Daieishō',              hint: 'Lutteur de sumo',           src: '/images/weight/daieisho.jpg' },
  { id: 'onosho',            weight: 165, name: 'Ōnoshō',               hint: 'Lutteur de sumo',           src: '/images/weight/onosho.jpg' },
  { id: 'abi-masatora',      weight: 167, name: 'Abi',                   hint: 'Lutteur de sumo',           src: '/images/weight/abi-masatora.jpg' },
  { id: 'shodai',            weight: 168, name: 'Shōdai',               hint: 'Lutteur de sumo',           src: '/images/weight/shodai.jpg' },
  { id: 'takayasu',          weight: 173, name: 'Takayasu',              hint: 'Lutteur de sumo',           src: '/images/weight/takayasu.jpg' },
  { id: 'mitakeumi',         weight: 175, name: 'Mitakeumi',             hint: 'Lutteur de sumo',           src: '/images/weight/mitakeumi.jpg' },
  { id: 'brian-shaw',        weight: 175, name: 'Brian Shaw',            hint: 'Homme le plus fort',        src: '/images/weight/brian-shaw.jpg' },

  // ── 175–200 kg ──
  { id: 'kisenosato',        weight: 177, name: 'Kisenosato',            hint: 'Lutteur de sumo',           src: '/images/weight/kisenosato.png' },
  { id: 'terunofuji',        weight: 176, name: 'Terunofuji',            hint: 'Lutteur de sumo',           src: '/images/weight/terunofuji.jpg' },
  { id: 'tochinoshin',       weight: 176, name: 'Tochinoshin',           hint: 'Lutteur de sumo',           src: '/images/weight/tochinoshin.jpg' },
  { id: 'john-goodman',      weight: 178, name: 'John Goodman',          hint: 'Acteur',                    src: '/images/weight/john-goodman.jpg' },
  { id: 'chrissy-metz',      weight: 181, name: 'Chrissy Metz',          hint: 'Actrice',                   src: '/images/weight/chrissy-metz.jpg' },
  { id: 'robert-oberst',     weight: 180, name: 'Robert Oberst',         hint: 'Homme le plus fort',        src: '/images/weight/robert-oberst.png' },
  { id: 'eddie-hall',        weight: 180, name: 'Eddie Hall',            hint: 'Homme le plus fort',        src: '/images/weight/eddie-hall.jpg' },
  { id: 'lasha-talakhadze',  weight: 183, name: 'Lasha Talakhadze',      hint: 'Haltérophile olympique',   src: '/images/weight/lasha-talakhadze.jpg' },
  { id: 'kaisei',            weight: 190, name: 'Kaisei',                hint: 'Lutteur de sumo',           src: '/images/weight/kaisei.jpg' },

  // ── 200–250 kg ──
  { id: 'gabriel-iglesias',  weight: 202, name: 'Gabriel Iglesias',      hint: 'Comédien',                  src: '/images/weight/gabriel-iglesias.jpg' },
  { id: 'thor-bjornsson',    weight: 205, name: 'Hafthor Björnsson',     hint: 'Homme le plus fort',        src: '/images/weight/thor-bjornsson.jpg' },
  { id: 'ichinojo',          weight: 227, name: 'Ichinojō',              hint: 'Lutteur de sumo',           src: '/images/weight/ichinojo.jpg' },
  { id: 'big-show',          weight: 230, name: 'Big Show',              hint: 'Catcheur professionnel',    src: '/images/weight/big-show.jpg' },
  { id: 'akebono',           weight: 233, name: 'Akebono',               hint: 'Lutteur de sumo',           src: '/images/weight/akebono.jpg' },
  { id: 'musashimaru',       weight: 235, name: 'Musashimaru',           hint: 'Lutteur de sumo',           src: '/images/weight/musashimaru.jpg' },
  { id: 'andre-the-giant',   weight: 236, name: 'André le Géant',        hint: 'Catcheur / Acteur',         src: '/images/weight/andre-the-giant.jpg' },

  // ── 250–300 kg ──
  { id: 'yamamotoyama',      weight: 272, name: 'Yamamotoyama',          hint: 'Lutteur de sumo',           src: '/images/weight/yamamotoyama.jpg' },
  { id: 'konishiki',         weight: 287, name: 'Konishiki',             hint: 'Lutteur de sumo',           src: '/images/weight/konishiki.jpg' },
  { id: 'orora',             weight: 293, name: 'Ōrora',                 hint: 'Lutteur de sumo',           src: '/images/weight/orora.jpg' },
];
