"use client";

import { ArrowRight, SearchIcon, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const query = searchParams.get("q");
    setHasValue(!!query);
    if (inputRef.current) inputRef.current.value = query || "";
  }, [searchParams]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setHasValue(e.target.value.length > 0);
  }

  function handleClear() {
    if (inputRef.current) {
      inputRef.current.value = "";
      setHasValue(false);
      router.push("/search");
    }
  }

  // Unified submit handler for both mobile and desktop
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const val = formData.get("search") as string;

    // Logic: If there's a value, search it. If not, reset.
    if (val.trim()) {
      router.push(`/search?q=${encodeURIComponent(val.trim())}`);
    } else {
      router.push("/search");
    }

    // Close mobile overlay after searching
    setIsOpen(false);
    // Remove focus from input to hide keyboard on mobile
    if (inputRef.current) inputRef.current.blur();
  }

  return (
    <>
      {/* ── MOBILE OVERLAY ── */}
      <div
        className={`fixed inset-x-0 top-0 z-[60] flex h-16 items-center bg-off-white px-4 transition-transform duration-300 md:hidden ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <form
          onSubmit={handleSearch}
          className="flex w-full items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            name="search"
            onChange={handleInputChange}
            placeholder="SEARCH NOTHING..."
            autoComplete="off"
            className="w-full bg-transparent font-body text-xs uppercase tracking-[0.2em] outline-none border-b border-primary py-2"
          />
          <div className="flex items-center gap-1">
            {hasValue && (
              <button
                type="submit"
                className="flex h-11 w-11 items-center justify-center text-accent-red"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-11 w-11 items-center justify-center"
            >
              <X className="h-5 w-5 text-primary" />
            </button>
          </div>
        </form>
      </div>

      {/* ── DESKTOP & MOBILE TRIGGER ── */}
      <form onSubmit={handleSearch} className="relative flex items-center">
        <div className="relative hidden md:flex items-center">
          <input
            ref={inputRef} // Added ref here too to sync mobile/desktop values
            type="text"
            name="search"
            onChange={handleInputChange}
            placeholder="SEARCH NOTHING..."
            defaultValue={searchParams.get("q") || ""}
            autoComplete="off"
            className="w-64 border-b border-border-l bg-transparent p-1 font-body text-[10px] uppercase tracking-[0.2em] outline-none transition-all duration-500 focus:w-80 focus:border-primary"
          />

          <div className="absolute right-0 flex items-center">
            {hasValue ? (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 text-muted hover:text-primary transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
                <button
                  type="submit"
                  className="text-primary hover:text-accent-red"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <SearchIcon className="h-3 w-3 text-muted" />
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex h-11 w-11 items-center justify-center text-primary transition-all hover:-translate-y-0.5 md:hidden"
        >
          <SearchIcon className="h-5 w-5" strokeWidth={1} />
        </button>
      </form>
    </>
  );
}

export function SearchSkeleton() {
  return <div className="h-11 w-11" />;
}
