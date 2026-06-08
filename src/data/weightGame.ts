export type WeightPerson = {
  id: string;
  name: string;
  src: string;
  weight: number; // kg officiel public
  height: number; // cm
  hint: string;
};

export const weightPeople: WeightPerson[] = [
  // ── 40–60 kg ──
  { id: 'faith-kipyegon',      weight: 43,  height: 157, name: 'Faith Kipyegon',         hint: 'Coureuse de fond',            src: '/images/weight/faith-kipyegon.jpg' },
  { id: 'simone-biles',        weight: 47,  height: 142, name: 'Simone Biles',            hint: 'Gymnaste',                    src: '/images/weight/simone-biles.jpg' },
  { id: 'sifan-hassan',        weight: 49,  height: 170, name: 'Sifan Hassan',            hint: 'Coureuse de fond',            src: '/images/weight/sifan-hassan.jpg' },
  { id: 'nicola-adams',        weight: 51,  height: 164, name: 'Nicola Adams',            hint: 'Boxeuse olympique',           src: '/images/weight/nicola-adams.jpg' },
  { id: 'mary-kom',            weight: 51,  height: 158, name: 'Mary Kom',                hint: 'Boxeuse olympique',           src: '/images/weight/mary-kom.jpg' },
  { id: 'eliud-kipchoge',      weight: 52,  height: 170, name: 'Eliud Kipchoge',          hint: 'Marathonien',                 src: '/images/weight/eliud-kipchoge.jpg' },
  { id: 'elaine-thompson',     weight: 57,  height: 168, name: 'Elaine Thompson-Herah',   hint: 'Sprinteuse',                  src: '/images/weight/elaine-thompson.jpg' },
  { id: 'jonas-vingegaard',    weight: 58,  height: 175, name: 'Jonas Vingegaard',        hint: 'Cycliste',                    src: '/images/weight/jonas-vingegaard.jpg' },
  { id: 'egan-bernal',         weight: 60,  height: 175, name: 'Egan Bernal',             hint: 'Cycliste',                    src: '/images/weight/egan-bernal.jpg' },

  // ── 60–80 kg ──
  { id: 'amanda-nunes',        weight: 61,  height: 173, name: 'Amanda Nunes',            hint: 'Championne MMA',              src: '/images/weight/amanda-nunes.jpg' },
  { id: 'frankie-edgar',       weight: 62,  height: 168, name: 'Frankie Edgar',           hint: 'Combattant MMA',              src: '/images/weight/frankie-edgar.jpg' },
  { id: 'ronda-rousey',        weight: 64,  height: 168, name: 'Ronda Rousey',            hint: 'Combattante MMA',             src: '/images/weight/ronda-rousey.jpg' },
  { id: 'mo-farah',            weight: 65,  height: 175, name: 'Mo Farah',                hint: 'Coureur de fond',             src: '/images/weight/mo-farah.jpg' },
  { id: 'neymar',              weight: 68,  height: 175, name: 'Neymar',                  hint: 'Footballeur',                 src: '/images/weight/neymar.jpg' },
  { id: 'naomi-osaka',         weight: 69,  height: 180, name: 'Naomi Osaka',             hint: 'Tenniswoman',                 src: '/images/weight/naomi-osaka.jpg' },
  { id: 'conor-mcgregor',      weight: 70,  height: 173, name: 'Conor McGregor',          hint: 'Combattant MMA',              src: '/images/weight/conor-mcgregor.jpg' },
  { id: 'khabib',              weight: 70,  height: 178, name: 'Khabib Nurmagomedov',     hint: 'Champion MMA',                src: '/images/weight/khabib.jpg' },
  { id: 'katie-ledecky',       weight: 70,  height: 183, name: 'Katie Ledecky',           hint: 'Nageuse',                     src: '/images/weight/katie-ledecky.jpg' },
  { id: 'serena-williams',     weight: 75,  height: 175, name: 'Serena Williams',         hint: 'Tenniswoman',                 src: '/images/weight/serena-williams.jpg' },
  { id: 'kamaru-usman',        weight: 77,  height: 183, name: 'Kamaru Usman',            hint: 'Champion MMA',                src: '/images/weight/kamaru-usman.png' },
  { id: 'novak-djokovic',      weight: 77,  height: 188, name: 'Novak Djokovic',          hint: 'Tennisman',                   src: '/images/weight/novak-djokovic.jpg' },
  { id: 'lydia-valentin',      weight: 78,  height: 169, name: 'Lydia Valentín',          hint: 'Haltérophile olympique',     src: '/images/weight/lydia-valentin.jpg' },
  { id: 'wout-van-aert',       weight: 78,  height: 190, name: 'Wout van Aert',           hint: 'Cycliste',                    src: '/images/weight/wout-van-aert.jpg' },
  { id: 'lu-xiaojun',          weight: 81,  height: 172, name: 'Lü Xiaojun',              hint: 'Haltérophile olympique',     src: '/images/weight/lu-xiaojun.png' },

  // ── 80–100 kg ──
  { id: 'daniil-medvedev',     weight: 83,  height: 198, name: 'Daniil Medvedev',         hint: 'Tennisman',                   src: '/images/weight/daniil-medvedev.jpg' },
  { id: 'israel-adesanya',     weight: 84,  height: 193, name: 'Israel Adesanya',         hint: 'Combattant MMA',              src: '/images/weight/israel-adesanya.jpg' },
  { id: 'tyreek-hill',         weight: 85,  height: 178, name: 'Tyreek Hill',             hint: 'Receveur NFL',                src: '/images/weight/tyreek-hill.jpg' },
  { id: 'adam-peaty',          weight: 86,  height: 191, name: 'Adam Peaty',              hint: 'Nageur',                      src: '/images/weight/adam-peaty.jpg' },
  { id: 'tatiana-kashirina',   weight: 87,  height: 177, name: 'Tatiana Kashirina',       hint: 'Haltérophile olympique',     src: '/images/weight/tatiana-kashirina.jpg' },
  { id: 'seth-rogen',          weight: 88,  height: 180, name: 'Seth Rogen',              hint: 'Acteur',                      src: '/images/weight/seth-rogen.jpg' },
  { id: 'caeleb-dressel',      weight: 91,  height: 191, name: 'Caeleb Dressel',          hint: 'Nageur',                      src: '/images/weight/caeleb-dressel.jpg' },
  { id: 'queen-latifah',       weight: 93,  height: 178, name: 'Queen Latifah',           hint: 'Actrice / Rappeuse',          src: '/images/weight/queen-latifah.jpg' },
  { id: 'ilya-ilyin',          weight: 94,  height: 178, name: 'Ilya Ilyin',              hint: 'Haltérophile olympique',     src: '/images/weight/ilya-ilyin.jpg' },
  { id: 'usain-bolt',          weight: 94,  height: 195, name: 'Usain Bolt',              hint: 'Sprinter',                    src: '/images/weight/usain-bolt.jpg' },
  { id: 'beth-ditto',          weight: 95,  height: 157, name: 'Beth Ditto',              hint: 'Chanteuse',                   src: '/images/weight/beth-ditto.jpg' },

  // ── 100–120 kg ──
  { id: 'peter-schmeichel',    weight: 100, height: 191, name: 'Peter Schmeichel',        hint: 'Gardien de foot',             src: '/images/weight/peter-schmeichel.jpg' },
  { id: 'enho',                weight: 101, height: 168, name: 'Enhō',                    hint: 'Lutteur de sumo',             src: '/images/weight/enho.jpg' },
  { id: 'jack-black',          weight: 105, height: 168, name: 'Jack Black',              hint: 'Acteur / Musicien',           src: '/images/weight/jack-black.jpg' },
  { id: 'jon-jones',           weight: 108, height: 193, name: 'Jon Jones',               hint: 'Combattant MMA',              src: '/images/weight/jon-jones.jpg' },
  { id: 'rebel-wilson',        weight: 111, height: 157, name: 'Rebel Wilson',            hint: 'Actrice',                     src: '/images/weight/rebel-wilson.jpg' },
  { id: 'lebron-james',        weight: 113, height: 206, name: 'LeBron James',            hint: 'Basketteur NBA',              src: '/images/weight/lebron-james.jpg' },
  { id: 'stipe-miocic',        weight: 113, height: 193, name: 'Stipe Miocic',            hint: 'Combattant MMA',              src: '/images/weight/stipe-miocic.jpg' },
  { id: 'tyson-fury',          weight: 116, height: 206, name: 'Tyson Fury',              hint: 'Boxeur poids lourd',          src: '/images/weight/tyson-fury.jpg' },
  { id: 'ceelo-green',         weight: 117, height: 168, name: 'CeeLo Green',             hint: 'Chanteur',                    src: '/images/weight/ceelo-green.jpg' },
  { id: 'francis-ngannou',     weight: 117, height: 193, name: 'Francis Ngannou',         hint: 'Combattant MMA',              src: '/images/weight/francis-ngannou.jpg' },
  { id: 'melissa-mccarthy',    weight: 118, height: 157, name: 'Melissa McCarthy',        hint: 'Actrice',                     src: '/images/weight/melissa-mccarthy.jpg' },

  // ── 120–150 kg ──
  { id: 'tess-holliday',       weight: 127, height: 165, name: 'Tess Holliday',           hint: 'Mannequin',                   src: '/images/weight/tess-holliday.jpg' },
  { id: 'kevin-james',         weight: 127, height: 173, name: 'Kevin James',             hint: 'Acteur / Comédien',           src: '/images/weight/kevin-james.jpg' },
  { id: 'robbie-coltrane',     weight: 128, height: 185, name: 'Robbie Coltrane',         hint: 'Acteur',                      src: '/images/weight/robbie-coltrane.jpg' },
  { id: 'zion-williamson',     weight: 129, height: 198, name: 'Zion Williamson',         hint: 'Basketteur NBA',              src: '/images/weight/zion-williamson.jpg' },
  { id: 'nikola-jokic',        weight: 129, height: 211, name: 'Nikola Jokić',            hint: 'Basketteur NBA',              src: '/images/weight/nikola-jokic.jpg' },
  { id: 'jonah-hill',          weight: 130, height: 170, name: 'Jonah Hill',              hint: 'Acteur',                      src: '/images/weight/jonah-hill.jpg' },
  { id: 'alexander-karelin',   weight: 131, height: 193, name: 'Aleksandr Karelin',       hint: 'Lutteur gréco-romain',        src: '/images/weight/alexander-karelin.jpg' },
  { id: 'james-corden',        weight: 133, height: 175, name: 'James Corden',            hint: 'Animateur TV',                src: '/images/weight/james-corden.jpg' },
  { id: 'monique',             weight: 136, height: 168, name: "Mo'Nique",                hint: 'Actrice / Comédienne',        src: '/images/weight/monique.jpg' },
  { id: 'zach-edey',           weight: 138, height: 224, name: 'Zach Edey',               hint: 'Basketteur NBA',              src: '/images/weight/zach-edey.jpg' },
  { id: 'wakatakakage',        weight: 138, height: 183, name: 'Wakatakakage',            hint: 'Lutteur de sumo',             src: '/images/weight/wakatakakage.jpg' },
  { id: 'lizzo',               weight: 140, height: 178, name: 'Lizzo',                   hint: 'Chanteuse / Rappeuse',        src: '/images/weight/lizzo.jpg' },
  { id: 'tacko-fall',          weight: 141, height: 229, name: 'Tacko Fall',              hint: 'Basketteur NBA',              src: '/images/weight/tacko-fall.jpg' },
  { id: 'teddy-riner',         weight: 141, height: 204, name: 'Teddy Riner',             hint: 'Judoka',                      src: '/images/weight/teddy-riner.jpg' },
  { id: 'matthias-steiner',    weight: 145, height: 183, name: 'Matthias Steiner',        hint: 'Haltérophile olympique',     src: '/images/weight/matthias-steiner.jpg' },
  { id: 'uini-atonio',         weight: 147, height: 196, name: 'Uini Atonio',             hint: 'Rugbyman',                    src: '/images/weight/uini-atonio.jpg' },
  { id: 'li-wenwen',           weight: 150, height: 178, name: 'Li Wenwen',               hint: 'Haltérophile olympique',     src: '/images/weight/li-wenwen.png' },
  { id: 'hoshoryu',            weight: 150, height: 188, name: 'Hōshōryū',                hint: 'Lutteur de sumo',             src: '/images/weight/hoshoryu.jpg' },
  { id: 'gabourey-sidibe',     weight: 150, height: 165, name: 'Gabourey Sidibe',         hint: 'Actrice',                     src: '/images/weight/gabourey-sidibe.jpg' },

  // ── 150–175 kg ──
  { id: 'ben-tameifuna',       weight: 151, height: 183, name: 'Ben Tameifuna',           hint: 'Rugbyman',                    src: '/images/weight/ben-tameifuna.jpg' },
  { id: 'hakuho',              weight: 155, height: 192, name: 'Hakuho',                  hint: 'Lutteur de sumo',             src: '/images/weight/hakuho.jpg' },
  { id: 'daieisho',            weight: 160, height: 183, name: 'Daieishō',                hint: 'Lutteur de sumo',             src: '/images/weight/daieisho.jpg' },
  { id: 'onosho',              weight: 165, height: 176, name: 'Ōnoshō',                  hint: 'Lutteur de sumo',             src: '/images/weight/onosho.jpg' },
  { id: 'abi-masatora',        weight: 167, height: 188, name: 'Abi',                     hint: 'Lutteur de sumo',             src: '/images/weight/abi-masatora.jpg' },
  { id: 'shodai',              weight: 168, height: 184, name: 'Shōdai',                  hint: 'Lutteur de sumo',             src: '/images/weight/shodai.jpg' },
  { id: 'trent-brown',         weight: 172, height: 203, name: 'Trent Brown',             hint: 'Joueur NFL',                  src: '/images/weight/trent-brown.jpg' },
  { id: 'takayasu',            weight: 173, height: 188, name: 'Takayasu',                hint: 'Lutteur de sumo',             src: '/images/weight/takayasu.jpg' },
  { id: 'mitakeumi',           weight: 175, height: 182, name: 'Mitakeumi',               hint: 'Lutteur de sumo',             src: '/images/weight/mitakeumi.jpg' },
  { id: 'brian-shaw',          weight: 175, height: 203, name: 'Brian Shaw',              hint: 'Homme le plus fort',          src: '/images/weight/brian-shaw.jpg' },

  // ── 175–200 kg ──
  { id: 'tochinoshin',         weight: 176, height: 192, name: 'Tochinoshin',             hint: 'Lutteur de sumo',             src: '/images/weight/tochinoshin.jpg' },
  { id: 'terunofuji',          weight: 176, height: 192, name: 'Terunofuji',              hint: 'Lutteur de sumo',             src: '/images/weight/terunofuji.jpg' },
  { id: 'kisenosato',          weight: 177, height: 188, name: 'Kisenosato',              hint: 'Lutteur de sumo',             src: '/images/weight/kisenosato.png' },
  { id: 'john-goodman',        weight: 178, height: 188, name: 'John Goodman',            hint: 'Acteur',                      src: '/images/weight/john-goodman.jpg' },
  { id: 'eddie-hall',          weight: 180, height: 188, name: 'Eddie Hall',              hint: 'Homme le plus fort',          src: '/images/weight/eddie-hall.jpg' },
  { id: 'robert-oberst',       weight: 180, height: 201, name: 'Robert Oberst',           hint: 'Homme le plus fort',          src: '/images/weight/robert-oberst.png' },
  { id: 'chrissy-metz',        weight: 181, height: 163, name: 'Chrissy Metz',            hint: 'Actrice',                     src: '/images/weight/chrissy-metz.jpg' },
  { id: 'rick-ross',           weight: 182, height: 180, name: 'Rick Ross',               hint: 'Rappeur',                     src: '/images/weight/rick-ross.jpg' },
  { id: 'lasha-talakhadze',    weight: 183, height: 197, name: 'Lasha Talakhadze',        hint: 'Haltérophile olympique',     src: '/images/weight/lasha-talakhadze.jpg' },
  { id: 'kaisei',              weight: 190, height: 195, name: 'Kaisei',                  hint: 'Lutteur de sumo',             src: '/images/weight/kaisei.jpg' },

  // ── 200–300 kg ──
  { id: 'gabriel-iglesias',    weight: 202, height: 173, name: 'Gabriel Iglesias',        hint: 'Comédien',                    src: '/images/weight/gabriel-iglesias.jpg' },
  { id: 'thor-bjornsson',      weight: 205, height: 205, name: 'Hafthor Björnsson',       hint: 'Homme le plus fort',          src: '/images/weight/thor-bjornsson.jpg' },
  { id: 'ichinojo',            weight: 227, height: 190, name: 'Ichinojō',                hint: 'Lutteur de sumo',             src: '/images/weight/ichinojo.jpg' },
  { id: 'big-show',            weight: 230, height: 213, name: 'Big Show',                hint: 'Catcheur professionnel',      src: '/images/weight/big-show.jpg' },
  { id: 'akebono',             weight: 233, height: 203, name: 'Akebono',                 hint: 'Lutteur de sumo',             src: '/images/weight/akebono.jpg' },
  { id: 'musashimaru',         weight: 235, height: 192, name: 'Musashimaru',             hint: 'Lutteur de sumo',             src: '/images/weight/musashimaru.jpg' },
  { id: 'andre-the-giant',     weight: 236, height: 224, name: 'André le Géant',          hint: 'Catcheur / Acteur',           src: '/images/weight/andre-the-giant.jpg' },
  { id: 'yamamotoyama',        weight: 272, height: 193, name: 'Yamamotoyama',            hint: 'Lutteur de sumo',             src: '/images/weight/yamamotoyama.jpg' },
  { id: 'konishiki',           weight: 287, height: 184, name: 'Konishiki',               hint: 'Lutteur de sumo',             src: '/images/weight/konishiki.jpg' },
  { id: 'orora',               weight: 293, height: 190, name: 'Ōrora',                   hint: 'Lutteur de sumo',             src: '/images/weight/orora.jpg' },
];
