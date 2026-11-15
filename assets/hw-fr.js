// Français (Quebec sheets): orthographe, grammaire, conjugaison et vocabulaire, de la 1re année à Secondaire 5.
// Les listes sont groupées par niveau de départ; une feuille utilise son niveau et quelques niveaux en dessous.
'use strict';
window.HWLIB = window.HWLIB || {};
window.HWLIB.F = function (H) {
  var Q = H.Q, pick = H.pick, shuffle = H.shuffle, sample = H.sample, esc = H.esc, circ = H.circ, ri = H.ri, BL = H.BL, BLS = H.BLS, BLM = H.BLM, BLL = H.BLL, BOX = H.BOX;
  var W = H.W;

  var ORTHO = {
    1: ['maison|meson|maizon', 'chat|cha|chaa', 'école|écol|ékole', 'ami|amit|ammi', 'bateau|bato|batau', 'lapin|lapain|lappin', 'soleil|solei|soleille', 'pomme|pome|pomm',
      'jouer|jouerr|joueir', 'rouge|rouje|roug', 'merci|mersi|merçi', 'beau|bô|bau', 'vélo|vélot|velo', 'livre|livr|lyvre', 'fleur|fleure|flœur', 'neige|nège|nèje'],
    3: ['beaucoup|bocoup|beaucou', 'maintenant|maintenent|maintnant', 'toujours|toujour|toujourss', 'aujourd’hui|aujourdhui|aujourd’ui', 'pourquoi|pourkoi|pourquoit',
      'longtemps|longtemp|lontemps', 'ensemble|ansemble|ensembl', 'quelquefois|quelqufois|quelquefoi', 'souvent|souvant|souvan', 'hiver|iver|hivere',
      'oiseau|oizeau|oisot', 'grand-mère|grand-mére|grandmère', 'dimanche|dimenche|dimanch', 'ordinateur|ordinatteur|ordinateure'],
    5: ['différent|différant|diférent', 'développer|dévelloper|déveloper', 'environnement|environement|envirronnement', 'malheureusement|malheureusemant|malheureusment',
      'apercevoir|appercevoir|apercevoire', 'immédiatement|immédiatemment|imédiatement', 'personnage|personage|personnnage', 'connaissance|conaissance|connaisance',
      'gentiment|gentimment|gentillement', 'nécessaire|nécéssaire|néssessaire', 'rythme|rhythme|rytme', 'courrier|courier|courrié'],
    8: ['accueillir|acceuillir|accueuillir', 'occurrence|occurence|ocurrence', 'parallèle|parralèle|paralèle', 'développement|dévelopement|dévellopement',
      'intéressant|interressant|intéresant', 'acquérir|aquérir|acquérire', 'conscience|consience|conscciance', 'exagérer|exaggérer|exajérer', 'hypothèse|hypotèse|hipothèse',
      'chrysanthème|chrisanthème|chrysantème', 'abréviation|abbréviation|abrévation', 'appeler|apeler|appeller']
  };
  var HOMO = {
    1: ['Il ___ un chien.|a|à', 'Je vais ___ l’école.|à|a', 'Le chat ___ le chien jouent.|et|est', 'Le ciel ___ bleu.|est|et', 'C’est ___ livre.|mon|mont', 'Il a ___ ans.|sept|cet'],
    2: ['Ils ___ contents.|sont|son', 'Léa range ___ sac.|son|sont', '___ joue dehors.|On|Ont', 'Ils ___ faim.|ont|on', 'Tu veux du lait ___ du jus?|ou|où', '___ est ta tuque?|Où|Ou',
      'J’aime ___ chaussures.|mes|mais', 'Il pleut, ___ je sors.|mais|mes'],
    4: ['Il prend ___ crayons.|ses|ces', '___ arbres sont grands.|Ces|Ses', '___ chat est noir.|Ce|Se', 'Il ___ lave les mains.|se|ce', 'Pose-le ___-bas.|là|la',
      'Elle ___ vu hier.|l’a|la', 'Il ___ courir vite.|peut|peu', 'Il mange très ___.|peu|peut', 'Je ___ venir demain.|peux|peut', 'Ils ont pris ___ manteaux.|leurs|leur'],
    6: ['___ beau projet!|Quel|Quelle', '___ belle journée!|Quelle|Qu’elle', 'Je pense ___ viendra.|qu’elle|quelle', '___ un bon film.|C’est|S’est|Ces',
      'Il ___ blessé au genou.|s’est|c’est', 'Il est parti ___ rien dire.|sans|s’en|cent', 'Il ___ va demain.|s’en|sans|cent', 'Ils ___ entraînés.|se sont|ce sont',
      '___ mes amis.|Ce sont|Se sont', 'Je ___ donne mon livre.|leur|leurs'],
    9: ['Il faut ___ tu partes.|que|quoique', '___ il pleuve, nous sortirons.|Quoiqu’|Quoi qu’', '___ tu dises, j’irai.|Quoi que|Quoique', 'Il est ___ tard.|plutôt|plus tôt',
      'Je suis arrivé ___ que prévu.|plus tôt|plutôt', 'Il ___ fallu partir.|a|à', '___ que soit ta décision…|Quelle|Quel']
  };
  var CLASSE = {
    1: ['nom|Le <u>chien</u> <u>court</u> <u>vite</u>.|chien|court|vite', 'verbe|Le chat <u>mange</u> sa <u>petite</u> <u>souris</u>.|mange|petite|souris',
      'déterminant|<u>La</u> <u>fille</u> <u>chante</u>.|La|fille|chante', 'adjectif|Une <u>grande</u> <u>maison</u> <u>brille</u>.|grande|maison|brille',
      'nom|Mon <u>frère</u> <u>joue</u> <u>dehors</u>.|frère|joue|dehors', 'verbe|Les oiseaux <u>volent</u> <u>haut</u> dans le <u>ciel</u>.|volent|haut|ciel'],
    3: ['pronom|<u>Elle</u> <u>lit</u> un <u>livre</u>.|Elle|lit|livre', 'adverbe|Il parle <u>doucement</u> à son <u>bébé</u> <u>endormi</u>.|doucement|bébé|endormi',
      'adjectif|Le <u>vieux</u> <u>pont</u> <u>craque</u>.|vieux|pont|craque', 'déterminant|<u>Ces</u> <u>pommes</u> <u>rouges</u> sont bonnes.|Ces|pommes|rouges',
      'pronom|<u>Nous</u> <u>partons</u> <u>demain</u>.|Nous|partons|demain', 'adverbe|Le train arrive <u>bientôt</u> à la <u>gare</u> <u>centrale</u>.|bientôt|gare|centrale'],
    5: ['préposition|Le chat dort <u>sous</u> la <u>table</u> <u>basse</u>.|sous|table|basse', 'conjonction|Il pleut, <u>mais</u> nous <u>sortons</u> <u>quand même</u>.|mais|sortons|quand même',
      'préposition|Elle marche <u>vers</u> la <u>rivière</u> <u>gelée</u>.|vers|rivière|gelée', 'conjonction|Je mange une pomme <u>et</u> une <u>poire</u> <u>juteuse</u>.|et|poire|juteuse',
      'adverbe|Les élèves travaillent <u>sérieusement</u> <u>aujourd’hui</u> en <u>classe</u>.|sérieusement|classe|aujourd’hui', 'pronom|Le livre <u>que</u> je <u>lis</u> est <u>long</u>.|que|lis|long'],
    8: ['complément direct|Marie <u>regarde</u> <u>le film</u> <u>ce soir</u>.|le film|regarde|ce soir', 'attribut du sujet|Le ciel <u>devient</u> <u>gris</u> <u>lentement</u>.|gris|devient|lentement',
      'complément indirect|Il <u>parle</u> <u>à son ami</u> <u>souvent</u>.|à son ami|parle|souvent', 'complément de phrase|<u>Hier soir</u>, nous <u>avons mangé</u> <u>des pâtes</u>.|Hier soir|avons mangé|des pâtes',
      'sujet|<u>Mes amis</u> <u>préparent</u> <u>un spectacle</u>.|Mes amis|préparent|un spectacle']
  };
  var FEM = ['acteur|actrice', 'boulanger|boulangère', 'chanteur|chanteuse', 'lion|lionne', 'directeur|directrice', 'ami|amie', 'cousin|cousine', 'voisin|voisine',
    'chien|chienne', 'champion|championne', 'coiffeur|coiffeuse', 'roi|reine', 'prince|princesse', 'infirmier|infirmière', 'musicien|musicienne', 'loup|louve'];
  var PLUR = ['cheval|chevaux', 'journal|journaux', 'bateau|bateaux', 'jeu|jeux', 'clou|clous', 'bijou|bijoux', 'genou|genoux', 'travail|travaux', 'œil|yeux',
    'festival|festivals', 'pneu|pneus', 'chapeau|chapeaux', 'animal|animaux', 'hibou|hiboux', 'bal|bals', 'nez|nez', 'prix|prix', 'feu|feux', 'caillou|cailloux', 'détail|détails'];
  var SYN = {
    1: ['content|heureux', 'grand|haut', 'vite|rapidement', 'petit|minuscule', 'joli|beau', 'parler|dire', 'commencer|débuter', 'finir|terminer'],
    4: ['peur|crainte', 'triste|malheureux', 'regarder|observer', 'difficile|ardu', 'rapide|prompt', 'maison|demeure', 'crier|hurler', 'aider|secourir', 'célèbre|connu'],
    7: ['abondant|copieux', 'éphémère|passager', 'tenace|persévérant', 'lucide|clairvoyant', 'audacieux|téméraire', 'hostile|inamical', 'paisible|tranquille', 'méticuleux|minutieux']
  };
  var ANT = {
    1: ['chaud|froid', 'grand|petit', 'jour|nuit', 'monter|descendre', 'ouvrir|fermer', 'propre|sale', 'gagner|perdre', 'rire|pleurer', 'lent|rapide', 'vide|plein'],
    4: ['courageux|peureux', 'généreux|avare', 'ancien|moderne', 'accepter|refuser', 'augmenter|diminuer', 'entrée|sortie', 'poli|impoli', 'léger|lourd', 'calme|agité'],
    7: ['optimiste|pessimiste', 'abondance|pénurie', 'éphémère|durable', 'modeste|orgueilleux', 'concis|bavard', 'louer|blâmer', 'novice|expert', 'clair|obscur']
  };
  var TYPES = ['Ferme la porte.|impérative', 'Où est mon sac?|interrogative', 'Quelle belle journée!|exclamative', 'Le lac est gelé.|déclarative', 'Viens ici, s’il te plaît.|impérative',
    'As-tu fini tes devoirs?|interrogative', 'Comme il fait froid!|exclamative', 'Les oies partent au sud.|déclarative', 'Range ta chambre.|impérative', 'Qui a gagné?|interrogative'];
  var CAPS = ['le chat de julie dort sur le sofa', 'nous irons à montréal en juillet', 'mon ami lucas habite à gatineau', 'le fleuve saint-laurent est très long',
    'en hiver, on patine sur le canal', 'est-ce que tu viens au parc', 'ma tante vit à québec', 'quelle belle surprise', 'samedi, nous visiterons le musée',
    'le rocher percé est en gaspésie', 'zoé et félix jouent au hockey'];
  var PONCT = {
    4: ['J’ai acheté des pommes des poires et des bananes', 'Léa as-tu vu mon chat', 'Oh non j’ai oublié mon lunch', 'Mon frère qui a dix ans joue au soccer'],
    7: ['Il pleuvait pourtant nous sommes sortis', 'Elle a dit « Je reviens demain »', 'Voici ma liste du pain du lait et des œufs', 'Quand la cloche sonne les élèves sortent',
      'Montréal la plus grande ville du Québec est sur une île'],
    10: ['Les résultats étaient clairs l’expérience avait échoué', 'Il y avait deux choix rester ou partir', 'Selon l’auteur « le savoir est une arme »']
  };
  var FIGURES = {
    5: ['Il est rusé comme un renard.|comparaison|métaphore|hyperbole', 'Le vent chante dans les arbres.|personnification|comparaison|hyperbole',
      'J’ai une faim de loup.|hyperbole|personnification|comparaison', 'Cette fille est un rayon de soleil.|métaphore|comparaison|personnification',
      'La lune nous sourit.|personnification|comparaison|hyperbole'],
    8: ['Je t’ai dit mille fois de ranger ta chambre!|hyperbole|euphémisme|antithèse', 'Il nous a quittés (pour « il est mort »).|euphémisme|hyperbole|métaphore',
      'Un silence assourdissant.|oxymore|comparaison|euphémisme', 'Paris, la Ville lumière.|périphrase|oxymore|antithèse', 'Je meurs de rire.|hyperbole|euphémisme|oxymore',
      'Le jour et la nuit, la joie et la peine.|antithèse|périphrase|hyperbole', 'Boire un verre.|métonymie|métaphore|euphémisme']
  };
  var PP = [
    'Les filles sont ___ au parc. (aller)|allées|allé|allés', 'Marie est ___ tôt. (partir)|partie|parti|parties', 'Les garçons sont ___ tard. (rentrer)|rentrés|rentré|rentrées',
    'Nous avons ___ nos devoirs. (finir)|fini|finis|finies', 'Les pommes que j’ai ___ sont bonnes. (cueillir)|cueillies|cueilli|cueillis',
    'Elle a ___ une lettre. (écrire)|écrit|écrite|écrits', 'Les lettres qu’elle a ___ sont longues. (écrire)|écrites|écrit|écrite',
    'Ils se sont ___ les mains. (laver)|lavé|lavés|lavées', 'Elles se sont ___ tôt. (lever)|levées|levé|levés', 'La porte est ___. (fermer)|fermée|fermé|fermés'
  ];

  function bands(obj, g, L) {
    var keys = Object.keys(obj).map(Number).filter(function (b) { return b <= g && b >= g - 5; });
    if (!keys.length) keys = [Math.min.apply(null, Object.keys(obj).map(Number))];
    if (L === 'easy' && keys.length > 1) keys = keys.slice(0, -1);
    var out = [];
    keys.forEach(function (b) { out = out.concat(obj[b]); });
    return out;
  }
  var TENSES = { 1: ['present'], 2: ['present'], 3: ['present', 'proche'], 4: ['present', 'pc', 'proche'], 5: ['present', 'pc', 'imparfait'], 6: ['pc', 'imparfait', 'futur'],
    7: ['pc', 'imparfait', 'futur', 'cond'], 8: ['imparfait', 'futur', 'cond', 'subj'], 9: ['futur', 'cond', 'subj', 'pc'], 10: ['cond', 'subj', 'imparfait', 'futur'], 11: ['subj', 'cond', 'futur', 'pc'] };
  var VERBS = { 1: ['être', 'avoir', 'aimer', 'jouer', 'parler'], 3: ['être', 'avoir', 'aller', 'faire', 'aimer', 'jouer', 'manger', 'finir'],
    5: ['être', 'avoir', 'aller', 'faire', 'finir', 'choisir', 'vendre', 'prendre', 'voir', 'manger', 'commencer'],
    8: ['être', 'avoir', 'aller', 'faire', 'finir', 'vendre', 'prendre', 'voir', 'venir', 'pouvoir', 'vouloir', 'savoir', 'devoir', 'recevoir', 'écrire', 'lire'] };

  function kinds(grade) {
    var g = Number(grade);
    return function (L) {
      var ortho = bands(ORTHO, g, L), homo = bands(HOMO, g, L), cl = bands(CLASSE, g, L), syn = bands(SYN, g, L), ant = bands(ANT, g, L);
      var k = [
        function (R) { var p = pick(R, ortho).split('|'); return Q('or:' + p[0], 'Encercle le mot bien écrit :' + circ(shuffle(R, p.map(function (w) { return w.replace('?', ''); })))); },
        function (R) { var p = pick(R, homo).split('|'); return Q('ho:' + p[0], esc(p[0]).replace('___', BLS) + circ(shuffle(R, p.slice(1)))); },
        function (R) { var p = pick(R, cl).split('|'); return Q('cl:' + p[1], 'Encercle le <b>' + p[0] + '</b> : ' + p[1].replace(/<u>|<\/u>/g, '') + circ(shuffle(R, p.slice(2)))); },
        function (R) { var p = pick(R, syn).split('|'); return Q('sy:' + p[0], 'Un synonyme de <b>' + esc(p[0]) + '</b> : ' + BLM); },
        function (R) { var p = pick(R, ant).split('|'); return Q('an:' + p[0], 'Le contraire de <b>' + esc(p[0]) + '</b> : ' + BLM); },
        W.frVerbs({ verbs: bands(VERBS, g, L), tenses: TENSES[g] || TENSES[11], choice: g <= 6 })
      ];
      if (g <= 6) k.push(W.frGender(g <= 2 ? ['animals', 'food', 'school'] : ['animals', 'food', 'school', 'clothes', 'body', 'house']));
      if (g >= 2 && g <= 7) k.push(H.pairKind(PLUR, function (p) { return 'Écris au pluriel : un ' + esc(p[0]) + ' → des ' + BLM; }, 'pl'));
      if (g >= 2 && g <= 6) k.push(H.pairKind(FEM, function (p) { return 'Écris au féminin : un ' + esc(p[0]) + ' → une ' + BLM; }, 'fe'));
      if (g >= 3) k.push(W.frAgree());
      if (g <= 6) k.push(function (R) { var p = pick(R, TYPES).split('|'); return Q('ty:' + p[0], esc(p[0]) + circ(['déclarative', 'interrogative', 'exclamative', 'impérative'])); });
      if (g >= 2 && g <= 6) k.push(H.lineKind(CAPS, 'Récris avec les majuscules et la ponctuation :', 'ma'));
      if (g >= 4) k.push(function (R) { var s = pick(R, bands(PONCT, g, L)); return Q('po:' + s, 'Ajoute la ponctuation : <i>' + esc(s) + '</i>' + BLL); });
      if (g >= 4) k.push(W.frNegate());
      if (g >= 5) k.push(function (R) { var p = pick(R, bands(FIGURES, g, L)).split('|'); return Q('fi:' + p[0], esc(p[0]) + circ(shuffle(R, p.slice(1)))); });
      if (g >= 6) k.push(function (R) { var p = pick(R, PP).split('|'); return Q('pp:' + p[0], esc(p[0]).replace('___', BLS) + circ(shuffle(R, p.slice(1)))); });
      if (g >= 5 && L === 'hard') k.push(W.frVerbs({ verbs: bands(VERBS, g, L), tenses: TENSES[g] || TENSES[11] }));
      return k;
    };
  }
  return { kinds: kinds };
};
