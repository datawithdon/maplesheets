// Maternelle (Québec, en français). Contenu pour le moteur de feuilles dans assets/hw-core.js.
// Plusieurs questions sont faites pour être lues à voix haute par un adulte.
'use strict';
HW.register('fr-0', function (H) {
  var Q = H.Q, pick = H.pick, shuffle = H.shuffle, sample = H.sample, circ = H.circ, ri = H.ri, BLS = H.BLS, BLM = H.BLM;
  var UP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), LOW = 'abcdefghijklmnopqrstuvwxyz'.split('');
  var LOOKALIKE = { b: 'dpq', d: 'bpq', p: 'bdq', q: 'pbd', m: 'nw', n: 'mu', u: 'nv', w: 'mv', h: 'nk', i: 'lj', l: 'it', f: 'tk', t: 'fl', c: 'eo', e: 'ca', o: 'ca', a: 'eo', g: 'qy', y: 'gv', v: 'uy', s: 'zc', z: 'sx', x: 'zk', k: 'hx', r: 'nv', j: 'ig' };
  function big(s) { return '<span class="big">' + s + '</span>'; }
  function likeL(R, ch) { var pool = (LOOKALIKE[ch] || 'aeo').split('').filter(function (c) { return c !== ch; }); return sample(R, pool, Math.min(2, pool.length)); }

  // ---------- Lettres et sons ----------
  var START = ['ami|a', 'ballon|b', 'chat|ch', 'dauphin|d', 'éléphant|é', 'fraise|f', 'gâteau|g', 'hibou|h', 'île|i', 'jus|j', 'koala|k', 'lune|l', 'maison|m', 'nuage|n',
    'orange|o', 'pomme|p', 'renard|r', 'soleil|s', 'tortue|t', 'usine|u', 'vache|v', 'wapiti|w', 'yogourt|y', 'zèbre|z', 'bateau|b', 'mouton|m', 'souris|s', 'tasse|t', 'lapin|l', 'robe|r'];
  var SIGHT = ['le', 'la', 'les', 'un', 'une', 'et', 'est', 'je', 'il', 'elle', 'on', 'moi', 'oui', 'non', 'papa', 'maman', 'ami', 'chat', 'dans', 'sur', 'avec', 'mon', 'ma', 'va'];
  var RHY = ['chat|rat|lune', 'pain|main|vélo', 'bateau|gâteau|fleur', 'souris|tapis|soleil', 'lit|nid|banane', 'feu|jeu|pomme', 'chou|loup|table', 'cou|hibou|robe',
    'balle|malle|pied', 'nez|clé|ours', 'lapin|sapin|crayon', 'mouton|bouton|neige'];
  var smallFor = function (R) { var i = ri(R, 0, 25), ch = LOW[i]; return Q('sf:' + ch, 'Encercle la petite lettre pour ' + big(UP[i]) + circ(shuffle(R, likeL(R, ch).concat([ch])))); };
  var bigFor = function (R) { var i = ri(R, 0, 25); return Q('bf:' + i, 'Écris la grande lettre pour ' + big(LOW[i]) + ' : ' + BLS); };
  var nextLetter = function (R) { var i = ri(R, 0, 23); return Q('nl:' + i, 'Quelle lettre vient ensuite?<br>' + big(UP[i] + ' ' + UP[i + 1] + ' ' + UP[i + 2]) + ' ' + BLS); };
  var firstSound = function (R) {
    var p = pick(R, START).split('|'), others = sample(R, ['a', 'b', 'd', 'f', 'l', 'm', 'p', 'r', 's', 't', 'v', 'o', 'ch'].filter(function (c) { return c !== p[1]; }), 2);
    return Q('fs:' + p[0], 'Dis <b>' + p[0] + '</b>. Par quel son commence ce mot?' + circ(shuffle(R, others.concat([p[1]]))));
  };
  var sight = function (R) { var w = pick(R, SIGHT), others = sample(R, SIGHT.filter(function (x) { return x !== w; }), 2); return Q('sw:' + w, 'Encercle le mot ' + big(w) + circ(shuffle(R, others.concat([w])))); };
  var rhyme = function (R) { var p = pick(R, RHY).split('|'); return Q('rh:' + p[0], 'Quel mot rime avec <b>' + p[0] + '</b>?' + circ(shuffle(R, p.slice(1)))); };
  function lettres(L) { return L === 'easy' ? [smallFor, bigFor, nextLetter, firstSound] : [smallFor, bigFor, nextLetter, firstSound, sight, rhyme]; }

  // ---------- Écriture ----------
  var COPY = ['ami', 'lit', 'nez', 'feu', 'jeu', 'bal', 'sac', 'vélo', 'papa', 'maman', 'lune', 'chat', 'pomme', 'lapin', 'robe', 'bébé', 'rat', 'mur', 'sol', 'été'];
  var writeLetter = function (R) { var i = ri(R, 0, 25); return Q('wl:' + i, 'Écris ' + big(UP[i] + ' ' + LOW[i]) + ' : ' + BLS + ' ' + BLS + ' ' + BLS); };
  var copyWord = function (R) { var w = pick(R, COPY); return Q('cw:' + w, 'Copie le mot ' + big(w) + ' : ' + BLM); };
  var missingLetter = function (R) { var w = pick(R, COPY), k = ri(R, 0, w.length - 1); return Q('ml:' + w + k, 'Écris la lettre qui manque : ' + big(w.slice(0, k) + '_' + w.slice(k + 1)).replace('_', BLS) + ' (' + w + ')'); };
  var writeName = function (R) { var n = ri(R, 1, 3); return Q('nm:' + n, (n === 1 ? 'Écris ton prénom :' : n === 2 ? 'Écris encore ton prénom, bien lisiblement :' : 'Écris ton prénom en grosses lettres :') + '<br>' + H.BLL); };
  function ecriture() { return [writeLetter, copyWord, missingLetter, writeName]; }

  return {
    subjects: [
      H.C.math(0),
      { id: 'lettres', name: 'Lettres et sons', kinds: lettres },
      { id: 'ecriture', name: 'Écriture', kinds: ecriture },
      H.C.second(0)
    ]
  };
});
