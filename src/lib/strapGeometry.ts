export interface StrapPaths {
  left: string;
  right: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface StrapGeometryConfig {
  hangLeft: Point;
  hangRight: Point;
  meetLocal: Point;
  cardPivot: Point;
  chainLen: number;
  slackFactor: number;
  /** lebar pita (px) */
  width: number;
}

export const DEFAULT_STRAP_CONFIG: StrapGeometryConfig = {
  hangLeft: { x: 124, y: -10 },
  hangRight: { x: 176, y: -10 },
  meetLocal: { x: 150, y: 204 },
  cardPivot: { x: 150, y: 204 },
  chainLen: 245,
  slackFactor: 0.3,
  width: 16,
};

export function rotatePoint(p: Point, angleRad: number, pivot: Point): Point {
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);
  const dx = p.x - pivot.x;
  const dy = p.y - pivot.y;
  return {
    x: pivot.x + dx * cos - dy * sin,
    y: pivot.y + dx * sin + dy * cos,
  };
}

export function getMeetPoint(
  angleRad: number,
  config: Partial<StrapGeometryConfig> = {}
): Point {
  const cfg = { ...DEFAULT_STRAP_CONFIG, ...config };
  return rotatePoint(cfg.meetLocal, angleRad, cfg.cardPivot);
}

export function getMeetLocal(config: Partial<StrapGeometryConfig> = {}): Point {
  const cfg = { ...DEFAULT_STRAP_CONFIG, ...config };
  return cfg.meetLocal;
}

interface Quad {
  p0: Point; // ujung atas
  c: Point; // kontrol
  p1: Point; // ujung bawah
}

function quadGeometry(hang: Point, end: Point, chainLen: number, slackFactor: number): Quad {
  const dist = Math.hypot(end.x - hang.x, end.y - hang.y);
  // di luar reach tali tetap tegang (tanpa lengkung, bukan memudar)
  const slack = Math.max(0, chainLen - dist);
  return {
    p0: hang,
    c: { x: (hang.x + end.x) / 2, y: (hang.y + end.y) / 2 + slack * slackFactor },
    p1: end,
  };
}

/** Normal sisi kanan jalur pita pada titik dan tangent tertentu. */
function sideNormal(q: Quad, t: number, half: number): { n: Point; p: Point } {
  const p = quadPoint(q, t);
  const d = quadTangent(q, t);
  const len = Math.hypot(d.x, d.y) || 1;
  // normal kanan = (-dy, dx)
  return { n: { x: (-d.y / len) * half, y: (d.x / len) * half }, p };
}

function quadPoint(q: Quad, t: number): Point {
  const mt = 1 - t;
  return {
    x: mt * mt * q.p0.x + 2 * mt * t * q.c.x + t * t * q.p1.x,
    y: mt * mt * q.p0.y + 2 * mt * t * q.c.y + t * t * q.p1.y,
  };
}

function quadTangent(q: Quad, t: number): Point {
  return {
    x: 2 * (1 - t) * (q.c.x - q.p0.x) + 2 * t * (q.p1.x - q.c.x),
    y: 2 * (1 - t) * (q.c.y - q.p0.y) + 2 * t * (q.p1.y - q.c.y),
  };
}

const f = (v: number) => v.toFixed(2);

/**
 * Outline pita: sisi luar (kanan) dari atas ke bawah, lalu sisi dalam (kiri) balik ke atas.
 * Ujung bawah menyempit jadi runcing (bertemu di clip), ujung atas dipotong rata.
 */
export function tapePath(
  hang: Point,
  end: Point,
  chainLen: number,
  slackFactor: number,
  width: number,
  bottomTaper = 0.35
): string {
  const q = quadGeometry(hang, end, chainLen, slackFactor);
  const half = width / 2;
  const steps = 16;

  const outer: string[] = [];
  const inner: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const { n, p } = sideNormal(q, t, half);
    // 14% terakhir menyempit linier ke bottomTaper supaya kedua pita bertemu rapi di clip
    const taperStart = 0.86;
    const w =
      t < taperStart ? 1 : 1 - (1 - bottomTaper) * ((t - taperStart) / (1 - taperStart));
    outer.push(`${f(p.x + n.x * w)} ${f(p.y + n.y * w)}`);
    inner.push(`${f(p.x - n.x * w)} ${f(p.y - n.y * w)}`);
  }

  return `M${outer.join(" L")} L${inner.reverse().join(" L")} Z`;
}

