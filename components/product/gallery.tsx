"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Gallery({
  images,
  selectedVariantImage,
}: {
  images: { src: string; altText: string }[];
  selectedVariantImage?: string | null;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const imageSearchParam = searchParams.get("image");
  const activeIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  // KEY FIX: Variant image overrides everything
  const displayImage = selectedVariantImage
    ? { src: selectedVariantImage, altText: "Variant image" }
    : images[activeIndex] || images[0];

  const updateImage = (index: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("image", index.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const nextImageIndex = activeIndex + 1 < images.length ? activeIndex + 1 : 0;
  const previousImageIndex =
    activeIndex === 0 ? images.length - 1 : activeIndex - 1;

  return (
    <div className="flex flex-col">
      <div className="relative aspect-square h-full max-h-[600px] w-full overflow-hidden rounded-[12px] border border-border-l bg-white">
        {displayImage && (
          <Image
            className="h-full w-full object-contain p-8 transition-opacity duration-300"
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt={displayImage.altText}
            src={displayImage.src}
            priority={true}
          />
        )}

        {images.length > 1 && !selectedVariantImage && (
          <div className="absolute bottom-6 flex w-full justify-center">
            <div className="flex h-10 items-center overflow-hidden rounded-[10px] border border-border-l bg-off-white/90 backdrop-blur-md">
              <button
                onClick={() => updateImage(previousImageIndex)}
                aria-label="Previous image"
                className="flex h-full items-center px-4 transition-colors hover:bg-white active:scale-95"
              >
                <ArrowLeftIcon className="h-4 w-4 stroke-[1.5]" />
              </button>
              <div className="h-4 w-px bg-border-l"></div>
              <button
                onClick={() => updateImage(nextImageIndex)}
                aria-label="Next image"
                className="flex h-full items-center px-4 transition-colors hover:bg-white active:scale-95"
              >
                <ArrowRightIcon className="h-4 w-4 stroke-[1.5]" />
              </button>
            </div>
          </div>
        )}
      </div>

      <ul className="mt-6 flex flex-wrap items-center justify-start gap-3">
        {images.map((image, index) => {
          const isActive = !selectedVariantImage && index === activeIndex;

          return (
            <li
              key={`${image.src}-${index}`}
              className="h-16 w-16 md:h-20 md:w-20"
            >
              <button
                onClick={() => updateImage(index)}
                aria-label={`Select image ${index + 1}`}
                className={clsx(
                  "relative h-full w-full overflow-hidden rounded-[8px] border transition-all duration-200 bg-white",
                  isActive
                    ? "border-primary ring-1 ring-primary shadow-sm"
                    : "border-border-l hover:border-muted",
                )}
              >
                <Image
                  src={image.src}
                  alt={image.altText}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover p-1"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
