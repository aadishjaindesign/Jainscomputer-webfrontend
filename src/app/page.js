import Hero from "@/sections/home/Hero/Hero";
import PlacementPartners from "@/sections/home/PlacementPartners/PlacementPartners";
import Campus from "@/sections/home/Campus/Campus";
import Reviews from "@/sections/home/Reviews/Reviews";
import CareerPath from "@/sections/home/CareerPath/CareerPath";
import Qna from "@/sections/home/Qna/Qna";
import HeroCTA from "@/sections/home/HeroCTA/Herocta.jsx";
import {
  OrganizationSchema,
  HomepageFAQSchema,
} from "@/schema/schema-homepage";
import { homepageMetadata } from "@/lib/metadata";


export const metadata = homepageMetadata;

export default function HomePage() {
  return (
    <>

         <OrganizationSchema />
         <HomepageFAQSchema />    
      <Hero />
       <PlacementPartners />
       <Campus />
       <Reviews />
       <CareerPath />
         <Qna />
         <HeroCTA />
    </>
  );
}
