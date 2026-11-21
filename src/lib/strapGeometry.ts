export interface StrapPaths {
  left: string;
  right: string;
}

export interface StrapGeometryConfig {
  clipX: number;
  clipY: number;
  holderLeftX: number;
  holderRightX: number;
  holderY: number;
  maxSag: number;
  asymmetry: number;
}

const DEFAULT_CONFIG: StrapGeometryConfig = {
  clipX: 150,
  clipY: 0,
  holderLeftX: 80,
  holderRightX: 220,
  holderY: 220,
  maxSag: 28,
  asymmetry: 0.15,
};

function cubicBezier(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
): string {
  return `M${x0.toFixed(2)} ${y0.toFixed(2)} C${x1.toFixed(2)} ${y1.toFixed(2)}, ${x2.toFixed(2)} ${y2.toFixed(2)}, ${x3.toFixed(2)} ${y3.toFixed(2)}`;
}

function catenaryCurve(
  x0: number,
  y0: number,
  x3: number,
  y3: number,
  sag: number,
  tension: number
): string {
  const dx = x3 - x0;
  const midX = x0 + dx / 2;
  const midY = Math.max(y0, y3) - sag * tension;

  const ctrlOffset = Math.abs(dx) * 0.35;

  const x1 = midX - ctrlOffset;
  const x2 = midX + ctrlOffset;
  const y1 = midY;
  const y2 = midY;

  return cubicBezier(x0, y0, x1, y1, x2, y2, x3, y3);
}

export function generateStrapPaths(
  angle: number,
  config: Partial<StrapGeometryConfig> = {}
): StrapPaths {
  const cfg = { ...DEFAULT_CONFIG, ...config };

  const angleRatio = Math.max(-1, Math.min(1, angle / (25 * Math.PI / 180)));

  const clipX = cfg.clipX + angle * 15;
  const clipY = cfg.clipY;

  const leftHolderX = cfg.holderLeftX + angle * 10;
  const rightHolderX = cfg.holderRightX + angle * 10;
  const holderY = cfg.holderY;

  const baseSag = cfg.maxSag;

  const leftTension = 1 - angleRatio * 0.3;
  const rightTension = 1 + angleRatio * 0.3;

  const leftSag = baseSag * leftTension * (1 + cfg.asymmetry * 0.2);
  const rightSag = baseSag * rightTension * (1 - cfg.asymmetry * 0.2);

  const leftPath = catenaryCurve(
    clipX,
    clipY,
    leftHolderX,
    holderY,
    leftSag,
    leftTension
  );

  const rightPath = catenaryCurve(
    clipX,
    clipY,
    rightHolderX,
    holderY,
    rightSag,
    rightTension
  );

  return {
    left: leftPath,
    right: rightPath,
  };
}

export function generateStaticStrapPaths(
  config: Partial<StrapGeometryConfig> = {}
): StrapPaths {
  return generateStrapPaths(0, config);
}