/* MapleSheets website: login, children, settings, admin.
   Talks to Supabase's REST and Auth APIs directly with fetch (no outside libraries).
   Anything a user typed is shown with textContent, never as HTML. */
(function (root) {
  'use strict';

  var SESSION_KEY = 'g2hw.session';
  var RESET_KEY = 'g2hw.reset';        // the secret half of a password-reset request (PKCE), kept in this browser only
  var RESET_MAX_AGE = 3600 * 1000;
  var GRADES = { 0: 'Kindergarten', 1: 'Grade 1', 2: 'Grade 2', 3: 'Grade 3', 4: 'Grade 4', 5: 'Grade 5', 6: 'Grade 6',
    7: 'Grade 7', 8: 'Grade 8', 9: 'Grade 9', 10: 'Grade 10', 11: 'Grade 11', 12: 'Grade 12' };
  // Grades with worksheets, per language. Keep in step with homework's hw-core.js and sender/pdf_maker.py (a test checks).
  var READY = { en: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], fr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], us: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] };
  var READY_GRADES = READY.en;
  var QC_GRADES = { 0: 'Maternelle', 1: '1re année', 2: '2e année', 3: '3e année', 4: '4e année', 5: '5e année', 6: '6e année',
    7: 'Secondaire 1', 8: 'Secondaire 2', 9: 'Secondaire 3', 10: 'Secondaire 4', 11: 'Secondaire 5', 12: 'Grade 12' };
  var LEVELS = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
  var LEVELS_FR = { easy: 'Facile', medium: 'Moyen', hard: 'Difficile' };
  var PROVINCES = {
    AB: ['Alberta', 'America/Edmonton'], BC: ['British Columbia', 'America/Vancouver'], MB: ['Manitoba', 'America/Winnipeg'],
    NB: ['New Brunswick', 'America/Moncton'], NL: ['Newfoundland and Labrador', 'America/St_Johns'],
    NS: ['Nova Scotia', 'America/Halifax'], NT: ['Northwest Territories', 'America/Yellowknife'], NU: ['Nunavut', 'America/Iqaluit'],
    ON: ['Ontario', 'America/Toronto'], PE: ['Prince Edward Island', 'America/Halifax'], QC: ['Quebec', 'America/Toronto'],
    SK: ['Saskatchewan', 'America/Regina'], YT: ['Yukon', 'America/Whitehorse']
  };
  // US states (and DC): name and the time zone most of the state uses
  var STATES = {
    AL: ['Alabama', 'America/Chicago'], AK: ['Alaska', 'America/Anchorage'], AZ: ['Arizona', 'America/Phoenix'], AR: ['Arkansas', 'America/Chicago'],
    CA: ['California', 'America/Los_Angeles'], CO: ['Colorado', 'America/Denver'], CT: ['Connecticut', 'America/New_York'], DE: ['Delaware', 'America/New_York'],
    DC: ['District of Columbia', 'America/New_York'], FL: ['Florida', 'America/New_York'], GA: ['Georgia', 'America/New_York'], HI: ['Hawaii', 'Pacific/Honolulu'],
    ID: ['Idaho', 'America/Denver'], IL: ['Illinois', 'America/Chicago'], IN: ['Indiana', 'America/New_York'], IA: ['Iowa', 'America/Chicago'],
    KS: ['Kansas', 'America/Chicago'], KY: ['Kentucky', 'America/New_York'], LA: ['Louisiana', 'America/Chicago'], ME: ['Maine', 'America/New_York'],
    MD: ['Maryland', 'America/New_York'], MA: ['Massachusetts', 'America/New_York'], MI: ['Michigan', 'America/New_York'], MN: ['Minnesota', 'America/Chicago'],
    MS: ['Mississippi', 'America/Chicago'], MO: ['Missouri', 'America/Chicago'], MT: ['Montana', 'America/Denver'], NE: ['Nebraska', 'America/Chicago'],
    NV: ['Nevada', 'America/Los_Angeles'], NH: ['New Hampshire', 'America/New_York'], NJ: ['New Jersey', 'America/New_York'], NM: ['New Mexico', 'America/Denver'],
    NY: ['New York', 'America/New_York'], NC: ['North Carolina', 'America/New_York'], ND: ['North Dakota', 'America/Chicago'], OH: ['Ohio', 'America/New_York'],
    OK: ['Oklahoma', 'America/Chicago'], OR: ['Oregon', 'America/Los_Angeles'], PA: ['Pennsylvania', 'America/New_York'], RI: ['Rhode Island', 'America/New_York'],
    SC: ['South Carolina', 'America/New_York'], SD: ['South Dakota', 'America/Chicago'], TN: ['Tennessee', 'America/Chicago'], TX: ['Texas', 'America/Chicago'],
    UT: ['Utah', 'America/Denver'], VT: ['Vermont', 'America/New_York'], VA: ['Virginia', 'America/New_York'], WA: ['Washington', 'America/Los_Angeles'],
    WV: ['West Virginia', 'America/New_York'], WI: ['Wisconsin', 'America/Chicago'], WY: ['Wyoming', 'America/Denver']
  };
  var REGIONS = Object.assign({}, PROVINCES, STATES);
  var TIME_ZONES = {
    'America/St_Johns': 'Newfoundland time', 'America/Halifax': 'Atlantic time (Halifax)', 'America/Moncton': 'Atlantic time (Moncton)',
    'America/Toronto': 'Eastern time', 'America/Winnipeg': 'Central time', 'America/Regina': 'Saskatchewan time',
    'America/Edmonton': 'Mountain time', 'America/Vancouver': 'Pacific time', 'America/Whitehorse': 'Yukon time',
    'America/Yellowknife': 'Mountain time (Yellowknife)', 'America/Iqaluit': 'Eastern time (Iqaluit)',
    'America/New_York': 'US Eastern time', 'America/Chicago': 'US Central time', 'America/Denver': 'US Mountain time',
    'America/Phoenix': 'Arizona time', 'America/Los_Angeles': 'US Pacific time', 'America/Anchorage': 'Alaska time', 'Pacific/Honolulu': 'Hawaii time'
  };

  function has(obj, key) { return Object.prototype.hasOwnProperty.call(obj, key); }
  var B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  function b64url(bytes) {  // base64url without padding
    var out = '', i, n;
    for (i = 0; i + 2 < bytes.length; i += 3) {
      n = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
      out += B64[n >> 18 & 63] + B64[n >> 12 & 63] + B64[n >> 6 & 63] + B64[n & 63];
    }
    if (bytes.length - i === 1) { n = bytes[i] << 16; out += B64[n >> 18 & 63] + B64[n >> 12 & 63]; }
    if (bytes.length - i === 2) { n = bytes[i] << 16 | bytes[i + 1] << 8; out += B64[n >> 18 & 63] + B64[n >> 12 & 63] + B64[n >> 6 & 63]; }
    return out;
  }

  // ------------------------------------------------------------------ language
  // French pages (index-fr.html, app-fr.html, …) have <html lang="fr">; every message below has a French version.
  var LANG = root.document && root.document.documentElement && root.document.documentElement.lang === 'fr' ? 'fr' : 'en';
  var FR = {
    'Wrong email or password.': 'Courriel ou mot de passe incorrect.',
    'That email already has an account. Try logging in.': 'Ce courriel a déjà un compte. Essayez de vous connecter.',
    'Please confirm your email first. Check your inbox.': 'Veuillez d’abord confirmer votre courriel. Vérifiez votre boîte de réception.',
    'Your password must be at least 8 characters.': 'Votre mot de passe doit avoir au moins 8 caractères.',
    'You can add up to 6 children.': 'Vous pouvez ajouter jusqu’à 6 enfants.',
    'This page is for admins only.': 'Cette page est réservée aux administrateurs.',
    'Too many tries. Please wait a minute and try again.': 'Trop d’essais. Attendez une minute et réessayez.',
    'Please log in again.': 'Veuillez vous reconnecter.',
    'The server had a problem. Please try again in a minute.': 'Le serveur a eu un problème. Réessayez dans une minute.',
    'Something went wrong (code {code}).': 'Une erreur est survenue (code {code}).',
    'Login failed. Please try again.': 'La connexion a échoué. Veuillez réessayer.',
    'Could not reach the server. Check your internet connection.': 'Impossible de joindre le serveur. Vérifiez votre connexion Internet.',
    'Please log in.': 'Veuillez vous connecter.',
    'Please type a valid email address.': 'Veuillez entrer une adresse courriel valide.',
    'The two passwords are not the same.': 'Les deux mots de passe ne sont pas identiques.',
    'Please agree to the terms and privacy policy.': 'Veuillez accepter les conditions et la politique de confidentialité.',
    'Almost done! Check your email and click the link to confirm your account.': 'Presque fini! Vérifiez vos courriels et cliquez sur le lien pour confirmer votre compte.',
    'If that email has an account, a reset link is on its way.': 'Si ce courriel a un compte, un lien de réinitialisation est en route.',
    'Something went wrong.': 'Une erreur est survenue.',
    'Saved.': 'Enregistré.',
    ' (not offered in Quebec)': ' (non offert au Québec)',
    ' (coming soon)': ' (bientôt)',
    'Daily email is on.': 'Le courriel quotidien est activé.',
    'Daily email is off.': 'Le courriel quotidien est désactivé.',
    'Remove': 'Retirer',
    'Remove {name}? This also stops their daily email.': 'Retirer {name}? Cela arrête aussi son courriel quotidien.',
    'Open worksheets': 'Ouvrir les feuilles',
    '{grade} worksheets are not available.': 'Les feuilles pour {grade} ne sont pas offertes.',
    'Grade': 'Niveau scolaire', 'Level': 'Difficulté',
    'Email me an 8-page homework PDF every school day': 'M’envoyer un PDF de devoirs de 8 pages chaque jour d’école',
    'No children yet. Add one below.': 'Aucun enfant pour l’instant. Ajoutez-en un ci-dessous.',
    'Daily emails go out at about 4 pm {zone}, Monday to Friday. Weekends and {province} statutory holidays are skipped.':
      'Les courriels partent vers 16 h ({zone}), du lundi au vendredi. Les fins de semaine et les jours fériés de la province ({province}) sont sautés.',
    'Daily emails go out at about 4 pm {zone}, Monday to Friday. Weekends and US federal holidays are skipped.':
      'Les courriels partent vers 16 h ({zone}), du lundi au vendredi. Les fins de semaine et les jours fériés fédéraux américains sont sautés.',
    ' US families get US worksheets, with Spanish as the second language.': ' Les familles américaines reçoivent les feuilles américaines, avec l’espagnol comme langue seconde.',
    ' Quebec families get worksheets and emails in French.': ' Les familles du Québec reçoivent les feuilles et les courriels en français.',
    'Sent': 'Envoyé', 'Sending…': 'Envoi…', 'No emails yet.': 'Aucun courriel pour l’instant.',
    'Use a first name or nickname (1 to 30 letters, no < > & or quotes).': 'Utilisez un prénom ou un surnom (1 à 30 lettres, sans < > & ni guillemets).',
    '{name} was added.': '{name} a été ajouté(e).',
    'Settings saved.': 'Paramètres enregistrés.',
    'This deletes your account, your children and all settings. It cannot be undone.\nType DELETE to confirm:':
      'Cela supprime votre compte, vos enfants et tous les paramètres. C’est irréversible.\nTapez SUPPRIMER pour confirmer :',
    'DELETE': 'SUPPRIMER',
    'That link has expired or was already used. Please ask for a new one.': 'Ce lien est expiré ou a déjà été utilisé. Demandez-en un nouveau.',
    'Your email is confirmed. You can log in now.': 'Votre courriel est confirmé. Vous pouvez maintenant vous connecter.',
    'Checking your link…': 'Vérification du lien…',
    'Logged in as {email}. Choose a new password.': 'Connecté avec {email}. Choisissez un nouveau mot de passe.',
    'Please open the reset link in the same browser where you asked for it, or ask for a new link.':
      'Ouvrez le lien dans le même navigateur que celui où vous l’avez demandé, ou demandez un nouveau lien.',
    'This browser is too old to reset a password. Please try another browser.': 'Ce navigateur est trop ancien pour changer le mot de passe. Essayez un autre navigateur.',
    'Please choose a password that is different from your old one.': 'Choisissez un mot de passe différent de l’ancien.',
    'Canada': 'Canada', 'United States': 'États-Unis', ' (US worksheets, with Spanish)': ' (feuilles américaines, avec espagnol)',
    'parents': 'parents', 'children': 'enfants', 'daily emails on': 'courriels quotidiens actifs', 'emails sent': 'courriels envoyés'
  };
  function t(text, vars) {
    var out = LANG === 'fr' && has(FR, text) ? FR[text] : text;
    Object.keys(vars || {}).forEach(function (k) { out = out.split('{' + k + '}').join(String(vars[k])); });
    return out;
  }
  // the same page in the current language (admin stays in English)
  function pageFor(name) { return LANG === 'fr' && name !== 'admin.html' ? name.replace(/\.html$/, '-fr.html') : name; }

  // ------------------------------------------------------------------ Supabase client

  function AppError(message, status) { this.message = message; this.status = status || 0; }
  AppError.prototype = Object.create(Error.prototype);
  AppError.prototype.name = 'AppError';

  function friendly(status, data) {
    var raw = data && (data.error_description || data.msg || data.message || data.error) || '';
    var text = String(raw).toLowerCase();
    if (text.indexOf('invalid login') >= 0) return t('Wrong email or password.');
    if (text.indexOf('already registered') >= 0 || text.indexOf('already been registered') >= 0) return t('That email already has an account. Try logging in.');
    if (text.indexOf('email not confirmed') >= 0) return t('Please confirm your email first. Check your inbox.');
    if (text.indexOf('different from the old') >= 0) return t('Please choose a password that is different from your old one.');
    if (text.indexOf('password') >= 0 && text.indexOf('characters') >= 0) return t('Your password must be at least 8 characters.');
    if (text.indexOf('up to 6 children') >= 0) return t('You can add up to 6 children.');
    if (text.indexOf('admins only') >= 0) return t('This page is for admins only.');
    if (status === 429) return t('Too many tries. Please wait a minute and try again.');
    if (status === 401 || text.indexOf('jwt') >= 0) return t('Please log in again.');
    if (status >= 500) return t('The server had a problem. Please try again in a minute.');
    return raw ? String(raw).slice(0, 200) : t('Something went wrong (code {code}).', { code: status });
  }

  function Client(cfg, deps) {
    cfg = cfg || {};
    deps = deps || {};
    this.url = String(cfg.supabaseUrl || '').replace(/\/+$/, '');
    this.key = String(cfg.supabaseAnonKey || '');
    this.fetch = deps.fetch || (root.fetch && root.fetch.bind(root));
    this.store = deps.storage || null;
    this.now = deps.now || function () { return Date.now(); };
    this.crypto = deps.crypto || root.crypto || null;
  }
  Client.prototype.configured = function () {
    return /^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(this.url) && this.key.length > 20;
  };
  Client.prototype.session = function () {
    try {
      var s = JSON.parse(this.store.getItem(SESSION_KEY) || 'null');
      return s && s.access_token && s.user ? s : null;
    } catch (e) { return null; }
  };
  Client.prototype.saveSession = function (data) {
    if (!data || !data.access_token || !data.user) throw new AppError(t('Login failed. Please try again.'));
    var s = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at || Math.floor(this.now() / 1000) + (data.expires_in || 3600),
      user: { id: data.user.id, email: data.user.email }
    };
    try { this.store.setItem(SESSION_KEY, JSON.stringify(s)); } catch (e) { /* private window: stays logged in for this page only */ }
    return s;
  };
  Client.prototype.clearSession = function () {
    try { this.store.removeItem(SESSION_KEY); } catch (e) { /* ignore */ }
  };
  Client.prototype.request = function (method, path, body, opts) {
    opts = opts || {};
    var headers = { apikey: this.key, 'Content-Type': 'application/json', Accept: 'application/json' };
    // A logged-in user's token, or the old-style anon key (a JWT). New 'sb_publishable_' keys go only in apikey.
    var bearer = opts.token || (/^eyJ/.test(this.key) ? this.key : '');
    if (bearer) headers.Authorization = 'Bearer ' + bearer;
    if (opts.prefer) headers.Prefer = opts.prefer;
    var init = { method: method, headers: headers, credentials: 'omit', cache: 'no-store' };
    if (body !== undefined) init.body = JSON.stringify(body);
    return this.fetch(this.url + path, init).then(function (res) {
      return res.text().then(function (text) {
        var data = null;
        if (text) { try { data = JSON.parse(text); } catch (e) { data = { message: text.slice(0, 200) }; } }
        if (!res.ok) throw new AppError(friendly(res.status, data), res.status);
        return data;
      });
    }, function () {
      throw new AppError(t('Could not reach the server. Check your internet connection.'));
    });
  };
  function redirectQuery(redirectTo) { return redirectTo ? '?redirect_to=' + encodeURIComponent(redirectTo) : ''; }
  Client.prototype.signUp = function (email, password, redirectTo) {
    var self = this;
    return this.request('POST', '/auth/v1/signup' + redirectQuery(redirectTo), { email: email, password: password }).then(function (data) {
      if (data && data.access_token) { self.saveSession(data); return { loggedIn: true }; }
      return { loggedIn: false };  // email confirmation is switched on in Supabase
    });
  };
  Client.prototype.signIn = function (email, password) {
    var self = this;
    return this.request('POST', '/auth/v1/token?grant_type=password', { email: email, password: password })
      .then(function (data) { return self.saveSession(data); });
  };
  // Password reset uses PKCE: a random secret stays in this browser, and only its fingerprint goes to Supabase.
  // The emailed link brings back a one-time code that only works together with that secret, so a link
  // made by someone else can't log this browser into their account.
  Client.prototype.resetPassword = function (email, redirectTo) {
    var self = this, c = this.crypto, Enc = root.TextEncoder;
    if (!c || !c.subtle || !c.getRandomValues || !Enc) {
      return Promise.reject(new AppError(t('This browser is too old to reset a password. Please try another browser.')));
    }
    var verifier = b64url(c.getRandomValues(new Uint8Array(32)));
    return Promise.resolve(c.subtle.digest('SHA-256', new Enc().encode(verifier))).then(function (hash) {
      try { self.store.setItem(RESET_KEY, JSON.stringify({ v: verifier, at: self.now() })); } catch (e) { /* private window */ }
      return self.request('POST', '/auth/v1/recover' + redirectQuery(redirectTo),
        { email: email, code_challenge: b64url(new Uint8Array(hash)), code_challenge_method: 's256' });
    });
  };
  Client.prototype.exchangeResetCode = function (code) {
    var self = this, saved = null;
    try { saved = JSON.parse(this.store.getItem(RESET_KEY) || 'null'); } catch (e) { saved = null; }
    try { this.store.removeItem(RESET_KEY); } catch (e) { /* ignore */ }
    if (!saved || typeof saved.v !== 'string' || !(this.now() - saved.at < RESET_MAX_AGE)) {
      return Promise.reject(new AppError(t('Please open the reset link in the same browser where you asked for it, or ask for a new link.')));
    }
    return this.request('POST', '/auth/v1/token?grant_type=pkce', { auth_code: code, code_verifier: saved.v })
      .then(function (data) { return self.saveSession(data); });
  };
  Client.prototype.setPassword = function (password) {
    var self = this;
    return this.token().then(function (token) {
      return self.request('PUT', '/auth/v1/user', { password: password }, { token: token });
    });
  };
  Client.prototype.token = function () {
    var self = this, s = this.session();
    if (!s) return Promise.reject(new AppError(t('Please log in.'), 401));
    if (s.expires_at - 60 > Math.floor(this.now() / 1000)) return Promise.resolve(s.access_token);
    return this.request('POST', '/auth/v1/token?grant_type=refresh_token', { refresh_token: s.refresh_token })
      .then(function (data) { return self.saveSession(data).access_token; }, function (err) {
        self.clearSession();
        throw new AppError(t('Please log in again.'), 401);
      });
  };
  Client.prototype.signOut = function () {
    var self = this, s = this.session();
    var done = function () { self.clearSession(); };
    if (!s) { done(); return Promise.resolve(); }
    return this.request('POST', '/auth/v1/logout', {}, { token: s.access_token }).then(done, done);
  };
  Client.prototype.rest = function (method, path, body, prefer) {
    var self = this;
    return this.token().then(function (token) {
      return self.request(method, '/rest/v1/' + path, body, { token: token, prefer: prefer });
    });
  };
  Client.prototype.rpc = function (name, args) {
    return this.rest('POST', 'rpc/' + name, args || {});
  };

  // ------------------------------------------------------------------ small DOM helpers

  function el(tag, attrs, kids) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') node.textContent = attrs[k];
      else if (k === 'on') Object.keys(attrs.on).forEach(function (ev) { node.addEventListener(ev, attrs.on[ev]); });
      else if (attrs[k] === true) node.setAttribute(k, '');
      else if (attrs[k] !== false && attrs[k] != null) node.setAttribute(k, String(attrs[k]));
    });
    (kids || []).forEach(function (kid) { if (kid) node.appendChild(typeof kid === 'string' ? document.createTextNode(kid) : kid); });
    return node;
  }
  function options(map, selected, labelOf) {
    return Object.keys(map).map(function (k) {
      return el('option', { value: k, selected: String(k) === String(selected) }, [labelOf ? labelOf(k) : map[k]]);
    });
  }
  function say(node, text, ok) {
    node.textContent = text || '';
    node.className = 'msg ' + (ok ? 'ok' : 'err');
  }
  function busy(button, on) { if (button) button.disabled = !!on; }
  function validEmail(s) { return /^[^\s@<>,;]+@[^\s@<>,;]+\.[A-Za-z]{2,}$/.test(s) && s.length <= 254; }
  function validNickname(s) { return /^[^<>&"\r\n\t]{1,30}$/.test(s) && s.trim() !== ''; }
  // Quebec families get French worksheets that follow Quebec's school years.
  // Which worksheets a family gets: fr = Quebec (French), us = United States, en = the rest of Canada.
  function langFor(province) { return province === 'QC' ? 'fr' : has(STATES, province) ? 'us' : 'en'; }
  function isReady(grade, province) { return READY[langFor(province)].indexOf(Number(grade)) >= 0; }
  function gradeLabel(g, province) {
    var n = Number(g);
    if (LANG === 'fr') {
      if (province === 'QC' && n >= 7 && n <= 11) return QC_GRADES[n] + ' (' + n + 'e année)';
      return n === 0 ? 'Maternelle' : n === 1 ? '1re année' : n + 'e année';
    }
    if (province === 'QC' && has(QC_GRADES, g)) return QC_GRADES[g] + (n >= 7 && n <= 11 ? ' (Grade ' + g + ')' : '');
    return has(GRADES, g) ? GRADES[g] : 'Grade ' + g;
  }
  function levelNames() { return LANG === 'fr' ? LEVELS_FR : LEVELS; }
  var PROVINCES_FR = { AB: 'Alberta', BC: 'Colombie-Britannique', MB: 'Manitoba', NB: 'Nouveau-Brunswick', NL: 'Terre-Neuve-et-Labrador',
    NS: 'Nouvelle-Écosse', NT: 'Territoires du Nord-Ouest', NU: 'Nunavut', ON: 'Ontario', PE: 'Île-du-Prince-Édouard', QC: 'Québec',
    SK: 'Saskatchewan', YT: 'Yukon' };
  var ZONES_FR = { 'America/St_Johns': 'heure de Terre-Neuve', 'America/Halifax': 'heure de l’Atlantique (Halifax)', 'America/Moncton': 'heure de l’Atlantique (Moncton)',
    'America/Toronto': 'heure de l’Est', 'America/Winnipeg': 'heure du Centre', 'America/Regina': 'heure de la Saskatchewan', 'America/Edmonton': 'heure des Rocheuses',
    'America/Vancouver': 'heure du Pacifique', 'America/Whitehorse': 'heure du Yukon', 'America/Yellowknife': 'heure des Rocheuses (Yellowknife)', 'America/Iqaluit': 'heure de l’Est (Iqaluit)',
    'America/New_York': 'heure de l’Est (É.-U.)', 'America/Chicago': 'heure du Centre (É.-U.)', 'America/Denver': 'heure des Rocheuses (É.-U.)',
    'America/Phoenix': 'heure de l’Arizona', 'America/Los_Angeles': 'heure du Pacifique (É.-U.)', 'America/Anchorage': 'heure de l’Alaska', 'Pacific/Honolulu': 'heure d’Hawaï' };
  function provinceName(k) { return has(STATES, k) ? STATES[k][0] : LANG === 'fr' ? PROVINCES_FR[k] : PROVINCES[k][0]; }
  function zoneName(k) { return LANG === 'fr' ? ZONES_FR[k] : TIME_ZONES[k]; }
  function worksheetLink(child, province) {
    var q = new URLSearchParams({ grade: String(child.grade), level: child.level, subject: 'all' });
    if (langFor(province) === 'fr') q.set('lang', 'fr');
    if (langFor(province) === 'us') q.set('country', 'us');
    return 'homework.html?' + q.toString();
  }

  // ------------------------------------------------------------------ pages

  function client() {
    var store = null;
    try { store = root.localStorage; } catch (e) { store = null; }
    if (!store) {
      var mem = {};
      store = { getItem: function (k) { return has(mem, k) ? mem[k] : null; }, setItem: function (k, v) { mem[k] = v; }, removeItem: function (k) { delete mem[k]; } };
    }
    return new Client(root.G2_CONFIG, { storage: store });
  }

  function fillContact() {
    var email = root.G2_CONFIG && root.G2_CONFIG.contactEmail;
    document.querySelectorAll('[data-contact]').forEach(function (node) {
      if (email && validEmail(email)) node.replaceChildren(el('a', { href: 'mailto:' + email }, [email]));
    });
  }

  function homePage(api) {
    var forms = document.getElementById('authBox'), off = document.getElementById('notConfigured');
    if (!api.configured()) { forms.hidden = true; off.hidden = false; return; }
    if (api.session()) document.getElementById('goApp').hidden = false;
    var msg = document.getElementById('authMsg');
    var tabs = { login: document.getElementById('loginForm'), signup: document.getElementById('signupForm'), reset: document.getElementById('resetForm'),
      newpass: document.getElementById('newPassForm') };
    var here = root.location.protocol === 'https:' ? root.location.origin + root.location.pathname : '';
    function show(name) {
      Object.keys(tabs).forEach(function (k) { tabs[k].hidden = k !== name; });
      document.querySelectorAll('[data-tab]').forEach(function (b) { b.classList.toggle('ghost', b.getAttribute('data-tab') !== name); });
      say(msg, '');
    }
    document.querySelectorAll('[data-tab]').forEach(function (b) {
      b.addEventListener('click', function () { show(b.getAttribute('data-tab')); });
    });
    tabs.login.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var f = ev.target, email = f.email.value.trim(), btn = f.querySelector('button');
      if (!validEmail(email)) return say(msg, t('Please type a valid email address.'));
      busy(btn, true);
      api.signIn(email, f.password.value).then(function () { root.location.href = pageFor('app.html'); },
        function (err) { say(msg, err.message); busy(btn, false); });
    });
    tabs.signup.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var f = ev.target, email = f.email.value.trim(), btn = f.querySelector('button');
      if (!validEmail(email)) return say(msg, t('Please type a valid email address.'));
      if (f.password.value.length < 8) return say(msg, t('Your password must be at least 8 characters.'));
      if (f.password.value !== f.password2.value) return say(msg, t('The two passwords are not the same.'));
      if (!f.agree.checked) return say(msg, t('Please agree to the terms and privacy policy.'));
      busy(btn, true);
      api.signUp(email, f.password.value, here).then(function (r) {
        if (r.loggedIn) { root.location.href = pageFor('app.html'); return; }
        say(msg, t('Almost done! Check your email and click the link to confirm your account.'), true);
        busy(btn, false);
      }, function (err) { say(msg, err.message); busy(btn, false); });
    });
    tabs.reset.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var f = ev.target, email = f.email.value.trim(), btn = f.querySelector('button');
      if (!validEmail(email)) return say(msg, t('Please type a valid email address.'));
      busy(btn, true);
      api.resetPassword(email, here).then(function () {
        say(msg, t('If that email has an account, a reset link is on its way.'), true); busy(btn, false);
      }, function (err) { say(msg, err.message); busy(btn, false); });
    });
    tabs.newpass.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var f = ev.target, btn = f.querySelector('button');
      if (f.password.value.length < 8) return say(msg, t('Your password must be at least 8 characters.'));
      if (f.password.value !== f.password2.value) return say(msg, t('The two passwords are not the same.'));
      busy(btn, true);
      api.setPassword(f.password.value).then(function () { root.location.href = pageFor('app.html'); },
        function (err) { say(msg, err.message); busy(btn, false); });
    });
    show('signup');

    // Coming back from an emailed link (password reset or email confirmation).
    var land = landing(root.location);
    if (!land) return;
    try { root.history.replaceState(null, '', root.location.pathname); } catch (e) { /* ignore */ }  // never leave codes in the address bar
    if (land.code) {
      show('newpass');
      say(msg, t('Checking your link…'), true);
      api.exchangeResetCode(land.code).then(function (s) {
        say(msg, t('Logged in as {email}. Choose a new password.', { email: s.user.email }), true);
      }, function (err) {
        show('reset');
        say(msg, err.status ? t('That link has expired or was already used. Please ask for a new one.') : err.message);
      });
    } else if (land.confirmed) {
      show('login');
      say(msg, t('Your email is confirmed. You can log in now.'), true);
    } else if (land.error) {
      show('reset');
      say(msg, t('That link has expired or was already used. Please ask for a new one.'));
    }
  }

  // What an emailed link brought back in the address. Login tokens in the #fragment are never used:
  // only a PKCE code (which needs this browser's secret) can log someone in.
  function landing(loc) {
    var q = new URLSearchParams(loc.search || ''), h = new URLSearchParams(String(loc.hash || '').replace(/^#/, ''));
    var code = q.get('code');
    if (code !== null) return /^[A-Za-z0-9-]{8,200}$/.test(code) ? { code: code } : { error: true };
    if (q.get('error') || h.get('error')) return { error: true };
    if (h.get('type') === 'signup' || h.get('type') === 'email') return { confirmed: true };
    if (h.get('access_token')) return { error: true };
    return null;
  }

  function appPage(api) {
    if (!api.configured() || !api.session()) { root.location.replace(pageFor('index.html')); return; }
    var state = { profile: null, children: [], log: [] };
    var msg = document.getElementById('appMsg');
    document.getElementById('who').textContent = api.session().user.email;

    function fail(err) {
      if (err && err.status === 401) { api.clearSession(); root.location.replace(pageFor('index.html')); return; }
      say(msg, err && err.message ? err.message : t('Something went wrong.'));
    }
    function load() {
      return Promise.all([
        api.rest('GET', 'profiles?select=id,email,province,time_zone'),
        api.rest('GET', 'children?select=id,nickname,grade,level,daily_email,created_at&order=created_at'),
        api.rest('GET', 'email_log?select=child_id,sent_on,status&order=sent_on.desc&limit=30')
      ]).then(function (r) {
        state.profile = r[0][0] || null; state.children = r[1] || []; state.log = r[2] || [];
        render();
      }, fail);
    }
    function patchChild(child, change, note) {
      say(msg, '');
      return api.rest('PATCH', 'children?id=eq.' + encodeURIComponent(child.id), change, 'return=minimal')
        .then(function () { Object.assign(child, change); say(msg, note || t('Saved.'), true); render(); }, fail);
    }
    function childCard(child) {
      var prov = state.profile ? state.profile.province : '', ready = isReady(child.grade, prov);
      var gradeSel = el('select', { 'aria-label': t('Grade') }, options(GRADES, child.grade, function (g) {
        return gradeLabel(g, prov) + (isReady(g, prov) ? '' : prov === 'QC' ? t(' (not offered in Quebec)') : t(' (coming soon)'));
      }));
      gradeSel.addEventListener('change', function () { patchChild(child, { grade: Number(gradeSel.value) }); });
      var levelSel = el('select', { 'aria-label': t('Level') }, options(levelNames(), child.level));
      levelSel.addEventListener('change', function () { patchChild(child, { level: levelSel.value }); });
      var daily = el('input', { type: 'checkbox', checked: !!child.daily_email, disabled: !ready });
      daily.addEventListener('change', function () {
        patchChild(child, { daily_email: daily.checked }, daily.checked ? t('Daily email is on.') : t('Daily email is off.'));
      });
      var remove = el('button', { type: 'button', 'class': 'danger', text: t('Remove') });
      remove.addEventListener('click', function () {
        if (!root.confirm(t('Remove {name}? This also stops their daily email.', { name: child.nickname }))) return;
        api.rest('DELETE', 'children?id=eq.' + encodeURIComponent(child.id), undefined, 'return=minimal').then(load, fail);
      });
      var open = ready ? el('a', { 'class': 'btn ghost', href: worksheetLink(child, prov), target: '_blank', rel: 'noopener' }, [t('Open worksheets')])
        : el('span', { 'class': 'muted small', text: t('{grade} worksheets are not available.', { grade: gradeLabel(child.grade, prov) }) });
      return el('div', { 'class': 'child' }, [
        el('div', { 'class': 'child-head' }, [el('strong', { text: child.nickname }),
          el('span', { 'class': 'muted small', text: gradeLabel(child.grade, prov) + ' · ' + levelNames()[child.level] + (prov === 'QC' && LANG === 'en' ? ' · en français' : '') })]),
        el('div', { 'class': 'row' }, [el('label', {}, [t('Grade'), gradeSel]), el('label', {}, [t('Level'), levelSel])]),
        el('label', { 'class': 'check' }, [daily, t('Email me an 8-page homework PDF every school day')]),
        el('div', { 'class': 'row' }, [open, remove])
      ]);
    }
    function render() {
      var list = document.getElementById('children');
      list.replaceChildren.apply(list, state.children.length ? state.children.map(childCard)
        : [el('p', { 'class': 'muted', text: t('No children yet. Add one below.') })]);
      document.getElementById('addChild').hidden = state.children.length >= 6;
      fillGrades();

      var p = state.profile;
      if (p) {
        var prov = document.getElementById('province'), tz = document.getElementById('timeZone');
        prov.replaceChildren(
          el('optgroup', { label: t('Canada') }, options(PROVINCES, p.province, provinceName)),
          el('optgroup', { label: t('United States') }, options(STATES, p.province, provinceName)));
        tz.replaceChildren.apply(tz, options(TIME_ZONES, p.time_zone, zoneName));
        var us = has(STATES, p.province);
        document.getElementById('sendNote').textContent = (us
          ? t('Daily emails go out at about 4 pm {zone}, Monday to Friday. Weekends and US federal holidays are skipped.', { zone: zoneName(p.time_zone) }) + t(' US families get US worksheets, with Spanish as the second language.')
          : t('Daily emails go out at about 4 pm {zone}, Monday to Friday. Weekends and {province} statutory holidays are skipped.',
            { zone: zoneName(p.time_zone), province: provinceName(p.province) })) + (p.province === 'QC' ? t(' Quebec families get worksheets and emails in French.') : '');
      }
      var byId = {};
      state.children.forEach(function (c) { byId[c.id] = c.nickname; });
      var rows = state.log.map(function (l) {
        return el('tr', {}, [el('td', { text: l.sent_on }), el('td', { text: byId[l.child_id] || '' }),
          el('td', { text: l.status === 'sent' ? t('Sent') : t('Sending…') })]);
      });
      var body = document.getElementById('history');
      body.replaceChildren.apply(body, rows.length ? rows : [el('tr', {}, [el('td', { colspan: 3, 'class': 'muted', text: t('No emails yet.') })])]);
    }

    var gradeAdd = document.getElementById('newGrade'), levelAdd = document.getElementById('newLevel');
    function fillGrades() {
      var prov = state.profile ? state.profile.province : '', keep = gradeAdd.value || '2';
      gradeAdd.replaceChildren.apply(gradeAdd, options(GRADES, keep, function (g) {
        return gradeLabel(g, prov) + (isReady(g, prov) ? '' : prov === 'QC' ? t(' (not offered in Quebec)') : t(' (coming soon)'));
      }));
    }
    fillGrades();
    levelAdd.replaceChildren.apply(levelAdd, options(levelNames(), 'medium'));

    document.getElementById('addChild').addEventListener('submit', function (ev) {
      ev.preventDefault();
      var f = ev.target, name = f.nickname.value.trim(), btn = f.querySelector('button');
      if (!validNickname(name)) return say(msg, t('Use a first name or nickname (1 to 30 letters, no < > & or quotes).'));
      busy(btn, true);
      api.rest('POST', 'children', { nickname: name, grade: Number(f.grade.value), level: f.level.value, daily_email: false }, 'return=minimal')
        .then(function () { f.reset(); say(msg, t('{name} was added.', { name: name }), true); return load(); }, fail)
        .then(function () { busy(btn, false); });
    });
    document.getElementById('province').addEventListener('change', function (ev) {
      var tz = document.getElementById('timeZone');
      if (has(REGIONS, ev.target.value)) tz.value = REGIONS[ev.target.value][1];
    });
    document.getElementById('settings').addEventListener('submit', function (ev) {
      ev.preventDefault();
      var change = { province: ev.target.province.value, time_zone: ev.target.timeZone.value };
      if (!has(REGIONS, change.province) || !has(TIME_ZONES, change.time_zone)) return;
      api.rest('PATCH', 'profiles?id=eq.' + encodeURIComponent(api.session().user.id), change, 'return=minimal')
        .then(function () { Object.assign(state.profile, change); render(); say(msg, t('Settings saved.'), true); }, fail);
    });
    document.getElementById('logout').addEventListener('click', function () {
      api.signOut().then(function () { root.location.replace(pageFor('index.html')); });
    });
    document.getElementById('deleteAccount').addEventListener('click', function () {
      var typed = root.prompt(t('This deletes your account, your children and all settings. It cannot be undone.\nType DELETE to confirm:'));
      if (typed !== t('DELETE')) return;
      api.rpc('delete_my_account').then(function () { api.clearSession(); root.location.replace(pageFor('index.html')); }, fail);
    });
    api.rpc('is_admin').then(function (yes) { document.getElementById('adminLink').hidden = yes !== true; }, function () {});
    load();
  }

  function adminPage(api) {
    if (!api.configured() || !api.session()) { root.location.replace(pageFor('index.html')); return; }
    var msg = document.getElementById('adminMsg');
    api.rpc('admin_overview').then(function (rows) {
      rows = rows || [];
      var sum = function (k) { return rows.reduce(function (t, r) { return t + Number(r[k] || 0); }, 0); };
      var stats = document.getElementById('stats');
      stats.replaceChildren(
        el('div', { 'class': 'stat' }, [el('b', { text: String(rows.length) }), t('parents')]),
        el('div', { 'class': 'stat' }, [el('b', { text: String(sum('children')) }), t('children')]),
        el('div', { 'class': 'stat' }, [el('b', { text: String(sum('daily_emails')) }), t('daily emails on')]),
        el('div', { 'class': 'stat' }, [el('b', { text: String(sum('emails_sent')) }), t('emails sent')])
      );
      var day = function (t) { return t ? String(t).slice(0, 10) : '–'; };
      var body = document.getElementById('users');
      body.replaceChildren.apply(body, rows.map(function (r) {
        return el('tr', {}, [el('td', { text: r.email }), el('td', { text: r.province }), el('td', { text: day(r.signed_up) }),
          el('td', { text: day(r.last_sign_in) }), el('td', { text: String(r.children) }), el('td', { text: String(r.daily_emails) }),
          el('td', { text: String(r.emails_sent) })]);
      }));
    }, function (err) { say(msg, err.message); });
  }

  // ------------------------------------------------------------------ start

  root.G2 = { Client: Client, AppError: AppError, friendly: friendly, validEmail: validEmail, validNickname: validNickname,
    worksheetLink: worksheetLink, STATES: STATES, landing: landing, b64url: b64url, PROVINCES: PROVINCES, TIME_ZONES: TIME_ZONES, READY_GRADES: READY_GRADES, READY: READY,
    gradeLabel: gradeLabel, isReady: isReady, langFor: langFor, t: t, FR: FR, pageFor: pageFor };

  // Refuse to run inside another site's frame (GitHub Pages can't send the header that blocks this).
  if (root.document && root.top !== root.self) {
    root.document.documentElement.hidden = true;
    try { root.top.location = root.self.location.href; } catch (e) { /* blocked: page stays hidden */ }
    return;
  }

  if (root.document && root.document.body) {
    var page = root.document.body.getAttribute('data-page');
    var api = client();
    fillContact();
    if (page === 'home') homePage(api);
    else if (page === 'app') appPage(api);
    else if (page === 'admin') adminPage(api);
  }
})(typeof window !== 'undefined' ? window : globalThis);
