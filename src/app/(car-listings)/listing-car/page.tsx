import React, { FC, forwardRef, Ref } from "react";
import SectionGridFilterCard from "../SectionGridFilterCard";

interface ListingCarPageProps {
  // Your props interface
}

const ListingCarPage = forwardRef<HTMLDivElement, ListingCarPageProps>(
  (props, ref: Ref<HTMLDivElement>) => {
    return (
      <div ref={ref} className="container">
        <SectionGridFilterCard className="pb-24 lg:pb-28" />
      </div>
    );
  }
);

export default ListingCarPage;
