import { useMemo } from 'react';

const EVENTS = [
  ['page_view', 'Entra a / o /ops'],
  ['locale', 'Idioma detectado o cambiado'],
  ['pack', 'Tanda Famosos / Caras / etc'],
  ['clip_open', 'Entra a una escena (clip_id)'],
  ['watch', 'Toca Mirá'],
  ['dub_start', 'Toca Doblá'],
  ['share', 'Manda al grupo'],
  ['byo', 'Abre un archivo local'],
];

function configured() {
  return {
    ga: Boolean(import.meta.env.VITE_GA_MEASUREMENT_ID),
    clarity: Boolean(import.meta.env.VITE_CLARITY_ID),
    opsKey: Boolean(import.meta.env.VITE_OPS_KEY),
  };
}

function allowed() {
  const need = import.meta.env.VITE_OPS_KEY;
  if (!need) return true;
  const q = new URLSearchParams(window.location.search).get('k');
  try {
    if (q === need) sessionStorage.setItem('toma-ops', '1');
    return sessionStorage.getItem('toma-ops') === '1' || q === need;
  } catch {
    return q === need;
  }
}

export function Ops() {
  const cfg = useMemo(() => configured(), []);
  if (!allowed()) {
    return (
      <div className="ops">
        <h1>OPS</h1>
        <p>Falta la clave. Abrí /ops?k=…</p>
      </div>
    );
  }

  return (
    <div className="ops">
      <p className="ops-kicker">TOMA · cabina 2</p>
      <h1>OPS</h1>
      <p className="ops-lead">
        Los números grandes viven en GA4, Clarity y Vercel. Acá está el cableado
        y qué mirar para saber qué clip pega.
      </p>

      <section>
        <h2>Estado</h2>
        <ul>
          <li>GA4: {cfg.ga ? 'on' : 'off — pegá VITE_GA_MEASUREMENT_ID en Vercel'}</li>
          <li>Clarity (mapas de calor): {cfg.clarity ? 'on' : 'off — pegá VITE_CLARITY_ID'}</li>
          <li>Vercel Analytics: panel del proyecto toma</li>
        </ul>
      </section>

      <section>
        <h2>Dónde se lee</h2>
        <ul>
          <li>
            <a href="https://analytics.google.com/" target="_blank" rel="noreferrer">
              Google Analytics 4
            </a>
            {' — '}usuarios, países, origen (SEO/social), tiempo, rebote, eventos por clip_id
          </li>
          <li>
            <a href="https://clarity.microsoft.com/" target="_blank" rel="noreferrer">
              Microsoft Clarity
            </a>
            {' — '}heatmaps, grabaciones, rage clicks, scroll
          </li>
          <li>
            <a href="https://vercel.com/adriverbuilds/toma/analytics" target="_blank" rel="noreferrer">
              Vercel Analytics
            </a>
            {' — '}visitas reales, top paths, Web Vitals
          </li>
          <li>
            <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer">
              Search Console
            </a>
            {' — '}de qué búsquedas llegan
          </li>
        </ul>
      </section>

      <section>
        <h2>Eventos que manda TOMA</h2>
        <table>
          <thead>
            <tr>
              <th>evento</th>
              <th>para qué</th>
            </tr>
          </thead>
          <tbody>
            {EVENTS.map(([e, d]) => (
              <tr key={e}>
                <td>
                  <code>{e}</code>
                </td>
                <td>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          En GA4 → Informes → Engagement → Eventos. El parámetro <code>clip_id</code> dice
          qué video funciona.
        </p>
      </section>

      <section>
        <h2>Alta (una vez)</h2>
        <ol>
          <li>Creá una propiedad GA4. Copiá G-XXXX.</li>
          <li>Creá un proyecto Clarity. Copiá el ID corto.</li>
          <li>
            Vercel → toma → Settings → Environment Variables:{' '}
            <code>VITE_GA_MEASUREMENT_ID</code>, <code>VITE_CLARITY_ID</code>, opcional{' '}
            <code>VITE_OPS_KEY</code>.
          </li>
          <li>Redeploy. En Vercel activá Web Analytics y Speed Insights.</li>
          <li>Search Console: verificá toma-three.vercel.app</li>
        </ol>
      </section>

      <p>
        <a href="/">← cabina</a>
      </p>
    </div>
  );
}
