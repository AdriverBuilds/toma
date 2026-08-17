export function pickMime(kinds: string[]): string {
  for (const k of kinds) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(k)) return k;
  }
  return '';
}

export async function unlockAudio(): Promise<AudioContext> {
  const ctx = new AudioContext({ latencyHint: 'interactive' });
  if (ctx.state === 'suspended') await ctx.resume();
  return ctx;
}

export async function getMic(): Promise<MediaStream> {
  return navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: true,
      channelCount: 1,
    },
    video: false,
  });
}

export function encodeWav(chunks: Float32Array[], sampleRate: number): Blob {
  let n = 0;
  for (const c of chunks) n += c.length;
  const pcm = new Int16Array(n);
  let o = 0;
  for (const c of chunks) {
    for (let i = 0; i < c.length; i++) {
      const s = Math.max(-1, Math.min(1, c[i]));
      pcm[o++] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
  }
  const bytes = pcm.byteLength;
  const buf = new ArrayBuffer(44 + bytes);
  const v = new DataView(buf);
  const w = (at: number, s: string) => {
    for (let i = 0; i < s.length; i++) v.setUint8(at + i, s.charCodeAt(i));
  };
  w(0, 'RIFF');
  v.setUint32(4, 36 + bytes, true);
  w(8, 'WAVE');
  w(12, 'fmt ');
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, sampleRate, true);
  v.setUint32(28, sampleRate * 2, true);
  v.setUint16(32, 2, true);
  v.setUint16(34, 16, true);
  w(36, 'data');
  v.setUint32(40, bytes, true);
  new Uint8Array(buf, 44).set(new Uint8Array(pcm.buffer, pcm.byteOffset, pcm.byteLength));
  return new Blob([buf], { type: 'audio/wav' });
}

export class BoothMic {
  readonly ctx: AudioContext;
  readonly stream: MediaStream;
  readonly analyser: AnalyserNode;
  private readonly data: Uint8Array<ArrayBuffer>;
  private readonly proc: ScriptProcessorNode;
  private chunks: Float32Array[] = [];
  private armed = false;

  constructor(ctx: AudioContext, stream: MediaStream) {
    this.ctx = ctx;
    this.stream = stream;
    const src = ctx.createMediaStreamSource(stream);
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.4;
    this.data = new Uint8Array(this.analyser.fftSize);
    this.proc = ctx.createScriptProcessor(2048, 1, 1);
    const mute = ctx.createGain();
    mute.gain.value = 0;
    src.connect(this.analyser);
    src.connect(this.proc);
    this.proc.connect(mute);
    mute.connect(ctx.destination);
    this.proc.onaudioprocess = (e) => {
      if (!this.armed) return;
      this.chunks.push(new Float32Array(e.inputBuffer.getChannelData(0)));
    };
  }

  level(): number {
    this.analyser.getByteTimeDomainData(this.data);
    let sum = 0;
    for (let i = 0; i < this.data.length; i++) {
      const v = (this.data[i] - 128) / 128;
      sum += v * v;
    }
    return Math.min(1, Math.sqrt(sum / this.data.length) * 3.6);
  }

  waveform(out: Uint8Array): void {
    this.analyser.getByteTimeDomainData(out as Uint8Array<ArrayBuffer>);
  }

  startTake(): void {
    this.chunks = [];
    this.armed = true;
  }

  stopTake(): Blob {
    this.armed = false;
    const blob = encodeWav(this.chunks, this.ctx.sampleRate);
    this.chunks = [];
    return blob;
  }
}

export function wait(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function shareOrDownload(blob: Blob, filename: string, title: string) {
  const file = new File([blob], filename, { type: blob.type || 'video/webm' });
  const nav = navigator as Navigator & {
    canShare?: (d: { files?: File[] }) => boolean;
    share?: (d: { files?: File[]; title?: string; text?: string }) => Promise<void>;
  };
  if (nav.canShare?.({ files: [file] })) {
    await nav.share({ files: [file], title, text: `${title} · TOMA` });
    return;
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export async function exportTake(
  video: HTMLVideoElement,
  takeUrl: string,
  seconds: number,
): Promise<Blob> {
  const w = 720;
  const h = 1280;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  const fps = 30;
  let running = true;
  const draw = () => {
    if (!running) return;
    ctx.fillStyle = '#0c0d10';
    ctx.fillRect(0, 0, w, h);
    const vw = video.videoWidth || 16;
    const vh = video.videoHeight || 9;
    const cover = Math.max(w / vw, h / vh);
    const dw = vw * cover;
    const dh = vh * cover;
    ctx.drawImage(video, (w - dw) / 2, (h - dh) / 2, dw, dh);
    requestAnimationFrame(draw);
  };
  draw();

  const ctxAudio = new AudioContext();
  if (ctxAudio.state === 'suspended') await ctxAudio.resume();
  const dest = ctxAudio.createMediaStreamDestination();
  const take = new Audio(takeUrl);
  take.preload = 'auto';
  await new Promise<void>((res, rej) => {
    take.oncanplaythrough = () => res();
    take.onerror = () => rej(new Error('No cargó la toma'));
    if (take.readyState >= 3) res();
    else take.load();
  });
  const src = ctxAudio.createMediaElementSource(take);
  src.connect(dest);
  src.connect(ctxAudio.destination);
  const mixed = new MediaStream([
    ...canvas.captureStream(fps).getVideoTracks(),
    ...dest.stream.getAudioTracks(),
  ]);
  const mime = pickMime([
    'video/webm;codecs=vp8,opus',
    'video/webm',
    'video/mp4',
  ]);
  const rec = mime ? new MediaRecorder(mixed, { mimeType: mime }) : new MediaRecorder(mixed);
  const chunks: Blob[] = [];
  rec.ondataavailable = (e) => {
    if (e.data.size) chunks.push(e.data);
  };
  const done = new Promise<Blob>((resolve, reject) => {
    rec.onstop = () => {
      running = false;
      void ctxAudio.close();
      resolve(new Blob(chunks, { type: rec.mimeType || 'video/webm' }));
    };
    rec.onerror = () => reject(new Error('No se pudo armar el clip'));
  });
  video.currentTime = 0;
  take.currentTime = 0;
  rec.start(80);
  await video.play();
  await take.play().catch(() => undefined);
  await wait(Math.min(seconds, 60) * 1000 + 120);
  video.pause();
  take.pause();
  if (rec.state !== 'inactive') rec.stop();
  return done;
}
