export type Line = {
  at: number;
  text: string;
};

export type Pack = 'hablan' | '3d' | 'vintage' | 'horror';

export type Clip = {
  id: string;
  title: string;
  hook: string;
  credit: string;
  src: string;
  poster: string;
  pack: Pack;
  talks: boolean;
  prompt: string;
  lines: Line[];
};

export type Challenge = {
  id: string;
  label: string;
  hint: string;
};

export const CHALLENGES: Challenge[] = [
  { id: 'libre', label: 'Libre', hint: '' },
  { id: 'vieja', label: 'Tu vieja', hint: 'Como si te estuviera retando en la cocina.' },
  { id: 'hincha', label: 'Hincha', hint: 'Gritá como si esto fuera el minuto 90.' },
  { id: 'noti', label: 'Noticiero', hint: 'Falso aplomo. Leé calamidades con sonrisa.' },
  { id: 'novela', label: 'Novela', hint: 'Traición, alquiler y un vaso de agua con tembleque.' },
  { id: 'nene', label: 'Nene de 5', hint: 'Todo es injusto. El juguete era tuyo.' },
  { id: 'asmr', label: 'ASMR', hint: 'Al oído. Como si el mic fuera una secretaria.' },
  { id: 'politico', label: 'Político', hint: 'No contestes nada. Agradecé la pregunta.' },
];

