export type PriceItem = {
  id: string;
  name: string;
  price: number; // prix réel (réellement vendu), en euros
  src: string;
  note?: string;
};

export const priceItems: PriceItem[] = [
  { id: 'feet-pics-creator', name: 'Photo de pieds vendue par une créatrice en ligne', price: 5, src: '/images/prix/feet-pics-creator.jpg' },
  { id: 'lily-allen-feet', name: 'Abonnement au OnlyFans des pieds de Lily Allen (1 mois)', price: 9, src: '/images/prix/lily-allen-feet.jpg' },
  { id: 'breast-milk-bottle', name: 'Bouteille de lait maternel vendue en ligne (les bodybuilders adorent)', price: 12, src: '/images/prix/breast-milk-bottle.jpg' },
  { id: 'used-tissue-creator', name: 'Mouchoir usagé vendu par une créatrice en ligne', price: 14, src: '/images/prix/used-tissue-creator.jpg' },
  { id: 'worn-socks-creator', name: 'Chaussettes portées vendues par une créatrice en ligne', price: 23, src: '/images/prix/worn-socks-creator.jpg' },
  { id: 'belle-delphine-bath-water', name: 'Eau de bain "GamerGirl" de Belle Delphine (1 flacon)', price: 28, src: '/images/prix/belle-delphine-bath-water.jpg' },
  { id: 'worn-boxers-creator', name: 'Boxer porté vendu par un créateur en ligne', price: 37, src: '/images/prix/worn-boxers-creator.jpg' },
  { id: 'worn-thong-creator', name: 'String porté vendu par un créateur en ligne', price: 40, src: '/images/prix/worn-thong-creator.jpg' },
  { id: 'worn-underwear-creator', name: 'Culotte portée vendue par une créatrice en ligne', price: 46, src: '/images/prix/worn-underwear-creator.jpg' },
  { id: 'belle-delphine-bathwater-resale', name: "Flacon scellé d'eau de bain de Belle Delphine (revente eBay)", price: 368, src: '/images/prix/belle-delphine-bathwater-resale.jpg' },
  { id: 'elvis-water-cup', name: "Gobelet d'eau bu par Elvis Presley en concert (1977)", price: 419, src: '/images/prix/elvis-water-cup.jpg' },
  { id: 'boob-sweat-jar-matto', name: 'Fiole de sueur de poitrine de Stephanie Matto (1 fiole)', price: 460, src: '/images/prix/boob-sweat-jar-matto.jpg' },
  { id: 'chastity-belt', name: 'Ceinture de chasteté en fer "médiévale" (enchère d\'antiquités)', price: 500, src: '/images/prix/chastity-belt.jpg' },
  { id: 'fart-jar-stephanie-matto', name: '"Pet en bocal" vendu par Stephanie Matto (1 bocal)', price: 920, src: '/images/prix/fart-jar-stephanie-matto.jpg' },
  { id: 'satan-shoes', name: 'Nike Air Max 97 "Satan Shoes" de Lil Nas X (avec goutte de sang)', price: 937, src: '/images/prix/satan-shoes.jpg' },
  { id: 'pope-mitre-dorito', name: 'Chips Dorito en forme de mitre du pape (eBay)', price: 1012, src: '/images/prix/pope-mitre-dorito.jpg' },
  { id: 'marilyn-golden-dreams-calendar', name: 'Calendrier "Golden Dreams" de Marilyn nue (original des années 50)', price: 1435, src: '/images/prix/marilyn-golden-dreams-calendar.jpg' },
  { id: 'diana-wedding-cake', name: 'Part du gâteau de mariage de Lady Di (1981, vendue en 2021)', price: 2300, src: '/images/prix/diana-wedding-cake.jpg' },
  { id: 'queen-victoria-nightdress', name: 'Chemise de nuit de la reine Victoria (enchère 2008)', price: 5980, src: '/images/prix/queen-victoria-nightdress.jpg' },
  { id: 'lady-gaga-fake-nail', name: 'Faux ongle de Lady Gaga perdu en concert (eBay)', price: 11500, src: '/images/prix/lady-gaga-fake-nail.jpg' },
  { id: 'szechuan-sauce', name: 'Sachet de sauce Szechuan McDo de 1998 (hype Rick et Morty)', price: 13524, src: '/images/prix/szechuan-sauce.jpg' },
  { id: 'queen-victoria-bloomers', name: 'Culotte bouffante en soie de la reine Victoria (enchère 2011)', price: 13750, src: '/images/prix/queen-victoria-bloomers.jpg' },
  { id: 'elvis-presley-hair', name: "Mèche de cheveux d'Elvis Presley (enchère)", price: 13800, src: '/images/prix/elvis-presley-hair.jpg' },
  { id: 'william-shatner-kidney-stone', name: 'Calcul rénal de William Shatner (don caritatif)', price: 23000, src: '/images/prix/william-shatner-kidney-stone.jpg' },
  { id: 'virgin-mary-grilled-cheese', name: "Croque-monsieur à l'effigie de la Vierge Marie (eBay)", price: 25760, src: '/images/prix/virgin-mary-grilled-cheese.jpg' },
  { id: 'marilyn-monroe-bra', name: 'Soutien-gorge de Marilyn Monroe dans "Certains l\'aiment chaud"', price: 25875, src: '/images/prix/marilyn-monroe-bra.jpg' },
  { id: 'john-lennon-tooth', name: 'Molaire cariée de John Lennon (enchère 2011)', price: 28700, src: '/images/prix/john-lennon-tooth.jpg' },
  { id: 'madonna-nude-photo', name: 'Tirage photo de Madonna nue à 20 ans (1979, Christie\'s)', price: 34500, src: '/images/prix/madonna-nude-photo.jpg' },
  { id: 'truman-capote-ashes', name: 'Cendres de Truman Capote dans leur boîte (enchère 2016)', price: 40250, src: '/images/prix/truman-capote-ashes.jpg' },
  { id: 'playboy-first-issue', name: 'Premier numéro de Playboy avec Marilyn (1953, signé Hefner)', price: 44850, src: '/images/prix/playboy-first-issue.jpg' },
  { id: 'madonna-cone-bra', name: 'Soutien-gorge conique de Madonna (Blond Ambition, Gaultier)', price: 47840, src: '/images/prix/madonna-cone-bra.jpg' },
  { id: 'cheetozard', name: 'Cheeto en forme de Dracaufeu, le "Cheetozard" (enchère 2025)', price: 80812, src: '/images/prix/cheetozard.jpg' },
  { id: 'harambe-cheeto', name: 'Cheeto en forme du gorille Harambe (eBay)', price: 91908, src: '/images/prix/harambe-cheeto.jpg' },
  { id: 'among-us-nugget', name: 'Nugget McDo en forme de personnage Among Us (eBay)', price: 91997, src: '/images/prix/among-us-nugget.jpg' },
];
