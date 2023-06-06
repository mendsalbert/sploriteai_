import React, { FC, useState, useEffect } from "react";
import TabFilters from "./TabFilters";
import Heading2 from "@/shared/Heading2";
import FlightCard, { FlightCardProps } from "@/components/FlightCard";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ModuleCardsLarge from "@/components/ModuleCardsLarge";
import { Loading } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { expandTopicAsync } from "../reducersSlices/searchReducer";
import ModuleCardsSmall from "@/components/ModuleCardsSmall";

export interface SectionGridFilterCardProps {
  className?: string;
  results?: any;
  isLoading?: any;
  setnext?: any;
  openModal?: any;
}

const ModuleGridSmallScreen: FC<SectionGridFilterCardProps> = ({
  className = "",
  results,
  setnext,
  openModal,
}) => {
  const dispatch = useDispatch<any>();
  const isLoading = useSelector((state: any) => state.search.isExpandLoading);
  const searchResults =
    useSelector((state: any) => state.search.expandedTopics) || [];
  const [selectedTitle, setSelectedTitle] = useState("");
  // const onChangeTopic = (title: any) => {
  //   const result = searchResults.find((item: any) => item.title === title);
  //   return result ? result.content : "";
  // };
  const onChangeTopic = (title: string, selectedTitle: string) => {
    dispatch(expandTopicAsync(title));
    setSelectedTitle(selectedTitle);
  };

  return (
    <div className="lg:p-2 lg:dark:bg-black/20 space-y-2 rounded-2xl">
      <>
        {/* {DEMO_DATA?.map((item: any, index: any) => (
            <ModuleCardsLarge key={index} data={item} setnext={setnext} />
          ))} */}
        {results?.map((item: any, index: any) => (
          <ModuleCardsSmall
            key={index}
            data={item}
            setnext={setnext}
            openModal={openModal}

            // searchResults={searchResults}
            // onChangeTopic={onChangeTopic}
            // isLoading={isLoading}
            // selectedTitle={selectedTitle} // pass selectedTitle as prop
          />
        ))}
      </>

      {/* <div className="flex mt-12 justify-center items-center">
        <ButtonPrimary loading>Show more</ButtonPrimary>
      </div> */}
    </div>
  );
};

export default ModuleGridSmallScreen;
