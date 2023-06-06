"use client";

import React, { FC, useState } from "react";
import StaySearchForm from "./(stay-search-form)/StaySearchForm";

export type SearchTab = "Stays" | "Experiences" | "Cars" | "Flights";

export interface HeroSearchFormProps {
  className?: string;
  currentTab?: SearchTab;
  currentPage?: "Stays" | "Experiences" | "Cars" | "Flights";
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  className = "",
  currentTab = "Stays",
  currentPage,
}) => {
  const [tabActive, setTabActive] = useState<SearchTab>(currentTab);

  const renderForm = () => {
    switch (tabActive) {
      case "Stays":
        return <StaySearchForm />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-full py-5 lg:py-0 ${className}`}
    >
      {renderForm()}
    </div>
  );
};

export default HeroSearchForm;