export const STOCK: Clip[] = [
  {
    id: 'boca',
    title: 'Cara a cara',
    hook: 'Boca enorme. Esto es el meme.',
    credit: 'Mixkit · stock libre',
    src: '/clips/boca.mp4',
    poster: '/posters/boca.jpg',
    pack: 'hablan',
    talks: true,
    prompt: 'Está confesando. Inventale el crimen.',
    lines: [
      { at: 0.2, text: 'No, pará. Te lo digo una vez y no lo repito.' },
      { at: 5.5, text: 'Eso que viste no fue lo que viste.' },
      { at: 11.0, text: 'Y si lo fue, no me mires así.' },
    ],
  },
  {
    id: 'duo',
    title: 'Los dos del aire',
    hook: 'Dos caras. Peleá los dos roles.',
    credit: 'Mixkit · stock libre',
    src: '/clips/duo.mp4',
    poster: '/posters/duo.jpg',
    pack: 'hablan',
    talks: true,
    prompt: 'Uno miente. El otro ya lo sabe.',
    lines: [
      { at: 0.2, text: 'Decime que no lo invitaste a él.' },
      { at: 6.0, text: 'Lo invité. Y va a pedir milanesa.' },
      { at: 12.0, text: 'Entonces esto ya es una guerra.' },
    ],
  },
  {
    id: 'pod',
    title: 'El podcast',
    hook: 'El tipo que explica de más.',
    credit: 'Mixkit · stock libre',
    src: '/clips/pod.mp4',
    poster: '/posters/pod.jpg',
    pack: 'hablan',
    talks: true,
    prompt: 'Está tirando data. Toda falsa.',
    lines: [
      { at: 0.3, text: 'La gente no entiende una cosa.' },
      { at: 6.2, text: 'Yo lo dije en el 2019. Nadie escuchó.' },
      { at: 12.0, text: 'Por eso ahora cobro en empanadas.' },
    ],
  },
  {
    id: 'radio',
    title: 'La locutora',
    hook: 'Cara seria. Noticia inventada.',
    credit: 'Mixkit · stock libre',
    src: '/clips/radio.mp4',
    poster: '/posters/radio.jpg',
    pack: 'hablan',
    talks: true,
    prompt: 'Leé una tragedia que no lo es.',
    lines: [
      { at: 0.2, text: 'Tenemos que hablar de lo de anoche.' },
      { at: 6.5, text: 'Nadie está confirmado. Todos están involucrados.' },
      { at: 12.5, text: 'Volvemos después de la tanda.' },
    ],
  },
  {
    id: 'cabina',
    title: 'Cabina propia',
    hook: 'Auriculares. Como si cobrara el aire.',
    credit: 'Mixkit · stock libre',
    src: '/clips/cabina.mp4',
    poster: '/posters/cabina.jpg',
    pack: 'hablan',
    talks: true,
    prompt: 'Está al aire y se le escapa la verdad.',
    lines: [
      { at: 0.2, text: 'Hola, ¿sí? No, no es un comercial.' },
      { at: 6.0, text: 'Es personal. Y va para el que sabe.' },
      { at: 11.5, text: 'Cortame cuando quieras. No me animo.' },
    ],
  },
  {
    id: 'zoom',
    title: 'Muy cerca',
    hook: 'Zoom a la boca. No hay escape.',
    credit: 'Mixkit · stock libre',
    src: '/clips/zoom.mp4',
    poster: '/posters/zoom.jpg',
    pack: 'hablan',
    talks: true,
    prompt: 'Susurrá una teoría de WhatsApp.',
    lines: [
      { at: 0.2, text: 'Esto no sale de acá.' },
      { at: 4.0, text: 'El grupo ya lo sabe, pero igual.' },
      { at: 7.5, text: 'Mañana actúo sorprendido.' },
    ],
  },
  {
    id: 'bronca',
    title: 'La bronca',
    hook: 'No parpadea. Cargale el discurso.',
    credit: 'Mixkit · stock libre',
    src: '/clips/bronca.mp4',
    poster: '/posters/bronca.jpg',
    pack: 'hablan',
    talks: true,
    prompt: 'Está por mandar a alguien a mudarse.',
    lines: [
      { at: 0.2, text: 'Ah, ¿ahora yo soy el problema?' },
      { at: 5.5, text: 'Perfecto. Anotalo. Anotalo bien.' },
      { at: 11.0, text: 'Nos vemos en el grupo de la familia.' },
    ],
  },
  {
    id: 'dead',
    title: 'Diez para las tres',
    hook: 'Zombies PD. Gritá como en el living.',
    credit: 'Romero 1968 · dominio público',
    src: '/clips/dead.mp4',
    poster: '/posters/dead.jpg',
    pack: 'horror',
    talks: true,
    prompt: 'La casa se cae. Alguien tiene un plan pésimo.',
    lines: [
      { at: 0.3, text: 'No es la hora. Es una amenaza.' },
      { at: 7.0, text: 'Si sale uno, salen todos. Como en el asado.' },
      { at: 13.0, text: 'Traben la puerta. Con la silla de siempre.' },
    ],
  },
  {
    id: 'tierra',
    title: 'Marte explica',
    hook: 'Dibujo 1956. Capitalismo espacial.',
    credit: 'Destination Earth 1956 · dominio público',
    src: '/clips/tierra.mp4',
    poster: '/posters/tierra.jpg',
    pack: 'vintage',
    talks: true,
    prompt: 'Un marciano te vende el sistema. Creéle menos.',
    lines: [
      { at: 0.3, text: 'En la Tierra, amigo, todo se perfora.' },
      { at: 6.0, text: 'Libertad es un pozo. Y un pozo cobra.' },
      { at: 12.0, text: 'Firmá acá. El planeta ya firmó.' },
    ],
  },
  {
    id: 'bert',
    title: 'Bert la tortuga',
    hook: 'Instructivo atómico. Peor si lo doblás bien.',
    credit: 'Duck and Cover 1951 · dominio público',
    src: '/clips/bert.mp4',
    poster: '/posters/bert.jpg',
    pack: 'vintage',
    talks: true,
    prompt: 'El Estado te calma. Vos no.',
    lines: [
      { at: 0.2, text: 'Cuando vea el flash, no corra. Fingí que entendés.' },
      { at: 6.5, text: 'Debajo del pupitre. El pupitre es el plan.' },
      { at: 12.5, text: 'Bert cobró. Usted está en la foto.' },
    ],
  },
  {
    id: 'flash',
    title: 'Duck and Cover',
    hook: 'Guerra fría. Sonrisa de manual.',
    credit: '1951 gobierno EE.UU. · dominio público',
    src: '/clips/flash.mp4',
    poster: '/posters/flash.jpg',
    pack: 'vintage',
    talks: true,
    prompt: 'Instructivo. Doblalo peor.',
    lines: [
      { at: 0.3, text: 'Esto es un consejo. No es un consuelo.' },
      { at: 8.0, text: 'Tápese la cabeza. El resto es fe.' },
      { at: 16.0, text: 'Si sobrevive, sonría para la cámara.' },
    ],
  },
  {
    id: 'acero',
    title: 'Thom, cortala',
    hook: '3D que pelea. Diálogo de verdad.',
    credit: 'Blender Foundation · CC-BY',
    src: '/clips/acero.mp4',
    poster: '/posters/acero.jpg',
    pack: '3d',
    talks: true,
    prompt: 'Ruptura en Ámsterdam. Más rencor, menos sci-fi.',
    lines: [
      { at: 0.3, text: 'Sos un jerk, Thom. Lo dije lindo.' },
      { at: 6.0, text: 'Tu mano robot me da pesadillas. Y razón.' },
      { at: 12.0, text: 'Andate a ser genial al espacio. Yo me quedo.' },
    ],
  },
  {
    id: 'sintel',
    title: 'Sintel',
    hook: 'Fantasía 3D. Cansada, no épica.',
    credit: 'Blender Foundation · CC-BY · 3D',
    src: '/clips/sintel.mp4',
    poster: '/posters/sintel.jpg',
    pack: '3d',
    talks: false,
    prompt: 'Busca a alguien. Como siempre.',
    lines: [
      { at: 0.4, text: 'Si el dragón pregunta, yo no estuve.' },
      { at: 8.0, text: 'Busco a alguien. Como siempre.' },
      { at: 15.0, text: 'Si esto es el destino, que pague el taxi.' },
    ],
  },
  {
    id: 'bunny',
    title: 'Big Buck Bunny',
    hook: 'El conejo se harta. 3D de verdad.',
    credit: 'Blender Foundation · CC-BY · 3D',
    src: '/clips/bunny.mp4',
    poster: '/posters/bunny.jpg',
    pack: '3d',
    talks: false,
    prompt: 'Doblalo como si cobrara alquiler.',
    lines: [
      { at: 0.4, text: 'Otra vez los de arriba. Siempre los de arriba.' },
      { at: 6.2, text: 'Yo solo quería una mañana. Una.' },
      { at: 12.5, text: 'Bien. Ahora el jardín cobra intereses.' },
    ],
  },
  {
    id: 'revenge',
    title: 'El conejo cobra',
    hook: 'Venganza 3D. Villano de telenovela.',
    credit: 'Blender Foundation · CC-BY · 3D',
    src: '/clips/revenge.mp4',
    poster: '/posters/revenge.jpg',
    pack: '3d',
    talks: false,
    prompt: 'Esto no es un gag. Es un desalojo.',
    lines: [
      { at: 0.3, text: 'Ustedes jugaron con el césped equivocado.' },
      { at: 7.0, text: 'Esto no es un gag. Es un desalojo.' },
      { at: 14.0, text: 'Que corran. El jardín tiene memoria.' },
    ],
  },
];

export const PACKS: { id: Pack | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Tanda' },
  { id: 'hablan', label: 'Hablan' },
  { id: 'vintage', label: 'Vintage' },
  { id: 'horror', label: 'Horror' },
  { id: '3d', label: '3D' },
];

export function lineAt(clip: Clip, t: number): Line | null {
  let cur: Line | null = null;
  for (const l of clip.lines) {
    if (t >= l.at) cur = l;
  }
  return cur;
}
