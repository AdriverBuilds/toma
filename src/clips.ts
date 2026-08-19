export type Line = {
  at: number;
  text: string;
};

export type Pack = 'meme' | 'caras' | '3d' | 'vintage' | 'horror';

/** Audio of the hosted file. `ja` always shows. `any` = no speech / stock. */
export type AudioLang = 'silent' | 'any' | 'es' | 'en' | 'de' | 'pt' | 'fr' | 'ja';

export type Clip = {
  id: string;
  title: string;
  hook: string;
  credit: string;
  src: string;
  poster: string;
  pack: Pack;
  talks: boolean;
  audio?: AudioLang;
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
    id: 'willie',
    title: 'Willie',
    hook: 'Mickey 1928. El gag que todos vieron.',
    credit: 'Steamboat Willie 1928 · dominio público',
    src: '/clips/willie.mp4',
    poster: '/posters/willie.jpg',
    pack: 'meme',
    talks: false,
    audio: 'silent',
    prompt: 'No habla. Inventale el monólogo igual.',
    lines: [
      { at: 0.2, text: 'Yo manejo. El río ya se dio cuenta.' },
      { at: 6.0, text: 'Silbá si querés. Yo cobro el pasaje.' },
      { at: 12.0, text: 'El barco es mío. El gag también.' },
    ],
  },
  {
    id: 'barbara',
    title: 'Ya vienen, Barbara',
    hook: 'LA frase. Cementerio. Zombies.',
    credit: 'Romero 1968 · dominio público',
    src: '/clips/barbara.mp4',
    poster: '/posters/barbara.jpg',
    pack: 'meme',
    talks: true,
    audio: 'en',
    prompt: 'Asustala. Después asustate vos.',
    lines: [
      { at: 0.2, text: 'Están viniendo a buscarte, Barbara.' },
      { at: 6.0, text: 'Dejá de joder. En serio, dejá de joder.' },
      { at: 12.0, text: 'No era un gag. Mirá atrás.' },
    ],
  },
  {
    id: 'bert',
    title: 'Bert la tortuga',
    hook: 'Duck and Cover. El instructivo atómico.',
    credit: 'Duck and Cover 1951 · dominio público',
    src: '/clips/bert.mp4',
    poster: '/posters/bert.jpg',
    pack: 'meme',
    talks: true,
    audio: 'en',
    prompt: 'El Estado te calma. Vos no.',
    lines: [
      { at: 0.2, text: 'Cuando vea el flash, no corra. Fingí que entendés.' },
      { at: 6.5, text: 'Debajo del pupitre. El pupitre es el plan.' },
      { at: 12.5, text: 'Bert cobró. Usted está en la foto.' },
    ],
  },
  {
    id: 'plane',
    title: 'Plane Crazy',
    hook: 'Mickey 1929. El otro gag.',
    credit: 'Plane Crazy 1929 · dominio público',
    src: '/clips/plane.mp4',
    poster: '/posters/plane.jpg',
    pack: 'meme',
    talks: false,
    audio: 'silent',
    prompt: 'El avión no despegó. Inventale por qué.',
    lines: [
      { at: 0.2, text: 'Esto vuela. En teoría vuela.' },
      { at: 6.0, text: 'El granero ya firmó el consentimiento.' },
      { at: 12.0, text: 'Si cae, fue idea de la vaca.' },
    ],
  },
  {
    id: 'huesos',
    title: 'Skeleton Dance',
    hook: 'Silly Symphony 1929. Los huesos.',
    credit: 'The Skeleton Dance 1929 · dominio público',
    src: '/clips/huesos.mp4',
    poster: '/posters/huesos.jpg',
    pack: 'meme',
    talks: false,
    audio: 'silent',
    prompt: 'No habla. El cementerio sí.',
    lines: [
      { at: 0.2, text: 'Salimos a las doce. Como siempre.' },
      { at: 6.0, text: 'El búho cobra entrada. Nosotros el show.' },
      { at: 12.0, text: 'Mañana volvemos al cajón. Sin queja.' },
    ],
  },
  {
    id: 'chaplin',
    title: 'Chaplin come',
    hook: 'El Inmigrante. El plato. La cara.',
    credit: 'The Immigrant 1917 · dominio público',
    src: '/clips/chaplin.mp4',
    poster: '/posters/chaplin.jpg',
    pack: 'meme',
    talks: false,
    audio: 'silent',
    prompt: 'Mudo. Igual pedile la cuenta.',
    lines: [
      { at: 0.2, text: 'Esto no es una cita. Es una negociación.' },
      { at: 6.0, text: 'El mozo ya sabe. Yo todavía no.' },
      { at: 12.0, text: 'Si no hay propina, hay palo.' },
    ],
  },
  {
    id: 'grant',
    title: 'His Girl Friday',
    hook: 'Russell contra Grant. La redacción.',
    credit: 'His Girl Friday 1940 · dominio público',
    src: '/clips/grant.mp4',
    poster: '/posters/grant.jpg',
    pack: 'meme',
    talks: true,
    audio: 'en',
    prompt: 'Dos voces. Ninguna cede.',
    lines: [
      { at: 0.2, text: 'El titular ya está. Vos todavía no.' },
      { at: 6.0, text: 'No me mires así. Escribe.' },
      { at: 12.0, text: 'Mañana es portada. Hoy es pelea.' },
    ],
  },
  {
    id: 'felix',
    title: 'Felix',
    hook: 'El gato. 1928. La sonrisa.',
    credit: 'Felix Sure-Locked Homes 1928 · dominio público',
    src: '/clips/felix.mp4',
    poster: '/posters/felix.jpg',
    pack: 'meme',
    talks: false,
    audio: 'silent',
    prompt: 'El gato ya ganó. Confesá vos.',
    lines: [
      { at: 0.2, text: 'La casa era mía. El candado también.' },
      { at: 6.0, text: 'Sonrío porque ya lo cobré.' },
      { at: 12.0, text: 'La luna es testigo. Y cómplice.' },
    ],
  },
  {
    id: 'luna',
    title: 'Viaje a la Luna',
    hook: 'Méliès 1902. La cara en el cielo.',
    credit: 'Le Voyage dans la Lune 1902 · dominio público',
    src: '/clips/luna.mp4',
    poster: '/posters/luna.jpg',
    pack: 'meme',
    talks: false,
    audio: 'silent',
    prompt: 'Llegaron. Inventales el informe.',
    lines: [
      { at: 0.2, text: 'Pisamos. El suelo se queja.' },
      { at: 6.0, text: 'Esto no era el folleto.' },
      { at: 12.0, text: 'El regreso cobra extra.' },
    ],
  },
  {
    id: 'kantei',
    title: 'La premier',
    hook: 'Discurso oficial. Japonés. Cara a cámara.',
    credit: 'Kantei 2026 · Public Data License',
    src: '/clips/kantei.mp4',
    poster: '/posters/kantei.jpg',
    pack: 'meme',
    talks: true,
    audio: 'ja',
    prompt: 'No traduzcas. Inventá el anuncio.',
    lines: [
      { at: 0.2, text: 'Hoy anunciamos lo de siempre, pero más alto.' },
      { at: 6.0, text: 'La tecnología ya firmó. El pueblo todavía no.' },
      { at: 12.0, text: 'Aplauso. Después vemos.' },
    ],
  },
  {
    id: 'reloj',
    title: 'Safety Last',
    hook: 'Lloyd. El edificio. El gag.',
    credit: 'Safety Last! 1923 · dominio público',
    src: '/clips/reloj.mp4',
    poster: '/posters/reloj.jpg',
    pack: 'meme',
    talks: false,
    audio: 'silent',
    prompt: 'No habla. El piso 12 sí.',
    lines: [
      { at: 0.2, text: 'No mires abajo. Ya miré.' },
      { at: 6.0, text: 'El policía espera. El reloj también.' },
      { at: 12.0, text: 'Si caigo, que pague el edificio.' },
    ],
  },
  {
    id: 'tierra',
    title: 'Marte explica',
    hook: 'Dibujo 1956. El marciano vende el sistema.',
    credit: 'Destination Earth 1956 · dominio público',
    src: '/clips/tierra.mp4',
    poster: '/posters/tierra.jpg',
    pack: 'vintage',
    talks: true,
    audio: 'en',
    prompt: 'Un marciano te vende el sistema. Creéle menos.',
    lines: [
      { at: 0.3, text: 'En la Tierra, amigo, todo se perfora.' },
      { at: 6.0, text: 'Libertad es un pozo. Y un pozo cobra.' },
      { at: 12.0, text: 'Firmá acá. El planeta ya firmó.' },
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
    audio: 'en',
    prompt: 'Instructivo. Doblalo peor.',
    lines: [
      { at: 0.3, text: 'Esto es un consejo. No es un consuelo.' },
      { at: 8.0, text: 'Tápese la cabeza. El resto es fe.' },
      { at: 16.0, text: 'Si sobrevive, sonría para la cámara.' },
    ],
  },
  {
    id: 'cita',
    title: 'La cita',
    hook: 'Dating Do’s. Manual de 1949.',
    credit: 'Dating Do’s and Don’ts 1949 · dominio público',
    src: '/clips/cita.mp4',
    poster: '/posters/cita.jpg',
    pack: 'vintage',
    talks: true,
    audio: 'en',
    prompt: 'La mamá ya sabe. El teléfono no.',
    lines: [
      { at: 0.2, text: 'Decile que voy. No le digas a qué hora.' },
      { at: 6.0, text: 'Si pregunta de dónde saco plata, cortá.' },
      { at: 12.0, text: 'Mamá, esto ya es una guerra.' },
    ],
  },
  {
    id: 'popular',
    title: '¿Sos popular?',
    hook: '1947. El comedor del high school.',
    credit: 'Are You Popular? 1947 · dominio público',
    src: '/clips/popular.mp4',
    poster: '/posters/popular.jpg',
    pack: 'vintage',
    talks: true,
    audio: 'en',
    prompt: 'El grupo ya votó. Vos hablá igual.',
    lines: [
      { at: 0.2, text: 'Popular es el que paga la leche.' },
      { at: 6.0, text: 'Si no te sientan, inventá una mesa.' },
      { at: 12.0, text: 'El cuadro de atrás ya nos juzgó.' },
    ],
  },
  {
    id: 'kobu',
    title: 'Kobu-tori',
    hook: 'Animación japonesa 1929. El bulto.',
    credit: 'Kobu-tori Jiisan 1929 · dominio público',
    src: '/clips/kobu.mp4',
    poster: '/posters/kobu.jpg',
    pack: 'vintage',
    talks: false,
    audio: 'ja',
    prompt: 'Japonés en pantalla. Inventá el cuento.',
    lines: [
      { at: 0.2, text: 'El barril pesa. El chisme más.' },
      { at: 6.0, text: 'Si el ogro pregunta, yo no vi nada.' },
      { at: 12.0, text: 'El bulto era mío. Ahora es de todos.' },
    ],
  },
  {
    id: 'dead',
    title: 'Diez para las tres',
    hook: 'Misma peli. Otra toma. El living se cae.',
    credit: 'Romero 1968 · dominio público',
    src: '/clips/dead.mp4',
    poster: '/posters/dead.jpg',
    pack: 'horror',
    talks: true,
    audio: 'en',
    prompt: 'La casa se cae. Alguien tiene un plan pésimo.',
    lines: [
      { at: 0.3, text: 'No es la hora. Es una amenaza.' },
      { at: 7.0, text: 'Si sale uno, salen todos. Como en el asado.' },
      { at: 13.0, text: 'Traben la puerta. Con la silla de siempre.' },
    ],
  },
  {
    id: 'shop',
    title: 'La floristería',
    hook: 'Little Shop 1960. El teléfono no perdona.',
    credit: 'The Little Shop of Horrors 1960 · dominio público',
    src: '/clips/shop.mp4',
    poster: '/posters/shop.jpg',
    pack: 'horror',
    talks: true,
    audio: 'en',
    prompt: 'La planta tiene hambre. Vos también.',
    lines: [
      { at: 0.2, text: 'No, no es una planta. Es un socio.' },
      { at: 6.0, text: 'Come. Después hablamos de alquiler.' },
      { at: 12.0, text: 'Si llama de nuevo, no contestes.' },
    ],
  },
  {
    id: 'orlok',
    title: 'Nosferatu',
    hook: 'La sombra. Weimar. El conde.',
    credit: 'Nosferatu 1922 · dominio público',
    src: '/clips/orlok.mp4',
    poster: '/posters/orlok.jpg',
    pack: 'horror',
    talks: false,
    audio: 'silent',
    prompt: 'Mudo. La sombra habla por él.',
    lines: [
      { at: 0.2, text: 'No soy yo. Es la pared.' },
      { at: 6.0, text: 'El huésped ya firmó. Con sangre.' },
      { at: 12.0, text: 'Cerrá la ventana. Tarde.' },
    ],
  },
  {
    id: 'clara',
    title: 'Clara',
    hook: 'Habla francés. Cara a cámara.',
    credit: 'Wikitongues · CC BY 3.0',
    src: '/clips/clara.mp4',
    poster: '/posters/clara.jpg',
    pack: 'caras',
    talks: true,
    audio: 'fr',
    prompt: 'Francés en la pista. Inventá la pelea.',
    lines: [
      { at: 0.2, text: 'Non. Eso no se discute en la cocina.' },
      { at: 6.0, text: 'Si el vecino pregunta, yo no estaba.' },
      { at: 12.0, text: 'Cortá cuando quieras. No me animo.' },
    ],
  },
  {
    id: 'fabia',
    title: 'Fabia',
    hook: 'Alemán suizo. Cara a cámara.',
    credit: 'Wikitongues · CC BY 3.0',
    src: '/clips/fabia.mp4',
    poster: '/posters/fabia.jpg',
    pack: 'caras',
    talks: true,
    audio: 'de',
    prompt: 'Alemán en la pista. Inventá el chisme.',
    lines: [
      { at: 0.2, text: 'En la oficina ya se sabe. Acá no.' },
      { at: 6.0, text: 'Si el calendario pregunta, yo no firmo.' },
      { at: 12.0, text: 'Las flores son testigo.' },
    ],
  },
  {
    id: 'freddie',
    title: 'Freddie',
    hook: 'Portugués brasileño. Boca llena.',
    credit: 'Wikitongues · CC BY 3.0',
    src: '/clips/freddie.mp4',
    poster: '/posters/freddie.jpg',
    pack: 'caras',
    talks: true,
    audio: 'pt',
    prompt: 'Portugués en la pista. Inventá el verso.',
    lines: [
      { at: 0.2, text: 'Não. Eso no se habla en el asado.' },
      { at: 6.0, text: 'Si mamá pregunta, yo estaba en otra.' },
      { at: 12.0, text: 'Corta quando quiser.' },
    ],
  },
  {
    id: 'regina',
    title: 'Regina',
    hook: 'Español. Cara. Boca.',
    credit: 'Wikitongues · CC BY 3.0',
    src: '/clips/regina.mp4',
    poster: '/posters/regina.jpg',
    pack: 'caras',
    talks: true,
    audio: 'es',
    prompt: 'Español de verdad. Inventá el descargo.',
    lines: [
      { at: 0.2, text: 'No, pará. Te lo digo una vez.' },
      { at: 6.0, text: 'El Papá Noel de atrás ya escuchó.' },
      { at: 12.0, text: 'Y si lo fue, no me mires así.' },
    ],
  },
  {
    id: 'agencia',
    title: 'Agência Nacional',
    hook: 'Brasil 1975. El noticiero y el disfraz.',
    credit: 'Arquivo Nacional · dominio público',
    src: '/clips/agencia.mp4',
    poster: '/posters/agencia.jpg',
    pack: 'vintage',
    talks: true,
    audio: 'pt',
    prompt: 'Noticiero brasileño. Doblalo peor.',
    lines: [
      { at: 0.2, text: 'Hoy firma. El pájaro también.' },
      { at: 6.0, text: 'El archivo ya lo tiene. Vos no.' },
      { at: 12.0, text: 'Cortamos para la tanda.' },
    ],
  },
  {
    id: 'boca',
    title: 'Cara a cara',
    hook: 'Boca enorme. Stock para inventar el crimen.',
    credit: 'Mixkit · stock libre',
    src: '/clips/boca.mp4',
    poster: '/posters/boca.jpg',
    pack: 'caras',
    talks: true,
    audio: 'any',
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
    pack: 'caras',
    talks: true,
    audio: 'any',
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
    pack: 'caras',
    talks: true,
    audio: 'any',
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
    pack: 'caras',
    talks: true,
    audio: 'any',
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
    pack: 'caras',
    talks: true,
    audio: 'any',
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
    pack: 'caras',
    talks: true,
    audio: 'any',
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
    pack: 'caras',
    talks: true,
    audio: 'any',
    prompt: 'Está por mandar a alguien a mudarse.',
    lines: [
      { at: 0.2, text: 'Ah, ¿ahora yo soy el problema?' },
      { at: 5.5, text: 'Perfecto. Anotalo. Anotalo bien.' },
      { at: 11.0, text: 'Nos vemos en el grupo de la familia.' },
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
    audio: 'en',
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
    audio: 'silent',
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
    audio: 'silent',
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
    audio: 'silent',
    prompt: 'Esto no es un gag. Es un desalojo.',
    lines: [
      { at: 0.3, text: 'Ustedes jugaron con el césped equivocado.' },
      { at: 7.0, text: 'Esto no es un gag. Es un desalojo.' },
      { at: 14.0, text: 'Que corran. El jardín tiene memoria.' },
    ],
  },
];

export const PACKS: { id: Pack; label: string }[] = [
  { id: 'meme', label: 'Famosos' },
  { id: 'caras', label: 'Caras' },
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

export function clipAudio(c: Clip): AudioLang {
  return c.audio ?? (c.talks ? 'en' : 'silent');
}

function clipRank(c: Clip, locale: string): number {
  const a = clipAudio(c);
  if (a === locale) return 0;
  if (a === 'silent' || a === 'any') return 1;
  if (a === 'ja') return 2;
  if (c.pack === 'meme') return 3;
  return 4;
}

export function clipsForPack(pack: Pack, locale: string): Clip[] {
  const inPack = STOCK.filter((c) => c.pack === pack);
  const native = inPack.some((c) => clipAudio(c) === locale);
  return inPack
    .filter((c) => {
      const a = clipAudio(c);
      if (a === 'silent' || a === 'any' || a === 'ja') return true;
      if (c.pack === 'meme') return true;
      if (a === locale) return true;
      if (!native) return true;
      return false;
    })
    .sort((x, y) => clipRank(x, locale) - clipRank(y, locale));
}
