"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  const imageSearchParam = searchParams.get("image");
  const activeIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  const displayImages = selectedVariantImage
    ? [
        { src: selectedVariantImage, altText: "Selected variant" },
        ...images.slice(1),
      ]
    : images;

  const currentImage = displayImages[activeIndex] || displayImages[0];

  const updateImage = (index: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("image", index.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const nextIndex =
    activeIndex + 1 < displayImages.length ? activeIndex + 1 : 0;
  const prevIndex =
    activeIndex === 0 ? displayImages.length - 1 : activeIndex - 1;

  const showSoldOut = isSoldOut && !!selectedVariantImage && activeIndex === 0;

  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-3">
      {/* Thumbnail strip — left, desktop only */}
      {displayImages.length > 1 && (
        <ul className="hidden md:flex md:flex-col md:gap-1.5 md:w-12 md:shrink-0">
          {displayImages.map((image, index) => (
            <li key={`${image.src}-${index}`}>
              <button
                onClick={() => updateImage(index)}
                aria-label={`Select image ${index + 1}`}
                className={clsx(
                  "relative h-12 w-12 overflow-hidden rounded-[6px] border transition-all duration-200 bg-off-white",
                  index === activeIndex
                    ? "border-surface ring-1 ring-surface"
                    : "border-border-l opacity-50 hover:opacity-100 hover:border-muted",
                )}
              >
                <Image
                  src={image.src}
                  alt={image.altText}
                  width={48}
                  height={48}
                  className="h-full w-full object-contain p-1"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Main image + dots */}
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <div className="relative aspect-square w-full max-w-[480px] mx-auto">
          {currentImage && (
            <Image
              className={clsx(
                "object-contain p-6 transition-opacity duration-300",
                showSoldOut && "opacity-30",
              )}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt={currentImage.altText}
              src={currentImage.src}
              priority={true}
            />
          )}

          {/* Sold out overlay */}
          {showSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center rounded-[12px] bg-off-white/60 backdrop-blur-[2px]">
              <span className="rounded-full border border-surface/20 bg-white/90 px-4 py-1.5 font-nav text-[10px] uppercase tracking-[0.25em] text-surface">
                Sold Out
              </span>
            </div>
          )}

          {/* Arrows */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={() => updateImage(prevIndex)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-border-l bg-white/80 backdrop-blur-sm transition-all hover:bg-white"
              >
                <ArrowLeftIcon className="h-3 w-3 stroke-[1.5]" />
              </button>
              <button
                onClick={() => updateImage(nextIndex)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-border-l bg-white/80 backdrop-blur-sm transition-all hover:bg-white"
              >
                <ArrowRightIcon className="h-3 w-3 stroke-[1.5]" />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {displayImages.length > 1 && (
          <div className="flex items-center justify-center gap-1.5">
            {displayImages.map((_, index) => (
              <button
                key={index}
                onClick={() => updateImage(index)}
                aria-label={`Go to image ${index + 1}`}
                className={clsx(
                  "h-[4px] rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-4 bg-surface"
                    : "w-[4px] bg-border-l hover:bg-muted",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
