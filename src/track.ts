export type TrackProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

const gaId = () => import.meta.env.VITE_GA_MEASUREMENT_ID || '';
const clarityId = () => import.meta.env.VITE_CLARITY_ID || '';

function bootGa(id: string) {
  if (document.getElementById('toma-ga')) return;
  const s = document.createElement('script');
  s.id = 'toma-ga';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });
}

function bootClarity(id: string) {
  if (document.getElementById('toma-clarity')) return;
  const s = document.createElement('script');
  s.id = 'toma-clarity';
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

export function bootTrack() {
  const ga = gaId();
  const cl = clarityId();
  if (ga) bootGa(ga);
  if (cl) bootClarity(cl);
}

export function track(name: string, props: TrackProps = {}) {
  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(props)) {
    if (v === undefined) continue;
    clean[k] = String(v);
  }
  window.gtag?.('event', name, clean);
  window.clarity?.('set', name, JSON.stringify(clean));
  window.clarity?.('event', name);
}

export function trackPage(path: string) {
  const ga = gaId();
  if (ga) window.gtag?.('event', 'page_view', { page_path: path });
}
