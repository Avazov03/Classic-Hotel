import { FeaturedRooms } from "@/components/home/FeaturedRooms";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeBusiness } from "@/components/home/HomeBusiness";
import { HomeCta } from "@/components/home/HomeCta";
import { HomeDining } from "@/components/home/HomeDining";
import { HomeExperience } from "@/components/home/HomeExperience";
import { HomeGallery } from "@/components/home/HomeGallery";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeStats } from "@/components/home/HomeStats";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeAbout />
      <FeaturedRooms />
      <HomeStats />
      <HomeBusiness />
      <HomeDining />
      <HomeExperience />
      <HomeGallery />
      <HomeTestimonials />
      <HomeCta />
    </>
  );
}