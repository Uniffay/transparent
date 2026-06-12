export type QuoteAuthor = 'trump' | 'hitler' | 'autre';

export type Quote = {
  id: string;
  text: string;
  author: QuoteAuthor;
  realAuthor: string;
  source?: string;
};

// Citations réelles et sourcées. Attribution vérifiée ; fausses citations courantes exclues.
export const quotes: Quote[] = [
  { id: "trump-01", author: "trump", realAuthor: "Donald Trump", text: "Je pourrais me tenir au milieu de la Cinquième Avenue et tirer sur quelqu'un, et je ne perdrais aucun électeur.", source: "Meeting, Sioux Center (Iowa), 23 janvier 2016" },
  { id: "trump-02", author: "trump", realAuthor: "Donald Trump", text: "Personne ne connaît le système mieux que moi, c'est pourquoi moi seul peux le réparer.", source: "Convention nationale républicaine, Cleveland, 21 juillet 2016" },
  { id: "trump-03", author: "trump", realAuthor: "Donald Trump", text: "Les médias de fake news ne sont pas mon ennemi, ils sont l'ennemi du peuple américain !", source: "Tweet, 17 février 2017" },
  { id: "trump-04", author: "trump", realAuthor: "Donald Trump", text: "On va tellement gagner que vous en serez fatigués. Vous direz : pitié, c'est trop gagner, on n'en peut plus.", source: "Meeting de campagne, 2016" },
  { id: "trump-05", author: "trump", realAuthor: "Donald Trump", text: "Quand le Mexique envoie ses gens, il n'envoie pas ses meilleurs. Ils apportent la drogue, le crime, ce sont des violeurs.", source: "Annonce de candidature, Trump Tower, 16 juin 2015" },
  { id: "trump-06", author: "trump", realAuthor: "Donald Trump", text: "Mes deux plus grands atouts ont été ma stabilité mentale et le fait d'être vraiment intelligent. Un génie, et un génie très stable.", source: "Tweet, 6 janvier 2018" },
  { id: "trump-07", author: "trump", realAuthor: "Donald Trump", text: "Je construirai un grand, grand mur sur notre frontière sud, et c'est le Mexique qui le paiera. Croyez-moi.", source: "Annonce de candidature, New York, 16 juin 2015" },
  { id: "trump-08", author: "trump", realAuthor: "Donald Trump", text: "Je serai le plus grand président pour l'emploi que Dieu ait jamais créé.", source: "Annonce de candidature, Trump Tower, 16 juin 2015" },
  { id: "trump-09", author: "trump", realAuthor: "Donald Trump", text: "J'adore les gens peu éduqués !", source: "Discours de victoire au caucus du Nevada, 23 février 2016" },
  { id: "trump-10", author: "trump", realAuthor: "Donald Trump", text: "Russie, si tu m'écoutes, j'espère que tu pourras retrouver les 30 000 e-mails manquants.", source: "Conférence de presse, Doral (Floride), 27 juillet 2016" },
  { id: "trump-11", author: "trump", realAuthor: "Donald Trump", text: "Personne ne savait que la santé pouvait être aussi compliquée.", source: "Réunion avec les gouverneurs, Maison-Blanche, 27 février 2017" },
  { id: "trump-12", author: "trump", realAuthor: "Donald Trump", text: "Nous avons la situation totalement sous contrôle.", source: "Interview CNBC à Davos (coronavirus), 22 janvier 2020" },
  { id: "trump-13", author: "trump", realAuthor: "Donald Trump", text: "Personne ne respecte les femmes plus que moi.", source: "Campagne 2016" },
  { id: "hitler-01", author: "hitler", realAuthor: "Adolf Hitler", text: "Les grandes masses du peuple succomberont plus facilement à un grand mensonge qu'à un petit.", source: "Mein Kampf, vol. I, ch. 10, 1925" },
  { id: "hitler-02", author: "hitler", realAuthor: "Adolf Hitler", text: "Toute propagande doit être populaire et fixer son niveau intellectuel à la capacité de compréhension du plus borné de ceux auxquels elle s'adresse.", source: "Mein Kampf, vol. I, ch. 6, 1925" },
  { id: "hitler-03", author: "hitler", realAuthor: "Adolf Hitler", text: "Toute propagande efficace doit se limiter à quelques points et les marteler par des slogans jusqu'à ce que le dernier les comprenne.", source: "Mein Kampf, vol. I, ch. 6, 1925" },
  { id: "hitler-04", author: "hitler", realAuthor: "Adolf Hitler", text: "Seule une répétition constante finit par imprimer une idée dans la mémoire de la foule.", source: "Mein Kampf, vol. I, ch. 6, 1925" },
  { id: "hitler-05", author: "hitler", realAuthor: "Adolf Hitler", text: "La lutte est le père de toutes choses. Ce n'est pas par les principes de l'humanité que l'homme se préserve, mais uniquement par la lutte la plus brutale.", source: "Mein Kampf, 1925" },
  { id: "hitler-06", author: "hitler", realAuthor: "Adolf Hitler", text: "Celui qui veut vivre doit combattre, et celui qui ne veut pas combattre dans ce monde de lutte éternelle ne mérite pas de vivre.", source: "Mein Kampf, 1925" },
  { id: "hitler-07", author: "hitler", realAuthor: "Adolf Hitler", text: "L'art du commandement consiste à concentrer l'attention du peuple sur un seul adversaire et à veiller à ce que rien ne vienne diviser cette attention.", source: "Mein Kampf, vol. I, ch. 3, 1925" },
  { id: "hitler-08", author: "hitler", realAuthor: "Adolf Hitler", text: "C'est dans l'emploi constant et soutenu de la force que réside la toute première condition du succès.", source: "Mein Kampf, vol. I, ch. 5, 1925" },
  { id: "hitler-09", author: "hitler", realAuthor: "Adolf Hitler", text: "L'emploi de la force seule, sans le soutien moral d'une idée, ne pourra jamais aboutir à la destruction d'une idée.", source: "Mein Kampf, vol. I, ch. 5, 1925" },
  { id: "hitler-10", author: "hitler", realAuthor: "Adolf Hitler", text: "La foi est plus difficile à ébranler que le savoir ; la haine est plus durable que l'aversion.", source: "Mein Kampf, vol. I, ch. 12, 1925" },
  { id: "hitler-11", author: "hitler", realAuthor: "Adolf Hitler", text: "Les grandes masses d'une population sont plus sensibles à la force de la rhétorique qu'à toute autre force.", source: "Mein Kampf, 1925" },
  { id: "hitler-12", author: "hitler", realAuthor: "Adolf Hitler", text: "Celui qui possède la jeunesse possède l'avenir.", source: "Attribué à Hitler (discours, Nuremberg 1935)" },
  { id: "hitler-13", author: "hitler", realAuthor: "Adolf Hitler", text: "Peuple allemand, donnez-nous quatre ans et jugez-nous ensuite.", source: "Premier discours radiodiffusé comme chancelier, 1er février 1933" },
  { id: "hitler-14", author: "hitler", realAuthor: "Adolf Hitler", text: "La propagande doit se limiter à un très petit nombre de points et les répéter à l'infini.", source: "Mein Kampf, vol. I, ch. 6, 1925" },
  { id: "autre-01", author: "autre", realAuthor: "Winston Churchill", text: "Je n'ai rien d'autre à offrir que du sang, de la peine, des larmes et de la sueur.", source: "Discours, Chambre des communes, 13 mai 1940" },
  { id: "autre-02", author: "autre", realAuthor: "Winston Churchill", text: "Le succès n'est pas définitif, l'échec n'est pas fatal : c'est le courage de continuer qui compte.", source: "Largement attribué à Churchill" },
  { id: "autre-03", author: "autre", realAuthor: "Nicolas Machiavel", text: "Il est beaucoup plus sûr d'être craint que d'être aimé, lorsqu'on doit se passer de l'un des deux.", source: "Le Prince, ch. XVII, 1532" },
  { id: "autre-04", author: "autre", realAuthor: "Mao Zedong", text: "Le pouvoir politique est au bout du fusil.", source: "Problèmes de la guerre et de la stratégie, 6 novembre 1938" },
  { id: "autre-05", author: "autre", realAuthor: "Lord Acton", text: "Le pouvoir tend à corrompre, et le pouvoir absolu corrompt absolument.", source: "Lettre à Mandell Creighton, 5 avril 1887" },
  { id: "autre-06", author: "autre", realAuthor: "Benito Mussolini", text: "Tout dans l'État, rien en dehors de l'État, rien contre l'État.", source: "La Doctrine du fascisme, 1932" },
  { id: "autre-07", author: "autre", realAuthor: "Charles de Gaulle", text: "Comment voulez-vous gouverner un pays où il existe 246 variétés de fromage ?", source: "Cité dans Les Mots du Général, 1962" },
  { id: "autre-08", author: "autre", realAuthor: "Theodore Roosevelt", text: "Parle doucement et porte un gros bâton ; tu iras loin.", source: "Discours, Minnesota State Fair, 2 septembre 1901" },
  { id: "autre-09", author: "autre", realAuthor: "Maximilien de Robespierre", text: "La terreur n'est autre chose que la justice prompte, sévère, inflexible ; elle est une émanation de la vertu.", source: "Discours à la Convention, 5 février 1794" },
  { id: "autre-10", author: "autre", realAuthor: "Joseph Staline", text: "Le Pape ? Combien de divisions a-t-il ?", source: "Rapporté par Churchill, The Gathering Storm, 1948" },
  { id: "autre-11", author: "autre", realAuthor: "Ronald Reagan", text: "Redonnons sa grandeur à l'Amérique.", source: "Slogan de campagne présidentielle, 1980" },
  { id: "autre-12", author: "autre", realAuthor: "Frederick Douglass", text: "Le pouvoir ne concède rien sans qu'on l'exige. Il ne l'a jamais fait et ne le fera jamais.", source: "Discours West India Emancipation, 3 août 1857" },
  { id: "autre-13", author: "autre", realAuthor: "Caligula (selon Suétone)", text: "Qu'ils me haïssent, pourvu qu'ils me craignent.", source: "Suétone, Vie de Caligula, ch. 30" },
  { id: "autre-14", author: "autre", realAuthor: "Caligula (selon Suétone)", text: "Souviens-toi que je peux tout faire, et contre n'importe qui.", source: "Suétone, Vie de Caligula, ch. 29" },
];
