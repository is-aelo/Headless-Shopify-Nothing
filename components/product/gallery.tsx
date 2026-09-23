"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function Gallery({
  images,
  selectedVariantImage,
  isSoldOut,
}: {
  images: { src: string; altText: string }[];
  selectedVariantImage?: string | null;
  isSoldOut?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const areaRef = useRef<HTMLDivElement | null>(null);

  const imageSearchParam = searchParams.get("image");
  const activeIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  const displayImages = selectedVariantImage
    ? [
        { src: selectedVariantImage, altText: "Selected variant" },
        ...images.slice(1),
      ]
    : images;

  const currentImage = displayImages[activeIndex] || displayImages[0];

  useEffect(() => {
    setIsLoading(true);
  }, [currentImage?.src]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
        return;
      }
      if (e.key === "ArrowRight") changeLightboxImage(1);
      if (e.key === "ArrowLeft") changeLightboxImage(-1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, displayImages.length]);

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const updateImage = (index: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("image", index.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const changeLightboxImage = (direction: number) => {
    if (!displayImages.length) return;
    const next =
      (activeIndex + direction + displayImages.length) % displayImages.length;
    updateImage(next);
    resetView();
  };

  const nextIndex =
    activeIndex + 1 < displayImages.length ? activeIndex + 1 : 0;
  const prevIndex =
    activeIndex === 0 ? displayImages.length - 1 : activeIndex - 1;

  const showSoldOut = isSoldOut && !!selectedVariantImage && activeIndex === 0;

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 0.89;
    const nextZoom = clamp(zoom * factor, 1, 4);
    setZoom(nextZoom);
    if (nextZoom <= 1) setPan({ x: 0, y: 0 });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1) return;
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragStartRef.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || zoom <= 1) return;
    const area = areaRef.current;
    const maxX = area ? (area.clientWidth * (zoom - 1)) / 2 : 0;
    const maxY = area ? (area.clientHeight * (zoom - 1)) / 2 : 0;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({
      x: clamp(dragStartRef.current.panX + dx, -maxX, maxX),
      y: clamp(dragStartRef.current.panY + dy, -maxY, maxY),
    });
  };

  const onPointerUp = () => setDragging(false);

  const openLightbox = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    resetView();
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:gap-5">
        {/* Thumbnail strip — left, desktop only */}
        {displayImages.length > 1 && (
          <ul className="hidden md:flex md:flex-col md:gap-1.5 md:w-14 md:shrink-0">
            {displayImages.map((image, index) => (
              <li key={`${image.src}-${index}`}>
                <button
                  onClick={() => updateImage(index)}
                  aria-label={`Select image ${index + 1}`}
                  className={clsx(
                    "relative h-14 w-14 overflow-hidden border bg-white transition-colors duration-200",
                    index === activeIndex
                      ? "border-black"
                      : "border-black/10 opacity-60 hover:border-black/30 hover:opacity-100",
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.altText}
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Main image */}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div
            onClick={openLightbox}
            className="relative mx-auto aspect-square w-full max-w-[560px] cursor-zoom-in overflow-hidden border border-black/[0.06] bg-white"
          >
            {currentImage && (
              <Image
                className={clsx(
                  "object-cover p-3 transition-opacity duration-500 sm:p-4",
                  isLoading ? "opacity-0" : "opacity-100",
                  showSoldOut && "opacity-30",
                )}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt={currentImage.altText}
                src={currentImage.src}
                priority={true}
                onLoad={() => setIsLoading(false)}
              />
            )}

            {/* Sold out overlay */}
            {showSoldOut && !isLoading && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-off-white/60 backdrop-blur-[2px]">
                <span className="border border-surface/20 bg-white/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-surface">
                  Sold Out
                </span>
              </div>
            )}

            {/* Image index */}
            <span className="absolute bottom-0 left-0 flex items-center bg-black px-3 py-2">
              <span className="font-mono text-[9px] tracking-[0.3em] text-white">
                0{activeIndex + 1} / 0{displayImages.length}
              </span>
            </span>

            {/* Arrows */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateImage(prevIndex);
                  }}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-black/10 bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
                >
                  <ArrowLeftIcon className="h-4 w-4 stroke-[1.5]" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateImage(nextIndex);
                  }}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-black/10 bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
                >
                  <ArrowRightIcon className="h-4 w-4 stroke-[1.5]" />
                </button>
              </>
            )}
          </div>

          {/* Dots — mobile only (thumbnails hidden) */}
          {displayImages.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 md:hidden">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => updateImage(index)}
                  aria-label={`Go to image ${index + 1}`}
                  className={clsx(
                    "h-[3px] rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "w-4 bg-surface"
                      : "w-[3px] bg-border-l hover:bg-muted",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
              0{activeIndex + 1} / 0{displayImages.length}
            </span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tabular-nums tracking-[0.2em] text-white/60">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => {
                  setZoom((z) => clamp(z + 0.25, 1, 4));
                  setPan({ x: 0, y: 0 });
                }}
                aria-label="Zoom in"
                className="flex h-8 w-8 items-center justify-center border border-white/20 font-mono text-sm text-white transition-colors hover:border-white hover:bg-white hover:text-black"
              >
                +
              </button>
              <button
                onClick={() => {
                  setZoom((z) => {
                    const next = clamp(z - 0.25, 1, 4);
                    if (next <= 1) setPan({ x: 0, y: 0 });
                    return next;
                  });
                }}
                aria-label="Zoom out"
                className="flex h-8 w-8 items-center justify-center border border-white/20 font-mono text-sm text-white transition-colors hover:border-white hover:bg-white hover:text-black"
              >
                –
              </button>
              <button
                onClick={() => {
                  setZoom(1);
                  setPan({ x: 0, y: 0 });
                }}
                aria-label="Reset zoom"
                className="hidden border border-white/20 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white hover:text-black sm:flex h-8 items-center"
              >
                Fit
              </button>
              <button
                onClick={() => setLightboxOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center border border-white/20 font-mono text-xs text-white transition-colors hover:border-white hover:bg-white hover:text-black"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Image area */}
          <div
            ref={areaRef}
            onWheel={onWheel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("button")) return;
              if (zoom <= 1) setLightboxOpen(false);
            }}
            className={clsx(
              "relative flex flex-1 select-none touch-none items-center justify-center overflow-hidden",
              zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-out",
            )}
          >
            <img
              src={currentImage.src}
              alt={currentImage.altText}
              draggable={false}
              className="max-h-[85vh] max-w-[92vw] object-contain transition-transform duration-200"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              }}
            />
          </div>

          {/* Bottom nav */}
          <div className="flex items-center justify-center gap-3 border-t border-white/10 px-4 py-4">
            <button
              onClick={() => changeLightboxImage(-1)}
              aria-label="Previous image"
              className="flex h-10 w-12 items-center justify-center border border-white/20 text-white transition-colors hover:border-white hover:bg-white hover:text-black"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              Drag to pan · Scroll to zoom
            </span>
            <button
              onClick={() => changeLightboxImage(1)}
              aria-label="Next image"
              className="flex h-10 w-12 items-center justify-center border border-white/20 text-white transition-colors hover:border-white hover:bg-white hover:text-black"
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}