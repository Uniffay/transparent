# Théorème Fontaine — sources des images

Toutes les images installées le 4 juillet 2026 viennent de Wikimedia Commons
(licences libres, voir la page de chaque fichier : commons.wikimedia.org/wiki/<titre>).
Téléchargées en 1600px puis redimensionnées en 800px (jpeg q85).

Règle des âges : avant = ado ~15-18 ans · après = adulte ~22-26 ans.
Chaque photo est une manche indépendante dans le jeu, donc certaines personnes
n'ont qu'un seul côté.

## Audit du 4 juillet 2026

L'audit visuel des 102 images d'origine (scrapées automatiquement) a révélé
17 images ne montrant pas la personne (statues de cire, dessin d'élève, tableau
peint, étiquette de vinyle, logos texte, signature d'autographe, cosplayeuse,
avatar 3D IMVU, salle de concert vide…) et ~18 photos de groupe/panels
inutilisables. 34 images ont été remplacées, 1 supprimée (sadie-sink-apres :
aucune photo libre de Sadie Sink adulte seule sur Commons).

## Remplacements (fichier local ← titre Commons)

- britney-spears-avant ← Britney Spears 1999.jpg
- britney-spears-apres ← Britney Spears NFL Kickoff 2003 (cropped).jpg
- emma-watson-apres ← Emma Watson 2013.jpg
- miley-cyrus-apres ← Miley Cyrus (23585698670) (cropped).jpg
- avril-lavigne-avant ← AvrilShow cropped.jpg (2002)
- avril-lavigne-apres ← MMVA2007 Avril Lavigne MG 8503 (cropped).jpg
- dove-cameron-apres ← Dove Cameron 2019 by Glenn Francis (cropped).jpg
- jenna-ortega-avant ← Jenna Ortega 2020 2.jpg
- jennifer-lawrence-apres ← Jennifer Lawrence 2, 2013.jpg
- evan-rachel-wood-apres ← Evan Rachel Wood portrait 2009.jpg
- maddie-ziegler-avant ← Maddie Ziegler VMA 2018 (cropped).jpg (basse résolution, seule photo libre d'elle ado)
- kylie-jenner-avant ← Kylie Jenner at Topshop Behind the Scenes.png
- kylie-jenner-apres ← Kylie Jenner VMA 2018.jpg
- madison-beer-apres ← Madison Beer 2022 (52125747191) (cropped).jpg
- olivia-rodrigo-apres ← Olivia Rodrigo - Lollapalooza Argentina Concert 2025 03 (cropped).jpg
- camila-cabello-avant ← Camila Cabello at iHeartRadio Jingle Ball 2013 (cropped).jpg
- camila-cabello-apres ← Camila Cabello AMAs 2019.png
- normani-avant ← Normani Kordei performing in 2013 (cropped).jpeg
- normani-apres ← Normani August 2019.jpeg
- tate-mcrae-apres ← TateMcRaeLisbon.jpg (2025)
- hailee-steinfeld-avant ← Hailee Steinfeld 2011 AA (cropped).jpg
- victoria-justice-apres ← Victoria Justice 2015.png
- vanessa-hudgens-avant ← Vanessa Hudgens High School Musical Live (cropped).jpg (2006)
- hayden-panettiere-apres ← Hayden Panettiere at PaleyFest 2013 (cropped).jpg
- keke-palmer-apres ← Keke Palmer 2016 Paleyfest cropped.jpg
- sabrina-carpenter-apres ← Sabrina Carpenter @ Wiltern 10 15 2022 (52526442733) (cropped 2).jpg
- shailene-woodley-apres ← Shailene Woodley 2014.jpg
- kendall-jenner-avant ← Kendall Jenner in Badgley Mischka (cropped).jpg (2013)
- willow-smith-avant ← Willow Smith , Broccoli City Festival D.C. Pictures - April 25, 2015.jpg
- bridgit-mendler-apres ← 2014-0816 Bridgit Mendler (14972567921).jpg
- debby-ryan-apres ← Debby Ryan 2018 (cropped).png
- peyton-list-apres ← Peyton List Photo Op GalaxyCon Columbus 2024.jpg
- lily-rose-depp-avant ← Lily-Rose Depp Cannes 2016.jpg
- hailey-bieber-avant ← Hailey Baldwin 2014 (cropped).png

## Ajouts du 4 juillet 2026 (22 personnes)

Paires avant/après : Justin Bieber (VMA 2010 / concert 2016), Harry Styles
(2011 / Denver 2018), Shawn Mendes (VMA 2015 / AMAs 2019), Nick Jonas (2010 /
2017), Josh Hutcherson (2009 / SDCC 2015), Daniel Radcliffe (2006 / 2012),
Emma Roberts (TIFF 2008 / SDCC 2015), Sophie Turner (2013 / WonderCon 2019),
Abigail Breslin (TIFF 2013 / 2017), Asa Butterfield (2014 / 2019), Miranda
Cosgrove (VMA 2009 / KCA 2017), Cole Sprouse (2009 / SDCC 2018), Finn Wolfhard
(TIFF 2019 / 2025), Millie Bobby Brown (SFM5 2022 / première ST5 2025).
Titres Commons exacts : voir final-new.json de la session (ou l'historique git).

Après seuls : Rupert Grint (2012), Natalie Portman (2005), Keira Knightley
(BAFTA 2008), Kirsten Dunst (Cannes 2006), Lindsay Lohan (2012), Zac Efron
(The Lucky One 2012), Timothée Chalamet (2018).
Avant seul : Louane (avant-première La Famille Bélier 2014).

## Pistes écartées (rien d'exploitable sur Commons)

Tom Holland (que des homonymes), Joey King (photos d'enfance seulement),
Jaden Smith, Laura Marano, Bonnie Wright, Amandla Stenberg, AnnaSophia Robb,
Bailee Madison, Rowan Blanchard, Ariel Winter (après introuvable),
Sadie Sink adulte, Rupert Grint ado, Natalie Portman ado, Zac Efron ado,
Timothée Chalamet ado, Louane adulte.

## Pour ajouter une photo

Déposer `public/images/fontaine/<slug>-avant.jpg` ou `<slug>-apres.jpg`
(800px de large) et ajouter l'entrée correspondante dans
`src/data/theoremeFontaineGame.ts`.
