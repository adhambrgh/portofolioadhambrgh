export interface StrapPaths {
  left: string;
  right: string;
}

export interface StrapGeometryConfig {
  clipX: number;
  clipY: number;
  cardCenterY: number;
  clipHoleOffsetY: number;
  anchorSpread: number;
  gapAboveHole: number;
  chainLen: number;
  slackFactor: number;
}

export interface Point {
  x: number;
  y: number;
}

export const DEFAULT_STRAP_CONFIG: StrapGeometryConfig = {
  clipX: 150,
  clipY: 8,
  cardCenterY: 220,
  clipHoleOffsetY: -16,
  anchorSpread: 9,
  gapAboveHole: 38,
  chainLen: 232,
  slackFactor: 0.42,
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

/**
 * Titik tempat tali bertemu card.
 * Berada sedikit di atas lubang clip agar kedua tali bertemu tepat di
 * pangkal klip (membentuk huruf V yang rapi), bukan melebar ke samping.
 * Nilai ini DIROTASI mengikuti card, sehingga tali selalu menempel.
 */
export function getAnchorPoints(
  angleRad: number,
  config: Partial<StrapGeometryConfig> = {}
): { left: Point; right: Point; pivot: Point } {
  const cfg = { ...DEFAULT_STRAP_CONFIG, ...config };
  const pivot: Point = { x: cfg.clipX, y: cfg.clipY };

  const anchorY = cfg.cardCenterY + cfg.clipHoleOffsetY - cfg.gapAboveHole;
  const localLeft: Point = { x: cfg.clipX - cfg.anchorSpread, y: anchorY };
  const localRight: Point = { x: cfg.clipX + cfg.anchorSpread, y: anchorY };

  return {
    left: rotatePoint(localLeft, angleRad, pivot),
    right: rotatePoint(localRight, angleRad, pivot),
    pivot,
  };
}

/**
 * Kurva tali yang lentur seperti kain:
 * - melengkung ke BAWAH (gravitasi) saat kendur
 * - menegang saat card ditarik menjauh
 */
function springyCurve(clip: Point, end: Point, chainLen: number, slackFactor: number): string {
  const dist = Math.hypot(end.x - clip.x, end.y - clip.y);
  const slack = Math.max(0, chainLen - dist);

  const midX = (clip.x + end.x) / 2;
  const midY = (clip.y + end.y) / 2;

  const sagY = midY + slack * slackFactor;

  return `M${clip.x.toFixed(2)} ${clip.y.toFixed(2)} Q${midX.toFixed(2)} ${sagY.toFixed(2)} ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

export function generateStrapPaths(
  strapLag: number,
  config: Partial<StrapGeometryConfig> = {}
): StrapPaths {
  const cfg = { ...DEFAULT_STRAP_CONFIG, ...config };
  const anchors = getAnchorPoints(strapLag, cfg);

  return {
    left: springyCurve(anchors.pivot, anchors.left, cfg.chainLen, cfg.slackFactor),
    right: springyCurve(anchors.pivot, anchors.right, cfg.chainLen, cfg.slackFactor),
  };
}

export function generateStaticStrapPaths(
  config: Partial<StrapGeometryConfig> = {}
): StrapPaths {
  return generateStrapPaths(0, config);
}