import Footer from "components/layout/footer";
import Collections from "components/layout/search/collections";
import FilterList from "components/layout/search/filter";
import { sorting } from "lib/constants";
import { Suspense } from "react";
import ChildrenWrapper from "./children-wrapper";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-4 px-4 pb-4 pt-12 text-primary md:flex-row md:gap-8 md:pt-20">
        {/* Collections Filter
            Top-[64px] accounts for a standard sticky navbar height.
        */}
        <aside className="sticky top-[64px] z-30 order-first w-full flex-none bg-off-white pb-2 pt-4 md:static md:top-32 md:z-auto md:h-fit md:max-w-[125px] md:bg-transparent md:py-0 md:self-start md:sticky">
          <Collections />
        </aside>

        {/* Main Product Grid */}
        <main className="order-last min-h-screen w-full md:order-none">
          <Suspense fallback={null}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </main>

        {/* Sort Filter
            Top-[140px] gives enough clearance so it doesn't hide under the first dropdown.
        */}
        <aside className="sticky top-[145px] z-20 order-none flex-none bg-off-white pb-6 md:static md:top-32 md:z-auto md:order-last md:h-fit md:w-[125px] md:bg-transparent md:py-0 md:self-start md:sticky">
          <FilterList list={sorting} title="Sort by" />
        </aside>
      </div>
      <Footer />
    </>
  );
}
