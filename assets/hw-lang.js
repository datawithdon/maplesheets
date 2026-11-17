// Language question makers: French as a second language (English sheets), English as a second
// language (Quebec sheets), French grammar (Quebec sheets) and English grammar helpers.
'use strict';
window.HWLIB = window.HWLIB || {};
window.HWLIB.W = function (H) {
  var ri = H.ri, pick = H.pick, shuffle = H.shuffle, sample = H.sample, esc = H.esc, circ = H.circ, Q = H.Q;
  var BL = H.BL, BLS = H.BLS, BLM = H.BLM, BLL = H.BLL;
  var fr = H.lang() === 'fr';
  function T(en, f) { return fr ? f : en; }
  function lv(o, L) { return o && typeof o === 'object' && !Array.isArray(o) && ('easy' in o || 'medium' in o || 'hard' in o) ? o[L] : o; }

  // ---------- number words ----------
  var FR_U = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize'];
  var FR_T = { 2: 'vingt', 3: 'trente', 4: 'quarante', 5: 'cinquante', 6: 'soixante' };
  function frNum(k) {
    if (k === 100) return 'cent';
    if (k < 17) return FR_U[k];
    if (k < 20) return 'dix-' + FR_U[k - 10];
    var t = Math.floor(k / 10), u = k % 10;
    if (t === 7) return u === 1 ? 'soixante et onze' : 'soixante-' + frNum(10 + u);
    if (t === 8) return u === 0 ? 'quatre-vingts' : 'quatre-vingt-' + FR_U[u];
    if (t === 9) return 'quatre-vingt-' + frNum(10 + u);
    return u === 0 ? FR_T[t] : u === 1 ? FR_T[t] + ' et un' : FR_T[t] + '-' + FR_U[u];
  }
  var EN_U = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
    'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  var EN_T = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  function enNum(k) {
    if (k === 100) return 'one hundred';
    if (k < 20) return EN_U[k];
    return EN_T[Math.floor(k / 10)] + (k % 10 ? '-' + EN_U[k % 10] : '');
  }
  // second-language number words: French words on English sheets, English words on Quebec sheets
  function numWords(max) {
    return function (R, L) {
      var top = lv(max, L), k = ri(R, 0, top), w = fr ? enNum : frNum;
      if (R() < 0.5) return Q('nw:' + k, T('Write the number:', 'Écris le nombre :') + ' <b>' + w(k) + '</b> = ' + BLS, String(k));
      var pool = []; for (var i = 0; i <= top; i++) if (i !== k) pool.push(i);
      var near = pool.filter(function (x) { return Math.abs(x - k) <= 12; });
      return Q('nw:' + k, T('Circle', 'Encercle') + ' <b>' + k + '</b>' + T(':', ' :') + circ(shuffle(R, sample(R, near.length >= 2 ? near : pool, 2).concat([k]).map(w))), w(k));
    };
  }

  // ---------- vocabulary: "french|english|gender" (gender m/f for nouns) ----------
  var VOCAB = {
    colours: ['rouge|red', 'bleu|blue', 'vert|green', 'jaune|yellow', 'orange|orange', 'rose|pink', 'violet|purple', 'noir|black', 'blanc|white', 'brun|brown', 'gris|grey'],
    greetings: ['bonjour|hello', 'au revoir|goodbye', 'merci|thank you', 'bonne nuit|good night', 's’il vous plaît|please', 'salut|hi', 'oui|yes', 'non|no',
      'bonsoir|good evening', 'de rien|you’re welcome'],
    animals: ['chat|cat|m', 'chien|dog|m', 'oiseau|bird|m', 'poisson|fish|m', 'lapin|rabbit|m', 'cheval|horse|m', 'vache|cow|f', 'cochon|pig|m', 'mouton|sheep|m',
      'canard|duck|m', 'souris|mouse|f', 'ours|bear|m', 'grenouille|frog|f', 'tortue|turtle|f', 'castor|beaver|m', 'orignal|moose|m', 'baleine|whale|f', 'renard|fox|m'],
    family: ['mère|mother|f', 'père|father|m', 'sœur|sister|f', 'frère|brother|m', 'grand-mère|grandmother|f', 'grand-père|grandfather|m', 'bébé|baby|m',
      'tante|aunt|f', 'oncle|uncle|m', 'famille|family|f', 'cousin|cousin|m', 'fille|daughter|f', 'fils|son|m'],
    days: ['lundi|Monday', 'mardi|Tuesday', 'mercredi|Wednesday', 'jeudi|Thursday', 'vendredi|Friday', 'samedi|Saturday', 'dimanche|Sunday'],
    months: ['janvier|January', 'février|February', 'mars|March', 'avril|April', 'mai|May', 'juin|June', 'juillet|July', 'août|August', 'septembre|September',
      'octobre|October', 'novembre|November', 'décembre|December'],
    body: ['tête|head|f', 'main|hand|f', 'pied|foot|m', 'nez|nose|m', 'bouche|mouth|f', 'œil|eye|m', 'oreille|ear|f', 'bras|arm|m', 'jambe|leg|f', 'dos|back|m',
      'cou|neck|m', 'genou|knee|m', 'dent|tooth|f', 'cheveux|hair'],
    food: ['pomme|apple|f', 'pain|bread|m', 'lait|milk|m', 'fromage|cheese|m', 'eau|water|f', 'gâteau|cake|m', 'œuf|egg|m', 'banane|banana|f', 'carotte|carrot|f',
      'poulet|chicken|m', 'soupe|soup|f', 'riz|rice|m', 'jus|juice|m', 'beurre|butter|m', 'fraise|strawberry|f', 'poisson|fish|m', 'sandwich|sandwich|m'],
    school: ['livre|book|m', 'crayon|pencil|m', 'gomme|eraser|f', 'école|school|f', 'sac à dos|backpack|m', 'règle|ruler|f', 'papier|paper|m', 'chaise|chair|f',
      'table|table|f', 'ciseaux|scissors', 'cahier|notebook|m', 'tableau|board|m', 'bureau|desk|m', 'classe|class|f', 'enseignant|teacher|m'],
    clothes: ['chapeau|hat|m', 'manteau|coat|m', 'chemise|shirt|f', 'pantalon|pants|m', 'robe|dress|f', 'jupe|skirt|f', 'chaussure|shoe|f', 'botte|boot|f',
      'tuque|winter hat|f', 'mitaine|mitten|f', 'chaussette|sock|f', 'foulard|scarf|m', 'chandail|sweater|m'],
    weather: ['il fait chaud|it is hot', 'il fait froid|it is cold', 'il pleut|it is raining', 'il neige|it is snowing', 'il fait beau|the weather is nice',
      'il fait du vent|it is windy', 'il fait soleil|it is sunny', 'il fait mauvais|the weather is bad', 'il y a des nuages|it is cloudy'],
    house: ['maison|house|f', 'cuisine|kitchen|f', 'chambre|bedroom|f', 'salle de bain|bathroom|f', 'salon|living room|m', 'porte|door|f', 'fenêtre|window|f',
      'lit|bed|m', 'jardin|garden|m', 'toit|roof|m', 'escalier|stairs|m', 'cour|yard|f'],
    town: ['bibliothèque|library|f', 'parc|park|m', 'magasin|store|m', 'hôpital|hospital|m', 'piscine|swimming pool|f', 'épicerie|grocery store|f', 'rue|street|f',
      'gare|train station|f', 'banque|bank|f', 'restaurant|restaurant|m', 'musée|museum|m', 'aréna|arena|m', 'pharmacie|pharmacy|f', 'boulangerie|bakery|f'],
    sports: ['hockey|hockey|m', 'natation|swimming|f', 'soccer|soccer|m', 'ski|skiing|m', 'patinage|skating|m', 'vélo|bike riding|m', 'course|running|f',
      'basketball|basketball|m', 'danse|dance|f', 'raquette|snowshoeing|f'],
    feelings: ['content|happy', 'triste|sad', 'fâché|angry', 'fatigué|tired', 'malade|sick', 'nerveux|nervous', 'fier|proud', 'surpris|surprised', 'calme|calm',
      'excité|excited'],
    verbs: ['manger|to eat', 'boire|to drink', 'parler|to speak', 'écouter|to listen', 'regarder|to watch', 'jouer|to play', 'aimer|to like', 'aller|to go',
      'venir|to come', 'faire|to do', 'lire|to read', 'écrire|to write', 'dormir|to sleep', 'courir|to run', 'chanter|to sing', 'danser|to dance', 'finir|to finish',
      'choisir|to choose', 'vendre|to sell', 'attendre|to wait', 'prendre|to take', 'voir|to see', 'savoir|to know', 'vouloir|to want', 'pouvoir|to be able to',
      'apprendre|to learn', 'comprendre|to understand', 'acheter|to buy', 'travailler|to work', 'voyager|to travel'],
    adjectives: ['grand|big', 'petit|small', 'nouveau|new', 'vieux|old', 'beau|beautiful', 'facile|easy', 'difficile|difficult', 'rapide|fast', 'lent|slow',
      'chaud|hot', 'froid|cold', 'jeune|young', 'drôle|funny', 'gentil|kind', 'fort|strong', 'intelligent|smart', 'paresseux|lazy', 'timide|shy', 'sportif|athletic'],
    jobs: ['médecin|doctor|m', 'infirmière|nurse|f', 'pompier|firefighter|m', 'policier|police officer|m', 'agriculteur|farmer|m', 'avocat|lawyer|m',
      'ingénieur|engineer|m', 'dentiste|dentist|m', 'cuisinier|cook|m', 'pilote|pilot|m', 'vétérinaire|veterinarian|m', 'artiste|artist|m', 'scientifique|scientist|m'],
    nature: ['arbre|tree|m', 'fleur|flower|f', 'lac|lake|m', 'rivière|river|f', 'montagne|mountain|f', 'forêt|forest|f', 'soleil|sun|m', 'lune|moon|f',
      'étoile|star|f', 'neige|snow|f', 'pluie|rain|f', 'mer|sea|f', 'plage|beach|f', 'île|island|f', 'feuille|leaf|f', 'ciel|sky|m', 'nuage|cloud|m'],
    tech: ['ordinateur|computer|m', 'téléphone|phone|m', 'écran|screen|m', 'clavier|keyboard|m', 'courriel|email|m', 'site web|website|m', 'mot de passe|password|m',
      'jeu vidéo|video game|m', 'application|app|f', 'imprimante|printer|f'],
    travel: ['avion|plane|m', 'train|train|m', 'autobus|bus|m', 'voiture|car|f', 'bateau|boat|m', 'billet|ticket|m', 'valise|suitcase|f', 'carte|map|f',
      'passeport|passport|m', 'hôtel|hotel|m', 'aéroport|airport|m', 'vacances|vacation'],
    environment: ['recycler|to recycle', 'pollution|pollution|f', 'énergie|energy|f', 'déchets|garbage', 'climat|climate|m', 'protéger|to protect',
      'environnement|environment|m', 'gaspiller|to waste', 'planète|planet|f', 'espèce|species|f', 'compost|compost|m', 'sécheresse|drought|f'],
    abstract: ['liberté|freedom|f', 'paix|peace|f', 'amitié|friendship|f', 'courage|courage|m', 'avenir|future|m', 'santé|health|f', 'connaissance|knowledge|f',
      'société|society|f', 'gouvernement|government|m', 'droit|right (law)|m', 'citoyen|citizen|m', 'culture|culture|f', 'histoire|history|f', 'débat|debate|m']
  };
  function vocab(topics) {
    var out = [];
    topics.forEach(function (t) { VOCAB[t].forEach(function (s) { var p = s.split('|'); out.push({ fr: p[0], en: p[1], g: p[2] || '', topic: t }); }); });
    return out;
  }
  // which side the child is learning: French on English sheets, English on Quebec sheets
  function tgt(w) { return fr ? w.en : w.fr; }
  function home(w) { return fr ? w.fr : w.en; }
  function vocabKinds(topicsByLevel, opts) {
    opts = opts || {};
    function words(L) { return vocab(lv(topicsByLevel, L)); }
    function same(list, w) { return list.filter(function (x) { return x.topic === w.topic && x !== w && tgt(x) !== tgt(w); }); }
    var circleIt = function (R, L) {
      var v = words(L), w = pick(R, v), ch = sample(R, same(v, w), 2).map(tgt).concat([tgt(w)]);
      return Q('vc:' + w.fr, T('Circle the French word for <b>' + esc(w.en) + '</b>:', 'Encercle le mot anglais pour <b>' + esc(w.fr) + '</b> :') + circ(shuffle(R, ch)), esc(tgt(w)));
    };
    var meaning = function (R, L) {
      var v = words(L), w = pick(R, v), ch = sample(R, same(v, w), 2).map(home).concat([home(w)]);
      return Q('vm:' + w.fr, T('What does <b>' + esc(w.fr) + '</b> mean?', 'Que veut dire <b>' + esc(w.en) + '</b>?') + circ(shuffle(R, ch)), esc(home(w)));
    };
    var write = function (R, L) {
      var w = pick(R, words(L)), toTarget = opts.writeTarget && lv(opts.writeTarget, L);
      if (toTarget) return Q('vw:' + w.fr, T('Write it in French:', 'Écris-le en anglais :') + ' <b>' + esc(home(w)) + '</b> → ' + BLM, esc(tgt(w)));
      return Q('vw:' + w.fr, T('Write it in English:', 'Écris-le en français :') + ' <b>' + esc(tgt(w)) + '</b> → ' + BLM, esc(home(w)));
    };
    return [circleIt, meaning, write];
  }
  function oddOne(topics) {
    return function (R, L) {
      var tps = sample(R, lv(topics, L), 2), a = sample(R, vocab([tps[0]]), 3), b = pick(R, vocab([tps[1]]));
      return Q('odd:' + a.map(tgt).join() + tgt(b), T('Circle the word that does not belong:', 'Encercle l’intrus :') + circ(shuffle(R, a.concat([b]).map(tgt))), esc(tgt(b)));
    };
  }

  // ---------- French verbs ----------
  var SUBJ = ['je', 'tu', 'il', 'elle', 'on', 'nous', 'vous', 'ils', 'elles'];
  var PERSON = { je: 0, tu: 1, il: 2, elle: 2, on: 2, nous: 3, vous: 4, ils: 5, elles: 5 };
  var IRR = {
    'être': ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'], avoir: ['ai', 'as', 'a', 'avons', 'avez', 'ont'], aller: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'],
    faire: ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'], vouloir: ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'],
    pouvoir: ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'], prendre: ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'],
    apprendre: ['apprends', 'apprends', 'apprend', 'apprenons', 'apprenez', 'apprennent'], comprendre: ['comprends', 'comprends', 'comprend', 'comprenons', 'comprenez', 'comprennent'],
    venir: ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'], dire: ['dis', 'dis', 'dit', 'disons', 'dites', 'disent'],
    voir: ['vois', 'vois', 'voit', 'voyons', 'voyez', 'voient'], savoir: ['sais', 'sais', 'sait', 'savons', 'savez', 'savent'],
    lire: ['lis', 'lis', 'lit', 'lisons', 'lisez', 'lisent'], 'écrire': ['écris', 'écris', 'écrit', 'écrivons', 'écrivez', 'écrivent'],
    partir: ['pars', 'pars', 'part', 'partons', 'partez', 'partent'], sortir: ['sors', 'sors', 'sort', 'sortons', 'sortez', 'sortent'],
    dormir: ['dors', 'dors', 'dort', 'dormons', 'dormez', 'dorment'], mettre: ['mets', 'mets', 'met', 'mettons', 'mettez', 'mettent'],
    boire: ['bois', 'bois', 'boit', 'buvons', 'buvez', 'boivent'], courir: ['cours', 'cours', 'court', 'courons', 'courez', 'courent'],
    acheter: ['achète', 'achètes', 'achète', 'achetons', 'achetez', 'achètent'], devoir: ['dois', 'dois', 'doit', 'devons', 'devez', 'doivent'],
    recevoir: ['reçois', 'reçois', 'reçoit', 'recevons', 'recevez', 'reçoivent']
  };
  var PP = { 'être': 'été', avoir: 'eu', faire: 'fait', prendre: 'pris', apprendre: 'appris', comprendre: 'compris', voir: 'vu', lire: 'lu', 'écrire': 'écrit', dire: 'dit',
    mettre: 'mis', pouvoir: 'pu', vouloir: 'voulu', savoir: 'su', boire: 'bu', courir: 'couru', dormir: 'dormi', venir: 'venu', partir: 'parti', sortir: 'sorti',
    'naître': 'né', mourir: 'mort', aller: 'allé', devoir: 'dû', recevoir: 'reçu' };
  var ETRE_VERBS = ['aller', 'venir', 'partir', 'sortir', 'arriver', 'rester', 'tomber', 'entrer', 'monter', 'descendre', 'naître', 'mourir', 'retourner', 'rentrer'];
  var FUT = { 'être': 'ser', avoir: 'aur', aller: 'ir', faire: 'fer', venir: 'viendr', pouvoir: 'pourr', vouloir: 'voudr', savoir: 'saur', voir: 'verr', courir: 'courr',
    acheter: 'achèter', devoir: 'devr', recevoir: 'recevr' };
  function present(v, p) {
    if (IRR[v]) return IRR[v][p];
    var stem = v.slice(0, -2), end = v.slice(-2);
    if (end === 'er') {
      if (p === 3 && /g$/.test(stem)) return stem + 'eons';
      if (p === 3 && /c$/.test(stem)) return stem.slice(0, -1) + 'çons';
      return stem + ['e', 'es', 'e', 'ons', 'ez', 'ent'][p];
    }
    if (end === 'ir') return stem + ['is', 'is', 'it', 'issons', 'issez', 'issent'][p];
    return stem + ['s', 's', '', 'ons', 'ez', 'ent'][p];
  }
  function participle(v) {
    if (PP[v]) return PP[v];
    var stem = v.slice(0, -2), end = v.slice(-2);
    return stem + (end === 'er' ? 'é' : end === 'ir' ? 'i' : 'u');
  }
  function imparfait(v, p) {
    var stem = v === 'être' ? 'ét' : present(v, 3).replace(/ons$/, '');
    if (/ge$/.test(stem) && p !== 3 && p !== 4) stem = stem; else if (/ge$/.test(stem)) stem = stem.slice(0, -1);
    if (/ç$/.test(stem) && (p === 3 || p === 4)) stem = stem.slice(0, -1) + 'c';
    return stem + ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'][p];
  }
  var SUBJ_IRR = { 'être': ['sois', 'sois', 'soit', 'soyons', 'soyez', 'soient'], avoir: ['aie', 'aies', 'ait', 'ayons', 'ayez', 'aient'],
    aller: ['aille', 'ailles', 'aille', 'allions', 'alliez', 'aillent'], faire: ['fasse', 'fasses', 'fasse', 'fassions', 'fassiez', 'fassent'],
    pouvoir: ['puisse', 'puisses', 'puisse', 'puissions', 'puissiez', 'puissent'], vouloir: ['veuille', 'veuilles', 'veuille', 'voulions', 'vouliez', 'veuillent'],
    savoir: ['sache', 'saches', 'sache', 'sachions', 'sachiez', 'sachent'], venir: ['vienne', 'viennes', 'vienne', 'venions', 'veniez', 'viennent'],
    prendre: ['prenne', 'prennes', 'prenne', 'prenions', 'preniez', 'prennent'], devoir: ['doive', 'doives', 'doive', 'devions', 'deviez', 'doivent'] };
  function subjonctif(v, p) {
    if (SUBJ_IRR[v]) return SUBJ_IRR[v][p];
    if (p === 3 || p === 4) return imparfait(v, p);
    return present(v, 5).replace(/ent$/, '') + ['e', 'es', 'e', '', '', 'ent'][p];
  }
  function futStem(v) { return FUT[v] || (/re$/.test(v) ? v.slice(0, -1) : v); }
  function elide(subj, verb) { return subj === 'je' && /^[aeéèêiîoôuhœ]/i.test(verb) ? 'j’' + verb : subj + ' ' + verb; }
  function conj(v, tense, s) {
    var p = PERSON[s];
    if (tense === 'present') return elide(s, present(v, p));
    if (tense === 'proche') return elide(s, IRR.aller[p]) + ' ' + v;
    if (tense === 'imparfait') return elide(s, imparfait(v, p));
    if (tense === 'futur') return elide(s, futStem(v) + ['ai', 'as', 'a', 'ons', 'ez', 'ont'][p]);
    if (tense === 'cond') return elide(s, futStem(v) + ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'][p]);
    if (tense === 'subj') return ('que ' + elide(s, subjonctif(v, p))).replace(/^que (?=il|elle|on)/, 'qu’');
    // passé composé
    if (ETRE_VERBS.indexOf(v) >= 0) {
      var pp = participle(v) + ((s === 'elle' || s === 'elles') ? 'e' : '') + ((s === 'nous' || s === 'vous' || s === 'ils' || s === 'elles') ? 's' : '');
      return elide(s, IRR['être'][p]) + ' ' + pp;
    }
    return elide(s, IRR.avoir[p]) + ' ' + participle(v);
  }
  var TENSE_FR = { present: 'présent', pc: 'passé composé', proche: 'futur proche', imparfait: 'imparfait', futur: 'futur simple', cond: 'conditionnel présent', subj: 'subjonctif présent' };
  var TENSE_EN = { present: 'present', pc: 'passé composé', proche: 'near future', imparfait: 'imparfait', futur: 'future', cond: 'conditional', subj: 'subjunctive' };
  // French verb drill (used for French as a second language and for French grammar in Quebec)
  function frVerbs(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), v = pick(R, c.verbs), tense = pick(R, c.tenses), s = pick(R, SUBJ.filter(function (x) { return x !== 'on' || c.on; }));
      var answer = conj(v, tense, s), shown = ((tense === 'subj' ? 'que ' : '') + s).replace(/^que (?=il|elle|on)/, 'qu’');
      var tn = fr ? TENSE_FR[tense] : TENSE_EN[tense];
      if (c.choice && R() < 0.5) {
        var strip = function (f) { return f.replace(/^qu(e |’)/, '').replace(/^(j’|je |tu |il |elle |on |nous |vous |ils |elles )/, ''); };
        var others = SUBJ.filter(function (x) { return PERSON[x] !== PERSON[s]; }).map(function (x) { return strip(conj(v, tense, x)); });
        var right = strip(answer);
        var opts = others.filter(function (o, i) { return o !== right && others.indexOf(o) === i; });
        return Q('fv:' + v + tense + s, H.cap(shown) + ' ' + BLS + ' (<b>' + v + '</b>, ' + tn + ')' + circ(shuffle(R, sample(R, opts, 2).concat([right]))), right);
      }
      return Q('fv:' + v + tense + s, '<b>' + v + '</b> (' + tn + ')' + T(': ', ' : ') + (tense === 'subj' ? 'Il faut ' + shown : H.cap(shown)) + ' ' + BLM, answer);
    };
  }

  // ---------- English verbs ----------
  var EN_IRR = { be: ['was', 'been'], go: ['went', 'gone'], eat: ['ate', 'eaten'], see: ['saw', 'seen'], have: ['had', 'had'], do: ['did', 'done'], make: ['made', 'made'],
    take: ['took', 'taken'], come: ['came', 'come'], give: ['gave', 'given'], write: ['wrote', 'written'], read: ['read', 'read'], run: ['ran', 'run'],
    swim: ['swam', 'swum'], sing: ['sang', 'sung'], drink: ['drank', 'drunk'], buy: ['bought', 'bought'], bring: ['brought', 'brought'], think: ['thought', 'thought'],
    catch: ['caught', 'caught'], teach: ['taught', 'taught'], find: ['found', 'found'], sleep: ['slept', 'slept'], leave: ['left', 'left'], feel: ['felt', 'felt'],
    speak: ['spoke', 'spoken'], break: ['broke', 'broken'], choose: ['chose', 'chosen'], fly: ['flew', 'flown'], grow: ['grew', 'grown'], know: ['knew', 'known'],
    draw: ['drew', 'drawn'], throw: ['threw', 'thrown'], ride: ['rode', 'ridden'], forget: ['forgot', 'forgotten'], begin: ['began', 'begun'], win: ['won', 'won'],
    sit: ['sat', 'sat'], stand: ['stood', 'stood'], tell: ['told', 'told'], say: ['said', 'said'], get: ['got', 'gotten'], fall: ['fell', 'fallen'], hide: ['hid', 'hidden'],
    wear: ['wore', 'worn'], build: ['built', 'built'], send: ['sent', 'sent'], spend: ['spent', 'spent'], lose: ['lost', 'lost'], pay: ['paid', 'paid'], hear: ['heard', 'heard'] };
  var EN_REG = ['play', 'walk', 'jump', 'talk', 'cook', 'watch', 'help', 'clean', 'stop', 'plan', 'carry', 'study', 'try', 'cry', 'dance', 'like', 'live', 'bake',
    'visit', 'open', 'listen', 'push', 'wash', 'fix', 'hop', 'shop', 'hurry', 'smile', 'climb', 'paint'];
  var EN_FR = { play: 'jouer', walk: 'marcher', jump: 'sauter', talk: 'parler', cook: 'cuisiner', watch: 'regarder', help: 'aider', clean: 'nettoyer', stop: 'arrêter',
    plan: 'planifier', carry: 'porter', study: 'étudier', try: 'essayer', cry: 'pleurer', dance: 'danser', like: 'aimer', live: 'vivre', bake: 'cuire', visit: 'visiter',
    open: 'ouvrir', listen: 'écouter', push: 'pousser', wash: 'laver', fix: 'réparer', hop: 'sautiller', shop: 'magasiner', hurry: 'se dépêcher', smile: 'sourire',
    climb: 'grimper', paint: 'peindre', go: 'aller', eat: 'manger', see: 'voir', have: 'avoir', do: 'faire', make: 'faire', take: 'prendre', come: 'venir',
    give: 'donner', write: 'écrire', read: 'lire', run: 'courir', swim: 'nager', sing: 'chanter', drink: 'boire', buy: 'acheter', bring: 'apporter',
    think: 'penser', catch: 'attraper', teach: 'enseigner', find: 'trouver', sleep: 'dormir', leave: 'partir', feel: 'sentir', speak: 'parler', break: 'casser',
    choose: 'choisir', fly: 'voler', grow: 'grandir', know: 'savoir', draw: 'dessiner', throw: 'lancer', ride: 'rouler', forget: 'oublier', begin: 'commencer',
    win: 'gagner', sit: 's’asseoir', stand: 'se lever', tell: 'raconter', say: 'dire', get: 'obtenir', fall: 'tomber', hide: 'cacher', wear: 'porter', build: 'construire',
    send: 'envoyer', spend: 'dépenser', lose: 'perdre', pay: 'payer', hear: 'entendre', be: 'être' };
  function cvc(v) { return /[^aeiou][aeiou][bdgmnprt]$/.test(v) && v.length <= 4 && v !== 'open'; }
  function enPast(v) {
    if (EN_IRR[v]) return EN_IRR[v][0];
    if (/e$/.test(v)) return v + 'd';
    if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + 'ied';
    if (cvc(v)) return v + v.slice(-1) + 'ed';
    return v + 'ed';
  }
  function enPart(v) { return EN_IRR[v] ? EN_IRR[v][1] : enPast(v); }
  function enS(v) {
    if (v === 'have') return 'has';
    if (v === 'be') return 'is';
    if (v === 'do' || v === 'go') return v + 'es';
    if (/(s|sh|ch|x|z)$/.test(v)) return v + 'es';
    if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + 'ies';
    return v + 's';
  }
  function enIng(v) {
    if (v === 'be') return 'being';
    if (/ie$/.test(v)) return v.slice(0, -2) + 'ying';
    if (/[^e]e$/.test(v)) return v.slice(0, -1) + 'ing';
    if (cvc(v)) return v + v.slice(-1) + 'ing';
    return v + 'ing';
  }
  var EN_SUBJ = ['I', 'you', 'he', 'she', 'it', 'we', 'they'];
  var BE = { I: 'am', you: 'are', he: 'is', she: 'is', it: 'is', we: 'are', they: 'are' };
  var BE_PAST = { I: 'was', you: 'were', he: 'was', she: 'was', it: 'was', we: 'were', they: 'were' };
  function enConj(v, tense, s) {
    var third = s === 'he' || s === 'she' || s === 'it';
    if (tense === 'present') return v === 'be' ? BE[s] : third ? enS(v) : v;
    if (tense === 'past') return v === 'be' ? BE_PAST[s] : enPast(v);
    if (tense === 'prog') return BE[s] + ' ' + enIng(v);
    if (tense === 'future') return 'will ' + v;
    if (tense === 'perfect') return (third ? 'has ' : 'have ') + enPart(v);
    return v;
  }
  var TENSE_E = { present: ['simple present', 'présent simple'], past: ['simple past', 'passé simple'], prog: ['present progressive', 'présent progressif'],
    future: ['future (will)', 'futur (will)'], perfect: ['present perfect', 'present perfect'] };
  // English verb drill: for English grammar on English sheets and for English class in Quebec
  function enVerbs(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), v = pick(R, c.verbs), tense = pick(R, c.tenses), s = pick(R, EN_SUBJ);
      if (v === 'be' && tense === 'prog') tense = 'present';
      var ans = enConj(v, tense, s), tn = TENSE_E[tense][fr ? 1 : 0];
      var gloss = fr && c.gloss ? ' (' + (EN_FR[v] || '') + ')' : '';
      if (c.choice && R() < 0.5) {
        var forms = [v, enS(v), enPast(v), enIng(v), enPart(v)].filter(function (f, i, a) { return a.indexOf(f) === i && f !== ans; });
        return Q('ev:' + v + tense + s, '<b>' + esc(v) + '</b>' + gloss + ' (' + tn + ')' + T(': ', ' : ') + (s === 'I' ? 'I' : H.cap(s)) + ' ' + BLS + circ(shuffle(R, sample(R, forms, 2).concat([ans]))), ans);
      }
      return Q('ev:' + v + tense + s, '<b>' + esc(v) + '</b>' + gloss + ' (' + tn + ')' + T(': ', ' : ') + (s === 'I' ? 'I' : H.cap(s)) + ' ' + BLM, ans);
    };
  }
  function enPastKind(verbs, wantPart) {
    return function (R, L) {
      var v = pick(R, lv(verbs, L).filter(function (x) { return x !== 'be'; }));
      if (wantPart) return Q('pp:' + v, T('Past participle of', 'Participe passé de') + ' <b>' + v + '</b>: ' + BLM, enPart(v));
      return Q('pt:' + v, T('Past tense of', 'Passé de') + ' <b>' + v + '</b>: ' + BLM, enPast(v));
    };
  }
  var ADJ = { big: ['bigger', 'biggest'], small: ['smaller', 'smallest'], tall: ['taller', 'tallest'], fast: ['faster', 'fastest'], happy: ['happier', 'happiest'],
    funny: ['funnier', 'funniest'], good: ['better', 'best'], bad: ['worse', 'worst'], hot: ['hotter', 'hottest'], cold: ['colder', 'coldest'], easy: ['easier', 'easiest'],
    beautiful: ['more beautiful', 'most beautiful'], interesting: ['more interesting', 'most interesting'], far: ['farther', 'farthest'], old: ['older', 'oldest'],
    young: ['younger', 'youngest'], long: ['longer', 'longest'], heavy: ['heavier', 'heaviest'], difficult: ['more difficult', 'most difficult'], strong: ['stronger', 'strongest'],
    wet: ['wetter', 'wettest'], nice: ['nicer', 'nicest'], important: ['more important', 'most important'], busy: ['busier', 'busiest'] };
  function enCompare() {
    return function (R) {
      var a = pick(R, Object.keys(ADJ)), sup = R() < 0.5;
      return Q('cmp:' + a + sup, T((sup ? 'Superlative' : 'Comparative') + ' of', (sup ? 'Superlatif' : 'Comparatif') + ' de') + ' <b>' + a + '</b>: ' + (sup ? 'the ' : '') + BLM, (sup ? 'the ' : '') + ADJ[a][sup ? 1 : 0]);
    };
  }

  // ---------- French grammar helpers ----------
  function article(w, kind) {
    var vowel = /^[aeéèêiîoôuhœ]/i.test(w.fr);
    if (kind === 'def') return vowel ? 'l’' : (w.g === 'f' ? 'la' : 'le');
    return w.g === 'f' ? 'une' : 'un';
  }
  function frGender(topics) {
    return function (R, L) {
      var list = vocab(lv(topics, L)).filter(function (w) { return w.g; }), w = pick(R, list), def = R() < 0.5 && !/^[aeéèêiîoôuhœ]/i.test(w.fr);
      return Q('gn:' + w.fr + def, (fr ? 'Encercle le bon déterminant :' : 'Circle the right word:') + ' ' + BLS + ' <b>' + esc(w.fr) + '</b>' + circ(def ? ['le', 'la'] : ['un', 'une']), def ? (w.g === 'f' ? 'la' : 'le') : (w.g === 'f' ? 'une' : 'un'));
    };
  }
  var ADJ_FR = [['grand', 'grande'], ['petit', 'petite'], ['content', 'contente'], ['vert', 'verte'], ['fatigué', 'fatiguée'], ['heureux', 'heureuse'],
    ['sportif', 'sportive'], ['gentil', 'gentille'], ['beau', 'belle'], ['nouveau', 'nouvelle'], ['blanc', 'blanche'], ['long', 'longue'], ['doux', 'douce'],
    ['gros', 'grosse'], ['canadien', 'canadienne'], ['curieux', 'curieuse'], ['premier', 'première'], ['actif', 'active'], ['bon', 'bonne'], ['vieux', 'vieille']];
  var NOUN_FR = [['le garçon', 'm', 's'], ['la fille', 'f', 's'], ['les garçons', 'm', 'p'], ['les filles', 'f', 'p'], ['le chat', 'm', 's'], ['la maison', 'f', 's'],
    ['les chiens', 'm', 'p'], ['les voitures', 'f', 'p'], ['mon frère', 'm', 's'], ['ma tante', 'f', 's'], ['nos amies', 'f', 'p'], ['ces arbres', 'm', 'p']];
  function frAgree() {
    return function (R) {
      var a = pick(R, ADJ_FR), nn = pick(R, NOUN_FR), form = nn[1] === 'f' ? a[1] : a[0];
      if (nn[2] === 'p') form = /[sx]$/.test(form) ? form : /eau$/.test(form) ? form + 'x' : form + 's';
      var verb = nn[2] === 'p' ? 'sont' : 'est';
      return Q('ag:' + a[0] + nn[0], (fr ? 'Accorde l’adjectif' : 'Make the adjective agree') + ' (<b>' + a[0] + '</b>) :<br>' + H.cap(nn[0]) + ' ' + verb + ' ' + BLM + '.', form);
    };
  }
  function frNegate() {
    var S = [['Je mange une pomme.', 'Je ne mange pas de pomme.'], ['Tu joues au hockey.', 'Tu ne joues pas au hockey.'], ['Il aime la pizza.', 'Il n’aime pas la pizza.'],
      ['Nous regardons la télé.', 'Nous ne regardons pas la télé.'], ['Vous parlez anglais.', 'Vous ne parlez pas anglais.'], ['Elles dansent bien.', 'Elles ne dansent pas bien.'],
      ['J’aime le brocoli.', 'Je n’aime pas le brocoli.'], ['Il fait froid.', 'Il ne fait pas froid.'], ['Nous allons au parc.', 'Nous n’allons pas au parc.'],
      ['Elle a un chat.', 'Elle n’a pas de chat.'], ['Ils sont fatigués.', 'Ils ne sont pas fatigués.'], ['Je suis malade.', 'Je ne suis pas malade.'],
      ['Tu écoutes la radio.', 'Tu n’écoutes pas la radio.'], ['Marie lit un livre.', 'Marie ne lit pas de livre.'], ['Le chien court vite.', 'Le chien ne court pas vite.'],
      ['J’ai faim.', 'Je n’ai pas faim.'], ['Vous finissez vos devoirs.', 'Vous ne finissez pas vos devoirs.'], ['On va à la plage.', 'On ne va pas à la plage.']];
    return function (R) {
      var it = pick(R, S), s = it[0];
      return Q('ng:' + s, (fr ? 'Écris la phrase à la forme négative :' : 'Make it negative (ne… pas):') + '<br><i>' + esc(s) + '</i>' + BLL, esc(it[1]));
    };
  }

  return {
    lv: lv, frNum: frNum, enNum: enNum, numWords: numWords, VOCAB: VOCAB, vocab: vocab, vocabKinds: vocabKinds, oddOne: oddOne,
    present: present, participle: participle, conj: conj, subjonctif: subjonctif, imparfait: imparfait, frVerbs: frVerbs, enPast: enPast, enPart: enPart, enS: enS, enIng: enIng, enConj: enConj,
    enVerbs: enVerbs, enPastKind: enPastKind, enCompare: enCompare, EN_IRR: EN_IRR, EN_REG: EN_REG, frGender: frGender, frAgree: frAgree,
    frNegate: frNegate, article: article
  };
};
