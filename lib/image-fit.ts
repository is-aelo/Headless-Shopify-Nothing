/**
 * Picks an object-fit per image so we only "fill" (crop) when the source
 * image doesn't play nice inside the frame:
 * - image is landscape (wider than the frame shape)  -> cover
 * - image shape is far from the frame shape          -> cover
 * - otherwise (same shape, e.g. portrait phone shot) -> contain
 */
export function getImageObjectFit(
  width: number | undefined | null,
  height: number | undefined | null,
  frameAspect: number,
): "cover" | "contain" {
  if (!width || !height) return "contain";

  const imageAspect = width / height;
  const shapeMatch = Math.abs(imageAspect / frameAspect - 1) <= 0.15;
  const isLandscape = imageAspect > 1;

  return isLandscape || !shapeMatch ? "cover" : "contain";
}