export const LOCALES = ['es', 'en', 'de', 'pt', 'fr', 'ja'] as const;
export type Locale = (typeof LOCALES)[number];

const COPY: Record<
  Locale,
  {
    kicker: string;
    fileBtn: string;
    scene: string;
    fileTitle: string;
    fileBody: string;
    openFile: string;
    yourClip: string;
    yourClipSub: string;
    foot: string;
    booth: string;
    watch: string;
    dub: string;
    back: string;
    cut: string;
    again: string;
    play: string;
    share: string;
    sharing: string;
    copy: string;
    copied: string;
    talks: string;
    cue: string;
    hintPick: string;
    hintWatch: string;
    hintRec: string;
    hintPlay: string;
    errMicHttp: string;
    errMic: string;
    errEmpty: string;
    errSound: string;
    errDub: string;
    errExport: string;
    errCopy: string;
    packs: Record<string, string>;
    challenges: { id: string; label: string; hint: string }[];
    byoHook: string;
    byoPrompt: string;
  }
> = {
  es: {
    kicker: 'Tocá una cara. Hablá encima.',
    fileBtn: 'Tu video',
    scene: 'esta escena',
    fileTitle: '¿Tenés un video?',
    fileBody: 'El del chat o el TikTok. Se queda en el teléfono.',
    openFile: 'Elegir archivo',
    yourClip: 'Tu video',
    yourClipSub: 'El que ya tenés',
    foot: 'Tocá una escena y hablá encima.',
    booth: 'Tanda',
    watch: 'Mirá',
    dub: 'Doblá',
    back: 'Atrás',
    cut: 'Cortá',
    again: 'Otra',
    play: 'Play',
    share: 'Al grupo',
    sharing: 'Armando…',
    copy: 'Copiá el link',
    copied: 'Link copiado',
    talks: 'habla',
    cue: 'guión',
    hintPick: 'Mirá con sonido. Doblá con el mic del celu.',
    hintWatch: 'Reproducción. El mic no hace falta.',
    hintRec: 'Hablá ahora. El original queda bajito.',
    hintPlay: 'Mandalo al grupo. El video se arma acá.',
    errMicHttp: 'En el celu el mic pide HTTPS. Entrá por el link de TOMA, no por la IP.',
    errMic: 'Este aparato no tiene mic, o lo bloqueó. Mirá el clip igual.',
    errEmpty: 'La toma salió vacía. En este aparato no hay mic, o está muy bajo.',
    errSound: 'Tocá Mirá otra vez para dar sonido.',
    errDub: 'Tocá Doblá otra vez.',
    errExport: 'No se pudo exportar',
    errCopy: 'No se pudo copiar el link.',
    packs: { meme: 'Famosos', caras: 'Caras', vintage: 'Vintage', horror: 'Horror', '3d': '3D' },
    challenges: [
      { id: 'libre', label: 'Libre', hint: '' },
      { id: 'vieja', label: 'Tu vieja', hint: 'Como si te estuviera retando en la cocina.' },
      { id: 'hincha', label: 'Hincha', hint: 'Gritá como si esto fuera el minuto 90.' },
      { id: 'noti', label: 'Noticiero', hint: 'Falso aplomo. Leé calamidades con sonrisa.' },
      { id: 'novela', label: 'Novela', hint: 'Traición, alquiler y un vaso de agua con tembleque.' },
      { id: 'nene', label: 'Nene de 5', hint: 'Todo es injusto. El juguete era tuyo.' },
      { id: 'asmr', label: 'ASMR', hint: 'Al oído. Como si el mic fuera una secretaria.' },
      { id: 'politico', label: 'Político', hint: 'No contestes nada. Agradecé la pregunta.' },
    ],
    byoHook: 'Tu archivo. No se sube.',
    byoPrompt: 'Hablá encima. Esta es tu toma.',
  },
  en: {
    kicker: 'Tap a face. Talk over it.',
    fileBtn: 'Your video',
    scene: 'this scene',
    fileTitle: 'Got a video?',
    fileBody: 'From chat or TikTok. It stays on the phone.',
    openFile: 'Choose file',
    yourClip: 'Your video',
    yourClipSub: 'The one you already have',
    foot: 'Tap a scene and talk over it.',
    booth: 'Reel',
    watch: 'Watch',
    dub: 'Dub',
    back: 'Back',
    cut: 'Cut',
    again: 'Again',
    play: 'Play',
    share: 'Share',
    sharing: 'Building…',
    copy: 'Copy link',
    copied: 'Copied',
    talks: 'talks',
    cue: 'cue',
    hintPick: 'Watch with sound. Dub with the phone mic.',
    hintWatch: 'Playback. No mic needed.',
    hintRec: 'Talk now. The original stays low.',
    hintPlay: 'Send it. The clip is built here.',
    errMicHttp: 'The phone mic needs HTTPS. Use the TOMA link, not the LAN IP.',
    errMic: 'No mic on this device, or it blocked it. Watch anyway.',
    errEmpty: 'Empty take. No mic, or it is too quiet.',
    errSound: 'Tap Watch again for sound.',
    errDub: 'Tap Dub again.',
    errExport: 'Could not export',
    errCopy: 'Could not copy the link.',
    packs: { meme: 'Known', caras: 'Faces', vintage: 'Vintage', horror: 'Horror', '3d': '3D' },
    challenges: [
      { id: 'libre', label: 'Free', hint: '' },
      { id: 'vieja', label: 'Your mom', hint: 'Like she is yelling from the kitchen.' },
      { id: 'hincha', label: 'Fan', hint: 'Scream like minute 90.' },
      { id: 'noti', label: 'News', hint: 'Fake calm. Smile through disaster.' },
      { id: 'novela', label: 'Soap', hint: 'Betrayal and a shaking glass of water.' },
      { id: 'nene', label: 'Kid', hint: 'Everything is unfair. That toy was yours.' },
      { id: 'asmr', label: 'ASMR', hint: 'Into the ear. Soft.' },
      { id: 'politico', label: 'Politician', hint: 'Answer nothing. Thank them for the question.' },
    ],
    byoHook: 'Local file. Never uploaded.',
    byoPrompt: 'Talk over it. This is your take.',
  },
  de: {
    kicker: 'Gesicht antippen. Drübersprechen.',
    fileBtn: 'Dein Video',
    scene: 'diese Szene',
    fileTitle: 'Hast du ein Video?',
    fileBody: 'Aus dem Chat oder TikTok. Bleibt auf dem Handy.',
    openFile: 'Datei wählen',
    yourClip: 'Dein Video',
    yourClipSub: 'Was du schon hast',
    foot: 'Szene antippen und drübersprechen.',
    booth: 'Rolle',
    watch: 'Gucken',
    dub: 'Synchro',
    back: 'Zurück',
    cut: 'Schnitt',
    again: 'Nochmal',
    play: 'Play',
    share: 'Teilen',
    sharing: 'Bauen…',
    copy: 'Link kopieren',
    copied: 'Kopiert',
    talks: 'spricht',
    cue: 'text',
    hintPick: 'Mit Ton gucken. Mit dem Handy-Mic synchronisieren.',
    hintWatch: 'Wiedergabe. Kein Mic.',
    hintRec: 'Jetzt reden. Original leise.',
    hintPlay: 'Abschicken. Der Clip entsteht hier.',
    errMicHttp: 'Das Mic braucht HTTPS. TOMA-Link, nicht die IP.',
    errMic: 'Kein Mic, oder blockiert. Trotzdem gucken.',
    errEmpty: 'Leere Aufnahme. Kein Mic oder zu leise.',
    errSound: 'Nochmal Gucken für Ton.',
    errDub: 'Nochmal Synchro.',
    errExport: 'Export fehlgeschlagen',
    errCopy: 'Link ging nicht.',
    packs: { meme: 'Bekannt', caras: 'Gesichter', vintage: 'Vintage', horror: 'Horror', '3d': '3D' },
    challenges: [
      { id: 'libre', label: 'Frei', hint: '' },
      { id: 'vieja', label: 'Mama', hint: 'Als ob sie aus der Küche schreit.' },
      { id: 'hincha', label: 'Fan', hint: 'Minute 90.' },
      { id: 'noti', label: 'News', hint: 'Falsche Ruhe.' },
      { id: 'novela', label: 'Soap', hint: 'Verrat und zittriges Glas.' },
      { id: 'nene', label: 'Kind', hint: 'Alles unfair.' },
      { id: 'asmr', label: 'ASMR', hint: 'Ins Ohr.' },
      { id: 'politico', label: 'Politiker', hint: 'Nichts beantworten.' },
    ],
    byoHook: 'Lokale Datei. Nie hochgeladen.',
    byoPrompt: 'Sprich drüber. Deine Take.',
  },
  pt: {
    kicker: 'Toca uma cara. Fala por cima.',
    fileBtn: 'Seu vídeo',
    scene: 'esta cena',
    fileTitle: 'Tem um vídeo?',
    fileBody: 'Do chat ou do TikTok. Fica no celular.',
    openFile: 'Escolher arquivo',
    yourClip: 'Seu vídeo',
    yourClipSub: 'O que você já tem',
    foot: 'Toca uma cena e fala por cima.',
    booth: 'Tanda',
    watch: 'Olha',
    dub: 'Dobra',
    back: 'Volta',
    cut: 'Corta',
    again: 'Outra',
    play: 'Play',
    share: 'No grupo',
    sharing: 'Montando…',
    copy: 'Copia o link',
    copied: 'Copiado',
    talks: 'fala',
    cue: 'roteiro',
    hintPick: 'Olha com som. Dobra no mic do celular.',
    hintWatch: 'Reprodução. Sem mic.',
    hintRec: 'Fala agora. O original fica baixo.',
    hintPlay: 'Manda. O clipe nasce aqui.',
    errMicHttp: 'O mic pede HTTPS. Entra pelo link da TOMA.',
    errMic: 'Sem mic, ou bloqueou. Olha mesmo assim.',
    errEmpty: 'Take vazia. Sem mic ou baixo demais.',
    errSound: 'Toca Olha de novo pro som.',
    errDub: 'Toca Dobra de novo.',
    errExport: 'Não deu pra exportar',
    errCopy: 'Não deu pra copiar o link.',
    packs: { meme: 'Famosos', caras: 'Caras', vintage: 'Vintage', horror: 'Horror', '3d': '3D' },
    challenges: [
      { id: 'libre', label: 'Livre', hint: '' },
      { id: 'vieja', label: 'Sua mãe', hint: 'Como se estivesse gritando na cozinha.' },
      { id: 'hincha', label: 'Torcida', hint: 'Minuto 90.' },
      { id: 'noti', label: 'Jornal', hint: 'Calma falsa.' },
      { id: 'novela', label: 'Novela', hint: 'Traição e copo tremendo.' },
      { id: 'nene', label: 'Criança', hint: 'Tudo injusto.' },
      { id: 'asmr', label: 'ASMR', hint: 'No ouvido.' },
      { id: 'politico', label: 'Político', hint: 'Não responde nada.' },
    ],
    byoHook: 'Arquivo local. Não sobe.',
    byoPrompt: 'Fala por cima. Essa é sua take.',
  },
  fr: {
    kicker: 'Touche un visage. Parle par-dessus.',
    fileBtn: 'Ta vidéo',
    scene: 'cette scène',
    fileTitle: 'T’as une vidéo ?',
    fileBody: 'Du chat ou de TikTok. Elle reste sur le téléphone.',
    openFile: 'Choisir un fichier',
    yourClip: 'Ta vidéo',
    yourClipSub: 'Celle que tu as déjà',
    foot: 'Touche une scène et parle par-dessus.',
    booth: 'Bande',
    watch: 'Regarde',
    dub: 'Double',
    back: 'Retour',
    cut: 'Coupe',
    again: 'Encore',
    play: 'Play',
    share: 'Partage',
    sharing: 'Montage…',
    copy: 'Copier le lien',
    copied: 'Copié',
    talks: 'parle',
    cue: 'texte',
    hintPick: 'Regarde avec le son. Double avec le micro.',
    hintWatch: 'Lecture. Pas de micro.',
    hintRec: 'Parle. L’original reste bas.',
    hintPlay: 'Envoie. Le clip se fait ici.',
    errMicHttp: 'Le micro veut du HTTPS. Lien TOMA, pas l’IP.',
    errMic: 'Pas de micro, ou bloqué. Regarde quand même.',
    errEmpty: 'Prise vide. Pas de micro ou trop bas.',
    errSound: 'Retape Regarde pour le son.',
    errDub: 'Retape Double.',
    errExport: 'Export impossible',
    errCopy: 'Lien pas copié.',
    packs: { meme: 'Connus', caras: 'Visages', vintage: 'Vintage', horror: 'Horreur', '3d': '3D' },
    challenges: [
      { id: 'libre', label: 'Libre', hint: '' },
      { id: 'vieja', label: 'Ta mère', hint: 'Comme depuis la cuisine.' },
      { id: 'hincha', label: 'Supporter', hint: 'La 90e.' },
      { id: 'noti', label: 'JT', hint: 'Calme faux.' },
      { id: 'novela', label: 'Soap', hint: 'Trahison.' },
      { id: 'nene', label: 'Gosse', hint: 'Tout est injuste.' },
      { id: 'asmr', label: 'ASMR', hint: 'À l’oreille.' },
      { id: 'politico', label: 'Politique', hint: 'Ne réponds rien.' },
    ],
    byoHook: 'Fichier local. Jamais envoyé.',
    byoPrompt: 'Parle par-dessus. Ta prise.',
  },
  ja: {
    kicker: '顔を押して。上からしゃべる。',
    fileBtn: '自分の動画',
    scene: 'このシーン',
    fileTitle: '動画ある？',
    fileBody: 'チャットでもTikTokでも。端末から出ない。',
    openFile: 'ファイルを選ぶ',
    yourClip: '自分の動画',
    yourClipSub: '持っているやつ',
    foot: 'シーンを押して、上からしゃべる。',
    booth: 'リール',
    watch: '見る',
    dub: '吹く',
    back: '戻る',
    cut: 'カット',
    again: 'もう一回',
    play: '再生',
    share: '送る',
    sharing: '作成中…',
    copy: 'リンクをコピー',
    copied: 'コピーした',
    talks: '話す',
    cue: 'セリフ',
    hintPick: '音ありで見る。スマホのマイクで吹く。',
    hintWatch: '再生。マイク不要。',
    hintRec: '今しゃべる。元音は小さく。',
    hintPlay: '送る。ここでクリップになる。',
    errMicHttp: 'マイクはHTTPSが必要。TOMAのリンクで開く。',
    errMic: 'マイクがないか、拒否された。見るのはできる。',
    errEmpty: '録れてない。マイクがないか小さい。',
    errSound: 'もう一度「見る」で音を出す。',
    errDub: 'もう一度「吹く」。',
    errExport: '書き出せない',
    errCopy: 'コピーできない。',
    packs: { meme: '有名', caras: '顔', vintage: 'ヴィンテージ', horror: 'ホラー', '3d': '3D' },
    challenges: [
      { id: 'libre', label: '自由', hint: '' },
      { id: 'vieja', label: '母', hint: '台所から怒鳴る感じ。' },
      { id: 'hincha', label: 'ファン', hint: '90分の叫び。' },
      { id: 'noti', label: 'ニュース', hint: '偽の冷静。' },
      { id: 'novela', label: 'ドラマ', hint: '裏切り。' },
      { id: 'nene', label: '子供', hint: '全部ずるい。' },
      { id: 'asmr', label: 'ASMR', hint: '耳元。' },
      { id: 'politico', label: '政治家', hint: '何も答えない。' },
    ],
    byoHook: 'ローカル。アップロードしない。',
    byoPrompt: '上からしゃべる。これがテイク。',
  },
};

export function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem('toma-lang');
    if (saved && (LOCALES as readonly string[]).includes(saved)) return saved as Locale;
  } catch {
    /* ignore */
  }
  const raw = (typeof navigator !== 'undefined' ? navigator.language : 'es') || 'es';
  const base = raw.slice(0, 2).toLowerCase();
  if ((LOCALES as readonly string[]).includes(base)) return base as Locale;
  return 'es';
}

export function persistLocale(locale: Locale) {
  try {
    localStorage.setItem('toma-lang', locale);
  } catch {
    /* ignore */
  }
  document.documentElement.lang = locale;
}

export function copyFor(locale: Locale) {
  return COPY[locale];
}
