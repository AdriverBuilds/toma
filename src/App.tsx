import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BoothMic,
  exportTake,
  getMic,
  shareOrDownload,
  unlockAudio,
  wait,
} from './audio';
import {
  CHALLENGES,
  PACKS,
  STOCK,
  lineAt,
  type Challenge,
  type Clip,
  type Pack,
} from './clips';

type View = 'feed' | 'booth';
type Phase = 'pick' | 'watch' | 'slate' | 'rec' | 'play';
type PackFilter = Pack;

function insecureMic(): boolean {
  return typeof window !== 'undefined' && !window.isSecureContext;
}

export function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const takeRef = useRef<HTMLAudioElement>(null);
  const waveRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const micRef = useRef<BoothMic | null>(null);
  const takeUrl = useRef<string | null>(null);
  const localUrl = useRef<string | null>(null);
  const waveBuf = useRef(new Uint8Array(2048));

  const [view, setView] = useState<View>('feed');
  const [pack, setPack] = useState<PackFilter>('meme');
  const [dragOver, setDragOver] = useState(false);
  const [phase, setPhase] = useState<Phase>('pick');
  const phaseRef = useRef<Phase>('pick');
  phaseRef.current = phase;
  const [clip, setClip] = useState<Clip>(
    () => STOCK.find((c) => c.pack === 'meme') ?? STOCK[0],
  );
  const [challenge, setChallenge] = useState<Challenge>(CHALLENGES[0]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [slateN, setSlateN] = useState(3);
  const [hasTake, setHasTake] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(22);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => STOCK.filter((c) => c.pack === pack), [pack]);
  const timed = lineAt(clip, t);
  const prompt =
    challenge.id !== 'libre' && challenge.hint
      ? challenge.hint
      : (timed?.text ?? clip.prompt);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || view !== 'booth') return;
    if (phase === 'pick') {
      v.loop = true;
      v.muted = true;
      v.volume = 1;
      void v.play().catch(() => undefined);
    } else {
      v.loop = false;
    }
  }, [phase, clip, view]);

  useEffect(() => {
    let id = 0;
    let last = 0;
    const loop = (now: number) => {
      const mic = micRef.current;
      const v = videoRef.current;
      const ph = phaseRef.current;
      if (mic) {
        const cvs = waveRef.current;
        const ctx = cvs?.getContext('2d');
        if (cvs && ctx) {
          mic.waveform(waveBuf.current);
          const { width: w, height: h } = cvs;
          ctx.clearRect(0, 0, w, h);
          ctx.strokeStyle = '#1a1208';
          ctx.lineWidth = 2;
          ctx.beginPath();
          const data = waveBuf.current;
          for (let i = 0; i < w; i++) {
            const s = data[Math.floor((i / w) * data.length)] / 128 - 1;
            const y = h / 2 + s * (h * 0.42);
            if (i === 0) ctx.moveTo(i, y);
            else ctx.lineTo(i, y);
          }
          ctx.stroke();
        }
      }
      if (v && (ph === 'rec' || ph === 'play' || ph === 'watch')) {
        if (now - last > 50) {
          last = now;
          setT(v.currentTime);
        }
      }
      if (v && ph === 'play') {
        const a = takeRef.current;
        if (a && !a.paused) {
          const drift = Math.abs(a.currentTime - v.currentTime);
          if (drift > 0.09) a.currentTime = v.currentTime;
        }
      }
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  const ensureMic = async () => {
    if (micRef.current) return true;
    if (insecureMic()) {
      setError('En el celu el mic pide HTTPS. Entrá por el link de TOMA, no por la IP.');
      return false;
    }
    try {
      const ctx = await unlockAudio();
      const stream = await getMic();
      micRef.current = new BoothMic(ctx, stream);
      return true;
    } catch {
      setError('Este aparato no tiene mic, o lo bloqueó. Mirá el clip igual.');
      return false;
    }
  };

  const openBooth = (next: Clip) => {
    setClip(next);
    setHasTake(false);
    setError('');
    setPhase('pick');
    setView('booth');
  };

  const toFeed = () => {
    videoRef.current?.pause();
    setPhase('pick');
    setView('feed');
    setError('');
  };

  const onMeta = () => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration)) return;
    setDur(Math.min(v.duration, 60));
  };

  const onEnded = () => {
    if (phaseRef.current === 'rec') finish();
    if (phaseRef.current === 'watch') setPhase('pick');
  };

  const watch = async () => {
    const v = videoRef.current;
    if (!v) return;
    setError('');
    setPhase('watch');
    v.loop = false;
    v.muted = false;
    v.volume = 1;
    v.currentTime = 0;
    try {
      await v.play();
    } catch {
      setError('Tocá Mirá otra vez para dar sonido.');
      setPhase('pick');
    }
  };

  const startSlate = async () => {
    const v = videoRef.current;
    if (!v) return;
    const ok = await ensureMic();
    if (!ok || !micRef.current) return;
    setHasTake(false);
    setError('');
    setPhase('slate');
    v.pause();
    v.currentTime = 0;
    v.muted = false;
    v.volume = 0.12;
    for (let n = 3; n >= 1; n--) {
      setSlateN(n);
      await wait(650);
    }
    micRef.current.startTake();
    setPhase('rec');
    try {
      await v.play();
    } catch {
      setError('Tocá Doblá otra vez.');
      setPhase('pick');
    }
  };

  const finish = () => {
    const mic = micRef.current;
    const v = videoRef.current;
    if (!mic) return;
    v?.pause();
    const blob = mic.stopTake();
    if (blob.size < 2000) {
      setError('La toma salió vacía. En este aparato no hay mic, o está muy bajo.');
      setPhase('pick');
      return;
    }
    if (takeUrl.current) URL.revokeObjectURL(takeUrl.current);
    takeUrl.current = URL.createObjectURL(blob);
    const a = takeRef.current;
    if (a) {
      a.src = takeUrl.current;
      a.oncanplaythrough = () => {
        a.oncanplaythrough = null;
        void replay();
      };
      a.load();
    }
    setHasTake(true);
    setPhase('play');
  };

  const replay = async () => {
    const v = videoRef.current;
    const a = takeRef.current;
    if (!v || !a) return;
    v.muted = false;
    v.volume = 0.22;
    v.currentTime = 0;
    a.currentTime = 0;
    setPhase('play');
    await v.play();
    await a.play().catch(() => undefined);
  };

  const share = async () => {
    const v = videoRef.current;
    if (!v || !takeUrl.current) return;
    setBusy(true);
    setError('');
    try {
      const blob = await exportTake(v, takeUrl.current, dur);
      await shareOrDownload(
        blob,
        `toma-${clip.id}.webm`,
        `${clip.title} · TOMA`,
      );
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return;
      try {
        const audioBlob = await fetch(takeUrl.current).then((r) => r.blob());
        await shareOrDownload(audioBlob, `toma-${clip.id}.wav`, clip.title);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'No se pudo exportar');
      }
    } finally {
      setBusy(false);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setError('No se pudo copiar el link.');
    }
  };

  const onFile = (file: File) => {
    if (localUrl.current) URL.revokeObjectURL(localUrl.current);
    localUrl.current = URL.createObjectURL(file);
    openBooth({
      id: 'tuyo',
      title: file.name.replace(/\.[^.]+$/, ''),
      hook: 'Tu archivo. No se sube.',
      credit: 'Archivo local',
      src: localUrl.current,
      poster: '',
      pack: 'meme',
      talks: true,
      prompt: 'Hablá encima. Esta es tu toma.',
      lines: [{ at: 0, text: 'Esta es tu toma.' }],
    });
  };

  return (
    <div className={view === 'feed' ? 'desk desk-feed' : 'desk desk-booth'}>
      {view === 'feed' ? (
        <>
          <header className="rack">
            <div className="lamp">
              <b>CABINA 2</b>
            </div>
            <div>
              <h1>TOMA</h1>
              <p className="kicker">Subí el banana. Doblalo. Mandalo.</p>
            </div>
            <button className="plate-btn" onClick={() => fileRef.current?.click()}>
              Subí el banana
            </button>
          </header>

          <section
            className={dragOver ? 'hero drop on' : 'hero drop'}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const f = e.dataTransfer.files[0];
              if (f && f.type.startsWith('video/')) onFile(f);
            }}
          >
            <div className="hero-copy">
              <em>el loop</em>
              <strong>Tirá el banana</strong>
              <span>
                O el del grupo, el del TikTok, el que ya tenés. Se queda en el
                teléfono. La gente dobla eso.
              </span>
              <b>Abrir archivo</b>
            </div>
          </section>

          <nav className="packs" aria-label="tandas">
            {PACKS.map((p) => (
              <button
                key={p.id}
                className={pack === p.id ? 'chip on' : 'chip'}
                onClick={() => setPack(p.id)}
              >
                {p.label}
              </button>
            ))}
          </nav>

          <section className="wall">
            {filtered.map((s) => (
              <button key={s.id} className="tape" onClick={() => openBooth(s)}>
                <span className="thumb">
                  {s.poster ? <img src={s.poster} alt="" /> : <i />}
                  {s.talks && <em>habla</em>}
                </span>
                <strong>{s.title}</strong>
                <small>{s.hook}</small>
              </button>
            ))}
            <button className="tape file" onClick={() => fileRef.current?.click()}>
              <span className="thumb plus">+</span>
              <strong>Tu clip</strong>
              <small>Banana, el del grupo, el que sea</small>
            </button>
          </section>

          <p className="hint foot">
            Lo conocido se dobla. El archivo no sube a ningún lado.
          </p>
        </>
      ) : (
        <>
          <header className="rack">
            <button className="back" onClick={toFeed}>
              Tanda
            </button>
            <div>
              <h1>TOMA</h1>
              <p className="plate">PVM-9 · {clip.title}</p>
            </div>
            <div className="lamp">
              <b className={phase === 'rec' ? 'on' : ''}>ON AIR</b>
            </div>
          </header>

          <div className="pvm">
            <div className="bezel">
              <div className="glass">
                <video
                  ref={videoRef}
                  src={clip.src}
                  playsInline
                  muted
                  loop
                  preload="auto"
                  onLoadedMetadata={onMeta}
                  onEnded={onEnded}
                />
                <div className="scan" />
                {phase === 'slate' && (
                  <div className="slate">
                    <b>{slateN}</b>
                  </div>
                )}
              </div>
              <div className="brandplate">
                {clip.hook} · {clip.credit}
              </div>
            </div>
          </div>

          <aside className="cue">
            <span>{challenge.id === 'libre' ? 'guión' : `modo · ${challenge.label}`}</span>
            <p>{prompt}</p>
          </aside>

          <div className="mods" role="list">
            {CHALLENGES.map((c) => (
              <button
                key={c.id}
                className={challenge.id === c.id ? 'mod on' : 'mod'}
                onClick={() => setChallenge(c)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <canvas ref={waveRef} className="vu" width={640} height={56} />

          <footer className="keys">
            {error && <p className="err">{error}</p>}
            {phase === 'pick' && (
              <div className="pair">
                <button className="mira" onClick={() => void watch()}>
                  Mirá
                </button>
                <button className="doba" onClick={() => void startSlate()}>
                  Doblá
                </button>
              </div>
            )}
            {phase === 'watch' && (
              <div className="pair">
                <button className="mira" onClick={() => setPhase('pick')}>
                  Atrás
                </button>
                <span className="time">{t.toFixed(1)}s</span>
              </div>
            )}
            {(phase === 'slate' || phase === 'rec') && (
              <div className="pair">
                <button
                  className="mira"
                  onClick={() => {
                    micRef.current?.stopTake();
                    videoRef.current?.pause();
                    setPhase('pick');
                  }}
                >
                  Cortá
                </button>
                <span className="time recing">REC {t.toFixed(1)}</span>
              </div>
            )}
            {phase === 'play' && (
              <div className="pair">
                <button className="mira" onClick={toFeed}>
                  Tanda
                </button>
                <button className="doba" onClick={() => void startSlate()}>
                  Otra
                </button>
                <button className="mira" onClick={() => void replay()}>
                  Play
                </button>
                <button className="doba" disabled={busy || !hasTake} onClick={() => void share()}>
                  {busy ? 'Armando…' : 'Al grupo'}
                </button>
              </div>
            )}
            <div className="pair slim">
              <button className="ghost" onClick={() => void copyLink()}>
                {copied ? 'Link copiado' : 'Copiá el link'}
              </button>
            </div>
            <p className="hint">
              {phase === 'pick'
                ? 'Mirá con sonido. Doblá con el mic del celu.'
                : phase === 'watch'
                  ? 'Reproducción. El mic no hace falta.'
                  : phase === 'rec'
                    ? 'Hablá ahora. El original queda bajito.'
                    : phase === 'play'
                      ? 'Mandalo al grupo. El video se arma acá.'
                      : ''}
            </p>
          </footer>
        </>
      )}

      <audio ref={takeRef} playsInline />
      <input
        ref={fileRef}
        type="file"
        accept="video/*"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
    </div>
  );
}
