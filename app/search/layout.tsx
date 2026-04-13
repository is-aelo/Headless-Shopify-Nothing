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
      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-4 px-4 pb-4 text-primary md:flex-row md:gap-12">
        {/* Left Sidebar: Contains both Collections and Sorting */}
        <aside className="sticky top-[64px] z-30 order-first w-full flex-none bg-off-white pb-2 pt-4 md:static md:top-24 md:z-auto md:h-fit md:w-[150px] md:bg-transparent md:py-0 md:self-start md:sticky">
          <div className="flex flex-col gap-8">
            <Collections />
            <FilterList list={sorting} title="Sort by" />
          </div>
        </aside>

        {/* Main Product Grid */}
        <main className="order-last min-h-screen w-full">
          <Suspense fallback={null}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </main>
      </div>
      <Footer />
    </>
  );
}
