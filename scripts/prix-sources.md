# Cash-ta-strophe (juste prix) — sources des images et des prix

Mise à jour du 5 juillet 2026. Les images du jeu viennent de Wikimedia Commons
(licences libres), téléchargées en 1600px puis redimensionnées en 800px
(jpeg q85). Les photos authentiques (presse/enchères, sous copyright) sont
conservées hors projet dans `../reference-prix/` comme références visuelles.

Prix : montant réel de la vente documentée, converti USD→EUR à ~0,92
(GBP→EUR pour la reine Victoria).

## Curation du 5 juillet 2026

Supprimés (aucune vraie photo de l'objet retrouvable) : chewing-gum Britney,
test de grossesse Britney, mouchoir Scarlett Johansson, pain perdu Justin
Timberlake, corn flake Illinois, mèche Justin Bieber, bocal d'air Brangelina,
canne hantée, radios Marilyn Monroe.

Ajoutés (ventes documentées) :
- feet-pics-creator 5 € — prix typique d'une photo de pieds (FeetFinder etc.).
  Image : Feet in mirror with red nail polish.jpg.
- lily-allen-feet 9 € — abonnement mensuel 10 $ au OnlyFans « Lily Allen
  FTSE500 » (pieds), révélé en octobre 2024 (elle gagne plus qu'avec Spotify).
  Image : Lily Allen at Southside 2014 - Cropped.jpg.
- boob-sweat-jar-matto 460 € — fiole de sueur de poitrine de Stephanie Matto,
  500 $ pièce (mai 2022, ~30 000 $/semaine). Image : Perfume Bottle.jpg.
- queen-victoria-bloomers 13 750 € — culotte bouffante en soie de la reine
  Victoria (tour de taille 142 cm !), adjugée 9 375 £ (~14 950 $) à Édimbourg
  en 2011. Image : Bloomers, pair (AM 1956.188.10-1).jpg.
- john-lennon-tooth 28 700 € — molaire cariée de John Lennon donnée à sa
  gouvernante, adjugée 19 000 £ (31 200 $) chez Omega Auctions en nov. 2011.
  Image : Lower wisdom tooth.jpg.
- truman-capote-ashes 40 250 € — cendres de Truman Capote dans leur boîte
  japonaise en bois sculpté, 43 750 $ chez Julien's Auctions (sept. 2016).
  Image : VM 01809 – Japanese lacquer box – 19th century.jpg.

Ajouts du 5 juillet 2026 (2e vague) :
- breast-milk-bottle 12 € — bouteille de lait maternel, marché en ligne réel
  (~1-3 $/oz, acheté notamment par des bodybuilders). Image Commons :
  Bottle of Pumped Breast Milk.jpg.
- queen-victoria-nightdress 5 980 € — chemise de nuit de la reine Victoria,
  5 200 £ chez Hansons en 2008 (authentifiée par le V&A). Image Commons :
  Nightdress (AM 19022-1).jpg.
- madonna-cone-bra 47 840 € — corset conique Gaultier de la tournée Blond
  Ambition 1990, 52 000 $ chez Christie's Londres (2012). Image Commons :
  Madonna's Blond Ambition Corset.jpg (le vrai corset, exposé en musée).

## Objets restants du 4 juillet 2026 (rappel des ventes)

Eau de bain Belle Delphine 30 $ le flacon (2019, revente eBay ~400 $) ·
gobelet d'Elvis 455 $ (2004) · pet en bocal Matto 1 000 $ · Satan Shoes
1 018 $ · Dorito mitre 1 209 $ (GoldenPalace) · part de gâteau de Lady Di
~2 500 $ (Dominic Winter, août 2021) · ongle de Lady Gaga ~12 500 $ (2013) ·
sachet Szechuan 1998 14 700 $ (2017) · mèche d'Elvis ~15 000 $ · calcul rénal
de Shatner 25 000 $ (GoldenPalace, 2006) · croque Vierge Marie 28 000 $
(GoldenPalace, 2004) · Cheetozard 87 840 $ (Goldin, mars 2025) · Cheeto
Harambe 99 900 $ (2017) · nugget Among Us 99 997 $ (2021, record Guinness).
Les objets « créateur/créatrice en ligne » (photo de pieds 5 €, mouchoir 14 €,
chaussettes 23 €, boxer 37 €, culotte 46 €) sont des prix de marché typiques.

## UI

PriceGame.tsx : slider linéaire basique 1 → 100 000 € + champ numérique
éditable (le gros chiffre affiché est un input) pour taper le prix direct.
Barre de comparaison au reveal en échelle log (lisibilité des petits prix).

## Références visuelles (copyright — usage local uniquement)

`C:/Users/quent/Documents/UniGames/reference-prix/` : vraies photos
presse/enchères des objets (Cheetozard en vitrine, Dorito-mitre GoldenPalace,
dent de Lennon, boîte de Capote, culotte de Victoria encadrée, etc.).
Ne pas publier telles quelles sans accord de l'utilisateur.
