import { lineAt, type BackdropId, type PropKind, type Puppet, type Scene } from './scenes';

const W = 720;
const H = 1280;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function blob(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rx: number,
  ry: number,
  color: string,
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawBackdrop(ctx: CanvasRenderingContext2D, id: BackdropId, t: number) {
  switch (id) {
    case 'velvet': {
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, '#2A0F18');
      g.addColorStop(1, '#12080C');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#4A1524';
      for (let i = 0; i < 8; i++) {
        const x = i * 96;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.quadraticCurveTo(x + 48, 180 + Math.sin(t * 0.4 + i) * 8, x + 96, 0);
        ctx.lineTo(x + 96, H);
        ctx.lineTo(x, H);
        ctx.fill();
      }
      ctx.fillStyle = '#1A0A10';
      ctx.fillRect(0, H * 0.72, W, H * 0.28);
      ctx.fillStyle = '#C9A227';
      ctx.fillRect(40, 80, W - 80, 10);
      break;
    }
    case 'showroom': {
      ctx.fillStyle = '#F2EFE6';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#D9D2C3';
      ctx.fillRect(0, H * 0.58, W, H * 0.42);
      ctx.fillStyle = '#8B5A2B';
      roundRect(ctx, 160, 620, 400, 220, 18);
      ctx.fill();
      ctx.fillStyle = '#C4A574';
      roundRect(ctx, 180, 580, 360, 70, 40);
      ctx.fill();
      ctx.fillStyle = '#E31C3D';
      ctx.font = '900 42px "Saira Extra Condensed", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('DON GOMA', W / 2, 200);
      ctx.fillStyle = '#1C3A5F';
      ctx.font = '600 22px Newsreader, serif';
      ctx.fillText('colchones que perdonan', W / 2, 240);
      break;
    }
    case 'saga': {
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, '#1B1030');
      g.addColorStop(0.5, '#E85D04');
      g.addColorStop(1, '#240046');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(255,230,120,0.35)';
      ctx.lineWidth = 4;
      for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.arc(W / 2, H * 0.42, 40 + i * 38, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = '#FFE566';
      ctx.font = '900 56px "Saira Extra Condensed", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ALMUERZO', W / 2, 160);
      ctx.fillText('SAGA', W / 2, 214);
      break;
    }
    case 'savanna': {
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, '#87B8C9');
      g.addColorStop(0.45, '#F2D6A2');
      g.addColorStop(1, '#C4A574');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#E8C872';
      ctx.beginPath();
      ctx.arc(560, 180, 70, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#6B8F4E';
      ctx.beginPath();
      ctx.moveTo(0, 780);
      ctx.quadraticCurveTo(200, 700, 400, 760);
      ctx.quadraticCurveTo(560, 820, 720, 740);
      ctx.lineTo(720, 1280);
      ctx.lineTo(0, 1280);
      ctx.fill();
      break;
    }
    case 'news': {
      ctx.fillStyle = '#0E2A4A';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#1A4B8C';
      ctx.fillRect(0, 0, W, 160);
      ctx.fillStyle = '#FFE566';
      ctx.font = '900 64px "Saira Extra Condensed", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('13½', 36, 110);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '600 22px Azeret Mono, monospace';
      ctx.fillText('EN VIVO', 220, 104);
      ctx.fillStyle = '#E31C3D';
      ctx.fillRect(0, H - 160, W, 160);
      ctx.fillStyle = '#12161C';
      ctx.fillRect(80, 280, 560, 320);
      ctx.strokeStyle = '#FFE566';
      ctx.lineWidth = 6;
      ctx.strokeRect(80, 280, 560, 320);
      break;
    }
    case 'house': {
      ctx.fillStyle = '#0D0B10';
      ctx.fillRect(0, 0, W, H);
      const flicker = 0.08 + Math.sin(t * 7) * 0.03;
      ctx.fillStyle = `rgba(243, 231, 179, ${flicker})`;
      ctx.beginPath();
      ctx.moveTo(W / 2, 200);
      ctx.lineTo(W / 2 + 220, 900);
      ctx.lineTo(W / 2 - 220, 900);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#1A1410';
      ctx.fillRect(200, 520, 320, 420);
      ctx.fillStyle = '#3A2018';
      ctx.fillRect(330, 700, 70, 240);
      ctx.fillStyle = `rgba(227, 28, 61, ${0.25 + Math.sin(t * 3) * 0.1})`;
      ctx.fillRect(250, 580, 80, 80);
      ctx.fillRect(400, 580, 80, 80);
      break;
    }
    case 'street': {
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, '#1B2838');
      g.addColorStop(1, '#3D2A22');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#2A2A2A';
      ctx.fillRect(0, 860, W, 420);
      ctx.fillStyle = '#FFE566';
      for (let i = 0; i < 8; i++) ctx.fillRect(40 + i * 90, 980, 50, 14);
      ctx.fillStyle = '#6E7A86';
      ctx.fillRect(40, 420, 200, 440);
      ctx.fillRect(480, 360, 200, 500);
      ctx.fillStyle = '#C1121F';
      ctx.font = '900 48px "Saira Extra Condensed", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('CAPITÁN COLECTIVO', W / 2, 180);
      break;
    }
    case 'cabin': {
      ctx.fillStyle = '#0B1C22';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#14323C';
      roundRect(ctx, 40, 80, W - 80, 420, 28);
      ctx.fill();
      ctx.fillStyle = '#87B8C9';
      roundRect(ctx, 70, 110, W - 140, 360, 18);
      ctx.fill();
      ctx.fillStyle = '#F3E7B3';
      ctx.beginPath();
      ctx.ellipse(540, 180, 36, 36, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1A2A30';
      ctx.fillRect(0, 700, W, 580);
      ctx.fillStyle = '#0E2A4A';
      ctx.fillRect(0, 700, W, 18);
      ctx.fillStyle = '#C5CDD6';
      ctx.font = '600 18px Azeret Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ABROCHENSE · 17A', W / 2, 760);
      break;
    }
  }
}

