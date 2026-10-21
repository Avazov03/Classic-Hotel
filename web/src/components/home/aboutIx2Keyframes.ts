/**
 * Measured from baseline Webflow IX2 on home-one About (250vh sticky track).
 * progress = scrolled / (trackHeight - viewportHeight)
 */
export type KF = { p: number; v: number };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Piecewise-linear interpolate a keyframe series. */
export function sample(frames: KF[], progress: number): number {
  if (progress <= frames[0].p) return frames[0].v;
  const last = frames[frames.length - 1];
  if (progress >= last.p) return last.v;
  for (let i = 0; i < frames.length - 1; i++) {
    const a = frames[i];
    const b = frames[i + 1];
    if (progress >= a.p && progress <= b.p) {
      const t = (progress - a.p) / (b.p - a.p || 1);
      return lerp(a.v, b.v, t);
    }
  }
  return last.v;
}

/**
 * Pill 1 translateY % — starts after title reveal.
 * Begins lower so the image rises into place (not already on-screen).
 */
export const ONE_Y: KF[] = [
  { p: 0, v: 58 },
  { p: 0.06, v: 28 },
  { p: 0.12, v: 10 },
  { p: 0.18, v: 2.5 },
  { p: 0.22, v: 0 },
  { p: 1, v: 0 },
];

/** Pill 1 scale (shrinks as pill 2 settles) */
export const ONE_S: KF[] = [
  { p: 0, v: 1 },
  { p: 0.22, v: 1 },
  { p: 0.28, v: 0.9915 },
  { p: 0.34, v: 0.9748 },
  { p: 0.4, v: 0.9627 },
  { p: 0.46, v: 0.9544 },
  { p: 0.52, v: 0.9504 },
  { p: 0.55, v: 0.95 },
  { p: 1, v: 0.95 },
];

/** Pill 2 translateY % — starts after pill 1 has settled */
export const TWO_Y: KF[] = [
  { p: 0, v: 130 },
  { p: 0.22, v: 130 },
  { p: 0.28, v: 108.8 },
  { p: 0.34, v: 67.0 },
  { p: 0.4, v: 36.6 },
  { p: 0.46, v: 16.1 },
  { p: 0.52, v: 6.1 },
  { p: 0.55, v: 5 },
  { p: 1, v: 5 },
];

/** Pill 2 scale (shrinks as pill 3 rises) */
export const TWO_S: KF[] = [
  { p: 0, v: 1 },
  { p: 0.65, v: 1 },
  { p: 0.7, v: 0.997 },
  { p: 0.75, v: 0.975 },
  { p: 0.8, v: 0.96 },
  { p: 0.85, v: 0.952 },
  { p: 0.9, v: 0.95 },
  { p: 1, v: 0.95 },
];

/** Pill 3 translateY % — settles at 12% */
export const THREE_Y: KF[] = [
  { p: 0, v: 215 },
  { p: 0.55, v: 215 },
  { p: 0.6, v: 173.8 },
  { p: 0.65, v: 127.4 },
  { p: 0.7, v: 108.8 },
  { p: 0.75, v: 64.4 },
  { p: 0.8, v: 33.6 },
  { p: 0.85, v: 16.4 },
  { p: 0.9, v: 12 },
  { p: 1, v: 12 },
];

export const TITLE_OP: KF[] = [
  { p: 0, v: 0 },
  { p: 0.05, v: 0.34 },
  { p: 0.1, v: 0.59 },
  { p: 0.15, v: 0.77 },
  { p: 0.2, v: 0.88 },
  { p: 0.25, v: 0.94 },
  { p: 0.3, v: 0.98 },
  { p: 0.35, v: 0.99 },
  { p: 0.4, v: 1 },
  { p: 1, v: 1 },
];

/** Image blur overlays (cyan edge) — opacity */
export const BLUR1_OP: KF[] = [
  { p: 0, v: 0.31 },
  { p: 0.1, v: 1 },
  { p: 0.2, v: 0.03 },
  { p: 0.25, v: 0 },
  { p: 1, v: 0 },
];

export const BLUR2_OP: KF[] = [
  { p: 0, v: 1 },
  { p: 0.45, v: 1 },
  { p: 0.5, v: 0.32 },
  { p: 0.55, v: 0 },
  { p: 1, v: 0 },
];

export const BLUR3_OP: KF[] = [
  { p: 0, v: 1 },
  { p: 0.9, v: 1 },
  { p: 1, v: 0 },
];

/** Bottom copy block */
export const COPY_Y: KF[] = [
  { p: 0, v: 40 },
  { p: 0.88, v: 40 },
  { p: 1, v: 0 },
];

export const COPY_BLUR: KF[] = [
  { p: 0, v: 4 },
  { p: 0.88, v: 4 },
  { p: 1, v: 0 },
];

export const COPY_OP: KF[] = [
  { p: 0, v: 0 },
  { p: 0.88, v: 0 },
  { p: 1, v: 1 },
];
