/** Wrap any transform offset into one visually equivalent logo cycle. */
export function wrapBrandMarqueeOffset(offset: number, cycleWidth: number): number {
  if (cycleWidth <= 0) return 0;
  return -(((-offset % cycleWidth) + cycleWidth) % cycleWidth);
}
