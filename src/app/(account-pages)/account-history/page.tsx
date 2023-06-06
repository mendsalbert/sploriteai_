import React from "react";
import Label from "@/components/Label";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import ListingSearchHistory from "@/app/(car-listings)/listing-history/page";

const AccountPass = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADING */}
      <h2 className="text-3xl font-semibold">All searched courses</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* <div className=" w-max space-y-6"> */}
      <ListingSearchHistory />
      {/* </div> */}
    </div>
  );
};

export default AccountPass;
