export type PropKind =
  | 'mustache'
  | 'wig'
  | 'tie'
  | 'cape'
  | 'glasses'
  | 'bow'
  | 'crown'
  | 'cap'
  | 'none';

export type BackdropId =
  | 'velvet'
  | 'showroom'
  | 'saga'
  | 'savanna'
  | 'news'
  | 'house'
  | 'street'
  | 'cabin';

export type Puppet = {
  id: string;
  name: string;
  x: number;
  y: number;
  scale: number;
  clay: string;
  accent: string;
  prop: PropKind;
};

export type Line = {
  id: string;
  speaker: string;
  text: string;
  start: number;
  end: number;
};

export type Scene = {
  id: string;
  title: string;
  show: string;
  duration: number;
  backdrop: BackdropId;
  puppets: Puppet[];
  lines: Line[];
};

const L = (
  speaker: string,
  text: string,
  start: number,
  end: number,
): Line => ({
  id: `${speaker}-${start}`,
  speaker,
  text,
  start,
  end,
});

export const SCENES: Scene[] = [
  {
    id: 'viento',
    title: 'Lo que el viento no cobró',
    show: 'Telenovela · cap. 847',
    duration: 22000,
    backdrop: 'velvet',
    puppets: [
      {
        id: 'rosa',
        name: 'Rosa',
        x: 0.32,
        y: 0.62,
        scale: 1,
        clay: '#EFE6D8',
        accent: '#9B1D3A',
        prop: 'wig',
      },
      {
        id: 'fernando',
        name: 'Fernando',
        x: 0.68,
        y: 0.64,
        scale: 1.05,
        clay: '#E4D3B8',
        accent: '#1C3A5F',
        prop: 'mustache',
      },
    ],
    lines: [
      L('Rosa', 'Fernando, ese niño tiene tus ojos. Y tu deuda del casino.', 900, 4800),
      L('Fernando', '¡Imposible! Yo solo debo en el almacén.', 5400, 9200),
      L('Rosa', 'Entonces ¿de quién es el bebé, Fernando?', 9800, 13200),
      L('Fernando', '…Del almacén también.', 14000, 17800),
    ],
  },
  {
    id: 'goma',
    title: 'Colchones Don Goma',
    show: 'Tanda · 2:14 a.m.',
    duration: 18000,
    backdrop: 'showroom',
    puppets: [
      {
        id: 'locutor',
        name: 'Locutor',
        x: 0.3,
        y: 0.6,
        scale: 0.95,
        clay: '#EFE6D8',
        accent: '#C9A227',
        prop: 'glasses',
      },
      {
        id: 'goma',
        name: 'Don Goma',
        x: 0.7,
        y: 0.62,
        scale: 1.12,
        clay: '#F0D9C4',
        accent: '#2E6B4F',
        prop: 'tie',
      },
    ],
    lines: [
      L('Locutor', '¿Su espalda odia a su familia?', 700, 3800),
      L('Don Goma', 'Pruebe el colchón Don Goma. Incluye almohada. No incluye matrimonio.', 4400, 10200),
      L('Locutor', 'Don Goma. Duerma. Por favor.', 11000, 14800),
    ],
  },
  {
    id: 'milanesa',
    title: 'Almuerzo Saga',
    show: 'Anime trucho · cap. 1',
    duration: 20000,
    backdrop: 'saga',
    puppets: [
      {
        id: 'hiro',
        name: 'Hiro',
        x: 0.3,
        y: 0.64,
        scale: 1,
        clay: '#F7E4C8',
        accent: '#E85D04',
        prop: 'cap',
      },
      {
        id: 'rival',
        name: 'Rival',
        x: 0.7,
        y: 0.64,
        scale: 1.08,
        clay: '#D9C7E8',
        accent: '#5B2C6F',
        prop: 'cape',
      },
    ],
    lines: [
      L('Hiro', '¡Mi poder final… es la milanesa!', 800, 4600),
      L('Rival', 'Imposible. Yo desayuné cereal.', 5200, 9000),
      L('Hiro', 'Entonces esto… es el almuerzo.', 9800, 14200),
    ],
  },
  {
    id: 'capibara',
    title: 'El capibara mentiroso',
    show: 'Documental · NatGeo de mentira',
    duration: 21000,
    backdrop: 'savanna',
    puppets: [
      {
        id: 'nara',
        name: 'Narrador',
        x: 0.28,
        y: 0.58,
        scale: 0.92,
        clay: '#EFE6D8',
        accent: '#3E4A3A',
        prop: 'glasses',
      },
      {
        id: 'capi',
        name: 'Capibara',
        x: 0.68,
        y: 0.68,
        scale: 1.2,
        clay: '#C4A574',
        accent: '#6B4F2E',
        prop: 'none',
      },
    ],
    lines: [
      L('Narrador', 'Aquí, el capibara contempla la existencia.', 700, 4500),
      L('Capibara', 'Estoy pensando en facturas.', 5200, 8200),
      L('Narrador', 'Como vemos, es un animal silencioso.', 9000, 12800),
      L('Capibara', 'MENTIRA.', 13600, 16200),
    ],
  },
  {
    id: 'canal',
    title: 'Canal 13½',
    show: 'Noticiero · última hora',
    duration: 19000,
    backdrop: 'news',
    puppets: [
      {
        id: 'pres',
        name: 'Presentadora',
        x: 0.34,
        y: 0.6,
        scale: 1,
        clay: '#F3E0D0',
        accent: '#1A4B8C',
        prop: 'bow',
      },
      {
        id: 'rodo',
        name: 'Rodrigo',
        x: 0.72,
        y: 0.7,
        scale: 0.78,
        clay: '#E8D5B5',
        accent: '#6E7A86',
        prop: 'cap',
      },
    ],
    lines: [
      L('Presentadora', 'Última hora: no pasó nada, pero con música de tensión.', 800, 5200),
      L('Rodrigo', 'Estamos en vivo desde un lugar. Hay gente.', 5800, 10200),
      L('Presentadora', 'Gracias, Rodrigo. Mañana, el clima: sí.', 11000, 15200),
    ],
  },
  {
    id: 'alquiler',
    title: 'La casa que cobra alquiler',
    show: 'Terror barato · 1998',
    duration: 21000,
    backdrop: 'house',
    puppets: [
      {
        id: 'joven',
        name: 'Inquilino',
        x: 0.34,
        y: 0.66,
        scale: 0.95,
        clay: '#EFE6D8',
        accent: '#5C4A3A',
        prop: 'none',
      },
      {
        id: 'casa',
        name: 'La casa',
        x: 0.7,
        y: 0.52,
        scale: 1.35,
        clay: '#B9A38A',
        accent: '#4A2C2A',
        prop: 'none',
      },
    ],
    lines: [
      L('Inquilino', '¿Escuchaste eso?', 900, 3200),
      L('La casa', 'El alquiler. El alquiler. El alquiler.', 4000, 8800),
      L('Inquilino', 'Pensé que eras un fantasma.', 9600, 12800),
      L('La casa', 'Soy el dueño.', 13600, 16800),
    ],
  },
  {
    id: 'colectivo',
    title: 'Capitán Colectivo',
    show: 'Trailer · cine de barrio',
    duration: 18000,
    backdrop: 'street',
    puppets: [
      {
        id: 'capi',
        name: 'Capitán',
        x: 0.32,
        y: 0.62,
        scale: 1.08,
        clay: '#EFE6D8',
        accent: '#C1121F',
        prop: 'cape',
      },
      {
        id: 'villano',
        name: 'Villano',
        x: 0.7,
        y: 0.64,
        scale: 1,
        clay: '#D5D0C8',
        accent: '#111111',
        prop: 'crown',
      },
    ],
    lines: [
      L('Capitán', '¡El crimen no usa SUBE!', 700, 4000),
      L('Villano', 'Yo tengo tarjeta.', 4600, 7600),
      L('Capitán', 'Entonces… esto es personal.', 8400, 12800),
    ],
  },
  {
    id: 'avion',
    title: 'Instrucciones que nadie pidió',
    show: 'Vuelo 403 · asiento 17A',
    duration: 19000,
    backdrop: 'cabin',
    puppets: [
      {
        id: 'aza',
        name: 'Azafata',
        x: 0.34,
        y: 0.6,
        scale: 1,
        clay: '#EFE6D8',
        accent: '#0B3D4A',
        prop: 'bow',
      },
      {
        id: 'copi',
        name: 'Copiloto',
        x: 0.7,
        y: 0.62,
        scale: 1.02,
        clay: '#E2D2B8',
        accent: '#2F2F2F',
        prop: 'cap',
      },
    ],
    lines: [
      L('Azafata', 'En caso de emergencia, grite el nombre de su ex.', 800, 5200),
      L('Copiloto', 'Eso no está en el manual.', 5800, 9000),
      L('Azafata', 'El manual tampoco está.', 9800, 13800),
    ],
  },
];

export function lineAt(scene: Scene, tMs: number): Line | null {
  return scene.lines.find((l) => tMs >= l.start && tMs < l.end) ?? null;
}

export function nextLine(scene: Scene, tMs: number): Line | null {
  return scene.lines.find((l) => l.start > tMs) ?? null;
}
