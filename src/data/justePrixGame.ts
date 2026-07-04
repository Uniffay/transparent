export type PriceItem = {
  id: string;
  name: string;
  price: number; // prix réel (réellement vendu), en euros
  src: string;
  note?: string;
};

export const priceItems: PriceItem[] = [
  { id: 'used-tissue-creator', name: 'Mouchoir usagé vendu par une créatrice en ligne', price: 14, src: '/images/prix/used-tissue-creator.jpg' },
  { id: 'worn-socks-creator', name: 'Chaussettes portées vendues par une créatrice en ligne', price: 23, src: '/images/prix/worn-socks-creator.jpg' },
  { id: 'belle-delphine-bath-water', name: 'Eau de bain "GamerGirl" de Belle Delphine (1 flacon)', price: 28, src: '/images/prix/belle-delphine-bath-water.jpg' },
  { id: 'worn-boxers-creator', name: 'Boxer porté vendu par un créateur en ligne', price: 37, src: '/images/prix/worn-boxers-creator.jpg' },
  { id: 'worn-underwear-creator', name: 'Sous-vêtement porté vendu par une créatrice en ligne', price: 46, src: '/images/prix/worn-underwear-creator.jpg' },
  { id: 'belle-delphine-bathwater-resale', name: "Flacon scellé d'eau de bain de Belle Delphine (revente eBay)", price: 368, src: '/images/prix/belle-delphine-bathwater-resale.jpg' },
  { id: 'elvis-water-cup', name: "Gobelet d'eau bu par Elvis Presley en concert (1977)", price: 419, src: '/images/prix/elvis-water-cup.jpg' },
  { id: 'brangelina-breath-jar', name: "Bocal d'air respiré par Brad Pitt et Angelina Jolie (eBay)", price: 488, src: '/images/prix/brangelina-breath-jar.jpg' },
  { id: 'fart-jar-stephanie-matto', name: '"Pet en bocal" vendu par Stephanie Matto (1 bocal)', price: 920, src: '/images/prix/fart-jar-stephanie-matto.jpg' },
  { id: 'satan-shoes', name: 'Nike Air Max 97 "Satan Shoes" de Lil Nas X (avec goutte de sang)', price: 937, src: '/images/prix/satan-shoes.jpg' },
  { id: 'justin-timberlake-french-toast', name: 'Pain perdu à moitié mangé de Justin Timberlake (eBay)', price: 943, src: '/images/prix/justin-timberlake-french-toast.jpg' },
  { id: 'pope-mitre-dorito', name: 'Chips Dorito en forme de mitre du pape (eBay)', price: 1012, src: '/images/prix/pope-mitre-dorito.jpg' },
  { id: 'illinois-corn-flake', name: "Corn flake en forme de l'État de l'Illinois (eBay)", price: 1242, src: '/images/prix/illinois-corn-flake.jpg' },
  { id: 'diana-wedding-cake', name: 'Part du gâteau de mariage de Lady Di (1981, vendue en 2021)', price: 2300, src: '/images/prix/diana-wedding-cake.jpg' },
  { id: 'britney-spears-pregnancy-test', name: 'Test de grossesse usagé attribué à Britney Spears', price: 4601, src: '/images/prix/britney-spears-pregnancy-test.jpg' },
  { id: 'scarlett-johansson-tissue', name: 'Mouchoir usagé de Scarlett Johansson (vente caritative)', price: 4876, src: '/images/prix/scarlett-johansson-tissue.jpg' },
  { id: 'lady-gaga-fake-nail', name: 'Faux ongle de Lady Gaga perdu en concert (eBay)', price: 11500, src: '/images/prix/lady-gaga-fake-nail.jpg' },
  { id: 'britney-spears-gum', name: 'Chewing-gum mâché par Britney Spears (eBay)', price: 12880, src: '/images/prix/britney-spears-gum.png' },
  { id: 'szechuan-sauce', name: 'Sachet de sauce Szechuan McDo de 1998 (hype Rick et Morty)', price: 13524, src: '/images/prix/szechuan-sauce.jpg' },
  { id: 'elvis-presley-hair', name: "Mèche de cheveux d'Elvis Presley (enchère)", price: 13800, src: '/images/prix/elvis-presley-hair.jpg' },
  { id: 'william-shatner-kidney-stone', name: 'Calcul rénal de William Shatner (don caritatif)', price: 23000, src: '/images/prix/william-shatner-kidney-stone.jpg' },
  { id: 'virgin-mary-grilled-cheese', name: "Croque-monsieur à l'effigie de la Vierge Marie (eBay)", price: 25760, src: '/images/prix/virgin-mary-grilled-cheese.jpg' },
  { id: 'justin-bieber-hair', name: 'Mèche de cheveux de Justin Bieber (enchère caritative)', price: 37415, src: '/images/prix/justin-bieber-hair.jpg' },
  { id: 'marilyn-monroe-chest-xray', name: 'Radiographies du thorax de Marilyn Monroe (enchère)', price: 41400, src: '/images/prix/marilyn-monroe-chest-xray.jpg' },
  { id: 'ghost-cane', name: 'Canne "hantée par un fantôme" vendue par sa propriétaire (eBay)', price: 59800, src: '/images/prix/ghost-cane.jpg' },
  { id: 'cheetozard', name: 'Cheeto en forme de Dracaufeu, le "Cheetozard" (enchère 2025)', price: 80812, src: '/images/prix/cheetozard.jpg' },
  { id: 'harambe-cheeto', name: 'Cheeto en forme du gorille Harambe (eBay)', price: 91908, src: '/images/prix/harambe-cheeto.jpg' },
  { id: 'among-us-nugget', name: 'Nugget McDo en forme de personnage Among Us (eBay)', price: 91997, src: '/images/prix/among-us-nugget.jpg' },
];
