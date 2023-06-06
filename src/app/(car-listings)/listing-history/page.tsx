import React, { FC, forwardRef, Ref } from "react";
import SectionGridFilterCard from "../SectionGridFilterCard";
import SectionGridFilterCardSearchingHistory from "../SectionGridFilterCardHistory";

interface ListingSearchHistoryProps {
  // Your props interface
}

const ListingSearchHistory = forwardRef<
  HTMLDivElement,
  ListingSearchHistoryProps
>((props, ref: Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} className="container">
      <SectionGridFilterCardSearchingHistory className="pb-24 lg:pb-28" />
    </div>
  );
});

export default ListingSearchHistory;
