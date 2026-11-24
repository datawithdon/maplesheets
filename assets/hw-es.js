// Spanish as a second language (US sheets, pages 7–8). Instructions are in English.
// Vocabulary items are "spanish|english|gender" (gender m/f for nouns; blank for verbs, adjectives, phrases and plurals).
'use strict';
window.HWLIB = window.HWLIB || {};
window.HWLIB.S = function (H) {
  var Q = H.Q, ri = H.ri, pick = H.pick, shuffle = H.shuffle, sample = H.sample, esc = H.esc, circ = H.circ;
  var BLS = H.BLS, BLM = H.BLM, BLL = H.BLL;
  function lv(o, L) { return o && typeof o === 'object' && !Array.isArray(o) && ('easy' in o || 'medium' in o || 'hard' in o) ? o[L] : o; }

  // ---------- numbers ----------
  var U = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince',
    'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis',
    'veintisiete', 'veintiocho', 'veintinueve'];
  var TENS = { 3: 'treinta', 4: 'cuarenta', 5: 'cincuenta', 6: 'sesenta', 7: 'setenta', 8: 'ochenta', 9: 'noventa' };
  function esNum(k) {
    if (k < 30) return U[k];
    if (k === 100) return 'cien';
    var t = Math.floor(k / 10), u = k % 10;
    return TENS[t] + (u ? ' y ' + U[u] : '');
  }
  function numWords(max) {
    return function (R, L) {
      var top = lv(max, L), k = ri(R, 0, top);
      if (R() < 0.5) return Q('es-nw:' + k, 'Write the number: <b>' + esNum(k) + '</b> = ' + BLS, String(k));
      var pool = []; for (var i = 0; i <= top; i++) if (i !== k) pool.push(i);
      var near = pool.filter(function (x) { return Math.abs(x - k) <= 12; });
      return Q('es-nw:' + k, 'Circle <b>' + k + '</b>:' + circ(shuffle(R, sample(R, near.length >= 2 ? near : pool, 2).concat([k]).map(esNum))), esNum(k));
    };
  }

  // ---------- vocabulary (same topics as the French lists, so every grade plan works) ----------
  var VOCAB = {
    colours: ['rojo|red', 'azul|blue', 'verde|green', 'amarillo|yellow', 'anaranjado|orange', 'rosado|pink', 'morado|purple', 'negro|black', 'blanco|white',
      'marrón|brown', 'gris|gray'],
    greetings: ['hola|hello', 'adiós|goodbye', 'gracias|thank you', 'buenas noches|good night', 'por favor|please', 'buenos días|good morning', 'sí|yes',
      'buenas tardes|good afternoon', 'de nada|you’re welcome', 'hasta luego|see you later'],
    animals: ['gato|cat|m', 'perro|dog|m', 'pájaro|bird|m', 'pez|fish|m', 'conejo|rabbit|m', 'caballo|horse|m', 'vaca|cow|f', 'cerdo|pig|m', 'oveja|sheep|f',
      'pato|duck|m', 'ratón|mouse|m', 'oso|bear|m', 'rana|frog|f', 'tortuga|turtle|f', 'serpiente|snake|f', 'león|lion|m', 'ballena|whale|f', 'zorro|fox|m'],
    family: ['madre|mother|f', 'padre|father|m', 'hermana|sister|f', 'hermano|brother|m', 'abuela|grandmother|f', 'abuelo|grandfather|m', 'bebé|baby|m',
      'tía|aunt|f', 'tío|uncle|m', 'familia|family|f', 'primo|cousin|m', 'hija|daughter|f', 'hijo|son|m'],
    days: ['lunes|Monday', 'martes|Tuesday', 'miércoles|Wednesday', 'jueves|Thursday', 'viernes|Friday', 'sábado|Saturday', 'domingo|Sunday'],
    months: ['enero|January', 'febrero|February', 'marzo|March', 'abril|April', 'mayo|May', 'junio|June', 'julio|July', 'agosto|August', 'septiembre|September',
      'octubre|October', 'noviembre|November', 'diciembre|December'],
    body: ['cabeza|head|f', 'mano|hand|f', 'pie|foot|m', 'nariz|nose|f', 'boca|mouth|f', 'ojo|eye|m', 'oreja|ear|f', 'brazo|arm|m', 'pierna|leg|f', 'espalda|back|f',
      'cuello|neck|m', 'rodilla|knee|f', 'diente|tooth|m', 'pelo|hair|m'],
    food: ['manzana|apple|f', 'pan|bread|m', 'leche|milk|f', 'queso|cheese|m', 'agua|water', 'pastel|cake|m', 'huevo|egg|m', 'plátano|banana|m', 'zanahoria|carrot|f',
      'pollo|chicken|m', 'sopa|soup|f', 'arroz|rice|m', 'jugo|juice|m', 'mantequilla|butter|f', 'fresa|strawberry|f', 'pescado|fish|m', 'sándwich|sandwich|m'],
    school: ['libro|book|m', 'lápiz|pencil|m', 'borrador|eraser|m', 'escuela|school|f', 'mochila|backpack|f', 'regla|ruler|f', 'papel|paper|m', 'silla|chair|f',
      'mesa|table|f', 'tijeras|scissors', 'cuaderno|notebook|m', 'pizarra|board|f', 'escritorio|desk|m', 'clase|class|f', 'maestro|teacher|m'],
    clothes: ['sombrero|hat|m', 'abrigo|coat|m', 'camisa|shirt|f', 'pantalones|pants', 'vestido|dress|m', 'falda|skirt|f', 'zapato|shoe|m', 'bota|boot|f',
      'gorro|winter hat|m', 'guante|glove|m', 'calcetín|sock|m', 'bufanda|scarf|f', 'suéter|sweater|m'],
    weather: ['hace calor|it is hot', 'hace frío|it is cold', 'llueve|it is raining', 'nieva|it is snowing', 'hace buen tiempo|the weather is nice',
      'hace viento|it is windy', 'hace sol|it is sunny', 'hace mal tiempo|the weather is bad', 'está nublado|it is cloudy'],
    house: ['casa|house|f', 'cocina|kitchen|f', 'dormitorio|bedroom|m', 'baño|bathroom|m', 'sala|living room|f', 'puerta|door|f', 'ventana|window|f',
      'cama|bed|f', 'jardín|garden|m', 'techo|roof|m', 'escalera|stairs|f', 'patio|yard|m'],
    town: ['biblioteca|library|f', 'parque|park|m', 'tienda|store|f', 'hospital|hospital|m', 'piscina|swimming pool|f', 'supermercado|grocery store|m',
      'calle|street|f', 'estación de tren|train station|f', 'banco|bank|m', 'restaurante|restaurant|m', 'museo|museum|m', 'cine|movie theater|m',
      'farmacia|pharmacy|f', 'panadería|bakery|f'],
    sports: ['fútbol|soccer|m', 'natación|swimming|f', 'béisbol|baseball|m', 'básquetbol|basketball|m', 'tenis|tennis|m', 'ciclismo|cycling|m',
      'voleibol|volleyball|m', 'baile|dance|m', 'fútbol americano|football|m', 'atletismo|track and field|m'],
    feelings: ['contento|happy', 'triste|sad', 'enojado|angry', 'cansado|tired', 'enfermo|sick', 'nervioso|nervous', 'orgulloso|proud', 'sorprendido|surprised',
      'tranquilo|calm', 'emocionado|excited'],
    verbs: ['comer|to eat', 'beber|to drink', 'hablar|to speak', 'escuchar|to listen', 'mirar|to watch', 'jugar|to play', 'ir|to go', 'venir|to come',
      'hacer|to do', 'leer|to read', 'escribir|to write', 'dormir|to sleep', 'correr|to run', 'cantar|to sing', 'bailar|to dance', 'terminar|to finish',
      'vender|to sell', 'esperar|to wait', 'ver|to see', 'saber|to know', 'querer|to want', 'poder|to be able to', 'aprender|to learn', 'comprar|to buy',
      'trabajar|to work', 'viajar|to travel', 'vivir|to live', 'abrir|to open'],
    adjectives: ['grande|big', 'pequeño|small', 'nuevo|new', 'viejo|old', 'bonito|beautiful', 'fácil|easy', 'difícil|difficult', 'rápido|fast', 'lento|slow',
      'caliente|hot', 'frío|cold', 'joven|young', 'divertido|funny', 'amable|kind', 'fuerte|strong', 'inteligente|smart', 'perezoso|lazy', 'tímido|shy',
      'alto|tall'],
    jobs: ['médico|doctor|m', 'enfermera|nurse|f', 'bombero|firefighter|m', 'policía|police officer', 'agricultor|farmer|m', 'abogado|lawyer|m',
      'ingeniero|engineer|m', 'dentista|dentist', 'cocinero|cook|m', 'piloto|pilot|m', 'veterinario|veterinarian|m', 'artista|artist', 'científico|scientist|m'],
    nature: ['árbol|tree|m', 'flor|flower|f', 'lago|lake|m', 'río|river|m', 'montaña|mountain|f', 'bosque|forest|m', 'sol|sun|m', 'luna|moon|f',
      'estrella|star|f', 'nieve|snow|f', 'lluvia|rain|f', 'mar|sea|m', 'playa|beach|f', 'isla|island|f', 'hoja|leaf|f', 'cielo|sky|m', 'nube|cloud|f'],
    tech: ['computadora|computer|f', 'teléfono|phone|m', 'pantalla|screen|f', 'teclado|keyboard|m', 'correo electrónico|email|m', 'sitio web|website|m',
      'contraseña|password|f', 'videojuego|video game|m', 'aplicación|app|f', 'impresora|printer|f'],
    travel: ['avión|plane|m', 'tren|train|m', 'autobús|bus|m', 'carro|car|m', 'barco|boat|m', 'boleto|ticket|m', 'maleta|suitcase|f', 'mapa|map|m',
      'pasaporte|passport|m', 'hotel|hotel|m', 'aeropuerto|airport|m', 'vacaciones|vacation'],
    environment: ['reciclar|to recycle', 'contaminación|pollution|f', 'energía|energy|f', 'basura|garbage|f', 'clima|climate|m', 'proteger|to protect',
      'medio ambiente|environment|m', 'desperdiciar|to waste', 'planeta|planet|m', 'especie|species|f', 'abono|compost|m', 'sequía|drought|f'],
    abstract: ['libertad|freedom|f', 'paz|peace|f', 'amistad|friendship|f', 'valor|courage|m', 'futuro|future|m', 'salud|health|f', 'conocimiento|knowledge|m',
      'sociedad|society|f', 'gobierno|government|m', 'derecho|right (law)|m', 'ciudadano|citizen|m', 'cultura|culture|f', 'historia|history|f', 'debate|debate|m']
  };
  function vocab(topics) {
    var out = [];
    topics.forEach(function (t) { (VOCAB[t] || []).forEach(function (s) { var p = s.split('|'); out.push({ es: p[0], en: p[1], g: p[2] || '', topic: t }); }); });
    return out;
  }
  function vocabKinds(topicsByLevel, opts) {
    opts = opts || {};
    function words(L) { return vocab(lv(topicsByLevel, L)); }
    function same(list, w, side) { return list.filter(function (x) { return x.topic === w.topic && x !== w && x[side] !== w[side]; }); }
    var circleIt = function (R, L) {
      var v = words(L), w = pick(R, v), ch = sample(R, same(v, w, 'es'), 2).map(function (x) { return x.es; }).concat([w.es]);
      return Q('es-vc:' + w.es, 'Circle the Spanish word for <b>' + esc(w.en) + '</b>:' + circ(shuffle(R, ch)), esc(w.es));
    };
    var meaning = function (R, L) {
      var v = words(L), w = pick(R, v), ch = sample(R, same(v, w, 'en'), 2).map(function (x) { return x.en; }).concat([w.en]);
      return Q('es-vm:' + w.es, 'What does <b>' + esc(w.es) + '</b> mean?' + circ(shuffle(R, ch)), esc(w.en));
    };
    var write = function (R, L) {
      var w = pick(R, words(L)), toSpanish = opts.writeTarget && lv(opts.writeTarget, L);
      if (toSpanish) return Q('es-vw:' + w.es, 'Write it in Spanish: <b>' + esc(w.en) + '</b> → ' + BLM, esc(w.es));
      return Q('es-vw:' + w.es, 'Write it in English: <b>' + esc(w.es) + '</b> → ' + BLM, esc(w.en));
    };
    return [circleIt, meaning, write];
  }
  function oddOne(topics) {
    return function (R, L) {
      var tps = sample(R, lv(topics, L), 2), a = sample(R, vocab([tps[0]]), 3), b = pick(R, vocab([tps[1]]));
      var list = a.concat([b]).map(function (x) { return x.es; });
      return Q('es-odd:' + list.join(), 'Circle the word that does not belong:' + circ(shuffle(R, list)), esc(b.es));
    };
  }
  // el / la, un / una
  function gender(topics) {
    return function (R, L) {
      var list = vocab(lv(topics, L)).filter(function (w) { return w.g; }), w = pick(R, list), def = R() < 0.5;
      var ans = def ? (w.g === 'f' ? 'la' : 'el') : (w.g === 'f' ? 'una' : 'un');
      return Q('es-gn:' + w.es + def, 'Circle the right word: ' + BLS + ' <b>' + esc(w.es) + '</b>' + circ(def ? ['el', 'la'] : ['un', 'una']), ans);
    };
  }

  // ---------- verbs ----------
  // subjects; person index 0–5 = yo, tú, él/ella/usted, nosotros, vosotros (not used), ellos/ellas/ustedes
  var SUBJ = ['yo', 'tú', 'él', 'ella', 'usted', 'nosotros', 'ellos', 'ellas', 'ustedes'];
  var PERSON = { yo: 0, 'tú': 1, 'él': 2, ella: 2, usted: 2, nosotros: 3, ellos: 5, ellas: 5, ustedes: 5 };
  var PRESENT_IRR = {
    ser: ['soy', 'eres', 'es', 'somos', 'sois', 'son'], estar: ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'],
    tener: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'], ir: ['voy', 'vas', 'va', 'vamos', 'vais', 'van'],
    hacer: ['hago', 'haces', 'hace', 'hacemos', 'hacéis', 'hacen'], poder: ['puedo', 'puedes', 'puede', 'podemos', 'podéis', 'pueden'],
    querer: ['quiero', 'quieres', 'quiere', 'queremos', 'queréis', 'quieren'], jugar: ['juego', 'juegas', 'juega', 'jugamos', 'jugáis', 'juegan'],
    dormir: ['duermo', 'duermes', 'duerme', 'dormimos', 'dormís', 'duermen'], venir: ['vengo', 'vienes', 'viene', 'venimos', 'venís', 'vienen'],
    decir: ['digo', 'dices', 'dice', 'decimos', 'decís', 'dicen'], salir: ['salgo', 'sales', 'sale', 'salimos', 'salís', 'salen'],
    ver: ['veo', 'ves', 've', 'vemos', 'veis', 'ven'], saber: ['sé', 'sabes', 'sabe', 'sabemos', 'sabéis', 'saben']
  };
  var PRET_IRR = {
    ser: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'], ir: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
    tener: ['tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvisteis', 'tuvieron'], hacer: ['hice', 'hiciste', 'hizo', 'hicimos', 'hicisteis', 'hicieron'],
    estar: ['estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron'], poder: ['pude', 'pudiste', 'pudo', 'pudimos', 'pudisteis', 'pudieron'],
    querer: ['quise', 'quisiste', 'quiso', 'quisimos', 'quisisteis', 'quisieron'], venir: ['vine', 'viniste', 'vino', 'vinimos', 'vinisteis', 'vinieron'],
    decir: ['dije', 'dijiste', 'dijo', 'dijimos', 'dijisteis', 'dijeron'], ver: ['vi', 'viste', 'vio', 'vimos', 'visteis', 'vieron'],
    saber: ['supe', 'supiste', 'supo', 'supimos', 'supisteis', 'supieron'], dormir: ['dormí', 'dormiste', 'durmió', 'dormimos', 'dormisteis', 'durmieron'],
    leer: ['leí', 'leíste', 'leyó', 'leímos', 'leísteis', 'leyeron']
  };
  var IMPF_IRR = { ser: ['era', 'eras', 'era', 'éramos', 'erais', 'eran'], ir: ['iba', 'ibas', 'iba', 'íbamos', 'ibais', 'iban'],
    ver: ['veía', 'veías', 'veía', 'veíamos', 'veíais', 'veían'] };
  var FUT_STEM = { tener: 'tendr', hacer: 'har', poder: 'podr', querer: 'querr', venir: 'vendr', decir: 'dir', salir: 'saldr', saber: 'sabr' };
  var END = {
    present: { ar: ['o', 'as', 'a', 'amos', 'áis', 'an'], er: ['o', 'es', 'e', 'emos', 'éis', 'en'], ir: ['o', 'es', 'e', 'imos', 'ís', 'en'] },
    pret: { ar: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'], er: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'], ir: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'] },
    impf: { ar: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'], er: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'], ir: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'] }
  };
  var FUT_END = ['é', 'ás', 'á', 'emos', 'éis', 'án'], COND_END = ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'];
  function conj(v, tense, p) {
    var stem = v.slice(0, -2), cls = v.slice(-2);
    if (tense === 'present') return PRESENT_IRR[v] ? PRESENT_IRR[v][p] : stem + END.present[cls][p];
    if (tense === 'pret') {
      if (PRET_IRR[v]) return PRET_IRR[v][p];
      if (p === 0 && cls === 'ar') {                       // spelling changes in the yo form: jugué, toqué, empecé
        if (/g$/.test(stem)) return stem + 'ué';
        if (/c$/.test(stem)) return stem.slice(0, -1) + 'qué';
        if (/z$/.test(stem)) return stem.slice(0, -1) + 'cé';
      }
      return stem + END.pret[cls][p];
    }
    if (tense === 'impf') return IMPF_IRR[v] ? IMPF_IRR[v][p] : stem + END.impf[cls][p];
    if (tense === 'future') return (FUT_STEM[v] || v) + FUT_END[p];
    if (tense === 'cond') return (FUT_STEM[v] || v) + COND_END[p];
    if (tense === 'near') return PRESENT_IRR.ir[p] + ' a ' + v;
    throw new Error('unknown tense ' + tense);
  }
  var TENSE_NAME = { present: 'present', pret: 'preterite (past)', impf: 'imperfect', future: 'future', cond: 'conditional', near: 'near future (ir a)' };
  function verbs(cfg) {
    return function (R, L) {
      var c = lv(cfg, L), v = pick(R, c.verbs), tense = pick(R, c.tenses), s = pick(R, SUBJ), p = PERSON[s];
      var answer = conj(v, tense, p), shown = s.charAt(0).toUpperCase() + s.slice(1);
      if (c.choice && R() < 0.5) {
        var others = [0, 1, 2, 3, 5].filter(function (x) { return x !== p; }).map(function (x) { return conj(v, tense, x); });
        var opts = others.filter(function (o, i) { return o !== answer && others.indexOf(o) === i; });
        return Q('es-v:' + v + tense + s, shown + ' ' + BLS + ' (<b>' + v + '</b>, ' + TENSE_NAME[tense] + ')' + circ(shuffle(R, sample(R, opts, 2).concat([answer]))), answer);
      }
      return Q('es-v:' + v + tense + s, '<b>' + v + '</b> (' + TENSE_NAME[tense] + '): ' + shown + ' ' + BLM, answer);
    };
  }
  // put "no" before the verb
  var NEG = [['Yo como una manzana.', 'Yo no como una manzana.'], ['Tú juegas al fútbol.', 'Tú no juegas al fútbol.'], ['Ella habla inglés.', 'Ella no habla inglés.'],
    ['Nosotros vivimos en Texas.', 'Nosotros no vivimos en Texas.'], ['Ellos bailan bien.', 'Ellos no bailan bien.'], ['Me gusta el brócoli.', 'No me gusta el brócoli.'],
    ['Hace frío hoy.', 'No hace frío hoy.'], ['Vamos al parque.', 'No vamos al parque.'], ['Él tiene un perro.', 'Él no tiene un perro.'],
    ['Ellas están cansadas.', 'Ellas no están cansadas.'], ['Yo estoy enfermo.', 'Yo no estoy enfermo.'], ['Tú escuchas la radio.', 'Tú no escuchas la radio.'],
    ['María lee un libro.', 'María no lee un libro.'], ['El gato duerme mucho.', 'El gato no duerme mucho.'], ['Tengo hambre.', 'No tengo hambre.'],
    ['Ustedes terminan la tarea.', 'Ustedes no terminan la tarea.'], ['Mi hermano canta en el coro.', 'Mi hermano no canta en el coro.'], ['Es mi mochila.', 'No es mi mochila.']];
  function negate() {
    return function (R) {
      var it = pick(R, NEG);
      return Q('es-ng:' + it[0], 'Make it negative (add <b>no</b>):<br><i>' + esc(it[0]) + '</i>' + BLL, esc(it[1]));
    };
  }
  // adjective agreement: [masculine, feminine]
  var ADJ = [['alto', 'alta'], ['bajo', 'baja'], ['bonito', 'bonita'], ['simpático', 'simpática'], ['pequeño', 'pequeña'], ['nuevo', 'nueva'],
    ['divertido', 'divertida'], ['cansado', 'cansada'], ['contento', 'contenta'], ['rojo', 'roja'], ['grande', 'grande'], ['inteligente', 'inteligente'],
    ['verde', 'verde'], ['azul', 'azul'], ['feliz', 'feliz'], ['fácil', 'fácil'], ['interesante', 'interesante'], ['trabajador', 'trabajadora']];
  var NOUN = [['el niño', 'm', 's'], ['la niña', 'f', 's'], ['los niños', 'm', 'p'], ['las niñas', 'f', 'p'], ['el gato', 'm', 's'], ['la casa', 'f', 's'],
    ['los perros', 'm', 'p'], ['las flores', 'f', 'p'], ['mi hermano', 'm', 's'], ['mi tía', 'f', 's'], ['mis amigas', 'f', 'p'], ['los árboles', 'm', 'p']];
  function plural(w) {
    if (/z$/.test(w)) return w.slice(0, -1) + 'ces';                 // feliz → felices
    if (/[aeiou]$/.test(w)) return w + 's';
    return w + 'es';                                                 // fácil → fáciles, azul → azules, trabajador → trabajadores
  }
  function agree() {
    return function (R) {
      var a = pick(R, ADJ), nn = pick(R, NOUN), form = nn[1] === 'f' ? a[1] : a[0];
      if (nn[2] === 'p') form = plural(form);
      var verb = nn[2] === 'p' ? 'son' : 'es';
      return Q('es-ag:' + a[0] + nn[0], 'Make the adjective agree (<b>' + a[0] + '</b>):<br>' + H.cap(nn[0]) + ' ' + verb + ' ' + BLM + '.', form);
    };
  }

  return { VOCAB: VOCAB, vocab: vocab, esNum: esNum, numWords: numWords, vocabKinds: vocabKinds, oddOne: oddOne, gender: gender, conj: conj,
    verbs: verbs, negate: negate, agree: agree };
};