function drawProp(
  ctx: CanvasRenderingContext2D,
  prop: PropKind,
  x: number,
  y: number,
  s: number,
  accent: string,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = accent;
  switch (prop) {
    case 'mustache':
      ctx.beginPath();
      ctx.ellipse(-22, 18, 20, 8, -0.3, 0, Math.PI * 2);
      ctx.ellipse(22, 18, 20, 8, 0.3, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'wig':
      ctx.beginPath();
      ctx.ellipse(0, -78, 78, 48, 0, 0, Math.PI);
      ctx.fill();
      ctx.fillRect(-70, -90, 28, 70);
      ctx.fillRect(42, -90, 28, 70);
      break;
    case 'tie':
      ctx.beginPath();
      ctx.moveTo(0, 40);
      ctx.lineTo(18, 58);
      ctx.lineTo(0, 120);
      ctx.lineTo(-18, 58);
      ctx.closePath();
      ctx.fill();
      break;
    case 'cape':
      ctx.globalAlpha = 0.92;
      ctx.beginPath();
      ctx.moveTo(-20, 10);
      ctx.quadraticCurveTo(-120, 80, -90, 200);
      ctx.lineTo(90, 200);
      ctx.quadraticCurveTo(120, 80, 20, 10);
      ctx.fill();
      ctx.globalAlpha = 1;
      break;
    case 'glasses':
      ctx.strokeStyle = accent;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.ellipse(-22, -8, 20, 16, 0, 0, Math.PI * 2);
      ctx.ellipse(22, -8, 20, 16, 0, 0, Math.PI * 2);
      ctx.moveTo(-2, -8);
      ctx.lineTo(2, -8);
      ctx.stroke();
      break;
    case 'bow':
      ctx.beginPath();
      ctx.ellipse(-22, 48, 22, 14, 0, 0, Math.PI * 2);
      ctx.ellipse(22, 48, 22, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-8, 40, 16, 16);
      break;
    case 'crown':
      ctx.beginPath();
      ctx.moveTo(-40, -70);
      ctx.lineTo(-24, -110);
      ctx.lineTo(-8, -70);
      ctx.lineTo(8, -118);
      ctx.lineTo(24, -70);
      ctx.lineTo(40, -110);
      ctx.lineTo(48, -70);
      ctx.closePath();
      ctx.fill();
      break;
    case 'cap':
      ctx.beginPath();
      ctx.ellipse(0, -78, 70, 22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-10, -88, 78, 12);
      break;
    default:
      break;
  }
  ctx.restore();
}

function drawPuppet(
  ctx: CanvasRenderingContext2D,
  p: Puppet,
  t: number,
  mouth: number,
  speaking: boolean,
) {
  const x = p.x * W;
  const y = p.y * H;
  const s = p.scale;
  const breathe = 1 + Math.sin(t * 2.2 + p.x * 8) * 0.018;
  const bounce = speaking ? Math.sin(t * 18) * 4 * mouth : 0;

  ctx.save();
  ctx.translate(x, y + bounce);
  ctx.scale(s * breathe, s);

  if (p.prop === 'cape') drawProp(ctx, 'cape', 0, 0, 1, p.accent);

  ctx.fillStyle = '#C4B8A4';
  ctx.beginPath();
  ctx.ellipse(-38, 92, 22, 12, -0.2, 0, Math.PI * 2);
  ctx.ellipse(38, 92, 22, 12, 0.2, 0, Math.PI * 2);
  ctx.fill();

  blob(ctx, 0, 10, 86, 102, p.clay);
  ctx.fillStyle = 'rgba(196, 184, 164, 0.35)';
  ctx.beginPath();
  ctx.ellipse(18, 28, 50, 60, 0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = p.clay;
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  const arm = speaking ? -0.5 - mouth * 0.6 : -0.35;
  ctx.beginPath();
  ctx.moveTo(-70, 10);
  ctx.quadraticCurveTo(-110, 20 + Math.sin(t * 3) * 6, -120, 70);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(70, 10);
  ctx.quadraticCurveTo(110, 10 + arm * 20, 118, 64);
  ctx.stroke();

  const blink = Math.sin(t * 0.7 + p.x * 12) > 0.97 ? 0.15 : 1;
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.ellipse(-24, -18, 18, 20 * blink, -0.1, 0, Math.PI * 2);
  ctx.ellipse(26, -20, 18, 20 * blink, 0.12, 0, Math.PI * 2);
  ctx.fill();
  if (blink > 0.4) {
    ctx.fillStyle = '#0C0D10';
    const look = speaking ? 3 : Math.sin(t * 0.5) * 2;
    ctx.beginPath();
    ctx.ellipse(-20 + look, -16, 8, 10, 0, 0, Math.PI * 2);
    ctx.ellipse(30 + look, -18, 8, 10, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const mh = 8 + mouth * 38;
  ctx.fillStyle = '#2A1518';
  ctx.beginPath();
  ctx.ellipse(0, 28, 22 + mouth * 6, mh, 0, 0, Math.PI * 2);
  ctx.fill();
  if (mouth > 0.35) {
    ctx.fillStyle = '#C45C6A';
    ctx.beginPath();
    ctx.ellipse(0, 28 + mh * 0.25, 12, mh * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  if (p.prop !== 'cape') drawProp(ctx, p.prop, 0, 0, 1, p.accent);

  ctx.fillStyle = p.accent;
  ctx.font = '700 22px "Saira Extra Condensed", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(p.name.toUpperCase(), 0, 128);
  ctx.restore();
}

export type DrawState = {
  scene: Scene;
  tMs: number;
  micLevel: number;
  mouths: Record<string, number>;
};

export function drawFrame(ctx: CanvasRenderingContext2D, state: DrawState) {
  const { scene, tMs, micLevel, mouths } = state;
  const t = tMs / 1000;
  ctx.save();
  ctx.fillStyle = '#12161C';
  ctx.fillRect(0, 0, W, H);
  drawBackdrop(ctx, scene.backdrop, t);

  const active = lineAt(scene, tMs);
  for (const p of scene.puppets) {
    const isTalk = active?.speaker === p.name;
    const auto = isTalk ? 0.35 + Math.abs(Math.sin(tMs / 90)) * 0.55 : 0;
    const live = isTalk ? Math.max(auto, micLevel) : auto * 0.15;
    const mouth = Math.max(mouths[p.id] ?? 0, live);
    drawPuppet(ctx, p, t, mouth, isTalk);
  }

  ctx.fillStyle = 'rgba(18, 22, 28, 0.55)';
  ctx.fillRect(0, 0, W, 70);
  ctx.fillStyle = '#F3E7B3';
  ctx.font = '700 18px Azeret Mono, monospace';
  ctx.textAlign = 'left';
  ctx.fillText(scene.show.toUpperCase(), 28, 44);
  ctx.restore();
}

export const STAGE = { W, H };
