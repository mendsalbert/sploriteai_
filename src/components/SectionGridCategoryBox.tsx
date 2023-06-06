import CardCategoryBox1 from "@/components/CardCategoryBox1";
import Heading from "@/shared/Heading";
import { TaxonomyType } from "@/data/types";
import React from "react";

export interface SectionGridCategoryBoxProps {
  categories?: TaxonomyType[];
  headingCenter?: boolean;
  categoryCardType?: "card1";
  className?: string;
  gridClassName?: string;
}

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay-map",
    name: "Javascript",
    taxonomy: "tag",
    count: 1882,
    thumbnail: "https://i.ibb.co/tZ07BhK/js.png",
  },
  {
    id: "2",
    href: "/listing-stay-map",
    name: "Newtonia Mechanics",
    taxonomy: "category",
    count: 8288,
    thumbnail: "https://i.ibb.co/yRMy2mg/pexels-pixabay-60582.jpg",
  },
  {
    id: "3",
    href: "/listing-stay-map",
    name: "AI and Machine Learning",
    taxonomy: "category",
    count: 1288,
    thumbnail: "https://i.ibb.co/smwFJSx/pexels-pok-rie-529598.jpg",
  },
  {
    id: "4",
    href: "/listing-stay-map",
    name: "Spanish for beginners",
    taxonomy: "category",
    count: 112,
    thumbnail: "https://i.ibb.co/ZHKrW2D/pexels-leeloo-thefirst-5408920.jpg",
  },
  {
    id: "5",
    href: "/listing-stay-map",
    name: "Accounting",
    taxonomy: "category",
    count: 323,
    thumbnail: "https://i.ibb.co/rdwvSn5/pexels-karolina-grabowska-7681091.jpg",
  },
  {
    id: "6",
    href: "/listing-stay-map",
    name: "Maldives",
    taxonomy: "category",
    count: 2223,
    thumbnail:
      "https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "7",
    href: "/listing-stay-map",
    name: "New Yourk",
    taxonomy: "category",
    count: 1775,
    thumbnail:
      "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "8",
    href: "/listing-stay-map",
    name: "Singapore",
    taxonomy: "category",
    count: 1288,
    thumbnail:
      "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

const SectionGridCategoryBox: React.FC<SectionGridCategoryBoxProps> = ({
  categories = DEMO_CATS,
  categoryCardType = "card1",
  headingCenter = true,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {
  let CardComponentName = CardCategoryBox1;
  switch (categoryCardType) {
    case "card1":
      CardComponentName = CardCategoryBox1;
      break;

    default:
      CardComponentName = CardCategoryBox1;
  }

  return (
    <div className={`nc-SectionGridCategoryBox relative ${className}`}>
      <Heading
        desc="Select from any of the courses below "
        isCenter={headingCenter}
        className="-mt-16"
      >
        Discover
      </Heading>
      <div className={`grid ${gridClassName} gap-5 sm:gap-6 md:gap-8`}>
        {categories.map((item, i) => (
          <CardComponentName key={i} taxonomy={item} />
        ))}
      </div>
    </div>
  );
};

export default SectionGridCategoryBox;
