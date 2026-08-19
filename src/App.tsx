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
  PACKS,
  clipsForPack,
  lineAt,
  type Challenge,
  type Clip,
  type Pack,
} from './clips';
import {
  LOCALES,
  copyFor,
  detectLocale,
  persistLocale,
  type Locale,
} from './i18n';
import { track } from './track';

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

  const [locale, setLocale] = useState<Locale>(() => detectLocale());
  const copy = copyFor(locale);
  const challenges = copy.challenges;

  const [view, setView] = useState<View>('feed');
  const [pack, setPack] = useState<PackFilter>('meme');
  const [dragOver, setDragOver] = useState(false);
  const [phase, setPhase] = useState<Phase>('pick');
  const phaseRef = useRef<Phase>('pick');
  phaseRef.current = phase;
  const [clip, setClip] = useState<Clip>(
    () => clipsForPack('meme', detectLocale())[0],
  );
  const [challenge, setChallenge] = useState<Challenge>(() => copyFor(detectLocale()).challenges[0]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [slateN, setSlateN] = useState(3);
  const [hasTake, setHasTake] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(22);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => clipsForPack(pack, locale), [pack, locale]);
  const featured = filtered[0];
  const rest = filtered.slice(1);
  const timed = lineAt(clip, t);
  const prompt =
    challenge.id !== 'libre' && challenge.hint
      ? challenge.hint
      : (timed?.text ?? clip.prompt);

  useEffect(() => {
    persistLocale(locale);
    track('locale', { lang: locale });
    const next = copyFor(locale).challenges;
    setChallenge((cur) => next.find((c) => c.id === cur.id) ?? next[0]);
  }, [locale]);

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
      setError(copy.errMicHttp);
      return false;
    }
    try {
      const ctx = await unlockAudio();
      const stream = await getMic();
      micRef.current = new BoothMic(ctx, stream);
      return true;
    } catch {
      setError(copy.errMic);
      return false;
    }
  };

  const openBooth = (next: Clip) => {
    setClip(next);
    setHasTake(false);
    setError('');
    setPhase('pick');
    setView('booth');
    track('clip_open', { clip_id: next.id, pack: next.pack });
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
    track('watch', { clip_id: clip.id });
    v.loop = false;
    v.muted = false;
    v.volume = 1;
    v.currentTime = 0;
    try {
      await v.play();
    } catch {
      setError(copy.errSound);
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
    track('dub_start', { clip_id: clip.id, challenge: challenge.id });
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
      setError(copy.errDub);
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
      setError(copy.errEmpty);
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
    track('share', { clip_id: clip.id });
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
        setError(err instanceof Error ? err.message : copy.errExport);
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
      setError(copy.errCopy);
    }
  };

  const onFile = (file: File) => {
    if (localUrl.current) URL.revokeObjectURL(localUrl.current);
    localUrl.current = URL.createObjectURL(file);
    track('byo', { kind: file.type });
    openBooth({
      id: 'tuyo',
      title: file.name.replace(/\.[^.]+$/, ''),
      hook: copy.byoHook,
      credit: 'Archivo local',
      src: localUrl.current,
      poster: '',
      pack: 'meme',
      talks: true,
      audio: 'any',
      prompt: copy.byoPrompt,
      lines: [{ at: 0, text: copy.byoPrompt }],
    });
  };

  const hint =
    phase === 'pick'
      ? copy.hintPick
      : phase === 'watch'
        ? copy.hintWatch
        : phase === 'rec'
          ? copy.hintRec
          : phase === 'play'
            ? copy.hintPlay
            : '';

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
              <p className="kicker">{copy.kicker}</p>
            </div>
            <div className="tools">
              <nav className="langs" aria-label="idioma">
                {LOCALES.map((l) => (
                  <button
                    key={l}
                    className={locale === l ? 'on' : ''}
                    onClick={() => setLocale(l)}
                  >
                    {l}
                  </button>
                ))}
              </nav>
              <button className="plate-btn" onClick={() => fileRef.current?.click()}>
                {copy.fileBtn}
              </button>
            </div>
          </header>

          {featured && (
            <button className="feature" onClick={() => openBooth(featured)}>
              <span className="shot">
                {featured.poster ? <img src={featured.poster} alt="" /> : <i />}
                {featured.talks && <em>{copy.talks}</em>}
              </span>
              <span className="hero-copy">
                <em>{copy.scene}</em>
                <strong>{featured.title}</strong>
                <span>{featured.hook}</span>
                <b>{copy.dub}</b>
              </span>
            </button>
          )}

          <button
            className={dragOver ? 'byo on' : 'byo'}
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
            <strong>{copy.fileTitle}</strong>
            <span>{copy.fileBody}</span>
            <em>{copy.openFile}</em>
          </button>

          <nav className="packs" aria-label="tandas">
            {PACKS.map((p) => (
              <button
                key={p.id}
                className={pack === p.id ? 'chip on' : 'chip'}
                onClick={() => {
                  setPack(p.id);
                  track('pack', { pack: p.id });
                }}
              >
                {copy.packs[p.id] ?? p.label}
              </button>
            ))}
          </nav>

          <section className="wall">
            {rest.map((s) => (
              <button key={s.id} className="tape" onClick={() => openBooth(s)}>
                <span className="thumb">
                  {s.poster ? <img src={s.poster} alt="" /> : <i />}
                  {s.talks && <em>{copy.talks}</em>}
                </span>
                <strong>{s.title}</strong>
                <small>{s.hook}</small>
              </button>
            ))}
            <button className="tape file" onClick={() => fileRef.current?.click()}>
              <span className="thumb plus">+</span>
              <strong>{copy.yourClip}</strong>
              <small>{copy.yourClipSub}</small>
            </button>
          </section>

          <p className="hint foot">{copy.foot}</p>
        </>
      ) : (
        <>
          <header className="rack">
            <button className="back" onClick={toFeed}>
              {copy.booth}
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
            <span>
              {challenge.id === 'libre' ? copy.cue : `modo · ${challenge.label}`}
            </span>
            <p>{prompt}</p>
          </aside>

          <div className="mods" role="list">
            {challenges.map((c) => (
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
                  {copy.watch}
                </button>
                <button className="doba" onClick={() => void startSlate()}>
                  {copy.dub}
                </button>
              </div>
            )}
            {phase === 'watch' && (
              <div className="pair">
                <button className="mira" onClick={() => setPhase('pick')}>
                  {copy.back}
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
                  {copy.cut}
                </button>
                <span className="time recing">REC {t.toFixed(1)}</span>
              </div>
            )}
            {phase === 'play' && (
              <div className="pair">
                <button className="mira" onClick={toFeed}>
                  {copy.booth}
                </button>
                <button className="doba" onClick={() => void startSlate()}>
                  {copy.again}
                </button>
                <button className="mira" onClick={() => void replay()}>
                  {copy.play}
                </button>
                <button className="doba" disabled={busy || !hasTake} onClick={() => void share()}>
                  {busy ? copy.sharing : copy.share}
                </button>
              </div>
            )}
            <div className="pair slim">
              <button className="ghost" onClick={() => void copyLink()}>
                {copied ? copy.copied : copy.copy}
              </button>
            </div>
            <p className="hint">{hint}</p>
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
