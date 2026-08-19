import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import { App } from './App';
import { Ops } from './Ops';
import { detectLocale, persistLocale } from './i18n';
import { bootTrack, trackPage } from './track';
import './styles.css';

persistLocale(detectLocale());
bootTrack();

function Root() {
  const ops = window.location.pathname.replace(/\/$/, '') === '/ops';
  useEffect(() => {
    trackPage(ops ? '/ops' : '/');
  }, [ops]);
  return (
    <>
      {ops ? <Ops /> : <App />}
      <Analytics />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