/** Pita parsial antara fraksi t0..t1 (outline tertutup) — untuk blok motif. */
export function tapeBand(
  hang: Point,
  end: Point,
  chainLen: number,
  slackFactor: number,
  t0: number,
  t1: number
): string {
  const q = quadGeometry(hang, end, chainLen, slackFactor);
  const half = DEFAULT_STRAP_CONFIG.width / 2;
  const steps = 8;
  const outer: string[] = [];
  const inner: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = t0 + ((t1 - t0) * i) / steps;
    const { n, p } = sideNormal(q, t, half);
    outer.push(`${f(p.x + n.x)} ${f(p.y + n.y)}`);
    inner.push(`${f(p.x - n.x)} ${f(p.y - n.y)}`);
  }
  return `M${outer.join(" L")} L${inner.reverse().join(" L")} Z`;
}

/**
 * Garis tengah pita dari fraksi t0 ke t1 sebagai path terbuka — dipakai <textPath>
 * supaya huruf mengikuti lengkung pita, bukan sekadar miring di satu titik.
 */
export function tapeMidCurve(
  hang: Point,
  end: Point,
  chainLen: number,
  slackFactor: number,
  t0 = 0,
  t1 = 0.94
): string {
  const q = quadGeometry(hang, end, chainLen, slackFactor);
  const steps = 12;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = t0 + ((t1 - t0) * i) / steps;
    const p = quadPoint(q, t);
    pts.push(`${f(p.x)} ${f(p.y)}`);
  }
  return `M${pts.join(" L")}`;
}

export function generateStrapPaths(
  strapLag: number,
  config: Partial<StrapGeometryConfig> = {}
): StrapPaths {
  const cfg = { ...DEFAULT_STRAP_CONFIG, ...config };
  return generateStrapPathsToMeet(getMeetPoint(strapLag, cfg), cfg);
}

export function generateStrapPathsToMeet(
  meet: Point,
  config: Partial<StrapGeometryConfig> = {}
): StrapPaths {
  const cfg = { ...DEFAULT_STRAP_CONFIG, ...config };
  return {
    left: tapePath(cfg.hangLeft, meet, cfg.chainLen, cfg.slackFactor, cfg.width),
    right: tapePath(cfg.hangRight, meet, cfg.chainLen, cfg.slackFactor, cfg.width),
  };
}

/** Titik gantung kiri dalam ruang card (sudah dirotasi mengelilingi cardPivot). */
export function getHangPoint(
  side: "left" | "right",
  angleRad: number,
  config: Partial<StrapGeometryConfig> = {}
): Point {
  const cfg = { ...DEFAULT_STRAP_CONFIG, ...config };
  return rotatePoint(side === "left" ? cfg.hangLeft : cfg.hangRight, angleRad, cfg.cardPivot);
}

export function generateStaticStrapPaths(
  config: Partial<StrapGeometryConfig> = {}
): StrapPaths {
  return generateStrapPaths(0, config);
}

/** Path garis tengah pita kiri/kanan untuk teks yang mengikuti lengkung. */
export function generateStrapMidCurves(
  meet: Point,
  config: Partial<StrapGeometryConfig> = {}
): StrapPaths {
  const cfg = { ...DEFAULT_STRAP_CONFIG, ...config };
  return {
    left: tapeMidCurve(cfg.hangLeft, meet, cfg.chainLen, cfg.slackFactor),
    right: tapeMidCurve(cfg.hangRight, meet, cfg.chainLen, cfg.slackFactor),
  };
}
