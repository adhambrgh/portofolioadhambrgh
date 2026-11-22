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
}

export const DEFAULT_STRAP_CONFIG: StrapGeometryConfig = {
  hangLeft: { x: 124, y: -10 },
  hangRight: { x: 176, y: -10 },
  meetLocal: { x: 150, y: 204 },
  cardPivot: { x: 150, y: 0 },
  chainLen: 245,
  slackFactor: 0.3,
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

function springyCurve(hang: Point, end: Point, chainLen: number, slackFactor: number): string {
  const dist = Math.hypot(end.x - hang.x, end.y - hang.y);
  const slack = Math.max(0, chainLen - dist);

  const midX = (hang.x + end.x) / 2;
  const midY = (hang.y + end.y) / 2;

  const sagY = midY + slack * slackFactor;

  return `M${hang.x.toFixed(2)} ${hang.y.toFixed(2)} Q${midX.toFixed(2)} ${sagY.toFixed(2)} ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

export function generateStrapPaths(
  strapLag: number,
  config: Partial<StrapGeometryConfig> = {}
): StrapPaths {
  const cfg = { ...DEFAULT_STRAP_CONFIG, ...config };
  const meet = getMeetPoint(strapLag, cfg);

  return {
    left: springyCurve(cfg.hangLeft, meet, cfg.chainLen, cfg.slackFactor),
    right: springyCurve(cfg.hangRight, meet, cfg.chainLen, cfg.slackFactor),
  };
}

export function generateStaticStrapPaths(
  config: Partial<StrapGeometryConfig> = {}
): StrapPaths {
  return generateStrapPaths(0, config);
}